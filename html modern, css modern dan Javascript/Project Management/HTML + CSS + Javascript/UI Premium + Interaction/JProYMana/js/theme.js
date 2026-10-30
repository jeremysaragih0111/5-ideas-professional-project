/* ============================================================
   JProYMana · Global Theme Lock
   - First visit: user MUST choose (overlay)
   - After choice: stored in localStorage -> locked globally
   - Syncs across tabs via 'storage' event
   - Exposes window.JProTheme for app integration
   ============================================================ */

(function () {
  "use strict";

  const THEME_KEY = "jproymana.theme";
  const VALID_THEMES = ["light", "dark"];

  const overlay = document.getElementById("themeChoiceOverlay");
  const appShell = document.getElementById("appShell");
  const toggleBtn = document.getElementById("themeToggleBtn");
  const toggleIcon = document.getElementById("themeToggleIcon");
  const currentThemeLabel = document.getElementById("currentThemeLabel");

  /**
   * Return stored theme or null if none.
   * @returns {'light'|'dark'|null}
   */
  function getStoredTheme() {
    const value = localStorage.getItem(THEME_KEY);
    return VALID_THEMES.includes(value) ? value : null;
  }

  /**
   * Apply theme to the document, update UI labels.
   * @param {'light'|'dark'} theme
   */
  function applyTheme(theme) {
    if (!VALID_THEMES.includes(theme)) theme = "light";

    if (theme === "dark") {
      document.documentElement.setAttribute("data-theme", "dark");
    } else {
      document.documentElement.removeAttribute("data-theme");
    }

    // Toggle button icon (moon when in light mode / sun when in dark mode)
    if (toggleIcon) {
      toggleIcon.className = theme === "dark" ? "fas fa-sun" : "fas fa-moon";
    }

    // Settings page label
    if (currentThemeLabel) {
      currentThemeLabel.textContent =
        theme === "dark" ? "Dark (locked)" : "Light (locked)";
    }

    // Segmented control in settings
    document.querySelectorAll("[data-set-theme]").forEach((btn) => {
      btn.classList.toggle("active", btn.dataset.setTheme === theme);
    });

    // Update theme preview card if present
    document.dispatchEvent(
      new CustomEvent("themechange", { detail: { theme } })
    );
  }

  /**
   * Persist theme and apply.
   * @param {'light'|'dark'} theme
   */
  function setTheme(theme) {
    if (!VALID_THEMES.includes(theme)) return;
    localStorage.setItem(THEME_KEY, theme);
    applyTheme(theme);
    hideOverlay();
    showApp();
  }

  /**
   * Clear saved theme (used by "Reset theme" in Settings).
   * Will show the overlay again so the user re-chooses.
   */
  function resetTheme() {
    localStorage.removeItem(THEME_KEY);
    applyTheme("light"); // visual fallback while overlay is shown
    showOverlay();
    hideApp();
  }

  /** Show/hide the first-time overlay. */
  function showOverlay() {
    if (overlay) overlay.hidden = false;
  }

  function hideOverlay() {
    if (overlay) overlay.hidden = true;
  }

  /** Show/hide the actual app. */
  function showApp() {
    if (appShell) appShell.hidden = false;
  }

  function hideApp() {
    if (appShell) appShell.hidden = true;
  }

  /**
   * Toggle between light/dark. Requires a stored theme.
   * If no stored theme, show the overlay instead.
   */
  function toggleTheme() {
    const current = getStoredTheme();
    if (!current) {
      showOverlay();
      hideApp();
      return;
    }
    setTheme(current === "dark" ? "light" : "dark");
  }

  /* ---------- BOOTSTRAP ---------- */
  function boot() {
    const stored = getStoredTheme();

    if (!stored) {
      // First visit or reset -> force choice
      applyTheme("light");
      showOverlay();
      hideApp();
    } else {
      applyTheme(stored);
      hideOverlay();
      showApp();
    }

    // Wire up overlay choice buttons
    document.querySelectorAll("[data-theme-choice]").forEach((btn) => {
      btn.addEventListener("click", () => {
        const choice = btn.dataset.themeChoice;
        setTheme(choice);
      });
    });

    // Wire up top-bar toggle
    if (toggleBtn) toggleBtn.addEventListener("click", toggleTheme);

    // Settings page: segmented light/dark buttons
    document.querySelectorAll("[data-set-theme]").forEach((btn) => {
      btn.addEventListener("click", () => setTheme(btn.dataset.setTheme));
    });

    // Settings page: reset theme
    const resetBtn = document.getElementById("resetThemeBtn");
    if (resetBtn) {
      resetBtn.addEventListener("click", () => {
        const confirmReset = confirm(
          "Reset theme lock? You will be asked to choose again."
        );
        if (confirmReset) resetTheme();
      });
    }

    // Sync across tabs (and other windows)
    window.addEventListener("storage", (event) => {
      if (event.key === THEME_KEY) {
        const newValue = event.newValue;
        if (VALID_THEMES.includes(newValue)) {
          applyTheme(newValue);
          hideOverlay();
          showApp();
        } else {
          // Theme was cleared in another tab -> force re-choice
          showOverlay();
          hideApp();
        }
      }
    });
  }

  // Expose API for other scripts
  window.JProTheme = {
    get: getStoredTheme,
    set: setTheme,
    toggle: toggleTheme,
    reset: resetTheme,
    isLocked: () => getStoredTheme() !== null,
    KEY: THEME_KEY,
  };

  // Boot as soon as DOM is ready
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", boot);
  } else {
    boot();
  }
})();