window.MGI18N_GUIDE_POINTS = window.MGI18N_GUIDE_POINTS || {};
window.MGI18N_GUIDE_POINTS.id = {
  sudoku: [
    "- Setiap baris, setiap kolom dan setiap kotak harus memuat setiap angka tepat satu kali.",
    "- Angka emas adalah petunjuk tetap dan tidak berubah; Periksa menandai kesalahan tanpa membocorkan jawaban.",
    "- Timer mulai saat entri pertamamu dan berhenti tepat ketika kotak terisi benar semua.",
    "- Waktu terbaik untuk tiap tingkat kesulitan disimpan di browser ini dan tidak pernah meninggalkan perangkat."
  ],
  nonogram: [
    "- Angka di samping baris atau di atas kolom menyebut panjang deretan sel terisi secara berurutan, dengan sedikitnya satu sel kosong di antaranya.",
    "- Tandai sel yang sudah kamu pastikan kosong dengan silang; sel bertanda tidak pernah dihitung terisi dan tidak menghalangi kemenangan.",
    "- Susunan apa pun yang memenuhi semua petunjuk baris dan kolom dianggap selesai, karena pemeriksaannya pada petunjuk.",
    "- Papan harian dibuat dari tanggal, jadi hari ini sama untuk semua orang, dan rentetan menghitung hari berturut-turut yang selesai."
  ],
  merge: [
    "- Langkah dihitung hanya jika sedikitnya satu ubin berpindah atau dua ubin melebur.",
    "- Satu ubin melebur paling banyak sekali per langkah, jadi empat ubin sama dalam satu baris menjadi dua pasang, bukan satu ubin raksasa.",
    "- Skor adalah jumlah semua nilai yang lahir dari peleburan: melebur pasangan 64 menambah 128.",
    "- Skor terbaikmu disimpan di browser ini dengan kunci mg-merge-best dan tidak pernah meninggalkan perangkat.",
    "- Ronde berakhir saat papan penuh dan tidak ada dua ubin bersebelahan yang sama; Papan baru mengosongkan skor."
  ],
  anagram: [
    "- 100 poin untuk kata yang terpecahkan tanpa bantuan, 75 setelah petunjuk dibuka.",
    "- Tebakan salah hanya memakan waktu: terus coba sampai ketemu atau lewati.",
    "- Total terbaik dari sepuluh ronde disimpan di browser, dan jawabannya lima sampai sembilan huruf tanpa nama diri.",
    "- Tidak ada yang diunggah: skor terbaik hanya hidup di penyimpanan lokal perangkat ini."
  ],
  wordguess: [
    "- Enam percobaan untuk kata lima huruf; hijau berarti huruf benar di posisi benar, kuning huruf benar di posisi lain.",
    "- Setiap tebakan harus kata yang dikenal permainan, jadi papan ketik memberi tahu bila masukan tidak ada di daftar.",
    "- Setiap permainan baru memilih kata baru, dan rentetan kemenanganmu disimpan di browser ini.",
    "- Bila percobaan habis, kata dibuka dan permainan berakhir; rentetan dimulai dari nol."
  ],
  crossword: [
    "- Sepuluh petunjuk per ronde, semuanya diambil acak dari kumpulan dua puluh enam.",
    "- Sepuluh poin untuk jawaban benar, tiga dikurangi untuk tiap petunjuk yang dipakai di soal itu, nol untuk melewati.",
    "- Ejaan penting tetapi huruf besar-kecil tidak: jawaban dibandingkan dalam huruf besar tanpa spasi.",
    "- Skor terbaikmu disimpan dengan kunci mg-clueclues-best di browser ini dan tidak pernah meninggalkan perangkat.",
    "- Ronde berakhir saat timer mencapai nol, dan kotak jawaban terkunci sampai kamu mulai lagi."
  ],
  pairs: [
    "- Buka dua kartu sekaligus dan biarkan pasangan tetap terbuka bila keduanya cocok.",
    "- Bila tidak cocok, kartu kembali tertutup sekejap, jadi mengingat apa yang kamu lihat adalah inti permainannya.",
    "- Ronde berakhir saat keenam pasangan ditemukan; langkah dan waktu sama-sama dihitung.",
    "- Hasil terbaikmu disimpan di browser ini dengan kunci berawalan mg- dan tidak pernah diunggah."
  ],
  sequence: [
    "- Angka adalah bilangan bulat 1 sampai 99, semuanya berbeda, diurutkan menaik.",
    "- Kata adalah kata biasa, semuanya berbeda, diurutkan menurut abjad tanpa membedakan huruf besar-kecil.",
    "- Klik yang bukan item berikutnya dihitung kesalahan dan item itu tetap tersedia.",
    "- Skormu adalah waktu penyelesaian; waktu terbaik tiap set dan panjang disimpan di browser ini dengan kunci mg-sort-best.",
    "- Mengganti set atau panjang langsung memulai ronde baru."
  ],
  sort: [
    "- Angka berkisar 10 sampai 99, dan setiap angka hanya cocok untuk satu kotak.",
    "- Satu poin untuk setiap sortir benar, satu poin hilang untuk setiap kesalahan, tidak pernah di bawah nol.",
    "- Rentetan jawaban benar terpanjang ditampilkan terpisah; skor terbaikmu disimpan di browser ini dengan kunci mg-bins-best.",
    "- Ronde berakhir saat timer mencapai nol, dan kotak terkunci sampai kamu mulai lagi.",
    "- Tidak ada yang diunduh dan tidak ada ronde yang diunggah: skor hanya hidup di penyimpanan lokal."
  ],
  math: [
    "- Mudah: penjumlahan dan pengurangan dengan angka sampai 20.",
    "- Sedang: perkalian 2 sampai 12, pembagian tanpa sisa, dan penjumlahan atau pengurangan kecil sampai 30.",
    "- Sulit: perkalian sampai 20, pembagian tanpa sisa, dan penjumlahan atau pengurangan dengan angka sampai 100.",
    "- Satu poin untuk setiap jawaban benar, tanpa bonus karena cepat di dalam ronde — tekanannya adalah timer.",
    "- Skor terbaik tiap tingkat kesulitan disimpan di browser ini dengan kunci mg-math-best.",
    "- Saat timer mencapai nol ronde berakhir dan masukan terkunci sampai kamu mulai lagi."
  ],
  slide: [
    "- Hanya ubin yang berbagi sisi dengan ruang kosong yang bisa bergerak; tetangga diagonal tidak bisa.",
    "- Setiap pengacakan dibuat dari beberapa ratus langkah sah dari papan yang sudah selesai, jadi solusinya selalu ada.",
    "- Skormu adalah jumlah langkah, dengan waktu sebagai penentu untuk rekormu sendiri.",
    "- Jumlah langkah terbaik untuk tiap ukuran papan disimpan di browser ini dengan kunci mg-slide-best.",
    "- Mengacak memulai papan baru, mengatur ulang penghitung dan menyimpan skor terbaik."
  ],
  pattern: [
    "- Lima deret per hari, satu percobaan masing-masing, dan jawabannya selalu bilangan bulat.",
    "- Jawaban hanya boleh negatif pada set pengurangan, dan di sana pun deretnya tetap di atas nol.",
    "- Hari terbaikmu adalah jumlah jawaban benar terbanyak dari lima, disimpan dengan kunci mg-pattern-best.",
    "- Rentetan harian disimpan dengan kunci mg-pattern-streak dan menghitung hari berturut-turut kamu menyelesaikan set.",
    "- Mulai ulang akan memainkan lagi lima teka-teki hari ini; tidak membuat yang baru."
  ],
  codebreak: [
    "- Mudah: tiga angka dari 1 sampai 5, tanpa pengulangan, delapan tebakan.",
    "- Sedang: empat angka dari 1 sampai 6, pengulangan boleh, sepuluh tebakan.",
    "- Sulit: lima angka dari 1 sampai 8, pengulangan boleh, dua belas tebakan.",
    "- Kamu menang bila kodenya cocok persis; skormu adalah jumlah tebakan yang dipakai, dan skor terbaik tiap tingkat kesulitan disimpan di browsermu.",
    "- Bila tebakan habis, kode dibuka, ronde dihitung kalah, dan skor terbaikmu tidak berubah."
  ]
};
