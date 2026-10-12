// Append trailing silence to each v2 voice clip (a breath between scenes; longer at section ends)
// and write the padded durations back into the audio meta, so `audio.mjs sync-durations` gives
// every frame a short held read after its last word. Word timings are unchanged (padding is at the end).
// Needs ffmpeg/ffprobe on PATH.  Run from the project root:
//   node .hyperframes/pad-voice.mjs audio_meta-v2.json [frames=1,2,...]
// Pad only freshly generated clips: re-padding a clip adds the silence twice.
import { execFileSync } from "node:child_process";
import { readFileSync, writeFileSync, renameSync } from "node:fs";

const metaPath = process.argv[2] ?? "audio_meta-v2.json";
const only = process.argv[3]?.split(",").map(Number) ?? null;
// seconds of silence per frame: section ends 2.0 · within a section 1.2 · closing 1.5
const PAD = { 1: 2.0, 2: 2.0, 3: 2.0, 4: 1.2, 5: 1.2, 6: 2.0, 7: 1.2, 8: 1.2, 9: 2.0, 10: 2.0, 11: 1.5 };

const meta = JSON.parse(readFileSync(metaPath, "utf8"));
for (const v of meta.voices) {
  if (only && !only.includes(v.frame)) continue;
  const pad = PAD[v.frame] ?? 1.2;
  const tmp = v.path.replace(/\.mp3$/, ".padded.mp3");
  execFileSync("ffmpeg", ["-y", "-v", "error", "-i", v.path, "-af", `apad=pad_dur=${pad}`, "-c:a", "libmp3lame", "-b:a", "96k", tmp]);
  renameSync(tmp, v.path);
  const dur = Number(execFileSync("ffprobe", ["-v", "error", "-show_entries", "format=duration", "-of", "csv=p=0", v.path]).toString().trim());
  v.duration_s = Number(dur.toFixed(3));
  console.log(`frame ${String(v.frame).padStart(2, "0")}: +${pad}s → ${v.duration_s}s`);
}
writeFileSync(metaPath, JSON.stringify(meta, null, 2));
console.log("total", meta.voices.reduce((s, v) => s + v.duration_s, 0).toFixed(2), "s");
