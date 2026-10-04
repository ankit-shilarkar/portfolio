/**
 * animations.js — The worked problem, plus nav state
 * - Signature moment: Fig. 1 is drawn in pencil, then the answer
 *   is double-underlined and boxed. Content is visible without JS;
 *   the drawing only runs when motion is allowed.
 * - Header: active section link, "Sheet n of 6", scroll shadow.
 * No dependencies — vanilla JS only.
 */

(function () {
  'use strict';

  const reduceMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ── SIGNATURE: work the problem ── */
  function workTheProblem() {
    const sheet = document.querySelector('.sheet-problem');
    if (!sheet || reduceMotion || !('getTotalLength' in SVGPathElement.prototype)) return;

    // only the drawing visible at this breakpoint gets measured
    const fig = Array.from(sheet.querySelectorAll('.fig-svg')).find((svg) => svg.getBoundingClientRect().width > 0);
    if (fig) {
      fig.querySelectorAll('.fig-ink .draw').forEach((path, i) => {
        path.style.setProperty('--len', Math.ceil(path.getTotalLength()) + 1);
        path.style.setProperty('--d', (0.15 + i * 0.09) + 's');
      });
    }
    (fig ? fig.querySelectorAll('.fig-text text') : []).forEach((t, i) => {
      t.style.setProperty('--d', (0.5 + i * 0.06) + 's');
    });

    // then the answer: double underline, then the red box
    const late = sheet.querySelectorAll('.draw-late');
    late.forEach((path, i) => {
      path.style.setProperty('--len', Math.ceil(path.getTotalLength()) + 1);
      path.style.setProperty('--d', (1.25 + i * 0.25) + 's');
    });

    sheet.classList.add('is-drawing');
  }

  /* ── HEADER STATE ── */
  function initHeader() {
    const head    = document.querySelector('.pad-head');
    const sheetNo = document.getElementById('sheetNo');
    const links   = document.querySelectorAll('.pad-nav a[href^="#"]');
    const sheets  = document.querySelectorAll('.sheet[data-sheet]');

    if (head) {
      const onScroll = () => head.classList.toggle('is-scrolled', window.scrollY > 8);
      window.addEventListener('scroll', onScroll, { passive: true });
      onScroll();
    }

    if (!sheets.length || !('IntersectionObserver' in window)) return;

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const id = entry.target.id;
        if (sheetNo) sheetNo.textContent = entry.target.dataset.sheet;
        links.forEach((link) => {
          const active = link.getAttribute('href') === '#' + id;
          link.classList.toggle('is-active', active);
          if (active) link.setAttribute('aria-current', 'true');
          else link.removeAttribute('aria-current');
        });
      });
    }, { rootMargin: '-45% 0px -50% 0px' });

    sheets.forEach((s) => observer.observe(s));
  }

  document.addEventListener('DOMContentLoaded', () => {
    workTheProblem();
    initHeader();
  });
})();
