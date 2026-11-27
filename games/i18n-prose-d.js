/* Arcade editorial prose, part 4: zh, ja, ko, id, vi. */
(function () {
  "use strict";
  var PARTS = window.MGI18N_PROSE_PARTS = window.MGI18N_PROSE_PARTS || [];
  PARTS.push({
    zh: {
      catLede: {
        brain: "游戏厅里最宽的一个分区：推理、破译、记忆、心算，以及惩罚手快点击的谜题。",
        daily: "每天一盘，按日期生成，所有人拿到同一道题——共五款每日游戏。",
        number: "数字合成、数字复述、计算冲刺，还有同样拥有独立分区的数独棋盘。",
        word: "七款字母游戏，词汇贴近日常：五字母推理、找字谜，以及话更多的填字游戏。",
        crossword: "不需要订阅的填字思维：词方阵、线索冲刺、每日一组，以及字母被调换的网格。",
        sudoku: "五种数独棋盘、四种尺寸，从完整九宫格到适合拇指的口袋棋盘。",
        memory: "五种触到短时记忆边界的方法：卡片、面板、网格、数字和图形。",
        sort: "排序、分箱、修复和限时挑战，材料是数字、分数和历史日期。",
        math: "六款以算术为玩法本身的游戏：冲刺、缺值、列方程和分数排序。",
        puzzle: "永远可解的滑块、逻辑数织和词方阵——节奏更慢，也因此更好。"
      },
      catOverview: {
        brain: "大多数游戏要求同样的三个习惯：动手前先看盘面，记下已排除的选项，下一步只能靠猜时就停下。",
        daily: "每日谜题是有限的：不能刷分，也不能重玩求高分，唯一要守住的是连续天数。",
        number: "这里的一切都是生成的，不是手绘的：每次盘面都不同，算式始终摆在眼前。",
        word: "词汇刻意贴近日常。输给生僻词什么也学不到；输给常见词，才会让你再看一眼。",
        crossword: "填字游戏同时是两种谜题：线索是去掉语法的释义，网格是一套约束系统。",
        sudoku: "每个棋盘都经过生成与唯一解校验。出现两个解就说明题目坏了，网格再整齐也没用。",
        memory: "五种玩法是同一个实验换了衣服：展示、拿走、再复现。",
        sort: "比较两项很容易；一边决定中间项的位置、一边把整组记在脑子里就不容易了。",
        math: "都不需要计算器。关键是那些小决定：用哪种运算，以及这个数值是否合理。",
        puzzle: "每个棋盘都有保证：用合法移动打乱，或在展示前完成校验。"
      },
      catTrains: {
        brain: "推理、工作记忆，以及落子前先检查的纪律。",
        daily: "坚持、短时专注，以及把开始的事做完的习惯。",
        number: "数感、快速计算和提前几步规划。",
        word: "词汇、拼写，以及在轻微压力下发现规律。",
        crossword: "语言推理、寻找释义和约束求解。",
        sudoku: "逻辑推理、扫视和面对单一约束的耐心。",
        memory: "短时记忆、注意力和组块。",
        sort: "比较、排序，以及同时记住多项内容。",
        math: "心算、估算和倒推。",
        puzzle: "空间推理、规划，以及冷静地一步步解题。"
      }
    },
    ja: {
      catLede: {
        brain: "アーケードで最も広い棚。推理、暗号解読、記憶、暗算、そして慌てたクリックを罰するパズル。",
        daily: "日付から作られる1日1盤で、全員が同じ問題に挑戦します。デイリーは全部で5種類。",
        number: "タイルの合体、数字の復唱、計算スプリント、そして専用の棚もある数独盤。",
        word: "日常的な語彙で遊ぶ7つの文字ゲーム。5文字推理、アナグラム探し、そして言葉多めのクロスワード。",
        crossword: "購読なしでクロスワードの思考を。単語の四角、ヒントスプリント、毎日のセット、文字を入れ替えたグリッド。",
        sudoku: "4サイズ・5つの数独盤。完全な9×9から、親指向けのポケット盤まで。",
        memory: "短期記憶の限界に触れる5つの方法。カード、パッド、グリッド、数字、図形。",
        sort: "並べ替え、仕分け、修復、時間との勝負。素材は数字、分数、歴史的な日付。",
        math: "計算そのものが遊びの6ゲーム。スプリント、欠けた値、式づくり、分数の並べ替え。",
        puzzle: "必ず解けるスライドタイル、論理ノノグラム、単語の四角。ゆっくりだからこそ良い。"
      },
      catOverview: {
        brain: "多くに共通する3つの習慣。動く前に盤を見る、除外したものを書き留める、次の一手が勘なら止める。",
        daily: "デイリーは有限です。周回もスコア狙いの再挑戦もできないので、守るのは連続記録だけ。",
        number: "ここはすべて生成で、手描きではありません。盤は毎回変わり、計算は常に見えます。",
        word: "語彙はあえて日常的。珍しい単語で負けても学びはありませんが、よく使う単語で負けると見直すことを覚えます。",
        crossword: "クロスワードは二つのパズル。ヒントは文法を削いだ定義、グリッドは制約の体系です。",
        sudoku: "どの盤も生成され、唯一解かどうか確認されます。解が二つあるなら、見た目が整っていても問題は壊れています。",
        memory: "5つとも同じ実験の着替えです。見せて、取り上げて、再現する。",
        sort: "2つを比べるのは簡単。真ん中の行き先を決めながら全体を頭に置くのは簡単ではありません。",
        math: "電卓は不要です。どの演算を使うか、その値は妥当か。小さな判断が中心。",
        puzzle: "どの盤も保証つきで生成されます。合法手でシャッフルするか、表示前に検証します。"
      },
      catTrains: {
        brain: "推理、ワーキングメモリ、そして着手前に確認する習慣。",
        daily: "継続、短い集中、始めたことを終える習慣。",
        number: "数感覚、速い計算、数手先の計画。",
        word: "語彙、つづり、軽いプレッシャー下でのパターン発見。",
        crossword: "言語的推論、定義探し、制約解決。",
        sudoku: "論理推論、走査、一つの制約への忍耐。",
        memory: "短期記憶、注意力、チャンク化。",
        sort: "比較、順序づけ、複数項目の同時保持。",
        math: "暗算、見積もり、逆算。",
        puzzle: "空間推論、計画、落ち着いた一歩ずつの解決。"
      }
    },
    ko: {
      catLede: {
        brain: "아케이드에서 가장 넓은 선반: 추론, 암호 해독, 기억력, 암산, 그리고 성급한 클릭을 벌하는 퍼즐.",
        daily: "날짜로 만들어져 모두가 같은 문제를 푸는 하루 한 판 — 총 다섯 개의 데일리.",
        number: "타일 합치기, 숫자 따라 말하기, 계산 스프린트, 그리고 자기 선반도 있는 스도쿠 보드.",
        word: "일상 어휘로 하는 일곱 가지 글자 게임: 다섯 글자 추리, 애너그램 사냥, 말이 더 많은 십자말.",
        crossword: "구독 없이 즐기는 십자말 사고: 단어 사각형, 힌트 스프린트, 데일리 세트, 글자를 바꾼 격자.",
        sudoku: "네 가지 크기의 스도쿠 보드 다섯 개. 완전한 9×9부터 엄지용 포켓 보드까지.",
        memory: "단기 기억의 한계를 만나는 다섯 가지 방법: 카드, 패드, 격자, 숫자, 도형.",
        sort: "정렬, 분류, 복구, 시간 싸움 — 숫자, 분수, 역사적 날짜로.",
        math: "산수가 곧 게임인 여섯 가지: 스프린트, 빈 값, 방정식 만들기, 분수 정렬.",
        puzzle: "항상 풀 수 있는 슬라이드 타일, 논리 노노그램, 단어 사각형 — 더 느리고 그래서 더 좋습니다."
      },
      catOverview: {
        brain: "대부분 같은 세 가지 습관을 요구합니다. 움직이기 전에 보드를 보고, 이미 제외한 것을 적고, 다음 수가 추측이라면 멈추세요.",
        daily: "데일리 퍼즐은 유한합니다. 점수를 위해 반복할 수 없으니 지킬 것은 연속 기록뿐입니다.",
        number: "모든 것이 생성되지, 손으로 그리지 않습니다. 보드는 매번 달라지고 계산은 늘 보입니다.",
        word: "어휘는 의도적으로 일상적입니다. 드문 단어 때문에 지면 배울 게 없지만, 흔한 단어 때문에 지면 다시 보게 됩니다.",
        crossword: "십자말은 두 개의 퍼즐입니다. 힌트는 문법을 걷어낸 정의이고, 격자는 제약 체계입니다.",
        sudoku: "모든 보드는 생성 후 유일해를 검사합니다. 해가 둘이면 격자가 아무리 반듯해도 문제는 망가진 것입니다.",
        memory: "다섯 가지 모두 같은 실험의 다른 옷입니다. 보여주고, 치우고, 재현합니다.",
        sort: "두 항목을 비교하는 건 쉽습니다. 가운데 항목의 자리를 정하면서 전체를 머리에 두는 건 어렵습니다.",
        math: "계산기가 필요 없습니다. 어떤 연산을 쓸지, 값이 그럴듯한지가 핵심입니다.",
        puzzle: "모든 보드는 보장과 함께 생성됩니다. 합법적인 이동으로 섞거나 보여주기 전에 검사합니다."
      },
      catTrains: {
        brain: "추론, 작업 기억, 그리고 두기 전에 확인하는 습관.",
        daily: "꾸준함, 짧은 집중, 시작한 일을 끝내는 습관.",
        number: "수 감각, 빠른 계산, 몇 수 앞을 내다보는 계획.",
        word: "어휘, 철자, 약간의 압박 속 패턴 찾기.",
        crossword: "언어 추론, 정의 찾기, 제약 해결.",
        sudoku: "논리 추론, 스캔, 하나의 제약을 견디는 인내.",
        memory: "단기 기억, 주의력, 묶어 기억하기.",
        sort: "비교, 정렬, 여러 항목을 동시에 기억하기.",
        math: "암산, 어림셈, 거꾸로 풀기.",
        puzzle: "공간 추론, 계획, 차분한 단계별 문제 해결."
      }
    },
    id: {
      catLede: {
        brain: "Rak terluas di arcade: deduksi, memecahkan kode, memori, hitung cepat, dan teka-teki yang menghukum klik terburu-buru.",
        daily: "Satu papan sehari, dibuat dari tanggal agar semua orang mendapat teka-teki yang sama — lima permainan harian.",
        number: "Menggabungkan ubin, menirukan digit, sprint hitung, dan papan Sudoku yang juga punya rak sendiri.",
        word: "Tujuh permainan huruf dengan kosakata sehari-hari: deduksi lima huruf, perburuan anagram, dan teka-teki silang yang lebih banyak kata.",
        crossword: "Cara berpikir teka-teki silang tanpa langganan: kotak kata, sprint petunjuk, set harian, dan kisi dengan huruf ditukar.",
        sudoku: "Lima papan Sudoku dalam empat ukuran, dari sembilan kali sembilan penuh sampai papan saku untuk ibu jari.",
        memory: "Lima cara menyentuh batas memori jangka pendek: kartu, pad, kisi, digit, dan bentuk.",
        sort: "Mengurutkan, memilah, memperbaiki, dan melawan waktu — dengan angka, pecahan, dan tanggal.",
        math: "Enam permainan yang aritmetikanya adalah permainannya: sprint, nilai hilang, menyusun persamaan, dan mengurutkan pecahan.",
        puzzle: "Ubin geser yang selalu bisa diselesaikan, nonogram logika, dan kotak kata — lebih lambat, dan justru lebih baik."
      },
      catOverview: {
        brain: "Sebagian besar meminta tiga kebiasaan yang sama: lihat papan sebelum bergerak, catat yang sudah disingkirkan, dan berhenti saat langkah berikutnya hanya tebakan.",
        daily: "Teka-teki harian itu terbatas: tidak bisa diulang untuk skor lebih baik, jadi satu-satunya yang dijaga adalah rentetan.",
        number: "Semua dibuat otomatis, bukan digambar tangan: papan berubah setiap kali dan hitungannya selalu terlihat.",
        word: "Kosakatanya sengaja sehari-hari. Kalah karena kata langka tidak mengajarkan apa-apa; kalah karena kata umum mengajarkan untuk melihat lagi.",
        crossword: "Teka-teki silang adalah dua teka-teki sekaligus: petunjuk adalah definisi tanpa tata bahasa, dan kisi adalah sistem batasan.",
        sudoku: "Setiap papan dibuat dan diperiksa punya satu solusi. Dua solusi berarti teka-tekinya rusak, serapi apa pun kisinya.",
        memory: "Kelima permainan adalah eksperimen yang sama dengan pakaian berbeda: sesuatu ditampilkan, diambil, lalu kamu ulangi.",
        sort: "Membandingkan dua hal itu mudah; menyimpan seluruh kumpulan di kepala sambil menentukan posisi yang tengah tidak.",
        math: "Tidak ada yang butuh kalkulator. Yang penting keputusan kecil: operasi mana, dan apakah nilainya masuk akal.",
        puzzle: "Setiap papan dibuat dengan jaminan — diacak dengan langkah legal atau diperiksa sebelum ditampilkan."
      },
      catTrains: {
        brain: "Deduksi, memori kerja, dan disiplin memeriksa langkah sebelum dijalankan.",
        daily: "Konsistensi, fokus singkat, dan kebiasaan menyelesaikan yang dimulai.",
        number: "Rasa angka, hitung cepat, dan merencanakan beberapa langkah ke depan.",
        word: "Kosakata, ejaan, dan mengenali pola di bawah tekanan ringan.",
        crossword: "Penalaran verbal, mencari definisi, dan menyelesaikan batasan.",
        sudoku: "Deduksi logis, memindai, dan sabar dengan satu batasan.",
        memory: "Memori jangka pendek, perhatian, dan pengelompokan.",
        sort: "Membandingkan, mengurutkan, dan mengingat beberapa hal sekaligus.",
        math: "Hitung mental, estimasi, dan bekerja mundur.",
        puzzle: "Penalaran spasial, perencanaan, dan penyelesaian tenang langkah demi langkah."
      }
    },
    vi: {
      catLede: {
        brain: "Kệ rộng nhất trong arcade: suy luận, phá mã, trí nhớ, tính nhẩm và những câu đố trừng phạt cú nhấp vội.",
        daily: "Mỗi ngày một bàn, tạo từ ngày tháng để ai cũng gặp cùng một câu đố — tổng cộng năm trò hằng ngày.",
        number: "Ghép ô, nhắc lại chữ số, chạy đua tính toán và những bàn Sudoku cũng có kệ riêng.",
        word: "Bảy trò chơi chữ với vốn từ đời thường: trò suy luận năm chữ, săn đảo chữ và ô chữ nhiều từ hơn.",
        crossword: "Tư duy ô chữ không cần đăng ký: ô vuông từ, chạy đua gợi ý, bộ hằng ngày và lưới đổi chỗ chữ.",
        sudoku: "Năm bàn Sudoku bốn cỡ, từ lưới chín nhân chín đầy đủ đến bàn bỏ túi cho ngón cái.",
        memory: "Năm cách chạm giới hạn trí nhớ ngắn hạn: thẻ, bảng, lưới, chữ số và hình.",
        sort: "Sắp xếp, phân loại, sửa chữa và đua với thời gian — với số, phân số và ngày tháng.",
        math: "Sáu trò mà chính phép tính là trò chơi: chạy đua, giá trị thiếu, dựng phương trình và xếp phân số.",
        puzzle: "Ô trượt luôn giải được, nonogram logic và ô vuông từ — chậm hơn, và nhờ thế tốt hơn."
      },
      catOverview: {
        brain: "Phần lớn đòi ba thói quen: nhìn bàn trước khi đi, ghi lại thứ đã loại và dừng khi nước tiếp theo chỉ là phỏng đoán.",
        daily: "Câu đố hằng ngày là hữu hạn: không thể cày hay chơi lại để điểm cao hơn, nên chỉ có chuỗi ngày là cần giữ.",
        number: "Mọi thứ đều được tạo tự động, không vẽ tay: bàn đổi mỗi lần và phép tính luôn hiện ra.",
        word: "Vốn từ cố ý đời thường. Thua vì một từ hiếm chẳng dạy gì; thua vì một từ quen dạy bạn nhìn lại.",
        crossword: "Ô chữ là hai câu đố cùng lúc: gợi ý là định nghĩa bỏ ngữ pháp, còn lưới là hệ ràng buộc.",
        sudoku: "Mỗi bàn được tạo và kiểm tra có nghiệm duy nhất. Hai nghiệm nghĩa là câu đố hỏng, dù lưới có gọn gàng đến đâu.",
        memory: "Cả năm là cùng một thí nghiệm với bộ đồ khác: cho xem, lấy đi rồi bạn tái hiện.",
        sort: "So hai món thì dễ; giữ cả tập trong đầu khi quyết định chỗ cho món giữa thì không.",
        math: "Không trò nào cần máy tính. Điều quan trọng là quyết định nhỏ: dùng phép nào và giá trị có hợp lý không.",
        puzzle: "Mỗi bàn được tạo có bảo đảm — xáo bằng nước đi hợp lệ hoặc kiểm tra trước khi hiện."
      },
      catTrains: {
        brain: "Suy luận, trí nhớ làm việc và kỷ luật kiểm tra nước đi trước khi thực hiện.",
        daily: "Đều đặn, tập trung ngắn và thói quen hoàn thành việc đã bắt đầu.",
        number: "Cảm giác về số, tính nhanh và lên kế hoạch vài nước.",
        word: "Từ vựng, chính tả và nhận ra quy luật dưới áp lực nhẹ.",
        crossword: "Lập luận ngôn ngữ, tìm định nghĩa và giải ràng buộc.",
        sudoku: "Suy luận logic, quét bàn và kiên nhẫn với một ràng buộc.",
        memory: "Trí nhớ ngắn hạn, chú ý và gom nhóm.",
        sort: "So sánh, sắp thứ tự và giữ nhiều mục trong đầu cùng lúc.",
        math: "Tính nhẩm, ước lượng và làm ngược từ kết quả.",
        puzzle: "Tư duy không gian, lập kế hoạch và giải từng bước bình tĩnh."
      }
    }
  });
})();
