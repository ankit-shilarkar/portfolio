/**
 * theme.js — Day pad / night pad toggle
 * First visit follows the OS preference; an explicit choice is
 * persisted in localStorage. Runs in <head> to avoid a flash.
 */

(function () {
  const STORAGE_KEY = 'portfolio-theme';

  function readSaved() {
    try { return localStorage.getItem(STORAGE_KEY); } catch (e) { return null; }
  }

  function systemTheme() {
    return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }

  function applyTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    const btn = document.getElementById('themeToggle');
    if (btn) {
      btn.setAttribute('aria-label', theme === 'dark' ? 'Switch to light theme' : 'Switch to dark theme');
    }
  }

  function toggleTheme() {
    const next = document.documentElement.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
    try { localStorage.setItem(STORAGE_KEY, next); } catch (e) { /* private mode: keep for this page only */ }
    applyTheme(next);
  }

  applyTheme(readSaved() || systemTheme());

  document.addEventListener('DOMContentLoaded', () => {
    const btn = document.getElementById('themeToggle');
    if (btn) btn.addEventListener('click', toggleTheme);
    applyTheme(document.documentElement.getAttribute('data-theme'));
  });

  // follow OS changes until the visitor picks a theme
  if (window.matchMedia) {
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', () => {
      if (!readSaved()) applyTheme(systemTheme());
    });
  }
})();
