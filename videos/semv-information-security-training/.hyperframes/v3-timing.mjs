// v3 timing: anchors every on-slide spotlight to the narration and rebuilds index.html.
//   node .hyperframes/v3-timing.mjs [audio_meta-v3.json] [--only N]   (--only: patch frame N only, leave index.html)
// Reads word timings from the audio meta and cue phrases from .hyperframes/cues-v3/NN.json, then
// for each compositions/frames/v3-*.html rewrites:
//   var CUE = /*hf-cues:start*/{...}/*hf-cues:end*/;   (seconds, frame-relative)
//   var DURATION = /*hf-dur:start*/12.3/*hf-dur:end*/; (voice clip length)
//   every data-duration="..."                          (scene length = voice + 0.5 overlap, last = voice)
// Cue spec values: "phrase" (start of the first word of its first occurrence), "phrase#2" (2nd
// occurrence), optional "+0.3" / "-0.2" offset after it, "@end-1.5" (relative to DURATION), or a number.
// Re-run after every voice regeneration; it is idempotent.
import fs from "node:fs";
import path from "node:path";

const proj = path.resolve(path.dirname(new URL(import.meta.url).pathname.replace(/^\/([A-Za-z]:)/, "$1")), "..");
const args = process.argv.slice(2);
const oi = args.indexOf("--only");
const only = oi >= 0 ? Number(args.splice(oi, 2)[1]) : null;
const metaPath = path.join(proj, args[0] ?? "audio_meta-v3.json");
const meta = JSON.parse(fs.readFileSync(metaPath, "utf8"));
// one cue file per frame: .hyperframes/cues-v3/NN.json → { "cueName": "phrase spec", ... }
const cueDir = path.join(proj, ".hyperframes/cues-v3");
const cues = {};
for (const f of fs.existsSync(cueDir) ? fs.readdirSync(cueDir) : []) {
  const m = f.match(/^(\d+)\.json$/);
  if (m) cues[String(+m[1])] = JSON.parse(fs.readFileSync(path.join(cueDir, f), "utf8"));
}
const OVERLAP = 0.5;

// id + transition INTO this frame (same choreography as v2)
const FRAMES = [
  { n: 0, id: "v3-00-story" },
  { n: 1, id: "v3-01-intro", tr: "crossfade" },
  { n: 2, id: "v3-02-definition", tr: "crossfade" },
  { n: 102, id: "v3-102-ex-roles", tr: "crossfade" },
  { n: 3, id: "v3-03-context", tr: "crossfade" },
  { n: 103, id: "v3-103-ex-leak", tr: "crossfade" },
  { n: 4, id: "v3-04-access", tr: "push" },
  { n: 104, id: "v3-104-ex-account", tr: "crossfade" },
  { n: 5, id: "v3-05-malware", tr: "push" },
  { n: 105, id: "v3-105-ex-usb", tr: "crossfade" },
  { n: 6, id: "v3-06-incidents", tr: "push" },
  { n: 106, id: "v3-106-ex-report", tr: "crossfade" },
  { n: 7, id: "v3-07-email-hack", tr: "crossfade" },
  { n: 8, id: "v3-08-ransomware", tr: "push" },
  { n: 9, id: "v3-09-fraud", tr: "push" },
  { n: 109, id: "v3-109-ex-verify", tr: "crossfade" },
  { n: 10, id: "v3-10-best-practices", tr: "crossfade" },
  { n: 110, id: "v3-110-ex-lock", tr: "crossfade" },
  { n: 11, id: "v3-11-closing", tr: "crossfade" },
];

const norm = (s) => s.toLowerCase().normalize("NFC").replace(/[^\p{L}\p{N}]+/gu, " ").trim();
const r3 = (x) => Math.round(x * 1000) / 1000;

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
let errors = 0;
for (const f of FRAMES) {
  const v = meta.voices.find((x) => x.frame === f.n);
  if (!v) throw new Error(`no voice for frame ${f.n} in ${metaPath}`);
  const isLast = f === FRAMES[FRAMES.length - 1];
  const dur = r3(v.duration_s);
  const sceneDur = r3(isLast ? dur : dur + OVERLAP);
  const file = path.join(proj, "compositions/frames", `${f.id}.html`);
  let html = fs.readFileSync(file, "utf8");
  const spec = cues[String(f.n)] ?? {};
  const out = {};
  for (const [k, s] of Object.entries(spec)) {
    try { out[k] = resolveCue(s, v.words, dur, `frame ${f.n} cue "${k}"`); }
    catch (e) { if (only == null || only === f.n) { console.error(e.message); errors++; } }
  }
  if (!/\/\*hf-cues:start\*\/[\s\S]*?\/\*hf-cues:end\*\//.test(html) && (only == null || only === f.n)) { console.error(`${f.id}: missing hf-cues markers`); errors++; }
  html = html
    .replace(/\/\*hf-cues:start\*\/[\s\S]*?\/\*hf-cues:end\*\//, `/*hf-cues:start*/${JSON.stringify(out)}/*hf-cues:end*/`)
    .replace(/\/\*hf-dur:start\*\/[\s\S]*?\/\*hf-dur:end\*\//, `/*hf-dur:start*/${dur}/*hf-dur:end*/`)
    .replace(/data-duration="[\d.]+"/g, `data-duration="${sceneDur}"`);
  if (only == null || only === f.n) { fs.writeFileSync(file, html); if (only) console.log(JSON.stringify(out, null, 1)); }
  placed.push({ ...f, start: r3(t), dur, sceneDur, voice: v.path });
  console.log(`frame ${String(f.n).padStart(2, "0")} @ ${r3(t).toFixed(2)}s  voice ${dur}s  cues ${Object.keys(out).length}`);
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
      ></div>
      <audio
        id="el-${p.id}-voice"
        src="${p.voice}"
        data-start="${p.start}"
        data-duration="${p.dur}"
        data-track-index="10"
        data-volume="1"
      ></audio>
`).join("\n");

const trans = placed.slice(1).map((p, i) => {
  const prev = placed[i];
  const at = p.start;
  if (p.tr === "push") return `        tl.to("#el-${prev.id}", { x: -1920, duration: 0.5, ease: "power3.inOut" }, ${at});
        tl.fromTo("#el-${p.id}", { x: 1920, opacity: 1 }, { x: 0, opacity: 1, duration: 0.5, ease: "power3.inOut" }, ${at});
        tl.addLabel("hf:transition:${prev.id}:${p.id}:push-slide", ${at});`;
  return `        tl.to("#el-${prev.id}", { opacity: 0, duration: 0.5, ease: "power2.inOut" }, ${at});
        tl.fromTo("#el-${p.id}", { opacity: 0 }, { opacity: 1, duration: 0.5, ease: "power2.inOut" }, ${at});
        tl.addLabel("hf:transition:${prev.id}:${p.id}:crossfade", ${at});`;
}).join("\n");

const index = `<!doctype html>
<html lang="vi">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=1920, height=1080" />
    <script src="https://cdn.jsdelivr.net/npm/gsap@3.14.2/dist/gsap.min.js" integrity="sha384-sG0Hv1tP1lZCk9KQmrIbY/XNwi+OY84GQqhMscbnsoBFqAz8KNCil1kvfL3Hbbk2" crossorigin="anonymous"></script>
    <style>
      * { margin: 0; padding: 0; box-sizing: border-box; }
      html, body { width: 1920px; height: 1080px; overflow: hidden; background: #000; }
      #root { position: relative; width: 1920px; height: 1080px; overflow: hidden; background: #FFFFFF; }
      .scene { position: absolute; inset: 0; width: 100%; height: 100%; }
    </style>
  </head>
  <body>
    <!-- v3 — generated by .hyperframes/v3-timing.mjs; edit that script, not this file.
         No on-screen captions: the narration is Vietnamese, and each slide spotlights the item being read instead. -->
    <div
      id="root"
      data-composition-id="main"
      data-start="0"
      data-duration="${total}"
      data-width="1920"
      data-height="1080"
    >
${scenes}
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
      </div>
    </div>

    <script>
      window.__timelines = window.__timelines || {};
      window.__timelines["main"] = gsap.timeline({ paused: true });
      (function () { var tl = window.__timelines["main"];
${trans}
        tl.fromTo("#el-progress-fill", { scaleX: 0 }, { scaleX: 1, duration: ${total}, ease: "none" }, 0);
        tl.to({}, { duration: ${total} }, 0); // full-span anchor
      })();
    </script>
  </body>
</html>
`;
if (only == null) fs.writeFileSync(path.join(proj, "index.html"), index);
console.log(`index.html: ${placed.length} frames, total ${total}s${meta.placeholder ? "  (PLACEHOLDER voice timings)" : ""}`);
if (errors) { console.error(`${errors} error(s)`); process.exit(1); }
