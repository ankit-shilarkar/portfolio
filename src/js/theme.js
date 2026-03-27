/**
 * theme.js — Dark / Light Mode Toggle
 * Persists preference in localStorage.
 * Applies on load before first paint to avoid flash.
 */

(function () {
  const STORAGE_KEY = 'portfolio-theme';
  const DEFAULT     = 'dark';

  /**
   * Apply a theme to <html data-theme="...">
   * and update the toggle button icon.
   */
  function applyTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);

    const btn = document.getElementById('themeToggle');
    if (btn) {
      btn.textContent = theme === 'dark' ? '☀️' : '🌙';
      btn.setAttribute('aria-label', theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode');
    }
  }

  /**
   * Toggle between dark and light, persist, and apply.
   */
  function toggleTheme() {
    const current = document.documentElement.getAttribute('data-theme') || DEFAULT;
    const next    = current === 'dark' ? 'light' : 'dark';
    localStorage.setItem(STORAGE_KEY, next);
    applyTheme(next);
  }

  /**
   * Init — run immediately so theme is set before body renders.
   */
  function init() {
    const saved = localStorage.getItem(STORAGE_KEY) || DEFAULT;
    applyTheme(saved);
  }

  // Apply immediately (before DOMContentLoaded to prevent flash)
  init();

  // Attach toggle once DOM is ready
  document.addEventListener('DOMContentLoaded', () => {
    const btn = document.getElementById('themeToggle');
    if (btn) btn.addEventListener('click', toggleTheme);

    // Re-apply to sync icon (in case init ran before button existed)
    const saved = localStorage.getItem(STORAGE_KEY) || DEFAULT;
    applyTheme(saved);
  });
})();
