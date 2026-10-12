// Vietnamese caption prep: captions.mjs groups by "words" (2–4 per group), but Edge TTS
// word boundaries are single Vietnamese syllables with punctuation stripped, so groups
// came out 2 syllables long. This writes .hyperframes/caption_meta.json for captions.mjs:
//   1. restores clause punctuation from SCRIPT.md onto the syllable it follows, so groups
//      flush at commas / dashes / sentence ends;
//   2. merges each clause's syllables into ≤3 units of 2–4 syllables (never across
//      punctuation), so a clause reads as one caption group.
// audio_meta.json itself is left untouched (assemble-index reads it for the voice tracks).
//
//   node .hyperframes/vi-caption-meta.mjs [audio_meta.json] [SCRIPT.md] [.hyperframes/caption_meta.json]
//   (run from the project root; v2: audio_meta-v2.json SCRIPT-v2.md .hyperframes/caption_meta-v2.json)
import { readFileSync, writeFileSync } from "node:fs";

const [metaIn = "audio_meta.json", scriptIn = "SCRIPT.md", outPath = ".hyperframes/caption_meta.json"] = process.argv.slice(2);
const meta = JSON.parse(readFileSync(metaIn, "utf8"));
const md = readFileSync(scriptIn, "utf8");

const scripts = new Map();
let cur = null;
for (const line of md.split(/\r?\n/)) {
  const h = line.match(/^#{2,3}\s+.*?\(frame\s+(\d+)\)/i);
  if (h) { cur = Number(h[1]); scripts.set(cur, ""); continue; }
  if (cur == null || /^\s*\*\*/.test(line)) continue;
  const m = line.match(/^(?: {4,}|\t)(.+)$/);
  if (m) scripts.set(cur, (scripts.get(cur) + " " + m[1].trim()).trim());
}

const norm = (s) => s.normalize("NFC").toLowerCase().replace(/[^\p{L}\p{N}]/gu, "");

const voices = meta.voices.map((v) => {
  // Script tokens with their trailing punctuation; a lone "—" attaches to the previous token.
  const toks = [];
  for (const raw of (scripts.get(v.frame) ?? "").split(/\s+/)) {
    if (!raw) continue;
    if (!/[\p{L}\p{N}]/u.test(raw)) { if (toks.length) toks[toks.length - 1].punct += raw; continue; }
    const punct = raw.match(/[^\p{L}\p{N}]*$/u)[0];
    toks.push({ key: norm(raw), punct });
  }
  let ti = 0;
  const syll = v.words.map((w) => {
    // An Edge "word" may span several script tokens ("114 tỷ đồng"); consume them all.
    const parts = w.text.split(/\s+/).filter(Boolean);
    let punct = "";
    for (const p of parts) {
      const k = norm(p);
      let j = ti;
      while (j < toks.length && toks[j].key !== k) j++;
      if (j < toks.length) { punct = toks[j].punct; ti = j + 1; }
    }
    const end = /[.?!,;:—]/.test(punct) ? (/[.?!]/.test(punct) ? "." : ",") : "";
    return { ...w, text: w.text + end, brk: !!end };
  });
  // Merge each clause (syllables up to a punctuation break) into at most 3 even units of
  // 2–4 syllables, so a clause fits one caption group instead of leaving a 1-word orphan.
  const clauses = [];
  let c = [];
  for (const s of syll) { c.push(s); if (s.brk) { clauses.push(c); c = []; } }
  if (c.length) clauses.push(c);
  const units = [];
  for (const cl of clauses) {
    const size = Math.min(4, Math.max(2, Math.ceil(cl.length / 3)));
    for (let i = 0; i < cl.length; i += size) {
      const part = cl.slice(i, i + size);
      units.push({ id: part[0].id, text: part.map((s) => s.text).join(" "), start: part[0].start, end: part[part.length - 1].end });
    }
  }
  return { ...v, words: units.map(({ id, text, start, end }) => ({ id, text, start, end })) };
});

writeFileSync(outPath, JSON.stringify({ ...meta, voices }, null, 2));
console.log(`✓ vi caption meta: ${voices.reduce((n, v) => n + v.words.length, 0)} units → ${outPath}`);
