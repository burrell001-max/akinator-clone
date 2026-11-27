/* Single source of truth for the arcade: the 30 games and the 10 categories.

   The hub markup, the category landing pages, the "more in this category"
   blocks and the Open Graph cards are all generated from here, so a game's
   name, blurb and categories only exist once. tools/qa/check-site.mjs compares
   the generated pages back against this file.

   cats[0] is the game's home category; the rest are cross-listed. The order
   must match data-cats on the hub cards.
*/

export const CATEGORY_ORDER = [
  "brain", "daily", "number", "word", "crossword",
  "sudoku", "memory", "sort", "math", "puzzle"
];

export const CATEGORIES = {
  brain: {
    name: "Brain Games",
    slug: "brain-games",
    ogSub: "Deduction, codebreaking, memory, numbers and sorting - 27 games on one shelf.",
    tone: "brain",
    glyph: "🧠",
    title: "Brain Games — Free Logic, Deduction & Thinking Puzzles",
    description: "Twenty-seven free brain games: deduction, codebreaking, memory, numbers and sorting. Instant play in the browser, no account, no download.",
    lede: "The widest shelf in the arcade. Brain Games collects everything that asks you to hold a rule in your head and reason forward: deduction, codebreaking, memory, arithmetic under pressure and puzzles that punish a rushed click.",
    overview: [
      "These are the games you can start without reading a manual and still lose to on the first try. Most ask for the same three habits: scan the board before acting, keep a note of what you have ruled out, and stop when the next move is a guess rather than an inference.",
      "Every game here runs on the same page it loads from — no install, no account and no timer you cannot pause. Scores live in your own browser, so clearing site data resets your bests."
    ],
    trains: "Deduction, working memory and the discipline of checking a move before committing to it. Several of these games (Codebreaker, Crossword Detective, Shift Sort) are pure logic: every position has exactly one correct next step, and the score is how quickly you find it rather than how fast you can click.",
    howto: [
      "Pick a game by the difficulty tag. Easy means a full round fits in a minute or two; Hard means you should expect to lose the first attempt while you learn the rules.",
      "Nothing needs setting up. Press start, or make the first move — the games build their own boards from your system clock where a daily puzzle is involved."
    ],
    tips: [
      "Play one game three times rather than three games once. The rules stick after the second round; the strategy only appears on the third.",
      "When you are stuck, describe the board out loud. Naming the constraint you have not used yet is usually enough to see the move.",
      "Use the ribbon above to narrow to a single shelf if you want a run of similar puzzles."
    ]
  },
  daily: {
    name: "Daily Games",
    slug: "daily-games",
    ogSub: "One fresh board a day, the same for everyone. Five dailies, one streak.",
    tone: "daily",
    glyph: "📅",
    title: "Daily Games — A Fresh Free Puzzle Every Day",
    description: "Five free daily puzzles: nonogram, number sequence, Sudoku, crossword clues and a fraction ladder. One board a day, the same for everyone, with a streak to keep.",
    lede: "One board a day, built from the date so everybody gets the same puzzle. Finish it and the streak goes up; miss a day and it resets. Five different dailies, so there is always something waiting that takes five minutes instead of fifty.",
    overview: [
      "Daily puzzles work because they are finite. You cannot grind them, you cannot replay them for a better score, and the only thing to protect is the streak. That turns a two-minute puzzle into a habit rather than a session.",
      "Each daily game seeds its board from today's date, so the puzzle you see is the puzzle everyone else sees on the same day. Streaks and bests are stored locally in your browser; they are per device and never sent anywhere."
    ],
    trains: "Consistency and short-form problem solving. The daily set deliberately mixes formats — a picture-logic grid, a number sequence, a Sudoku, five crossword clues and an ordering puzzle — so the same habit is built across different kinds of thinking instead of one.",
    howto: [
      "Open a game and it loads today's board automatically; there is no start button to find.",
      "Finish it before midnight local time to keep the streak. The next day's board is generated from the new date when you reload."
    ],
    tips: [
      "Do the shortest one first. A finished daily protects the streak on a busy day, and the streak is the whole point.",
      "If a daily is going badly, leave it open in a tab rather than guessing. There is no timer on the daily nonogram or sequence.",
      "Rotate which daily you do first each week so you are not always leaning on your strongest format."
    ]
  },
  number: {
    name: "Number Games",
    slug: "number-games",
    ogSub: "Merge tiles, crack codes and solve Sudoku - twelve number games, no worksheets.",
    tone: "number",
    glyph: "🔢",
    title: "Number Games — Free Maths, Sudoku & Number Puzzles",
    description: "Twelve free number games: merge tiles, Sudoku, arithmetic sprints, codebreaking and number sorting. Play instantly in the browser with no sign-up.",
    lede: "Numbers, but not worksheets. This shelf holds the tile-merging, digit-echoing, arithmetic-sprinting end of the arcade, plus the Sudoku boards that live here as much as they do on their own shelf.",
    overview: [
      "Number games are the easiest to make boring and the hardest to make fair. Everything here is generated rather than hand-authored, so the board is different every time, and every one of them shows you the arithmetic instead of hiding it behind a score.",
      "Expect short sessions. Quick Sums and Missing Number are sixty-second sprints; Merge Up and the Sudoku boards reward a slower, more careful pass."
    ],
    trains: "Arithmetic fluency, pattern recognition in sequences, and the mental bookkeeping that comes with tracking several numbers at once. The Sudoku boards add constraint reasoning on top: no arithmetic, but the same working-memory load.",
    howto: [
      "Start with Quick Sums if you want a warm-up — sixty seconds, four operations, immediate feedback.",
      "For something slower, Merge Up and the Sudoku pages have no clock at all and save your best score locally."
    ],
    tips: [
      "In Merge Up, keep your largest tile in a corner and never swipe it out of it. Most lost runs are a corner broken by an unnecessary swipe.",
      "In Quick Sums, answer the operation you can see instantly and skip the one you cannot. The skipped question costs less than a wrong guess breaks your streak.",
      "Sudoku is on this shelf and on its own — the Sudoku page has the four-difficulty grid with conflict highlighting."
    ]
  },
  word: {
    name: "Word Games",
    slug: "word-games",
    ogSub: "Guess the word, unscramble the anagram, then take on the crossword shelf.",
    tone: "word",
    glyph: "🔤",
    title: "Word Games — Free Anagram, Word Guess & Vocabulary Puzzles",
    description: "Seven free word games: guess the five-letter word, solve anagram clues, and work crossword-style puzzles. No account needed, instant play.",
    lede: "Seven games about letters: a five-letter deduction game, two anagram hunts and the crossword shelf's wordier end. Short rounds, small vocabularies, no obscure dictionary words to make you feel cheated.",
    overview: [
      "The word games here use a modest, everyday vocabulary on purpose. A puzzle you lose because the answer was an archaic plural teaches nothing; a puzzle you lose because you missed a common word teaches you to look again.",
      "Word Guess is the deduction game — six attempts, green for the right letter in the right place, amber for the right letter in the wrong one. Anagram Hunt and Clue Anagrams are vocabulary recall against a clock, with hints that cost points rather than ending the round."
    ],
    trains: "Vocabulary recall, anagram fluency and — in Word Guess — the same elimination logic as the number and codebreaking games, applied to letters instead of digits.",
    howto: [
      "Word Guess needs a five-letter word. Type a guess, press enter, and use the colours to narrow the answer; the keyboard shows which letters are still available.",
      "The anagram games give you a clue plus the answer's letters scrambled. Type the answer and press enter, or take a hint and lose points."
    ],
    tips: [
      "Open Word Guess with a word that has five different common letters rather than a word you like. Vowel coverage beats guessing the answer outright.",
      "In anagrams, count the vowels first. A nine-letter scramble with two vowels is almost always a compound or a suffix-heavy word.",
      "If a crossword clue has an enumeration, read it before the clue. The letter count rules out more answers than the definition does."
    ]
  },
  crossword: {
    name: "Crosswords",
    slug: "crosswords",
    ogSub: "A mini crossword, clue sprints, daily clues and a word square to repair.",
    tone: "cross",
    glyph: "✏️",
    title: "Crosswords — Free Mini Crosswords, Clues & Word Squares",
    description: "Five free crossword games: a six-by-six mini crossword, clue sprints, anagram clues, daily clues and a tampered word square to repair. Play in the browser.",
    lede: "Crossword thinking without a newspaper subscription: a six-by-six word square, clue sprints against the clock, a daily set of five clues, and a finished grid with letters quietly swapped for you to catch.",
    overview: [
      "A crossword is two puzzles at once. The clue is a definition with the grammar filed off, and the grid is a constraint system where every answer has to agree with the ones crossing it. The games here separate those halves so you can practise either one.",
      "Mini Crossword and Crossword Detective are grid-first: you get crossings and have to make the letters agree. Clue Cards, Clue Anagrams and Daily Clues are clue-first, with the grid reduced to a single answer at a time."
    ],
    trains: "Lateral reading of definitions, vocabulary under time pressure, and the constraint satisfaction of a crossed grid — the same skill that makes a full-size cryptic tractable once you stop reading clues in isolation.",
    howto: [
      "Start with Mini Crossword. Six clues, six letters, every answer reads both across and down, so a wrong entry contradicts itself immediately.",
      "For a timed session, Clue Cards gives ten clues and two minutes; hints reveal a letter and cost points."
    ],
    tips: [
      "Fill the crossings before the long answers. A three-letter word with two known letters is nearly solved; a nine-letter answer with one known letter is not.",
      "In Crossword Detective, read every clue against the grid. The tampered letters are the ones that make two crossings disagree.",
      "Enumerations are part of the clue, not decoration — (4,3) means a four-letter word and a three-letter word, not a seven-letter one."
    ]
  },
  sudoku: {
    name: "Sudoku",
    slug: "sudoku",
    ogSub: "Full grid, six-by-six, mini and a daily board, every one unique-solution checked.",
    tone: "sudoku",
    glyph: "9️⃣",
    title: "Sudoku — Free Sudoku, Mini Sudoku & Daily Sudoku",
    description: "Five free Sudoku games: full nine-by-nine with four difficulties, daily, six-by-six, mini four-by-four and a phone-first pocket board. Unique-solution grids.",
    lede: "Five Sudoku boards at four different sizes: the full nine-by-nine grid, a daily board seeded from the date, a six-by-six, a four-by-four mini and a pocket layout built for a thumb.",
    overview: [
      "Every board here is generated and checked for a unique solution, which is the difference between a Sudoku and a guessing game. If two solutions exist the puzzle is broken, however pretty the grid looks.",
      "The pages share one solver, so conflict highlighting, keyboard entry and the solved counter behave the same wherever you start. Pick the size that matches the time you have: mini in under a minute, six-by-six in five, full grid in whatever it takes."
    ],
    trains: "Constraint reasoning and patient scanning. Sudoku has no arithmetic — the digits are just labels — so what improves with practice is your ability to notice which house a candidate is excluded from.",
    howto: [
      "Click a cell, then type or tap a digit. Conflicts are highlighted as soon as they appear.",
      "There is no penalty for a wrong entry beyond the highlight; erase and try again. The timer and solved counter are for your own comparison."
    ],
    tips: [
      "Scan for a digit rather than a cell. Pick a number and sweep the grid for the one box that can still hold it.",
      "When you are stuck, stop looking at candidates and count: a row with seven filled cells has two digits left, and that is usually where the next placement is.",
      "Do not guess. Every board here has a unique solution reachable by logic, so a guess means a missed observation, not a hard puzzle."
    ]
  },
  memory: {
    name: "Memory Games",
    slug: "memory-games",
    ogSub: "Card matching, pad sequences, flashing grids and digit echo - find your limit.",
    tone: "memory",
    glyph: "🧠",
    title: "Memory Games — Free Memory Match, Sequence & Recall Games",
    description: "Five free memory games: card matching, a growing pad sequence, flashing grid squares, digit echo and shape order recall. Progress saved in your browser.",
    lede: "Five ways to find the edge of your short-term memory: a card-matching board, a growing pad sequence, a flashing grid, strings of digits and a set of shapes that scatter before you click them.",
    overview: [
      "All five are the same experiment in different clothing. Something is shown, it is taken away, and you reproduce it. What changes is the material — positions, sounds, digits, shapes — and how much of it arrives at once.",
      "The games level up on success, so the score is the point where your technique stops working. That is the interesting part: most people plateau not because their memory is full but because their chunking strategy stopped scaling."
    ],
    trains: "Short-term and working memory, with a specific emphasis on chunking: grouping items so a sequence of twelve becomes four groups of three rather than twelve separate things to hold.",
    howto: [
      "Memory Match is the gentlest: flip two cards at a time and remember what you saw. Six pairs, no timer.",
      "Pattern Echo, Grid Flash, Digit Echo and Order Recall all show a pattern, hide it, then ask you to reproduce it. Each clears one more item after every success."
    ],
    tips: [
      "Chunk deliberately. In the echo games, group the sequence in threes as it plays instead of waiting for it to finish.",
      "Say the material out loud — digits and directions especially. Words survive interference better than positions.",
      "In Memory Match, clear a row before hunting for a pair. A known pair in a row you are still scanning is wasted information.",
      "Stop at a good run rather than grinding to failure. The last two rounds before a fail teach nothing and cost the next session's confidence."
    ]
  },
  sort: {
    name: "Sort Games",
    slug: "sort-games",
    ogSub: "Order it, bin it, repair it: five games about putting things in the right place.",
    tone: "sort",
    glyph: "🎨",
    title: "Sort Games — Free Ordering, Sorting & Sequence Puzzles",
    description: "Five free sorting games: click numbers into order, bin values by rule, repair a shuffled row in the fewest swaps, order events by year and rank fractions.",
    lede: "Ordering, binned, repaired and against the clock. Five games that all come down to one question — does this belong before that? — with numbers, fractions and historical dates as the material.",
    overview: [
      "Sorting games look trivial and are not. The hard part is never comparing two items; it is holding the whole set in your head while you decide where the middle one goes. Each game here attacks that from a different angle.",
      "Sort Sprint asks for the order directly. Sort Bins gives you a rule instead of a sequence. Shift Sort gives you a scrambled row and counts your swaps. Timeline hides the years until you commit. Fraction Ladder mixes four notations for the same value."
    ],
    trains: "Comparison and ordering under time pressure, plus the working-memory load of tracking a partially built sequence — the same skill as alphabetising a list without writing it down.",
    howto: [
      "Pick Sort Sprint for a warm-up: click the shuffled set into order, numbers low to high or words A to Z.",
      "Shift Sort is the puzzle end — swap adjacent values until the row is ordered, in as few swaps as you can manage."
    ],
    tips: [
      "In Fraction Ladder, convert everything to one notation in your head before comparing. Two fractions with different denominators are not comparable at a glance.",
      "In Shift Sort, count the cycles rather than the pairs. A cycle of three values needs two swaps, not three.",
      "In Timeline, anchor on the events you are sure of and place the uncertain ones relative to them."
    ]
  },
  math: {
    name: "Math Games",
    slug: "math-games",
    ogSub: "Arithmetic sprints, missing values, equation building and fraction ranking.",
    tone: "math",
    glyph: "➕",
    title: "Math Games — Free Arithmetic Sprints & Number Puzzles",
    description: "Six free maths games: sixty-second arithmetic, missing-value equations, build-the-target equations, fraction ranking, sorting rules and daily sequences.",
    lede: "Six games where the arithmetic is the game rather than the obstacle: sprint drills, missing values, equation building, fraction ranking and rules-based sorting.",
    overview: [
      "None of these need a calculator, and none of them are about long division. They are about the small arithmetic decisions you make constantly — which operation to reach for, whether a value is plausible, and how to work backwards from an answer you already know.",
      "Quick Sums and Missing Number are sixty-second sprints. Equation Forge is slower and puzzle-shaped: four numbers, three operators and a target, with the answer checked left to right."
    ],
    trains: "Arithmetic fluency, estimation and algebraic backwards-reasoning — the habit of asking what the missing value must be instead of computing forward from what you have.",
    howto: [
      "Quick Sums gives you sixty seconds and four operations; a streak multiplier rewards consecutive correct answers.",
      "Equation Forge is untimed: arrange the operator slots until the four numbers reach the target."
    ],
    tips: [
      "In Equation Forge, work backwards from the target. The last operation is usually the one that constrains the rest.",
      "In Missing Number, cover the missing value and estimate. If the answer looks like it should be around 40, options outside that band are almost always wrong.",
      "In Quick Sums, protect the streak: a skipped question costs one point, a wrong answer costs the multiplier."
    ]
  },
  puzzle: {
    name: "Puzzle Games",
    slug: "puzzle-games",
    ogSub: "Sliding tiles, picture logic and word squares - always solvable, never guessed.",
    tone: "puzzle",
    glyph: "🧩",
    title: "Puzzle Games — Free Sliding, Logic & Picture Puzzles",
    description: "Eight free puzzle games: sliding tile puzzles, nonograms, word squares and logic grids. Every shuffle solvable, every board checked. Instant play.",
    lede: "The puzzle shelf: sliding tiles that are always solvable, a picture-logic nonogram, word squares and the logic puzzles that fit nowhere else. Slower than the arcade's sprints and better for it.",
    overview: [
      "Puzzles here are generated with a guarantee. Slide Fifteen is shuffled by legal moves from a solved board, so no arrangement is impossible. Daily Nonogram is built from the date and checked before it is shown. Nothing asks you to solve a board that cannot be solved.",
      "That matters more than it sounds. Most of the frustration in a bad puzzle is not difficulty, it is discovering halfway through that the position was unreachable from the start."
    ],
    trains: "Spatial reasoning, planning several moves ahead, and the willingness to make a board temporarily worse in order to make it better — the core of every sliding-tile puzzle.",
    howto: [
      "Slide Fifteen: click a tile next to the gap to slide it. Choose three-by-three for a quick solve or four-by-four for the full version.",
      "Daily Nonogram: read the row and column counts, fill the cells that must be filled, and mark the ones that must not be."
    ],
    tips: [
      "In Slide Fifteen, solve the top row first and never disturb it again. Row-by-row beats chasing the gap.",
      "In a nonogram, start with the longest run in any line. A run of four in a five-cell row has only two legal positions and both share the middle cells.",
      "If a puzzle has stopped being fun, restart it. These boards are generated fresh, so there is no sunk cost in a shuffle you did not choose."
    ]
  }
};

export const GAMES = [
  { slug: "brain-codebreaker", name: "Codebreaker", cats: ["brain", "number"], difficulty: "Medium", tags: ["Logic", "10 guesses"], tone: "brain", glyph: "🔐",
    blurb: "Guess a hidden code from exact and near-miss feedback. Three difficulty levels and ten guesses." },
  { slug: "daily-nonogram", name: "Daily Nonogram", cats: ["daily", "puzzle", "brain"], difficulty: "Easy", tags: ["Picture logic", "Daily"], tone: "daily", glyph: "📅",
    blurb: "One six-by-six picture logic grid per day, built from the date. Tracks your streak." },
  { slug: "number-merge", name: "Merge Up", cats: ["number", "puzzle", "brain"], difficulty: "Easy", tags: ["Tiles", "Endless"], tone: "number", glyph: "🔢",
    blurb: "Slide and combine matching number tiles on a 4×4 board to double them." },
  { slug: "word-anagram", name: "Anagram Hunt", cats: ["word", "brain"], difficulty: "Medium", tags: ["Vocabulary", "Timed"], tone: "word", glyph: "🔤",
    blurb: "Ten scrambled words, a clue for each, and points that a hint will cost you." },
  { slug: "word-guess", name: "Word Guess", cats: ["word", "brain"], difficulty: "Medium", tags: ["Deduction", "6 tries"], tone: "word", glyph: "🔤",
    blurb: "Deduce the hidden five-letter word in six attempts using green and amber feedback." },
  { slug: "crossword-mini", name: "Mini Crossword", cats: ["crossword", "word", "brain"], difficulty: "Easy", tags: ["Word square", "6×6"], tone: "cross", glyph: "✏️",
    blurb: "A six-by-six word square: six clues, and every answer reads across and down." },
  { slug: "pocket-sudoku", name: "Pocket Sudoku", cats: ["sudoku", "number", "puzzle", "brain"], difficulty: "Easy–Hard", tags: ["Phone-first", "Numpad"], tone: "sudoku", glyph: "9️⃣",
    blurb: "A quick nine-by-nine board with Easy, Medium and Hard, a numpad built for phones, and a solved counter." },
  { slug: "sudoku", name: "Sudoku", cats: ["sudoku", "number", "puzzle", "brain"], difficulty: "Easy–Expert", tags: ["Full grid", "Keyboard"], tone: "sudoku", glyph: "9️⃣",
    blurb: "The full grid: four difficulties, conflict highlighting, keyboard play and a timer." },
  { slug: "memory", name: "Memory Match", cats: ["memory", "brain"], difficulty: "Easy", tags: ["Card matching", "No timer"], tone: "memory", glyph: "🧠",
    blurb: "Flip cards and match all six pairs in as few moves as possible." },
  { slug: "memory-echo", name: "Pattern Echo", cats: ["memory", "brain"], difficulty: "Medium", tags: ["Sequence", "Keyboard"], tone: "memory", glyph: "🔔",
    blurb: "Watch four pads light up in sequence, then repeat it back as the run grows." },
  { slug: "sort-sequence", name: "Sort Sprint", cats: ["sort", "number", "brain"], difficulty: "Easy", tags: ["Ordering", "Timed"], tone: "sort", glyph: "🎨",
    blurb: "Click a shuffled set into order — numbers low to high, or words A to Z — against the clock." },
  { slug: "math-speed", name: "Quick Sums", cats: ["math", "number", "brain"], difficulty: "Easy", tags: ["60 seconds", "Streak"], tone: "math", glyph: "⚡",
    blurb: "Sixty seconds of arithmetic across four operations, with a streak to protect." },
  { slug: "puzzle-slide", name: "Slide Fifteen", cats: ["puzzle", "brain"], difficulty: "Medium", tags: ["Sliding tiles", "3×3 / 4×4"], tone: "puzzle", glyph: "🧩",
    blurb: "Arrange the numbered tiles on a 3×3 or 4×4 board. Every shuffle is solvable." },
  { slug: "sort-fractions", name: "Fraction Ladder", cats: ["sort", "math", "daily"], difficulty: "Hard", tags: ["Fractions", "Timed"], tone: "sort", glyph: "🎨",
    blurb: "Eight values in four notations — fractions, decimals, percentages, mixed numbers — clicked into ascending order against the clock." },
  { slug: "sort-bins", name: "Sort Bins", cats: ["sort", "math"], difficulty: "Medium", tags: ["Rules", "45 seconds"], tone: "sort", glyph: "🎨",
    blurb: "Forty-five seconds, three bins, one rule set at a time. Send each number to the bin that obeys the rule." },
  { slug: "sort-shifter", name: "Shift Sort", cats: ["sort", "brain"], difficulty: "Hard", tags: ["Fewest swaps", "Logic"], tone: "sort", glyph: "🎨",
    blurb: "Repair a scrambled row of seven numbers using the fewest swaps. No hints, no reshuffles." },
  { slug: "sort-timeline", name: "Timeline", cats: ["sort", "brain"], difficulty: "Medium", tags: ["History", "Ordering"], tone: "sort", glyph: "🎨",
    blurb: "Six historical events a round. Click them in the order they happened, with the years hidden until you commit." },
  { slug: "math-target", name: "Equation Forge", cats: ["math", "number", "brain"], difficulty: "Medium", tags: ["Equations", "Untimed"], tone: "math", glyph: "➕",
    blurb: "Four numbers, three empty operator slots and a target. Build the equation left to right." },
  { slug: "math-missing", name: "Missing Number", cats: ["math", "number", "brain"], difficulty: "Easy", tags: ["Algebra", "60 seconds"], tone: "math", glyph: "➕",
    blurb: "Sixty seconds of equations with one value hidden somewhere different each time." },
  { slug: "daily-pattern", name: "Daily Sequence", cats: ["daily", "math", "brain"], difficulty: "Medium", tags: ["Sequences", "Daily"], tone: "daily", glyph: "📅",
    blurb: "Five number sequences rebuilt from today's date. Find the rule and supply the next term." },
  { slug: "sudoku-daily", name: "Daily Sudoku", cats: ["sudoku", "daily", "number", "puzzle", "brain"], difficulty: "Medium", tags: ["Daily", "Unique solution"], tone: "sudoku", glyph: "9️⃣",
    blurb: "One nine-by-nine grid a day, date-seeded and checked for a unique solution, with a streak to keep." },
  { slug: "sudoku-six", name: "Sudoku Six", cats: ["sudoku", "number", "puzzle", "brain"], difficulty: "Easy", tags: ["6×6", "Fresh grid"], tone: "sudoku", glyph: "9️⃣",
    blurb: "A six-by-six grid with two-by-three boxes: shorter than a full Sudoku, same logic, fresh grid every game." },
  { slug: "sudoku-mini", name: "Sudoku Mini", cats: ["sudoku", "number", "puzzle", "brain"], difficulty: "Easy", tags: ["4×4", "Under a minute"], tone: "sudoku", glyph: "9️⃣",
    blurb: "Four by four, four digits, two-by-two boxes. A Sudoku you can finish in under a minute." },
  { slug: "memory-grid", name: "Grid Flash", cats: ["memory", "brain"], difficulty: "Medium", tags: ["Spatial", "Rounds"], tone: "memory", glyph: "🧠",
    blurb: "Squares light up on a four-by-four grid, then go dark. Click them back as each round adds one more." },
  { slug: "memory-numbers", name: "Digit Echo", cats: ["memory", "number", "brain"], difficulty: "Medium", tags: ["Digits", "Typing"], tone: "memory", glyph: "🧠",
    blurb: "A string of digits flashes up and vanishes. Type it back and the next string is one digit longer." },
  { slug: "memory-order", name: "Order Recall", cats: ["memory", "brain"], difficulty: "Medium", tags: ["Shapes", "Sequence"], tone: "memory", glyph: "🧠",
    blurb: "Shapes appear in a numbered order, then scatter. Click them back in the sequence you saw." },
  { slug: "crossword-clues", name: "Clue Cards", cats: ["crossword", "word", "brain"], difficulty: "Medium", tags: ["Two minutes", "Hints"], tone: "cross", glyph: "✏️",
    blurb: "Ten crossword clues with enumerations in two minutes. Hints reveal a letter and cost points." },
  { slug: "crossword-anagrams", name: "Clue Anagrams", cats: ["crossword", "word"], difficulty: "Hard", tags: ["Anagrams", "One minute"], tone: "cross", glyph: "✏️",
    blurb: "Each clue comes with its answer's letters shuffled. Rearrange them before the minute is up." },
  { slug: "crossword-daily", name: "Daily Clues", cats: ["crossword", "daily", "word", "brain"], difficulty: "Medium", tags: ["Daily", "One attempt"], tone: "cross", glyph: "✏️",
    blurb: "Five crossword clues a day, the same for everybody, with one attempt each and a daily streak." },
  { slug: "crossword-detective", name: "Crossword Detective", cats: ["crossword", "word", "brain"], difficulty: "Hard", tags: ["Logic", "Word square"], tone: "cross", glyph: "✏️",
    blurb: "A finished five-by-five word square with letters tampered with. Use the clues to find the fakes." }
];

/* Adjacent shelves used by the "Also try" links on game pages. */
export const NEIGHBOURS = {
  brain: ["puzzle", "memory"],
  daily: ["crossword", "sudoku"],
  number: ["math", "sudoku"],
  word: ["crossword", "daily"],
  crossword: ["word", "daily"],
  sudoku: ["number", "daily"],
  memory: ["brain", "puzzle"],
  sort: ["math", "number"],
  math: ["number", "sort"],
  puzzle: ["brain", "daily"]
};
