window.MGI18N_GUIDE_POINTS = window.MGI18N_GUIDE_POINTS || {};
window.MGI18N_GUIDE_POINTS.vi = {
  sudoku: [
    "- Mỗi hàng, mỗi cột và mỗi ô phải chứa mỗi chữ số đúng một lần.",
    "- Các chữ số vàng là dữ kiện cho sẵn và không đổi; Kiểm tra đánh dấu lỗi mà không tiết lộ đáp án.",
    "- Đồng hồ bắt đầu từ lần nhập đầu tiên và dừng ngay khi lưới được giải xong.",
    "- Thời gian tốt nhất cho mỗi độ khó được lưu trong trình duyệt này và không bao giờ rời khỏi thiết bị."
  ],
  nonogram: [
    "- Các số bên cạnh hàng hoặc phía trên cột cho biết lần lượt độ dài các cụm ô được tô, giữa các cụm có ít nhất một ô trống.",
    "- Đánh dấu × vào những ô bạn đã suy ra là trống; ô đã đánh dấu không bao giờ tính là đã tô và không cản việc thắng.",
    "- Bất kỳ cách xếp nào thoả mọi gợi ý hàng và cột đều được tính là đã giải, vì việc kiểm tra dựa trên gợi ý.",
    "- Lưới hằng ngày sinh ra từ ngày tháng, nên hôm nay ai cũng có cùng một lưới, và chuỗi ngày đếm số ngày liên tiếp đã giải."
  ],
  merge: [
    "- Một nước chỉ được tính khi có ít nhất một ô đổi chỗ hoặc hai ô gộp lại.",
    "- Mỗi ô gộp nhiều nhất một lần trong mỗi nước, nên bốn ô bằng nhau trên một hàng tạo thành hai cặp chứ không phải một ô khổng lồ.",
    "- Điểm là tổng mọi giá trị sinh ra từ các lần gộp: gộp một cặp 64 cộng thêm 128.",
    "- Điểm cao nhất được lưu trong trình duyệt này dưới khoá mg-merge-best và không bao giờ rời khỏi thiết bị.",
    "- Ván kết thúc khi bàn đầy và không còn hai ô kề nhau bằng nhau; Bàn mới đưa điểm về không."
  ],
  anagram: [
    "- 100 điểm cho từ giải được mà không cần trợ giúp, 75 điểm khi đã mở gợi ý.",
    "- Đoán sai chỉ tốn thời gian: cứ thử tiếp cho đến khi ra hoặc bỏ qua.",
    "- Tổng điểm tốt nhất qua mười vòng được lưu trong trình duyệt của bạn, và đáp án dài năm đến chín chữ cái, không có danh từ riêng.",
    "- Không có gì được tải lên: điểm cao nhất chỉ sống trong bộ nhớ cục bộ của thiết bị này."
  ],
  wordguess: [
    "- Sáu lượt đoán cho một từ năm chữ cái; xanh lá là đúng chữ đúng vị trí, vàng là đúng chữ nhưng sai vị trí.",
    "- Mỗi lượt đoán phải là từ mà trò chơi biết, nên bàn phím sẽ báo khi từ nhập không có trong danh sách.",
    "- Mỗi ván mới chọn một từ mới, và chuỗi trận thắng của bạn được lưu trong trình duyệt này.",
    "- Hết lượt đoán thì từ được hé lộ và ván kết thúc; chuỗi thắng bắt đầu lại."
  ],
  crossword: [
    "- Mỗi ván mười gợi ý, tất cả được rút ngẫu nhiên từ kho hai mươi sáu câu.",
    "- Mười điểm cho mỗi đáp án đúng, trừ ba điểm cho mỗi gợi ý dùng ở câu đó, và không có điểm khi bỏ qua.",
    "- Chính tả quan trọng nhưng chữ hoa thường thì không: đáp án được so ở dạng chữ in hoa và bỏ khoảng trắng.",
    "- Điểm cao nhất được lưu dưới khoá mg-clueclues-best trong trình duyệt này và không bao giờ rời khỏi thiết bị.",
    "- Ván kết thúc khi đồng hồ về không, và ô trả lời bị khoá cho đến khi bạn bắt đầu lại."
  ],
  pairs: [
    "- Lật hai thẻ mỗi lần và giữ cặp thẻ mở khi hai thẻ khớp nhau.",
    "- Nếu không khớp, thẻ lật lại ngay sau đó, nên nhớ những gì đã thấy chính là toàn bộ trò chơi.",
    "- Ván kết thúc khi tìm đủ sáu cặp; cả số nước và thời gian đều được tính.",
    "- Kết quả tốt nhất của bạn được lưu trong trình duyệt này dưới một khoá bắt đầu bằng mg- và không bao giờ tải lên."
  ],
  sequence: [
    "- Số là số nguyên từ 1 đến 99, tất cả khác nhau, xếp theo thứ tự tăng dần.",
    "- Từ là những từ thông thường, tất cả khác nhau, xếp theo thứ tự chữ cái không phân biệt hoa thường.",
    "- Nhấp vào mục không phải mục kế tiếp bị tính là lỗi và mục đó vẫn còn trong danh sách.",
    "- Điểm của bạn là thời gian hoàn thành; thời gian tốt nhất cho mỗi bộ và độ dài được lưu trong trình duyệt này dưới khoá mg-sort-best.",
    "- Đổi bộ hoặc độ dài sẽ bắt đầu ván mới ngay lập tức."
  ],
  sort: [
    "- Số chạy từ 10 đến 99, và mỗi số chỉ thuộc đúng một hộp.",
    "- Mỗi lần phân loại đúng được một điểm, mỗi lỗi trừ một điểm và không bao giờ xuống dưới không.",
    "- Chuỗi đúng dài nhất được đánh dấu riêng; điểm cao nhất của bạn được lưu trong trình duyệt này dưới khoá mg-bins-best.",
    "- Ván kết thúc khi đồng hồ về không, và các hộp bị khoá cho đến khi bạn bắt đầu lại.",
    "- Không có gì được tải xuống và không ván nào được tải lên: điểm chỉ sống trong bộ nhớ cục bộ."
  ],
  math: [
    "- Dễ: phép cộng và trừ với số đến 20.",
    "- Trung bình: phép nhân từ 2 đến 12, phép chia hết, và cộng hoặc trừ nhỏ đến 30.",
    "- Khó: phép nhân đến 20, phép chia hết, và cộng hoặc trừ với số đến 100.",
    "- Mỗi đáp án đúng được một điểm, không có thưởng vì trả lời nhanh trong ván — áp lực là chiếc đồng hồ.",
    "- Điểm cao nhất cho mỗi độ khó được lưu trong trình duyệt này dưới khoá mg-math-best.",
    "- Khi đồng hồ về không, ván kết thúc và ô nhập bị khoá cho đến khi bạn bắt đầu lại."
  ],
  slide: [
    "- Chỉ ô có chung cạnh với khoảng trống mới di chuyển được; ô kề theo đường chéo thì không.",
    "- Mỗi lần xáo đều sinh ra từ vài trăm nước hợp lệ trên bàn đã giải, nên luôn có lời giải.",
    "- Điểm của bạn là số nước đi, thời gian phân định khi bằng nhau trong kỷ lục của chính bạn.",
    "- Số nước đi tốt nhất cho mỗi cỡ bàn được lưu trong trình duyệt này dưới khoá mg-slide-best.",
    "- Xáo sẽ mở bàn mới, đưa bộ đếm về không và giữ điểm cao nhất."
  ],
  pattern: [
    "- Năm dãy mỗi ngày, mỗi dãy một lần thử, đáp án luôn là số nguyên.",
    "- Đáp án chỉ có thể âm ở bộ phép trừ, và ngay ở đó dãy vẫn giữ trên không.",
    "- Ngày tốt nhất của bạn là số câu đúng cao nhất trên năm, lưu dưới khoá mg-pattern-best.",
    "- Chuỗi ngày được lưu dưới khoá mg-pattern-streak và đếm số ngày liên tiếp bạn hoàn thành bộ.",
    "- Chơi lại sẽ chơi lại năm câu đố của hôm nay; không tạo câu mới."
  ],
  codebreak: [
    "- Dễ: ba chữ số từ 1 đến 5, không lặp, tám lượt đoán.",
    "- Trung bình: bốn chữ số từ 1 đến 6, được lặp, mười lượt đoán.",
    "- Khó: năm chữ số từ 1 đến 8, được lặp, mười hai lượt đoán.",
    "- Bạn thắng khi khớp chính xác mã; điểm là số lượt đoán đã dùng, và điểm tốt nhất cho mỗi độ khó được lưu trong trình duyệt của bạn.",
    "- Hết lượt đoán thì mã được hé lộ, ván tính là thua và điểm tốt nhất không bị đụng tới."
  ]
};
