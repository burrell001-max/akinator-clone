/* English reference for the rules and scoring bullets: the same points the
   English essays make, one bullet per point. Other languages mirror these. */
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
    "- A move counts only if at least one tile changes position or two tiles merge.",
    "- Two tiles merge at most once per move, so a line of four matching tiles makes two pairs, not one giant tile.",
    "- Score is the sum of every tile value created by a merge: merging a 64 pair adds 128.",
    "- Your best score is stored in this browser under mg-merge-best and never leaves the device.",
    "- The round ends when the board is full and no two neighbouring tiles match, and New board resets the score."
  ],
  anagram: [
    "- 100 points for a word solved without help, 75 with the clue revealed.",
    "- A wrong guess costs nothing but time; keep trying until you find it or skip.",
    "- The best total across ten rounds is stored in your browser, and answers are five to nine letters with no proper nouns.",
    "- Nothing is uploaded: the best score lives in localStorage on this device only."
  ],
  wordguess: [
    "- Six tries at a word of five letters; green means the right letter in the right place, amber the right letter elsewhere.",
    "- Every guess must be a word the game knows, so the keyboard tells you when an entry is not in the list.",
    "- Each new game picks a new word, and your run of wins is kept in this browser.",
    "- Running out of guesses reveals the word and ends the run; the streak resets."
  ],
  crossword: [
    "- Ten clues per run, all drawn at random from a bank of twenty-six.",
    "- Ten points per correct answer, three off per hint used on that clue, nothing for a skip.",
    "- Spelling matters but case does not; answers are compared in capitals with spaces removed.",
    "- Your best score is stored under mg-clueclues-best in this browser and never leaves the device.",
    "- The round ends at zero on the clock, and the answer box locks until you start again."
  ],
  pairs: [
    "- Flip two cards at a time and keep a pair face up when the two match.",
    "- A mismatch turns back after a moment, so remembering what you saw is the whole game.",
    "- The round ends when all six pairs are matched; moves and time are both counted.",
    "- Your best result is stored in this browser under a single mg- key and never uploaded."
  ],
  sequence: [
    "- Numbers are whole numbers between 1 and 99, all different, sorted ascending.",
    "- Words are ordinary English words, all different, sorted alphabetically ignoring case.",
    "- A click that is not the next item in the order counts as a mistake and stays in the pool.",
    "- Your score is the time to finish; the best time for each set and length is kept in this browser under mg-sort-best.",
    "- Changing the set or the length starts a new round immediately."
  ],
  sort: [
    "- Numbers run from 10 to 99, and every number belongs to exactly one bin.",
    "- One point per correct sort; one point lost per mistake, never below zero.",
    "- Your longest correct run is shown as the streak; your best score is kept in this browser under mg-bins-best.",
    "- The round ends when the timer reaches zero, and the bins lock until you start again.",
    "- Nothing is fetched and no round is uploaded; the score lives in localStorage only."
  ],
  math: [
    "- Easy: addition and subtraction with numbers up to 20.",
    "- Medium: multiplication from 2 to 12, exact division, and small addition or subtraction to 30.",
    "- Hard: multiplication to 20, exact division, and addition or subtraction with numbers up to 100.",
    "- One point per correct answer, no bonus for speed within the round — the clock is the pressure.",
    "- Your best score for each difficulty is kept in this browser under mg-math-best.",
    "- When the timer reaches zero the round ends and the input locks until you start again."
  ],
  slide: [
    "- Only tiles sharing an edge with the gap can move; diagonal neighbours cannot.",
    "- Every shuffle is produced by making a few hundred legal moves from the solved board, so a solution always exists.",
    "- Your score is the number of moves, with time as a tiebreaker for your own records.",
    "- The best move count for each board size is kept in this browser under mg-slide-best.",
    "- Shuffling starts a fresh board, resets the counters and keeps the best score."
  ],
  pattern: [
    "- Five sequences per day, one attempt each, all with whole-number answers.",
    "- Answers may be negative only in the subtraction set, and even there the sequence stays above zero.",
    "- Your best day is the highest number of correct answers out of five, kept under mg-pattern-best.",
    "- The daily streak is stored under mg-pattern-streak and counts consecutive days you finished the set.",
    "- Restarting replays today's five puzzles; it does not generate new ones."
  ],
  codebreak: [
    "- Easy: three digits from 1 to 5, no repeats, eight guesses.",
    "- Medium: four digits from 1 to 6, repeats allowed, ten guesses.",
    "- Hard: five digits from 1 to 8, repeats allowed, twelve guesses.",
    "- You win by matching the code exactly; your score is the number of guesses it took, and the lowest score per difficulty is kept in your browser.",
    "- Running out of guesses reveals the code, and the round counts as a loss — the best score is not touched."
  ]
};
