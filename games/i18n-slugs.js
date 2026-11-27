/* Canonical game order for the arcade. Titles and instructions in
   i18n-data-a/b.js are indexed arrays in exactly this order, which keeps the
   translation files compact and makes a missing language easy to spot. */
window.MGI18N_SLUGS = [
  "brain-codebreaker", "daily-nonogram", "number-merge", "word-anagram",
  "word-guess", "crossword-mini", "pocket-sudoku", "sudoku", "memory",
  "memory-echo", "sort-sequence", "math-speed", "puzzle-slide",
  "sort-fractions", "sort-bins", "sort-shifter", "sort-timeline",
  "math-target", "math-missing", "daily-pattern", "sudoku-daily",
  "sudoku-six", "sudoku-mini", "memory-grid", "memory-numbers", "memory-order",
  "crossword-clues", "crossword-anagrams", "crossword-daily",
  "crossword-detective"
];

/* Games share a guide when they share a mechanic, so a short translated guide
   can replace the long English essay without repeating it eight times. */
window.MGI18N_GUIDE = {
  "brain-codebreaker": "codebreak",
  "daily-nonogram": "nonogram",
  "number-merge": "merge",
  "word-anagram": "anagram",
  "word-guess": "wordguess",
  "crossword-mini": "crossword",
  "crossword-clues": "crossword",
  "crossword-anagrams": "crossword",
  "crossword-daily": "crossword",
  "crossword-detective": "crossword",
  "pocket-sudoku": "sudoku",
  "sudoku": "sudoku",
  "sudoku-daily": "sudoku",
  "sudoku-six": "sudoku",
  "sudoku-mini": "sudoku",
  "memory": "pairs",
  "memory-echo": "sequence",
  "memory-grid": "sequence",
  "memory-numbers": "sequence",
  "memory-order": "sequence",
  "sort-sequence": "sort",
  "sort-fractions": "sort",
  "sort-bins": "sort",
  "sort-shifter": "sort",
  "sort-timeline": "sort",
  "math-speed": "math",
  "math-missing": "math",
  "math-target": "math",
  "daily-pattern": "pattern",
  "puzzle-slide": "slide"
};
