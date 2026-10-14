// Create a new, independent video project from video-kit/template.
//   node video-kit/new-video.mjs <dest-dir> ["Tiêu đề video"]
// e.g. node video-kit/new-video.mjs videos/semv-an-toan-lao-dong "An toàn lao động"
// The copy shares nothing with the kit or any other video afterwards (tools are copied, not linked).
import fs from "node:fs";
import path from "node:path";
import crypto from "node:crypto";

const kit = path.dirname(new URL(import.meta.url).pathname.replace(/^\/([A-Za-z]:)/, "$1"));
const [destArg, title] = process.argv.slice(2);
if (!destArg) { console.error('usage: node video-kit/new-video.mjs <dest-dir> ["Tiêu đề video"]'); process.exit(1); }
const dest = path.resolve(destArg);
if (fs.existsSync(dest) && fs.readdirSync(dest).length) { console.error(`${dest} already exists and is not empty`); process.exit(1); }

const name = path.basename(dest).toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "").replace(/đ/g, "d")
  .replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "") || "video";

fs.cpSync(path.join(kit, "template"), dest, { recursive: true });
const sub = (file, fn) => { const p = path.join(dest, file); fs.writeFileSync(p, fn(fs.readFileSync(p, "utf8"))); };
sub("package.json", (s) => s.replaceAll("__NAME__", name));
sub("video.config.json", (s) => { const c = JSON.parse(s); if (title) c.title = title; return JSON.stringify(c, null, 2) + "\n"; });
if (title) sub("SCRIPT.md", (s) => s.replace("<tên video>", title));
fs.writeFileSync(path.join(dest, "meta.json"), JSON.stringify({ id: name, name, createdAt: new Date().toISOString() }, null, 2) + "\n");
// stable per-project id for HyperFrames' local history
fs.mkdirSync(path.join(dest, ".hyperframes"), { recursive: true });
fs.writeFileSync(path.join(dest, ".hyperframes", "history-id"), crypto.randomUUID() + "\n");

console.log(`Created ${path.relative(process.cwd(), dest) || dest}  (package "${name}")`);
console.log(`Next:
  cd ${path.relative(process.cwd(), dest) || "."}
  node tools/timing.mjs        # estimated timings → preview without a voice yet
  npm run dev                  # Studio preview
  bash tools/voice.sh          # Vietnamese voice-over (first time on this machine: bash tools/setup-tts.sh)
  npm run render               # → renders/${name}.mp4`);
