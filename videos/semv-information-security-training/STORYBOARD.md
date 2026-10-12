---
format: 1920x1080
duration: 109s
message: "Mỗi nhân viên SEMV là một lớp bảo vệ: tuân thủ chính sách, cảnh giác và báo cáo ngay khi thấy bất thường."
arc: listicle with story-explainer
audience: "Nhân viên mới của SEMV (Sumika Electronic Materials Vietnam)"
mode: autonomous
music: none
language: vi
---

## v2 — 2026-10-12

Đây là storyboard của v1 (1:48,5, renders/video-v1.mp4, snapshot ở versions/v1/). Bản v2 dài khoảng 3 phút, đi theo mục lục PDF, nằm ở STORYBOARD-v2.md + SCRIPT-v2.md. Lý do: người dùng yêu cầu bám sát nội dung tài liệu hơn.

## Decisions

- Spine: tấm khiên SEMV xuất hiện ở frame 02 (bảo vệ) và được gọi lại ở frame 08, khép kín và tô đầy.
- Format: 1920x1080, khoảng 108.5s, VO tiếng Việt (Edge vi-VN-HoaiMyNeural, tốc độ 0.95), phụ đề, không nhạc nền. Caption keep-out: nội dung frame nằm trong ~83% phía trên.
- Brand: frame.md (blue-professional remix): nền trắng, xanh #0A3D91, chữ navy #0F172A, Be Vietnam Pro.
- Bans: không glow, không drop shadow, không logo Samsung, không emoji, không số liệu tự bịa. Tránh slideshow (thẻ tĩnh) và screensaver (chuyển động vô nghĩa).
- Held frame: frame 06 giữ con số "5 triệu USD ≈ 114 tỷ VND" đứng yên khoảng 1.5s.
- Truthfulness: mọi tình huống và con số đều lấy từ PDF đào tạo của SEMV IT Part (2021).
- Progress bar: chạy liên tục ở cạnh dưới, đặt trong index (không vẽ riêng từng frame). Được thêm tay vào index.html sau assemble-index; nếu ghép lại index thì phải thêm lại.
- Captions: build từ .hyperframes/caption_meta.json (do .hyperframes/vi-caption-meta.mjs tạo, gộp âm tiết tiếng Việt thành cụm), không đọc trực tiếp audio_meta.json. Skin đã giảm khoảng cách giữa các cụm.
- Sketch sheet: storyboard.html v1. Người dùng chấp nhận ("làm tất cả trừ bước FFmpeg"): bố cục đã khóa, phần còn lại chạy tự động, không render.

## Video direction

- Palette system (frame.md): nền trắng #FFFFFF trên mọi frame; xanh SEMV #0A3D91 là màu nhấn DUY NHẤT (eyebrow, số, icon, viền thẻ, pill, khiên, thanh tiến trình); tiêu đề navy #0F172A; chữ phụ slate #475569; thẻ nền xanh 4% + viền xanh 20% + bo 14px, không đổ bóng. Đỏ #dc2626 chỉ dùng cho cảnh báo ở F03 (thẻ cấm), F05 (dòng cảnh báo) và F06 (nhãn "Giả mạo").
- Type: Be Vietnam Pro theo vai trò (display 700–800 cho h1/h2/số; 600 cho eyebrow viết hoa giãn chữ; 500 cho nhãn thẻ). Không dùng font khác.
- Icons: SVG nét mảnh, 2px, màu primary, vẽ inline. Không emoji, không icon font.
- Content frame rhythm: slide-header (eyebrow trái + tag-pill phải + h2) ở F02–F07; atmosphere (dải chéo, lưới chấm, vòng tròn đồng tâm) chỉ ở F01 và F08.
- Motion grammar: ease long-tail power3 (expo.out cho các lần vào nhanh); không bounce, không overshoot. Mỗi phần tử xuất hiện ĐÚNG mốc lời đọc nhắc tới nó (thời gian Scene lấy theo word timing thật); tại t=0 chỉ có header của frame. Giữ hình = đứng yên, cùng lắm là jitter nhẹ; không "thở", không pan/push ở nửa sau.
- Rhythm / held frames: F06 giữ con số 5 triệu USD đứng yên khoảng 2s; F08 giữ lockup cuối. Các frame khác kết thúc bằng một nhịp đọc ngắn sau lần hiện cuối.
- Caption keep-out: mọi nội dung chính nằm trong ~83% phía trên (y < 896px); dải phụ đề ở đáy. Thanh tiến trình nằm ở index, không vẽ trong frame.
- Negative list: không glow/bloom, không drop shadow, không gradient tím-xanh kiểu "AI", không bokeh, không logo Samsung, không con trỏ hay khung trình duyệt thật, không số liệu ngoài PDF. Tránh hai kiểu hỏng: slideshow (dồn hết nội dung trong 25% đầu rồi đứng im) và screensaver (nhiều phần tử trôi lơ lửng độc lập).

## Frame 1 — Đào tạo bảo mật thông tin

- scene: Câu hook đánh vào hệ quả ("một cú nhấp chuột sai"), sau đó chốt bằng title card "Đào tạo bảo mật thông tin" kèm wordmark SEMV và nhãn IT Part
- voiceover: "Chỉ một cú nhấp chuột sai — cả hệ thống có thể dừng lại. Chào mừng bạn đến với khóa đào tạo bảo mật thông tin của SEMV."
- duration: 9.36s
- transition_in: cut
- status: animated
- src: compositions/frames/01-title.html
- type: hook
- persuasion: Stakes / consequence + Concept announcement
- beat: Tension → orientation
- blueprint: kinetic-type-beats (Adapt)
- focal: dòng hook "Chỉ một cú nhấp chuột sai — cả hệ thống có thể dừng lại.", sau đó là h1 "Đào tạo bảo mật thông tin"
- roles: hook line = foreground subject · icon con trỏ chuột (SVG nét mảnh) = supporting · dải chéo xanh + lưới chấm 3x3 + khiên ổ khóa trắng = background/atmosphere (35% phải) · eyebrow "SEMV · IT PART" + accent-line + sub-line = supporting

narrativeRole: Mở bằng cái giá phải trả khi lơ là bảo mật, rồi giới thiệu khóa đào tạo và nhận diện SEMV.
keyMessage: Bảo mật thông tin là chuyện của từng cú nhấp chuột, và khóa học này dành cho bạn.

Adapt: giữ signature của kinetic-type-beats (một câu dựng qua các beat toàn màn hình rồi chốt payoff); payoff là title card thay vì logo.
Scene 1 (0.0–1.5s): nền trắng, căn giữa vùng trên. "Chỉ một cú nhấp chuột sai" hiện từng từ theo lời đọc (per-word staggered reveal), chữ display 800 near-black cỡ h1. Icon con trỏ nét mảnh lướt vào và click ngay chữ "sai" (1.1s) (một vòng ripple xanh duy nhất, có giới hạn).
Scene 2 (1.6–3.4s): dòng thứ hai "— cả hệ thống có thể dừng lại." hiện từng từ bên dưới; ở "dừng lại" (2.9s) một vệt highlight xanh nhạt quét qua hai chữ đó (highlight sweep). Căn giữa, phân cấp: dòng 1 đậm, dòng 2 cùng cỡ.
Scene 3 (3.6–5.4s): seam cut-the-curve (cut-catalog.md): hai dòng hook trượt sang trái và ra khỏi khung đúng lúc dải chéo xanh quét vào từ phải với cùng vận tốc; lưới chấm 3x3 hiện lên; khiên + ổ khóa trắng trong dải tự vẽ nét (svg-path-draw).
Scene 4 (5.4–7.8s): bố cục cover nghiêng trái (title trái, dải chéo phải ~36%). Eyebrow "SEMV · IT PART" + accent-line 60x4 vào ở "khóa" (5.5s); h1 hai dòng "Đào tạo bảo mật / thông tin" hiện từng từ từ "đào tạo" (5.8s) tới "tin" (6.9s); sub-line "Dành cho nhân viên mới · Sumika Electronic Materials Vietnam" (body, slate) hiện lên ở "SEMV" (7.4s).
Scene 5 (7.8–9.36s): giữ đọc, đứng yên; cùng lắm jitter rất nhẹ trên khiên.

## Frame 2 — Vì sao bảo mật thông tin quan trọng

- scene: Một tấm khiên SEMV ở giữa, xung quanh là 3 thẻ mục đích (Ngăn rò rỉ thông tin · Sản xuất không gián đoạn · Giữ niềm tin khách hàng). Cuối frame hiện dòng chốt thông điệp
- voiceover: "Chính sách bảo mật tồn tại vì ba lý do — ngăn rò rỉ thông tin, giữ cho sản xuất không bị gián đoạn, và giữ niềm tin của khách hàng. Mỗi nhân viên SEMV chính là một lớp bảo vệ."
- duration: 12.84s
- transition_in: crossfade
- status: animated
- src: compositions/frames/02-why.html
- type: pain_point
- persuasion: Rule of three + Distillation
- beat: Recognition → resolve
- blueprint: constellation-hub (Adapt)
- focal: khiên SEMV ở giữa (outline xanh, chữ "SEMV" 800 bên trong)
- roles: khiên = foreground subject (~30% chiều cao khung) · 3 thẻ mục đích có icon (ổ khóa, nhà máy, bắt tay) = supporting nodes với đường nối hairline tới khiên · slide-header = supporting · nền trắng + lưới hairline xanh rất nhạt (5%) = background

narrativeRole: Đưa thông điệp chính ra từ beat 2: ba mục đích của chính sách, quy về trách nhiệm của từng người.
keyMessage: Bảo mật bảo vệ dữ liệu, sản xuất và niềm tin, và mỗi người là một lớp bảo vệ.

Adapt: giữ signature của constellation-hub (các node bật vào thành vòng quanh một tâm rồi dồn về lõi); 3 node thay cho 8–12, phần dồn về lõi là khiên được tô đầy, không có camera push.
Scene 1 (0.0–2.4s): slide-header vào trước: eyebrow "01 · VÌ SAO QUAN TRỌNG", pill "Mục đích chính sách", h2 "Ba lý do để bảo mật" (per-word reveal); outline khiên tự vẽ nét ở giữa (svg-path-draw) trong lúc đọc "ba lý do" (1.6s).
Scene 2 (2.7–4.0s): thẻ "Ngăn rò rỉ thông tin" (icon ổ khóa) bung từ khiên ra vị trí trái-giữa (center-outward-expansion), đường nối hairline tự vẽ về khiên.
Scene 3 (4.2–5.9s): thẻ "Sản xuất không gián đoạn" (icon nhà máy) bung ra vị trí phải-giữa, cùng chuyển động.
Scene 4 (6.1–8.5s): thẻ "Giữ niềm tin khách hàng" (icon bắt tay) bung ra vị trí giữa-dưới (vẫn trong vùng an toàn phía trên phụ đề). Bố cục triptych quanh tâm.
Scene 5 (8.7–11.0s): ở "Mỗi nhân viên SEMV" lớp tô xanh dâng lên trong khiên từ dưới lên (stat-bars-and-fills, kiểu fill), chữ "SEMV" chuyển sang trắng khi lớp tô đi qua.
Scene 6 (10.9–12.84s): ở "một lớp bảo vệ" một vòng tròn đồng tâm hairline lan ra từ khiên đúng một lần (có giới hạn, finite), rồi cả frame giữ yên.

## Frame 3 — Kiểm soát truy cập & chính sách mật khẩu

- scene: Bên trái là thang quyền truy cập A · B · C (nhân viên và vendor). Bên phải là ô mật khẩu được "kiểm tra" từng điều kiện: chữ thường, chữ hoa, số, ký tự đặc biệt, từ 8 ký tự; thanh độ mạnh đầy dần. Có thẻ nhắc "Đổi mỗi 3 tháng" và "Không cho mượn tài khoản"
- voiceover: "Quyền truy cập được cấp theo cấp độ bảo mật A, B, C. Tài khoản là của riêng bạn — không chia sẻ, không cho mượn. Mật khẩu phải từ 8 ký tự, gồm chữ thường, chữ hoa, số và ký tự đặc biệt — và đổi định kỳ ba tháng một lần."
- duration: 16.224s
- transition_in: push-slide LEFT
- status: animated
- src: compositions/frames/03-access-password.html
- type: feature_showcase
- persuasion: Progressive disclosure + Demonstration
- beat: Focus + comprehension
- blueprint: grid-card-assemble (Adapt)
- focal: thẻ mật khẩu (ô nhập + thanh độ mạnh + 5 tiêu chí được tick)
- roles: thẻ mật khẩu = foreground subject (phải, ~48% chiều ngang) · thang cấp độ A·B·C + nhãn "Nhân viên & vendor" = supporting (trái) · thẻ cấm "Không chia sẻ · không cho mượn" (viền/icon đỏ) = supporting · slide-header + pill "Đổi mật khẩu mỗi 3 tháng" = supporting · nền trắng = background

narrativeRole: Biến quy định về truy cập và mật khẩu thành một checklist có thể nhìn thấy và kiểm tra.
keyMessage: Quyền truy cập theo cấp độ, tài khoản không chia sẻ, mật khẩu mạnh và đổi mỗi 3 tháng.

Adapt: giữ signature của grid-card-assemble (các mục tự xếp theo stagger rồi giữ); áp cho thang A·B·C và danh sách tiêu chí, mỗi mục vào đúng mốc lời đọc.
Scene 1 (0.0–2.2s): slide-header: eyebrow "02 · KIỂM SOÁT TRUY CẬP", h2 "Tài khoản của bạn — chỉ của bạn"; nhãn "CẤP ĐỘ BẢO MẬT" ở cột trái vào ở "cấp độ" (1.3s). Bất đối xứng 40/60.
Scene 2 (2.3–3.6s): các thẻ chữ A (2.3s), B (2.8s), C (3.4s) lần lượt vào theo hàng ngang (grid-card-assemble stagger trên mốc từng chữ); "Nhân viên & vendor" hiện bên dưới ở 3.4s.
Scene 3 (5.4–7.0s): thẻ cấm hiện ở "không chia sẻ" (5.4s): icon cấm tròn đỏ tự vẽ nét (svg-path-draw), chữ "Không chia sẻ · không cho mượn"; chữ "không cho mượn" sáng lên ở 6.4s.
Scene 4 (8.1–9.4s): thẻ mật khẩu trượt vào từ phải (expo.out); ô nhập tự gõ "S•••••••@7k" từng ký tự kèm caret (discrete-text-sequence, caret nhấp nháy bằng tween hữu hạn); tiêu chí "Từ 8 ký tự" (in đậm xanh) được tick ở "8" (9.0s), thanh độ mạnh lên 20%.
Scene 5 (10.1–13.2s): tick từng tiêu chí đúng lúc lời đọc nói tới: "Chữ thường" 10.3s · "Chữ hoa" 11.1s · "Chữ số" 11.9s · "Ký tự đặc biệt" 12.6s; thanh độ mạnh đầy theo từng nấc mỗi lần tick (stat-bars-and-fills), đầy 100% ở 12.6s.
Scene 6 (13.8–16.22s): pill "Đổi mật khẩu mỗi 3 tháng" hiện ở tag-pill trên phải, đúng "ba tháng" (14.4s), settle mượt power3, không overshoot. Giữ yên tới hết.

## Frame 4 — Phòng chống mã độc

- scene: Một màn hình máy tính có khiên bảo vệ. Bốn quy tắc dạng icon lần lượt bật sáng: cập nhật antivirus & Windows · không dùng phần mềm không rõ nguồn · quét virus trước khi trao đổi dữ liệu ra ngoài · báo IT khi thấy bất thường
- voiceover: "Với mã độc, hãy nhớ bốn điều: cập nhật phần mềm diệt virus và Windows định kỳ — không dùng chương trình không rõ nguồn gốc — quét virus trước khi gửi dữ liệu ra ngoài — và báo ngay cho bộ phận IT khi thấy điều bất thường."
- duration: 12.912s
- transition_in: push-slide LEFT
- status: animated
- src: compositions/frames/04-malware.html
- type: feature_showcase
- persuasion: Numbered enumeration + Signposting
- beat: Comprehension + confidence
- blueprint: grid-card-assemble (Reproduce)
- focal: lưới 2x2 bốn thẻ quy tắc đánh số (thẻ 4 đổi sang nền xanh đặc)
- roles: 4 thẻ quy tắc = foreground subject (phải, ~58% chiều ngang) · màn hình + khiên + dấu tick nét mảnh = supporting hero (trái, ~22%) · slide-header + pill "4 điều cần nhớ" = supporting · nền trắng = background

narrativeRole: Đưa ra bốn hành động cụ thể của người dùng để chặn mã độc; quản trị viên lo phần cài đặt.
keyMessage: Cập nhật, không dùng phần mềm lạ, quét trước khi chia sẻ, báo IT ngay.

Scene 1 (0.0–1.8s): slide-header: eyebrow "03 · PHÒNG CHỐNG MÃ ĐỘC", h2 "Chặn mã độc từ thói quen"; màn hình + khiên bên trái tự vẽ nét (svg-path-draw); pill "4 điều cần nhớ" bật lên ở "bốn điều" (1.4s).
Scene 2 (2.3–4.9s): thẻ 1 "Cập nhật diệt virus & Windows" (vòng tròn số 1) vào ô trên-trái ở 2.3s (grid-card-assemble).
Scene 3 (5.2–6.8s): thẻ 2 "Không dùng phần mềm lạ" vào ô trên-phải ở 5.2s.
Scene 4 (7.0–9.4s): thẻ 3 "Quét virus trước khi gửi ra ngoài" vào ô dưới-trái ở 7.0s.
Scene 5 (9.7–11.4s): thẻ 4 "Thấy bất thường → báo IT" vào ô dưới-phải ở 9.7s dưới dạng thẻ tinted, rồi nền tô xanh đặc quét qua thẻ ở "IT" (10.7s), chữ và số chuyển sang trắng (stat-bars-and-fills, kiểu wipe).
Scene 6 (11.5–12.91s): dấu tick trong khiên tự vẽ nét (11.5s), sau đó giữ yên.

## Frame 5 — Sự cố bảo mật

- scene: Năm thẻ phân loại sự cố xếp thành hàng (Lỗi dịch vụ · Lỗi thông tin · Vi phạm an ninh · Lỗi bảo mật · Sự cố đáng ngờ), tất cả đổ về một mũi tên "Xử lý theo quy trình". Cuối frame, câu cảnh báo phóng to dần: "Làm ngơ = thiệt hại nhân lên nhiều lần"
- voiceover: "Sự cố bảo mật có năm loại — lỗi dịch vụ, lỗi thông tin, vi phạm an ninh, lỗi bảo mật, và sự cố đáng ngờ. Loại nào cũng phải xử lý theo quy trình. Nếu bạn vờ như không thấy, thiệt hại có thể tăng lên nhiều lần."
- duration: 16.152s
- transition_in: push-slide LEFT
- status: animated
- src: compositions/frames/05-incidents.html
- type: feature_showcase
- persuasion: Frame-then-fill + Causal chain
- beat: Unease → resolve
- blueprint: grid-card-assemble (Adapt)
- focal: dải 5 thẻ phân loại sự cố dồn về pill "Xử lý theo quy trình"
- roles: 5 thẻ = foreground subject (dải full-width) · đường nối + mũi tên xuống + pill xanh đặc "Xử lý theo quy trình" = supporting (causal chain) · dòng cảnh báo đỏ "Làm ngơ = thiệt hại nhân lên nhiều lần" = payoff phụ · slide-header + pill "5 loại sự cố" = supporting · nền trắng = background

narrativeRole: Giúp nhân viên nhận ra một sự cố thuộc loại nào và hiểu rằng báo cáo sớm sẽ giảm thiệt hại.
keyMessage: Nhận diện năm loại sự cố, xử lý theo quy trình và không bao giờ làm ngơ.

Adapt: giữ signature assemble (stagger thành dải rồi giữ); thêm kết thúc kiểu causal chain, các thẻ đổ về một quy trình.
Scene 1 (0.0–2.0s): slide-header: eyebrow "04 · SỰ CỐ BẢO MẬT", h2 "Nhận diện — và xử lý theo quy trình"; pill "5 loại sự cố" bật lên ở "năm loại" (1.3s). Bố cục full-width strip.
Scene 2 (2.1–7.6s): các thẻ rơi vào dải theo đúng tên được đọc: "01 Lỗi dịch vụ" 2.1s · "02 Lỗi thông tin" 3.1s · "03 Vi phạm an ninh" 4.1s · "04 Lỗi bảo mật" 5.3s · "05 Sự cố đáng ngờ" 6.4s (grid-card-assemble; mỗi thẻ vào từ trên xuống, ease power3).
Scene 3 (8.4–10.6s): năm đường nối hairline tự vẽ từ đáy mỗi thẻ hội tụ về một mũi tên xuống (svg-path-draw) ở "Loại nào cũng" (8.4s); pill xanh đặc "Xử lý theo quy trình" bật lên ở "quy trình" (10.1s).
Scene 4 (11.6–14.0s): ở "vờ như không thấy" (12.1s) dải 5 thẻ mờ xuống 45% (depth-of-field-blur nhẹ, để làm nổi phần dưới); dòng cảnh báo đỏ "Làm ngơ = thiệt hại nhân lên nhiều lần" hiện ở "thiệt hại" (13.3s).
Scene 5 (14.2–16.15s): chữ "nhiều lần" trong dòng cảnh báo phóng to lên (counting-dynamic-scale, chỉ phần scale) ở "nhiều lần" (14.7s), sau đó giữ yên.

## Frame 6 — Ransomware & lừa đảo thực tế

- scene: Hai tình huống thật. (A) Email giả mạo: một hộp thư với email "đối tác" yêu cầu chuyển khoản, có dấu cảnh báo, dựa trên vụ hack email của các công ty thành viên tập đoàn Sumitomo. (B) Ransomware: các file bị khóa, sau đó con số đếm lên 5 triệu USD ≈ 114 tỷ VND kèm nhãn Colonial Pipeline
- voiceover: "Đây không phải lý thuyết. Hacker đã xâm nhập email của các công ty thành viên tập đoàn Sumitomo, giả làm đối tác để đòi thanh toán. Còn ransomware mã hóa dữ liệu rồi đòi tiền chuộc — Colonial Pipeline đã phải trả khoảng năm triệu đô la, tương đương 114 tỷ đồng."
- duration: 18.12s
- transition_in: crossfade
- status: animated
- src: compositions/frames/06-real-cases.html
- type: social_proof
- persuasion: Worked example with real numbers + Before/after
- beat: Surprise + concern
- blueprint: dataviz-countup (Adapt)
- focal: con số đếm lên "5 triệu USD" (thẻ B)
- roles: thẻ B ransomware + bộ đếm = foreground subject (phải) · thẻ A email giả mạo (email đối tác + nhãn "Giả mạo" đỏ) = co-subject (trái) · hàng icon file → ổ khóa = supporting · slide-header + pill "Không phải lý thuyết" = supporting · nền trắng = background

narrativeRole: Dùng các vụ việc có thật (một vụ ngay trong tập đoàn) làm bằng chứng rằng rủi ro là thật và rất đắt.
keyMessage: Lừa đảo qua email và ransomware đã gây thiệt hại thật: 5 triệu USD chỉ trong một vụ.

Adapt: giữ signature của dataviz-countup (một con số anh hùng đếm lên và chốt); bỏ camera push-through; con số nằm trong thẻ B của bố cục chia đôi, thẻ A là bằng chứng mở màn.
Scene 1 (0.0–2.2s): slide-header: eyebrow "05 · TÌNH HUỐNG THỰC TẾ", h2 "Lừa đảo email & ransomware"; pill "Không phải lý thuyết" bật lên ở "lý thuyết" (0.9s). Bố cục split-screen.
Scene 2 (2.3–6.4s): thẻ A trượt vào từ trái ở "Hacker" (2.3s); trong thẻ, một dòng email (khung trắng, viền hairline) hiện ở "email" (3.4s) với người gửi "Từ: “Đối tác kinh doanh”"; nhãn eyebrow "A · EMAIL BỊ HACK — TẬP ĐOÀN SUMITOMO" hiện ở "Sumitomo" (5.4s).
Scene 3 (6.6–8.6s): tiêu đề email "Yêu cầu thanh toán gấp" tự gõ (discrete-text-sequence) từ "giả làm đối tác" (6.6s); nhãn đỏ "Giả mạo" kèm icon tam giác cảnh báo nét mảnh đóng dấu xuống ở "thanh toán" (8.0s) (spring-pop-entrance, damped).
Scene 4 (9.3–12.0s): thẻ B trượt vào từ phải ở "ransomware" (9.6s); hàng 4 icon tài liệu nét mảnh hiện trong thẻ, ở "mã hóa" (10.1s) lần lượt lật thành icon ổ khóa (stagger theo index).
Scene 5 (12.3–16.2s): eyebrow "B · RANSOMWARE — COLONIAL PIPELINE (MỸ)" hiện ở "Colonial" (12.3s); hàng icon ổ khóa thu nhỏ lên trên; bộ đếm đếm từ 0 lên 5 với hậu tố "triệu USD" trong khoảng "trả khoảng năm triệu" (14.0–15.0s), chữ display 800 xanh, ease mượt có scale nhẹ (registry component count-up, hoặc counting-dynamic-scale); sub-line "≈ 114 tỷ VND tiền chuộc · vận hành vẫn gián đoạn" hiện ở "tương đương" (15.6s).
Scene 6 (16.2–18.12s): frame giữ có chủ đích: mọi thứ đứng yên, con số chiếm ưu thế.

## Frame 7 — 7 biện pháp bảo mật

- scene: Danh sách 7 thẻ đánh số, tự xếp thành lưới 2 cột kèm icon: cập nhật Windows · không mở link lạ · không cung cấp thông tin/OTP · không cài app chưa xác thực · không cắm thiết bị lạ · mật khẩu mạnh, đổi thường xuyên · khóa máy khi rời chỗ
- voiceover: "Bảy thói quen để bảo vệ chính bạn: cập nhật Windows — không mở link lạ — không cung cấp mật khẩu hay mã OTP — không cài ứng dụng chưa xác thực — không cắm thiết bị lạ — đặt mật khẩu mạnh — và luôn khóa máy khi rời chỗ ngồi."
- duration: 14.04s
- transition_in: push-slide LEFT
- status: animated
- src: compositions/frames/07-best-practices.html
- type: benefit_highlight
- persuasion: Numbered enumeration + Rule of seven checklist
- beat: Momentum + mastery
- blueprint: grid-card-assemble (Reproduce)
- focal: lưới 7 thẻ thói quen đánh số (2 cột; thẻ 7 nền xanh đặc, căn giữa)
- roles: 7 thẻ có icon = foreground subject (gần full-width, ~55% chiều cao) · slide-header + pill "Làm ngay hôm nay" = supporting · nền trắng = background

narrativeRole: Gom toàn bộ bài học thành 7 hành động hằng ngày mà nhân viên mới có thể làm ngay.
keyMessage: Bảy thói quen đơn giản giúp bạn tránh được phần lớn rủi ro.

Scene 1 (0.0–2.1s): slide-header: eyebrow "06 · BIỆN PHÁP NÂNG CAO BẢO MẬT", h2 "7 thói quen bảo mật" (per-word reveal); pill "Làm ngay hôm nay" bật lên ở "chính bạn" (1.4s).
Scene 2 (2.2–10.0s): các thẻ tự xếp vào lưới 2 cột theo thứ tự, mỗi thẻ đúng cụm lời đọc của nó (grid-card-assemble): 1 "Cập nhật Windows định kỳ" (icon mũi tên làm mới) 2.2s · 2 "Không mở link lạ" (icon link gạch chéo) 3.4s · 3 "Không cung cấp mật khẩu, OTP" (icon chìa khóa) 4.6s · 4 "Không cài app chưa xác thực" (icon ô ứng dụng + khiên) 7.0s · 5 "Không cắm thiết bị lạ" (icon USB) 8.7s · 6 "Mật khẩu mạnh, đổi thường xuyên" (icon dấu sao ẩn mật khẩu) 10.1s.
Scene 3 (11.2–12.9s): thẻ 7 "Khóa máy khi rời chỗ ngồi" (icon màn hình có ổ khóa) vào giữa hàng cuối ở "luôn" (11.4s), dạng tinted; nền xanh đặc quét qua ở "khóa máy" (11.6s), chữ chuyển trắng.
Scene 4 (12.9–14.04s): giữ yên, cả danh sách đọc rõ.

## Frame 8 — Kết thúc

- scene: Quay lại hình ảnh tấm khiên ở frame 2, giờ đã khép trọn quanh wordmark SEMV. Dòng chốt "Bảo mật bắt đầu từ bạn", kèm pill "Gặp sự cố? Liên hệ IT Part" và tên Sumika Electronic Materials Vietnam
- voiceover: "Bảo mật bắt đầu từ bạn. Khi có nghi ngờ, hãy liên hệ ngay bộ phận IT. Cảm ơn bạn đã tham gia."
- duration: 8.856s
- transition_in: crossfade
- status: animated
- src: compositions/frames/08-closing.html
- type: cta
- persuasion: Callback + Distillation
- beat: Resolve + inspiration
- blueprint: logo-assemble-lockup (Adapt)
- focal: khiên SEMV tô đặc + h1 "Bảo mật bắt đầu từ bạn"
- roles: khiên + h1 = foreground subject (căn giữa, neo quanh y≈0.42H) · 3 vòng tròn đồng tâm hairline = atmosphere/background · pill CTA xanh đặc "Có nghi ngờ? Liên hệ IT Part" = supporting · dòng tên công ty = supporting

narrativeRole: Gọi lại hình ảnh tấm khiên, rút gọn toàn bộ bài học thành một câu và một hành động: báo IT.
keyMessage: Bảo mật bắt đầu từ bạn; có nghi ngờ thì liên hệ IT.

Adapt: giữ signature của logo-assemble-lockup (mark hình thành trên màn rồi chốt thành lockup căn giữa và mở rộng ra CTA); mark là khiên SEMV, gọi lại frame 02.
Scene 1 (0.0–1.5s): ba vòng tròn đồng tâm hairline lan ra từ tâm (center-outward-expansion); khiên SEMV tự vẽ nét rồi tô đặc xanh, chữ "SEMV" trắng; h1 "Bảo mật bắt đầu từ bạn" hiện từng từ trong khoảng 0.1–1.3s bên dưới khiên.
Scene 2 (2.6–6.2s): pill CTA xanh đặc "Có nghi ngờ? Liên hệ IT Part" bật lên ở "liên hệ" (4.0s) (spring-pop-entrance, damped).
Scene 3 (6.4–8.86s): dòng "Sumika Electronic Materials Vietnam Co., Ltd" (body, slate) hiện lên ở "Cảm ơn" (6.4s); lockup giữ yên. Đây là frame cuối: 0.4s cuối mọi thứ mờ dần về nền trắng (lối ra thật duy nhất của video).
