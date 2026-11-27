/* MindGenieAI games shelf: category filter plus arrow/wheel scrolling.
   Runs only when the section is on the page, so it is inert everywhere else. */
(function () {
  "use strict";

  var section = document.getElementById("mg-games-shelf");
  if (!section) return;

  var track = section.querySelector("#fbCarouselTrack");
  var prevBtn = section.querySelector(".fb-prev");
  var nextBtn = section.querySelector(".fb-next");
  var catButtons = Array.prototype.slice.call(section.querySelectorAll(".fb-cat-btn"));
  var cards = Array.prototype.slice.call(section.querySelectorAll(".fb-game-card"));
  if (!track || !cards.length) return;

  function visibleCards() {
    return cards.filter(function (card) { return !card.classList.contains("is-hidden"); });
  }

  function step() {
    var first = visibleCards()[0];
    var gap = parseFloat(window.getComputedStyle(track).columnGap || "16") || 16;
    var width = first ? first.getBoundingClientRect().width : 185;
    return (width + gap) * 2;
  }

  function updateArrows() {
    var max = track.scrollWidth - track.clientWidth;
    if (prevBtn) prevBtn.disabled = track.scrollLeft <= 2;
    if (nextBtn) nextBtn.disabled = max <= 1 || track.scrollLeft >= max - 2;
  }

  /* Snap has to be lifted while the track animates: with mandatory snap,
     Chromium aborts a programmatic smooth scroll and the arrows look dead. */
  var settleTimer = null;
  function scheduleSettle() {
    if (settleTimer) window.clearTimeout(settleTimer);
    settleTimer = window.setTimeout(function () {
      track.classList.remove("is-scrolling");
      updateArrows();
      settleTimer = null;
    }, 170);
  }

  function prefersReducedMotion() {
    return window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  }

  function scrollByStep(direction) {
    var max = track.scrollWidth - track.clientWidth;
    var left = Math.min(Math.max(track.scrollLeft + direction * step(), 0), max);
    track.classList.add("is-scrolling");
    track.scrollTo({ left: left, behavior: prefersReducedMotion() ? "auto" : "smooth" });
    scheduleSettle();
  }

  if (prevBtn) prevBtn.addEventListener("click", function () { scrollByStep(-1); });
  if (nextBtn) nextBtn.addEventListener("click", function () { scrollByStep(1); });

  track.addEventListener("scroll", function () {
    updateArrows();
    if (track.classList.contains("is-scrolling")) scheduleSettle();
  }, { passive: true });

  /* Vertical wheel scrolls the shelf sideways, but hands back to the page
     as soon as the shelf reaches either end. */
  track.addEventListener("wheel", function (event) {
    if (Math.abs(event.deltaY) <= Math.abs(event.deltaX)) return;
    var max = track.scrollWidth - track.clientWidth;
    if (max <= 1) return;
    var atStart = track.scrollLeft <= 0 && event.deltaY < 0;
    var atEnd = track.scrollLeft >= max - 1 && event.deltaY > 0;
    if (atStart || atEnd) return;
    event.preventDefault();
    track.scrollLeft += event.deltaY;
  }, { passive: false });

  catButtons.forEach(function (btn) {
    btn.addEventListener("click", function () {
      catButtons.forEach(function (other) {
        other.classList.remove("is-active");
        other.setAttribute("aria-pressed", "false");
      });
      btn.classList.add("is-active");
      btn.setAttribute("aria-pressed", "true");

      var selected = btn.dataset.category;
      cards.forEach(function (card) {
        var match = selected === "all" || card.dataset.category === selected;
        card.classList.toggle("is-hidden", !match);
      });

      track.scrollLeft = 0;
      window.requestAnimationFrame(updateArrows);
    });
  });

  if (window.ResizeObserver) {
    new ResizeObserver(updateArrows).observe(track);
  } else {
    window.addEventListener("resize", updateArrows);
  }
  window.addEventListener("load", updateArrows);

  updateArrows();
})();
