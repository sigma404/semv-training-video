# DESIGN — quy tắc thiết kế và chuyển động

Phong cách doanh nghiệp, sạch và chuyên nghiệp: nền trắng, một màu nhấn xanh cobalt, dạng infographic.
Khung hình 1920×1080.

## Màu

| Token | Giá trị | Dùng cho |
|---|---|---|
| bg | `#FFFFFF` (slide) · `#EEF3FB` (cảnh hoạt hình) | nền |
| primary | `#0A3D91` | màu nhấn duy nhất: eyebrow, viền spotlight, nút, thanh tiến trình |
| primary-2 | `#3B6CC4` | lớp thứ hai của icon, áo nhân vật IT |
| text | `#0F172A` | tiêu đề, chữ chính |
| text-muted | `#475569` | mô tả |
| card-bg | `rgba(10,61,145,0.04)` + viền `rgba(10,61,145,0.2)` | thẻ |
| accent-light | `rgba(10,61,145,0.08)` | pill, thẻ đang được spotlight |
| positive | `#059669` | đúng / an toàn |
| negative | `#dc2626` | sai / nguy hiểm / bị chặn |
| warning | `#F59E0B` | đáng ngờ |

Bo góc: thẻ 14px, pill 100px. Thẻ không đổ bóng, trừ khi đang được spotlight.

## Chữ

Chỉ dùng font **Be Vietnam Pro** (đã có trong `assets/fonts/`, giấy phép OFL).
- Eyebrow: 24px, 600, chữ hoa, giãn chữ 0.08em, màu primary.
- H2 của slide: 60px, 700, giãn chữ -0.02em.
- H1 của tiêu đề: 96–104px, 800.
- Tên thẻ: 38–44px, 600–700. Mô tả: 30–36px, 500, màu text-muted.
- Không có chữ nào dưới 24px trong khung 1920×1080.

Bố cục: lề trái/phải 96px; header ở top 84px, H2 ở top 140px; vùng 890–1010px dành cho thẻ thông điệp chốt.

## Chuyển động trên slide (spotlight)

1. **Slide hiện đầy đủ thật nhanh.** Header xong trong khoảng 0,8 giây, toàn bộ nội dung xong trong khoảng
   2 giây. Mỗi phần tử chỉ mờ dần vào và nhích lên ≤ 20px (`power2.out`, 0,4–0,6 giây). Không hiện chữ theo
   từng từ, không có hiệu ứng gõ chữ, không phóng to hay rung chữ.
2. **Spotlight theo lời đọc.** Khi người đọc nói tới một mục: mục đó phóng lên 1.03, có vòng viền
   `0 0 0 3px #0A3D91` và nền 0.08; các mục khác mờ xuống còn 0.4. Ở cue `rest`, mọi mục trở về bình thường.
   Xem helper `spot()` trong `f02-slide.html`.
3. **Không có phụ đề.** Lời đọc đã là tiếng Việt, phụ đề nhảy theo từng từ khiến người xem khó tiếp thu.
4. Toàn khung được đẩy vào rất chậm (scale tối đa 1.02). Chuyển cảnh: crossfade hoặc push 0,5 giây,
   do `video.config.json` → `tr` quyết định.

## Cảnh ví dụ (hoạt hình có nhân vật)

- Đặt cảnh ví dụ **ngay sau slide nội dung** của phần đó. Nhân vật luôn là **hư cấu** (anh Minh, chị Lan…).
- Lời đọc **không mở đầu bằng "Ví dụ —"**: lặp lại ở mọi cảnh nghe không tự nhiên. Hãy vào thẳng câu chuyện.
  Nhãn "Ví dụ thực tế" ở góc màn hình là đủ.
- Câu chuyện phải đúng **quy trình thật của công ty**: ai làm gì, máy đã cài sẵn gì, điều gì bị chặn sẵn.
  Hỏi người dùng nếu chưa chắc. Ví dụ trong video bảo mật SEMV: IT đào tạo nhân viên mới, máy đã chặn USB
  từ trước, vi phạm thì phải đào tạo lại.
- Cấu trúc: bối cảnh → sự việc → hành động (đúng hoặc sai) → hậu quả hay kết quả → thẻ thông điệp chốt.
- Camera (`cam()`) chỉ di chuyển giữa các nhịp, ease `power3.inOut` trong 0,6–1,0 giây.
- Nhân vật: `person()` trong `f101-story.html` (nhìn thẳng). Các động tác có sẵn: walk, pose (tay), look
  (mắt), grin (cười), blink (chớp mắt), hop (nhún).
- Mỗi cảnh chỉ có một thẻ thông điệp chốt, đặt ở đáy khung hình.

## Lỗi bố cục đã gặp, cần tránh

- Pop-up hay dropdown đè lên chữ: phải che kín ngay từ khung đầu tiên (mở bằng `clipPath`), không mờ dần,
  vì chữ phía dưới sẽ lộ xuyên qua.
- Nhãn góc "Ví dụ thực tế" đè lên giao diện khi camera phóng cận vào màn hình: ẩn nhãn trong đoạn đó.
- Hai bảng chuyển cho nhau phải nối tiếp (bảng cũ biến mất trước khi bảng mới hiện), không chồng mờ lên nhau.
- Chỗ chồng lớp có chủ ý (con dấu, thẻ nổi) thì đánh dấu `data-layout-allow-overlap`.

## Hợp đồng kỹ thuật (HyperFrames)

Mỗi frame có:
- `<template>` bao `#root[data-composition-id="<id>"]`;
- các phần tử `.clip` có `data-start`, `data-duration`, `data-track-index`;
- **đúng một** timeline GSAP ở trạng thái paused, đăng ký vào `window.__timelines["<id>"]`, kết thúc bằng
  `tl.set({}, {}, DURATION)`;
- `var CUE = /*hf-cues:start*/{}/*hf-cues:end*/;` và `var DURATION = /*hf-dur:start*/0/*hf-dur:end*/;`
  (giá trị do `tools/timing.mjs` điền vào);
- tính tất định: không dùng `Math.random`, `Date`, hay `setTimeout`.

Mọi id và class đều mang tiền tố là id của frame (ví dụ `f02-slide-card1`). Id không được bắt đầu bằng chữ số.
