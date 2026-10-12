// Add the persistent bottom progress bar to an assembled index (assemble-index.mjs does not know it).
// Re-run after every assemble-index + transitions inject. Idempotent.
//   node .hyperframes/add-progress-bar.mjs [index.html]
import { readFileSync, writeFileSync } from "node:fs";

const path = process.argv[2] ?? "index.html";
let html = readFileSync(path, "utf8");
if (html.includes('id="el-progress"')) {
  console.log("progress bar already present");
  process.exit(0);
}
const total = html.match(/data-composition-id="main"[\s\S]*?data-duration="([\d.]+)"/)?.[1];
if (!total) throw new Error("main composition data-duration not found");

const bar = `
      <!-- progress bar (added by .hyperframes/add-progress-bar.mjs) -->
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
`;
// Insert as the last child of #root: right before the root's closing tag that precedes the <script> block.
html = html.replace(/\n    <\/div>\n\n    <script>/, `${bar}\n    </div>\n\n    <script>`);
const anchor = `tl.to({}, { duration: ${total} }, 0);`;
if (!html.includes(anchor)) throw new Error("full-span anchor tween not found");
html = html.replace(anchor, `tl.fromTo("#el-progress-fill", { scaleX: 0 }, { scaleX: 1, duration: ${total}, ease: "none" }, 0); // progress bar\n        ${anchor}`);
if (!html.includes('id="el-progress"')) throw new Error("root close not found");
writeFileSync(path, html);
console.log(`✓ progress bar added (${total}s) → ${path}`);
