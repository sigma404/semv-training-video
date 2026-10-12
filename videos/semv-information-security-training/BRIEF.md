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
