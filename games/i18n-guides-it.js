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
    "- Una mossa conta solo se almeno una tessera cambia posizione o due tessere si fondono.",
    "- Due tessere si fondono al massimo una volta per mossa: quattro tessere uguali in fila fanno due coppie, non una tessera gigante.",
    "- Il punteggio è la somma di ogni valore creato da una fusione: fondere una coppia di 64 aggiunge 128.",
    "- Il tuo record resta in questo browser sotto mg-merge-best e non lascia mai il dispositivo.",
    "- La partita finisce quando il tabellone è pieno e non ci sono due tessere vicine uguali; Nuovo tabellone azzera il punteggio."
  ],
  anagram: [
    "- 100 punti per una parola risolta senza aiuto, 75 quando l'indizio è stato rivelato.",
    "- Un tentativo sbagliato costa solo tempo: continua finché non la trovi o salta alla successiva.",
    "- Il totale migliore su dieci round resta nel tuo browser, e le risposte hanno da cinque a nove lettere senza nomi propri.",
    "- Niente viene caricato online: il record vive solo in localStorage su questo dispositivo."
  ],
  wordguess: [
    "- Sei tentativi per una parola di cinque lettere; verde è la lettera giusta al posto giusto, ambra la lettera giusta altrove.",
    "- Ogni tentativo deve essere una parola che il gioco conosce, così la tastiera ti avvisa quando una voce non è in elenco.",
    "- Ogni nuova partita sceglie una parola nuova, e la tua serie di vittorie resta in questo browser.",
    "- Esauriti i tentativi la parola viene rivelata e la partita finisce; la serie riparte da zero."
  ],
  crossword: [
    "- Dieci indizi per round, tutti estratti a caso da una riserva di ventisei.",
    "- Dieci punti per risposta corretta, tre in meno per ogni indizio usato su quella domanda, niente per un salto.",
    "- L'ortografia conta, le maiuscole no: le risposte sono confrontate in maiuscolo e senza spazi.",
    "- Il tuo record resta sotto mg-clueclues-best in questo browser e non lascia mai il dispositivo.",
    "- Il round finisce quando il cronometro arriva a zero, e la casella della risposta si blocca fino al prossimo avvio."
  ],
  pairs: [
    "- Gira due carte alla volta e lascia la coppia scoperta quando le due coincidono.",
    "- Se non coincidono tornano coperte dopo un istante, quindi ricordare ciò che hai visto è tutto il gioco.",
    "- Il round finisce quando sono trovate tutte e sei le coppie; si contano mosse e tempo.",
    "- Il tuo miglior risultato resta in questo browser sotto una chiave mg- e non viene mai caricato online."
  ],
  sequence: [
    "- I numeri sono interi da 1 a 99, tutti diversi, da ordinare in modo crescente.",
    "- Le parole sono parole comuni, tutte diverse, da ordinare alfabeticamente senza badare alle maiuscole.",
    "- Un clic che non è l'elemento successivo conta come errore e l'elemento resta disponibile.",
    "- Il punteggio è il tempo impiegato; il tempo migliore per ogni insieme e lunghezza resta in questo browser sotto mg-sort-best.",
    "- Cambiare insieme o lunghezza avvia subito un nuovo round."
  ],
  sort: [
    "- I numeri vanno da 10 a 99, e ogni numero appartiene a un solo contenitore.",
    "- Un punto per ogni smistamento corretto, un punto perso per ogni errore, mai sotto zero.",
    "- La tua serie corretta più lunga è mostrata come streak; il record resta in questo browser sotto mg-bins-best.",
    "- Il round finisce quando il cronometro arriva a zero, e i contenitori si bloccano fino al prossimo avvio.",
    "- Niente viene scaricato e nessun round viene caricato: il punteggio vive solo in localStorage."
  ],
  math: [
    "- Facile: addizioni e sottrazioni con numeri fino a 20.",
    "- Medio: moltiplicazioni da 2 a 12, divisioni esatte e piccole addizioni o sottrazioni fino a 30.",
    "- Difficile: moltiplicazioni fino a 20, divisioni esatte e addizioni o sottrazioni con numeri fino a 100.",
    "- Un punto per risposta corretta, nessun bonus per la rapidità dentro il round: la pressione è il cronometro.",
    "- Il record per ogni difficoltà resta in questo browser sotto mg-math-best.",
    "- Quando il cronometro arriva a zero il round finisce e l'input si blocca fino al prossimo avvio."
  ],
  slide: [
    "- Si muove solo la tessera che condivide un lato con lo spazio vuoto; le vicine in diagonale no.",
    "- Ogni mescolata nasce da qualche centinaio di mosse legali dalla griglia risolta, quindi una soluzione esiste sempre.",
    "- Il punteggio è il numero di mosse, con il tempo come spareggio per i tuoi record.",
    "- Il miglior numero di mosse per ogni dimensione resta in questo browser sotto mg-slide-best.",
    "- Mescolare avvia una griglia nuova, azzera i contatori e conserva il record."
  ],
  pattern: [
    "- Cinque sequenze al giorno, un tentativo ciascuna, sempre con risposte intere.",
    "- Le risposte possono essere negative solo nella serie di sottrazioni, e anche lì la sequenza resta sopra zero.",
    "- Il tuo giorno migliore è il maggior numero di risposte corrette su cinque, salvato sotto mg-pattern-best.",
    "- La serie quotidiana è salvata sotto mg-pattern-streak e conta i giorni consecutivi in cui hai completato il set.",
    "- Ricominciare rigioca i cinque puzzle di oggi; non ne genera di nuovi."
  ],
  codebreak: [
    "- Facile: tre cifre da 1 a 5, senza ripetizioni, otto tentativi.",
    "- Medio: quattro cifre da 1 a 6, ripetizioni ammesse, dieci tentativi.",
    "- Difficile: cinque cifre da 1 a 8, ripetizioni ammesse, dodici tentativi.",
    "- Vinci se indovini il codice esatto; il punteggio è il numero di tentativi usati, e il record per ogni difficoltà resta nel tuo browser.",
    "- Esauriti i tentativi il codice viene rivelato, il round conta come sconfitta e il record non viene toccato."
  ]
};
