/* Rules and scoring bullets for the translated guides, one language block per
   mechanic family. A leading "- " renders as a list item. */
window.MGI18N_GUIDE_POINTS = window.MGI18N_GUIDE_POINTS || {};
window.MGI18N_GUIDE_POINTS.en = {
  sudoku: [
    "- Each row, each column and each box must hold every digit exactly once.",
    "- Gold digits are givens and cannot change; Check marks wrong entries without revealing the answer.",
    "- The timer starts with your first entry and stops the moment the grid is solved.",
    "- Your best time for each difficulty is kept in this browser and never leaves the device."
  ],
  nonogram: [
    "- Numbers beside a row or above a column list the runs of filled cells, in order, with at least one gap between runs.",
    "- Mark cells you have proved empty with the cross; a marked cell never counts as filled and cannot block a win.",
    "- Any arrangement that satisfies every row and column clue counts as solved, because the check is on the clues.",
    "- The daily grid is generated from the date, so everyone gets the same one today, and the streak counts consecutive days solved."
  ],
  merge: [
    "- Arrow keys or swipes move every tile at once; two equal tiles that meet merge into one of double the value.",
    "- A move counts only if a tile changes position or two tiles merge, and a tile merges at most once per move.",
    "- Your score is the sum of every tile value created by a merge; the best score is kept in this browser.",
    "- The round ends when the board is full and no two neighbouring tiles match."
  ],
  anagram: [
    "- Each round shows a clue, the answer's letter count and its letters in a random order; the letters are exactly the answer.",
    "- A word solved without help scores 100 points, and 75 once the clue has been revealed.",
    "- A wrong guess costs time rather than points, and a skip scores nothing but moves on.",
    "- The best total across ten rounds is kept on this device."
  ],
  wordguess: [
    "- Guess a five-letter word in six tries; green means the right letter in the right place, amber the right letter in the wrong place.",
    "- Every guess must be a word the game knows, so the keyboard tells you when an entry is not in the list.",
    "- Each new game picks a new word, and your run of wins is kept in this browser.",
    "- Running out of guesses reveals the word and ends the run; the streak resets."
  ],
  crossword: [
    "- Each clue carries its enumeration in brackets, so (7) means a seven-letter answer.",
    "- Answers are compared in capitals with spaces and punctuation removed, so case and spacing never matter.",
    "- A correct answer scores ten points, a hint takes three off that clue, and a skip scores nothing.",
    "- Your best score is kept on this device, and the run ends when the clock reaches zero."
  ],
  pairs: [
    "- Flip two cards at a time and keep a pair face up when the two match.",
    "- A mismatch turns back after a moment, so remembering what you saw is the whole game.",
    "- The round ends when all six pairs are matched; moves and time are both counted.",
    "- Your best result is stored in this browser and never uploaded."
  ],
  sequence: [
    "- Items must be clicked in the required order: numbers ascending, words alphabetically ignoring case.",
    "- A click that is not the next item counts as a mistake and the item stays in the pool.",
    "- Your score is the time to finish, and the best time for each set and length is kept on this device.",
    "- Changing the set or the length starts a new round immediately."
  ],
  sort: [
    "- Every number or item belongs to exactly one bin, chosen by the rule named on the bin.",
    "- One point per correct sort, and each mistake takes one off, never below zero.",
    "- Your longest correct run is shown as the streak, and your best score is kept in this browser.",
    "- The round ends at zero on the clock, and nothing is uploaded anywhere."
  ],
  math: [
    "- Answer each question before the clock reaches zero; only whole numbers are ever the answer.",
    "- Easy stays within 20, Medium adds tables to 12 and sums to 30, Hard goes to tables of 20 and sums to 100.",
    "- One point per correct answer, with no bonus for answering quickly inside the round.",
    "- Your best score for each difficulty is kept on this device."
  ],
  slide: [
    "- Only a tile sharing an edge with the gap can move; diagonal neighbours cannot.",
    "- Every shuffle is produced by legal moves from a solved board, so a solution always exists.",
    "- Your score is the number of moves, with time as the tiebreaker, and the best per board size is kept in this browser.",
    "- Shuffling starts a fresh board, resets the counters and keeps your record."
  ],
  pattern: [
    "- Work out the rule from the terms shown, then give the next term as a whole number.",
    "- One attempt per sequence: a wrong answer shows the rule and moves on to the next one.",
    "- Your best day is the number correct out of five, and the streak counts consecutive days you finished the set.",
    "- Restarting replays today's five sequences instead of generating new ones."
  ],
  codebreak: [
    "- Guess the hidden code: exact counts digits in the right position, near counts digits that are in the code elsewhere.",
    "- Digits may repeat on the harder levels, and repeated digits are matched one to one when scoring.",
    "- Your score is the number of guesses used, and the lowest score per difficulty is kept in this browser.",
    "- Running out of guesses reveals the code, counts as a loss and leaves your best score untouched."
  ]
};
window.MGI18N_GUIDE_POINTS = window.MGI18N_GUIDE_POINTS || {};
window.MGI18N_GUIDE_POINTS.es = {
  sudoku: [
    "- Cada fila, cada columna y cada caja deben contener cada dígito exactamente una vez.",
    "- Las cifras doradas son datos fijos y no cambian; Comprobar marca los errores sin revelar la solución.",
    "- El cronómetro empieza con tu primera entrada y se detiene en el momento en que se resuelve la cuadrícula.",
    "- Tu mejor tiempo para cada dificultad se guarda en este navegador y nunca sale del dispositivo."
  ],
  nonogram: [
    "- Los números junto a una fila o sobre una columna indican, en orden, las series de casillas llenas, con al menos un hueco entre ellas.",
    "- Marca con la cruz las casillas que hayas deducido vacías; una casilla marcada nunca cuenta como llena ni impide ganar.",
    "- Cualquier disposición que cumpla todas las pistas de filas y columnas vale como resuelta, porque la comprobación es sobre las pistas.",
    "- La cuadrícula diaria se genera a partir de la fecha, así que hoy es la misma para todos, y la racha cuenta los días consecutivos resueltos."
  ],
  merge: [
    "- Las flechas o los deslizamientos mueven todas las fichas a la vez; dos fichas iguales que se encuentran se fusionan en una del doble de valor.",
    "- Un movimiento cuenta solo si una ficha cambia de sitio o dos fichas se fusionan, y cada ficha se fusiona como mucho una vez por movimiento.",
    "- Tu puntuación es la suma de cada valor creado por una fusión; la mejor puntuación se guarda en este navegador.",
    "- La ronda termina cuando el tablero está lleno y no quedan dos fichas vecinas iguales."
  ],
  anagram: [
    "- Cada ronda muestra una pista, el número de letras de la respuesta y sus letras desordenadas; las letras son exactamente la respuesta.",
    "- Una palabra resuelta sin ayuda vale 100 puntos, y 75 si ya se ha revelado la pista.",
    "- Un intento fallido cuesta tiempo, no puntos, y saltar no puntúa pero pasa a la siguiente.",
    "- El mejor total de diez rondas se guarda en este dispositivo."
  ],
  wordguess: [
    "- Adivina una palabra de cinco letras en seis intentos; verde es la letra correcta en el lugar correcto y ámbar la correcta en otro lugar.",
    "- Cada intento debe ser una palabra que el juego conozca, así que el teclado avisa cuando una entrada no está en la lista.",
    "- Cada partida nueva elige otra palabra, y tu racha de victorias se guarda en este navegador.",
    "- Quedarse sin intentos revela la palabra y termina la partida; la racha vuelve a cero."
  ],
  crossword: [
    "- Cada pista indica su longitud entre paréntesis, así que (7) significa una respuesta de siete letras.",
    "- Las respuestas se comparan en mayúsculas y sin espacios ni puntuación, así que las mayúsculas y el espaciado nunca importan.",
    "- Una respuesta correcta vale diez puntos, una pista resta tres a esa pista y saltar no puntúa.",
    "- Tu mejor puntuación se guarda en este dispositivo y la ronda acaba cuando el reloj llega a cero."
  ],
  pairs: [
    "- Levanta dos cartas a la vez y deja la pareja boca arriba cuando coincidan.",
    "- Si no coinciden, se vuelven a girar al momento, así que recordar lo que viste es todo el juego.",
    "- La ronda termina cuando se emparejan las seis parejas; se cuentan los movimientos y el tiempo.",
    "- Tu mejor resultado se guarda en este navegador y no se sube a ningún sitio."
  ],
  sequence: [
    "- Hay que hacer clic en el orden pedido: números de menor a mayor, palabras por orden alfabético sin distinguir mayúsculas.",
    "- Un clic que no sea el siguiente elemento cuenta como error y el elemento sigue disponible.",
    "- Tu puntuación es el tiempo empleado, y el mejor tiempo de cada conjunto y longitud se guarda en este dispositivo.",
    "- Cambiar el conjunto o la longitud empieza una ronda nueva al instante."
  ],
  sort: [
    "- Cada número o elemento pertenece a una sola caja, la que indica la regla escrita en ella.",
    "- Un punto por cada clasificación correcta y un punto menos por cada error, nunca por debajo de cero.",
    "- Tu racha correcta más larga se muestra como racha y tu mejor puntuación se guarda en este navegador.",
    "- La ronda termina cuando el reloj llega a cero y no se sube nada a ninguna parte."
  ],
  math: [
    "- Responde a cada pregunta antes de que el reloj llegue a cero; la respuesta siempre es un número entero.",
    "- Fácil se queda hasta 20, Medio añade tablas hasta 12 y sumas hasta 30, Difícil llega a tablas de 20 y sumas de 100.",
    "- Un punto por cada respuesta correcta, sin bonus por responder rápido dentro de la ronda.",
    "- Tu mejor puntuación en cada dificultad se guarda en este dispositivo."
  ],
  slide: [
    "- Solo se puede mover la ficha que comparte un lado con el hueco; las diagonales no cuentan.",
    "- Cada barajado sale de movimientos legales desde un tablero resuelto, así que siempre existe solución.",
    "- Tu puntuación es el número de movimientos, con el tiempo como desempate, y el mejor de cada tamaño se guarda en este navegador.",
    "- Barajar empieza un tablero nuevo, reinicia los contadores y conserva tu récord."
  ],
  pattern: [
    "- Descubre la regla con los términos mostrados y escribe el siguiente como número entero.",
    "- Un intento por secuencia: si fallas, se muestra la regla y se pasa a la siguiente.",
    "- Tu mejor día es el número de aciertos sobre cinco, y la racha cuenta los días consecutivos que completaste el conjunto.",
    "- Reiniciar vuelve a jugar las cinco secuencias de hoy en lugar de generar otras nuevas."
  ],
  codebreak: [
    "- Adivina el código oculto: exacto cuenta las cifras en la posición correcta y cerca las cifras que están en el código en otro lugar.",
    "- Las cifras pueden repetirse en los niveles difíciles, y al puntuar las repetidas se emparejan una a una.",
    "- Tu puntuación es el número de intentos usados, y la mejor puntuación de cada dificultad se guarda en este navegador.",
    "- Quedarse sin intentos revela el código, cuenta como derrota y no toca tu mejor puntuación."
  ]
};
window.MGI18N_GUIDE_POINTS = window.MGI18N_GUIDE_POINTS || {};
window.MGI18N_GUIDE_POINTS.fr = {
  sudoku: [
    "- Chaque ligne, chaque colonne et chaque bloc doivent contenir chaque chiffre exactement une fois.",
    "- Les chiffres dorés sont des données fixes et ne changent pas ; Vérifier signale les erreurs sans révéler la solution.",
    "- Le chronomètre démarre à votre première saisie et s'arrête dès que la grille est résolue.",
    "- Votre meilleur temps par difficulté est conservé dans ce navigateur et ne quitte jamais l'appareil."
  ],
  nonogram: [
    "- Les nombres à côté d'une ligne ou au-dessus d'une colonne donnent, dans l'ordre, les séries de cases remplies, séparées par au moins une case vide.",
    "- Marquez d'une croix les cases dont vous avez déduit qu'elles sont vides ; une case marquée ne compte jamais comme remplie et ne bloque pas la victoire.",
    "- Toute disposition qui respecte tous les indices de lignes et de colonnes est acceptée, car la vérification porte sur les indices.",
    "- La grille du jour est générée à partir de la date : elle est la même pour tout le monde aujourd'hui, et la série compte les jours consécutifs résolus."
  ],
  merge: [
    "- Les flèches ou les glissements déplacent toutes les tuiles à la fois ; deux tuiles égales qui se rencontrent fusionnent en une tuile de valeur double.",
    "- Un coup compte seulement si une tuile change de place ou si deux tuiles fusionnent, et une tuile ne fusionne qu'une fois par coup.",
    "- Votre score est la somme des valeurs créées par les fusions ; le meilleur score est conservé dans ce navigateur.",
    "- La manche se termine quand la grille est pleine et qu'aucune tuile voisine n'est égale."
  ],
  anagram: [
    "- Chaque manche affiche un indice, le nombre de lettres de la réponse et ses lettres mélangées ; les lettres sont exactement la réponse.",
    "- Un mot trouvé sans aide rapporte 100 points, et 75 une fois l'indice révélé.",
    "- Une mauvaise réponse coûte du temps, pas de points, et passer ne rapporte rien mais avance.",
    "- Le meilleur total sur dix manches est conservé sur cet appareil."
  ],
  wordguess: [
    "- Devinez un mot de cinq lettres en six essais ; vert signifie la bonne lettre à la bonne place, ambre la bonne lettre ailleurs.",
    "- Chaque essai doit être un mot que le jeu connaît, et le clavier vous prévient quand une saisie n'est pas dans la liste.",
    "- Chaque nouvelle partie choisit un nouveau mot, et votre série de victoires est conservée dans ce navigateur.",
    "- Épuiser les essais révèle le mot et termine la partie ; la série repart à zéro."
  ],
  crossword: [
    "- Chaque indice donne sa longueur entre parenthèses : (7) signifie une réponse de sept lettres.",
    "- Les réponses sont comparées en majuscules, sans espaces ni ponctuation : la casse et l'espacement n'ont jamais d'importance.",
    "- Une bonne réponse rapporte dix points, un indice en retire trois à cet indice, et passer ne rapporte rien.",
    "- Votre meilleur score est conservé sur cet appareil, et la manche se termine quand le chrono atteint zéro."
  ],
  pairs: [
    "- Retournez deux cartes à la fois et laissez la paire face visible quand elles correspondent.",
    "- En cas d'erreur, les cartes se retournent aussitôt : se souvenir de ce qu'on a vu fait tout le jeu.",
    "- La manche se termine quand les six paires sont trouvées ; les coups et le temps sont comptés.",
    "- Votre meilleur résultat est conservé dans ce navigateur et n'est jamais envoyé."
  ],
  sequence: [
    "- Les éléments doivent être cliqués dans l'ordre demandé : nombres croissants, mots par ordre alphabétique sans tenir compte de la casse.",
    "- Un clic qui n'est pas l'élément suivant compte comme une erreur et l'élément reste disponible.",
    "- Votre score est le temps de completion, et le meilleur temps par série et longueur est conservé sur cet appareil.",
    "- Changer de série ou de longueur lance immédiatement une nouvelle manche."
  ],
  sort: [
    "- Chaque nombre ou élément appartient à une seule corbeille, celle dont la règle est affichée.",
    "- Un point par tri correct, et chaque erreur en retire un, sans jamais descendre sous zéro.",
    "- Votre plus longue série correcte est affichée comme série, et votre meilleur score est conservé dans ce navigateur.",
    "- La manche se termine quand le chrono atteint zéro, et rien n'est envoyé nulle part."
  ],
  math: [
    "- Répondez à chaque question avant que le chrono n'atteigne zéro ; la réponse est toujours un nombre entier.",
    "- Facile reste sous 20, Moyen ajoute les tables jusqu'à 12 et les sommes jusqu'à 30, Difficile va aux tables de 20 et aux sommes de 100.",
    "- Un point par bonne réponse, sans bonus pour la rapidité à l'intérieur de la manche.",
    "- Votre meilleur score par difficulté est conservé sur cet appareil."
  ],
  slide: [
    "- Seule une tuile partageant un bord avec le trou peut bouger ; les voisines en diagonale ne peuvent pas.",
    "- Chaque mélange provient de coups légaux depuis une grille résolue, donc une solution existe toujours.",
    "- Votre score est le nombre de coups, avec le temps comme départage, et le meilleur par taille de grille est conservé dans ce navigateur.",
    "- Mélanger lance une nouvelle grille, remet les compteurs à zéro et garde votre record."
  ],
  pattern: [
    "- Déduisez la règle à partir des termes affichés, puis donnez le terme suivant en nombre entier.",
    "- Un essai par suite : une mauvaise réponse affiche la règle et passe à la suivante.",
    "- Votre meilleur jour est le nombre de bonnes réponses sur cinq, et la série compte les jours consécutifs terminés.",
    "- Relancer rejoue les cinq suites du jour au lieu d'en générer de nouvelles."
  ],
  codebreak: [
    "- Devinez le code caché : exact compte les chiffres bien placés, proche les chiffres présents ailleurs dans le code.",
    "- Les chiffres peuvent se répéter aux niveaux difficiles, et les répétitions sont appariées une à une au calcul du score.",
    "- Votre score est le nombre d'essais utilisés, et le meilleur score par difficulté est conservé dans ce navigateur.",
    "- Épuiser les essais révèle le code, compte comme une défaite et laisse votre meilleur score intact."
  ]
};
window.MGI18N_GUIDE_POINTS = window.MGI18N_GUIDE_POINTS || {};
window.MGI18N_GUIDE_POINTS.de = {
  sudoku: [
    "- Jede Zeile, jede Spalte und jeder Block müssen jede Ziffer genau einmal enthalten.",
    "- Goldene Ziffern sind Vorgaben und bleiben fest; Prüfen markiert Fehler, ohne die Lösung zu verraten.",
    "- Die Uhr startet mit deinem ersten Eintrag und stoppt in dem Moment, in dem das Gitter gelöst ist.",
    "- Deine Bestzeit je Schwierigkeit bleibt in diesem Browser und verlässt das Gerät nie."
  ],
  nonogram: [
    "- Zahlen neben einer Zeile oder über einer Spalte nennen der Reihe nach die Blöcke gefüllter Zellen, mit mindestens einer Lücke dazwischen.",
    "- Markiere Zellen, die du als leer erkannt hast, mit dem Kreuz; eine markierte Zelle zählt nie als gefüllt und verhindert keinen Sieg.",
    "- Jede Anordnung, die alle Zeilen- und Spaltenhinweise erfüllt, gilt als gelöst, denn geprüft werden die Hinweise.",
    "- Das Tagesgitter entsteht aus dem Datum, ist heute also für alle gleich, und die Serie zählt aufeinanderfolgende gelöste Tage."
  ],
  merge: [
    "- Pfeiltasten oder Wischgesten bewegen alle Plättchen zugleich; zwei gleiche Plättchen, die sich treffen, verschmelzen zu einem mit doppeltem Wert.",
    "- Ein Zug zählt nur, wenn sich ein Plättchen bewegt oder zwei verschmelzen, und ein Plättchen verschmilzt höchstens einmal pro Zug.",
    "- Deine Punktzahl ist die Summe aller durch Verschmelzen entstandenen Werte; der Bestwert bleibt in diesem Browser.",
    "- Die Runde endet, wenn das Brett voll ist und keine zwei Nachbarn mehr gleich sind."
  ],
  anagram: [
    "- Jede Runde zeigt einen Hinweis, die Buchstabenzahl der Antwort und ihre Buchstaben in zufälliger Reihenfolge; die Buchstaben sind genau die Antwort.",
    "- Ein ohne Hilfe gelöstes Wort bringt 100 Punkte, mit aufgedecktem Hinweis 75.",
    "- Ein falscher Versuch kostet Zeit statt Punkte, und Überspringen bringt nichts, geht aber weiter.",
    "- Die beste Summe aus zehn Runden bleibt auf diesem Gerät."
  ],
  wordguess: [
    "- Errate ein Wort mit fünf Buchstaben in sechs Versuchen; grün heißt richtiger Buchstabe am richtigen Platz, gelb richtiger Buchstabe woanders.",
    "- Jeder Versuch muss ein Wort sein, das das Spiel kennt; die Tastatur zeigt dir, wenn eine Eingabe nicht in der Liste steht.",
    "- Jede neue Partie wählt ein neues Wort, und deine Siegesserie bleibt in diesem Browser.",
    "- Sind die Versuche aufgebraucht, wird das Wort gezeigt und die Partie endet; die Serie beginnt neu."
  ],
  crossword: [
    "- Jeder Hinweis nennt seine Länge in Klammern, (7) bedeutet also eine Antwort mit sieben Buchstaben.",
    "- Antworten werden in Großbuchstaben ohne Leerzeichen und Satzzeichen verglichen, Groß- und Kleinschreibung sowie Abstände spielen nie eine Rolle.",
    "- Eine richtige Antwort bringt zehn Punkte, ein Hinweis zieht drei von diesem Hinweis ab, Überspringen bringt nichts.",
    "- Dein Bestwert bleibt auf diesem Gerät, und die Runde endet, wenn die Uhr null erreicht."
  ],
  pairs: [
    "- Drehe zwei Karten auf einmal um und lass ein Paar offen liegen, wenn beide zusammenpassen.",
    "- Passt es nicht, drehen sich die Karten gleich wieder um; sich zu merken, was du gesehen hast, ist das ganze Spiel.",
    "- Die Runde endet, wenn alle sechs Paare gefunden sind; Züge und Zeit werden beide gezählt.",
    "- Dein bestes Ergebnis bleibt in diesem Browser und wird nie hochgeladen."
  ],
  sequence: [
    "- Die Elemente müssen in der geforderten Reihenfolge angeklickt werden: Zahlen aufsteigend, Wörter alphabetisch ohne Rücksicht auf Groß- und Kleinschreibung.",
    "- Ein Klick, der nicht das nächste Element ist, zählt als Fehler, und das Element bleibt verfügbar.",
    "- Deine Punktzahl ist die Zeit bis zum Ende, und die Bestzeit je Satz und Länge bleibt auf diesem Gerät.",
    "- Ein Wechsel von Satz oder Länge startet sofort eine neue Runde."
  ],
  sort: [
    "- Jede Zahl und jedes Element gehört in genau einen Behälter, nämlich den mit der passenden Regel.",
    "- Ein Punkt pro richtigem Sortieren, und jeder Fehler zieht einen ab, nie unter null.",
    "- Deine längste richtige Serie wird als Streak angezeigt, und dein Bestwert bleibt in diesem Browser.",
    "- Die Runde endet bei null auf der Uhr, und nichts wird irgendwohin hochgeladen."
  ],
  math: [
    "- Beantworte jede Frage, bevor die Uhr null erreicht; die Antwort ist immer eine ganze Zahl.",
    "- Leicht bleibt bis 20, Mittel ergänzt Reihen bis 12 und Summen bis 30, Schwer geht bis Reihen von 20 und Summen von 100.",
    "- Ein Punkt pro richtiger Antwort, ohne Bonus für schnelles Antworten innerhalb der Runde.",
    "- Dein Bestwert je Schwierigkeit bleibt auf diesem Gerät."
  ],
  slide: [
    "- Nur ein Plättchen, das eine Kante mit der Lücke teilt, kann sich bewegen; diagonale Nachbarn nicht.",
    "- Jede Mischung entsteht aus erlaubten Zügen von einem gelösten Brett, eine Lösung existiert also immer.",
    "- Deine Punktzahl ist die Zahl der Züge, die Zeit entscheidet bei Gleichstand, und der Bestwert je Brettgröße bleibt in diesem Browser.",
    "- Mischen startet ein neues Brett, setzt die Zähler zurück und behält deinen Rekord."
  ],
  pattern: [
    "- Finde die Regel aus den gezeigten Gliedern und gib das nächste als ganze Zahl an.",
    "- Ein Versuch pro Folge: eine falsche Antwort zeigt die Regel und geht zur nächsten über.",
    "- Dein bester Tag ist die Zahl der richtigen Antworten von fünf, und die Serie zählt aufeinanderfolgende abgeschlossene Tage.",
    "- Neustart spielt die fünf Folgen von heute erneut, statt neue zu erzeugen."
  ],
  codebreak: [
    "- Errate den versteckten Code: exakt zählt Ziffern an der richtigen Stelle, nah zählt Ziffern, die an anderer Stelle im Code stehen.",
    "- Auf den schweren Stufen dürfen Ziffern mehrfach vorkommen, und wiederholte Ziffern werden beim Zählen eins zu eins zugeordnet.",
    "- Deine Punktzahl ist die Zahl der Versuche, und der Bestwert je Schwierigkeit bleibt in diesem Browser.",
    "- Sind die Versuche aufgebraucht, wird der Code gezeigt, die Runde zählt als verloren und dein Bestwert bleibt unberührt."
  ]
};
window.MGI18N_GUIDE_POINTS = window.MGI18N_GUIDE_POINTS || {};
window.MGI18N_GUIDE_POINTS.it = {
  sudoku: [
    "- Ogni riga, ogni colonna e ogni riquadro devono contenere ogni cifra esattamente una volta.",
    "- Le cifre dorate sono dati fissi e non cambiano; Controlla segnala gli errori senza rivelare la soluzione.",
    "- Il cronometro parte con il tuo primo inserimento e si ferma nel momento in cui la griglia è risolta.",
    "- Il tuo tempo migliore per ogni difficoltà resta in questo browser e non lascia mai il dispositivo."
  ],
  nonogram: [
    "- I numeri accanto a una riga o sopra una colonna indicano, in ordine, le serie di caselle piene, con almeno uno spazio tra una serie e l'altra.",
    "- Segna con la croce le caselle che hai dedotto vuote; una casella segnata non conta mai come piena e non blocca la vittoria.",
    "- Qualsiasi disposizione che rispetti tutti gli indizi di righe e colonne vale come risolta, perché il controllo è sugli indizi.",
    "- La griglia del giorno è generata dalla data, quindi oggi è uguale per tutti, e la serie conta i giorni consecutivi risolti."
  ],
  merge: [
    "- Le frecce o gli scorrimenti muovono tutte le tessere insieme; due tessere uguali che si incontrano si fondono in una dal valore doppio.",
    "- Una mossa conta solo se una tessera cambia posto o due tessere si fondono, e ogni tessera si fonde al massimo una volta per mossa.",
    "- Il tuo punteggio è la somma di ogni valore creato da una fusione; il record resta in questo browser.",
    "- La partita finisce quando il tabellone è pieno e non ci sono due tessere vicine uguali."
  ],
  anagram: [
    "- Ogni round mostra un indizio, il numero di lettere della risposta e le sue lettere in ordine casuale; le lettere sono esattamente la risposta.",
    "- Una parola risolta senza aiuto vale 100 punti, e 75 una volta rivelato l'indizio.",
    "- Un tentativo sbagliato costa tempo, non punti, e saltare non dà punti ma fa passare avanti.",
    "- Il totale migliore su dieci round resta su questo dispositivo."
  ],
  wordguess: [
    "- Indovina una parola di cinque lettere in sei tentativi; verde è la lettera giusta al posto giusto, ambra la lettera giusta altrove.",
    "- Ogni tentativo deve essere una parola che il gioco conosce, così la tastiera ti avvisa quando una voce non è in elenco.",
    "- Ogni nuova partita sceglie una parola nuova, e la tua serie di vittorie resta in questo browser.",
    "- Esauriti i tentativi la parola viene rivelata e la partita finisce; la serie riparte da zero."
  ],
  crossword: [
    "- Ogni indizio riporta la sua lunghezza tra parentesi: (7) significa una risposta di sette lettere.",
    "- Le risposte sono confrontate in maiuscolo senza spazi né punteggiatura, quindi maiuscole e spaziature non contano mai.",
    "- Una risposta corretta vale dieci punti, un indizio ne toglie tre a quell'indizio e saltare non dà punti.",
    "- Il record resta su questo dispositivo e il round finisce quando il cronometro arriva a zero."
  ],
  pairs: [
    "- Gira due carte alla volta e lascia la coppia scoperta quando le due coincidono.",
    "- Se non coincidono tornano coperte dopo un istante, quindi ricordare ciò che hai visto è tutto il gioco.",
    "- Il round finisce quando sono trovate tutte e sei le coppie; si contano mosse e tempo.",
    "- Il tuo miglior risultato resta in questo browser e non viene mai caricato online."
  ],
  sequence: [
    "- Gli elementi vanno cliccati nell'ordine richiesto: numeri crescenti, parole in ordine alfabetico senza badare alle maiuscole.",
    "- Un clic che non è l'elemento successivo conta come errore e l'elemento resta disponibile.",
    "- Il punteggio è il tempo impiegato, e il tempo migliore per ogni insieme e lunghezza resta su questo dispositivo.",
    "- Cambiare insieme o lunghezza avvia subito un nuovo round."
  ],
  sort: [
    "- Ogni numero o elemento appartiene a un solo contenitore, quello indicato dalla regola scritta sopra.",
    "- Un punto per ogni smistamento corretto e un punto in meno per ogni errore, mai sotto zero.",
    "- La tua serie corretta più lunga è mostrata come streak e il record resta in questo browser.",
    "- Il round finisce quando il cronometro arriva a zero e nulla viene caricato da nessuna parte."
  ],
  math: [
    "- Rispondi a ogni domanda prima che il cronometro arrivi a zero; la risposta è sempre un numero intero.",
    "- Facile resta entro 20, Medio aggiunge tabelline fino a 12 e somme fino a 30, Difficile arriva a tabelline di 20 e somme di 100.",
    "- Un punto per ogni risposta corretta, senza bonus per la rapidità dentro il round.",
    "- Il record per ogni difficoltà resta su questo dispositivo."
  ],
  slide: [
    "- Si muove solo la tessera che condivide un lato con lo spazio vuoto; le vicine in diagonale no.",
    "- Ogni mescolata nasce da mosse legali da una griglia risolta, quindi una soluzione esiste sempre.",
    "- Il punteggio è il numero di mosse, con il tempo come spareggio, e il record per ogni dimensione resta in questo browser.",
    "- Mescolare avvia una griglia nuova, azzera i contatori e conserva il record."
  ],
  pattern: [
    "- Deduci la regola dai termini mostrati e scrivi il successivo come numero intero.",
    "- Un tentativo per sequenza: una risposta sbagliata mostra la regola e passa alla successiva.",
    "- Il tuo giorno migliore è il numero di risposte corrette su cinque, e la serie conta i giorni consecutivi completati.",
    "- Ricominciare rigioca le cinque sequenze di oggi invece di generarne altre."
  ],
  codebreak: [
    "- Indovina il codice nascosto: esatto conta le cifre al posto giusto, vicino conta le cifre presenti altrove nel codice.",
    "- Ai livelli difficili le cifre possono ripetersi, e nel calcolo le ripetizioni vengono abbinate una a una.",
    "- Il punteggio è il numero di tentativi usati, e il record per ogni difficoltà resta in questo browser.",
    "- Esauriti i tentativi il codice viene rivelato, il round conta come sconfitta e il record resta intatto."
  ]
};
window.MGI18N_GUIDE_POINTS = window.MGI18N_GUIDE_POINTS || {};
window.MGI18N_GUIDE_POINTS.pt = {
  sudoku: [
    "- Cada linha, cada coluna e cada bloco devem conter cada dígito exatamente uma vez.",
    "- Os dígitos dourados são dados fixos e não mudam; Verificar marca os erros sem revelar a solução.",
    "- O cronómetro começa com a tua primeira entrada e para no momento em que a grelha fica resolvida.",
    "- O teu melhor tempo por dificuldade fica neste navegador e nunca sai do dispositivo."
  ],
  nonogram: [
    "- Os números ao lado de uma linha ou por cima de uma coluna indicam, por ordem, as séries de células preenchidas, com pelo menos um espaço entre elas.",
    "- Marca com a cruz as células que deduziste estarem vazias; uma célula marcada nunca conta como preenchida e não impede a vitória.",
    "- Qualquer disposição que cumpra todas as pistas de linhas e colunas conta como resolvida, porque a verificação é feita sobre as pistas.",
    "- A grelha diária é gerada a partir da data, por isso hoje é igual para todos, e a sequência conta os dias consecutivos resolvidos."
  ],
  merge: [
    "- As setas ou os deslizamentos movem todas as peças ao mesmo tempo; duas peças iguais que se encontram fundem-se numa de valor duplo.",
    "- Uma jogada só conta se uma peça mudar de lugar ou duas peças se fundirem, e cada peça funde-se no máximo uma vez por jogada.",
    "- A tua pontuação é a soma de cada valor criado por uma fusão; a melhor pontuação fica neste navegador.",
    "- A ronda termina quando o tabuleiro está cheio e não há duas peças vizinhas iguais."
  ],
  anagram: [
    "- Cada ronda mostra uma pista, o número de letras da resposta e as suas letras desordenadas; as letras são exatamente a resposta.",
    "- Uma palavra resolvida sem ajuda vale 100 pontos, e 75 depois de a pista ser revelada.",
    "- Uma tentativa falhada custa tempo, não pontos, e saltar não pontua mas passa à frente.",
    "- O melhor total em dez rondas fica guardado neste dispositivo."
  ],
  wordguess: [
    "- Adivinha uma palavra de cinco letras em seis tentativas; verde é a letra certa no lugar certo, âmbar a letra certa noutro lugar.",
    "- Cada tentativa tem de ser uma palavra que o jogo conheça, por isso o teclado avisa quando uma entrada não está na lista.",
    "- Cada novo jogo escolhe outra palavra, e a tua sequência de vitórias fica neste navegador.",
    "- Ficar sem tentativas revela a palavra e termina o jogo; a sequência recomeça."
  ],
  crossword: [
    "- Cada pista indica o seu comprimento entre parênteses, por isso (7) significa uma resposta de sete letras.",
    "- As respostas são comparadas em maiúsculas e sem espaços nem pontuação, pelo que maiúsculas e espaçamento nunca contam.",
    "- Uma resposta certa vale dez pontos, uma pista retira três a essa pista e saltar não pontua.",
    "- A tua melhor pontuação fica neste dispositivo e a ronda acaba quando o relógio chega a zero."
  ],
  pairs: [
    "- Vira duas cartas de cada vez e deixa o par virado para cima quando as duas coincidem.",
    "- Se não coincidirem, voltam a virar-se logo a seguir, por isso recordar o que viste é o jogo todo.",
    "- A ronda termina quando os seis pares estão encontrados; contam-se jogadas e tempo.",
    "- O teu melhor resultado fica neste navegador e nunca é enviado para lado nenhum."
  ],
  sequence: [
    "- Os itens têm de ser clicados pela ordem pedida: números crescentes, palavras por ordem alfabética sem distinguir maiúsculas.",
    "- Um clique que não seja o item seguinte conta como erro e o item continua disponível.",
    "- A tua pontuação é o tempo de conclusão, e o melhor tempo por conjunto e comprimento fica neste dispositivo.",
    "- Mudar o conjunto ou o comprimento começa logo uma ronda nova."
  ],
  sort: [
    "- Cada número ou item pertence a um único caixote, aquele cuja regra está escrita por cima.",
    "- Um ponto por cada separação certa e um ponto a menos por cada erro, nunca abaixo de zero.",
    "- A tua sequência certa mais longa aparece como streak e a melhor pontuação fica neste navegador.",
    "- A ronda termina quando o relógio chega a zero e nada é enviado para lado nenhum."
  ],
  math: [
    "- Responde a cada pergunta antes de o relógio chegar a zero; a resposta é sempre um número inteiro.",
    "- Fácil fica até 20, Médio junta tabuadas até 12 e somas até 30, Difícil chega a tabuadas de 20 e somas de 100.",
    "- Um ponto por cada resposta certa, sem bónus por responder depressa dentro da ronda.",
    "- A tua melhor pontuação em cada dificuldade fica neste dispositivo."
  ],
  slide: [
    "- Só se move a peça que partilha um lado com o espaço vazio; as vizinhas na diagonal não podem.",
    "- Cada baralhamento nasce de jogadas legais a partir de um tabuleiro resolvido, por isso existe sempre solução.",
    "- A tua pontuação é o número de jogadas, com o tempo como desempate, e o melhor por tamanho fica neste navegador.",
    "- Baralhar começa um tabuleiro novo, repõe os contadores e mantém o teu recorde."
  ],
  pattern: [
    "- Descobre a regra a partir dos termos mostrados e indica o seguinte como número inteiro.",
    "- Uma tentativa por sequência: uma resposta errada mostra a regra e passa à seguinte.",
    "- O teu melhor dia é o número de acertos em cinco, e a sequência conta os dias consecutivos concluídos.",
    "- Reiniciar volta a jogar as cinco sequências de hoje em vez de gerar outras novas."
  ],
  codebreak: [
    "- Adivinha o código escondido: exato conta os dígitos na posição certa e perto conta os dígitos que estão no código noutro lugar.",
    "- Os dígitos podem repetir-se nos níveis difíceis, e ao pontuar as repetições são emparelhadas uma a uma.",
    "- A tua pontuação é o número de tentativas usadas, e a melhor pontuação por dificuldade fica neste navegador.",
    "- Ficar sem tentativas revela o código, conta como derrota e não mexe na tua melhor pontuação."
  ]
};
window.MGI18N_GUIDE_POINTS = window.MGI18N_GUIDE_POINTS || {};
window.MGI18N_GUIDE_POINTS.nl = {
  sudoku: [
    "- Elke rij, elke kolom en elk blok moeten elk cijfer precies één keer bevatten.",
    "- Gouden cijfers zijn gegevens en veranderen niet; Controleren markeert fouten zonder de oplossing te verklappen.",
    "- De timer start bij je eerste invoer en stopt op het moment dat het rooster is opgelost.",
    "- Je beste tijd per moeilijkheid blijft in deze browser en verlaat het apparaat nooit."
  ],
  nonogram: [
    "- Getallen naast een rij of boven een kolom geven op volgorde de reeksen gevulde vakjes, met minstens één leeg vakje ertussen.",
    "- Markeer vakjes waarvan je hebt afgeleid dat ze leeg zijn met het kruis; een gemarkeerd vakje telt nooit als gevuld en houdt een overwinning niet tegen.",
    "- Elke indeling die aan alle rij- en kolomaanwijzingen voldoet, geldt als opgelost, want de controle gaat over de aanwijzingen.",
    "- Het dagrooster komt uit de datum, is vandaag dus voor iedereen gelijk, en de reeks telt opeenvolgende opgeloste dagen."
  ],
  merge: [
    "- Pijltjes of veegbewegingen verplaatsen alle tegels tegelijk; twee gelijke tegels die elkaar raken smelten samen tot één met de dubbele waarde.",
    "- Een zet telt alleen als een tegel van plek verandert of twee tegels samensmelten, en een tegel smelt hoogstens één keer per zet samen.",
    "- Je score is de som van elke waarde die door een samensmelting ontstaat; de beste score blijft in deze browser.",
    "- De ronde eindigt wanneer het bord vol is en geen twee buren meer gelijk zijn."
  ],
  anagram: [
    "- Elke ronde toont een aanwijzing, het aantal letters van het antwoord en de letters in willekeurige volgorde; de letters zijn precies het antwoord.",
    "- Een woord dat je zonder hulp oplost levert 100 punten op, en 75 zodra de aanwijzing is onthuld.",
    "- Een foute gok kost tijd in plaats van punten, en overslaan levert niets op maar gaat verder.",
    "- Het beste totaal over tien rondes blijft op dit apparaat."
  ],
  wordguess: [
    "- Raad een woord van vijf letters in zes pogingen; groen is de juiste letter op de juiste plek, geel de juiste letter ergens anders.",
    "- Elke gok moet een woord zijn dat het spel kent, dus het toetsenbord laat zien wanneer een invoer niet in de lijst staat.",
    "- Elk nieuw spel kiest een nieuw woord, en je reeks overwinningen blijft in deze browser.",
    "- Zijn de pogingen op, dan wordt het woord onthuld en eindigt het spel; de reeks begint opnieuw."
  ],
  crossword: [
    "- Elke aanwijzing noemt zijn lengte tussen haakjes, dus (7) betekent een antwoord van zeven letters.",
    "- Antwoorden worden vergeleken in hoofdletters zonder spaties en leestekens, dus hoofdletters en spaties maken nooit verschil.",
    "- Een goed antwoord levert tien punten op, een hint haalt drie van die aanwijzing af en overslaan levert niets op.",
    "- Je beste score blijft op dit apparaat en de ronde eindigt wanneer de klok op nul staat."
  ],
  pairs: [
    "- Draai twee kaarten tegelijk om en laat een paar open liggen als ze bij elkaar horen.",
    "- Passen ze niet, dan draaien ze meteen terug; onthouden wat je zag is het hele spel.",
    "- De ronde eindigt wanneer alle zes paren gevonden zijn; zetten en tijd worden beide geteld.",
    "- Je beste resultaat blijft in deze browser en wordt nooit geüpload."
  ],
  sequence: [
    "- De items moeten in de gevraagde volgorde worden aangeklikt: getallen oplopend, woorden alfabetisch zonder op hoofdletters te letten.",
    "- Een klik die niet het volgende item is telt als fout en het item blijft beschikbaar.",
    "- Je score is de tijd tot de finish, en de beste tijd per set en lengte blijft op dit apparaat.",
    "- Van set of lengte wisselen start meteen een nieuwe ronde."
  ],
  sort: [
    "- Elk getal of item hoort in precies één bak, namelijk die met de regel die erbij staat.",
    "- Eén punt per goede sortering en elk fout antwoord kost een punt, nooit onder nul.",
    "- Je langste goede reeks verschijnt als streak en je beste score blijft in deze browser.",
    "- De ronde eindigt bij nul op de klok en er wordt niets geüpload."
  ],
  math: [
    "- Beantwoord elke vraag voordat de klok op nul staat; het antwoord is altijd een heel getal.",
    "- Makkelijk blijft binnen 20, Gemiddeld voegt tafels tot 12 en sommen tot 30 toe, Moeilijk gaat tot tafels van 20 en sommen van 100.",
    "- Eén punt per goed antwoord, zonder bonus voor snel antwoorden binnen de ronde.",
    "- Je beste score per moeilijkheid blijft op dit apparaat."
  ],
  slide: [
    "- Alleen een tegel die een rand met het gat deelt kan bewegen; diagonale buren niet.",
    "- Elke schudbeurt komt uit toegestane zetten vanaf een opgelost bord, dus er is altijd een oplossing.",
    "- Je score is het aantal zetten, met tijd als tiebreaker, en het beste per bordgrootte blijft in deze browser.",
    "- Schudden start een nieuw bord, zet de tellers op nul en houdt je record."
  ],
  pattern: [
    "- Leid de regel af uit de getoonde termen en geef de volgende als heel getal.",
    "- Eén poging per reeks: een fout antwoord toont de regel en gaat verder naar de volgende.",
    "- Je beste dag is het aantal goede antwoorden van de vijf, en de reeks telt opeenvolgende afgeronde dagen.",
    "- Opnieuw beginnen speelt de vijf reeksen van vandaag opnieuw, in plaats van nieuwe te maken."
  ],
  codebreak: [
    "- Raad de verborgen code: exact telt cijfers op de juiste plek, bijna telt cijfers die elders in de code staan.",
    "- Op de zwaarste niveaus mogen cijfers herhalen, en bij het tellen worden herhaalde cijfers één op één gekoppeld.",
    "- Je score is het aantal gebruikte pogingen, en de laagste score per moeilijkheid blijft in deze browser.",
    "- Zijn de pogingen op, dan wordt de code onthuld, telt de ronde als verlies en blijft je beste score staan."
  ]
};
window.MGI18N_GUIDE_POINTS = window.MGI18N_GUIDE_POINTS || {};
window.MGI18N_GUIDE_POINTS.pl = {
  sudoku: [
    "- Każdy wiersz, każda kolumna i każdy blok muszą zawierać każdą cyfrę dokładnie raz.",
    "- Złote cyfry są danymi i nie zmieniają się; Sprawdź zaznacza błędy, nie zdradzając rozwiązania.",
    "- Stoper rusza przy pierwszym wpisie i zatrzymuje się w chwili rozwiązania siatki.",
    "- Twój najlepszy czas dla każdego poziomu zostaje w tej przeglądarce i nigdy nie opuszcza urządzenia."
  ],
  nonogram: [
    "- Liczby obok wiersza lub nad kolumną podają po kolei ciągi wypełnionych pól, oddzielone co najmniej jednym pustym polem.",
    "- Zaznaczaj krzyżykiem pola, o których wiesz, że są puste; zaznaczone pole nigdy nie liczy się jako wypełnione i nie blokuje zwycięstwa.",
    "- Każdy układ spełniający wszystkie wskazówki wierszy i kolumn liczy się jako rozwiązany, bo sprawdzane są wskazówki.",
    "- Dzienna siatka powstaje z daty, więc dziś jest taka sama dla wszystkich, a seria liczy kolejne rozwiązane dni."
  ],
  merge: [
    "- Strzałki lub przesunięcia przesuwają wszystkie kafelki naraz; dwa równe kafelki, które się spotkają, łączą się w jeden o podwójnej wartości.",
    "- Ruch liczy się tylko wtedy, gdy kafelek zmieni miejsce lub dwa kafelki się połączą, a każdy kafelek łączy się najwyżej raz na ruch.",
    "- Twój wynik to suma wartości powstałych z połączeń; najlepszy wynik zostaje w tej przeglądarce.",
    "- Runda kończy się, gdy plansza jest pełna i żadne dwa sąsiednie kafelki nie są równe."
  ],
  anagram: [
    "- Każda runda pokazuje wskazówkę, liczbę liter odpowiedzi i jej litery w losowej kolejności; litery to dokładnie odpowiedź.",
    "- Słowo odgadnięte bez pomocy daje 100 punktów, a po odkryciu wskazówki 75.",
    "- Błędna próba kosztuje czas, nie punkty, a pominięcie nie daje punktów, ale przechodzi dalej.",
    "- Najlepszy wynik z dziesięciu rund zostaje na tym urządzeniu."
  ],
  wordguess: [
    "- Odgadnij pięcioliterowe słowo w sześciu próbach; zielony to dobra litera na dobrym miejscu, bursztynowy dobra litera gdzie indziej.",
    "- Każda próba musi być słowem znanym grze, więc klawiatura pokazuje, gdy wpisu nie ma na liście.",
    "- Każda nowa gra losuje nowe słowo, a twoja seria zwycięstw zostaje w tej przeglądarce.",
    "- Gdy skończą się próby, słowo zostaje odkryte, a gra się kończy; seria zaczyna się od nowa."
  ],
  crossword: [
    "- Każda wskazówka podaje swoją długość w nawiasie, więc (7) oznacza odpowiedź siedmioliterową.",
    "- Odpowiedzi porównuje się wielkimi literami, bez spacji i znaków interpunkcyjnych, więc wielkość liter i odstępy nigdy nie mają znaczenia.",
    "- Poprawna odpowiedź daje dziesięć punktów, podpowiedź odejmuje trzy od tej wskazówki, a pominięcie nie daje nic.",
    "- Najlepszy wynik zostaje na tym urządzeniu, a runda kończy się, gdy zegar dojdzie do zera."
  ],
  pairs: [
    "- Odkrywaj dwie karty naraz i zostawiaj parę odkrytą, gdy obie pasują.",
    "- Jeśli nie pasują, po chwili wracają na drugą stronę, więc zapamiętanie tego, co widziałeś, to cała gra.",
    "- Runda kończy się, gdy znajdziesz wszystkie sześć par; liczone są ruchy i czas.",
    "- Twój najlepszy wynik zostaje w tej przeglądarce i nigdy nie jest wysyłany."
  ],
  sequence: [
    "- Elementy trzeba klikać w podanej kolejności: liczby rosnąco, słowa alfabetycznie bez względu na wielkość liter.",
    "- Kliknięcie, które nie jest kolejnym elementem, liczy się jako błąd, a element zostaje w puli.",
    "- Twój wynik to czas ukończenia, a najlepszy czas dla każdego zestawu i długości zostaje na tym urządzeniu.",
    "- Zmiana zestawu lub długości od razu zaczyna nową rundę."
  ],
  sort: [
    "- Każda liczba i każdy element należy do dokładnie jednego pojemnika, tego z pasującą regułą.",
    "- Punkt za każde poprawne posortowanie i punkt mniej za każdy błąd, nigdy poniżej zera.",
    "- Twoja najdłuższa poprawna seria jest pokazywana jako streak, a najlepszy wynik zostaje w tej przeglądarce.",
    "- Runda kończy się, gdy zegar dojdzie do zera, i nic nie jest nigdzie wysyłane."
  ],
  math: [
    "- Odpowiadaj na każde pytanie, zanim zegar dojdzie do zera; odpowiedź jest zawsze liczbą całkowitą.",
    "- Łatwy zostaje do 20, Średni dodaje tabliczkę do 12 i sumy do 30, Trudny sięga tabliczki 20 i sum 100.",
    "- Punkt za każdą poprawną odpowiedź, bez bonusu za szybkość w obrębie rundy.",
    "- Twój najlepszy wynik dla każdego poziomu zostaje na tym urządzeniu."
  ],
  slide: [
    "- Przesunąć można tylko kafelek stykający się bokiem z pustym polem; sąsiedzi po przekątnej nie mogą.",
    "- Każde tasowanie powstaje z legalnych ruchów z rozwiązanej planszy, więc rozwiązanie zawsze istnieje.",
    "- Twój wynik to liczba ruchów, czas rozstrzyga remisy, a najlepszy wynik dla każdego rozmiaru zostaje w tej przeglądarce.",
    "- Tasowanie zaczyna nową planszę, zeruje liczniki i zachowuje rekord."
  ],
  pattern: [
    "- Odgadnij regułę z pokazanych wyrazów i podaj następny jako liczbę całkowitą.",
    "- Jedna próba na ciąg: błędna odpowiedź pokazuje regułę i przechodzi do następnego.",
    "- Twój najlepszy dzień to liczba poprawnych odpowiedzi na pięć, a seria liczy kolejne ukończone dni.",
    "- Restart rozgrywa dzisiejsze pięć ciągów zamiast tworzyć nowe."
  ],
  codebreak: [
    "- Odgadnij ukryty kod: trafne liczy cyfry na właściwym miejscu, bliskie liczy cyfry obecne w kodzie gdzie indziej.",
    "- Na trudniejszych poziomach cyfry mogą się powtarzać, a przy punktowaniu powtórzenia łączy się jedno do jednego.",
    "- Twój wynik to liczba użytych prób, a najlepszy wynik dla każdego poziomu zostaje w tej przeglądarce.",
    "- Gdy skończą się próby, kod zostaje odkryty, runda liczy się jako przegrana, a rekord pozostaje bez zmian."
  ]
};
window.MGI18N_GUIDE_POINTS = window.MGI18N_GUIDE_POINTS || {};
window.MGI18N_GUIDE_POINTS.ru = {
  sudoku: [
    "- В каждой строке, каждом столбце и каждом блоке каждая цифра должна встречаться ровно один раз.",
    "- Золотые цифры заданы и не меняются; Проверить отмечает ошибки, не раскрывая решение.",
    "- Таймер запускается с первого ввода и останавливается в момент, когда сетка решена.",
    "- Лучшее время для каждого уровня сложности хранится в этом браузере и не покидает устройство."
  ],
  nonogram: [
    "- Числа рядом со строкой или над столбцом по порядку задают серии заполненных клеток с хотя бы одной пустой клеткой между ними.",
    "- Отмечайте крестиком клетки, которые вы определили как пустые; отмеченная клетка никогда не считается заполненной и не мешает победе.",
    "- Любая расстановка, удовлетворяющая всем подсказкам строк и столбцов, считается решением, потому что проверяются подсказки.",
    "- Ежедневная сетка строится из даты, поэтому сегодня она одинакова у всех, а серия считает подряд решённые дни."
  ],
  merge: [
    "- Стрелки или свайпы двигают все плитки сразу; две одинаковые плитки при встрече сливаются в одну с удвоенным значением.",
    "- Ход засчитывается, только если плитка сдвинулась или две слились, и каждая плитка сливается не более одного раза за ход.",
    "- Ваш счёт — сумма всех значений, полученных при слияниях; лучший счёт хранится в этом браузере.",
    "- Раунд заканчивается, когда поле заполнено и двух одинаковых соседей больше нет."
  ],
  anagram: [
    "- В каждом раунде показаны подсказка, число букв в ответе и сами буквы в случайном порядке; буквы — это ровно ответ.",
    "- Слово, разгаданное без помощи, даёт 100 очков, а после раскрытия подсказки — 75.",
    "- Ошибка стоит времени, а не очков, а пропуск не даёт очков, но переводит дальше.",
    "- Лучшая сумма за десять раундов хранится на этом устройстве."
  ],
  wordguess: [
    "- Угадайте слово из пяти букв за шесть попыток; зелёный — буква на своём месте, жёлтый — буква есть, но в другом месте.",
    "- Каждая попытка должна быть словом, которое знает игра, поэтому клавиатура подскажет, если ввода нет в списке.",
    "- Каждая новая игра выбирает новое слово, а серия побед хранится в этом браузере.",
    "- Когда попытки кончаются, слово раскрывается и игра завершается; серия начинается заново."
  ],
  crossword: [
    "- Каждая подсказка указывает длину ответа в скобках, поэтому (7) значит ответ из семи букв.",
    "- Ответы сравниваются заглавными буквами без пробелов и знаков препинания, так что регистр и пробелы никогда не важны.",
    "- Верный ответ даёт десять очков, подсказка снимает три с этой подсказки, а пропуск не даёт ничего.",
    "- Лучший счёт хранится на этом устройстве, а раунд заканчивается, когда таймер доходит до нуля."
  ],
  pairs: [
    "- Открывайте по две карты и оставляйте пару открытой, если карты совпали.",
    "- Если не совпали, карты быстро закрываются обратно, поэтому запоминать увиденное — суть игры.",
    "- Раунд заканчивается, когда найдены все шесть пар; считаются ходы и время.",
    "- Лучший результат хранится в этом браузере и никуда не отправляется."
  ],
  sequence: [
    "- Элементы нужно нажимать в заданном порядке: числа по возрастанию, слова по алфавиту без учёта регистра.",
    "- Нажатие не на следующий элемент считается ошибкой, а элемент остаётся в наборе.",
    "- Ваш счёт — время до финиша, а лучшее время для каждого набора и длины хранится на этом устройстве.",
    "- Смена набора или длины сразу начинает новый раунд."
  ],
  sort: [
    "- Каждое число или элемент принадлежит ровно одному контейнеру — тому, чьё правило указано.",
    "- Очко за каждую верную сортировку и минус очко за каждую ошибку, но не ниже нуля.",
    "- Самая длинная верная серия показывается как серия, а лучший счёт хранится в этом браузере.",
    "- Раунд заканчивается на нуле таймера, и ничего никуда не отправляется."
  ],
  math: [
    "- Отвечайте на каждый вопрос, пока таймер не дошёл до нуля; ответ всегда целое число.",
    "- Лёгкий остаётся в пределах 20, Средний добавляет таблицу до 12 и суммы до 30, Сложный доходит до таблицы 20 и сумм до 100.",
    "- Очко за каждый верный ответ, без бонуса за скорость внутри раунда.",
    "- Лучший счёт для каждого уровня сложности хранится на этом устройстве."
  ],
  slide: [
    "- Двигается только плитка, имеющая общую сторону с пустым местом; соседи по диагонали — нет.",
    "- Каждое перемешивание строится из разрешённых ходов с решённого поля, поэтому решение существует всегда.",
    "- Ваш счёт — число ходов, время решает при равенстве, а лучшее для каждого размера поля хранится в этом браузере.",
    "- Перемешивание начинает новое поле, сбрасывает счётчики и сохраняет рекорд."
  ],
  pattern: [
    "- Определите правило по показанным членам и введите следующий как целое число.",
    "- Одна попытка на последовательность: неверный ответ показывает правило и переходит к следующей.",
    "- Лучший день — число верных ответов из пяти, а серия считает подряд завершённые дни.",
    "- Перезапуск заново проигрывает пять сегодняшних последовательностей, а не создаёт новые."
  ],
  codebreak: [
    "- Угадайте скрытый код: «точно» считает цифры на своих местах, «рядом» — цифры, которые есть в коде в другом месте.",
    "- На сложных уровнях цифры могут повторяться, и при подсчёте повторяющиеся цифры сопоставляются один к одному.",
    "- Ваш счёт — число использованных попыток, а лучший результат для каждого уровня хранится в этом браузере.",
    "- Когда попытки кончаются, код раскрывается, раунд считается проигранным, а рекорд остаётся прежним."
  ]
};
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
    "- Ok tuşları veya kaydırma tüm taşları birlikte kaydırır; karşılaşan iki eşit taş, değeri iki katı olan tek taşa birleşir.",
    "- Bir hamle ancak bir taş yer değiştirirse ya da iki taş birleşirse sayılır ve bir taş hamlede en fazla bir kez birleşir.",
    "- Puanın, birleşmelerle oluşan tüm değerlerin toplamıdır; en iyi puan bu tarayıcıda saklanır.",
    "- Tur, tahta dolduğunda ve komşu iki taş eşit olmadığında biter."
  ],
  anagram: [
    "- Her tur bir ipucu, cevabın harf sayısı ve harflerin karışık hâli gösterilir; harfler tam olarak cevaptır.",
    "- Yardımsız çözülen kelime 100 puan, ipucu açıldıysa 75 puan kazandırır.",
    "- Yanlış tahmin puan değil süre kaybettirir; atlamak puan vermez ama sıradakine geçer.",
    "- On turun en iyi toplamı bu cihazda saklanır."
  ],
  wordguess: [
    "- Beş harfli bir kelimeyi altı denemede tahmin et; yeşil doğru harfin doğru yerde olduğunu, sarı doğru harfin başka yerde olduğunu gösterir.",
    "- Her tahmin oyunun tanıdığı bir kelime olmalıdır; klavye, giriş listede yoksa bunu gösterir.",
    "- Her yeni oyun yeni bir kelime seçer ve kazanma serin bu tarayıcıda saklanır.",
    "- Denemeler bitince kelime açıklanır ve oyun biter; seri baştan başlar."
  ],
  crossword: [
    "- Her ipucu uzunluğunu parantez içinde verir, yani (7) yedi harfli bir cevap demektir.",
    "- Cevaplar büyük harflerle, boşluk ve noktalama olmadan karşılaştırılır; büyük-küçük harf ve boşluk hiç önemli değildir.",
    "- Doğru cevap on puan kazandırır, ipucu o ipucundan üç puan düşer, atlamak puan vermez.",
    "- En iyi puanın bu cihazda saklanır ve tur, süre sıfıra geldiğinde biter."
  ],
  pairs: [
    "- Bir seferde iki kart çevir ve eşleşen çifti açık bırak.",
    "- Eşleşmezlerse kartlar hemen geri kapanır, bu yüzden gördüğünü hatırlamak oyunun tamamıdır.",
    "- Tur, altı çiftin hepsi bulunduğunda biter; hem hamle hem süre sayılır.",
    "- En iyi sonucun bu tarayıcıda saklanır ve hiçbir yere yüklenmez."
  ],
  sequence: [
    "- Öğelere istenen sırayla tıklanmalıdır: sayılar artan, kelimeler büyük-küçük harf gözetmeden alfabetik.",
    "- Sıradaki öğe olmayan bir tıklama hata sayılır ve öğe havuzda kalır.",
    "- Puanın bitirme sürendir ve her küme ile uzunluk için en iyi süre bu cihazda saklanır.",
    "- Kümeyi veya uzunluğu değiştirmek hemen yeni bir tur başlatır."
  ],
  sort: [
    "- Her sayı ya da öğe, üzerinde yazan kurala uyan tek bir kutuya aittir.",
    "- Doğru her sıralama bir puan, her hata bir puan eksiltir ve puan sıfırın altına inmez.",
    "- En uzun doğru serin seri olarak gösterilir ve en iyi puanın bu tarayıcıda saklanır.",
    "- Tur, süre sıfıra geldiğinde biter ve hiçbir şey bir yere yüklenmez."
  ],
  math: [
    "- Süre sıfıra gelmeden her soruyu yanıtla; cevap her zaman tam sayıdır.",
    "- Kolay 20'ye kadar kalır, Orta 12'ye kadar çarpım tablosu ve 30'a kadar toplama ekler, Zor 20'lik tabloya ve 100'e kadar toplamlara çıkar.",
    "- Her doğru cevap bir puan, tur içinde hızlı yanıt için ek puan yok.",
    "- Her zorluktaki en iyi puanın bu cihazda saklanır."
  ],
  slide: [
    "- Yalnızca boşlukla kenar paylaşan taş hareket edebilir; çapraz komşular hareket edemez.",
    "- Her karıştırma çözülmüş tahtadan geçerli hamlelerle üretilir, yani çözüm her zaman vardır.",
    "- Puanın hamle sayısıdır, eşitlikte süre belirleyicidir ve her tahta boyutunun en iyisi bu tarayıcıda saklanır.",
    "- Karıştırma yeni bir tahta başlatır, sayaçları sıfırlar ve rekorunu korur."
  ],
  pattern: [
    "- Gösterilen terimlerden kuralı bul ve sıradaki terimi tam sayı olarak yaz.",
    "- Her dizi için tek deneme: yanlış cevap kuralı gösterir ve sıradakine geçer.",
    "- En iyi günün beş üzerinden doğru sayısıdır ve seri, üst üste tamamlanan günleri sayar.",
    "- Yeniden başlatmak bugünün beş dizisini tekrar oynatır, yenisini üretmez."
  ],
  codebreak: [
    "- Gizli kodu tahmin et: tam, doğru konumdaki rakamları; yakın, kodda başka yerde bulunan rakamları sayar.",
    "- Zor seviyelerde rakamlar tekrar edebilir ve puanlamada tekrarlar bire bir eşleştirilir.",
    "- Puanın kullanılan tahmin sayısıdır ve her zorluktaki en düşük puan bu tarayıcıda saklanır.",
    "- Denemeler bitince kod açıklanır, tur kayıp sayılır ve en iyi puanın değişmez."
  ]
};
window.MGI18N_GUIDE_POINTS = window.MGI18N_GUIDE_POINTS || {};
window.MGI18N_GUIDE_POINTS.ar = {
  sudoku: [
    "- يجب أن يحتوي كل صف وكل عمود وكل مربع على كل رقم مرة واحدة بالضبط.",
    "- الأرقام الذهبية معطاة ولا تتغير، و«تحقق» يعلّم الأخطاء من دون كشف الحل.",
    "- تبدأ الساعة مع أول إدخال لك وتتوقف في اللحظة التي تُحل فيها الشبكة.",
    "- أفضل وقت لكل مستوى صعوبة يُحفظ في هذا المتصفح ولا يغادر الجهاز أبدًا."
  ],
  nonogram: [
    "- الأرقام بجانب الصف أو فوق العمود تذكر بالترتيب مجاميع الخلايا المملوءة، مع خلية فارغة واحدة على الأقل بين كل مجموعتين.",
    "- علّم بالعلامة × الخلايا التي استنتجت أنها فارغة؛ الخلية المعلّمة لا تُحسب مملوءة ولا تمنع الفوز.",
    "- أي ترتيب يحقق جميع تلميحات الصفوف والأعمدة يُعتبر حلًا، لأن التحقق يجري على التلميحات.",
    "- شبكة اليوم تُولّد من التاريخ، فهي اليوم واحدة للجميع، والسلسلة تحسب الأيام المتتابعة التي حُلّت."
  ],
  merge: [
    "- الأسهم أو السحب تحرّك كل البلاطات معًا، وبلاطتان متساويتان تلتقيان تندمجان في بلاطة بقيمة مضاعفة.",
    "- لا تُحسب الحركة إلا إذا تغيّر موضع بلاطة أو اندمجت بلاطتان، والبلاطة تندمج مرة واحدة على الأكثر في الحركة.",
    "- نتيجتك هي مجموع كل قيمة ناتجة عن اندماج، وأفضل نتيجة تُحفظ في هذا المتصفح.",
    "- تنتهي الجولة عندما تمتلئ اللوحة ولا يبقى جارَان متساويان."
  ],
  anagram: [
    "- كل جولة تعرض تلميحًا وعدد حروف الجواب وحروفه بترتيب عشوائي، والحروف هي الجواب نفسه بلا زيادة أو نقص.",
    "- الكلمة التي تُحل بلا مساعدة تساوي 100 نقطة، و75 بعد كشف التلميح.",
    "- المحاولة الخاطئة تكلّف وقتًا لا نقاطًا، والتخطي لا يمنح نقاطًا لكنه ينتقل إلى التالي.",
    "- أفضل مجموع على عشر جولات يُحفظ على هذا الجهاز."
  ],
  wordguess: [
    "- خمّن كلمة من خمسة حروف في ست محاولات؛ الأخضر حرف صحيح في المكان الصحيح والأصفر حرف صحيح في مكان آخر.",
    "- كل محاولة يجب أن تكون كلمة يعرفها اللعبة، ولوحة المفاتيح تنبّهك إذا لم يكن الإدخال في القائمة.",
    "- كل لعبة جديدة تختار كلمة جديدة، وسلسلة انتصاراتك تُحفظ في هذا المتصفح.",
    "- إذا نفدت المحاولات تُكشف الكلمة وتنتهي الجولة، وتبدأ السلسلة من جديد."
  ],
  crossword: [
    "- كل تلميح يذكر طول الجواب بين قوسين، فـ(7) تعني جوابًا من سبعة حروف.",
    "- تُقارن الأجوبة بحروف كبيرة من دون مسافات ولا علامات ترقيم، فلا يهم شكل الحروف ولا التباعد.",
    "- الجواب الصحيح يمنح عشر نقاط، والتلميح يخصم ثلاثًا من ذلك التلميح، والتخطي لا يمنح شيئًا.",
    "- أفضل نتيجة تُحفظ على هذا الجهاز، وتنتهي الجولة عندما تصل الساعة إلى الصفر."
  ],
  pairs: [
    "- اقلب بطاقتين في المرة واترك الزوج مكشوفًا عندما تتطابق البطاقتان.",
    "- إذا لم تتطابقا تعودان مغلقتين بعد لحظة، لذا تذكّر ما رأيته هو اللعبة كلها.",
    "- تنتهي الجولة عند مطابقة الأزواج الستة كلها، ويُحسب عدد الحركات والوقت معًا.",
    "- أفضل نتيجة لك تُحفظ في هذا المتصفح ولا تُرفع إلى أي مكان."
  ],
  sequence: [
    "- يجب النقر على العناصر بالترتيب المطلوب: الأرقام تصاعديًا والكلمات أبجديًا دون اعتبار لحالة الحروف.",
    "- النقر على عنصر ليس التالي يُحسب خطأ ويبقى العنصر متاحًا.",
    "- نتيجتك هي زمن الإنهاء، وأفضل زمن لكل مجموعة وطول يُحفظ على هذا الجهاز.",
    "- تغيير المجموعة أو الطول يبدأ جولة جديدة فورًا."
  ],
  sort: [
    "- كل رقم أو عنصر ينتمي إلى صندوق واحد فقط، وهو الصندوق المكتوب عليه القاعدة المناسبة.",
    "- نقطة لكل فرز صحيح، وكل خطأ يخصم نقطة ولا ينزل تحت الصفر.",
    "- أطول سلسلة صحيحة تظهر كسلسلة إنجاز، وأفضل نتيجة تُحفظ في هذا المتصفح.",
    "- تنتهي الجولة عند وصول الساعة إلى الصفر، ولا يُرفع أي شيء إلى أي مكان."
  ],
  math: [
    "- أجب عن كل سؤال قبل أن تصل الساعة إلى الصفر، والجواب دائمًا عدد صحيح.",
    "- السهل يبقى حتى 20، والمتوسط يضيف جدول الضرب حتى 12 والمجاميع حتى 30، والصعب يصل إلى جدول 20 ومجاميع 100.",
    "- نقطة لكل جواب صحيح، من دون مكافأة للسرعة داخل الجولة.",
    "- أفضل نتيجة لكل مستوى صعوبة تُحفظ على هذا الجهاز."
  ],
  slide: [
    "- لا تتحرك إلا البلاطة التي تشترك في ضلع مع الفراغ، أما الجيران القطريون فلا.",
    "- كل خلط يُنتج بحركات مشروعة من لوحة محلولة، لذا يوجد حل دائمًا.",
    "- نتيجتك هي عدد الحركات، والوقت يفصل عند التعادل، وأفضل نتيجة لكل حجم لوحة تُحفظ في هذا المتصفح.",
    "- الخلط يبدأ لوحة جديدة ويعيد ضبط العدادات ويحفظ رقمك القياسي."
  ],
  pattern: [
    "- استنتج القاعدة من الحدود المعروضة ثم اكتب الحد التالي كعدد صحيح.",
    "- محاولة واحدة لكل متتالية: الجواب الخاطئ يعرض القاعدة وينتقل إلى التالية.",
    "- أفضل يوم لك هو عدد الأجوبة الصحيحة من خمسة، والسلسلة تحسب الأيام المتتابعة التي أكملتها.",
    "- إعادة البدء تعيد لعب متتاليات اليوم الخمس بدلًا من توليد غيرها."
  ],
  codebreak: [
    "- خمّن الرمز المخفي: «مطابق» يحسب الأرقام في الموضع الصحيح، و«قريب» يحسب الأرقام الموجودة في الرمز في موضع آخر.",
    "- يمكن أن تتكرر الأرقام في المستويات الأصعب، وعند الحساب تُطابق الأرقام المتكررة واحدًا بواحد.",
    "- نتيجتك هي عدد المحاولات المستخدمة، وأفضل نتيجة لكل مستوى صعوبة تُحفظ في هذا المتصفح.",
    "- إذا نفدت المحاولات يُكشف الرمز وتُحسب الجولة خسارة ولا تتغير أفضل نتيجة لك."
  ]
};
window.MGI18N_GUIDE_POINTS = window.MGI18N_GUIDE_POINTS || {};
window.MGI18N_GUIDE_POINTS.he = {
  sudoku: [
    "- כל שורה, כל עמודה וכל בלוק חייבים להכיל כל ספרה בדיוק פעם אחת.",
    "- הספרות הזהובות נתונות ואינן משתנות; בדיקה מסמנת טעויות בלי לחשוף את הפתרון.",
    "- השעון מתחיל בהזנה הראשונה ועוצר ברגע שהלוח נפתר.",
    "- הזמן הטוב ביותר לכל רמת קושי נשמר בדפדפן הזה ולא עוזב את המכשיר."
  ],
  nonogram: [
    "- המספרים לצד שורה או מעל עמודה מפרטים לפי הסדר את רצפי התאים המלאים, עם לפחות תא ריק אחד בין רצף לרצף.",
    "- סמנו באיקס תאים שהסקתם שהם ריקים; תא מסומן לא נחשב מלא ולעולם לא מונע ניצחון.",
    "- כל סידור שמקיים את כל רמזי השורות והעמודות נחשב לפתור, כי הבדיקה היא על הרמזים.",
    "- לוח היום נוצר מהתאריך, ולכן היום הוא זהה לכולם, והרצף סופר ימים רצופים שנפתרו."
  ],
  merge: [
    "- מקשי החצים או החלקה מזיזים את כל האריחים יחד; שני אריחים שווים שנפגשים מתמזגים לאריח בעל ערך כפול.",
    "- מהלך נחשב רק אם אריח משנה מקום או שני אריחים מתמזגים, וכל אריח מתמזג לכל היותר פעם אחת במהלך.",
    "- הניקוד שלכם הוא סכום כל הערכים שנוצרו במיזוג; הניקוד הטוב נשמר בדפדפן הזה.",
    "- הסיבוב נגמר כשהלוח מלא ואין שני שכנים שווים."
  ],
  anagram: [
    "- כל סיבוב מציג רמז, את מספר האותיות בתשובה ואת האותיות בסדר אקראי; האותיות הן בדיוק התשובה.",
    "- מילה שנפתרה בלי עזרה שווה 100 נקודות, ו-75 אחרי גילוי הרמז.",
    "- ניחוש שגוי עולה זמן ולא נקודות, ודילוג לא מזכה בנקודות אך עובר הלאה.",
    "- הסכום הטוב ביותר על פני עשרה סיבובים נשמר במכשיר הזה."
  ],
  wordguess: [
    "- נחשו מילה בת חמש אותיות בשש ניסיונות; ירוק הוא אות נכונה במקום הנכון, ענבר הוא אות נכונה במקום אחר.",
    "- כל ניחוש חייב להיות מילה שהמשחק מכיר, ולכן המקלדת מראה לכם כשההזנה אינה ברשימה.",
    "- כל משחק חדש בוחר מילה חדשה, ורצף הניצחונות שלכם נשמר בדפדפן הזה.",
    "- כשהניסיונות נגמרים המילה נחשפת והמשחק נגמר; הרצף מתחיל מחדש."
  ],
  crossword: [
    "- כל רמז מציין את אורך התשובה בסוגריים, כך ש-(7) פירושו תשובה בת שבע אותיות.",
    "- תשובות מושוות באותיות גדולות בלי רווחים ובלי סימני פיסוק, ולכן האותיות הגדולות והרווחים לא משנים לעולם.",
    "- תשובה נכונה מזכה בעשר נקודות, רמז מוריד שלוש מאותו רמז, ודילוג לא מזכה בכלום.",
    "- הניקוד הטוב נשמר במכשיר הזה, והסיבוב נגמר כשהשעון מגיע לאפס."
  ],
  pairs: [
    "- הפכו שני קלפים בכל פעם והשאירו זוג גלוי כששניהם מתאימים.",
    "- אם אינם מתאימים הם מתהפכים חזרה מיד, ולכן לזכור מה ראיתם זה כל המשחק.",
    "- הסיבוב נגמר כשכל ששת הזוגות נמצאו; גם המהלכים וגם הזמן נספרים.",
    "- התוצאה הטובה שלכם נשמרת בדפדפן הזה ואינה נשלחת לשום מקום."
  ],
  sequence: [
    "- יש ללחוץ על הפריטים לפי הסדר הנדרש: מספרים בסדר עולה, מילים לפי א״ב בלי להתחשב באותיות גדולות.",
    "- לחיצה שאינה הפריט הבא נחשבת טעות והפריט נשאר במאגר.",
    "- הניקוד שלכם הוא הזמן עד הסיום, והזמן הטוב לכל קבוצה ואורך נשמר במכשיר הזה.",
    "- החלפת קבוצה או אורך מתחילה מיד סיבוב חדש."
  ],
  sort: [
    "- כל מספר או פריט שייך לתא אחד בלבד, זה שמופיעה עליו ההתאמה.",
    "- נקודה על כל מיון נכון, וכל טעות מורידה נקודה ולעולם לא מתחת לאפס.",
    "- הרצף הנכון הארוך ביותר מוצג כרצף, והניקוד הטוב נשמר בדפדפן הזה.",
    "- הסיבוב נגמר כשהשעון מגיע לאפס, ושום דבר לא נשלח לשום מקום."
  ],
  math: [
    "- ענו על כל שאלה לפני שהשעון מגיע לאפס; התשובה היא תמיד מספר שלם.",
    "- קל נשאר עד 20, בינוני מוסיף לוחות כפל עד 12 וסכומים עד 30, קשה מגיע ללוחות של 20 ולסכומים של 100.",
    "- נקודה על כל תשובה נכונה, בלי בונוס על מהירות בתוך הסיבוב.",
    "- הניקוד הטוב לכל רמת קושי נשמר במכשיר הזה."
  ],
  slide: [
    "- רק אריח שחולק צלע עם החלל יכול לזוז; שכנים באלכסון לא.",
    "- כל ערבוב נוצר ממהלכים חוקיים מלוח פתור, ולכן תמיד קיים פתרון.",
    "- הניקוד שלכם הוא מספר המהלכים, והזמן מכריע בשוויון, והטוב לכל גודל לוח נשמר בדפדפן הזה.",
    "- ערבוב מתחיל לוח חדש, מאפס את המונים ושומר על השיא."
  ],
  pattern: [
    "- גלו את החוק מהאיברים המוצגים ותנו את האיבר הבא כמספר שלם.",
    "- ניסיון אחד לכל סדרה: תשובה שגויה מציגה את החוק ועוברת לבאה.",
    "- היום הטוב שלכם הוא מספר התשובות הנכונות מתוך חמש, והרצף סופר ימים רצופים שהשלמתם.",
    "- התחלה מחדש משחקת שוב את חמש הסדרות של היום במקום ליצור חדשות."
  ],
  codebreak: [
    "- נחשו את הקוד המוסתר: מדויק סופר ספרות במקום הנכון, וקרוב סופר ספרות שנמצאות בקוד במקום אחר.",
    "- ברמות הקשות ספרות יכולות לחזור, ובחישוב הניקוד חזרות מותאמות אחת לאחת.",
    "- הניקוד שלכם הוא מספר הניחושים, והניקוד הנמוך לכל רמת קושי נשמר בדפדפן הזה.",
    "- כשהניחושים נגמרים הקוד נחשף, הסיבוב נחשב הפסד והשיא שלכם לא משתנה."
  ]
};
window.MGI18N_GUIDE_POINTS = window.MGI18N_GUIDE_POINTS || {};
window.MGI18N_GUIDE_POINTS.fa = {
  sudoku: [
    "- هر سطر، هر ستون و هر مربع باید هر رقم را دقیقاً یک بار داشته باشد.",
    "- رقم‌های طلایی داده‌شده‌اند و تغییر نمی‌کنند؛ «بررسی» خطاها را بدون لو دادن جواب نشان می‌دهد.",
    "- زمان‌سنج با اولین ورودی تو شروع می‌شود و همان لحظه‌ای که جدول حل شد می‌ایستد.",
    "- بهترین زمان هر سطح سختی در همین مرورگر می‌ماند و هرگز از دستگاه خارج نمی‌شود."
  ],
  nonogram: [
    "- عددهای کنار سطر یا بالای ستون به ترتیب طول دسته‌های خانه‌های پر را می‌گویند، با دست‌کم یک خانه خالی بین دسته‌ها.",
    "- خانه‌هایی را که ثابت کردی خالی‌اند با ضربدر علامت بزن؛ خانه علامت‌خورده هرگز پر حساب نمی‌شود و مانع برد نمی‌شود.",
    "- هر چیدمانی که همهٔ راهنماهای سطرها و ستون‌ها را برآورده کند حل‌شده حساب می‌شود، چون بررسی روی راهنماهاست.",
    "- جدول روزانه از تاریخ ساخته می‌شود، پس امروز برای همه یکی است و زنجیره، روزهای پی‌درپی حل‌شده را می‌شمارد."
  ],
  merge: [
    "- کلیدهای جهت یا کشیدن، همهٔ کاشی‌ها را با هم جابه‌جا می‌کند؛ دو کاشی برابر که به هم برسند در یکی با ارزش دوبرابر ادغام می‌شوند.",
    "- حرکت فقط وقتی حساب می‌شود که کاشی‌ای جابه‌جا شود یا دو کاشی ادغام شوند، و هر کاشی در هر حرکت حداکثر یک بار ادغام می‌شود.",
    "- امتیاز تو مجموع ارزش‌هایی است که از ادغام‌ها ساخته می‌شود؛ بهترین امتیاز در همین مرورگر می‌ماند.",
    "- دور وقتی تمام می‌شود که صفحه پر شود و دو همسایهٔ برابر باقی نماند."
  ],
  anagram: [
    "- هر دور یک راهنما، تعداد حروف جواب و حروف آن را به ترتیب تصادفی نشان می‌دهد؛ حروف دقیقاً همان جواب‌اند.",
    "- واژه‌ای که بدون کمک حل شود ۱۰۰ امتیاز دارد و با آشکار شدن راهنما ۷۵ امتیاز.",
    "- حدس اشتباه به‌جای امتیاز، زمان می‌گیرد و رد کردن امتیاز ندارد اما به بعدی می‌رود.",
    "- بهترین مجموع در ده دور روی همین دستگاه می‌ماند."
  ],
  wordguess: [
    "- واژه‌ای پنج‌حرفی را در شش تلاش حدس بزن؛ سبز یعنی حرف درست در جای درست و کهربایی یعنی حرف درست در جای دیگر.",
    "- هر حدس باید واژه‌ای باشد که بازی می‌شناسد، پس صفحه‌کلید خبر می‌دهد که ورودی در فهرست نیست.",
    "- هر بازی تازه واژهٔ تازه‌ای برمی‌دارد و زنجیرهٔ بردهایت در همین مرورگر می‌ماند.",
    "- با تمام شدن تلاش‌ها واژه آشکار می‌شود و بازی 끝 می‌یابد؛ زنجیره از نو شروع می‌شود."
  ],
  crossword: [
    "- هر راهنما طول جواب را در پرانتز می‌آورد، پس (7) یعنی جوابی هفت‌حرفی.",
    "- جواب‌ها با حروف بزرگ و بدون فاصله و نقطه‌گذاری مقایسه می‌شوند، پس بزرگی حروف و فاصله هیچ‌وقت مهم نیست.",
    "- جواب درست ده امتیاز دارد، راهنما سه امتیاز از همان راهنما کم می‌کند و رد کردن امتیازی ندارد.",
    "- بهترین امتیاز روی همین دستگاه می‌ماند و دور با رسیدن زمان‌سنج به صفر تمام می‌شود."
  ],
  pairs: [
    "- هر بار دو کارت را برگردان و اگر جفت بودند آن را رو باز بگذار.",
    "- اگر جفت نبودند کارت‌ها بلافاصله برمی‌گردند، پس به یاد سپردن آنچه دیدی تمام بازی است.",
    "- دور وقتی تمام می‌شود که هر شش جفت پیدا شوند؛ هم حرکت‌ها و هم زمان شمرده می‌شوند.",
    "- بهترین نتیجه‌ات در همین مرورگر ذخیره می‌شود و جایی بارگذاری نمی‌شود."
  ],
  sequence: [
    "- باید روی آیتم‌ها به ترتیب خواسته‌شده کلیک کنی: عددها صعودی و واژه‌ها الفبایی بدون توجه به بزرگی حروف.",
    "- کلیکی که آیتم بعدی نباشد خطا حساب می‌شود و آیتم در مجموعه می‌ماند.",
    "- امتیاز تو زمان پایان است و بهترین زمان هر مجموعه و طول روی همین دستگاه می‌ماند.",
    "- تغییر مجموعه یا طول بی‌درنگ دور تازه‌ای شروع می‌کند."
  ],
  sort: [
    "- هر عدد یا آیتم فقط به یک سبد تعلق دارد، سبدی که قاعدهٔ آن نوشته شده است.",
    "- یک امتیاز برای هر دسته‌بندی درست و یک امتیاز کم برای هر خطا، هرگز زیر صفر نمی‌رود.",
    "- طولانی‌ترین زنجیرهٔ درست به‌عنوان زنجیره نشان داده می‌شود و بهترین امتیاز در همین مرورگر می‌ماند.",
    "- دور با رسیدن زمان‌سنج به صفر تمام می‌شود و هیچ چیز جایی بارگذاری نمی‌شود."
  ],
  math: [
    "- پیش از رسیدن زمان‌سنج به صفر به هر پرسش جواب بده؛ جواب همیشه عدد صحیح است.",
    "- آسان تا ۲۰ می‌ماند، متوسط جدول ضرب تا ۱۲ و جمع تا ۳۰ را اضافه می‌کند، سخت به جدول ۲۰ و جمع‌های ۱۰۰ می‌رسد.",
    "- یک امتیاز برای هر جواب درست، بدون پاداش برای سرعت درون دور.",
    "- بهترین امتیاز هر سطح سختی روی همین دستگاه می‌ماند."
  ],
  slide: [
    "- فقط کاشی‌ای که یک ضلع با خانهٔ خالی مشترک دارد می‌تواند حرکت کند؛ همسایه‌های قطری نمی‌توانند.",
    "- هر بر‌زدن از حرکت‌های مجاز روی صفحهٔ حل‌شده ساخته می‌شود، پس همیشه راه‌حلی وجود دارد.",
    "- امتیاز تو تعداد حرکت‌هاست و زمان در تساوی تعیین‌کننده است، و بهترین نتیجهٔ هر اندازه صفحه در همین مرورگر می‌ماند.",
    "- بر‌زدن صفحهٔ تازه‌ای شروع می‌کند، شمارنده‌ها را صفر می‌کند و رکوردت را نگه می‌دارد."
  ],
  pattern: [
    "- قاعده را از جمله‌های نشان‌داده‌شده پیدا کن و جملهٔ بعدی را به‌صورت عدد صحیح بنویس.",
    "- یک تلاش برای هر دنباله: جواب اشتباه قاعده را نشان می‌دهد و به بعدی می‌رود.",
    "- بهترین روزت تعداد جواب‌های درست از پنج است و زنجیره، روزهای پی‌درپی کامل‌شده را می‌شمارد.",
    "- شروع دوباره همان پنج دنبالهٔ امروز را بازی می‌کند، نه دنباله‌های تازه."
  ],
  codebreak: [
    "- رمز پنهان را حدس بزن: «دقیق» رقم‌های در جای درست را می‌شمارد و «نزدیک» رقم‌هایی را که در رمز جای دیگری‌اند.",
    "- در سطح‌های سخت رقم‌ها می‌توانند تکرار شوند و هنگام امتیازدهی تکرارها یک‌به‌یک جفت می‌شوند.",
    "- امتیاز تو تعداد حدس‌های مصرف‌شده است و بهترین امتیاز هر سطح سختی در همین مرورگر می‌ماند.",
    "- با تمام شدن حدس‌ها رمز آشکار می‌شود، دور باخت حساب می‌شود و بهترین امتیازت دست نمی‌خورد."
  ]
};
window.MGI18N_GUIDE_POINTS = window.MGI18N_GUIDE_POINTS || {};
window.MGI18N_GUIDE_POINTS.zh = {
  sudoku: [
    "- 每一行、每一列和每一宫都必须让每个数字恰好出现一次。",
    "- 金色数字是题目给定的，不能更改；检查只会标出错误，不会揭示答案。",
    "- 计时从你第一次输入开始，在格子解出的那一刻停止。",
    "- 每个难度的最佳用时保存在本浏览器中，不会离开这台设备。"
  ],
  nonogram: [
    "- 行旁或列上的数字按顺序给出连续填满的格数，各组之间至少隔一个空格。",
    "- 已经推断为空白的格子请用叉号标记；标记的格子不会算作填满，也不会妨碍获胜。",
    "- 只要满足所有行、列提示的排布都算解出，因为检查依据的是提示而不是唯一的答案。",
    "- 每日棋盘由日期生成，所以今天所有人拿到的是同一盘，连续天数按连续完成的天数计算。"
  ],
  merge: [
    "- 方向键或滑动会同时移动所有方块；两个相同数字相遇会合并成数值翻倍的方块。",
    "- 只有方块发生移动或两个方块合并才算一步，而且每个方块每步最多合并一次。",
    "- 得分是每次合并产生数值的总和，最佳得分保存在本浏览器中。",
    "- 当棋盘填满且相邻方块都不相同时，本局结束。"
  ],
  anagram: [
    "- 每轮给出一个提示、答案的字母数以及打乱的字母，字母正好就是答案。",
    "- 不看提示解出的单词得 100 分，提示揭开后得 75 分。",
    "- 猜错只会花时间，不会扣分；跳过不得分，但会进入下一题。",
    "- 十轮的总分最高纪录保存在这台设备上。"
  ],
  wordguess: [
    "- 六次机会猜出五个字母的单词；绿色表示字母正确且位置正确，黄色表示字母正确但位置不对。",
    "- 每次猜测必须是游戏认识的单词，所以当输入不在词表中时键盘会提示你。",
    "- 每局都会换一个新单词，连胜纪录保存在本浏览器中。",
    "- 机会用完会公布答案并结束本局，连胜纪录清零。"
  ],
  crossword: [
    "- 每个提示都在括号里标明长度，所以 (7) 表示答案有七个字母。",
    "- 答案比较时会转为大写并去掉空格和标点，因此大小写和空格从来不影响对错。",
    "- 答对一题得十分，使用一次提示会从该题扣三分，跳过不得分。",
    "- 最佳得分保存在这台设备上，计时归零时本局结束。"
  ],
  pairs: [
    "- 每次翻开两张牌，两张相同时就把这对牌正面朝上留着。",
    "- 不相同时牌会很快翻回去，所以记住看过的牌就是整个游戏。",
    "- 六对牌全部配对后本局结束，步数和时间都会被记录。",
    "- 最佳成绩保存在本浏览器中，永远不会上传。"
  ],
  sequence: [
    "- 必须按规定顺序点击：数字从小到大，单词按字母顺序且不区分大小写。",
    "- 点击的不是下一个项目就算一次错误，该项目仍留在待选中。",
    "- 得分就是完成所用的时间，每组和每种长度的最佳时间保存在这台设备上。",
    "- 切换组别或长度会立刻开始新的一局。"
  ],
  sort: [
    "- 每个数字或项目只属于一个箱子，就是写着对应规则的那个。",
    "- 每分对一次得一分，每错一次扣一分，最低不低于零分。",
    "- 最长的连续正确会显示为连击，最佳得分保存在本浏览器中。",
    "- 计时归零时本局结束，任何数据都不会上传。"
  ],
  math: [
    "- 在计时归零前回答每道题，答案永远是整数。",
    "- 简单不超过 20，中等加入 12 以内的乘法和 30 以内的加法，困难到 20 的乘法表和 100 以内的加减。",
    "- 答对一题得一分，局内答得快没有额外奖励。",
    "- 每个难度的最佳得分保存在这台设备上。"
  ],
  slide: [
    "- 只有与空格共边的方块可以移动，对角线方向的邻居不行。",
    "- 每次打乱都是从已解好的棋盘走出合法步骤，所以一定有解。",
    "- 得分是移动步数，时间用于打破平局，每种棋盘大小的最佳成绩保存在本浏览器中。",
    "- 重新打乱会开始新棋盘、清零计数，并保留你的纪录。"
  ],
  pattern: [
    "- 根据给出的项找出规律，然后把下一项写成整数。",
    "- 每个数列只有一次机会：答错会显示规律并进入下一题。",
    "- 最好的一天是五题中答对的数量，连续天数按连续完成的天数计算。",
    "- 重新开始会重玩今天的五个数列，而不是生成新的。"
  ],
  codebreak: [
    "- 猜出隐藏的密码：全对统计位置正确的数字，接近统计存在于密码其他位置的数字。",
    "- 较难等级允许数字重复，计分时重复的数字会一一对应。",
    "- 得分就是使用的猜测次数，每个难度的最低次数保存在本浏览器中。",
    "- 猜测次数用尽会公布密码，本局记为失败，最佳成绩不变。"
  ]
};
window.MGI18N_GUIDE_POINTS = window.MGI18N_GUIDE_POINTS || {};
window.MGI18N_GUIDE_POINTS.ja = {
  sudoku: [
    "- 各行・各列・各ブロックに、それぞれの数字をちょうど 1 回ずつ入れます。",
    "- 金色の数字は与えられた数字で変えられません。チェックは答えを明かさずに誤りを示します。",
    "- タイマーは最初の入力で始まり、マスがすべて埋まった瞬間に止まります。",
    "- 難易度ごとのベストタイムはこのブラウザに保存され、端末の外には出ません。"
  ],
  nonogram: [
    "- 行の横や列の上にある数字は、塗るマスの連続する長さを順番に示し、連続の間には必ず 1 マス以上の空きがあります。",
    "- 空だと分かったマスには×を付けます。印を付けたマスは塗った扱いにならず、クリアを妨げることもありません。",
    "- 行と列のヒントをすべて満たす配置ならどれでも正解です。判定はヒントに対して行われます。",
    "- 今日の盤面は日付から作られるので、今日は誰でも同じ盤面です。連続記録は続けて解いた日数を数えます。"
  ],
  merge: [
    "- 矢印キーやスワイプでタイルが一斉に動き、同じ数字のタイルが出会うと 2 倍の値のタイルに合体します。",
    "- タイルが動くか 2 枚が合体したときだけ手数に数えられ、1 枚のタイルは 1 手で 1 回しか合体しません。",
    "- スコアは合体で生まれた値の合計で、ベストスコアはこのブラウザに保存されます。",
    "- 盤面が埋まり、隣り合う同じタイルがなくなるとラウンド終了です。"
  ],
  anagram: [
    "- 各ラウンドではヒント、答えの文字数、シャッフルされた文字が出ます。文字は答えそのものです。",
    "- ヒントなしで解いた単語は 100 点、ヒントを開いた場合は 75 点です。",
    "- 間違えても点数は減らず時間だけ使います。スキップは 0 点ですが次に進みます。",
    "- 10 ラウンドの合計ベストはこの端末に保存されます。"
  ],
  wordguess: [
    "- 5 文字の単語を 6 回で当てます。緑は文字も位置も正しく、黄色は文字は正しいが位置が違います。",
    "- 推測はゲームが知っている単語でなければならず、一覧にない入力はキーボードが知らせます。",
    "- 新しいゲームごとに単語が変わり、連勝記録はこのブラウザに保存されます。",
    "- 回数を使い切ると答えが表示されて終了し、連勝記録はリセットされます。"
  ],
  crossword: [
    "- 各ヒントには括弧で文字数が示され、(7) は 7 文字の答えという意味です。",
    "- 答えは大文字に直し、空白と記号を除いて比べるので、大文字小文字や空白は一切影響しません。",
    "- 正解は 10 点、ヒントを使うとその問題から 3 点引かれ、スキップは 0 点です。",
    "- ベストスコアはこの端末に保存され、タイマーが 0 になるとラウンド終了です。"
  ],
  pairs: [
    "- 一度に 2 枚めくり、一致したらそのペアを表向きのまま残します。",
    "- 一致しないとすぐ裏返るので、見たカードを覚えることがゲームのすべてです。",
    "- 6 組すべて見つけるとラウンド終了で、手数と時間の両方が記録されます。",
    "- ベスト結果はこのブラウザに保存され、どこにも送信されません。"
  ],
  sequence: [
    "- 指定の順にクリックします。数字は小さい順、単語は大文字小文字を区別せずアルファベット順です。",
    "- 次に来る項目以外をクリックするとミスになり、その項目は残ります。",
    "- スコアは完了までの時間で、組と長さごとのベストタイムはこの端末に保存されます。",
    "- 組や長さを変えるとすぐに新しいラウンドが始まります。"
  ],
  sort: [
    "- それぞれの数字や項目は、書かれているルールに合う 1 つの箱だけに入ります。",
    "- 正しく分けるごとに 1 点、ミスごとに 1 点減り、0 点より下にはなりません。",
    "- 最も長い連続正解が連続記録として表示され、ベストスコアはこのブラウザに保存されます。",
    "- タイマーが 0 になるとラウンド終了で、どこにも送信されません。"
  ],
  math: [
    "- タイマーが 0 になる前に各問題に答えます。答えはいつも整数です。",
    "- やさしいは 20 まで、ふつうは 12 までの九九と 30 までのたし算、むずかしいは 20 の九九と 100 までの計算です。",
    "- 正解ごとに 1 点で、ラウンド中に速く答えてもボーナスはありません。",
    "- 難易度ごとのベストスコアはこの端末に保存されます。"
  ],
  slide: [
    "- 空きマスと辺を共有するタイルだけが動かせ、斜めのタイルは動きません。",
    "- シャッフルは完成盤面からの合法手で作られるので、必ず解が存在します。",
    "- スコアは手数で、同点なら時間で決まり、盤面サイズごとのベストはこのブラウザに保存されます。",
    "- シャッフルすると新しい盤面になり、カウンターは 0 に戻り、記録は残ります。"
  ],
  pattern: [
    "- 示された項から規則を見つけ、次の項を整数で答えます。",
    "- 数列ごとに 1 回だけ挑戦でき、間違えると規則が表示されて次へ進みます。",
    "- 最高の日は 5 問中の正解数で、連続記録は続けて完了した日数を数えます。",
    "- やり直すと今日の 5 問をもう一度遊べます。新しい問題は作られません。"
  ],
  codebreak: [
    "- 隠されたコードを当てます。ぴったりは位置まで正しい数字、近いはコード内の別の位置にある数字です。",
    "- 難しいレベルでは数字が重複でき、採点では重複が 1 対 1 で対応づけられます。",
    "- スコアは使った推測回数で、難易度ごとの最少回数がこのブラウザに保存されます。",
    "- 回数を使い切るとコードが公開され、そのラウンドは負けでベストは変わりません。"
  ]
};
window.MGI18N_GUIDE_POINTS = window.MGI18N_GUIDE_POINTS || {};
window.MGI18N_GUIDE_POINTS.ko = {
  sudoku: [
    "- 각 행, 각 열, 각 블록에는 모든 숫자가 정확히 한 번씩 들어가야 합니다.",
    "- 금색 숫자는 주어진 값이라 바뀌지 않으며, 검사는 정답을 알리지 않고 틀린 칸만 표시합니다.",
    "- 타이머는 첫 입력과 함께 시작해 격자가 완성되는 순간 멈춥니다.",
    "- 난이도별 최고 기록은 이 브라우저에 저장되고 기기 밖으로 나가지 않습니다."
  ],
  nonogram: [
    "- 행 옆이나 열 위의 숫자는 채울 칸이 이어지는 길이를 순서대로 알려 주며, 덩어리 사이에는 적어도 한 칸의 빈칸이 있습니다.",
    "- 비어 있다고 확인한 칸에는 ×를 표시하세요. 표시한 칸은 채운 것으로 세지 않고 클리어를 막지도 않습니다.",
    "- 행과 열의 힌트를 모두 만족하는 배치라면 무엇이든 정답입니다. 판정은 힌트를 기준으로 합니다.",
    "- 오늘의 격자는 날짜로 만들어지므로 오늘은 모두 같은 격자이고, 연속 기록은 연달아 완료한 날짜를 셉니다."
  ],
  merge: [
    "- 방향키나 밀기로 모든 타일이 한꺼번에 움직이며, 같은 숫자 타일이 만나면 두 배 값 타일 하나로 합쳐집니다.",
    "- 타일이 움직이거나 두 타일이 합쳐져야 한 수로 인정되고, 한 타일은 한 수에 한 번만 합쳐집니다.",
    "- 점수는 합쳐지며 생긴 값의 합계이며, 최고 점수는 이 브라우저에 저장됩니다.",
    "- 보드가 가득 차고 이웃한 같은 타일이 없으면 라운드가 끝납니다."
  ],
  anagram: [
    "- 각 라운드는 힌트, 정답의 글자 수, 섞인 글자를 보여 줍니다. 글자는 정확히 정답의 글자입니다.",
    "- 도움 없이 맞힌 단어는 100점, 힌트를 본 뒤에는 75점입니다.",
    "- 틀린 답은 점수가 아니라 시간을 씁니다. 건너뛰기는 점수가 없지만 다음으로 넘어갑니다.",
    "- 열 라운드의 최고 합계는 이 기기에 저장됩니다."
  ],
  wordguess: [
    "- 다섯 글자 단어를 여섯 번 안에 맞히세요. 초록은 글자와 자리가 모두 맞고, 노랑은 글자는 맞지만 자리가 다릅니다.",
    "- 모든 추측은 게임이 아는 단어여야 하며, 목록에 없는 입력은 키보드가 알려 줍니다.",
    "- 새 게임마다 새 단어가 나오고, 연승 기록은 이 브라우저에 저장됩니다.",
    "- 기회를 다 쓰면 단어가 공개되고 게임이 끝나며 연승 기록은 초기화됩니다."
  ],
  crossword: [
    "- 각 힌트는 괄호 안에 글자 수를 표시하므로 (7)은 일곱 글자 정답을 뜻합니다.",
    "- 정답은 대문자로 바꾸고 공백과 문장 부호를 지운 뒤 비교하므로 대소문자와 띄어쓰기는 영향이 없습니다.",
    "- 정답 하나는 10점, 힌트를 쓰면 그 문제에서 3점이 빠지고, 건너뛰기는 0점입니다.",
    "- 최고 점수는 이 기기에 저장되고, 타이머가 0이 되면 라운드가 끝납니다."
  ],
  pairs: [
    "- 한 번에 두 장을 뒤집고, 두 장이 같으면 그 짝을 뒤집힌 채로 둡니다.",
    "- 다르면 곧 다시 뒤집히므로 본 카드를 기억하는 것이 게임의 전부입니다.",
    "- 여섯 짝을 모두 찾으면 라운드가 끝나며, 이동 수와 시간이 모두 기록됩니다.",
    "- 최고 기록은 이 브라우저에 저장되고 어디에도 업로드되지 않습니다."
  ],
  sequence: [
    "- 정해진 순서대로 클릭해야 합니다. 숫자는 오름차순, 단어는 대소문자를 구분하지 않고 알파벳순입니다.",
    "- 다음 항목이 아닌 것을 클릭하면 실수로 처리되고 그 항목은 남아 있습니다.",
    "- 점수는 완료까지 걸린 시간이며, 묶음과 길이별 최고 시간은 이 기기에 저장됩니다.",
    "- 묶음이나 길이를 바꾸면 곧바로 새 라운드가 시작됩니다."
  ],
  sort: [
    "- 각 숫자나 항목은 적힌 규칙에 맞는 단 하나의 통에 들어갑니다.",
    "- 맞게 넣을 때마다 1점, 틀릴 때마다 1점이 빠지며 0점 아래로는 내려가지 않습니다.",
    "- 가장 길게 이어진 정답이 연속 기록으로 표시되고, 최고 점수는 이 브라우저에 저장됩니다.",
    "- 타이머가 0이 되면 라운드가 끝나고 아무것도 업로드되지 않습니다."
  ],
  math: [
    "- 타이머가 0이 되기 전에 모든 문제를 푸세요. 정답은 항상 정수입니다.",
    "- 쉬움은 20까지, 보통은 12까지의 구구단과 30까지의 덧셈, 어려움은 20 구구단과 100까지의 계산입니다.",
    "- 정답 하나에 1점이며 라운드 안에서 빨리 답해도 보너스는 없습니다.",
    "- 난이도별 최고 점수는 이 기기에 저장됩니다."
  ],
  slide: [
    "- 빈칸과 변을 맞댄 타일만 움직일 수 있고 대각선 이웃은 움직이지 않습니다.",
    "- 섞기는 완성된 판에서 합법적인 수로 만들어지므로 항상 해답이 존재합니다.",
    "- 점수는 이동 횟수이고 동점이면 시간으로 가리며, 판 크기별 최고 기록은 이 브라우저에 저장됩니다.",
    "- 섞기를 누르면 새 판이 시작되고 횟수는 0으로 돌아가며 기록은 남습니다."
  ],
  pattern: [
    "- 제시된 항으로 규칙을 찾고 다음 항을 정수로 입력하세요.",
    "- 수열마다 한 번만 시도할 수 있고, 틀리면 규칙이 표시되며 다음으로 넘어갑니다.",
    "- 가장 좋은 날은 다섯 문제 중 맞힌 개수이고, 연속 기록은 연달아 완료한 날짜를 셉니다.",
    "- 다시 시작하면 오늘의 다섯 수열을 다시 풀 뿐 새로 만들지는 않습니다."
  ],
  codebreak: [
    "- 숨은 코드를 맞히세요. 정확은 자리까지 맞는 숫자, 근접은 코드의 다른 자리에 있는 숫자입니다.",
    "- 어려운 단계에서는 숫자가 반복될 수 있고, 채점할 때 반복된 숫자는 하나씩 짝지어집니다.",
    "- 점수는 사용한 추측 횟수이며, 난이도별 최소 횟수는 이 브라우저에 저장됩니다.",
    "- 기회를 다 쓰면 코드가 공개되고 그 라운드는 패배로 처리되며 최고 기록은 그대로입니다."
  ]
};
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
    "- Tombol panah atau geser memindahkan semua ubin sekaligus; dua ubin sama yang bertemu melebur jadi satu ubin bernilai dua kali lipat.",
    "- Langkah dihitung hanya jika ada ubin berpindah atau dua ubin melebur, dan satu ubin melebur paling banyak sekali per langkah.",
    "- Skormu adalah jumlah semua nilai yang lahir dari peleburan; skor terbaik disimpan di browser ini.",
    "- Ronde berakhir saat papan penuh dan tidak ada dua ubin bersebelahan yang sama."
  ],
  anagram: [
    "- Tiap ronde menampilkan petunjuk, jumlah huruf jawaban dan huruf-hurufnya dalam urutan acak; hurufnya persis jawabannya.",
    "- Kata yang terpecahkan tanpa bantuan bernilai 100 poin, dan 75 setelah petunjuk dibuka.",
    "- Tebakan salah memakan waktu, bukan poin, dan melewati tidak memberi poin tetapi lanjut ke berikutnya.",
    "- Total terbaik dari sepuluh ronde disimpan di perangkat ini."
  ],
  wordguess: [
    "- Tebak kata lima huruf dalam enam percobaan; hijau berarti huruf benar di posisi benar, kuning huruf benar di posisi lain.",
    "- Setiap tebakan harus kata yang dikenal permainan, jadi papan ketik memberi tahu bila masukan tidak ada di daftar.",
    "- Setiap permainan baru memilih kata baru, dan rentetan kemenanganmu disimpan di browser ini.",
    "- Bila percobaan habis, kata dibuka dan permainan berakhir; rentetan dimulai dari nol."
  ],
  crossword: [
    "- Setiap petunjuk mencantumkan panjang jawaban dalam tanda kurung, jadi (7) berarti jawaban tujuh huruf.",
    "- Jawaban dibandingkan dalam huruf besar tanpa spasi dan tanda baca, sehingga besar-kecil huruf dan spasi tidak pernah berpengaruh.",
    "- Jawaban benar bernilai sepuluh poin, petunjuk memotong tiga poin dari petunjuk itu, dan melewati tidak memberi poin.",
    "- Skor terbaik disimpan di perangkat ini, dan ronde berakhir saat timer mencapai nol."
  ],
  pairs: [
    "- Buka dua kartu sekaligus dan biarkan pasangan tetap terbuka bila keduanya cocok.",
    "- Bila tidak cocok, kartu kembali tertutup sekejap, jadi mengingat apa yang kamu lihat adalah inti permainannya.",
    "- Ronde berakhir saat keenam pasangan ditemukan; langkah dan waktu sama-sama dihitung.",
    "- Hasil terbaikmu disimpan di browser ini dan tidak pernah diunggah."
  ],
  sequence: [
    "- Item harus diklik sesuai urutan yang diminta: angka menaik, kata menurut abjad tanpa membedakan huruf besar-kecil.",
    "- Klik yang bukan item berikutnya dihitung kesalahan dan item itu tetap tersedia.",
    "- Skormu adalah waktu penyelesaian, dan waktu terbaik tiap set dan panjang disimpan di perangkat ini.",
    "- Mengganti set atau panjang langsung memulai ronde baru."
  ],
  sort: [
    "- Setiap angka atau item hanya cocok untuk satu kotak, yaitu kotak dengan aturan yang tertulis.",
    "- Satu poin untuk setiap sortir benar, dan setiap kesalahan mengurangi satu poin, tidak pernah di bawah nol.",
    "- Rentetan benar terpanjang ditampilkan sebagai streak, dan skor terbaikmu disimpan di browser ini.",
    "- Ronde berakhir saat timer mencapai nol, dan tidak ada yang diunggah ke mana pun."
  ],
  math: [
    "- Jawab setiap soal sebelum timer mencapai nol; jawabannya selalu bilangan bulat.",
    "- Mudah tetap sampai 20, Sedang menambah tabel perkalian sampai 12 dan penjumlahan sampai 30, Sulit sampai tabel 20 dan penjumlahan 100.",
    "- Satu poin untuk setiap jawaban benar, tanpa bonus karena menjawab cepat di dalam ronde.",
    "- Skor terbaik tiap tingkat kesulitan disimpan di perangkat ini."
  ],
  slide: [
    "- Hanya ubin yang berbagi sisi dengan ruang kosong yang bisa bergerak; tetangga diagonal tidak bisa.",
    "- Setiap pengacakan dibuat dari langkah sah dari papan yang sudah selesai, jadi solusinya selalu ada.",
    "- Skormu adalah jumlah langkah, waktu menjadi penentu bila seri, dan yang terbaik tiap ukuran papan disimpan di browser ini.",
    "- Mengacak memulai papan baru, mengatur ulang penghitung dan menyimpan rekormu."
  ],
  pattern: [
    "- Temukan aturannya dari suku-suku yang tampil, lalu tulis suku berikutnya sebagai bilangan bulat.",
    "- Satu percobaan per deret: jawaban salah menampilkan aturan dan lanjut ke deret berikutnya.",
    "- Hari terbaikmu adalah jumlah jawaban benar dari lima, dan rentetan menghitung hari berturut-turut yang selesai.",
    "- Mulai ulang akan memainkan lagi lima deret hari ini, bukan membuat yang baru."
  ],
  codebreak: [
    "- Tebak kode tersembunyi: tepat menghitung angka di posisi benar, dekat menghitung angka yang ada di kode pada posisi lain.",
    "- Di tingkat sulit angka boleh berulang, dan saat menilai angka berulang dipasangkan satu per satu.",
    "- Skormu adalah jumlah tebakan yang dipakai, dan skor terendah tiap tingkat kesulitan disimpan di browser ini.",
    "- Bila tebakan habis, kode dibuka, ronde dihitung kalah, dan rekor terbaikmu tidak berubah."
  ]
};
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
    "- Phím mũi tên hoặc vuốt di chuyển toàn bộ ô cùng lúc; hai ô bằng nhau gặp nhau sẽ gộp thành một ô có giá trị gấp đôi.",
    "- Một nước chỉ được tính khi có ô đổi chỗ hoặc hai ô gộp lại, và mỗi ô gộp nhiều nhất một lần trong mỗi nước.",
    "- Điểm của bạn là tổng mọi giá trị sinh ra từ các lần gộp; điểm cao nhất được lưu trong trình duyệt này.",
    "- Ván kết thúc khi bàn đầy và không còn hai ô kề nhau bằng nhau."
  ],
  anagram: [
    "- Mỗi vòng hiện một gợi ý, số chữ cái của đáp án và các chữ cái xáo trộn; các chữ cái chính là đáp án.",
    "- Từ giải được mà không cần trợ giúp được 100 điểm, còn sau khi mở gợi ý là 75 điểm.",
    "- Đoán sai tốn thời gian chứ không mất điểm, còn bỏ qua không được điểm nhưng chuyển sang câu tiếp.",
    "- Tổng điểm tốt nhất qua mười vòng được lưu trên thiết bị này."
  ],
  wordguess: [
    "- Đoán một từ năm chữ cái trong sáu lượt; xanh lá là đúng chữ đúng vị trí, vàng là đúng chữ nhưng sai vị trí.",
    "- Mỗi lượt đoán phải là từ mà trò chơi biết, nên bàn phím sẽ báo khi từ nhập không có trong danh sách.",
    "- Mỗi ván mới chọn một từ mới, và chuỗi trận thắng của bạn được lưu trong trình duyệt này.",
    "- Hết lượt đoán thì từ được hé lộ và ván kết thúc; chuỗi thắng bắt đầu lại."
  ],
  crossword: [
    "- Mỗi gợi ý ghi độ dài đáp án trong ngoặc, nên (7) nghĩa là đáp án bảy chữ cái.",
    "- Đáp án được so sánh ở dạng chữ in hoa, bỏ khoảng trắng và dấu câu, nên chữ hoa thường và khoảng cách không bao giờ ảnh hưởng.",
    "- Đáp án đúng được mười điểm, dùng gợi ý trừ ba điểm ở câu đó, còn bỏ qua không được điểm.",
    "- Điểm cao nhất được lưu trên thiết bị này, và ván kết thúc khi đồng hồ về không."
  ],
  pairs: [
    "- Lật hai thẻ mỗi lần và giữ cặp thẻ mở khi hai thẻ khớp nhau.",
    "- Nếu không khớp, thẻ lật lại ngay sau đó, nên nhớ những gì đã thấy chính là toàn bộ trò chơi.",
    "- Ván kết thúc khi tìm đủ sáu cặp; cả số nước và thời gian đều được tính.",
    "- Kết quả tốt nhất của bạn được lưu trong trình duyệt này và không bao giờ tải lên đâu cả."
  ],
  sequence: [
    "- Phải nhấp theo đúng thứ tự yêu cầu: số tăng dần, từ theo thứ tự chữ cái không phân biệt hoa thường.",
    "- Nhấp vào mục không phải mục kế tiếp bị tính là lỗi và mục đó vẫn còn trong danh sách.",
    "- Điểm của bạn là thời gian hoàn thành, và thời gian tốt nhất cho mỗi bộ và độ dài được lưu trên thiết bị này.",
    "- Đổi bộ hoặc độ dài sẽ bắt đầu ván mới ngay lập tức."
  ],
  sort: [
    "- Mỗi số hoặc mục chỉ thuộc đúng một hộp, là hộp có quy tắc phù hợp được ghi trên đó.",
    "- Mỗi lần phân loại đúng được một điểm, mỗi lỗi trừ một điểm và không bao giờ xuống dưới không.",
    "- Chuỗi đúng dài nhất hiện thành streak, và điểm cao nhất của bạn được lưu trong trình duyệt này.",
    "- Ván kết thúc khi đồng hồ về không, và không có gì được tải lên đâu cả."
  ],
  math: [
    "- Trả lời từng câu trước khi đồng hồ về không; đáp án luôn là số nguyên.",
    "- Dễ ở trong phạm vi 20, Trung bình thêm bảng cửu chương đến 12 và phép cộng đến 30, Khó lên tới bảng 20 và tổng 100.",
    "- Mỗi đáp án đúng được một điểm, không có thưởng vì trả lời nhanh trong ván.",
    "- Điểm cao nhất cho mỗi độ khó được lưu trên thiết bị này."
  ],
  slide: [
    "- Chỉ ô có chung cạnh với khoảng trống mới di chuyển được; ô kề theo đường chéo thì không.",
    "- Mỗi lần xáo đều sinh ra từ các nước hợp lệ trên bàn đã giải, nên luôn có lời giải.",
    "- Điểm của bạn là số nước đi, thời gian phân định khi bằng nhau, và kỷ lục cho mỗi cỡ bàn được lưu trong trình duyệt này.",
    "- Xáo sẽ mở bàn mới, đưa bộ đếm về không và giữ kỷ lục của bạn."
  ],
  pattern: [
    "- Tìm ra quy luật từ các số hạng đã cho, rồi nhập số hạng tiếp theo dưới dạng số nguyên.",
    "- Mỗi dãy chỉ một lần thử: trả lời sai sẽ hiện quy luật và chuyển sang dãy kế tiếp.",
    "- Ngày tốt nhất của bạn là số câu đúng trên năm, và chuỗi ngày đếm số ngày liên tiếp hoàn thành.",
    "- Chơi lại sẽ chơi lại năm dãy của hôm nay chứ không tạo dãy mới."
  ],
  codebreak: [
    "- Đoán mã ẩn: đúng đếm các chữ số đúng vị trí, gần đếm các chữ số có trong mã nhưng ở vị trí khác.",
    "- Ở mức khó, chữ số có thể lặp lại, và khi tính điểm các chữ số lặp được ghép từng đôi một.",
    "- Điểm của bạn là số lượt đoán đã dùng, và điểm thấp nhất cho mỗi độ khó được lưu trong trình duyệt này.",
    "- Hết lượt đoán thì mã được hé lộ, ván tính là thua và kỷ lục của bạn không đổi."
  ]
};
