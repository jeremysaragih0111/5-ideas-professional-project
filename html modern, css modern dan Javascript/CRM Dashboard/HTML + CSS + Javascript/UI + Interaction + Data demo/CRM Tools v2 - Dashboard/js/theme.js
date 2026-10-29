/* =========================================================
   CRM Tools V2 — theme.js
   Pengelola tema light/dark + persistensi localStorage
   ========================================================= */

(function () {
  const KEY = 'CRMToolsV2-theme';
  const root = document.documentElement;

  function apply(theme) {
    root.setAttribute('data-theme', theme);
    document.dispatchEvent(new CustomEvent('themechange', { detail: { theme } }));

    const darkSwitch = document.getElementById('darkSwitch');
    if (darkSwitch) darkSwitch.checked = theme === 'dark';
  }

  function toggle() {
    const next = root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
    apply(next);
    try { localStorage.setItem(KEY, next); } catch (e) {}
  }

  function init() {
    let saved = null;
    try { saved = localStorage.getItem(KEY); } catch (e) {}
    if (!saved) {
      saved = window.matchMedia &&
        window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    }
    apply(saved);

    const btn = document.getElementById('themeToggle');
    if (btn) btn.addEventListener('click', toggle);

    const sw = document.getElementById('darkSwitch');
    if (sw) sw.addEventListener('change', (e) => {
      apply(e.target.checked ? 'dark' : 'light');
      try { localStorage.setItem(KEY, e.target.checked ? 'dark' : 'light'); } catch (err) {}
    });
  }

  window.CRMToolsV2Theme = { apply, toggle };
  document.addEventListener('DOMContentLoaded', init);
})();