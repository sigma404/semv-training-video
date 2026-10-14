# v3 frame spec — "slide + spotlight"

User feedback on v2 (Vietnamese training video for new SEMV staff):
1. The narration is already Vietnamese, so on-screen Vietnamese text that pops in / dances word by word makes it
   hard to absorb. Captions are removed entirely (index.html no longer mounts compositions/captions.html).
   Instead, **when the narrator mentions an item, that item on the slide is spotlighted** — the way a presenter
   points at a slide.
2. Remove all content aimed at administrators (quản trị viên). Staff-only content.
3. Antivirus now scans and updates automatically; users no longer press scan/update.

## Motion contract for every v3 frame

**A. Slide reveal (calm, fast).** The slide's full content is visible early: header (eyebrow, h2, pill) in the
first ~0.8s, then every list item / card / row / node in a gentle stagger (0.06–0.12s apart) so the whole slide
is on screen by ~2.0s (frame 1 may build its agenda by ~2.5s). Entrance = opacity 0→1 plus ≤ 20px rise,
`power2.out`/`power3.out`, 0.4–0.6s. No `back.out` overshoot on text, no scale-pops on text, no typewriters,
no per-word/per-letter animation, no text swelling, no text shaking. Icons may draw (stroke-dashoffset) as part
of their item's entrance. A slow macro push-in on the stage (scale ≤ 1.02) is fine.

Exception — a narrative diagram whose meaning *is* a sequence (e.g. ransomware steps 1→2→3, fraud channels →
impersonation → transfer) may keep revealing its stages in narration order, but each stage is then spotlighted
the same way when it is spoken, and nothing inside a stage animates word by word.

**B. Spotlight (synced to narration).** Each spotlightable item has a cue = the moment its words start being
spoken. At the cue (tween 0.35s, `power2.out`):
- the active item: `scale: 1.03` (or 1.02 for wide rows), box-shadow ring
  `0 0 0 3px #0A3D91, 0 14px 32px rgba(10,61,145,0.18)`, background `rgba(10,61,145,0.08)`, opacity 1;
- all other items in the same group: `opacity: 0.4`, scale 1, no ring.
  (Items not yet spoken are dimmed too — the eye goes straight to the one being read.)
- when the next cue fires, the previous item returns to the dimmed rest state and the new one lights up.
- at the group's `rest` cue (right after the last item's sentence, or where the narration moves on to a
  summary/payoff), every item returns to opacity 1, scale 1, no ring — the recap view — and the payoff element
  (warning line, CTA pill, …) gets the spotlight instead if it has one.
- a card that was already "solid blue" in v2 (e.g. the key takeaway card) may keep that styling; spotlight it
  with the ring + scale only.
Use one shared helper per frame, e.g.

```js
function spot(items, idx, at) { // idx = -1 → rest (all normal)
  items.forEach(function (sel, i) {
    var on = i === idx, rest = idx < 0;
    tl.to(sel, { opacity: on || rest ? 1 : 0.4, scale: on ? 1.03 : 1,
      boxShadow: on ? "0 0 0 3px #0A3D91, 0 14px 32px rgba(10,61,145,0.18)" : "0 0 0 0px rgba(10,61,145,0), 0 0 0 rgba(10,61,145,0)",
      backgroundColor: on ? "rgba(10,61,145,0.08)" : BASE_BG, duration: 0.35, ease: "power2.out" }, at);
  });
}
```
(set each item's initial boxShadow explicitly with `tl.set` at 0 so the tween interpolates cleanly; keep
`transform-origin: center`; make sure scaled items don't clip against `overflow:hidden` parents or collide.)
Spotlight only content items — never the header. Group headings (e.g. "NGƯỜI DÙNG") may stay static.

**C. Timing comes from cues, never hard-coded seconds.** Each frame script contains exactly:
```js
var CUE = /*hf-cues:start*/{}/*hf-cues:end*/;
var DURATION = /*hf-dur:start*/0/*hf-dur:end*/;
```
and every spoken-moment time is `CUE.name` (+ small fixed offsets like `CUE.c2 + 0.1` are fine). Slide-reveal
times in A (first ~2s) are plain numbers. The cue phrases live in `.hyperframes/cues-v3/NN.json`
(NN = frame number, two digits), e.g. `{ "c1": "không tắt", "c2": "cập nhật Windows", "rest": "Làm ngơ -0.2" }`.
Spec values: `"phrase"` → start of its first word's first occurrence, `"phrase#2"` → 2nd occurrence,
`"phrase +0.3"` / `"phrase -0.2"` → offset, `"@end-1.5"` → relative to the voice end, or a plain number.
Phrases are matched case/diacritic-exactly per word after stripping punctuation, against the narration in
`SCRIPT-v3.md`. Use phrases that will survive a re-voice (the text is fixed; only timings change).
Apply with `node .hyperframes/v3-timing.mjs --only N` (patches only frame N's CUE/DURATION/data-duration and
prints the resolved cues; it never touches other frames in that mode). Current timings are a **placeholder**
(silent clips; v2 word timings for unchanged lines, estimates for lines 4–5); the real NamMinh voice will be
dropped in later and the script re-run, so every cue must be phrase-based.

The narration for frame N is the indented paragraph under "Line N" in `SCRIPT-v3.md`; word timings are in
`audio_meta-v3.json` → `voices[frame=N].words`.

**D. Keep.** Design system (Be Vietnam Pro, #0A3D91 cobalt on white, tinted cards, 14px radius), layout grid,
IDs/prefixes (`v3-NN-name-…`), composition contract (`<template>`, `#root[data-composition-id]`, `.clip`
elements with `data-start`/`data-duration`/`data-track-index`, one paused timeline registered on
`window.__timelines["v3-NN-name"]`, `tl.set({}, {}, DURATION)` at the end, deterministic — no random/Date).
Content may now use the bottom area (y 900–1000) since the caption band is gone, but there is no need to.

**E. Verify.** After editing, check the frame renders: `npx --yes hyperframes@0.8.149 lint` from the project
root (fix errors in your frame; ignore other frames), and take snapshots of your frame at its spotlight moments
to visually confirm (see `/hyperframes-cli` for `snapshot`; snapshot the sub-composition file, or the root
index.html at absolute times = frame start (printed by `node .hyperframes/v3-timing.mjs --only N` header lines)
+ cue). Look at the PNGs. Don't render MP4, don't edit index.html, other frames, or the v2 files.
