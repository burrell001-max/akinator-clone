/* Shared memory-game engine.

   Five pages under /games/ are memory games, and they had quietly grown the
   same four pieces of machinery: a shuffled set of symbols or pads, a round
   counter that grows, a best-score record in localStorage, and a pending
   "next round" timeout. Each page had its own copy of the timeout handling,
   and each copy had the same bug: clicking Start inside that timeout let the
   old callback fire into the new game, so a restarted run began at level two.

   This module owns those pieces once:

     MGMemory.timers()        restart-safe after()/clear() scheduling
     MGMemory.sound.play()    one lazily created AudioContext for every game
     MGMemory.bestValue()     read a numeric record from an existing mg- key
     MGMemory.commitBest()    write it only when the run actually beats it
     MGMemory.counter()       increment a lifetime tally
     MGMemory.streak()        successes in a row, reset on a miss
     MGMemory.deck()          a shuffled, doubled symbol deck
     MGMemory.matchGame()     card-flip rules, move counting, win detection
     MGMemory.sequenceGame()  growing-sequence rounds with playback and tones

   The pages keep their own markup, headings, copy and storage keys: every
   default here matches what the pages already wrote, so existing records
   survive untouched.
*/
(function (global) {
  "use strict";

  var MG = global.MG;
  if (!MG || !MG.store) throw new Error("memory-engine.js needs games.js loaded first");

  var MGMemory = {};

  /* ── Sound ────────────────────────────────────────────────────────────────
     Audio is a bonus: browsers block it until a gesture and some throw on
     construction, so every failure here is silent. */
  var context = null;

  function audio() {
    if (context) return context;
    var Ctor = global.AudioContext || global.webkitAudioContext;
    if (!Ctor) return null;
    try {
      context = new Ctor();
    } catch (error) {
      context = null;
    }
    return context;
  }

  MGMemory.sound = {
    play: function (frequency, duration, volume) {
      var ctx = audio();
      if (!ctx) return;
      try {
        if (ctx.state === "suspended" && ctx.resume) ctx.resume();
        var oscillator = ctx.createOscillator();
        var gain = ctx.createGain();
        oscillator.type = "sine";
        oscillator.frequency.value = frequency;
        gain.gain.value = volume == null ? 0.07 : volume;
        oscillator.connect(gain);
        gain.connect(ctx.destination);
        oscillator.start();
        oscillator.stop(ctx.currentTime + (duration || 0.2));
      } catch (error) { /* audio is optional */ }
    }
  };

  /* ── Timers ───────────────────────────────────────────────────────────────
     A game gets one of these per session. clear() on restart is what stops a
     stale "next round" callback from landing in the new run. */
  function Timers() {
    this.handles = [];
  }

  Timers.prototype.after = function (ms, fn) {
    var id = global.setTimeout(fn, ms);
    this.handles.push(id);
    return id;
  };

  Timers.prototype.every = function (ms, fn) {
    var id = global.setInterval(fn, ms);
    this.handles.push(id);
    return id;
  };

  Timers.prototype.clear = function () {
    this.handles.forEach(function (id) {
      global.clearTimeout(id);
      global.clearInterval(id);
    });
    this.handles = [];
    return this;
  };

  MGMemory.timers = function () { return new Timers(); };

  /* ── Records ──────────────────────────────────────────────────────────────
     The pages store plain numbers ("6", "12") under their mg- keys. */
  MGMemory.bestValue = function (key) {
    var raw = MG.store.get(key, null);
    if (raw === null || raw === "" || typeof raw === "object") return null;
    var value = Number(raw);
    return isFinite(value) ? value : null;
  };

  /* lowerIsBetter for move counts and times; the default is "bigger wins". */
  MGMemory.commitBest = function (key, value, lowerIsBetter) {
    var current = MGMemory.bestValue(key);
    var improved = current === null || (lowerIsBetter ? value < current : value > current);
    if (improved) MG.store.set(key, value);
    return { improved: improved, value: improved ? value : current };
  };

  MGMemory.counter = function (key) {
    var next = (MGMemory.bestValue(key) || 0) + 1;
    MG.store.set(key, next);
    return next;
  };

  MGMemory.streak = function (key) {
    return {
      value: function () { return MGMemory.bestValue(key) || 0; },
      bump: function () {
        var next = this.value() + 1;
        MG.store.set(key, next);
        return next;
      },
      reset: function () {
        MG.store.set(key, 0);
        return 0;
      }
    };
  };

  /* ── Cards ────────────────────────────────────────────────────────────────
     A memory deck is each symbol twice, shuffled. */
  MGMemory.deck = function (symbols) {
    return MG.shuffle(symbols.concat(symbols));
  };

  /* Card matching: one card, then a second; a matched pair stays face up, a
     wrong pair turns back after lockMs and still costs a move. The page owns
     the visuals and calls the callbacks; the engine owns the rules, the move
     count, the clock and the win condition. */
  MGMemory.matchGame = function (opts) {
    opts = opts || {};
    var lockMs = opts.lockMs == null ? 750 : opts.lockMs;
    var total = opts.pairs;
    var timers = new Timers();
    var first = null;
    var second = null;
    var locked = false;
    var moves = 0;
    var pairs = 0;
    var seconds = 0;
    var ticker = null;
    var started = false;
    var won = false;

    function stopClock() {
      if (ticker) global.clearInterval(ticker);
      ticker = null;
    }

    function startClock() {
      if (started || won) return;
      started = true;
      ticker = global.setInterval(function () {
        seconds++;
        if (opts.onClock) opts.onClock(seconds);
      }, 1000);
    }

    function reset() {
      timers.clear();
      stopClock();
      first = null;
      second = null;
      locked = false;
      moves = 0;
      pairs = 0;
      seconds = 0;
      started = false;
      won = false;
      if (opts.onReset) opts.onReset();
    }

    function choose(card) {
      if (!card || locked || won) return false;
      if (card === first || card === second) return false;
      if (opts.isFaceUp && opts.isFaceUp(card)) return false;
      startClock();
      if (!first) {
        first = card;
        if (opts.onFlip) opts.onFlip(card);
        return true;
      }
      second = card;
      if (opts.onFlip) opts.onFlip(card);
      moves++;
      if (opts.onMove) opts.onMove(moves);

      if (first.dataset.symbol === second.dataset.symbol) {
        var matchedA = first;
        var matchedB = second;
        first = null;
        second = null;
        pairs++;
        if (opts.onMatch) opts.onMatch(matchedA, matchedB, pairs);
        if (pairs === total) {
          won = true;
          stopClock();
          if (opts.onWin) opts.onWin({ moves: moves, seconds: seconds });
        }
        return true;
      }

      /* Keep the pair locally: a New game click can null the shared pointers
         before this timeout runs, and the cards still have to turn back. */
      var wrongA = first;
      var wrongB = second;
      first = null;
      second = null;
      locked = true;
      timers.after(lockMs, function () {
        locked = false;
        if (opts.onMismatch) opts.onMismatch(wrongA, wrongB);
      });
      return true;
    }

    return {
      choose: choose,
      reset: reset,
      moves: function () { return moves; },
      pairs: function () { return pairs; },
      seconds: function () { return seconds; },
      locked: function () { return locked; },
      won: function () { return won; }
    };
  };

  /* Growing-sequence rounds (Pattern Echo): a cue of N steps is played back,
     the player repeats it, and each cleared round appends one more step.
     Every scheduled step belongs to a token, so a replay or a restart cancels
     the previous playback instead of leaving two flash loops fighting. */
  MGMemory.sequenceGame = function (opts) {
    opts = opts || {};
    var timers = new Timers();
    var sequence = [];
    var index = 0;
    var level = 0;
    var playing = false;
    var running = false;
    var token = 0;

    function enable(on) {
      if (opts.setEnabled) opts.setEnabled(on);
    }

    function play() {
      token++;
      var mine = token;
      playing = true;
      enable(false);
      if (opts.onPlaybackStart) opts.onPlaybackStart(sequence.length);
      var step = 0;

      (function next() {
        if (mine !== token) return;
        if (step >= sequence.length) {
          playing = false;
          enable(true);
          if (opts.onTurn) opts.onTurn(sequence.length);
          return;
        }
        var pad = sequence[step];
        step++;
        if (opts.flash) opts.flash(pad, opts.flashMs || 260);
        if (opts.toneFor) MGMemory.sound.play(opts.toneFor(pad), 0.2, opts.volume);
        timers.after(opts.stepMs || 620, next);
      })();
    }

    var api = {
      start: function () {
        token++;
        timers.clear();
        sequence = [];
        index = 0;
        level = 0;
        playing = false;
        running = false;
        if (opts.onStart) opts.onStart();
        api.advance();
      },
      advance: function () {
        level++;
        sequence.push(Math.floor(Math.random() * opts.pool));
        index = 0;
        running = true;
        if (opts.onAdvance) opts.onAdvance(level, sequence.length);
        timers.after(opts.leadMs == null ? 420 : opts.leadMs, play);
      },
      press: function (pad) {
        if (!running || playing) return false;
        if (opts.flash) opts.flash(pad, 180);
        if (pad !== sequence[index]) {
          token++;
          timers.clear();
          running = false;
          enable(false);
          if (opts.onFail) opts.onFail({ cleared: level - 1 });
          return false;
        }
        index++;
        if (index < sequence.length) return true;
        running = false;
        enable(false);
        if (opts.onClear) opts.onClear({ cleared: level });
        timers.after(opts.gapMs == null ? 800 : opts.gapMs, api.advance);
        return true;
      },
      replay: function () {
        if (running && !playing) play();
      },
      level: function () { return level; },
      length: function () { return sequence.length; },
      playing: function () { return playing; },
      running: function () { return running; },
      sequence: function () { return sequence.slice(); }
    };

    return api;
  };

  global.MGMemory = MGMemory;
})(window);
