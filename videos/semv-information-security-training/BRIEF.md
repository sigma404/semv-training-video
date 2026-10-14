---
workflow: faceless-explainer
flow: automation
storyboard: yes
message: "Mỗi nhân viên SEMV là một lớp bảo vệ: tuân thủ chính sách, cảnh giác và báo cáo ngay khi thấy bất thường."
destination: internal-training
aspect: 1920x1080
language: vi
audience: "Nhân viên mới của SEMV (Sumika Electronic Materials Vietnam)"
length: 120s
angle: listicle
narration: yes
---

## Intent

Video đào tạo bảo mật thông tin cho nhân viên mới SEMV, khoảng 2 phút, tiếng Việt,
chuyển thể từ tài liệu "Đào tạo bảo mật thông tin (Đào tạo người mới)" của IT Part.
Phong cách doanh nghiệp, chuyên nghiệp; tông xanh dương và trắng; animation dạng
infographic hiện đại. Lồng tiếng AI tiếng Việt, phụ đề chạy theo lời đọc.

Tám cảnh theo đúng thứ tự người dùng yêu cầu:

1. Information Security Training (tiêu đề)
2. Why information security matters
3. Access control and password policy
4. Malware protection
5. Security incidents
6. Real-world ransomware and phishing cases
7. 7 security best practices
8. Closing screen

## Assets

- assets/đào tạo bảo mật thông tin ( Đào tạo người mới).pdf: tài liệu nguồn (ở thư mục gốc workspace); toàn văn nằm trong capture/extracted/visible-text.txt.

## Customizations

- Có icon, chuyển cảnh động, thanh tiến trình (progress bar) và phụ đề.
- Nhạc nền doanh nghiệp nhẹ, giảm âm lượng khi có giọng đọc. Chỉ thêm khi có file nhạc, vì HeyGen chưa đăng nhập và MusicGen thiếu dependency.
- Thương hiệu: chữ "SEMV" làm wordmark và tên đầy đủ "Sumika Electronic Materials Vietnam".

## Notes

- Người dùng viết "Samsung/SEMV style", nhưng tài liệu nguồn xác định SEMV là Sumika Electronic Materials Vietnam. Không dùng tên hoặc logo Samsung.
- Xuất MP4 1920x1080.
- Giọng đọc: Microsoft Edge neural TTS, vi-VN-HoaiMyNeural (nữ), đưa vào pipeline dưới dạng audio do host cung cấp. Người dùng chọn ở Step 0 vì chưa đăng nhập HeyGen, còn Kokoro không có giọng tiếng Việt. Chưa có nhạc nền, trừ khi người dùng gửi file nhạc.

## v2 — 2026-10-12

Người dùng yêu cầu "video chi tiết bám sát nội dung của file hơn". Đã xác nhận:
- Độ dài khoảng 3 phút (length: 180s); cùng workflow faceless-explainer, cùng khổ 1920x1080, cùng giọng đọc và thiết kế.
- Cấu trúc theo mục lục PDF: Mở đầu → 1. Định nghĩa chính sách → 2. Bối cảnh → 3. Áp dụng & tuân thủ (truy cập · mã độc · sự cố) → 4. Sự cố thực tế (email Sumitomo · ransomware · lừa đảo tài chính) → 5. 7 biện pháp → Kết.
- Bản v2 riêng; v1 được giữ lại (renders/video-v1.mp4, versions/v1/).
- Duyệt kịch bản (đã duyệt SCRIPT-v2.md), bỏ sketch, dựng thẳng; render chỉ sau khi người dùng xem preview.
- Files: STORYBOARD-v2.md, SCRIPT-v2.md, audio_meta-v2.json, assets/voice-v2/, compositions/frames/v2-*.html.

## v3 — 2026-10-14

Góp ý của người dùng về v2 và cách xử lý:
- Lời đọc đã là tiếng Việt nên phụ đề chữ nhảy theo từng từ gây khó tiếp thu → **bỏ phụ đề**. Thay vào đó, mỗi slide hiện đầy đủ ngay từ đầu, rồi **làm nổi (spotlight) đúng mục đang được đọc**. Đặc tả: `.hyperframes/v3-spotlight-spec.md`.
- Giọng AI chưa phù hợp, người dùng muốn giọng tự nhiên như NotebookLM và Claude tự cài được (không cần API key) → **VieNeu-TTS v3 Turbo, giọng nam "Hải Đăng"**, chạy offline trên CPU, giấy phép Apache-2.0 (được dùng thương mại). Edge TTS bị FortiGate (kiểm tra TLS) chặn.
- Bỏ nội dung dành cho quản trị viên (phân quyền A/B/C, cài phần mềm phòng chống mã độc).
- Phần mềm diệt virus do IT quản lý, tự quét và tự cập nhật; người dùng không thể tắt/gỡ → người dùng chỉ cần: cập nhật Windows khi có thông báo, không dùng phần mềm không rõ nguồn, có cảnh báo hay bất thường thì báo IT.

Files: SCRIPT-v3.md, audio_meta-v3.json, assets/voice-v3/, compositions/frames/v3-*.html, `.hyperframes/cues-v3/NN.json` (cue neo theo cụm từ trong lời đọc).
Bản v2 vẫn được giữ: versions/v2/index.html, các file v2-*, renders/video-v2.mp4.
Tạo lại giọng đọc và tính lại thời gian: `bash .hyperframes/v3-voice.sh` (gồm vieneu-tts.py → pad-voice → v3-timing). Chạy `node .hyperframes/v3-timing.mjs` cũng tự khớp lại toàn bộ spotlight mỗi khi lời đọc thay đổi.
- Người dùng muốn cảnh mở đầu có một ví dụ thực tế dạng hoạt hình cho ý "chỉ một cú nhấp chuột" → thêm **Frame 0 (v3-00-story)**, khoảng 22 giây, đặt trước phần mở đầu. Nội dung: anh Minh (nhân vật hư cấu) nhận email giả mạo "Phòng Kế toán", bấm "Xem hóa đơn", màn hình tống tiền hiện ra, mã độc lan sang máy chủ và các máy khác, dây chuyền sản xuất dừng lại. Ngay sau đó Frame 1 vào bằng câu "Chỉ một cú nhấp chuột sai…".
- Người dùng muốn mỗi phần có một đoạn hoạt hình ví dụ → thêm 7 cảnh ví dụ, đặt **ngay sau slide nội dung** của mỗi phần (frame 102, 103, 104, 105, 106, 109, 110 = "ví dụ sau frame N"). Nội dung: vai trò ngày đầu đi làm (chị Lan) · gửi nhầm bản vẽ (anh Tuấn) · cho mượn tài khoản (chị Lan) · USB lạ rồi báo IT (anh Hùng) · báo sự cố (chị Hoa) · gọi xác nhận trước khi chuyển tiền (chị Mai) · khóa máy Win + L (anh Minh). Tất cả nhân vật đều hư cấu. Tổng thời lượng khoảng 5,5 phút.
- Góp ý về các cảnh ví dụ (2026-10-14):
  - Bỏ câu mở "Ví dụ —" khỏi lời đọc của cả 7 cảnh ví dụ, vì lặp lại nghe không tự nhiên. Nhãn "Ví dụ thực tế" trên màn hình vẫn giữ.
  - 102: chị Lan đến SEMV và được **bộ phận IT đào tạo bảo mật**, sau đó ký cam kết. Không có nhân vật quản lý.
  - 105: máy tính công ty **đã chặn USB từ trước**, nên thiết bị không được nhận và cảnh báo tự gửi đến IT. Anh Hùng vi phạm quy định nên phải **tham gia đào tạo lại về bảo mật**.
