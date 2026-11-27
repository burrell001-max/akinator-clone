/* Arcade editorial prose, part 1: English, German and Portuguese.
   Category keys follow MGI18N_CAT_ORDER. The runtime reads
   window.MGI18N_PROSE / window.MGI18N_PROSE_PARTS and falls back to English. */
(function () {
  "use strict";
  var PARTS = window.MGI18N_PROSE_PARTS = window.MGI18N_PROSE_PARTS || [];

  PARTS.push({
    en: {
      catLede: {
        brain: "The widest shelf in the arcade: deduction, codebreaking, memory, mental arithmetic and puzzles that punish a rushed click.",
        daily: "One board a day, built from the date, so everybody gets the same puzzle — five dailies in all.",
        number: "Tile merging, digit echoing, arithmetic sprints and the Sudoku boards that also live on their own shelf.",
        word: "Seven letter games with a modest, everyday vocabulary: a five-letter deduction game, anagram hunts and the wordier crosswords.",
        crossword: "Crossword thinking without a subscription: word squares, clue sprints, a daily set and a swapped-letter grid.",
        sudoku: "Five Sudoku boards at four sizes, from the full nine-by-nine grid to a pocket board built for a thumb.",
        memory: "Five ways to find the edge of your short-term memory, with cards, pads, grids, digits and shapes.",
        sort: "Ordering, binned, repaired and against the clock, with numbers, fractions and historical dates as the material.",
        math: "Six games where the arithmetic is the game: sprint drills, missing values, equation building and fraction ranking.",
        puzzle: "Sliding tiles that are always solvable, a picture-logic nonogram and word squares — slower, and better for it."
      },
      catOverview: {
        brain: "Most of these games ask for the same three habits: scan the board before acting, note what you have ruled out, and stop when the next move would be a guess.",
        daily: "A daily puzzle is finite: you cannot grind it or replay it for a better score, so the only thing to protect is the streak.",
        number: "Everything here is generated rather than hand-authored, so the board is different every time and the arithmetic is always on show.",
        word: "The vocabulary is deliberately everyday. Losing to a common word teaches you to look again; losing to an archaic plural teaches nothing.",
        crossword: "A crossword is two puzzles at once: a clue is a definition with the grammar filed off, and the grid is a constraint system.",
        sudoku: "Every board is generated and checked for a unique solution. Two solutions means the puzzle is broken, however neat the grid looks.",
        memory: "All five are the same experiment in different clothing: something is shown, taken away, and reproduced.",
        sort: "Comparing two items is easy; holding the whole set in your head while you decide where the middle one goes is not.",
        math: "None of these need a calculator. They are about the small decisions: which operation to reach for, and whether a value is plausible.",
        puzzle: "Every board is generated with a guarantee — shuffled by legal moves or checked before it is shown."
      },
      catTrains: {
        brain: "Deduction, working memory and the discipline of checking a move before committing to it.",
        daily: "Consistency, short-term focus and the habit of finishing what you start.",
        number: "Number sense, quick arithmetic and planning a few moves ahead.",
        word: "Vocabulary, spelling and pattern spotting under a little pressure.",
        crossword: "Verbal reasoning, definition hunting and constraint solving.",
        sudoku: "Logical deduction, scanning and patience with a single constraint.",
        memory: "Short-term memory, attention and chunking.",
        sort: "Comparison, ordering and keeping several items in mind at once.",
        math: "Mental arithmetic, estimation and working backwards.",
        puzzle: "Spatial reasoning, planning and calm, step-by-step problem solving."
      }
    },
    de: {
      catLede: {
        brain: "Die breiteste Sammlung im Arcade: Deduktion, Codeknacken, Gedächtnis, Kopfrechnen und Rätsel, die einen hastigen Klick bestrafen.",
        daily: "Ein Brett pro Tag, aus dem Datum erzeugt – so bekommt jeder dasselbe Rätsel. Insgesamt fünf Tagesrätsel.",
        number: "Zahlen zusammenlegen, Ziffern nachtippen, Rechen-Sprints und die Sudoku-Bretter, die auch auf ihrer eigenen Seite stehen.",
        word: "Sieben Buchstabenspiele mit alltäglichem Wortschatz: ein Fünf-Buchstaben-Ratespiel, Anagrammjagden und die wortreicheren Kreuzworträtsel.",
        crossword: "Kreuzwortdenken ohne Abo: Wortquadrate, Hinweis-Sprints, ein Tagesset und ein Gitter mit vertauschten Buchstaben.",
        sudoku: "Fünf Sudoku-Bretter in vier Größen – vom vollen Neun-mal-neun-Gitter bis zum Taschenbrett für den Daumen.",
        memory: "Fünf Wege an die Grenze des Kurzzeitgedächtnisses – mit Karten, Pads, Gittern, Ziffern und Formen.",
        sort: "Ordnen, einsortieren, reparieren und gegen die Uhr – mit Zahlen, Brüchen und Jahreszahlen.",
        math: "Sechs Spiele, in denen das Rechnen das Spiel ist: Sprints, fehlende Werte, Gleichungen bauen und Brüche sortieren.",
        puzzle: "Schiebeplättchen, die immer lösbar sind, ein Bildlogik-Nonogramm und Wortquadrate – langsamer, und genau deshalb besser."
      },
      catOverview: {
        brain: "Die meisten dieser Spiele verlangen dieselben drei Gewohnheiten: erst das Brett prüfen, dann merken, was schon ausgeschlossen ist, und aufhören, wenn der nächste Zug nur geraten wäre.",
        daily: "Ein Tagesrätsel ist endlich: Du kannst es nicht grinden oder für eine bessere Punktzahl wiederholen – zu schützen ist nur die Serie.",
        number: "Alles hier wird erzeugt, nicht von Hand gebaut. Das Brett ist jedes Mal anders, und die Rechnung bleibt sichtbar.",
        word: "Der Wortschatz ist absichtlich alltäglich. An einem seltenen Wort zu scheitern lehrt nichts; an einem gebräuchlichen Wort zu scheitern lehrt dich, genauer hinzusehen.",
        crossword: "Ein Kreuzworträtsel ist zwei Rätsel zugleich: Der Hinweis ist eine Definition ohne Grammatik, das Gitter ein System von Bedingungen.",
        sudoku: "Jedes Brett wird erzeugt und auf eine eindeutige Lösung geprüft. Zwei Lösungen hießen: Das Rätsel ist kaputt, so ordentlich es auch aussieht.",
        memory: "Alle fünf sind dasselbe Experiment in anderem Gewand: Etwas wird gezeigt, weggenommen und wiedergegeben.",
        sort: "Zwei Dinge zu vergleichen ist leicht. Die ganze Menge im Kopf zu behalten, während du den Platz in der Mitte suchst, nicht.",
        math: "Nichts davon braucht einen Taschenrechner. Es geht um die kleinen Entscheidungen: welche Rechenart, und ist der Wert plausibel?",
        puzzle: "Jedes Brett wird mit Garantie erzeugt – durch erlaubte Züge gemischt oder vor dem Anzeigen geprüft."
      },
      catTrains: {
        brain: "Deduktion, Arbeitsgedächtnis und die Disziplin, einen Zug vor dem Ausführen zu prüfen.",
        daily: "Beständigkeit, kurze Konzentration und die Gewohnheit, anzufangen und fertigzumachen.",
        number: "Zahlgefühl, schnelles Rechnen und ein paar Züge vorausplanen.",
        word: "Wortschatz, Rechtschreibung und Mustererkennung unter leichtem Druck.",
        crossword: "Sprachliches Denken, Definitionen finden und Bedingungen lösen.",
        sudoku: "Logisches Schließen, sauberes Scannen und Geduld mit einer einzigen Bedingung.",
        memory: "Kurzzeitgedächtnis, Aufmerksamkeit und Chunking.",
        sort: "Vergleichen, Ordnen und mehrere Dinge gleichzeitig im Kopf behalten.",
        math: "Kopfrechnen, Schätzen und rückwärts arbeiten.",
        puzzle: "Räumliches Denken, Planung und ruhiges, schrittweises Lösen."
      }
    },
    pt: {
      catLede: {
        brain: "A prateleira mais ampla do arcade: dedução, decifrar códigos, memória, cálculo mental e puzzles que castigam um clique apressado.",
        daily: "Um tabuleiro por dia, gerado a partir da data, para todos terem o mesmo desafio — cinco diários ao todo.",
        number: "Juntar peças, repetir dígitos, sprints de cálculo e os tabuleiros de Sudoku que também têm prateleira própria.",
        word: "Sete jogos de letras com vocabulário do dia a dia: um jogo de dedução de cinco letras, caças a anagramas e as palavras cruzadas mais verbosas.",
        crossword: "Pensamento de palavras cruzadas sem assinatura: quadrados de palavras, sprints de pistas, um conjunto diário e uma grelha com letras trocadas.",
        sudoku: "Cinco tabuleiros de Sudoku em quatro tamanhos, do nove por nove completo ao tabuleiro de bolso feito para o polegar.",
        memory: "Cinco formas de encontrar o limite da memória de curto prazo: cartas, pads, grelhas, dígitos e formas.",
        sort: "Ordenar, encaixar, reparar e contra o relógio, com números, frações e datas históricas.",
        math: "Seis jogos em que a aritmética é o jogo: sprints, valores em falta, construção de equações e ordenação de frações.",
        puzzle: "Peças deslizantes sempre resolúveis, um nonograma de lógica e quadrados de palavras — mais calmos, e melhores por isso."
      },
      catOverview: {
        brain: "A maioria pede os mesmos três hábitos: observar o tabuleiro antes de agir, anotar o que já excluíste e parar quando o próximo movimento seria um palpite.",
        daily: "Um desafio diário é finito: não dá para repetir à procura de melhor pontuação, por isso só há a sequência para proteger.",
        number: "Tudo aqui é gerado, não desenhado à mão: o tabuleiro muda sempre e a conta fica à vista.",
        word: "O vocabulário é deliberadamente comum. Perder por causa de uma palavra rara não ensina nada; perder por uma palavra corrente ensina a olhar outra vez.",
        crossword: "Um crucigrama são dois puzzles ao mesmo tempo: a pista é uma definição sem gramática e a grelha é um sistema de restrições.",
        sudoku: "Cada tabuleiro é gerado e verificado para ter solução única. Duas soluções significam um puzzle avariado, por mais arrumada que esteja a grelha.",
        memory: "Os cinco são a mesma experiência com roupa diferente: mostram algo, retiram-no e pedem que o repitas.",
        sort: "Comparar dois itens é fácil; manter o conjunto todo na cabeça enquanto decides onde fica o do meio é que não.",
        math: "Nenhum precisa de calculadora. São as pequenas decisões: que operação usar e se o valor é plausível.",
        puzzle: "Cada tabuleiro é gerado com garantia — baralhado por movimentos legais ou verificado antes de aparecer."
      },
      catTrains: {
        brain: "Dedução, memória de trabalho e o hábito de verificar um movimento antes de o fazer.",
        daily: "Consistência, foco curto e o hábito de acabar o que se começa.",
        number: "Sentido de número, cálculo rápido e planear alguns movimentos.",
        word: "Vocabulário, ortografia e reconhecimento de padrões com alguma pressão.",
        crossword: "Raciocínio verbal, procura de definições e resolução de restrições.",
        sudoku: "Dedução lógica, varrimento e paciência com uma única regra.",
        memory: "Memória de curto prazo, atenção e agrupamento.",
        sort: "Comparação, ordenação e manter vários itens na cabeça ao mesmo tempo.",
        math: "Cálculo mental, estimativa e trabalhar de trás para a frente.",
        puzzle: "Raciocínio espacial, planeamento e resolução calma, passo a passo."
      }
    }
  });
})();
