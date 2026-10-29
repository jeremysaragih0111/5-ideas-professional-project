/**
 * JCRM Dashboard - Theme Manager
 * Handles dark/light mode toggle with localStorage persistence
 */
(function () {
  'use strict';

  const THEME_KEY = 'jcrm-theme';
  const DARK = 'dark';
  const LIGHT = 'light';

  // DOM references
  const html = document.documentElement;
  const themeToggle = document.getElementById('themeToggle');
  const themeIcon = document.getElementById('themeIcon');
  const themeLabel = document.getElementById('themeLabel');

  /**
   * Apply theme to the document and update UI elements
   * @param {string} theme - 'dark' or 'light'
   */
  function applyTheme(theme) {
    if (theme === DARK) {
      html.setAttribute('data-theme', DARK);
      themeIcon.classList.remove('fa-moon');
      themeIcon.classList.add('fa-sun');
      themeLabel.textContent = 'Light';
      themeToggle.setAttribute('aria-label', 'Switch to light mode');
    } else {
      html.removeAttribute('data-theme');
      themeIcon.classList.remove('fa-sun');
      themeIcon.classList.add('fa-moon');
      themeLabel.textContent = 'Dark';
      themeToggle.setAttribute('aria-label', 'Switch to dark mode');
    }
    localStorage.setItem(THEME_KEY, theme);
  }

  /**
   * Determine initial theme:
   * 1. Saved preference from localStorage
   * 2. System preference (prefers-color-scheme)
   * 3. Default to light
   */
  function getInitialTheme() {
    const saved = localStorage.getItem(THEME_KEY);
    if (saved === DARK || saved === LIGHT) {
      return saved;
    }
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    return prefersDark ? DARK : LIGHT;
  }

  /**
   * Toggle between dark and light
   */
  function toggleTheme() {
    const current = html.getAttribute('data-theme') === DARK ? DARK : LIGHT;
    applyTheme(current === DARK ? LIGHT : DARK);
  }

  // Init
  applyTheme(getInitialTheme());

  // Event listeners
  if (themeToggle) {
    themeToggle.addEventListener('click', toggleTheme);

    // Keyboard accessibility (Space/Enter)
    themeToggle.addEventListener('keydown', function (event) {
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        toggleTheme();
      }
    });
  }

  // Listen to system preference changes (only when user has not set a manual preference)
  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', function (e) {
    if (!localStorage.getItem(THEME_KEY)) {
      applyTheme(e.matches ? DARK : LIGHT);
    }
  });
})();