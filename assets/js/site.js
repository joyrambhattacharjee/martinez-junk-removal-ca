/**
 * Martinez Junk Removal — progressive enhancement only.
 *
 * Nothing here is required to read the site or reach a phone number: the nav
 * mega panels are CSS-only, the FAQ accordions are native <details>, and the
 * header phone link is in the markup. This file adds the mobile nav panel, the
 * sticky call bar, and one scroll reveal. If it fails to load, the site still
 * works — which is the whole point of shipping static HTML.
 */
(function () {
  "use strict";

  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ── Copyright year ─────────────────────────────────────────────────────
     The footer ships the build year; this keeps it honest without a rebuild. */
  var yearEl = document.querySelector("[data-year]");
  if (yearEl) yearEl.textContent = String(new Date().getFullYear());

  /* ── Mobile navigation panel ───────────────────────────────────────────── */
  var panel = document.getElementById("navpanel");
  var openBtn = document.querySelector("[data-nav-open]");
  var closeBtn = document.querySelector("[data-nav-close]");
  var FOCUSABLE = 'a[href], button:not([disabled]), input, select, textarea, [tabindex]:not([tabindex="-1"])';
  var lastFocus = null;

  function focusables() {
    return Array.prototype.filter.call(panel.querySelectorAll(FOCUSABLE), function (el) {
      return el.offsetParent !== null;
    });
  }

  function openNav() {
    lastFocus = document.activeElement;
    panel.setAttribute("data-open", "true");
    panel.setAttribute("aria-hidden", "false");
    if (openBtn) openBtn.setAttribute("aria-expanded", "true");
    document.documentElement.style.overflow = "hidden";
    var first = focusables()[0];
    if (first) first.focus();
  }

  function closeNav(restore) {
    panel.setAttribute("data-open", "false");
    panel.setAttribute("aria-hidden", "true");
    if (openBtn) openBtn.setAttribute("aria-expanded", "false");
    document.documentElement.style.overflow = "";
    if (restore !== false && lastFocus && lastFocus.focus) lastFocus.focus();
  }

  var navIsOpen = function () {
    return panel && panel.getAttribute("data-open") === "true";
  };

  if (panel && openBtn) {
    openBtn.addEventListener("click", openNav);
    if (closeBtn) closeBtn.addEventListener("click", function () { closeNav(true); });

    /* Following a link inside the panel navigates away; on a same-page anchor it
       would not, so close either way and let focus land on the target. */
    panel.addEventListener("click", function (e) {
      if (e.target.closest("a[href]")) closeNav(false);
    });

    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape") {
        if (navIsOpen()) { closeNav(true); return; }
        /* Escape also dismisses a mega panel held open by :focus-within. */
        var inMega = document.activeElement && document.activeElement.closest("[data-mega]");
        if (inMega) document.activeElement.blur();
        return;
      }

      if (e.key !== "Tab" || !navIsOpen()) return;

      var items = focusables();
      if (!items.length) return;
      var first = items[0];
      var last = items[items.length - 1];

      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      } else if (!panel.contains(document.activeElement)) {
        e.preventDefault();
        first.focus();
      }
    });

    /* Rotating to landscape can cross the lg breakpoint, where the panel is not
       reachable — leaving the page scroll-locked with no visible way out. */
    window.addEventListener("resize", function () {
      if (navIsOpen() && window.innerWidth >= 1024) closeNav(false);
    });
  }

  /* ── Sticky call bar ───────────────────────────────────────────────────────
     Held back until the hero CTA has scrolled off, and pulled down again near
     the footer so it never sits on top of the legal links. */
  var callbar = document.querySelector("[data-callbar]");
  if (callbar) {
    var shown = null;
    var sync = function () {
      var y = window.scrollY || document.documentElement.scrollTop;
      var atBottom =
        y + window.innerHeight >= document.documentElement.scrollHeight - 140;
      var next = y > 460 && !atBottom;
      if (next !== shown) {
        shown = next;
        callbar.setAttribute("data-show", next ? "true" : "false");
      }
    };
    var queued = false;
    var onScroll = function () {
      if (queued) return;
      queued = true;
      requestAnimationFrame(function () { queued = false; sync(); });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    sync();
  }

  /* ── Scroll reveal ─────────────────────────────────────────────────────────
     One-shot, and skipped entirely when motion is reduced or IntersectionObserver
     is missing — in both cases CSS leaves the content visible. */
  var reveals = document.querySelectorAll("[data-reveal]");
  if (reveals.length) {
    if (reduceMotion || !("IntersectionObserver" in window)) {
      Array.prototype.forEach.call(reveals, function (el) {
        el.setAttribute("data-seen", "true");
      });
    } else {
      var io = new IntersectionObserver(
        function (entries) {
          entries.forEach(function (entry) {
            if (!entry.isIntersecting) return;
            entry.target.setAttribute("data-seen", "true");
            io.unobserve(entry.target);
          });
        },
        { rootMargin: "0px 0px -12% 0px", threshold: 0.08 }
      );
      Array.prototype.forEach.call(reveals, function (el) { io.observe(el); });
    }
  }
})();
