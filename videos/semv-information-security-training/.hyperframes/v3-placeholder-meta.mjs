// Stand-in narration timing for v3 while the real NamMinh voice can't be generated
// (the network's TLS inspection blocks Edge TTS). Writes audio_meta-v3.json with "placeholder": true
// and silent assets/voice-v3/NN.mp3 clips of matching length:
//   - lines whose text is unchanged from v2 reuse v2's word timings (HoaiMy, already padded);
//   - changed lines (4, 5) get estimated timings (~0.3s per word, pauses at punctuation) + v2 padding.
// Real voice replaces all of this: edge-tts.mjs → pad-voice.mjs → v3-timing.mjs.
//   node .hyperframes/v3-placeholder-meta.mjs
import fs from "node:fs";
import path from "node:path";
import { execFileSync } from "node:child_process";

const proj = path.resolve(path.dirname(new URL(import.meta.url).pathname.replace(/^\/([A-Za-z]:)/, "$1")), "..");
const PAD = { 1: 2.0, 2: 2.0, 3: 2.0, 4: 1.2, 5: 1.2, 6: 2.0, 7: 1.2, 8: 1.2, 9: 2.0, 10: 2.0, 11: 1.5 };

function parseScript(file) {
  const out = new Map(); let cur = null;
  for (const l of fs.readFileSync(path.join(proj, file), "utf8").split(/\r?\n/)) {
    const h = l.match(/^#{2,3}\s+.*?\(frame\s+(\d+)\)/i);
    if (h) { cur = +h[1]; out.set(cur, ""); continue; }
    if (cur == null || /^\s*\*\*/.test(l)) continue;
    const m = l.match(/^(?: {4,}|\t)(.+)$/); if (m) out.set(cur, (out.get(cur) ? out.get(cur) + " " : "") + m[1].trim());
  }
  return out;
}
const v2 = parseScript("SCRIPT-v2.md");
const v3 = parseScript("SCRIPT-v3.md");
const v2meta = JSON.parse(fs.readFileSync(path.join(proj, "audio_meta-v2.json"), "utf8"));

fs.mkdirSync(path.join(proj, "assets/voice-v3"), { recursive: true });
const voices = [];
for (const [frame, text] of v3) {
  const nn = String(frame).padStart(2, "0");
  const rel = `assets/voice-v3/${nn}.mp3`;
  let words, dur;
  if (v2.get(frame) === text) {
    const src = v2meta.voices.find((v) => v.frame === frame);
    words = src.words; dur = src.duration_s;
  } else {
    words = []; let t = 0.13;
    for (const tok of text.split(/\s+/)) {
      const w = tok.replace(/[^\p{L}\p{N}]/gu, "");
      if (w) { words.push({ id: `w${words.length}`, text: w, start: +t.toFixed(3), end: +(t + 0.24).toFixed(3) }); t += 0.3; }
      if (/[—–-]$|^[—–-]$/.test(tok)) t += 0.35; else if (/[.?!]$/.test(tok)) t += 0.6; else if (/,$/.test(tok)) t += 0.3;
    }
    dur = +(t + PAD[frame]).toFixed(3);
  }
  execFileSync("ffmpeg", ["-y", "-v", "error", "-f", "lavfi", "-i", "anullsrc=r=24000:cl=mono", "-t", String(dur), "-c:a", "libmp3lame", "-b:a", "48k", path.join(proj, rel)]);
  voices.push({ frame, path: rel, duration_s: dur, words });
  console.log(`frame ${nn}: ${dur}s ${v2.get(frame) === text ? "(v2 timings)" : "(estimated)"}`);
}
fs.writeFileSync(path.join(proj, "audio_meta-v3.json"), JSON.stringify({ placeholder: true, bgm: null, bgm_pending: false, voices, sfx: [] }, null, 2));
