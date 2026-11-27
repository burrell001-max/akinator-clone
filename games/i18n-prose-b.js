/* Arcade editorial prose, part 2: es, fr, it, nl, pl, ru. */
(function () {
  "use strict";
  var PARTS = window.MGI18N_PROSE_PARTS = window.MGI18N_PROSE_PARTS || [];
  PARTS.push({
    es: {
      catLede: {
        brain: "La estantería más amplia del arcade: deducción, descifrar códigos, memoria, cálculo mental y puzles que castigan un clic apresurado.",
        daily: "Un tablero al día, generado a partir de la fecha, para que todos tengan el mismo puzle: cinco diarios en total.",
        number: "Fusionar fichas, repetir dígitos, sprints de cálculo y los tableros de Sudoku que también tienen su propia estantería.",
        word: "Siete juegos de letras con vocabulario cotidiano: un juego de deducción de cinco letras, cazas de anagramas y los crucigramas más verbosos.",
        crossword: "Pensamiento de crucigrama sin suscripción: cuadrados de palabras, sprints de pistas, un set diario y una cuadrícula con letras cambiadas.",
        sudoku: "Cinco tableros de Sudoku en cuatro tamaños, desde el nueve por nueve completo hasta un tablero de bolsillo para el pulgar.",
        memory: "Cinco formas de encontrar el límite de la memoria a corto plazo: cartas, pads, cuadrículas, dígitos y formas.",
        sort: "Ordenar, encajar, reparar y contra el reloj, con números, fracciones y fechas históricas.",
        math: "Seis juegos en los que la aritmética es el juego: sprints, valores que faltan, ecuaciones y ordenar fracciones.",
        puzzle: "Fichas deslizantes siempre resolubles, un nonograma de lógica y cuadrados de palabras: más lentos, y mejores por ello."
      },
      catOverview: {
        brain: "La mayoría pide los mismos tres hábitos: mirar el tablero antes de actuar, anotar lo que ya has descartado y parar cuando el siguiente movimiento sería una conjetura.",
        daily: "Un puzle diario es finito: no puedes repetirlo para mejorar la puntuación, así que lo único que proteges es la racha.",
        number: "Todo se genera al vuelo, no está dibujado a mano: el tablero cambia cada vez y la cuenta queda a la vista.",
        word: "El vocabulario es cotidiano a propósito. Perder por una palabra rara no enseña nada; perder por una palabra común te enseña a mirar otra vez.",
        crossword: "Un crucigrama son dos puzles a la vez: la pista es una definición sin gramática y la cuadrícula es un sistema de restricciones.",
        sudoku: "Cada tablero se genera y se comprueba para tener solución única. Dos soluciones significan que el puzle está roto, por ordenada que parezca la cuadrícula.",
        memory: "Los cinco son el mismo experimento con otra ropa: se muestra algo, se retira y lo reproduces.",
        sort: "Comparar dos elementos es fácil; sostener todo el conjunto en la cabeza mientras decides dónde va el del medio, no.",
        math: "Ninguno necesita calculadora. Van de las pequeñas decisiones: qué operación usar y si el valor es plausible.",
        puzzle: "Cada tablero se genera con garantía: barajado con movimientos legales o comprobado antes de mostrarse."
      },
      catTrains: {
        brain: "Deducción, memoria de trabajo y la disciplina de comprobar un movimiento antes de hacerlo.",
        daily: "Constancia, concentración breve y el hábito de terminar lo que empiezas.",
        number: "Sentido numérico, cálculo rápido y planificar unas jugadas.",
        word: "Vocabulario, ortografía y reconocimiento de patrones con algo de presión.",
        crossword: "Razonamiento verbal, búsqueda de definiciones y resolución de restricciones.",
        sudoku: "Deducción lógica, barrido visual y paciencia con una sola regla.",
        memory: "Memoria a corto plazo, atención y agrupación.",
        sort: "Comparación, orden y mantener varios elementos en la cabeza a la vez.",
        math: "Cálculo mental, estimación y trabajar hacia atrás.",
        puzzle: "Razonamiento espacial, planificación y resolución calmada paso a paso."
      }
    },
    fr: {
      catLede: {
        brain: "Le rayon le plus large de l'arcade : déduction, décryptage, mémoire, calcul mental et puzzles qui punissent un clic trop rapide.",
        daily: "Un plateau par jour, généré à partir de la date, pour que tout le monde ait le même puzzle — cinq quotidiens au total.",
        number: "Fusionner des tuiles, répéter des chiffres, sprints de calcul et les grilles de Sudoku qui ont aussi leur propre rayon.",
        word: "Sept jeux de lettres au vocabulaire courant : un jeu de déduction en cinq lettres, des chasses aux anagrammes et les mots croisés les plus bavards.",
        crossword: "L'esprit des mots croisés sans abonnement : carrés de mots, sprints d'indices, une série quotidienne et une grille aux lettres échangées.",
        sudoku: "Cinq grilles de Sudoku en quatre tailles, de la grille neuf sur neuf complète à une grille de poche pensée pour le pouce.",
        memory: "Cinq façons de toucher la limite de la mémoire à court terme : cartes, pads, grilles, chiffres et formes.",
        sort: "Trier, ranger, réparer et contre la montre, avec des nombres, des fractions et des dates.",
        math: "Six jeux où le calcul est le jeu : sprints, valeurs manquantes, équations à construire et fractions à classer.",
        puzzle: "Des tuiles coulissantes toujours solubles, un nonogramme logique et des carrés de mots — plus lents, et meilleurs pour ça."
      },
      catOverview: {
        brain: "La plupart demandent les trois mêmes habitudes : observer le plateau avant d'agir, noter ce qu'on a éliminé et s'arrêter quand le prochain coup serait une supposition.",
        daily: "Un puzzle quotidien est fini : impossible de le farmer ou de le rejouer pour un meilleur score, la seule chose à protéger est la série.",
        number: "Tout est généré, pas dessiné à la main : le plateau change à chaque fois et le calcul reste visible.",
        word: "Le vocabulaire est volontairement courant. Perdre à cause d'un mot rare n'apprend rien ; perdre à cause d'un mot courant apprend à regarder encore.",
        crossword: "Un mots croisés, c'est deux puzzles à la fois : l'indice est une définition sans grammaire, la grille un système de contraintes.",
        sudoku: "Chaque grille est générée et vérifiée pour n'avoir qu'une solution. Deux solutions signifient un puzzle cassé, si propre soit la grille.",
        memory: "Les cinq sont la même expérience autrement habillée : on montre, on retire, on reproduit.",
        sort: "Comparer deux éléments est facile ; garder tout l'ensemble en tête pour placer celui du milieu l'est moins.",
        math: "Aucun n'a besoin de calculatrice. Tout est dans les petites décisions : quelle opération choisir, et la valeur est-elle plausible ?",
        puzzle: "Chaque plateau est généré avec une garantie : mélangé par des coups légaux ou vérifié avant d'être montré."
      },
      catTrains: {
        brain: "Déduction, mémoire de travail et la discipline de vérifier un coup avant de le jouer.",
        daily: "Régularité, concentration courte et l'habitude de finir ce qu'on commence.",
        number: "Sens des nombres, calcul rapide et anticipation de quelques coups.",
        word: "Vocabulaire, orthographe et repérage de motifs sous une légère pression.",
        crossword: "Raisonnement verbal, recherche de définitions et résolution de contraintes.",
        sudoku: "Déduction logique, balayage et patience avec une seule contrainte.",
        memory: "Mémoire à court terme, attention et regroupement.",
        sort: "Comparaison, ordre et garder plusieurs éléments en tête en même temps.",
        math: "Calcul mental, estimation et travail à rebours.",
        puzzle: "Raisonnement spatial, planification et résolution calme, étape par étape."
      }
    },
    it: {
      catLede: {
        brain: "Lo scaffale più ampio dell'arcade: deduzione, decifrare codici, memoria, calcolo mentale e puzzle che puniscono un clic affrettato.",
        daily: "Una scacchiera al giorno, generata dalla data, così tutti hanno lo stesso puzzle: cinque quotidiani in tutto.",
        number: "Unire tessere, ripetere cifre, sprint di calcolo e le scacchiere di Sudoku che hanno anche uno scaffale proprio.",
        word: "Sette giochi di lettere con un vocabolario quotidiano: un gioco di deduzione da cinque lettere, cacce agli anagrammi e le parole crociate più verbose.",
        crossword: "Pensiero da parole crociate senza abbonamento: quadrati di parole, sprint di indizi, un set giornaliero e una griglia con lettere scambiate.",
        sudoku: "Cinque scacchiere di Sudoku in quattro misure, dal nove per nove completo alla scacchiera tascabile per il pollice.",
        memory: "Cinque modi per toccare il limite della memoria a breve termine: carte, pad, griglie, cifre e forme.",
        sort: "Ordinare, incasellare, riparare e contro il tempo, con numeri, frazioni e date storiche.",
        math: "Sei giochi in cui l'aritmetica è il gioco: sprint, valori mancanti, equazioni da costruire e frazioni da ordinare.",
        puzzle: "Tessere scorrevoli sempre risolvibili, un nonogramma logico e quadrati di parole: più lenti, e migliori per questo."
      },
      catOverview: {
        brain: "La maggior parte chiede le stesse tre abitudini: guardare la scacchiera prima di agire, annotare ciò che hai escluso e fermarti quando la prossima mossa sarebbe un'ipotesi.",
        daily: "Un puzzle giornaliero è finito: non puoi ripeterlo per un punteggio migliore, quindi l'unica cosa da proteggere è la serie.",
        number: "Tutto è generato, non disegnato a mano: la scacchiera cambia ogni volta e il calcolo resta visibile.",
        word: "Il vocabolario è quotidiano di proposito. Perdere per una parola rara non insegna nulla; perdere per una parola comune insegna a guardare meglio.",
        crossword: "Le parole crociate sono due puzzle insieme: l'indizio è una definizione senza grammatica, la griglia un sistema di vincoli.",
        sudoku: "Ogni scacchiera è generata e verificata per avere una soluzione unica. Due soluzioni significano un puzzle rotto, per ordinata che sembri la griglia.",
        memory: "Tutti e cinque sono lo stesso esperimento con vestiti diversi: qualcosa viene mostrato, tolto e riprodotto.",
        sort: "Confrontare due elementi è facile; tenere l'intero insieme in testa mentre decidi dove va quello di mezzo no.",
        math: "Nessuno ha bisogno di una calcolatrice. Contano le piccole decisioni: quale operazione usare e se il valore è plausibile.",
        puzzle: "Ogni scacchiera è generata con una garanzia: mescolata con mosse legali o controllata prima di apparire."
      },
      catTrains: {
        brain: "Deduzione, memoria di lavoro e la disciplina di controllare una mossa prima di farla.",
        daily: "Costanza, concentrazione breve e l'abitudine di finire ciò che inizi.",
        number: "Senso del numero, calcolo rapido e pianificazione di qualche mossa.",
        word: "Vocabolario, ortografia e riconoscimento di schemi con un po' di pressione.",
        crossword: "Ragionamento verbale, caccia alle definizioni e soluzione di vincoli.",
        sudoku: "Deduzione logica, scansione e pazienza con un solo vincolo.",
        memory: "Memoria a breve termine, attenzione e raggruppamento.",
        sort: "Confronto, ordinamento e tenere più elementi in mente insieme.",
        math: "Calcolo mentale, stima e lavorare all'indietro.",
        puzzle: "Ragionamento spaziale, pianificazione e soluzione calma, passo dopo passo."
      }
    },
    nl: {
      catLede: {
        brain: "Het breedste schap in de arcade: deductie, codes kraken, geheugen, hoofdrekenen en puzzels die een haastige klik bestraffen.",
        daily: "Eén bord per dag, gemaakt uit de datum, zodat iedereen dezelfde puzzel krijgt — vijf dagelijkse puzzels in totaal.",
        number: "Tegels samenvoegen, cijfers nazingen, rekensprints en de Sudokuborden die ook een eigen schap hebben.",
        word: "Zeven letterspellen met alledaagse woorden: een deductiespel van vijf letters, anagramjachten en de woordrijkere kruiswoordraadsels.",
        crossword: "Kruiswoorddenken zonder abonnement: woordvierkanten, hintsprints, een dagelijkse set en een raster met verwisselde letters.",
        sudoku: "Vijf Sudokuborden in vier maten, van het volledige negen-bij-negen tot een zakbord voor je duim.",
        memory: "Vijf manieren om de rand van je kortetermijngeheugen te vinden: kaarten, pads, rasters, cijfers en vormen.",
        sort: "Ordenen, in bakken stoppen, repareren en tegen de klok, met getallen, breuken en jaartallen.",
        math: "Zes spellen waarin rekenen het spel is: sprints, ontbrekende waarden, vergelijkingen bouwen en breuken rangschikken.",
        puzzle: "Schuiftegels die altijd oplosbaar zijn, een logische nonogram en woordvierkanten — langzamer, en daar beter door."
      },
      catOverview: {
        brain: "De meeste vragen dezelfde drie gewoonten: kijk eerst naar het bord, noteer wat je al hebt uitgesloten en stop wanneer de volgende zet giswerk zou zijn.",
        daily: "Een dagelijkse puzzel is eindig: je kunt hem niet grinden of opnieuw spelen voor een betere score, dus alleen de reeks is te beschermen.",
        number: "Alles wordt ter plekke gemaakt, niet met de hand getekend: het bord is elke keer anders en de som blijft zichtbaar.",
        word: "De woordenschat is bewust alledaags. Verliezen door een zeldzaam woord leert niets; verliezen door een gewoon woord leert je beter kijken.",
        crossword: "Een kruiswoordraadsel is twee puzzels tegelijk: de hint is een definitie zonder grammatica, het raster een systeem van beperkingen.",
        sudoku: "Elk bord wordt gemaakt en gecontroleerd op één oplossing. Twee oplossingen betekent een kapotte puzzel, hoe net het raster er ook uitziet.",
        memory: "Alle vijf zijn hetzelfde experiment in andere kleding: iets wordt getoond, weggehaald en nagedaan.",
        sort: "Twee dingen vergelijken is makkelijk; de hele set in je hoofd houden terwijl je bepaalt waar het middelste heen gaat niet.",
        math: "Geen van deze heeft een rekenmachine nodig. Het gaat om de kleine keuzes: welke bewerking, en is de waarde aannemelijk?",
        puzzle: "Elk bord wordt met een garantie gemaakt: geschud met geldige zetten of gecontroleerd voordat het verschijnt."
      },
      catTrains: {
        brain: "Deductie, werkgeheugen en de discipline om een zet te controleren voordat je hem doet.",
        daily: "Volhouden, korte focus en de gewoonte af te maken waar je aan begint.",
        number: "Getalgevoel, snel rekenen en een paar zetten vooruit plannen.",
        word: "Woordenschat, spelling en patronen herkennen onder lichte druk.",
        crossword: "Verbaal redeneren, definities zoeken en beperkingen oplossen.",
        sudoku: "Logisch redeneren, scannen en geduld met één beperking.",
        memory: "Kortetermijngeheugen, aandacht en chunking.",
        sort: "Vergelijken, ordenen en meerdere dingen tegelijk in je hoofd houden.",
        math: "Hoofdrekenen, schatten en terugwerken.",
        puzzle: "Ruimtelijk denken, plannen en rustig stap voor stap oplossen."
      }
    },
    pl: {
      catLede: {
        brain: "Najszersza półka w arcade: dedukcja, łamanie kodów, pamięć, liczenie w głowie i łamigłówki karzące pośpiech.",
        daily: "Jedna plansza dziennie, generowana z daty, więc wszyscy dostają tę samą łamigłówkę — pięć dziennych gier.",
        number: "Łączenie kafelków, powtarzanie cyfr, sprinty liczenia i plansze Sudoku, które mają też własną półkę.",
        word: "Siedem gier literowych z codziennym słownictwem: gra dedukcyjna na pięć liter, polowania na anagramy i bardziej gadatliwe krzyżówki.",
        crossword: "Myślenie krzyżówkowe bez abonamentu: kwadraty słów, sprinty haseł, zestaw dzienny i siatka z zamienionymi literami.",
        sudoku: "Pięć plansz Sudoku w czterech rozmiarach, od pełnej dziewięć na dziewięć po kieszonkową dla kciuka.",
        memory: "Pięć sposobów na dotknięcie granicy pamięci krótkotrwałej: karty, pady, siatki, cyfry i kształty.",
        sort: "Porządkowanie, sortowanie, naprawianie i na czas — z liczbami, ułamkami i datami historycznymi.",
        math: "Sześć gier, w których arytmetyka jest grą: sprinty, brakujące wartości, układanie równań i porządkowanie ułamków.",
        puzzle: "Kafelki przesuwane, zawsze rozwiązywalne, logiczny nonogram i kwadraty słów — wolniejsze i lepsze właśnie dlatego."
      },
      catOverview: {
        brain: "Większość wymaga tych samych trzech nawyków: najpierw spojrzeć na planszę, notować, co już wykluczyłeś, i przestać, gdy następny ruch byłby zgadywaniem.",
        daily: "Dzienna łamigłówka jest skończona: nie da się jej grindować ani powtarzać dla lepszego wyniku, więc chronisz tylko serię.",
        number: "Wszystko jest generowane, nie rysowane ręcznie: plansza jest za każdym razem inna, a obliczenia zostają widoczne.",
        word: "Słownictwo jest celowo codzienne. Przegrana przez rzadkie słowo niczego nie uczy; przegrana przez zwykłe słowo uczy patrzeć jeszcze raz.",
        crossword: "Krzyżówka to dwie łamigłówki naraz: hasło to definicja bez gramatyki, a siatka to system ograniczeń.",
        sudoku: "Każda plansza jest generowana i sprawdzana pod kątem jednego rozwiązania. Dwa rozwiązania oznaczają zepsutą łamigłówkę, choćby siatka wyglądała schludnie.",
        memory: "Wszystkie pięć to ten sam eksperyment w innym stroju: coś pokazano, zabrano i trzeba odtworzyć.",
        sort: "Porównanie dwóch rzeczy jest łatwe; trzymanie w głowie całego zbioru, gdy szukasz miejsca dla środkowej, już nie.",
        math: "Żadna nie potrzebuje kalkulatora. Chodzi o małe decyzje: jaką operację wybrać i czy wartość jest sensowna.",
        puzzle: "Każda plansza jest generowana z gwarancją — mieszana dozwolonymi ruchami albo sprawdzana przed pokazaniem."
      },
      catTrains: {
        brain: "Dedukcja, pamięć robocza i nawyk sprawdzania ruchu przed wykonaniem.",
        daily: "Regularność, krótka koncentracja i nawyk kończenia zaczętego.",
        number: "Wyczucie liczb, szybkie liczenie i planowanie kilku ruchów naprzód.",
        word: "Słownictwo, ortografia i dostrzeganie wzorców pod lekką presją.",
        crossword: "Rozumowanie językowe, szukanie definicji i rozwiązywanie ograniczeń.",
        sudoku: "Logiczna dedukcja, skanowanie i cierpliwość do jednego warunku.",
        memory: "Pamięć krótkotrwała, uwaga i grupowanie.",
        sort: "Porównywanie, porządkowanie i trzymanie kilku rzeczy naraz w głowie.",
        math: "Liczenie w pamięci, szacowanie i cofanie się od wyniku.",
        puzzle: "Wyobraźnia przestrzenna, planowanie i spokojne rozwiązywanie krok po kroku."
      }
    },
    ru: {
      catLede: {
        brain: "Самая широкая полка аркады: дедукция, взлом кодов, память, устный счёт и головоломки, наказывающие за спешный клик.",
        daily: "Одна доска в день, собранная из даты, чтобы у всех была одна и та же головоломка — всего пять ежедневных игр.",
        number: "Слияние плиток, повторение цифр, счётные спринты и доски судоку, у которых есть и своя полка.",
        word: "Семь игр со словами на каждый день: дедукция из пяти букв, охота за анаграммами и более «словесные» кроссворды.",
        crossword: "Кроссвордное мышление без подписки: словесные квадраты, спринты подсказок, ежедневный набор и сетка с переставленными буквами.",
        sudoku: "Пять досок судоку четырёх размеров — от полной девять на девять до карманной, под большой палец.",
        memory: "Пять способов добраться до предела кратковременной памяти: карты, панели, сетки, цифры и фигуры.",
        sort: "Сортировка, раскладка по ячейкам, починка и гонка со временем — с числами, дробями и датами.",
        math: "Шесть игр, где арифметика и есть игра: спринты, пропущенные значения, сборка уравнений и ранжирование дробей.",
        puzzle: "Сдвижные плитки, которые всегда решаемы, логическая нонограмма и словесные квадраты — медленнее и потому лучше."
      },
      catOverview: {
        brain: "Большинство требуют трёх привычек: сначала посмотреть на доску, запоминать, что уже исключено, и останавливаться, когда следующий ход был бы догадкой.",
        daily: "Ежедневная головоломка конечна: её нельзя гриндить или переигрывать ради лучшего счёта, поэтому беречь нужно только серию.",
        number: "Всё здесь генерируется, а не нарисовано вручную: доска каждый раз другая, а вычисление остаётся на виду.",
        word: "Словарь намеренно повседневный. Проигрыш из-за редкого слова ничему не учит; проигрыш из-за обычного учит смотреть ещё раз.",
        crossword: "Кроссворд — это две головоломки сразу: подсказка — определение без грамматики, а сетка — система ограничений.",
        sudoku: "Каждая доска генерируется и проверяется на единственное решение. Два решения — головоломка сломана, как бы аккуратно ни выглядела сетка.",
        memory: "Все пять — один и тот же эксперимент в разной одежде: что-то показывают, убирают, и его нужно воспроизвести.",
        sort: "Сравнить два предмета легко; удержать в голове весь набор, решая, куда поставить средний, — нет.",
        math: "Ни одной не нужен калькулятор. Всё в маленьких решениях: какое действие выбрать и правдоподобно ли значение.",
        puzzle: "Каждая доска генерируется с гарантией — перемешана допустимыми ходами или проверена перед показом."
      },
      catTrains: {
        brain: "Дедукция, рабочая память и привычка проверять ход перед тем, как его сделать.",
        daily: "Постоянство, короткая концентрация и привычка доводить начатое до конца.",
        number: "Чувство числа, быстрый счёт и планирование на несколько ходов вперёд.",
        word: "Словарный запас, орфография и поиск закономерностей под небольшим давлением.",
        crossword: "Словесное рассуждение, поиск определений и решение ограничений.",
        sudoku: "Логическая дедукция, сканирование и терпение с одним ограничением.",
        memory: "Кратковременная память, внимание и группировка.",
        sort: "Сравнение, упорядочивание и удержание нескольких предметов в голове одновременно.",
        math: "Устный счёт, оценка и движение от ответа назад.",
        puzzle: "Пространственное мышление, планирование и спокойное пошаговое решение."
      }
    }
  });
})();
