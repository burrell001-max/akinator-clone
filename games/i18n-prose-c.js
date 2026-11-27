/* Arcade editorial prose, part 3: tr, ar, he, fa. */
(function () {
  "use strict";
  var PARTS = window.MGI18N_PROSE_PARTS = window.MGI18N_PROSE_PARTS || [];
  PARTS.push({
    tr: {
      catLede: {
        brain: "Arcade'in en geniş rafı: çıkarım, şifre kırma, hafıza, zihinden hesap ve aceleci bir tıklayı açığa çıkaran bulmacalar.",
        daily: "Herkesin aynı bulmacayı alması için tarihten üretilen günde bir tahta — toplam beş günlük oyun.",
        number: "Taşları birleştirme, rakam tekrarı, hesap sprintleri ve kendi rafı da olan Sudoku tahtaları.",
        word: "Günlük kelimelerle yedi harf oyunu: beş harfli bir çıkarım oyunu, anagram avları ve daha konuşkan bulmacalar.",
        crossword: "Abonelik gerektirmeyen bulmaca düşüncesi: kelime kareleri, ipucu sprintleri, günlük bir set ve harfleri değiştirilmiş bir ızgara.",
        sudoku: "Dört boyutta beş Sudoku tahtası: tam dokuz çarpı dokuzdan başparmak için cep tahtasına kadar.",
        memory: "Kısa süreli hafızanın sınırına beş yol: kartlar, padler, ızgaralar, rakamlar ve şekiller.",
        sort: "Sıralama, kutulara ayırma, onarma ve zamana karşı — sayılar, kesirler ve tarihlerle.",
        math: "Aritmetiğin oyun olduğu altı oyun: sprintler, eksik değerler, denklem kurma ve kesir sıralama.",
        puzzle: "Her zaman çözülebilir kayan taşlar, mantık nonogramı ve kelime kareleri — daha yavaş, bu yüzden daha iyi."
      },
      catOverview: {
        brain: "Çoğu aynı üç alışkanlığı ister: hamle yapmadan önce tahtaya bak, elediklerini not et ve sıradaki hamle tahmin olacaksa dur.",
        daily: "Günlük bulmaca sonludur: daha iyi skor için tekrarlanamaz, korunacak tek şey seridir.",
        number: "Buradaki her şey üretilir, elle çizilmez: tahta her seferinde farklıdır ve hesap görünür kalır.",
        word: "Kelime dağarcığı bilerek günlüktür. Nadir bir kelime yüzünden kaybetmek bir şey öğretmez; yaygın bir kelime yüzünden kaybetmek tekrar bakmayı öğretir.",
        crossword: "Bir bulmaca aynı anda iki bulmacadır: ipucu grameri çıkarılmış bir tanım, ızgara ise bir kısıtlar sistemidir.",
        sudoku: "Her tahta üretilir ve tek çözümü olduğu doğrulanır. İki çözüm, ızgara ne kadar düzenli görünse de bulmacanın bozuk olduğu anlamına gelir.",
        memory: "Beşi de aynı deneyin farklı kıyafetidir: bir şey gösterilir, alınır ve tekrar edilir.",
        sort: "İki öğeyi karşılaştırmak kolaydır; ortadakinin yerini ararken tüm kümeyi akılda tutmak değildir.",
        math: "Hiçbiri hesap makinesi istemez. Küçük kararlar önemlidir: hangi işlem ve değer makul mü?",
        puzzle: "Her tahta garantili üretilir — yasal hamlelerle karıştırılır veya gösterilmeden önce kontrol edilir."
      },
      catTrains: {
        brain: "Çıkarım, çalışma belleği ve bir hamleyi yapmadan önce kontrol etme disiplini.",
        daily: "Süreklilik, kısa odak ve başladığını bitirme alışkanlığı.",
        number: "Sayı hissi, hızlı hesap ve birkaç hamle ileriyi planlama.",
        word: "Kelime dağarcığı, yazım ve hafif baskı altında desen yakalama.",
        crossword: "Sözel akıl yürütme, tanım avı ve kısıt çözme.",
        sudoku: "Mantıksal çıkarım, tarama ve tek bir kısıtla sabır.",
        memory: "Kısa süreli hafıza, dikkat ve gruplama.",
        sort: "Karşılaştırma, sıralama ve birkaç öğeyi aynı anda akılda tutma.",
        math: "Zihinden hesap, tahmin ve geriye doğru çalışma.",
        puzzle: "Uzamsal düşünme, planlama ve sakin, adım adım çözme."
      }
    },
    ar: {
      catLede: {
        brain: "أوسع رف في الأركيد: استنتاج، فك شيفرات، ذاكرة، حساب ذهني وألغاز تعاقب النقر المتسرع.",
        daily: "لوح واحد كل يوم، يُبنى من التاريخ ليحصل الجميع على اللغز نفسه — خمسة ألغاز يومية.",
        number: "دمج القطع، ترديد الأرقام، سباقات الحساب ولوحات سودوكو التي لها رف خاص أيضًا.",
        word: "سبع ألعاب حروف بمفردات يومية: لعبة استنتاج من خمسة حروف، مطاردات أناغرام والكلمات المتقاطعة الأكثر كلامًا.",
        crossword: "تفكير الكلمات المتقاطعة دون اشتراك: مربعات كلمات، سباقات تلميحات، مجموعة يومية وشبكة بحروف مبدلة.",
        sudoku: "خمس لوحات سودوكو بأربعة أحجام، من شبكة التسعة في تسعة الكاملة إلى لوحة جيب للإبهام.",
        memory: "خمس طرق لبلوغ حد الذاكرة قصيرة المدى: بطاقات ولوحات وشبكات وأرقام وأشكال.",
        sort: "ترتيب وتصنيف وإصلاح وضد الساعة، بالأرقام والكسور والتواريخ.",
        math: "ست ألعاب تكون فيها الحساب هو اللعبة: سباقات، قيم ناقصة، بناء معادلات وترتيب كسور.",
        puzzle: "قطع منزلقة قابلة للحل دائمًا، ونونوغرام منطقي، ومربعات كلمات — أبطأ ولذلك أفضل."
      },
      catOverview: {
        brain: "معظمها يطلب العادات الثلاث نفسها: انظر إلى اللوح قبل التحرك، دوّن ما استبعدته، وتوقف عندما تكون الحركة التالية تخمينًا.",
        daily: "اللغز اليومي محدود: لا يمكن تكراره لتحسين النتيجة، لذا الشيء الوحيد الذي تحميه هو السلسلة.",
        number: "كل شيء هنا يُولَّد ولا يُرسم يدويًا: اللوح مختلف كل مرة والحساب ظاهر دائمًا.",
        word: "المفردات يومية عن قصد. الخسارة بسبب كلمة نادرة لا تعلّم شيئًا؛ والخسارة بسبب كلمة شائعة تعلّمك أن تنظر مرة أخرى.",
        crossword: "الكلمات المتقاطعة لغزان معًا: التلميح تعريف بلا قواعد، والشبكة نظام قيود.",
        sudoku: "كل لوح يُولَّد ويُفحص ليكون له حل واحد. حلان يعنيان أن اللغز معطوب، مهما بدت الشبكة مرتبة.",
        memory: "الخمسة هي التجربة نفسها بثياب مختلفة: يُعرض شيء، يُسحب، ثم تعيده.",
        sort: "مقارنة عنصرين سهلة؛ أما الاحتفاظ بالمجموعة كلها في ذهنك وأنت تحدد مكان الأوسط فليس سهلًا.",
        math: "لا تحتاج أي منها آلة حاسبة. القرارات الصغيرة هي المهمة: أي عملية تختار وهل القيمة معقولة.",
        puzzle: "كل لوح يُولَّد بضمان — يُخلط بحركات مشروعة أو يُفحص قبل عرضه."
      },
      catTrains: {
        brain: "الاستنتاج والذاكرة العاملة والانضباط في فحص الحركة قبل تنفيذها.",
        daily: "الانتظام والتركيز القصير وعادة إكمال ما تبدأه.",
        number: "الإحساس بالأرقام والحساب السريع والتخطيط لعدة حركات.",
        word: "المفردات والهجاء وملاحظة الأنماط تحت ضغط خفيف.",
        crossword: "التفكير اللفظي والبحث عن التعريفات وحل القيود.",
        sudoku: "الاستنتاج المنطقي والمسح البصري والصبر مع قيد واحد.",
        memory: "الذاكرة قصيرة المدى والانتباه والتجميع.",
        sort: "المقارنة والترتيب والاحتفاظ بعدة عناصر في الذهن معًا.",
        math: "الحساب الذهني والتقدير والعمل من النهاية إلى البداية.",
        puzzle: "التفكير المكاني والتخطيط والحل الهادئ خطوة بخطوة."
      }
    },
    he: {
      catLede: {
        brain: "המדף הרחב ביותר בארקייד: היסק, פיצוח צפנים, זיכרון, חשבון בראש וחידות שמענישות לחיצה חפוזה.",
        daily: "לוח אחד ביום, נבנה מהתאריך כדי שכולם יקבלו את אותה חידה — חמישה יומיים בסך הכול.",
        number: "מיזוג אריחים, חזרה על ספרות, ספרינטי חשבון ולוחות הסודוקו שיש להם גם מדף משל עצמם.",
        word: "שבעה משחקי אותיות באוצר מילים יומיומי: משחק היסק בן חמש אותיות, מרדפי אנגרמות ומילות הצלב הדברניות יותר.",
        crossword: "חשיבת תשבצים בלי מנוי: ריבועי מילים, ספרינטי רמזים, סט יומי ורשת עם אותיות מוחלפות.",
        sudoku: "חמישה לוחות סודוקו בארבעה גדלים, מהרשת המלאה תשע על תשע ועד לוח כיס לאגודל.",
        memory: "חמישה דרכים לגעת בגבול הזיכרון לטווח קצר: קלפים, לוחות, רשתות, ספרות וצורות.",
        sort: "מיון, סידור לתאים, תיקון ומרוץ נגד השעון — עם מספרים, שברים ותאריכים.",
        math: "שישה משחקים שבהם החשבון הוא המשחק: ספרינטים, ערכים חסרים, בניית משוואות ומיון שברים.",
        puzzle: "אריחים מחליקים שתמיד ניתנים לפתרון, נונוגרם הגיוני וריבועי מילים — איטיים יותר, ולכן טובים יותר."
      },
      catOverview: {
        brain: "רוב המשחקים דורשים את שלושת ההרגלים האלה: להסתכל על הלוח לפני שמזיזים, לרשום מה כבר שללת, ולעצור כשהמהלך הבא יהיה ניחוש.",
        daily: "חידה יומית היא סופית: אי אפשר לחזור עליה לשיפור הניקוד, כך שהדבר היחיד לשמור עליו הוא הרצף.",
        number: "הכול נוצר ולא מצויר ביד: הלוח שונה בכל פעם והחשבון נשאר גלוי.",
        word: "אוצר המילים יומיומי בכוונה. הפסד בגלל מילה נדירה לא מלמד דבר; הפסד בגלל מילה נפוצה מלמד להסתכל שוב.",
        crossword: "תשבץ הוא שתי חידות בבת אחת: הרמז הוא הגדרה בלי דקדוק, והרשת היא מערכת אילוצים.",
        sudoku: "כל לוח נוצר ונבדק לפתרון יחיד. שני פתרונות פירושם שהחידה שבורה, כמה מסודרת שתיראה הרשת.",
        memory: "כל החמישה הם אותו ניסוי בלבוש אחר: מראים משהו, מסירים אותו, ואתם משחזרים.",
        sort: "להשוות שני פריטים זה קל; להחזיק את כל הקבוצה בראש בזמן שמחפשים מקום לאמצעי זה לא.",
        math: "אף אחד מהם לא צריך מחשבון. מדובר בהחלטות הקטנות: איזו פעולה לבחור והאם הערך סביר.",
        puzzle: "כל לוח נוצר עם אחריות — עורבב במהלכים חוקיים או נבדק לפני שהוצג."
      },
      catTrains: {
        brain: "היסק, זיכרון עבודה והמשמעת לבדוק מהלך לפני ביצועו.",
        daily: "התמדה, ריכוז קצר וההרגל לסיים את מה שהתחלת.",
        number: "חוש מספרים, חשבון מהיר ותכנון כמה מהלכים קדימה.",
        word: "אוצר מילים, איות וזיהוי דפוסים תחת לחץ קל.",
        crossword: "חשיבה מילולית, חיפוש הגדרות ופתרון אילוצים.",
        sudoku: "היסק לוגי, סריקה וסבלנות עם אילוץ אחד.",
        memory: "זיכרון לטווח קצר, קשב וקיבוץ.",
        sort: "השוואה, סידור והחזקת כמה פריטים בראש בו-זמנית.",
        math: "חשבון בראש, אומדן ועבודה מהסוף להתחלה.",
        puzzle: "חשיבה מרחבית, תכנון ופתרון רגוע, צעד אחר צעד."
      }
    },
    fa: {
      catLede: {
        brain: "پهن‌ترین قفسهٔ آرکید: استنتاج، رمزگشایی، حافظه، حساب ذهنی و معماهایی که کلیک شتاب‌زده را جریمه می‌کنند.",
        daily: "هر روز یک صفحه، ساخته‌شده از تاریخ تا همهٔ بازیکنان یک معما بگیرند — پنج بازی روزانه.",
        number: "ترکیب کاشی‌ها، تکرار رقم‌ها، مسابقه‌های حساب و صفحه‌های سودوکو که قفسهٔ خودشان را هم دارند.",
        word: "هفت بازی حروف با واژگان روزمره: یک بازی استنتاج پنج‌حرفی، شکار آنگرام و جدول‌های پرحرف‌تر.",
        crossword: "تفکر جدول کلمات بدون اشتراک: مربع‌های واژه، مسابقهٔ سرنخ، مجموعهٔ روزانه و شبکه‌ای با حروف جابه‌جا.",
        sudoku: "پنج صفحهٔ سودوکو در چهار اندازه، از شبکهٔ کامل نه در نه تا صفحهٔ جیبی برای شست.",
        memory: "پنج راه برای رسیدن به مرز حافظهٔ کوتاه‌مدت: کارت، پد، شبکه، رقم و شکل.",
        sort: "مرتب‌سازی، دسته‌بندی، تعمیر و مسابقه با زمان — با عدد، کسر و تاریخ.",
        math: "شش بازی که در آن‌ها حساب خودِ بازی است: مسابقه، مقدارهای گم‌شده، ساخت معادله و مرتب‌سازی کسر.",
        puzzle: "کاشی‌های لغزان که همیشه حل‌شدنی‌اند، نانوگرام منطقی و مربع‌های واژه — کندتر و همین‌جا بهتر."
      },
      catOverview: {
        brain: "بیشترشان سه عادت یکسان می‌خواهند: پیش از حرکت به صفحه نگاه کن، آنچه را حذف کرده‌ای یادداشت کن و وقتی حرکت بعدی حدس است بایست.",
        daily: "معمای روزانه محدود است: نمی‌توانی برای امتیاز بهتر تکرارش کنی، پس تنها چیزی که حفظ می‌کنی زنجیره است.",
        number: "همه‌چیز تولید می‌شود، نه دست‌نویس: صفحه هر بار متفاوت است و حساب همیشه دیده می‌شود.",
        word: "واژگان عمداً روزمره‌اند. باختن به خاطر یک واژهٔ نادر چیزی یاد نمی‌دهد؛ باختن به خاطر یک واژهٔ رایج یاد می‌دهد دوباره نگاه کنی.",
        crossword: "جدول کلمات دو معما در یک‌زمان است: سرنخ تعریفی بدون دستور زبان است و شبکه سیستمی از محدودیت‌ها.",
        sudoku: "هر صفحه تولید و برای یک راه‌حل یکتا بررسی می‌شود. دو راه‌حل یعنی معما خراب است، هرقدر شبکه مرتب به نظر برسد.",
        memory: "هر پنج، همان آزمایش با لباس مختلف‌اند: چیزی نشان داده می‌شود، برداشته می‌شود و باید بازتولیدش کنی.",
        sort: "مقایسهٔ دو چیز آسان است؛ نگه‌داشتن کل مجموعه در ذهن وقتی جای وسطی را انتخاب می‌کنی نه.",
        math: "هیچ‌کدام ماشین‌حساب نمی‌خواهند. تصمیم‌های کوچک مهم‌اند: کدام عمل و آیا مقدار باورپذیر است.",
        puzzle: "هر صفحه با ضمانت ساخته می‌شود — با حرکت‌های مجاز به‌هم‌ریخته یا پیش از نمایش بررسی می‌شود."
      },
      catTrains: {
        brain: "استنتاج، حافظهٔ کاری و نظم بررسی حرکت پیش از انجام آن.",
        daily: "پیوستگی، تمرکز کوتاه و عادت تمام‌کردن کاری که شروع کرده‌ای.",
        number: "حس عدد، حساب سریع و برنامه‌ریزی چند حرکت جلوتر.",
        word: "واژگان، املا و الگویابی زیر فشار کم.",
        crossword: "استدلال کلامی، جست‌وجوی تعریف و حل محدودیت.",
        sudoku: "استنتاج منطقی، اسکن و صبر با یک محدودیت.",
        memory: "حافظهٔ کوتاه‌مدت، توجه و دسته‌بندی.",
        sort: "مقایسه، ترتیب و نگه‌داشتن چند مورد هم‌زمان در ذهن.",
        math: "حساب ذهنی، تخمین و کار از انتها به ابتدا.",
        puzzle: "تفکر فضایی، برنامه‌ریزی و حل آرام و قدم‌به‌قدم."
      }
    }
  });
})();
