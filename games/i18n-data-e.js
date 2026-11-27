/* Translated game guides, part one: en, es, fr, de, it, pt, nl, pl, ru.

   Games that share a mechanic share a guide (see MGI18N_GUIDE in
   i18n-slugs.js), so each family below is two short paragraphs: how it
   works, then how it ends and scores. English keeps the long essays on the
   pages themselves; every other language shows this block instead. */
window.MGI18N_DATA_E = {
  guides: {
    en: {
      nonogram: [
        "The numbers beside each row and above each column say how many filled squares that line contains, in order. Click a square to fill it, click again to mark it empty, and satisfy every clue at once.",
        "A line is complete when its blocks match the numbers exactly, including the gaps between them. The puzzle is solved when the whole picture agrees; one grid is published per day and your streak counts consecutive days."
      ],
      merge: [
        "Slide the whole board with the arrow keys or a swipe. Equal tiles that collide merge into one tile of double the value, and a new tile appears after every move.",
        "The board fills up as you go, so keep your largest tile in a corner and avoid scattering mid-sized tiles. The run ends when no move changes the board; reaching 2048 wins, and you can carry on for a bigger tile."
      ],
      anagram: [
        "Each round shows a clue and the letters of its answer, shuffled. Type the word and press enter, or click the letters in order; a wrong guess costs nothing but time.",
        "Correct words score points, and a hint costs some of them. The set ends after ten words and your total is compared with the best stored on this device."
      ],
      wordguess: [
        "Guess the hidden five-letter word in six tries. Type a word and press enter; every letter is then marked green when it is in the right place, amber when it is in the word but elsewhere, and grey when it is not used.",
        "The keyboard shows which letters you have already tried. The round ends when the word is found or the sixth guess is used, and the answer is then revealed."
      ],
      crossword: [
        "Each clue carries its enumeration, such as four letters or two words. Fill the answer and the crossing letters confirm it; the clues and the grid always agree.",
        "Answers are checked against the puzzle's own list, so a word that fits the letters but not the clue is still wrong. Daily sets are the same for everyone and reset at midnight; practice sets do not affect your streak."
      ],
      sudoku: [
        "Fill every empty cell so each row, each column and each box holds the digits one to nine exactly once. Boards run from four-by-four up to the full nine-by-nine; click a cell and type or tap a digit, and use the arrow keys to move.",
        "A repeated digit in a row, column or box turns red as you type and is never part of a correct grid. Check marks entries that disagree with the solution without giving the answer away, and your fastest time and streak are kept in this browser."
      ],
      pairs: [
        "Turn over two cards per move. Matching symbols stay face up, anything else turns back after a moment, and every pair of flips counts as one move.",
        "The board is cleared when all six pairs are found; the timer starts on your first flip. Fewer moves is better, and the best count is stored only in this browser."
      ],
      sequence: [
        "Watch the pads, squares, digits or shapes light up in order, then repeat the same order back. Each round adds one more step to remember.",
        "One wrong entry ends the run, so there is no penalty for taking your time while the sequence plays. Your longest run is kept on this device."
      ],
      sort: [
        "Put the items in the order the round asks for: numbers from smallest to largest, values from several notations into one ladder, or events into the order they happened. Click an item to place it, or click two tiles to swap them.",
        "Each correct placement scores and each swap is counted, so the quickest route to the right order is usually to place the obvious ends first. A wrong placement is rejected with a hint rather than accepted."
      ],
      math: [
        "Answer each question with a whole number and press enter. Every division is exact and every subtraction stays at zero or above, so no answer is ever a fraction.",
        "Correct answers score a point and build a streak; a wrong one breaks the streak and shows the right value. Sixty seconds per round, with your best score kept for each difficulty."
      ],
      slide: [
        "Slide the numbered tiles into the empty space until they run from one at the top left to the last number, with the gap at the end. Every shuffle here is solvable.",
        "The move counter and timer are the score: fewer moves and less time is better. A board is finished when every tile is in order, and your best result is stored on this device."
      ],
      pattern: [
        "Each round gives a short number sequence built from today's date. Work out the rule, type the next term and press enter.",
        "The rule is shown after each answer, so a miss still teaches you the pattern. Five sequences make a set, and finishing a set keeps your daily streak alive."
      ]
    },
    es: {
      sudoku: [
        "Rellena cada casilla vacía para que cada fila, cada columna y cada caja contenga los dígitos del uno al nueve una sola vez. Hay tableros desde cuatro por cuatro hasta nueve por nueve; haz clic en una casilla y escribe o toca un dígito, y usa las flechas para moverte.",
        "Un dígito repetido en una fila, columna o caja se pone en rojo mientras escribes y nunca forma parte de una solución correcta. Comprobar marca las entradas que no coinciden sin desvelar la respuesta, y tu mejor tiempo y tu racha se guardan en este navegador."
      ],
      nonogram: [
        "Los números junto a cada fila y sobre cada columna indican cuántas casillas llenas tiene esa línea, en orden. Haz clic para llenar, vuelve a hacer clic para marcarla vacía y cumple todas las pistas a la vez.",
        "Una línea está resuelta cuando sus bloques coinciden exactamente con los números, incluidos los huecos. El puzle termina cuando toda la imagen encaja; se publica uno al día y la racha cuenta los días seguidos."
      ],
      merge: [
        "Desliza todo el tablero con las flechas o con el dedo. Las fichas iguales que chocan se fusionan en una de valor doble y después de cada movimiento aparece una ficha nueva.",
        "El tablero se llena, así que mantén la ficha más alta en una esquina y no disperses las medianas. La partida acaba cuando ningún movimiento cambia el tablero; llegar a 2048 es la victoria y puedes seguir para lograr una mayor."
      ],
      anagram: [
        "Cada ronda muestra una pista y las letras de su respuesta, desordenadas. Escribe la palabra y pulsa enter, o haz clic en las letras en orden; fallar solo cuesta tiempo.",
        "Las palabras correctas dan puntos y una pista resta algunos. La serie termina tras diez palabras y tu total se compara con el mejor guardado en este dispositivo."
      ],
      wordguess: [
        "Adivina la palabra oculta de cinco letras en seis intentos. Escribe una palabra y pulsa enter; cada letra se marca en verde si está en su sitio, en ámbar si está en la palabra pero en otro lugar y en gris si no aparece.",
        "El teclado muestra las letras que ya has probado. La ronda acaba al encontrar la palabra o al gastar el sexto intento, y entonces se revela la respuesta."
      ],
      crossword: [
        "Cada pista indica su longitud, por ejemplo cuatro letras o dos palabras. Escribe la respuesta y las letras que se cruzan la confirman; las pistas y la cuadrícula siempre concuerdan.",
        "Las respuestas se comprueban con la lista del propio puzle, así que una palabra que encaja en las letras pero no en la pista sigue siendo incorrecta. Los sets diarios son iguales para todos y cambian a medianoche; los de práctica no afectan a tu racha."
      ],
      pairs: [
        "Levanta dos cartas por movimiento. Los símbolos iguales se quedan boca arriba, los demás se giran de nuevo al momento y cada pareja de giros cuenta como un movimiento.",
        "El tablero se despeja al encontrar las seis parejas; el reloj arranca con tu primer giro. Menos movimientos es mejor y el récord se guarda solo en este navegador."
      ],
      sequence: [
        "Observa cómo se iluminan los botones, casillas, dígitos o figuras en orden y repite ese mismo orden. Cada ronda añade un paso más que recordar.",
        "Un solo fallo termina la partida, así que no hay penalización por tomarte tu tiempo mientras se reproduce la secuencia. Tu mejor racha se guarda en este dispositivo."
      ],
      sort: [
        "Coloca los elementos en el orden que pide la ronda: números de menor a mayor, valores en distintas notaciones en una misma escala o acontecimientos en el orden en que ocurrieron. Haz clic en un elemento para colocarlo o en dos fichas para cambiarlas.",
        "Cada colocación correcta suma y cada cambio se cuenta, así que lo más rápido suele ser fijar primero los extremos evidentes. Una colocación errónea se rechaza con una pista en lugar de aceptarse."
      ],
      math: [
        "Responde a cada pregunta con un número entero y pulsa enter. Todas las divisiones son exactas y las restas nunca bajan de cero, así que ninguna respuesta es una fracción.",
        "Cada acierto suma un punto y alarga la racha; un fallo la rompe y muestra el valor correcto. Sesenta segundos por ronda y tu mejor marca se guarda para cada dificultad."
      ],
      slide: [
        "Desliza las fichas numeradas hacia el hueco hasta que vayan del uno arriba a la izquierda al último número, con el hueco al final. Todos los desórdenes aquí tienen solución.",
        "El contador de movimientos y el reloj son la puntuación: menos movimientos y menos tiempo es mejor. El tablero se termina cuando cada ficha está en su sitio y tu mejor resultado se guarda en este dispositivo."
      ],
      pattern: [
        "Cada ronda ofrece una secuencia corta de números construida con la fecha de hoy. Descubre la regla, escribe el término siguiente y pulsa enter.",
        "La regla se muestra después de cada respuesta, así que un fallo también enseña el patrón. Cinco secuencias forman un set y completarlo mantiene viva tu racha diaria."
      ]
    },
    fr: {
      sudoku: [
        "Remplissez chaque case vide pour que chaque ligne, chaque colonne et chaque bloc contienne les chiffres de un à neuf une seule fois. Les grilles vont du quatre sur quatre au neuf sur neuf ; cliquez une case et tapez ou touchez un chiffre, les flèches servent à se déplacer.",
        "Un chiffre répété dans une ligne, une colonne ou un bloc devient rouge pendant la saisie et ne fait jamais partie d'une grille correcte. Vérifier signale les entrées qui contredisent la solution sans la donner, et votre meilleur temps et votre série restent dans ce navigateur."
      ],
      nonogram: [
        "Les nombres à côté de chaque ligne et au-dessus de chaque colonne indiquent, dans l'ordre, combien de cases remplies la ligne contient. Cliquez pour remplir, cliquez encore pour marquer une case vide, et satisfaites tous les indices à la fois.",
        "Une ligne est juste quand ses blocs correspondent exactement aux nombres, espaces compris. Le puzzle est résolu quand l'image entière concorde ; une grille paraît chaque jour et votre série compte les jours consécutifs."
      ],
      merge: [
        "Faites glisser tout le plateau avec les flèches ou le doigt. Les tuiles identiques qui se rencontrent fusionnent en une tuile de valeur double, et une nouvelle tuile apparaît après chaque coup.",
        "Le plateau se remplit, alors gardez votre plus grande tuile dans un coin et évitez d'éparpiller les moyennes. La partie s'arrête quand plus aucun coup ne change le plateau ; atteindre 2048 est la victoire, et vous pouvez continuer pour une tuile plus grande."
      ],
      anagram: [
        "Chaque manche affiche un indice et les lettres de sa réponse, mélangées. Tapez le mot et validez, ou cliquez les lettres dans l'ordre ; une erreur ne coûte que du temps.",
        "Les mots justes rapportent des points et un indice en coûte quelques-uns. La série se termine après dix mots et votre total est comparé au meilleur enregistré sur cet appareil."
      ],
      wordguess: [
        "Devinez le mot caché de cinq lettres en six essais. Tapez un mot et validez ; chaque lettre devient verte si elle est bien placée, ambre si elle est dans le mot ailleurs, et grise si elle n'y est pas.",
        "Le clavier montre les lettres déjà essayées. La manche se termine quand le mot est trouvé ou au sixième essai, et la réponse est alors révélée."
      ],
      crossword: [
        "Chaque indice donne son décompte, par exemple quatre lettres ou deux mots. Écrivez la réponse et les lettres croisées la confirment ; les indices et la grille concordent toujours.",
        "Les réponses sont vérifiées avec la liste du puzzle : un mot qui colle aux lettres mais pas à l'indice reste faux. Les séries du jour sont les mêmes pour tous et changent à minuit ; celles d'entraînement ne touchent pas à votre série."
      ],
      pairs: [
        "Retournez deux cartes par coup. Les symboles identiques restent visibles, les autres se retournent après un instant, et chaque paire de retours compte pour un coup.",
        "Le plateau est vidé quand les six paires sont trouvées ; le chrono démarre au premier retour. Moins de coups vaut mieux, et le record reste dans ce navigateur."
      ],
      sequence: [
        "Regardez les pads, cases, chiffres ou formes s'allumer dans l'ordre, puis répétez ce même ordre. Chaque manche ajoute un pas de plus à retenir.",
        "Une seule erreur termine la partie : rien ne vous pénalise si vous prenez votre temps pendant la séquence. Votre meilleure série est conservée sur cet appareil."
      ],
      sort: [
        "Mettez les éléments dans l'ordre demandé : nombres du plus petit au plus grand, valeurs de plusieurs écritures sur une même échelle, ou événements dans l'ordre chronologique. Cliquez un élément pour le placer, ou deux tuiles pour les échanger.",
        "Chaque placement juste rapporte et chaque échange est compté : le plus rapide est souvent de fixer d'abord les extrémités évidentes. Un placement faux est refusé avec un indice au lieu d'être accepté."
      ],
      math: [
        "Répondez à chaque question par un nombre entier et validez. Toutes les divisions tombent juste et aucune soustraction ne descend sous zéro, donc aucune réponse n'est une fraction.",
        "Une bonne réponse rapporte un point et allonge la série ; une erreur casse la série et affiche la bonne valeur. Soixante secondes par manche, avec votre meilleur score conservé pour chaque difficulté."
      ],
      slide: [
        "Faites glisser les tuiles numérotées dans la case vide jusqu'à ce qu'elles aillent de un en haut à gauche au dernier nombre, la case vide à la fin. Tous les mélanges ici sont solubles.",
        "Le compteur de coups et le chrono font le score : moins de coups et moins de temps, c'est mieux. La grille est finie quand chaque tuile est à sa place, et votre meilleur résultat reste sur cet appareil."
      ],
      pattern: [
        "Chaque manche donne une courte suite de nombres construite à partir de la date du jour. Trouvez la règle, tapez le terme suivant et validez.",
        "La règle s'affiche après chaque réponse, donc une erreur vous apprend quand même la logique. Cinq suites forment une série, et la terminer entretient votre série quotidienne."
      ]
    },
    de: {
      sudoku: [
        "Fülle jede leere Zelle, sodass jede Reihe, jede Spalte und jede Box die Ziffern eins bis neun genau einmal enthält. Die Gitter reichen von vier mal vier bis neun mal neun; klicke eine Zelle an und tippe eine Ziffer, mit den Pfeiltasten bewegst du dich.",
        "Eine doppelte Ziffer in Reihe, Spalte oder Box wird beim Tippen rot und gehört nie zu einer richtigen Lösung. Prüfen markiert Einträge, die nicht zur Lösung passen, ohne sie zu verraten; Bestzeit und Serie bleiben in diesem Browser."
      ],
      nonogram: [
        "Die Zahlen neben jeder Reihe und über jeder Spalte geben der Reihe nach an, wie viele gefüllte Felder die Linie hat. Klicke zum Füllen, klicke erneut für ein leeres Feld und erfülle alle Hinweise gleichzeitig.",
        "Eine Linie stimmt, wenn ihre Blöcke genau zu den Zahlen passen, Lücken eingeschlossen. Gelöst ist das Rätsel, wenn das ganze Bild passt; es erscheint täglich eines und deine Serie zählt aufeinanderfolgende Tage."
      ],
      merge: [
        "Schiebe das ganze Brett mit den Pfeiltasten oder per Wischen. Gleiche Plättchen, die zusammenstoßen, verschmelzen zu einem doppelten Wert, und nach jedem Zug erscheint ein neues Plättchen.",
        "Das Brett füllt sich, also halte das größte Plättchen in einer Ecke und verstreue die mittleren nicht. Der Lauf endet, wenn kein Zug mehr etwas ändert; 2048 gewinnt, und du darfst für ein größeres Plättchen weiterspielen."
      ],
      anagram: [
        "Jede Runde zeigt einen Hinweis und die Buchstaben der Antwort in gemischter Reihenfolge. Tippe das Wort und drücke Enter oder klicke die Buchstaben der Reihe nach; ein Fehler kostet nur Zeit.",
        "Richtige Wörter bringen Punkte, ein Hinweis kostet einige davon. Nach zehn Wörtern endet die Runde, und deine Summe wird mit dem Bestwert auf diesem Gerät verglichen."
      ],
      wordguess: [
        "Errate das versteckte Wort aus fünf Buchstaben in sechs Versuchen. Tippe ein Wort und drücke Enter; jeder Buchstabe wird grün, wenn er richtig sitzt, gelb, wenn er im Wort anderswo vorkommt, und grau, wenn nicht.",
        "Die Tastatur zeigt bereits versuchte Buchstaben. Die Runde endet mit dem Treffer oder nach dem sechsten Versuch, dann wird die Lösung gezeigt."
      ],
      crossword: [
        "Jeder Hinweis nennt seine Länge, etwa vier Buchstaben oder zwei Wörter. Trage die Antwort ein, die Kreuzbuchstaben bestätigen sie; Hinweise und Gitter passen immer zusammen.",
        "Antworten werden gegen die Liste des Rätsels geprüft, ein Wort, das zu den Buchstaben, aber nicht zum Hinweis passt, bleibt falsch. Tagesrätsel sind für alle gleich und wechseln um Mitternacht; Übungsrunden berühren deine Serie nicht."
      ],
      pairs: [
        "Drehe pro Zug zwei Karten um. Gleiche Symbole bleiben offen, alle anderen drehen sich kurz darauf zurück, und jedes Paar Aufdecken zählt als ein Zug.",
        "Das Brett ist leer, wenn alle sechs Paare gefunden sind; die Uhr startet beim ersten Aufdecken. Weniger Züge sind besser, und der Bestwert bleibt nur in diesem Browser."
      ],
      sequence: [
        "Beobachte, wie Pads, Felder, Ziffern oder Formen der Reihe nach aufleuchten, und wiederhole genau diese Reihenfolge. Jede Runde kommt ein Schritt hinzu.",
        "Ein einziger Fehler beendet den Lauf, deshalb kostet Nachdenken während der Sequenz nichts. Deine längste Serie bleibt auf diesem Gerät."
      ],
      sort: [
        "Bringe die Elemente in die verlangte Reihenfolge: Zahlen von klein nach groß, Werte aus mehreren Schreibweisen auf eine Skala oder Ereignisse in zeitlicher Folge. Klicke ein Element zum Einsetzen oder zwei Plättchen zum Tauschen.",
        "Jedes richtige Einsetzen zählt, jeder Tausch wird gezählt; am schnellsten sind meist zuerst die offensichtlichen Enden. Ein falscher Platz wird mit einem Hinweis abgelehnt statt angenommen."
      ],
      math: [
        "Beantworte jede Frage mit einer ganzen Zahl und drücke Enter. Jede Division geht auf, jede Subtraktion bleibt bei null oder darüber, also ist keine Antwort ein Bruch.",
        "Richtige Antworten geben einen Punkt und verlängern die Serie; eine falsche bricht sie und zeigt den richtigen Wert. Sechzig Sekunden pro Runde, der Bestwert bleibt je Schwierigkeit erhalten."
      ],
      slide: [
        "Schiebe die nummerierten Plättchen in die Lücke, bis sie von eins oben links bis zur letzten Zahl laufen und die Lücke am Ende liegt. Jede Mischung hier ist lösbar.",
        "Züge und Zeit bilden den Wert: weniger Züge und weniger Zeit ist besser. Fertig ist das Brett, wenn jedes Plättchen sitzt; dein bestes Ergebnis bleibt auf diesem Gerät."
      ],
      pattern: [
        "Jede Runde zeigt eine kurze Zahlenfolge, die aus dem heutigen Datum entsteht. Finde die Regel, tippe das nächste Glied und drücke Enter.",
        "Die Regel erscheint nach jeder Antwort, ein Fehler bringt dir das Muster also trotzdem näher. Fünf Folgen bilden eine Runde, und eine volle Runde hält deine Tagesserie am Leben."
      ]
    },
    it: {
      sudoku: [
        "Riempi ogni casella vuota in modo che ogni riga, colonna e riquadro contenga le cifre da uno a nove una sola volta. Le griglie vanno dal quattro per quattro al nove per nove; clicca una casella e digita o tocca una cifra, le frecce spostano la selezione.",
        "Una cifra ripetuta in riga, colonna o riquadro diventa rossa mentre digiti e non fa mai parte di una soluzione corretta. Controlla segnala le voci che non tornano senza svelare la risposta; tempo migliore e serie restano in questo browser."
      ],
      nonogram: [
        "I numeri accanto a ogni riga e sopra ogni colonna dicono, in ordine, quante caselle piene contiene la linea. Clicca per riempire, clicca di nuovo per segnare vuoto e soddisfa tutti gli indizi insieme.",
        "Una linea è giusta quando i suoi blocchi corrispondono esattamente ai numeri, spazi compresi. Il puzzle è risolto quando l'immagine intera torna; ne esce uno al giorno e la serie conta i giorni consecutivi."
      ],
      merge: [
        "Fai scorrere tutto il tabellone con le frecce o con il dito. Le tessere uguali che si incontrano si fondono in una di valore doppio e dopo ogni mossa ne compare una nuova.",
        "Il tabellone si riempie, quindi tieni la tessera più alta in un angolo e non sparpagliare quelle medie. La partita finisce quando nessuna mossa cambia il tabellone; arrivare a 2048 è la vittoria e puoi continuare per una tessera più grande."
      ],
      anagram: [
        "Ogni turno mostra un indizio e le lettere della risposta, mescolate. Scrivi la parola e premi invio, oppure clicca le lettere in ordine; sbagliare costa solo tempo.",
        "Le parole giuste danno punti e un suggerimento ne toglie alcuni. La serie finisce dopo dieci parole e il totale si confronta con il migliore salvato su questo dispositivo."
      ],
      wordguess: [
        "Indovina la parola nascosta di cinque lettere in sei tentativi. Scrivi una parola e premi invio; ogni lettera diventa verde se è al posto giusto, gialla se è nella parola altrove e grigia se non c'è.",
        "La tastiera mostra le lettere già provate. Il turno finisce quando trovi la parola o esaurisci il sesto tentativo, e allora la risposta viene rivelata."
      ],
      crossword: [
        "Ogni indizio indica la lunghezza, per esempio quattro lettere o due parole. Scrivi la risposta e le lettere incrociate la confermano; indizi e schema vanno sempre d'accordo.",
        "Le risposte sono verificate con la lista del puzzle, quindi una parola che entra nelle lettere ma non nell'indizio resta sbagliata. I set giornalieri sono uguali per tutti e cambiano a mezzanotte; quelli di pratica non toccano la serie."
      ],
      pairs: [
        "Gira due carte per mossa. I simboli uguali restano scoperti, gli altri si rigirano dopo un attimo e ogni coppia di giri conta come una mossa.",
        "Il tabellone si svuota quando trovi tutte e sei le coppie; il cronometro parte al primo giro. Meno mosse è meglio e il record resta solo in questo browser."
      ],
      sequence: [
        "Guarda i pad, le caselle, le cifre o le forme illuminarsi in ordine, poi ripeti lo stesso ordine. Ogni turno aggiunge un passo da ricordare.",
        "Un solo errore chiude la partita, quindi prenderti il tuo tempo durante la sequenza non costa nulla. La serie più lunga resta su questo dispositivo."
      ],
      sort: [
        "Metti gli elementi nell'ordine richiesto: numeri dal più piccolo al più grande, valori scritti in modi diversi su un'unica scala, o eventi in ordine cronologico. Clicca un elemento per collocarlo o due tessere per scambiarle.",
        "Ogni collocazione giusta segna punti e ogni scambio viene contato, quindi conviene fissare prima gli estremi evidenti. Una collocazione sbagliata viene rifiutata con un indizio invece di essere accettata."
      ],
      math: [
        "Rispondi a ogni domanda con un numero intero e premi invio. Ogni divisione è esatta e ogni sottrazione resta a zero o sopra, quindi nessuna risposta è una frazione.",
        "Le risposte giuste valgono un punto e allungano la serie; una sbagliata la interrompe e mostra il valore corretto. Sessanta secondi per turno, con il miglior punteggio conservato per difficoltà."
      ],
      slide: [
        "Fai scorrere le tessere numerate nello spazio vuoto finché vanno da uno in alto a sinistra all'ultimo numero, con il vuoto alla fine. Ogni mescolamento qui è risolvibile.",
        "Contano mosse e tempo: meno mosse e meno tempo è meglio. Il tabellone è finito quando ogni tessera è al suo posto e il tuo miglior risultato resta su questo dispositivo."
      ],
      pattern: [
        "Ogni turno propone una breve sequenza di numeri costruita con la data di oggi. Trova la regola, scrivi il termine successivo e premi invio.",
        "La regola compare dopo ogni risposta, quindi anche un errore insegna lo schema. Cinque sequenze formano un set e completarlo tiene viva la serie giornaliera."
      ]
    },
    pt: {
      sudoku: [
        "Preenche cada casa vazia para que cada linha, coluna e caixa tenha os dígitos de um a nove uma só vez. Há grelhas de quatro por quatro até nove por nove; clica numa casa e escreve ou toca num dígito, e usa as setas para te moveres.",
        "Um dígito repetido numa linha, coluna ou caixa fica vermelho enquanto escreves e nunca faz parte de uma solução correta. Verificar assinala as entradas que não batem com a solução sem a revelar, e o teu melhor tempo e sequência ficam neste navegador."
      ],
      nonogram: [
        "Os números ao lado de cada linha e por cima de cada coluna dizem, por ordem, quantas casas preenchidas a linha tem. Clica para preencher, clica outra vez para marcar vazio e cumpre todas as pistas ao mesmo tempo.",
        "Uma linha está certa quando os blocos correspondem exatamente aos números, incluindo os espaços. O desafio termina quando a imagem inteira bate certo; há um por dia e a sequência conta dias seguidos."
      ],
      merge: [
        "Arrasta o tabuleiro inteiro com as setas ou com o dedo. As peças iguais que se encontram juntam-se numa peça de valor duplo e aparece uma nova peça após cada jogada.",
        "O tabuleiro enche-se, por isso mantém a peça maior num canto e não espalhes as médias. A partida acaba quando nenhuma jogada muda o tabuleiro; chegar a 2048 é a vitória e podes continuar por uma peça maior."
      ],
      anagram: [
        "Cada ronda mostra uma pista e as letras da resposta, baralhadas. Escreve a palavra e carrega em enter, ou clica as letras por ordem; errar só custa tempo.",
        "As palavras certas dão pontos e uma dica tira alguns. A série termina ao fim de dez palavras e o total é comparado com o melhor guardado neste dispositivo."
      ],
      wordguess: [
        "Descobre a palavra escondida de cinco letras em seis tentativas. Escreve uma palavra e carrega em enter; cada letra fica verde no lugar certo, âmbar se estiver na palavra noutro sítio e cinzenta se não existir.",
        "O teclado mostra as letras já tentadas. A ronda acaba quando acertas ou gastas a sexta tentativa, e a resposta é revelada."
      ],
      crossword: [
        "Cada pista indica o tamanho, por exemplo quatro letras ou duas palavras. Escreve a resposta e as letras cruzadas confirmam-na; as pistas e a grelha concordam sempre.",
        "As respostas são verificadas com a lista do próprio desafio, por isso uma palavra que caiba nas letras mas não na pista continua errada. Os conjuntos diários são iguais para todos e mudam à meia-noite; os de treino não afetam a sequência."
      ],
      pairs: [
        "Vira duas cartas por jogada. Os símbolos iguais ficam à vista, os outros voltam ao fim de um instante e cada par de viragens conta como uma jogada.",
        "A grelha fica limpa quando encontras os seis pares; o cronómetro arranca na primeira viragem. Menos jogadas é melhor e o recorde fica só neste navegador."
      ],
      sequence: [
        "Vê os botões, casas, dígitos ou formas a acender por ordem e repete essa mesma ordem. Cada ronda acrescenta um passo para memorizar.",
        "Um erro termina a partida, por isso pensar durante a sequência não custa nada. A tua melhor sequência fica guardada neste dispositivo."
      ],
      sort: [
        "Põe os elementos na ordem pedida: números do menor para o maior, valores em várias notações numa só escala, ou acontecimentos pela ordem em que ocorreram. Clica num elemento para o colocar ou em duas peças para as trocar.",
        "Cada colocação certa dá pontos e cada troca é contada, por isso o mais rápido é fixar primeiro os extremos óbvios. Uma colocação errada é recusada com uma pista em vez de aceite."
      ],
      math: [
        "Responde a cada pergunta com um número inteiro e carrega em enter. Todas as divisões são exatas e as subtrações nunca descem abaixo de zero, por isso nenhuma resposta é uma fração.",
        "As respostas certas valem um ponto e aumentam a sequência; uma errada quebra-a e mostra o valor certo. Sessenta segundos por ronda, com o melhor resultado guardado por dificuldade."
      ],
      slide: [
        "Desliza as peças numeradas para o espaço vazio até irem de um no canto superior esquerdo até ao último número, com o vazio no fim. Todos os baralhamentos aqui têm solução.",
        "Movimentos e tempo fazem a pontuação: menos de ambos é melhor. A grelha termina quando cada peça está no lugar e o teu melhor resultado fica neste dispositivo."
      ],
      pattern: [
        "Cada ronda dá uma pequena sequência de números feita com a data de hoje. Descobre a regra, escreve o termo seguinte e carrega em enter.",
        "A regra aparece depois de cada resposta, por isso um erro também ensina o padrão. Cinco sequências formam um conjunto e completá-lo mantém a sequência diária viva."
      ]
    },
    nl: {
      sudoku: [
        "Vul elke lege cel zodat elke rij, elke kolom en elk blok de cijfers één tot negen precies één keer bevat. De borden lopen van vier bij vier tot negen bij negen; klik een cel aan en typ een cijfer, met de pijltjes beweeg je.",
        "Een herhaald cijfer in een rij, kolom of blok wordt rood tijdens het typen en hoort nooit bij een goede oplossing. Controleren markeert invoer die niet klopt zonder het antwoord te verklappen; je beste tijd en reeks blijven in deze browser."
      ],
      nonogram: [
        "De getallen naast elke rij en boven elke kolom zeggen op volgorde hoeveel gevulde vakjes die lijn heeft. Klik om te vullen, klik nog eens voor leeg en laat alle aanwijzingen tegelijk kloppen.",
        "Een lijn klopt als de blokken precies bij de getallen passen, inclusief de gaten. De puzzel is opgelost als het hele beeld klopt; er is één raster per dag en je reeks telt opeenvolgende dagen."
      ],
      merge: [
        "Schuif het hele bord met de pijltjes of met een veeg. Gelijke tegels die botsen smelten samen tot één tegel met dubbele waarde en na elke zet verschijnt een nieuwe tegel.",
        "Het bord loopt vol, dus houd je grootste tegel in een hoek en strooi de middelgrote niet rond. De ronde stopt als geen zet nog iets verandert; 2048 is winst en je mag door voor een grotere tegel."
      ],
      anagram: [
        "Elke ronde toont een aanwijzing en de letters van het antwoord, door elkaar. Typ het woord en druk op enter, of klik de letters op volgorde; een fout kost alleen tijd.",
        "Goede woorden leveren punten op en een hint kost er een paar. Na tien woorden stopt de reeks en wordt je totaal met het beste op dit apparaat vergeleken."
      ],
      wordguess: [
        "Raad het verborgen woord van vijf letters in zes pogingen. Typ een woord en druk op enter; elke letter wordt groen op de juiste plek, geel als hij elders in het woord zit en grijs als hij niet voorkomt.",
        "Het toetsenbord toont de letters die je al probeerde. De ronde eindigt bij het juiste woord of na de zesde poging, en dan verschijnt het antwoord."
      ],
      crossword: [
        "Elke aanwijzing noemt de lengte, bijvoorbeeld vier letters of twee woorden. Vul het antwoord in en de kruisletters bevestigen het; aanwijzingen en raster kloppen altijd met elkaar.",
        "Antwoorden worden tegen de lijst van de puzzel gecontroleerd, dus een woord dat in de letters past maar niet bij de aanwijzing, blijft fout. Dagelijkse sets zijn voor iedereen gelijk en wisselen om middernacht; oefensets raken je reeks niet."
      ],
      pairs: [
        "Draai per zet twee kaarten om. Gelijke symbolen blijven open, de rest draait even later terug en elk paar omdraaiingen telt als één zet.",
        "Het bord is leeg als alle zes paren gevonden zijn; de klok start bij je eerste kaart. Minder zetten is beter en het record blijft alleen in deze browser."
      ],
      sequence: [
        "Kijk hoe de pads, vakjes, cijfers of vormen in volgorde oplichten en herhaal diezelfde volgorde. Elke ronde komt er een stap bij.",
        "Eén fout beëindigt de ronde, dus de tijd nemen tijdens de reeks kost niets. Je langste reeks blijft op dit apparaat."
      ],
      sort: [
        "Zet de items in de gevraagde volgorde: getallen van klein naar groot, waarden in verschillende notaties op één ladder, of gebeurtenissen op volgorde van tijd. Klik een item om het te plaatsen of twee tegels om ze te wisselen.",
        "Elke juiste plaatsing levert punten op en elke wissel wordt geteld, dus het snelst zet je eerst de duidelijke uiteinden. Een foute plaatsing wordt met een hint geweigerd in plaats van geaccepteerd."
      ],
      math: [
        "Beantwoord elke vraag met een heel getal en druk op enter. Elke deling komt precies uit en elke aftrekking blijft op of boven nul, dus geen antwoord is een breuk.",
        "Goede antwoorden geven een punt en verlengen de reeks; een fout breekt hem en toont de juiste waarde. Zestig seconden per ronde, met je beste score per moeilijkheid bewaard."
      ],
      slide: [
        "Schuif de genummerde tegels naar het lege vak tot ze van één linksboven tot het laatste nummer lopen, met het gat aan het eind. Elke schudding hier is oplosbaar.",
        "Zetten en tijd vormen de score: minder van beide is beter. Het bord is klaar als elke tegel op zijn plek staat en je beste resultaat blijft op dit apparaat."
      ],
      pattern: [
        "Elke ronde geeft een korte getallenreeks die uit de datum van vandaag komt. Ontdek de regel, typ de volgende term en druk op enter.",
        "De regel verschijnt na elk antwoord, dus een fout leert je het patroon alsnog. Vijf reeksen vormen een set en een set afmaken houdt je dagelijkse reeks in leven."
      ]
    },
    pl: {
      sudoku: [
        "Wypełnij każdą pustą kratkę tak, aby w każdym wierszu, kolumnie i bloku cyfry od jednego do dziewięciu występowały dokładnie raz. Plansze są od cztery na cztery do dziewięć na dziewięć; kliknij kratkę i wpisz cyfrę, a strzałkami się poruszasz.",
        "Powtórzona cyfra w wierszu, kolumnie lub bloku czerwienieje podczas wpisywania i nigdy nie należy do poprawnego rozwiązania. Sprawdź oznacza wpisy niezgodne z rozwiązaniem, nie zdradzając go; najlepszy czas i seria zostają w tej przeglądarce."
      ],
      nonogram: [
        "Liczby obok każdego wiersza i nad każdą kolumną mówią po kolei, ile wypełnionych pól ma ta linia. Kliknij, aby wypełnić, kliknij ponownie, aby oznaczyć puste, i spełnij wszystkie wskazówki naraz.",
        "Linia jest poprawna, gdy jej bloki dokładnie odpowiadają liczbom, wraz z przerwami. Łamigłówka jest rozwiązana, gdy cały obraz się zgadza; jedna plansza dziennie, a seria liczy kolejne dni."
      ],
      merge: [
        "Przesuwaj całą planszę strzałkami lub gestem. Równe kafelki, które się zderzą, łączą się w jeden o podwójnej wartości, a po każdym ruchu pojawia się nowy kafelek.",
        "Plansza się zapełnia, więc trzymaj największy kafelek w rogu i nie rozrzucaj średnich. Gra kończy się, gdy żaden ruch nic nie zmienia; 2048 to zwycięstwo, ale możesz grać dalej o większy kafelek."
      ],
      anagram: [
        "Każda runda pokazuje wskazówkę i przemieszane litery odpowiedzi. Wpisz słowo i naciśnij enter albo klikaj litery po kolei; pomyłka kosztuje tylko czas.",
        "Poprawne słowa dają punkty, a podpowiedź kilka z nich zabiera. Seria kończy się po dziesięciu słowach, a wynik porównujesz z najlepszym zapisanym na tym urządzeniu."
      ],
      wordguess: [
        "Odgadnij ukryte pięcioliterowe słowo w sześciu próbach. Wpisz słowo i naciśnij enter; litera zmienia się na zieloną na właściwym miejscu, na bursztynową, gdy jest w słowie gdzie indziej, i na szarą, gdy jej nie ma.",
        "Klawiatura pokazuje litery już użyte. Runda kończy się po trafieniu lub po szóstej próbie, wtedy odsłania się odpowiedź."
      ],
      crossword: [
        "Każda wskazówka podaje długość, np. cztery litery lub dwa słowa. Wpisz odpowiedź, a krzyżujące się litery ją potwierdzą; wskazówki i siatka zawsze się zgadzają.",
        "Odpowiedzi są sprawdzane z listą łamigłówki, więc słowo pasujące do liter, ale nie do wskazówki, nadal jest błędne. Zestawy dzienne są takie same dla wszystkich i zmieniają się o północy; zestawy ćwiczeniowe nie ruszają serii."
      ],
      pairs: [
        "Odkrywaj dwie karty na ruch. Pasujące symbole zostają odkryte, pozostałe wracają po chwili, a każda para odkryć liczy się jako jeden ruch.",
        "Plansza jest czysta, gdy znajdziesz wszystkie sześć par; zegar startuje przy pierwszym odkryciu. Mniej ruchów jest lepsze, a rekord zostaje tylko w tej przeglądarce."
      ],
      sequence: [
        "Obserwuj, jak pola, kratki, cyfry lub figury zapalają się po kolei, i powtórz tę samą kolejność. Każda runda dodaje jeden krok do zapamiętania.",
        "Jeden błąd kończy grę, więc namysł podczas sekwencji nic nie kosztuje. Najdłuższa seria zostaje na tym urządzeniu."
      ],
      sort: [
        "Ustaw elementy w kolejności wymaganej w rundzie: liczby od najmniejszej do największej, wartości w różnych zapisach na jednej drabinie albo wydarzenia w kolejności chronologicznej. Kliknij element, aby go ustawić, lub dwa kafelki, aby je zamienić.",
        "Każde poprawne ustawienie daje punkty, a każda zamiana jest liczona, więc najszybciej zacząć od oczywistych końców. Błędne ustawienie jest odrzucane z podpowiedzią, a nie przyjmowane."
      ],
      math: [
        "Odpowiedz na każde pytanie liczbą całkowitą i naciśnij enter. Każde dzielenie wychodzi dokładnie, a odejmowanie nie schodzi poniżej zera, więc odpowiedzią nigdy nie jest ułamek.",
        "Poprawne odpowiedzi dają punkt i wydłużają serię; błąd ją przerywa i pokazuje właściwą wartość. Sześćdziesiąt sekund na rundę, a najlepszy wynik zostaje dla każdego poziomu."
      ],
      slide: [
        "Przesuwaj numerowane kafelki na wolne miejsce, aż pójdą od jedynki w lewym górnym rogu do ostatniej liczby, z luką na końcu. Każde tasowanie tutaj da się rozwiązać.",
        "Liczą się ruchy i czas: mniej obu jest lepiej. Plansza jest gotowa, gdy każdy kafelek stoi na miejscu, a najlepszy wynik zostaje na tym urządzeniu."
      ],
      pattern: [
        "Każda runda daje krótki ciąg liczb zbudowany z dzisiejszej daty. Odkryj regułę, wpisz następny wyraz i naciśnij enter.",
        "Reguła pokazuje się po każdej odpowiedzi, więc pomyłka też uczy wzoru. Pięć ciągów to jeden zestaw, a jego ukończenie podtrzymuje serię dzienną."
      ]
    },
    ru: {
      sudoku: [
        "Заполните каждую пустую клетку так, чтобы в каждой строке, каждом столбце и каждом блоке цифры от одной до девяти встречались ровно один раз. Сетки бывают от четыре на четыре до девять на девять; нажмите клетку и введите цифру, стрелки перемещают выделение.",
        "Повторяющаяся цифра в строке, столбце или блоке краснеет при вводе и никогда не бывает частью верного решения. Проверка отмечает неверные записи, не выдавая ответ; лучшее время и серия хранятся в этом браузере."
      ],
      nonogram: [
        "Числа рядом с каждой строкой и над каждым столбцом по порядку говорят, сколько заполненных клеток в этой линии. Нажмите, чтобы закрасить, нажмите снова, чтобы отметить пустой, и удовлетворите все подсказки сразу.",
        "Линия верна, когда её блоки точно совпадают с числами, включая промежутки. Головоломка решена, когда совпадает вся картинка; одна сетка в день, а серия считает подряд идущие дни."
      ],
      merge: [
        "Сдвигайте всё поле стрелками или свайпом. Одинаковые плитки при столкновении сливаются в одну с удвоенным значением, и после каждого хода появляется новая плитка.",
        "Поле заполняется, поэтому держите самую большую плитку в углу и не разбрасывайте средние. Игра заканчивается, когда ни один ход не меняет поле; 2048 — победа, но можно играть дальше ради плитки побольше."
      ],
      anagram: [
        "Каждый раунд показывает подсказку и перемешанные буквы ответа. Введите слово и нажмите Enter или нажимайте буквы по порядку; ошибка стоит только времени.",
        "Верные слова дают очки, а подсказка отнимает несколько. Серия заканчивается после десяти слов, и результат сравнивается с лучшим на этом устройстве."
      ],
      wordguess: [
        "Угадайте скрытое слово из пяти букв за шесть попыток. Введите слово и нажмите Enter; буква становится зелёной на своём месте, янтарной, если она есть в слове в другом месте, и серой, если её нет.",
        "Клавиатура показывает уже испробованные буквы. Раунд заканчивается при находке или после шестой попытки, и тогда показывается ответ."
      ],
      crossword: [
        "Каждая подсказка указывает длину, например четыре буквы или два слова. Введите ответ, и пересекающиеся буквы подтвердят его; подсказки и сетка всегда сходятся.",
        "Ответы сверяются со списком самой головоломки, поэтому слово, подходящее по буквам, но не по подсказке, остаётся неверным. Ежедневные наборы одинаковы для всех и меняются в полночь; тренировочные не влияют на серию."
      ],
      pairs: [
        "Открывайте по две карты за ход. Совпадающие символы остаются открытыми, остальные через мгновение переворачиваются обратно, и каждая пара переворотов считается одним ходом.",
        "Поле очищается, когда найдены все шесть пар; таймер запускается с первого переворота. Меньше ходов — лучше, а рекорд хранится только в этом браузере."
      ],
      sequence: [
        "Смотрите, как кнопки, клетки, цифры или фигуры загораются по порядку, и повторите тот же порядок. Каждый раунд добавляет один шаг.",
        "Одна ошибка заканчивает игру, поэтому размышлять во время показа ничего не стоит. Лучшая серия хранится на этом устройстве."
      ],
      sort: [
        "Расставьте элементы в нужном порядке: числа от меньшего к большему, значения в разных записях на одной лестнице или события в порядке времени. Нажмите элемент, чтобы поставить его, или две плитки, чтобы поменять местами.",
        "Каждое верное размещение даёт очки, каждый обмен считается, поэтому быстрее всего сначала закрепить очевидные края. Неверное размещение отклоняется с подсказкой, а не принимается."
      ],
      math: [
        "Отвечайте на каждый вопрос целым числом и нажимайте Enter. Все деления точные, вычитание не уходит ниже нуля, поэтому дробных ответов не бывает.",
        "Верные ответы дают очко и удлиняют серию; ошибка её прерывает и показывает правильное значение. Шестьдесят секунд на раунд, лучший результат хранится для каждой сложности."
      ],
      slide: [
        "Двигайте пронумерованные плитки в пустую клетку, пока они не пойдут от единицы в левом верхнем углу до последнего числа, с пустотой в конце. Любое перемешивание здесь решаемо.",
        "Счёт — это ходы и время: чем меньше, тем лучше. Поле собрано, когда каждая плитка на месте, а лучший результат хранится на этом устройстве."
      ],
      pattern: [
        "Каждый раунд даёт короткую последовательность чисел, построенную из сегодняшней даты. Найдите правило, введите следующий член и нажмите Enter.",
        "Правило показывается после каждого ответа, поэтому ошибка тоже учит закономерности. Пять последовательностей — один набор, и его завершение поддерживает дневную серию."
      ]
    }
  }
};

/* Codebreaker was written after the rest, so its guide is attached per
   language here rather than repeated inside every block above. */
(function () {
  var codebreak = {
    en: ["A secret code of three to five digits is hidden. Guess a number each turn: exact matches are marked green and digits that are in the code but in another position are marked amber.", "The code is cracked when every digit is green. Ten guesses per code, three difficulty levels, and the number of guesses you needed is compared with the best saved on this device."],
    es: ["Hay un código secreto de tres a cinco dígitos. Adivina un número en cada turno: las coincidencias exactas se marcan en verde y los dígitos que están en el código en otra posición, en ámbar.", "El código se descifra cuando todos los dígitos están en verde. Diez intentos por código, tres dificultades y el número de intentos se compara con el mejor guardado en este dispositivo."],
    fr: ["Un code secret de trois à cinq chiffres est caché. Devinez un nombre à chaque tour : les chiffres bien placés passent au vert, ceux présents ailleurs dans le code passent à l'ambre.", "Le code est cassé quand tous les chiffres sont verts. Dix essais par code, trois niveaux, et le nombre d'essais est comparé au meilleur enregistré sur cet appareil."],
    de: ["Ein geheimer Code aus drei bis fünf Ziffern ist versteckt. Rate pro Zug eine Zahl: richtige Ziffern an der richtigen Stelle werden grün, Ziffern an anderer Stelle gelb.", "Geknackt ist der Code, wenn alle Ziffern grün sind. Zehn Versuche pro Code, drei Schwierigkeiten, und deine Versuche werden mit dem Bestwert auf diesem Gerät verglichen."],
    it: ["Un codice segreto da tre a cinque cifre è nascosto. Indovina un numero a ogni turno: le cifre al posto giusto diventano verdi, quelle presenti altrove nel codice diventano gialle.", "Il codice è decifrato quando tutte le cifre sono verdi. Dieci tentativi per codice, tre difficoltà e il numero di tentativi viene confrontato con il migliore su questo dispositivo."],
    pt: ["Há um código secreto de três a cinco dígitos. Adivinha um número em cada jogada: os dígitos certos no lugar certo ficam verdes, os que existem noutra posição ficam âmbar.", "O código é descodificado quando todos os dígitos estão verdes. Dez tentativas por código, três dificuldades, e o número de tentativas é comparado com o melhor guardado neste dispositivo."],
    nl: ["Er ligt een geheime code van drie tot vijf cijfers. Raad per beurt een getal: cijfers op de juiste plek worden groen, cijfers die elders in de code staan worden geel.", "De code is gekraakt als alle cijfers groen zijn. Tien pogingen per code, drie moeilijkheden, en je aantal pogingen wordt met het beste op dit apparaat vergeleken."],
    pl: ["Ukryty jest tajny kod złożony z trzech do pięciu cyfr. W każdej rundzie zgaduj liczbę: cyfry na właściwym miejscu stają się zielone, a te obecne gdzie indziej — bursztynowe.", "Kod zostaje złamany, gdy wszystkie cyfry są zielone. Dziesięć prób na kod, trzy poziomy trudności, a liczba prób jest porównywana z rekordem na tym urządzeniu."],
    ru: ["Скрыт секретный код из трёх-пяти цифр. Каждый ход вводите число: цифры на своих местах становятся зелёными, а те, что есть в коде, но в другом месте, — янтарными.", "Код взломан, когда все цифры зелёные. Десять попыток на код, три уровня сложности, а число попыток сравнивается с лучшим результатом на этом устройстве."]
  };
  Object.keys(codebreak).forEach(function (code) {
    if (window.MGI18N_DATA_E.guides[code]) window.MGI18N_DATA_E.guides[code].codebreak = codebreak[code];
  });
})();
