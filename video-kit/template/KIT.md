# Cách làm việc với dự án này

Dự án video được tạo từ **video-kit**. Lời đọc tiếng Việt do máy tạo offline, hoạt hình tự khớp theo lời đọc.

## Cấu trúc

```
SCRIPT.md              lời đọc của từng cảnh  →  "## … (Frame N)" + đoạn thụt lề 4 dấu cách
video.config.json      thứ tự cảnh, chuyển cảnh, giọng đọc, cách đọc từ viết tắt, độ dài khoảng lặng
cues/NN.json           tên cue → cụm từ trong lời đọc (mốc để kích hoạt hoạt hình)
compositions/frames/   mỗi cảnh một file HTML
assets/voice/          NN.mp3 do tools/voice.sh tạo
audio_meta.json        thời lượng và mốc thời gian từng từ (do tools/tts.py tạo)
index.html             do tools/timing.mjs tạo — KHÔNG sửa tay
DESIGN.md              quy tắc thiết kế và chuyển động
```

## Quy trình

1. **Viết lời đọc** trong `SCRIPT.md`. Mỗi cảnh một đoạn.
2. **Khai báo cảnh** trong `video.config.json` → `frames`:
   `{ "n": 3, "id": "f03-ten-canh", "tr": "crossfade" | "push", "pad": 2.0 }`.
   Thứ tự trong mảng chính là thứ tự phát. `pad` là số giây lặng sau lời đọc (cuối mỗi phần nên để 2.0).
3. **Tạo file cảnh** bằng cách chép một mẫu:
   - `f02-slide.html`: slide có spotlight (làm nổi mục đang được đọc);
   - `f101-story.html`: hoạt hình kể chuyện có nhân vật;
   - `f01-title.html`, `f99-closing.html`: tiêu đề và kết thúc.

   Đổi tiền tố (vd. `f02-slide` → `f03-ten-canh`) ở **mọi chỗ**: id, class, `data-composition-id`,
   `window.__timelines[...]`.
4. **Viết cue** trong `cues/NN.json`, ví dụ `{ "p1": "Thứ nhất", "rest": "báo IT ngay +0.9" }`:
   - `"cụm từ"`: lúc bắt đầu đọc cụm đó;
   - `"cụm từ#2"`: lần xuất hiện thứ hai của cụm;
   - `"cụm từ +0.3"` hoặc `"cụm từ -0.2"`: lệch thêm hay bớt bấy nhiêu giây;
   - `"@end-1.5"`: tính ngược từ cuối lời đọc;
   - một con số: thời điểm tính bằng giây.

   Cụm từ phải có nguyên văn trong `SCRIPT.md` (đúng dấu). Dấu câu được bỏ qua khi so khớp.
5. **Xem thử ngay, chưa cần giọng đọc:** `node tools/timing.mjs`, rồi `npm run dev`.
   Khi chưa có giọng, thời gian được **ước lượng** theo số từ.
6. **Tạo giọng đọc:** `bash tools/voice.sh`, hoặc `bash tools/voice.sh 2,101` để chỉ làm lại vài cảnh.
   Giọng chạy offline trên CPU, mất khoảng 1–2 phút mỗi cảnh. Script tự thử tối đa 3 lần và giữ bản mà
   Whisper nhận đúng nhiều từ nhất.
7. **Kiểm tra:** `npm run check` (không được có ✗), rồi chụp ảnh khung hình để xem:
   `npx hyperframes snapshot --at 12.5,20 --no-end`.
8. **Xuất video:** `npm run render`, ra file `renders/<tên>.mp4`.

## Khi sửa

- Sửa lời đọc: sửa `SCRIPT.md`, chạy `bash tools/voice.sh N`, rồi kiểm tra cue của cảnh N còn khớp không.
  `timing.mjs` báo lỗi nếu không tìm thấy cụm từ.
- Từ viết tắt đọc sai: thêm vào `video.config.json` → `say`, ví dụ `["\\bSEMV\\b", "S E M V"]`.
- Đổi giọng: `video.config.json` → `voice`. Các giọng VieNeu có sẵn gồm Hải Đăng, Thiện Minh, Minh Đức,
  Phạm Tuyên…

## Môi trường (một lần cho mỗi máy)

`bash tools/setup-tts.sh` cài uv, Python 3.12, VieNeu-TTS và faster-whisper vào `~/.video-kit/`, và xuất
kho chứng chỉ Windows (để đi qua được tường lửa kiểm tra TLS như FortiGate). Model (~2 GB) tải về
`~/.cache/vnhf/` ở lần tạo giọng đầu tiên. Máy cũng cần Node.js và ffmpeg trong PATH.
