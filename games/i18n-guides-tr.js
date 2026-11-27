window.MGI18N_GUIDE_POINTS = window.MGI18N_GUIDE_POINTS || {};
window.MGI18N_GUIDE_POINTS.tr = {
  sudoku: [
    "- Her satır, her sütun ve her blok her rakamı tam olarak bir kez içermelidir.",
    "- Altın rakamlar sabittir ve değişmez; Denetle, çözümü vermeden hataları işaretler.",
    "- Süre ilk girişinle başlar ve ızgara çözüldüğü anda durur.",
    "- Her zorluk için en iyi süren tarayıcıda saklanır ve cihazdan hiç ayrılmaz."
  ],
  nonogram: [
    "- Bir satırın yanındaki ya da bir sütunun üstündeki sayılar, dolu hücre dizilerini sırayla verir ve diziler arasında en az bir boş hücre vardır.",
    "- Boş olduğunu anladığın hücreleri çarpıyla işaretle; işaretli hücre hiçbir zaman dolu sayılmaz ve kazanmayı engellemez.",
    "- Satır ve sütun ipuçlarının hepsini karşılayan her yerleşim çözülmüş sayılır, çünkü denetim ipuçları üzerinden yapılır.",
    "- Günlük ızgara tarihten üretilir, yani bugün herkes için aynıdır ve seri üst üste çözülen günleri sayar."
  ],
  merge: [
    "- Bir hamle ancak en az bir taş yer değiştirirse ya da iki taş birleşirse sayılır.",
    "- İki taş bir hamlede en fazla bir kez birleşir, yani dört eşit taş iki çift oluşturur, tek dev taş değil.",
    "- Puan, birleşmelerle oluşan tüm değerlerin toplamıdır: 64 çiftini birleştirmek 128 ekler.",
    "- En iyi puanın bu tarayıcıda mg-merge-best anahtarında saklanır ve cihazdan hiç ayrılmaz.",
    "- Tur, tahta dolduğunda ve komşu iki taş eşit olmadığında biter; Yeni tahta puanı sıfırlar."
  ],
  anagram: [
    "- Yardımsız çözülen kelime 100 puan, ipucu açıldıysa 75 puan.",
    "- Yanlış tahmin yalnızca süre kaybettirir; bulana kadar dene ya da atla.",
    "- On turun en iyi toplamı tarayıcında saklanır ve cevaplar beş ile dokuz harf arasında olup özel ad içermez.",
    "- Hiçbir şey yüklenmez: en iyi puan yalnızca bu cihazdaki localStorage içinde yaşar."
  ],
  wordguess: [
    "- Beş harfli bir kelime için altı deneme; yeşil doğru harfin doğru yerde olduğunu, sarı başka yerde olduğunu gösterir.",
    "- Her tahmin oyunun tanıdığı bir kelime olmalıdır; klavye, giriş listede yoksa bunu gösterir.",
    "- Her yeni oyun yeni bir kelime seçer ve kazanma serin bu tarayıcıda saklanır.",
    "- Denemeler bitince kelime açıklanır ve oyun biter; seri baştan başlar."
  ],
  crossword: [
    "- Tur başına on ipucu, hepsi yirmi altılık bir havuzdan rastgele seçilir.",
    "- Doğru cevap on puan, o ipucunda kullanılan her ipucu üç puan düşürür, atlamak puan vermez.",
    "- Yazım önemlidir ama büyük-küçük harf değil: cevaplar büyük harflerle ve boşluksuz karşılaştırılır.",
    "- En iyi puanın bu tarayıcıda mg-clueclues-best anahtarında saklanır ve cihazdan hiç ayrılmaz.",
    "- Tur, süre sıfıra geldiğinde biter ve cevap kutusu yeniden başlayana kadar kilitli kalır."
  ],
  pairs: [
    "- Bir seferde iki kart çevir ve eşleşen çifti açık bırak.",
    "- Eşleşmezlerse kartlar hemen geri kapanır, bu yüzden gördüğünü hatırlamak oyunun tamamıdır.",
    "- Tur, altı çiftin hepsi bulunduğunda biter; hem hamle hem süre sayılır.",
    "- En iyi sonucun bu tarayıcıda mg- ile başlayan bir anahtarda saklanır ve hiçbir yere yüklenmez."
  ],
  sequence: [
    "- Sayılar 1 ile 99 arasında tam sayılardır, hepsi farklıdır ve küçükten büyüğe sıralanır.",
    "- Kelimeler sıradan kelimelerdir, hepsi farklıdır ve büyük-küçük harf gözetmeden alfabetik sıralanır.",
    "- Sıradaki öğe olmayan bir tıklama hata sayılır ve öğe havuzda kalır.",
    "- Puanın bitirme sürendir; her küme ve uzunluk için en iyi süre bu tarayıcıda mg-sort-best anahtarında saklanır.",
    "- Kümeyi veya uzunluğu değiştirmek hemen yeni bir tur başlatır."
  ],
  sort: [
    "- Sayılar 10 ile 99 arasındadır ve her sayı yalnızca bir kutuya aittir.",
    "- Doğru her sıralama bir puan, her hata bir puan eksiltir ve puan sıfırın altına inmez.",
    "- En uzun doğru serin seri olarak gösterilir; en iyi puanın bu tarayıcıda mg-bins-best anahtarında saklanır.",
    "- Tur, süre sıfıra geldiğinde biter ve kutular yeniden başlayana kadar kilitli kalır.",
    "- Hiçbir şey indirilmez ve hiçbir tur yüklenmez: puan yalnızca localStorage içinde yaşar."
  ],
  math: [
    "- Kolay: 20'ye kadar sayılarla toplama ve çıkarma.",
    "- Orta: 2 ile 12 arası çarpma, tam bölme ve 30'a kadar küçük toplama veya çıkarma.",
    "- Zor: 20'ye kadar çarpma, tam bölme ve 100'e kadar sayılarla toplama veya çıkarma.",
    "- Her doğru cevap bir puan, tur içinde hız için ek puan yok — baskıyı süre yapar.",
    "- Her zorluktaki en iyi puanın bu tarayıcıda mg-math-best anahtarında saklanır.",
    "- Süre sıfıra geldiğinde tur biter ve giriş yeniden başlayana kadar kilitli kalır."
  ],
  slide: [
    "- Yalnızca boşlukla kenar paylaşan taş hareket edebilir; çapraz komşular hareket edemez.",
    "- Her karıştırma çözülmüş tahtadan yüzlerce geçerli hamleyle üretilir, yani çözüm her zaman vardır.",
    "- Puanın hamle sayısıdır; kendi rekorlarında eşitliği süre belirler.",
    "- Her tahta boyutu için en iyi hamle sayısı bu tarayıcıda mg-slide-best anahtarında saklanır.",
    "- Karıştırma yeni bir tahta başlatır, sayaçları sıfırlar ve en iyi puanı korur."
  ],
  pattern: [
    "- Günde beş dizi, her birine tek deneme, cevaplar her zaman tam sayı.",
    "- Cevaplar yalnızca çıkarma dizisinde negatif olabilir ve orada bile dizi sıfırın üstünde kalır.",
    "- En iyi günün beş üzerinden en çok doğru sayısıdır ve mg-pattern-best anahtarında saklanır.",
    "- Günlük seri mg-pattern-streak anahtarında saklanır ve kümeyi tamamladığın üst üste günleri sayar.",
    "- Yeniden başlatmak bugünün beş bulmacasını tekrar oynatır; yenisini üretmez."
  ],
  codebreak: [
    "- Kolay: 1 ile 5 arası üç rakam, tekrarsız, sekiz tahmin.",
    "- Orta: 1 ile 6 arası dört rakam, tekrar serbest, on tahmin.",
    "- Zor: 1 ile 8 arası beş rakam, tekrar serbest, on iki tahmin.",
    "- Kodu tam tutturunca kazanırsın; puanın kullandığın tahmin sayısıdır ve her zorluktaki en iyi puan tarayıcında saklanır.",
    "- Tahminler bitince kod açıklanır, tur kayıp sayılır ve en iyi puanın değişmez."
  ]
};
