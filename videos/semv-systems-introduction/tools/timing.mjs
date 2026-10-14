// Anchors every frame's animation cues to the narration and rebuilds index.html.
//   node tools/timing.mjs              (all frames + index.html)
//   node tools/timing.mjs --only N     (patch frame N only, print its resolved cues; index.html untouched)
// Inputs: video.config.json (frame order, transitions), audio_meta.json (word timings from tools/tts.py),
// cues/NN.json (cue name → phrase spec), SCRIPT.md (used for estimated timings when a frame has no voice yet).
// For each compositions/frames/<id>.html it rewrites:
//   var CUE = /*hf-cues:start*/{...}/*hf-cues:end*/;   (seconds, frame-relative)
//   var DURATION = /*hf-dur:start*/12.3/*hf-dur:end*/; (voice clip length)
//   every data-duration="..."                          (scene length = voice + overlap, last = voice)
// Cue spec values: "phrase" (start of the first word of its first occurrence), "phrase#2" (2nd occurrence),
// optional "+0.3" / "-0.2" offset after it, "@end-1.5" (relative to DURATION), or a plain number.
// Idempotent: re-run after every script or voice change.
import fs from "node:fs";
import path from "node:path";

const proj = path.resolve(path.dirname(new URL(import.meta.url).pathname.replace(/^\/([A-Za-z]:)/, "$1")), "..");
const args = process.argv.slice(2);
const oi = args.indexOf("--only");
const only = oi >= 0 ? Number(args[oi + 1]) : null;
const cfg = JSON.parse(fs.readFileSync(path.join(proj, "video.config.json"), "utf8"));
const metaPath = path.join(proj, cfg.audioMeta ?? "audio_meta.json");
const meta = fs.existsSync(metaPath) ? JSON.parse(fs.readFileSync(metaPath, "utf8")) : { voices: [] };
const OVERLAP = cfg.overlap ?? 0.5;
const W = cfg.width ?? 1920, H = cfg.height ?? 1080;

const cues = {};
const cueDir = path.join(proj, "cues");
for (const f of fs.existsSync(cueDir) ? fs.readdirSync(cueDir) : []) {
  const m = f.match(/^(\d+)\.json$/);
  if (m) cues[String(+m[1])] = JSON.parse(fs.readFileSync(path.join(cueDir, f), "utf8"));
}

const norm = (s) => s.toLowerCase().normalize("NFC").replace(/[^\p{L}\p{N}]+/gu, " ").trim();
const r3 = (x) => Math.round(x * 1000) / 1000;

// --- estimated word timings for frames that have no voice yet (lets you preview before running TTS) ---
function scriptLines() {
  const out = {};
  let cur = null;
  const file = path.join(proj, cfg.script ?? "SCRIPT.md");
  if (!fs.existsSync(file)) return out;
  for (const l of fs.readFileSync(file, "utf8").split(/\r?\n/)) {
    const h = l.match(/^#{2,3}\s+.*?\(frame\s+(\d+)\)/i);
    if (h) { cur = out[+h[1]] = []; continue; }
    if (!cur || /^\s*\*\*/.test(l)) continue;
    const m = l.match(/^(?: {4,}|\t)(.+)$/);
    if (m) cur.push(m[1].trim());
  }
  return Object.fromEntries(Object.entries(out).map(([k, v]) => [k, v.join(" ")]));
}
const SCRIPT = scriptLines();
function estimate(n) {
  const text = SCRIPT[n] ?? "";
  let t = 0.2;
  const words = [];
  for (const raw of text.split(/\s+/)) {
    if (!norm(raw)) { t += 0.25; continue; } // "—"
    words.push({ text: raw.replace(/[^\p{L}\p{N}]/gu, ""), start: r3(t), end: r3(t + 0.3) });
    t += 0.3 + (/[.?!]$/.test(raw) ? 0.5 : /[,;:]$/.test(raw) ? 0.2 : 0);
  }
  const pad = cfg.frames.find((f) => f.n === n)?.pad ?? cfg.padDefault ?? 1.2;
  return { frame: n, path: null, duration_s: r3(Math.max(3, t + pad)), words, estimated: true };
}

function resolveCue(spec, words, dur, where) {
  if (typeof spec === "number") return spec;
  let m = spec.match(/^@end([+-][\d.]+)?$/);
  if (m) return r3(dur + Number(m[1] ?? 0));
  m = spec.match(/^(.*?)(?:#(\d+))?\s*([+-][\d.]+)?$/);
  const target = norm(m[1]).split(" ");
  const nth = Number(m[2] ?? 1);
  const offset = Number(m[3] ?? 0);
  const toks = words.map((w) => norm(w.text));
  let seen = 0;
  for (let i = 0; i + target.length <= toks.length; i++) {
    if (target.every((t, k) => toks[i + k] === t) && ++seen === nth) return r3(Math.max(0, words[i].start + offset));
  }
  throw new Error(`${where}: phrase not found in narration: "${spec}"`);
}

let t = 0;
const placed = [];
let errors = 0, estimated = 0;
for (const f of cfg.frames) {
  let v = meta.voices.find((x) => x.frame === f.n);
  if (!v) { v = estimate(f.n); estimated++; }
  const isLast = f === cfg.frames[cfg.frames.length - 1];
  const dur = r3(v.duration_s);
  const sceneDur = r3(isLast ? dur : dur + OVERLAP);
  const file = path.join(proj, "compositions/frames", `${f.id}.html`);
  if (!fs.existsSync(file)) { console.error(`missing ${path.relative(proj, file)}`); errors++; continue; }
  let html = fs.readFileSync(file, "utf8");
  const mine = only == null || only === f.n;
  const out = {};
  for (const [k, s] of Object.entries(cues[String(f.n)] ?? {})) {
    try { out[k] = resolveCue(s, v.words, dur, `frame ${f.n} cue "${k}"`); }
    catch (e) { if (mine) { console.error(e.message); errors++; } }
  }
  if (!/\/\*hf-cues:start\*\/[\s\S]*?\/\*hf-cues:end\*\//.test(html) && mine) { console.error(`${f.id}: missing hf-cues markers`); errors++; }
  html = html
    .replace(/\/\*hf-cues:start\*\/[\s\S]*?\/\*hf-cues:end\*\//, `/*hf-cues:start*/${JSON.stringify(out)}/*hf-cues:end*/`)
    .replace(/\/\*hf-dur:start\*\/[\s\S]*?\/\*hf-dur:end\*\//, `/*hf-dur:start*/${dur}/*hf-dur:end*/`)
    .replace(/data-duration="[\d.]+"/g, `data-duration="${sceneDur}"`);
  if (mine) { fs.writeFileSync(file, html); if (only != null) console.log(JSON.stringify(out, null, 1)); }
  placed.push({ ...f, start: r3(t), dur, sceneDur, voice: v.path });
  console.log(`frame ${String(f.n).padStart(3)} @ ${r3(t).toFixed(2).padStart(7)}s  ${v.estimated ? "est. " : "voice"} ${dur}s  cues ${Object.keys(out).length}`);
  t += dur;
}
const total = r3(t);

const scenes = placed.map((p, i) => `      <div
        id="el-${p.id}"
        class="scene"
        data-composition-id="${p.id}"
        data-composition-src="compositions/frames/${p.id}.html"
        data-start="${p.start}"
        data-duration="${p.sceneDur}"
        data-track-index="${i % 2}"
      ></div>${p.voice ? `
      <audio
        id="el-${p.id}-voice"
        src="${p.voice}"
        data-start="${p.start}"
        data-duration="${p.dur}"
        data-track-index="10"
        data-volume="1"
      ></audio>` : ""}
`).join("\n");

const trans = placed.slice(1).map((p, i) => {
  const prev = placed[i];
  const at = p.start;
  if (p.tr === "push") return `        tl.to("#el-${prev.id}", { x: -${W}, duration: 0.5, ease: "power3.inOut" }, ${at});
        tl.fromTo("#el-${p.id}", { x: ${W}, opacity: 1 }, { x: 0, opacity: 1, duration: 0.5, ease: "power3.inOut" }, ${at});
        tl.addLabel("hf:transition:${prev.id}:${p.id}:push-slide", ${at});`;
  return `        tl.to("#el-${prev.id}", { opacity: 0, duration: 0.5, ease: "power2.inOut" }, ${at});
        tl.fromTo("#el-${p.id}", { opacity: 0 }, { opacity: 1, duration: 0.5, ease: "power2.inOut" }, ${at});
        tl.addLabel("hf:transition:${prev.id}:${p.id}:crossfade", ${at});`;
}).join("\n");

const progress = cfg.progressBar === false ? "" : `
      <!-- progress bar -->
      <div
        id="el-progress"
        class="clip"
        data-start="0"
        data-duration="${total}"
        data-track-index="3"
        style="position: absolute; left: 0; right: 0; bottom: 0; height: 8px; background: rgba(10, 61, 145, 0.12); z-index: 50"
      >
        <div id="el-progress-fill" style="width: 100%; height: 100%; background: #0A3D91; transform-origin: 0 50%"></div>
      </div>`;

const index = `<!doctype html>
<html lang="vi">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=${W}, height=${H}" />
    <script src="https://cdn.jsdelivr.net/npm/gsap@3.14.2/dist/gsap.min.js" integrity="sha384-sG0Hv1tP1lZCk9KQmrIbY/XNwi+OY84GQqhMscbnsoBFqAz8KNCil1kvfL3Hbbk2" crossorigin="anonymous"></script>
    <style>
      * { margin: 0; padding: 0; box-sizing: border-box; }
      html, body { width: ${W}px; height: ${H}px; overflow: hidden; background: #000; }
      #root { position: relative; width: ${W}px; height: ${H}px; overflow: hidden; background: #FFFFFF; }
      .scene { position: absolute; inset: 0; width: 100%; height: 100%; }
    </style>
  </head>
  <body>
    <!-- generated by tools/timing.mjs — edit video.config.json / cues/ / frames, then re-run; do not edit this file. -->
    <div
      id="root"
      data-composition-id="main"
      data-start="0"
      data-duration="${total}"
      data-width="${W}"
      data-height="${H}"
    >
${scenes}${progress}
    </div>

    <script>
      window.__timelines = window.__timelines || {};
      window.__timelines["main"] = gsap.timeline({ paused: true });
      (function () { var tl = window.__timelines["main"];
${trans}${cfg.progressBar === false ? "" : `
        tl.fromTo("#el-progress-fill", { scaleX: 0 }, { scaleX: 1, duration: ${total}, ease: "none" }, 0);`}
        tl.to({}, { duration: ${total} }, 0); // full-span anchor
      })();
    </script>
  </body>
</html>
`;
if (only == null) fs.writeFileSync(path.join(proj, "index.html"), index);
console.log(`index.html: ${placed.length} frames, total ${total}s` +
  (estimated ? `  (${estimated} frame(s) on ESTIMATED timings — no voice yet; run: bash tools/voice.sh)` : ""));
if (errors) { console.error(`${errors} error(s)`); process.exit(1); }
