// Regenerate narration: Edge neural TTS (vi-VN) → <voice-dir>/NN.mp3 + frame-keyed audio meta with
// word timings (frame-relative seconds). Needs: npm i msedge-tts@2.0.9 music-metadata@10.6.0
// (run a copy of this script from the folder that holds those node_modules).
//   node edge-tts.mjs <project-dir> [--script SCRIPT.md] [--voice-dir assets/voice] [--meta audio_meta.json]
//                     [--voice vi-VN-HoaiMyNeural] [--rate 0.95] [--frames 1,2,...]
//   v1: defaults (rate 0.95).  v2: --script SCRIPT-v2.md --voice-dir assets/voice-v2 --meta audio_meta-v2.json --rate 1.0
// After regenerating: audio.mjs sync-durations, then .hyperframes/vi-caption-meta.mjs + captions.mjs build.
import { MsEdgeTTS, OUTPUT_FORMAT } from 'msedge-tts';
import { parseFile } from 'music-metadata';
import fs from 'fs'; import path from 'path'; import os from 'os';
const argv = process.argv.slice(2);
const proj = argv[0];
const opt = (name, def) => { const i = argv.indexOf(`--${name}`); return i > 0 && i + 1 < argv.length ? argv[i + 1] : def; };
const scriptFile = opt('script', 'SCRIPT.md');
const voiceDir = opt('voice-dir', 'assets/voice');
const metaFile = opt('meta', 'audio_meta.json');
const voice = opt('voice', 'vi-VN-HoaiMyNeural');
const rate = Number(opt('rate', '0.95'));
const only = opt('frames', null)?.split(',').map(Number) ?? null;
const md = fs.readFileSync(path.join(proj, scriptFile), 'utf8');
const lines = []; let cur = null;
for (const l of md.split(/\r?\n/)) {
  const h = l.match(/^#{2,3}\s+.*?\(frame\s+(\d+)\)/i);
  if (h) { if (cur) lines.push(cur); cur = { frame: +h[1], text: '' }; continue; }
  if (!cur || /^\s*\*\*/.test(l)) continue;
  const m = l.match(/^(?: {4,}|\t)(.+)$/); if (m) cur.text += (cur.text ? ' ' : '') + m[1].trim();
}
if (cur) lines.push(cur);
const outDir = path.join(proj, voiceDir); fs.mkdirSync(outDir, { recursive: true });
const metaPath = path.join(proj, metaFile);
const prev = fs.existsSync(metaPath) ? JSON.parse(fs.readFileSync(metaPath, 'utf8')) : { bgm: null, bgm_pending: false, voices: [], sfx: [] };
const byFrame = new Map(prev.voices.map(v => [v.frame, v]));
for (const { frame, text } of lines) {
  if (only && !only.includes(frame)) continue;
  const tmp = fs.mkdtempSync(path.join(os.tmpdir(), 'edgetts-'));
  let audioFilePath, metadataFilePath;
  // Edge rate-limits rapid reconnects: retry with backoff, and pause between lines.
  for (let attempt = 1; ; attempt++) {
    const tts = new MsEdgeTTS();
    try {
      await tts.setMetadata(voice, OUTPUT_FORMAT.AUDIO_24KHZ_96KBITRATE_MONO_MP3, { wordBoundaryEnabled: true });
      ({ audioFilePath, metadataFilePath } = await tts.toFile(tmp, text, { rate }));
      tts.close(); break;
    } catch (e) {
      try { tts.close(); } catch {}
      if (attempt >= 5) throw e;
      console.log(`frame ${frame}: retry ${attempt}`); await new Promise(r => setTimeout(r, 3000 * attempt));
    }
  }
  await new Promise(r => setTimeout(r, 1500));
  const nn = String(frame).padStart(2, '0');
  const dest = path.join(outDir, `${nn}.mp3`);
  fs.copyFileSync(audioFilePath, dest);
  const raw = JSON.parse(fs.readFileSync(metadataFilePath, 'utf8'));
  const items = (Array.isArray(raw) ? raw : [raw]).flatMap(x => x.Metadata ?? [x]).filter(x => x.Type === 'WordBoundary');
  const words = items.map((x, i) => ({ id: `w${i}`, text: x.Data.text.Text, start: +(x.Data.Offset / 1e7).toFixed(3), end: +((x.Data.Offset + x.Data.Duration) / 1e7).toFixed(3) }))
    .filter(w => /[\p{L}\p{N}]/u.test(w.text));
  const dur = (await parseFile(dest)).format.duration;
  byFrame.set(frame, { frame, path: `${voiceDir}/${nn}.mp3`, duration_s: +dur.toFixed(3), words });
  console.log(`frame ${nn}: ${dur.toFixed(2)}s, ${words.length} words`);
}
const voices = [...byFrame.values()].sort((a, b) => a.frame - b.frame);
fs.writeFileSync(metaPath, JSON.stringify({ ...prev, voices }, null, 2));
console.log('total voice', voices.reduce((s, v) => s + v.duration_s, 0).toFixed(2), 's');
