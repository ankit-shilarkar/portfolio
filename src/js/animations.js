/**
 * animations.js — Scroll Reveals + Micro-interactions
 * Uses IntersectionObserver for performance.
 * No dependencies — vanilla JS only.
 */

(function () {
  'use strict';

  /* ── SCROLL REVEAL ── */

  const REVEAL_CLASS    = 'reveal';
  const REVEALED_CLASS  = 'revealed';

  const revealCSS = `
    .reveal {
      opacity: 0;
      transform: translateY(20px);
      transition: opacity 0.5s ease, transform 0.5s ease;
    }
    .reveal.revealed {
      opacity: 1;
      transform: translateY(0);
    }
  `;

  function injectRevealStyles() {
    const style = document.createElement('style');
    style.textContent = revealCSS;
    document.head.appendChild(style);
  }

  function initScrollReveal() {
    const targets = document.querySelectorAll(
      '.mini-card, .tl-project, .skill-block, .proj-card, .clink'
    );

    if (!targets.length) return;

    targets.forEach(el => el.classList.add(REVEAL_CLASS));

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry, i) => {
          if (entry.isIntersecting) {
            // Stagger delay based on sibling index
            const siblings = Array.from(entry.target.parentElement?.children || []);
            const idx      = siblings.indexOf(entry.target);
            entry.target.style.transitionDelay = `${Math.min(idx * 60, 300)}ms`;
            entry.target.classList.add(REVEALED_CLASS);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
    );

    targets.forEach(el => observer.observe(el));
  }

  /* ── ACTIVE NAV LINK ── */

  function initActiveNav() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-links a[href^="#"]');

    if (!sections.length || !navLinks.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const id = entry.target.getAttribute('id');
            navLinks.forEach(link => {
              link.style.color = link.getAttribute('href') === `#${id}`
                ? 'var(--text)'
                : '';
            });
          }
        });
      },
      { threshold: 0.4 }
    );

    sections.forEach(s => observer.observe(s));
  }

  /* ── NAV SCROLL SHADOW ── */

  function initNavShadow() {
    const nav = document.querySelector('nav');
    if (!nav) return;

    window.addEventListener('scroll', () => {
      if (window.scrollY > 10) {
        nav.style.boxShadow = '0 1px 16px var(--shadow)';
      } else {
        nav.style.boxShadow = '';
      }
    }, { passive: true });
  }

  /* ── INIT ── */

  document.addEventListener('DOMContentLoaded', () => {
    injectRevealStyles();
    initScrollReveal();
    initActiveNav();
    initNavShadow();
  });

})();
