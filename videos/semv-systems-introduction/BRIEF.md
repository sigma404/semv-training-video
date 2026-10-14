---
workflow: faceless-explainer
flow: automation
storyboard: no
message: "Bốn hệ thống Groupware, POVIS, SAP, MES giúp SEMV vận hành thông suốt — làm quen để làm việc trôi chảy từ ngày đầu."
destination: internal-training
aspect: 1920x1080
language: vi
audience: "Nhân viên mới của SEMV (Sumika Electronic Materials Vietnam)"
length: 150s
angle: overview + example per system
narration: yes
---

## Intent

Video giới thiệu các hệ thống SEMV đang vận hành, theo thứ tự Groupware → POVIS → SAP → MES. Video mở đầu
bằng lời chào mừng và kết thúc bằng "hy vọng được đồng hành". Mỗi hệ thống có một slide và một cảnh hoạt
hình ví dụ. Dựng từ video-kit (xem KIT.md, DESIGN.md).

## Nguồn

- `../../assets/10.10.2024_GIỚI THIỆU TỔNG QUÁT HỆ THỐNG SEMV.pptx` (IT Part, 10/2024).

## Quyết định của người dùng (2026-10-14)

- Độ dài khoảng 2–3 phút.
- Màn hình phần mềm được **vẽ lại dạng mô phỏng**, dùng tên và dữ liệu hư cấu. Không dùng ảnh chụp thật,
  vì ảnh có tên nhân viên, mã nhân viên, số điện thoại và IP nội bộ.
- **Không** có phần hướng dẫn đăng nhập (URL, ID/Password).
- Giọng "Hải Đăng", không phụ đề, có spotlight. Lời đọc các cảnh ví dụ không mở đầu bằng "Ví dụ —".
- Duyệt kịch bản trước khi dựng; render chỉ sau khi người dùng xem preview.

## Ghi chú nội dung

- Các module SAP mà SEMV dùng: PP, MM, SD, FI, CO. HCM và PS **không** dùng (theo ghi chú của slide 11).
- Line phê duyệt trên Groupware: nhân viên → Part Leader → Team Leader → Group Leader → Tổng giám đốc.
  Hòm thư phê duyệt có các trạng thái chưa hoàn thành / đang tiến hành / đã hoàn thành / trả lại.
- POVIS dùng chung tài khoản với Groupware. Tài liệu đăng ký trên POVIS được phê duyệt trên Groupware.
- **MES ở SEMV chỉ dùng để xem số liệu sản xuất.** Hệ thống không xem trực tiếp nhiệt độ hay bất kỳ thông số
  vật lý nào của máy (người dùng xác nhận 2026-10-14). Vì vậy video không mô tả MES giám sát hay cảnh báo
  trạng thái máy.
