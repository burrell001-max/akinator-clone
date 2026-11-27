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
    "- Ein Zug zählt nur, wenn mindestens ein Plättchen seine Position ändert oder zwei Plättchen verschmelzen.",
    "- Zwei Plättchen verschmelzen höchstens einmal pro Zug; vier gleiche in einer Reihe ergeben zwei Paare, kein Riesenplättchen.",
    "- Die Punktzahl ist die Summe aller durch Verschmelzen entstandenen Werte: ein 64er Paar bringt 128.",
    "- Dein Bestwert liegt in diesem Browser unter mg-merge-best und verlässt das Gerät nie.",
    "- Die Runde endet, wenn das Brett voll ist und keine zwei Nachbarn mehr gleich sind; Neues Brett setzt die Punktzahl zurück."
  ],
  anagram: [
    "- 100 Punkte für ein ohne Hilfe gelöstes Wort, 75 wenn der Hinweis aufgedeckt wurde.",
    "- Ein falscher Versuch kostet nur Zeit; probier weiter, bis du es hast, oder springe zur nächsten Frage.",
    "- Die beste Summe aus zehn Runden liegt in deinem Browser, und Antworten haben fünf bis neun Buchstaben ohne Eigennamen.",
    "- Nichts wird hochgeladen: der Bestwert lebt nur in localStorage auf diesem Gerät."
  ],
  wordguess: [
    "- Sechs Versuche für ein Wort mit fünf Buchstaben; grün heißt richtiger Buchstabe am richtigen Platz, gelb richtiger Buchstabe woanders.",
    "- Jeder Versuch muss ein Wort sein, das das Spiel kennt; die Tastatur zeigt dir, wenn eine Eingabe nicht in der Liste steht.",
    "- Jede neue Partie wählt ein neues Wort, und deine Siegesserie bleibt in diesem Browser.",
    "- Sind die Versuche aufgebraucht, wird das Wort gezeigt und die Partie endet; die Serie beginnt neu."
  ],
  crossword: [
    "- Zehn Hinweise pro Runde, alle zufällig aus einem Vorrat von sechsundzwanzig.",
    "- Zehn Punkte pro richtiger Antwort, drei ab pro verwendetem Hinweis auf diese Frage, nichts fürs Überspringen.",
    "- Die Schreibweise zählt, Groß- und Kleinschreibung nicht: Antworten werden in Großbuchstaben ohne Leerzeichen verglichen.",
    "- Dein Bestwert liegt in diesem Browser unter mg-clueclues-best und verlässt das Gerät nie.",
    "- Die Runde endet bei null auf der Uhr, und das Antwortfeld bleibt gesperrt, bis du neu startest."
  ],
  pairs: [
    "- Drehe zwei Karten auf einmal um und lass ein Paar offen liegen, wenn beide zusammenpassen.",
    "- Passt es nicht, drehen sich die Karten gleich wieder um; sich zu merken, was du gesehen hast, ist das ganze Spiel.",
    "- Die Runde endet, wenn alle sechs Paare gefunden sind; Züge und Zeit werden beide gezählt.",
    "- Dein bestes Ergebnis liegt in diesem Browser unter einem mg- Schlüssel und wird nie hochgeladen."
  ],
  sequence: [
    "- Zahlen sind ganze Zahlen von 1 bis 99, alle verschieden, aufsteigend zu sortieren.",
    "- Wörter sind gewöhnliche Wörter, alle verschieden, alphabetisch zu sortieren ohne Rücksicht auf Groß- und Kleinschreibung.",
    "- Ein Klick, der nicht das nächste Element ist, zählt als Fehler, und das Element bleibt verfügbar.",
    "- Deine Punktzahl ist die Zeit bis zum Ende; die Bestzeit je Satz und Länge liegt in diesem Browser unter mg-sort-best.",
    "- Ein Wechsel von Satz oder Länge startet sofort eine neue Runde."
  ],
  sort: [
    "- Zahlen laufen von 10 bis 99, und jede Zahl gehört in genau einen Behälter.",
    "- Ein Punkt pro richtigem Sortieren, ein Punkt ab pro Fehler, nie unter null.",
    "- Deine längste richtige Serie wird als Streak angezeigt; dein Bestwert liegt in diesem Browser unter mg-bins-best.",
    "- Die Runde endet bei null auf der Uhr, und die Behälter bleiben gesperrt, bis du neu startest.",
    "- Nichts wird geladen und keine Runde hochgeladen: die Punktzahl lebt nur in localStorage."
  ],
  math: [
    "- Leicht: Addition und Subtraktion mit Zahlen bis 20.",
    "- Mittel: Multiplikation von 2 bis 12, exakte Division und kleine Addition oder Subtraktion bis 30.",
    "- Schwer: Multiplikation bis 20, exakte Division und Addition oder Subtraktion mit Zahlen bis 100.",
    "- Ein Punkt pro richtiger Antwort, kein Bonus für Schnelligkeit innerhalb der Runde — der Druck kommt von der Uhr.",
    "- Dein Bestwert je Schwierigkeit liegt in diesem Browser unter mg-math-best.",
    "- Wenn die Uhr null erreicht, endet die Runde und die Eingabe bleibt gesperrt, bis du neu startest."
  ],
  slide: [
    "- Nur ein Plättchen, das eine Kante mit der Lücke teilt, kann sich bewegen; diagonale Nachbarn nicht.",
    "- Jede Mischung entsteht durch einige hundert erlaubte Züge vom gelösten Brett, eine Lösung existiert also immer.",
    "- Deine Punktzahl ist die Zahl der Züge, die Zeit entscheidet bei deinen eigenen Rekorden.",
    "- Der beste Zugzahl-Wert je Brettgröße liegt in diesem Browser unter mg-slide-best.",
    "- Mischen startet ein neues Brett, setzt die Zähler zurück und behält den Bestwert."
  ],
  pattern: [
    "- Fünf Folgen pro Tag, je ein Versuch, immer mit ganzzahligen Antworten.",
    "- Antworten dürfen nur in der Subtraktionsreihe negativ sein, und auch dort bleibt die Folge über null.",
    "- Dein bester Tag ist die höchste Zahl richtiger Antworten von fünf, gespeichert unter mg-pattern-best.",
    "- Die Tagesserie liegt unter mg-pattern-streak und zählt aufeinanderfolgende Tage, an denen du den Satz geschafft hast.",
    "- Neustart spielt die fünf Rätsel von heute erneut; neue werden nicht erzeugt."
  ],
  codebreak: [
    "- Leicht: drei Ziffern von 1 bis 5, keine Wiederholung, acht Versuche.",
    "- Mittel: vier Ziffern von 1 bis 6, Wiederholungen erlaubt, zehn Versuche.",
    "- Schwer: fünf Ziffern von 1 bis 8, Wiederholungen erlaubt, zwölf Versuche.",
    "- Du gewinnst, wenn der Code genau passt; deine Punktzahl ist die Zahl der Versuche, und der Bestwert je Schwierigkeit bleibt in deinem Browser.",
    "- Sind die Versuche aufgebraucht, wird der Code gezeigt, die Runde zählt als verloren und der Bestwert bleibt unberührt."
  ]
};
