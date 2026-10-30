/* ============================================================
   JProYMana · Bootstrap entry point
   Runs after theme.js + data.js + JProYMana.js are loaded.
   Handles small global refinements & feature-detection.
   ============================================================ */

(function () {
  "use strict";

  function safeInit(fn, name) {
    try {
      fn();
    } catch (err) {
      // Do not break the whole app if one enhancement fails
      console.warn("[JProYMana] Failed to init:", name, err);
    }
  }

  function init() {
    // Skip if dependencies missing (safety)
    if (!window.JProTheme) {
      console.error("[JProYMana] theme.js not loaded");
      return;
    }
    if (!window.JProData) {
      console.error("[JProYMana] data.js not loaded");
      return;
    }
    if (!window.JProApp) {
      console.error("[JProYMana] JProYMana.js not loaded");
      return;
    }

    safeInit(() => {
      // Prevent flash of unstyled content by ensuring app shell is
      // hidden while the theme overlay is showing.
      // (theme.js already handles this — this is a no-op double-check.)
      const overlay = document.getElementById("themeChoiceOverlay");
      const shell = document.getElementById("appShell");
      if (overlay && !overlay.hidden) {
        shell.hidden = true;
      }
    }, "shell-visibility");

    /*
    safeInit(() => {
      // Close mobile sidebar when clicking outside on small screens
      const sidebar = document.querySelector(".sidebar");
      const menuBtn = document.getElementById("mobileMenuBtn");
      document.addEventListener("click", (e) => {
        if (window.innerWidth > 820) return;
        if (!sidebar.classList.contains("open")) return;
        if (
          !sidebar.contains(e.target) &&
          !(menuBtn && menuBtn.contains(e.target))
        ) {
          sidebar.classList.remove("open");
        }
      });
    }, "mobile-sidebar-outside-click");
    */

    safeInit(() => {
      // Log current theme on boot for debugging
      console.info(
        "[JProYMana] Theme locked:",
        window.JProTheme.get() || "(unset – awaiting user choice)"
      );
    }, "boot-log");
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();