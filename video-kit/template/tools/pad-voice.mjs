// Append trailing silence to each freshly generated voice clip (a breath before the next scene) and write the
// padded duration back into audio_meta.json. Word timings are unchanged (padding is at the end).
//   node tools/pad-voice.mjs            (pads every clip not yet marked "padded")
// Seconds per frame: video.config.json → frames[].pad, else "padDefault" (1.2). Needs ffmpeg/ffprobe on PATH.
import { execFileSync } from "node:child_process";
import { readFileSync, writeFileSync, renameSync } from "node:fs";
import path from "node:path";

const proj = path.resolve(path.dirname(new URL(import.meta.url).pathname.replace(/^\/([A-Za-z]:)/, "$1")), "..");
const cfg = JSON.parse(readFileSync(path.join(proj, "video.config.json"), "utf8"));
const metaPath = path.join(proj, cfg.audioMeta ?? "audio_meta.json");
const meta = JSON.parse(readFileSync(metaPath, "utf8"));
const padOf = (n) => cfg.frames.find((f) => f.n === n)?.pad ?? cfg.padDefault ?? 1.2;

for (const v of meta.voices) {
  if (v.padded) continue; // re-padding a clip would add the silence twice
  const pad = padOf(v.frame);
  const src = path.join(proj, v.path);
  const tmp = src.replace(/\.mp3$/, ".padded.mp3");
  execFileSync("ffmpeg", ["-y", "-v", "error", "-i", src, "-af", `apad=pad_dur=${pad}`, "-c:a", "libmp3lame", "-b:a", "128k", tmp]);
  renameSync(tmp, src);
  const dur = Number(execFileSync("ffprobe", ["-v", "error", "-show_entries", "format=duration", "-of", "csv=p=0", src]).toString().trim());
  v.duration_s = Number(dur.toFixed(3));
  v.padded = true;
  console.log(`frame ${String(v.frame).padStart(2, "0")}: +${pad}s → ${v.duration_s}s`);
}
writeFileSync(metaPath, JSON.stringify(meta, null, 2));
console.log("total", meta.voices.reduce((s, v) => s + v.duration_s, 0).toFixed(2), "s");
