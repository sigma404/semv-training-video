---
format: 1920x1080
duration: 187s
message: "Mỗi nhân viên SEMV là một lớp bảo vệ: tuân thủ chính sách, cảnh giác và báo cáo ngay khi thấy bất thường."
arc: listicle with story-explainer
audience: "Nhân viên mới của SEMV (Sumika Electronic Materials Vietnam)"
mode: autonomous
music: none
language: vi
---

## Decisions

- Version: v2 (2026-10-12), bám sát mục lục PDF; v1 giữ ở STORYBOARD.md / renders/video-v1.mp4 / versions/v1/.
- Spine: mục lục 5 phần. Mọi frame nội dung có eyebrow "PHẦN N/5 · <TÊN PHẦN>" ở góc trên trái, và tag-pill bên phải là tên chủ đề con. Khiên SEMV mở ở F03 (bối cảnh) và khép lại ở F11.
- Format: 1920x1080, khoảng 181s, VO tiếng Việt Edge vi-VN-HoaiMyNeural tốc độ 0.95, mỗi clip được thêm 1.2–2.0s lặng ở cuối (.hyperframes/pad-voice.mjs); phụ đề; không nhạc nền. Caption keep-out: mọi nội dung frame ở y < 896px.
- Brand: frame.md (blue-professional remix: nền trắng, xanh #0A3D91, navy #0F172A, Be Vietnam Pro).
- Truthfulness: mọi câu chữ và số liệu lấy từ PDF đào tạo của SEMV IT Part (2021); chỉ rút gọn, không thêm ý mới.
- Held frames: F08 giữ con số 5 triệu USD đứng yên khoảng 2s; F11 giữ lockup cuối. Mọi frame kết thúc bằng 1.2–2.0s giữ đọc (khoảng lặng của giọng).
- Reference build: mỗi frame có một file v1 tương ứng trong versions/v1/compositions/frames/ (cùng hệ thiết kế). Worker dùng lại style và pattern chuyển động, nhưng nội dung và timing theo packet v2.
- Progress bar + captions: ở index (thêm tay sau assemble-index, như v1).

## Video direction

- Palette (frame.md): nền trắng #FFFFFF trên mọi frame; xanh SEMV #0A3D91 là màu nhấn DUY NHẤT (eyebrow, số, icon, viền thẻ, pill, khiên); tiêu đề navy #0F172A; chữ phụ slate #475569; thẻ nền xanh 4% + viền xanh 20% + bo 14px, không đổ bóng. Đỏ #dc2626 chỉ dùng cho cảnh báo (F04 thẻ cấm, F05 dòng cảnh báo, F07 nhãn "Giả mạo", F09 nhãn "Lừa đảo").
- Type: Be Vietnam Pro (display 700–800 cho tiêu đề/số; 600 cho eyebrow viết hoa giãn chữ; 500 cho nhãn thẻ). Chữ trong thẻ tối thiểu 28px; chữ mô tả phụ tối thiểu 24px.
- Icons: SVG nét mảnh 2px màu primary, vẽ inline. Không emoji.
- Slide-header ở F02–F10: eyebrow "PHẦN N/5 · …" + tag-pill phải + h2. Atmosphere (dải chéo, lưới chấm, vòng tròn đồng tâm) chỉ ở F01 và F11.
- Motion grammar: ease power3 (expo.out cho lần vào nhanh); không bounce/overshoot. Mỗi phần tử xuất hiện ĐÚNG mốc lời đọc nhắc tới nó (thời gian Scene lấy từ word timing thật). Tại t=0 chỉ có header. Giữ hình = đứng yên; cho phép camera macro rất nhẹ (scale ≤ 1.02, tuyến tính, cả frame) như v1.
- Negative list: không glow, không drop shadow, không gradient "AI", không bokeh, không logo Samsung, không con trỏ hay khung trình duyệt thật, không số liệu ngoài PDF. Tránh slideshow (dồn hết nội dung ở 25% đầu) và screensaver (phần tử trôi vô nghĩa).

## Frame 1 — Mở đầu & mục lục

- scene: Hook "Chỉ một cú nhấp chuột sai — cả hệ thống có thể dừng lại", sau đó title card SEMV, rồi mục lục 5 phần
- voiceover: "Chỉ một cú nhấp chuột sai — cả hệ thống có thể dừng lại. Đây là khóa đào tạo bảo mật thông tin dành cho nhân viên mới SEMV, gồm năm phần."
- duration: 12.44s
- transition_in: cut
- status: animated
- src: compositions/frames/v2-01-intro.html
- type: hook
- persuasion: Stakes / consequence + Frame-then-fill (mục lục)
- beat: Tension → orientation
- blueprint: kinetic-type-beats (Adapt)
- focal: dòng hook, sau đó h1 "Đào tạo bảo mật thông tin" kèm danh sách mục lục 5 phần
- roles: hook line = foreground subject · dải chéo xanh + lưới chấm 3x3 + khiên ổ khóa trắng = atmosphere (phải ~36%) · eyebrow "SEMV · IT PART" + accent-line + sub-line = supporting · mục lục 5 dòng đánh số = supporting payoff

narrativeRole: Mở bằng cái giá của sự lơ là, giới thiệu khóa học và cho người xem thấy cấu trúc 5 phần của tài liệu.
keyMessage: Khóa học có 5 phần, và bảo mật là chuyện của từng cú nhấp chuột.

Adapt: giữ signature của kinetic-type-beats (câu dựng qua các beat toàn màn hình rồi chốt payoff); payoff là title card + mục lục.
Scene 1 (0.0–1.6s): nền trắng, căn giữa vùng trên. "Chỉ một cú nhấp chuột sai" hiện từng từ theo lời đọc, chữ display 800 near-black cỡ lớn (~84px). Một icon con trỏ nét mảnh lướt vào và click ở chữ "sai" (1.1s), kèm một vòng ripple xanh duy nhất.
Scene 2 (1.7–3.6s): dòng 2 "— cả hệ thống có thể dừng lại." hiện từng từ bên dưới; ở "dừng lại" (2.9s) một vệt highlight xanh nhạt quét qua hai chữ đó.
Scene 3 (3.7–5.2s): seam cut-the-curve (cut-catalog.md): hai dòng hook trượt sang trái ra khỏi khung, đồng thời dải chéo xanh quét vào từ phải; lưới chấm 3x3 hiện lên; khiên + ổ khóa trắng trong dải tự vẽ nét (svg-path-draw).
Scene 4 (4.4–7.6s): bố cục cover nghiêng trái. Eyebrow "SEMV · IT PART" + accent-line vào ở "Đây là" (4.4s); h1 hai dòng "Đào tạo bảo mật / thông tin" hiện từng từ từ "đào tạo" (4.9s) tới "tin" (6.0s); sub-line "Dành cho nhân viên mới · Sumika Electronic Materials Vietnam" hiện ở "SEMV" (7.4s).
Scene 5 (8.7–10.4s): ở "gồm năm phần" (8.7s) cụm title thu nhỏ và trượt lên (~65% cỡ cũ); bên dưới, cột trái, mục lục 5 dòng đánh số (vòng tròn số xanh + nhãn) xếp vào theo stagger nhanh: "1 Định nghĩa chính sách bảo mật" · "2 Bối cảnh" · "3 Áp dụng và tuân thủ chính sách" · "4 Các trường hợp sự cố thực tế" · "5 Biện pháp nâng cao bảo mật". Toàn bộ nằm trên y < 880px.
Scene 6 (10.4–12.44s): giữ đọc, đứng yên.

## Frame 2 — Phần 1: Định nghĩa chính sách bảo mật

- scene: Thẻ định nghĩa lớn ("Chính sách bảo mật là tiêu chuẩn chung · quy định cách bảo đảm an ninh hệ thống thông tin"), sau đó 3 thẻ nguyên tắc có icon
- voiceover: "Phần một — chính sách bảo mật là gì? Đó là tiêu chuẩn chung, quy định cách bảo đảm an ninh cho hệ thống thông tin. Ba nguyên tắc cốt lõi — cải tiến bảo mật liên tục — mỗi người hoàn thành trách nhiệm theo vai trò — và đánh giá rủi ro qua các mối đe dọa."
- duration: 18.704s
- transition_in: crossfade
- status: animated
- src: compositions/frames/v2-02-definition.html
- type: product_intro
- persuasion: Question→answer pairing + Rule of three
- beat: Curiosity → clarity
- blueprint: grid-card-assemble (Adapt)
- focal: thẻ định nghĩa (split-highlight lớn, viền trái xanh 4px)
- roles: thẻ định nghĩa = foreground subject (nửa trên, full-width) · 3 thẻ nguyên tắc (triptych) = supporting · slide-header = supporting · nền trắng = background

narrativeRole: Trả lời "chính sách bảo mật là gì" và gọi tên ba nguyên tắc nền của nó.
keyMessage: Chính sách bảo mật là tiêu chuẩn chung để bảo đảm an ninh hệ thống thông tin, dựa trên ba nguyên tắc.

Adapt: giữ signature assemble (các mục tự xếp theo stagger rồi giữ); mỗi thẻ nguyên tắc vào đúng mốc lời đọc.
Scene 1 (0.0–3.0s): slide-header: eyebrow "PHẦN 1/5 · ĐỊNH NGHĨA", tag-pill "Chính sách bảo mật"; h2 "Chính sách bảo mật là gì?" hiện từng từ trong khoảng 0.8–2.0s.
Scene 2 (3.2–7.2s): thẻ định nghĩa (split-highlight: nền xanh 8%, viền trái xanh 4px, full-width) trượt lên ở "Đó là" (3.2s). Bên trong có hai dòng: dòng 1 "Tiêu chuẩn chung về hệ thống thông tin" (h3 700) vào ở 3.6s; dòng 2 "Quy định cách bảo đảm an ninh cho hệ thống thông tin" (body 500, slate) vào ở "quy định" (4.6s).
Scene 3 (8.2–9.4s): nhãn "BA NGUYÊN TẮC CỐT LÕI" (eyebrow, slate) hiện dưới thẻ định nghĩa ở "Ba nguyên tắc" (8.2s).
Scene 4 (9.6–15.8s): ba thẻ nguyên tắc (triptych, mỗi thẻ có icon nét mảnh trên cùng + nhãn 2 dòng) vào lần lượt theo lời đọc: "Cải tiến bảo mật liên tục" (icon mũi tên tuần hoàn) 9.6s · "Hoàn thành trách nhiệm theo vai trò" (icon người + huy hiệu) 11.2s · "Đánh giá rủi ro qua mối đe dọa" (icon radar/tam giác cảnh báo nét xanh) 13.4s. Icon của mỗi thẻ tự vẽ nét khi thẻ vào (svg-path-draw).
Scene 5 (15.8–18.704s): giữ đọc, đứng yên.

## Frame 3 — Phần 2: Bối cảnh

- scene: Khiên SEMV ở giữa, 4 thẻ mục đích bung ra quanh khiên, kết bằng pill "Tuân thủ & tăng cường bảo mật"
- voiceover: "Phần hai — bối cảnh. Chính sách giúp ngăn thiệt hại do rò rỉ thông tin — giữ sản xuất, kinh doanh không gián đoạn — giữ niềm tin khách hàng — và giúp mỗi người hiểu tầm quan trọng của bảo mật để tuân thủ."
- duration: 14.912s
- transition_in: crossfade
- status: animated
- src: compositions/frames/v2-03-context.html
- type: pain_point
- persuasion: Numbered enumeration + Distillation
- beat: Recognition → resolve
- blueprint: constellation-hub (Adapt)
- focal: khiên SEMV ở giữa (outline xanh, chữ "SEMV" 800)
- roles: khiên = foreground subject · 4 thẻ mục đích có icon + đường nối hairline tới khiên = supporting nodes · pill kết luận xanh đặc = payoff · slide-header = supporting · nền trắng = background

narrativeRole: Giải thích vì sao SEMV áp dụng chính sách: bốn mục đích, quy về tuân thủ.
keyMessage: Chính sách tồn tại để chặn rò rỉ, giữ sản xuất, giữ khách hàng và để mọi người tuân thủ.

Adapt: giữ signature của constellation-hub (các node bật vào quanh một tâm rồi dồn về lõi); 4 node ở 4 góc quanh khiên, phần dồn về lõi là khiên được tô đầy, không có camera push.
Scene 1 (0.0–2.4s): slide-header: eyebrow "PHẦN 2/5 · BỐI CẢNH", tag-pill "Mục đích áp dụng", h2 "Vì sao cần chính sách bảo mật?"; outline khiên tự vẽ nét ở giữa (svg-path-draw) ở "bối cảnh" (1.0s).
Scene 2 (2.9–4.9s): thẻ "Ngăn thiệt hại do rò rỉ thông tin" (icon ổ khóa) bung từ khiên ra góc trên-trái (center-outward-expansion), đường nối hairline tự vẽ về khiên, ở "ngăn" (3.1s).
Scene 3 (5.2–7.2s): thẻ "Sản xuất, kinh doanh không gián đoạn" (icon nhà máy) bung ra góc trên-phải ở "giữ sản xuất" (5.2s).
Scene 4 (7.5–8.8s): thẻ "Giữ niềm tin khách hàng" (icon bắt tay) bung ra góc dưới-trái ở 7.5s.
Scene 5 (9.0–11.0s): thẻ "Hiểu tầm quan trọng của bảo mật" (icon bóng đèn) bung ra góc dưới-phải ở "và giúp" (9.0s).
Scene 6 (11.4–14.912s): ở "tuân thủ" (11.4s) lớp tô xanh dâng lên trong khiên (stat-bars-and-fills, kiểu fill), chữ SEMV chuyển trắng; pill xanh đặc "Tuân thủ quy định · tăng cường bảo mật" bật lên ngay dưới khiên (vẫn trên y < 880px). Giữ yên.

## Frame 4 — Phần 3: Kiểm soát truy cập

- scene: Hai cột: "Quản trị viên" (thang A·B·C cho nhân viên & vendor, quy trình phân quyền) và "Người dùng" (không chia sẻ, không cho mượn, đổi mỗi 3 tháng, quy tắc mật khẩu với ô nhập và 5 tick)
- voiceover: "Phần ba — áp dụng và tuân thủ, bắt đầu với kiểm soát truy cập. Quản trị viên phân quyền theo cấp độ A, B, C cho nhân viên và vendor. Người dùng không chia sẻ, không cho mượn tài khoản, và đổi mật khẩu ba tháng một lần — từ 8 ký tự, gồm chữ thường, chữ hoa, số và ký tự đặc biệt."
- duration: 22.2s
- transition_in: push-slide LEFT
- status: animated
- src: compositions/frames/v2-04-access.html
- type: feature_showcase
- persuasion: Comparison of two options (vai trò) + Progressive disclosure
- beat: Focus + comprehension
- blueprint: comparison-split (Adapt)
- focal: cột "Người dùng" với ô mật khẩu và các tiêu chí được tick
- roles: cột trái "Quản trị viên" (thẻ, icon bánh răng/người quản trị) = co-subject · cột phải "Người dùng" (thẻ, icon người) = foreground subject · slide-header = supporting · nền trắng = background

narrativeRole: Tách rõ việc của quản trị viên và việc của người dùng trong kiểm soát truy cập.
keyMessage: Quản trị viên phân quyền theo cấp độ; người dùng giữ tài khoản cho riêng mình và đặt mật khẩu mạnh, đổi mỗi 3 tháng.

Adapt: giữ signature của comparison-split (hai thẻ ngang hàng vào từ hai phía, mỗi thẻ có pill badge); bỏ độ nghiêng 3D lớn, chỉ nghiêng rất nhẹ rồi về phẳng; nội dung trong mỗi thẻ hiện dần theo lời đọc.
Scene 1 (0.0–4.6s): slide-header: eyebrow "PHẦN 3/5 · ÁP DỤNG VÀ TUÂN THỦ", tag-pill "Kiểm soát truy cập", h2 "Kiểm soát truy cập" hiện ở "kiểm soát truy cập" (3.2s).
Scene 2 (5.0–9.6s): thẻ trái "QUẢN TRỊ VIÊN" vào từ trái ở "Quản trị viên" (5.0s), pill badge "Quản trị viên" bật lên; bên trong, dòng "Phân quyền theo cấp độ bảo mật" (5.7s); ba ô chữ A (6.9s), B (7.4s), C (8.0s) xếp vào theo mốc từng chữ; nhãn "Nhân viên & vendor" ở "vendor" (9.2s); dòng phụ "Yêu cầu đổi mật khẩu thường xuyên, kể cả khi ID dùng liên tục" (24px, slate) hiện ở 9.6s.
Scene 3 (10.7–13.4s): thẻ phải "NGƯỜI DÙNG" vào từ phải ở "Người dùng" (10.7s); hàng thẻ cấm đỏ nhỏ (icon cấm tự vẽ nét) "Không chia sẻ tài khoản" (11.1s) và "Không cho mượn tài khoản" (12.2s).
Scene 4 (13.6–15.4s): pill "Đổi mật khẩu 3 tháng / lần" (icon lịch) bật lên trong thẻ phải ở "đổi mật khẩu" (13.8s).
Scene 5 (15.5–20.2s): ô mật khẩu gõ "S•••••••@7k" kèm caret (discrete-text-sequence), từ 15.5s; các tiêu chí được tick đúng lúc đọc: "Từ 8 ký tự" 15.7s · "Chữ thường" 17.1s · "Chữ hoa" 17.9s · "Chữ số" 18.6s · "Ký tự đặc biệt" 19.7s; thanh độ mạnh đầy dần theo từng tick (stat-bars-and-fills), đầy 100% ở 19.9s.
Scene 6 (20.2–22.2s): giữ đọc, đứng yên.

## Frame 5 — Phần 3: Phòng chống mã độc

- scene: Thẻ "Quản trị viên: cài phần mềm phòng chống + hướng dẫn người dùng" ở trên trái; lưới 2x2 bốn việc của người dùng; cảnh báo đỏ "Làm ngơ → thiệt hại nhân lên nhiều lần"
- voiceover: "Với mã độc, quản trị viên cài phần mềm phòng chống và hướng dẫn người dùng. Bạn cần cập nhật diệt virus và Windows — không dùng phần mềm không rõ nguồn — quét virus trước khi gửi dữ liệu ra ngoài — và báo IT ngay khi thấy bất thường. Làm ngơ, thiệt hại sẽ nhân lên."
- duration: 18.936s
- transition_in: push-slide LEFT
- status: animated
- src: compositions/frames/v2-05-malware.html
- type: feature_showcase
- persuasion: Numbered enumeration + Causal chain
- beat: Comprehension → unease
- blueprint: grid-card-assemble (Adapt)
- focal: lưới 2x2 bốn việc của người dùng (thẻ 4 "báo IT" đổi sang nền xanh đặc)
- roles: thẻ quản trị viên (icon khiên + bánh răng) = supporting (cột trái) · 4 thẻ người dùng = foreground subject (cột phải ~60%) · dòng cảnh báo đỏ = payoff · slide-header = supporting · nền trắng = background

narrativeRole: Chia việc phòng chống mã độc giữa quản trị viên và người dùng, kết bằng cái giá của việc làm ngơ.
keyMessage: IT cài phần mềm và hướng dẫn; bạn cập nhật, tránh phần mềm lạ, quét trước khi gửi và báo IT ngay.

Adapt: giữ signature assemble; thêm thẻ quản trị viên bên trái và payoff cảnh báo ở cuối.
Scene 1 (0.0–1.0s): slide-header: eyebrow "PHẦN 3/5 · ÁP DỤNG VÀ TUÂN THỦ", tag-pill "Phòng chống mã độc", h2 "Phòng chống mã độc".
Scene 2 (1.1–4.8s): thẻ trái "QUẢN TRỊ VIÊN" (icon màn hình + khiên tự vẽ nét, svg-path-draw) vào ở "quản trị viên" (1.1s); dòng "Cài phần mềm phòng chống mã độc" (1.7s); dòng "Hướng dẫn người dùng biện pháp phòng ngừa" (3.2s).
Scene 3 (5.1–7.6s): nhãn "NGƯỜI DÙNG" trên cột phải ở "Bạn cần" (5.1s); thẻ 1 "Cập nhật diệt virus & Windows định kỳ" (icon làm mới) ở 5.5s.
Scene 4 (7.7–9.4s): thẻ 2 "Không dùng phần mềm không rõ nguồn" (icon ô ứng dụng gạch chéo) ở 7.7s.
Scene 5 (9.5–11.9s): thẻ 3 "Quét virus trước khi gửi dữ liệu ra ngoài" (icon kính lúp) ở 9.5s.
Scene 6 (12.0–14.5s): thẻ 4 "Thấy bất thường → báo IT ngay" (icon tam giác cảnh báo) vào ở 12.0s dạng tinted, rồi nền xanh đặc quét qua ở "IT" (12.4s), chữ chuyển trắng (stat-bars-and-fills, kiểu wipe).
Scene 7 (14.7–18.936s): dòng cảnh báo đỏ "Làm ngơ → thiệt hại nhân lên nhiều lần" hiện dưới lưới ở "Làm ngơ" (14.7s); cụm "nhiều lần" phóng to nhẹ ở "nhân lên" (16.2s). Giữ yên.

## Frame 6 — Phần 3: Phân loại sự cố bảo mật

- scene: Bảng 5 hàng × 3 cột (Phân loại · Nội dung · Nguyên nhân), mỗi hàng hiện theo lời đọc; cuối cùng mũi tên dẫn tới pill "Xử lý theo quy trình"
- voiceover: "Sự cố bảo mật có năm loại — lỗi dịch vụ, do hỏng phần cứng hay phần mềm — lỗi thông tin, khi dữ liệu bị rò rỉ, sửa đổi, phá hủy — vi phạm an ninh, như truy cập trái phép hay bị hack mật khẩu — lỗi bảo mật, khi tường lửa hay biện pháp bảo vệ không đủ — và sự cố đáng ngờ. Tất cả phải xử lý theo quy trình."
- duration: 23.024s
- transition_in: push-slide LEFT
- status: animated
- src: compositions/frames/v2-06-incidents.html
- type: feature_showcase
- persuasion: Frame-then-fill (bảng) + Signposting
- beat: Focus → resolve
- blueprint: grid-card-assemble (Adapt)
- focal: bảng phân loại sự cố 5 hàng
- roles: bảng (header hàng xanh nhạt; mỗi hàng là một thẻ tinted bo 12px; cột 1 có số + tên loại đậm, cột 2 nội dung, cột 3 nguyên nhân) = foreground subject (full-width, ~60% chiều cao) · pill "Xử lý theo quy trình" = payoff · slide-header = supporting · nền trắng = background

narrativeRole: Cho nhân viên một bảng để nhận ra sự cố thuộc loại nào và vì sao xảy ra, rồi quy về quy trình xử lý.
keyMessage: Năm loại sự cố, mỗi loại có nội dung và nguyên nhân riêng, và tất cả đều xử lý theo quy trình.

Adapt: giữ signature assemble, áp cho các hàng của bảng; mỗi hàng vào đúng lúc tên loại được đọc, cột "Nguyên nhân" hiện khi lời đọc nhắc tới nguyên nhân.
Scene 1 (0.0–1.9s): slide-header: eyebrow "PHẦN 3/5 · ÁP DỤNG VÀ TUÂN THỦ", tag-pill "5 loại sự cố", h2 "Phân loại sự cố bảo mật"; hàng tiêu đề bảng "Phân loại · Nội dung · Nguyên nhân" (eyebrow, slate) hiện ở "năm loại" (1.2s).
Scene 2 (2.0–4.6s): hàng 1: "01 Lỗi dịch vụ" (2.0s) · "Ứng dụng, dịch vụ không chạy bình thường" (2.2s) · nguyên nhân "Lỗi phần cứng / phần mềm" (3.0s).
Scene 3 (4.8–8.9s): hàng 2: "02 Lỗi thông tin" (4.8s) · "Tính xác thực của thông tin bị nghi vấn" (5.0s) · nguyên nhân "Rò rỉ, thay đổi, phá hủy thông tin" (5.8s).
Scene 4 (9.1–12.4s): hàng 3: "03 Vi phạm an ninh" (9.1s) · "Cố ý vi phạm biện pháp bảo mật" (9.3s) · nguyên nhân "Truy cập trái phép, nhiễm virus, bị hack mật khẩu" (10.3s).
Scene 5 (12.6–15.8s): hàng 4: "04 Lỗi bảo mật" (12.6s) · "Biện pháp bảo mật không áp dụng hoặc không hiệu quả" (12.8s) · nguyên nhân "Cài tường lửa không đầy đủ, xử lý key sai" (13.6s).
Scene 6 (16.0–18.0s): hàng 5: "05 Sự cố đáng ngờ" (16.0s) · "Nghi ngờ xuất hiện sự cố từ mục 1 đến 4" (16.3s); cột nguyên nhân để trống (gạch ngang mảnh).
Scene 7 (18.2–23.024s): một mũi tên xuống tự vẽ (svg-path-draw) từ dưới bảng tới pill xanh đặc "Xử lý theo quy trình" ở "Tất cả" (18.2s); pill bật lên ở "quy trình" (19.6s). Giữ yên. Bảng + pill nằm gọn trên y < 880px (hàng cao ~84px).

## Frame 7 — Phần 4: Email bị hack trong tập đoàn Sumitomo

- scene: Hai thẻ email cạnh nhau: (A) "Đối tác kinh doanh" yêu cầu thanh toán; (B) email "Nhân viên tính lương" yêu cầu kế toán chuyển tiền; cả hai đóng dấu đỏ "Giả mạo"
- voiceover: "Phần bốn — sự cố thực tế. Tại các công ty thành viên tập đoàn Sumitomo, hacker chiếm email, giả làm đối tác để đòi thanh toán — thậm chí đột nhập email nhân viên tính lương rồi yêu cầu kế toán chuyển tiền."
- duration: 14.952s
- transition_in: crossfade
- status: animated
- src: compositions/frames/v2-07-email-hack.html
- type: social_proof
- persuasion: Worked example (hai tình huống thật) + Before/after
- beat: Surprise + concern
- blueprint: comparison-split (Adapt)
- focal: hai thẻ email giả mạo
- roles: thẻ A + thẻ B (khung email trắng, viền hairline, dòng "Từ:", tiêu đề, nhãn đỏ "Giả mạo") = foreground subjects · nhãn nguồn "Công ty thành viên tập đoàn Sumitomo" = supporting · slide-header = supporting · nền trắng = background

narrativeRole: Đưa ra bằng chứng ngay trong tập đoàn: chiếm email để đòi tiền, theo hai kịch bản.
keyMessage: Email bị chiếm được dùng để giả đối tác hoặc giả nội bộ đòi chuyển tiền.

Adapt: giữ signature của comparison-split (hai thẻ ngang hàng vào từ hai phía, badge bật lên ở cạnh trong); badge là nhãn đỏ "Giả mạo".
Scene 1 (0.0–2.8s): slide-header: eyebrow "PHẦN 4/5 · SỰ CỐ THỰC TẾ", tag-pill "Email bị hack", h2 "Không phải lý thuyết" hiện ở "sự cố thực tế" (0.9s).
Scene 2 (3.0–5.6s): nhãn nguồn "Công ty thành viên tập đoàn Sumitomo" (eyebrow, icon tòa nhà) hiện dưới h2 ở "Tại các công ty" (3.0s); ở "hacker chiếm email" (5.7s) một icon phong bì có móc câu/ổ khóa mở tự vẽ nét cạnh nhãn.
Scene 3 (7.2–8.9s): thẻ A vào từ trái ở "giả làm đối tác" (7.2s): eyebrow "TÌNH HUỐNG 1", dòng "Từ: “Đối tác kinh doanh”", tiêu đề "Yêu cầu thanh toán chi phí" tự gõ (discrete-text-sequence); nhãn đỏ "Giả mạo" (icon tam giác) đóng dấu ở "thanh toán" (8.3s).
Scene 4 (9.1–12.8s): thẻ B vào từ phải ở "thậm chí" (9.1s): eyebrow "TÌNH HUỐNG 2", dòng "Từ: “Nhân viên tính lương”" ở "email nhân viên tính lương" (10.0s), tiêu đề "Đề nghị kế toán chuyển tiền" tự gõ từ 11.4s; nhãn đỏ "Giả mạo" đóng dấu ở "chuyển tiền" (12.3s).
Scene 5 (12.8–14.952s): giữ đọc, đứng yên.

## Frame 8 — Phần 4: Ransomware — Colonial Pipeline

- scene: Hàng icon tệp bị khóa (ransomware mã hóa và đòi tiền chuộc); sau đó con số đếm lên 5 triệu USD ≈ 114 tỷ VND với nhãn Colonial Pipeline; dòng "Vận hành vẫn bị gián đoạn"
- voiceover: "Ransomware mã hóa dữ liệu trên máy tính và server rồi đòi tiền chuộc. Colonial Pipeline, công ty đường ống dầu lớn nhất nước Mỹ, đã trả khoảng năm triệu đô la — tương đương 114 tỷ đồng — mà vận hành vẫn bị gián đoạn."
- duration: 16.2s
- transition_in: push-slide LEFT
- status: animated
- src: compositions/frames/v2-08-ransomware.html
- type: social_proof
- persuasion: Statistical proof + Causal chain
- beat: Shock → gravity
- blueprint: dataviz-countup (Adapt)
- focal: con số "5 triệu USD"
- roles: bộ đếm 5 triệu USD = foreground subject (phải, display 800 ~140px) · chuỗi 3 bước "Xâm nhập → Mã hóa tệp → Đòi tiền chuộc" với icon = supporting (trái) · thẻ Colonial Pipeline = supporting · slide-header = supporting · nền trắng = background

narrativeRole: Định nghĩa ransomware bằng một chuỗi nhân quả, rồi chứng minh cái giá bằng con số thật.
keyMessage: Ransomware khóa dữ liệu để tống tiền; trả 5 triệu USD vẫn không cứu được vận hành.

Adapt: giữ signature của dataviz-countup (một con số anh hùng đếm lên và chốt); bỏ camera push-through; con số nằm trong thẻ bên phải.
Scene 1 (0.0–4.2s): slide-header: eyebrow "PHẦN 4/5 · SỰ CỐ THỰC TẾ", tag-pill "Ransomware", h2 "Ransomware: khóa dữ liệu, đòi tiền chuộc". Cột trái: chuỗi 3 bước dọc với icon nét mảnh, nối bằng mũi tên hairline: "Xâm nhập máy tính / server" (0.1s) → "Mã hóa tệp quan trọng" ở "mã hóa" (0.8s), icon 4 tệp lật thành ổ khóa theo stagger index → "Đòi tiền chuộc" ở "đòi tiền chuộc" (3.5s).
Scene 2 (5.1–8.8s): thẻ phải vào ở "Colonial Pipeline" (5.1s): eyebrow "COLONIAL PIPELINE · MỸ", dòng "Công ty vận hành đường ống dẫn dầu lớn nhất nước Mỹ" (body) ở 6.7s.
Scene 3 (8.9–11.0s): bộ đếm đếm từ 0 lên 5 với hậu tố "triệu USD" trong khoảng "đã trả khoảng năm triệu" (9.1–10.1s), chữ display 800 xanh (counting-dynamic-scale); dòng "≈ 114 tỷ VND tiền chuộc" ở "tương đương" (10.7s).
Scene 4 (12.5–16.2s): dòng đỏ "Khôi phục chậm → vận hành vẫn bị gián đoạn" hiện ở "mà vận hành" (12.5s). Sau đó giữ yên có chủ đích khoảng 2s, con số chiếm ưu thế.

## Frame 9 — Phần 4: Lừa đảo tài chính

- scene: Năm kênh liên lạc (email, tin nhắn, cuộc gọi, website giả, mạng xã hội) dồn vào một nhân vật "kẻ gian" đeo 3 mặt nạ (cơ quan chức năng, người thân, đối tác), rồi tới yêu cầu "Chuyển khoản" bị gạch đỏ
- voiceover: "Còn lừa đảo tài chính đến qua email, tin nhắn, cuộc gọi, website giả và mạng xã hội — kẻ gian mạo danh cơ quan chức năng, người thân hay đối tác để yêu cầu chuyển khoản."
- duration: 12.872s
- transition_in: push-slide LEFT
- status: animated
- src: compositions/frames/v2-09-fraud.html
- type: social_proof
- persuasion: Causal chain (kênh → mạo danh → chuyển khoản)
- beat: Alertness
- blueprint: constellation-hub (Adapt)
- focal: thẻ "Yêu cầu chuyển khoản" có nhãn đỏ "Lừa đảo"
- roles: 5 pill kênh có icon = supporting nodes (cột trái) · cụm 3 vai mạo danh (icon tòa nhà công quyền, gia đình, bắt tay) = midground (giữa) · thẻ "Yêu cầu chuyển khoản" + nhãn đỏ "Lừa đảo" = foreground subject (phải) · đường nối hairline trái→giữa→phải = supporting · slide-header = supporting · nền trắng = background

narrativeRole: Cho thấy đường đi của một vụ lừa đảo tài chính, từ kênh tiếp cận tới yêu cầu chuyển tiền.
keyMessage: Bất kỳ kênh nào cũng có thể là kẻ gian mạo danh; một yêu cầu chuyển khoản là dấu hiệu dừng lại.

Adapt: giữ signature của constellation-hub (các node bật vào rồi dồn về một lõi); ở đây các node xếp thành dòng chảy trái→phải, lõi là thẻ "Yêu cầu chuyển khoản".
Scene 1 (0.0–1.4s): slide-header: eyebrow "PHẦN 4/5 · SỰ CỐ THỰC TẾ", tag-pill "Lừa đảo tài chính", h2 "Lừa đảo tài chính, ngân hàng" hiện ở "lừa đảo tài chính" (0.3s).
Scene 2 (1.6–5.5s): năm pill kênh xếp dọc ở cột trái, mỗi pill đúng lúc tên kênh được đọc: "Email" 1.6s · "Tin nhắn" 2.3s · "Cuộc gọi" 3.0s · "Website giả" 3.8s · "Mạng xã hội" 4.8s.
Scene 3 (5.7–8.6s): đường nối hairline từ 5 pill dồn về cột giữa (svg-path-draw) ở "kẻ gian" (5.7s); ba thẻ mạo danh xếp dọc: "Cơ quan chức năng" 6.5s · "Người thân" 7.7s · "Đối tác" 8.3s; phía trên có nhãn "MẠO DANH" (eyebrow, đỏ).
Scene 4 (8.7–10.0s): đường nối từ cột giữa sang thẻ phải "Yêu cầu chuyển khoản" (icon thẻ ngân hàng + mũi tên), thẻ vào ở "yêu cầu chuyển khoản" (9.0s); nhãn đỏ "Lừa đảo" đóng dấu ở 9.6s.
Scene 5 (10.0–12.872s): giữ đọc, đứng yên.

## Frame 10 — Phần 5: 7 biện pháp nâng cao bảo mật

- scene: Lưới 7 thẻ biện pháp đánh số có icon (2 cột; thẻ 7 nền xanh đặc ở giữa hàng cuối)
- voiceover: "Phần năm — bảy biện pháp: cập nhật Windows — không mở link lạ — không cung cấp thông tin cá nhân hay mã OTP — không cài ứng dụng chưa xác thực — không cắm thiết bị lạ — đổi mật khẩu mạnh thường xuyên — và khóa máy khi rời chỗ."
- duration: 16.28s
- transition_in: crossfade
- status: animated
- src: compositions/frames/v2-10-best-practices.html
- type: benefit_highlight
- persuasion: Numbered enumeration
- beat: Momentum + mastery
- blueprint: grid-card-assemble (Reproduce)
- focal: lưới 7 thẻ biện pháp
- roles: 7 thẻ có icon = foreground subject · slide-header = supporting · nền trắng = background

narrativeRole: Gom bài học thành 7 hành động hằng ngày, đúng theo trang 9 của tài liệu.
keyMessage: Bảy thói quen đơn giản chặn phần lớn rủi ro.

Scene 1 (0.0–1.8s): slide-header: eyebrow "PHẦN 5/5 · BIỆN PHÁP NÂNG CAO BẢO MẬT", tag-pill "Làm ngay hôm nay", h2 "7 biện pháp nâng cao bảo mật" hiện ở "bảy biện pháp" (0.9s).
Scene 2 (1.9–11.6s): các thẻ tự xếp vào lưới 2 cột, mỗi thẻ đúng cụm lời đọc của nó: 1 "Định kỳ cập nhật Windows để vá lỗi" (icon làm mới) 1.9s · 2 "Không mở link lạ trong tin nhắn, email" (icon link gạch chéo) 3.1s · 3 "Không cung cấp thông tin cá nhân, tài khoản, OTP" (icon chìa khóa) 4.2s · 4 "Không cài ứng dụng chưa xác thực" (icon ô ứng dụng + khiên) 7.0s · 5 "Không cắm thiết bị lạ vào máy tính" (icon USB) 8.7s · 6 "Chủ động đổi mật khẩu mạnh thường xuyên" (icon dấu sao mật khẩu) 10.1s.
Scene 3 (11.7–13.2s): thẻ 7 "Khóa máy tính khi rời chỗ làm việc" (icon màn hình có ổ khóa) vào giữa hàng cuối ở "và khóa máy" (11.7s) dạng tinted, rồi nền xanh đặc quét qua ở "khóa máy" (12.0s), chữ chuyển trắng.
Scene 4 (13.2–16.28s): giữ đọc, đứng yên.

## Frame 11 — Kết thúc

- scene: Khiên SEMV tô đặc ở giữa, các vòng tròn đồng tâm lan ra; "Bảo mật bắt đầu từ bạn"; pill "Có nghi ngờ? Liên hệ IT Part"; tên công ty
- voiceover: "Bảo mật bắt đầu từ bạn. Khi có nghi ngờ, hãy liên hệ ngay bộ phận IT. Cảm ơn bạn đã lắng nghe. Chào mừng bạn gia nhập SEMV — hy vọng chúng ta sẽ cùng đồng hành trên chặng đường sắp tới."
- duration: 16.452s
- transition_in: crossfade
- status: animated
- src: compositions/frames/v2-11-closing.html
- type: cta
- persuasion: Callback + Distillation
- beat: Resolve + inspiration
- blueprint: logo-assemble-lockup (Adapt)
- focal: khiên SEMV tô đặc + h1 "Bảo mật bắt đầu từ bạn"
- roles: khiên + h1 = foreground subject (căn giữa, neo quanh y≈0.42H) · 3 vòng tròn đồng tâm hairline = atmosphere · pill CTA xanh đặc = supporting · dòng tên công ty = supporting

narrativeRole: Gọi lại tấm khiên của F03 và khép bài bằng một câu cùng một hành động.
keyMessage: Bảo mật bắt đầu từ bạn; có nghi ngờ thì liên hệ IT.

Adapt: giữ signature của logo-assemble-lockup (mark hình thành rồi chốt thành lockup căn giữa và mở rộng ra CTA).
Scene 1 (0.0–1.5s): ba vòng tròn đồng tâm hairline lan ra từ tâm (center-outward-expansion); khiên SEMV tự vẽ nét rồi tô đặc xanh, chữ "SEMV" trắng (svg-path-draw); h1 "Bảo mật bắt đầu từ bạn" hiện từng từ trong khoảng 0.1–1.3s.
Scene 2 (2.6–6.2s): pill CTA xanh đặc "Có nghi ngờ? Liên hệ IT Part" bật lên ở "liên hệ" (4.0s), settle mượt.
Scene 3 (6.4–8.8s): dòng "Sumika Electronic Materials Vietnam Co., Ltd" hiện ở "Cảm ơn" (6.4s).
Scene 4 (8.9–16.452s): dòng chào mừng "Chào mừng bạn gia nhập SEMV!" (xanh, 700) hiện ở "Chào mừng" (8.9s); lockup giữ yên. Đây là frame cuối: 0.4s cuối mọi thứ mờ dần về nền trắng.
