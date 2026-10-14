# video-kit — bộ khung làm video đào tạo tiếng Việt

Bộ khung được tách ra từ video "Đào tạo bảo mật thông tin" (bản v3). Thư mục này không phụ thuộc vào video
đó: mỗi video mới là **một bản sao độc lập**, nên sửa video này không ảnh hưởng video kia, và cũng không ảnh
hưởng bộ khung.

## Có gì bên trong

- **Lời đọc tiếng Việt offline:** VieNeu-TTS v3 Turbo, giọng nam "Hải Đăng". Giấy phép Apache-2.0, dùng
  thương mại được, không cần API key.
- **Đồng bộ tự động:** Whisper lấy mốc thời gian của từng từ, rồi hoạt hình bám theo cụm từ trong lời đọc.
  Sửa lời hay đổi giọng thì chỉ cần chạy lại, không phải chỉnh tay từng giây.
- **4 cảnh mẫu:** tiêu đề · slide có spotlight (làm nổi mục đang được đọc) · hoạt hình kể chuyện có nhân
  vật · kết thúc.
- **Thiết kế** (`DESIGN.md`): xanh cobalt `#0A3D91` trên nền trắng, font Be Vietnam Pro, quy tắc chuyển
  động. Kèm những bài học từ các lần góp ý: bỏ phụ đề, không mở cảnh bằng "Ví dụ —", câu chuyện phải đúng
  quy trình thật của công ty.
- **Thanh tiến trình, chuyển cảnh** (crossfade/push), xuất MP4 1920×1080.

## Tạo video mới

```bash
node video-kit/new-video.mjs videos/ten-video-moi "Tiêu đề video"
cd videos/ten-video-moi
node tools/timing.mjs      # xem thử ngay với thời gian ước lượng
npm run dev                # mở Studio preview
```

Sau đó làm theo `KIT.md` trong thư mục video mới:
viết `SCRIPT.md` → khai báo cảnh trong `video.config.json` → chép cảnh mẫu → viết `cues/` →
`bash tools/voice.sh` → `npm run check` → `npm run render`.

Nếu làm cùng Claude Code, chỉ cần nói kiểu: *"tạo video mới từ video-kit về chủ đề X, tài liệu nguồn là
file Y"*. Claude sẽ đọc `KIT.md` và `DESIGN.md` trong dự án mới.

## Cài đặt (một lần cho mỗi máy)

Cần có sẵn: Node.js, ffmpeg (có trong PATH) và Git Bash.

```bash
bash video-kit/template/tools/setup-tts.sh
```

Script cài vào `~/.video-kit/`: uv, Python 3.12 và venv có VieNeu-TTS cùng faster-whisper (~750 MB), kèm kho
chứng chỉ Windows để đi qua tường lửa FortiGate. Model (~2 GB) nằm ở `~/.cache/vnhf/`. **Máy này đã cài
xong** nên không cần chạy lại.

## Cấu trúc

```
video-kit/
  README.md          tài liệu này
  new-video.mjs      tạo dự án video mới từ template/
  template/          khung dự án (chép nguyên khi tạo video mới)
    KIT.md           hướng dẫn quy trình chi tiết
    DESIGN.md        quy tắc thiết kế và chuyển động
    SCRIPT.md        lời đọc mẫu
    video.config.json
    cues/            mốc cue mẫu
    compositions/frames/
      f01-title.html  f02-slide.html  f101-story.html  f99-closing.html
    tools/
      tts.py         VieNeu-TTS + Whisper → assets/voice/*.mp3 + audio_meta.json
      pad-voice.mjs  thêm khoảng lặng sau mỗi đoạn
      timing.mjs     khớp cue và tạo index.html (có chế độ ước lượng khi chưa có giọng)
      voice.sh       chạy cả chuỗi trên
      setup-tts.sh   cài môi trường TTS
    assets/fonts/    Be Vietnam Pro (OFL)
```
