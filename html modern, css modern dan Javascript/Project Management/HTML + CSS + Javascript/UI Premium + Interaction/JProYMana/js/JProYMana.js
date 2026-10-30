/* ============================================================
   JProYMana · App UI Controller
   - Renders pages, handles modals, filters, board clicks
   - Depends on: JProData, JProTheme
   ============================================================ */

(function () {
  "use strict";

  const D = window.JProData;

  /* ---------- ELEMENT CACHE ---------- */
  const els = {
    navItems: document.querySelectorAll(".nav-item"),
    pages: document.querySelectorAll(".page"),
    statsGrid: document.getElementById("statsGrid"),
    recentProjectsTable: document.getElementById("recentProjectsTable"),
    projectsTable: document.getElementById("projectsTable"),
    activityList: document.getElementById("activityList"),
    taskBoard: document.getElementById("taskBoard"),
    teamGrid: document.getElementById("teamGrid"),
    projectFilterChips: document.getElementById("projectFilterChips"),
    toastStack: document.getElementById("toastStack"),
    // Modals
    modalProject: document.getElementById("modalProject"),
    modalTask: document.getElementById("modalTask"),
    formProject: document.getElementById("formProject"),
    formTask: document.getElementById("formTask"),
    // Mobile menu
    mobileMenuBtn: document.getElementById("mobileMenuBtn"),
    sidebar: document.querySelector(".sidebar"),
  };

  /* ---------- HELPERS ---------- */
  function escapeHtml(str) {
    return String(str).replace(/[&<>"']/g, (c) => ({
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#39;",
    }[c]));
  }

  function statusBadgeClass(status) {
    if (status === "Completed") return "badge--success";
    if (status === "On Hold") return "badge--warning";
    return "";
  }

  function toast(message, variant = "") {
    if (!els.toastStack) return;
    const node = document.createElement("div");
    node.className = "toast" + (variant ? " toast--" + variant : "");
    node.textContent = message;
    els.toastStack.appendChild(node);
    setTimeout(() => {
      node.style.opacity = "0";
      node.style.transform = "translateX(20px)";
      node.style.transition = "0.25s ease";
      setTimeout(() => node.remove(), 300);
    }, 2600);
  }

  /* ---------- RENDER: STATS ---------- */
  function renderStats() {
    if (!els.statsGrid) return;
    els.statsGrid.innerHTML = D.stats
      .map(
        (s) => `
      <div class="stat-card">
        <div class="stat-icon"><i class="fas ${s.icon}"></i></div>
        <div class="stat-value">${s.value}</div>
        <div class="stat-label">${escapeHtml(s.label)}</div>
        <div class="stat-trend ${s.trendDir}">
          <i class="fas fa-arrow-${s.trendDir === "up" ? "up" : "down"}"></i>
          ${escapeHtml(s.trend)}
        </div>
      </div>
    `
      )
      .join("");
  }

  /* ---------- RENDER: PROJECT TABLE ---------- */
  function renderProjectTable(container, projects) {
    if (!container) return;

    const head = `
      <div class="table-row table-head">
        <div>Project</div>
        <div>Status</div>
        <div>Team</div>
        <div>Due</div>
      </div>
    `;

    if (!projects.length) {
      container.innerHTML =
        head +
        `<div class="table-row"><div class="t-meta" style="grid-column:1/-1; text-align:center; padding:24px 0;">No projects found.</div></div>`;
      return;
    }

    const rows = projects
      .map(
        (p) => `
      <div class="table-row">
        <div class="t-name">
          <i class="fas fa-folder"></i>
          <span>${escapeHtml(p.name)}</span>
        </div>
        <div><span class="badge ${statusBadgeClass(p.status)}">${escapeHtml(p.status)}</span></div>
        <div class="t-meta">${escapeHtml(p.team)}</div>
        <div class="t-meta">${escapeHtml(p.due)}</div>
      </div>
    `
      )
      .join("");

    container.innerHTML = head + rows;
  }

  function renderRecentProjects() {
    renderProjectTable(els.recentProjectsTable, D.projects.slice(0, 4));
  }

  function renderAllProjects(filter = "all") {
    const list =
      filter === "all"
        ? D.projects
        : D.projects.filter((p) => p.status === filter);
    renderProjectTable(els.projectsTable, list);
  }

  /* ---------- RENDER: ACTIVITY ---------- */
  function renderActivity() {
    if (!els.activityList) return;
    els.activityList.innerHTML = D.activities
      .map(
        (a) => `
      <li>
        <div class="avatar">${escapeHtml(a.initials)}</div>
        <div>
          <strong>${escapeHtml(a.user)}</strong> ${escapeHtml(a.action)}
          <small>${escapeHtml(a.time)}</small>
        </div>
      </li>
    `
      )
      .join("");
  }

  /* ---------- RENDER: TASK BOARD ---------- */
  const COLUMNS = [
    { key: "todo", title: "To Do", dot: "dot--todo" },
    { key: "inprogress", title: "In Progress", dot: "dot--inprogress" },
    { key: "done", title: "Done", dot: "dot--done" },
  ];

  function renderBoard() {
    if (!els.taskBoard) return;

    els.taskBoard.innerHTML = COLUMNS.map((col) => {
      const colTasks = D.tasks.filter((t) => t.status === col.key);
      const cards = colTasks
        .map((t) => {
          const project = D.getProjectById(t.projectId);
          const initials = (t.assignee || "?")
            .split(" ")
            .map((s) => s[0])
            .join("")
            .slice(0, 2)
            .toUpperCase();
          return `
            <div class="task-card" data-task-id="${t.id}" title="Click to move to next column">
              <div class="task-title">
                <span>${escapeHtml(t.title)}</span>
              </div>
              <div class="task-meta">
                <span class="avatar">${escapeHtml(initials)}</span>
                <span>${escapeHtml(project ? project.name : "—")}</span>
              </div>
            </div>
          `;
        })
        .join("");

      return `
        <div class="board-column">
          <div class="column-head">
            <span><span class="dot ${col.dot}"></span>${col.title}</span>
            <span class="column-count">${colTasks.length}</span>
          </div>
          ${cards || '<div class="t-meta" style="text-align:center; padding:20px 0;">No tasks</div>'}
        </div>
      `;
    }).join("");

    // Click to advance status
    els.taskBoard.querySelectorAll(".task-card").forEach((card) => {
      card.addEventListener("click", () => {
        const id = card.dataset.taskId;
        const task = D.tasks.find((t) => t.id === id);
        if (!task) return;
        const order = ["todo", "inprogress", "done"];
        const idx = order.indexOf(task.status);
        const next = order[(idx + 1) % order.length];
        D.updateTaskStatus(id, next);
        renderBoard();
        toast(`Task moved to "${COLUMNS.find((c) => c.key === next).title}"`, "success");
      });
    });
  }

  /* ---------- RENDER: TEAM ---------- */
  function renderTeam() {
    if (!els.teamGrid) return;
    els.teamGrid.innerHTML = D.team
      .map(
        (m) => `
      <div class="team-card">
        <div class="avatar">${escapeHtml(m.initials)}</div>
        <h3>${escapeHtml(m.name)}</h3>
        <small>${escapeHtml(m.role)}</small>
        <div class="team-role">Active</div>
      </div>
    `
      )
      .join("");
  }

  /* ---------- NAVIGATION ---------- */
  function switchPage(pageId) {
    els.navItems.forEach((btn) =>
      btn.classList.toggle("active", btn.dataset.page === pageId)
    );
    els.pages.forEach((p) =>
      p.classList.toggle("active", p.id === "page-" + pageId)
    );
    // close mobile sidebar after navigating
    if (els.sidebar) els.sidebar.classList.remove("open");
    // scroll main to top
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

    /* ---------- SIDEBAR DRAWER (mobile) ---------- */
  function getBackdrop() {
    return document.getElementById("sidebarBackdrop");
  }

  function openSidebar() {
    if (!els.sidebar) return;
    els.sidebar.classList.add("open");
    const bd = getBackdrop();
    if (bd) bd.classList.add("visible");
    document.body.style.overflow = "hidden"; // cegah scroll body saat drawer terbuka
  }

  function closeSidebar() {
    if (!els.sidebar) return;
    els.sidebar.classList.remove("open");
    const bd = getBackdrop();
    if (bd) bd.classList.remove("visible");
    document.body.style.overflow = "";
  }

  function isMobile() {
    return window.matchMedia("(max-width: 820px)").matches;
  }

  function bindNav() {
    els.navItems.forEach((btn) => {
      btn.addEventListener("click", () => {
        switchPage(btn.dataset.page);
        if (isMobile()) closeSidebar();   // auto-tutup drawer setelah pilih menu
      });
    });

    document.querySelectorAll("[data-goto]").forEach((btn) => {
      btn.addEventListener("click", () => {
        switchPage(btn.dataset.goto);
        if (isMobile()) closeSidebar();
      });
    });

    if (els.mobileMenuBtn) {
      els.mobileMenuBtn.addEventListener("click", (e) => {
        e.stopPropagation();
        if (els.sidebar.classList.contains("open")) {
          closeSidebar();
        } else {
          openSidebar();
        }
      });
    }

    // Klik backdrop → tutup drawer
    const bd = getBackdrop();
    if (bd) {
      bd.addEventListener("click", closeSidebar);
    }

    // ESC → tutup drawer
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && els.sidebar && els.sidebar.classList.contains("open")) {
        closeSidebar();
      }
    });

    // Saat resize dari mobile ke desktop, tutup drawer & reset scroll
    window.addEventListener("resize", () => {
      if (!isMobile()) closeSidebar();
    });
  }

  /* ---------- MODALS ---------- */
  function openModal(modalEl) {
    if (!modalEl) return;
    modalEl.hidden = false;
    const firstInput = modalEl.querySelector("input, select");
    if (firstInput) setTimeout(() => firstInput.focus(), 60);
  }

  function closeModal(modalEl) {
    if (!modalEl) return;
    modalEl.hidden = true;
  }

  function bindModals() {
    document.querySelectorAll("[data-open-modal]").forEach((btn) => {
      btn.addEventListener("click", () => {
        const kind = btn.dataset.openModal;
        if (kind === "project") {
          openModal(els.modalProject);
        } else if (kind === "task") {
          populateTaskProjectSelect();
          openModal(els.modalTask);
        }
      });
    });

    document.querySelectorAll("[data-close-modal]").forEach((btn) => {
      btn.addEventListener("click", () => {
        closeModal(els.modalProject);
        closeModal(els.modalTask);
      });
    });

    // Close on overlay click
    [els.modalProject, els.modalTask].forEach((m) => {
      if (!m) return;
      m.addEventListener("click", (e) => {
        if (e.target === m) closeModal(m);
      });
    });

    // ESC key
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") {
        closeModal(els.modalProject);
        closeModal(els.modalTask);
      }
    });
  }

  function populateTaskProjectSelect() {
    const select = document.getElementById("tProject");
    if (!select) return;
    select.innerHTML = D.projects
      .map((p) => `<option value="${p.id}">${escapeHtml(p.name)}</option>`)
      .join("");
  }

  /* ---------- FORMS ---------- */
  function bindForms() {
    if (els.formProject) {
      els.formProject.addEventListener("submit", (e) => {
        e.preventDefault();
        const name = document.getElementById("pName").value.trim();
        const status = document.getElementById("pStatus").value;
        const team = document.getElementById("pTeam").value;
        const due = document.getElementById("pDue").value;
        if (!name || !due) return;

        D.addProject({
          id: "p" + Date.now(),
          name,
          status,
          team,
          due,
          progress: 0,
        });

        renderRecentProjects();
        renderAllProjects(getActiveProjectFilter());
        closeModal(els.modalProject);
        els.formProject.reset();
        toast("Project created", "success");
      });
    }

    if (els.formTask) {
      els.formTask.addEventListener("submit", (e) => {
        e.preventDefault();
        const title = document.getElementById("tTitle").value.trim();
        const projectId = document.getElementById("tProject").value;
        const status = document.getElementById("tStatus").value;
        const assignee = document.getElementById("tAssignee").value.trim() || "Unassigned";
        if (!title) return;

        D.addTask({
          id: "t" + Date.now(),
          title,
          projectId,
          status,
          assignee,
        });

        renderBoard();
        closeModal(els.modalTask);
        els.formTask.reset();
        toast("Task created", "success");
      });
    }
  }

  /* ---------- PROJECT FILTER ---------- */
  function getActiveProjectFilter() {
    const active = els.projectFilterChips
      ? els.projectFilterChips.querySelector(".chip.active")
      : null;
    return active ? active.dataset.filter : "all";
  }

  function bindFilters() {
    if (!els.projectFilterChips) return;
    els.projectFilterChips.querySelectorAll(".chip").forEach((chip) => {
      chip.addEventListener("click", () => {
        els.projectFilterChips
          .querySelectorAll(".chip")
          .forEach((c) => c.classList.remove("active"));
        chip.classList.add("active");
        renderAllProjects(chip.dataset.filter);
      });
    });
  }

  /* ---------- GLOBAL SEARCH (simple demo) ---------- */
  function bindSearch() {
    const input = document.getElementById("globalSearch");
    if (!input) return;
    input.addEventListener("input", () => {
      const q = input.value.trim().toLowerCase();
      if (!q) {
        renderAllProjects(getActiveProjectFilter());
        return;
      }
      const filtered = D.projects.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.team.toLowerCase().includes(q) ||
          p.status.toLowerCase().includes(q)
      );
      renderProjectTable(els.projectsTable, filtered);
    });
  }

  /* ---------- THEME LABEL SYNC (settings page) ---------- */
  function bindThemeLabel() {
    document.addEventListener("themechange", (e) => {
      const label = document.getElementById("currentThemeLabel");
      if (label) {
        label.textContent =
          e.detail.theme === "dark" ? "Dark (locked)" : "Light (locked)";
      }
    });
  }

  /* ---------- INIT ---------- */
  function init() {
    renderStats();
    renderRecentProjects();
    renderAllProjects();
    renderActivity();
    renderBoard();
    renderTeam();

    bindNav();
    bindModals();
    bindForms();
    bindFilters();
    bindSearch();
    bindThemeLabel();

    // Ensure current theme label is correct from the start
    if (window.JProTheme) {
      const t = window.JProTheme.get();
      if (t) {
        const label = document.getElementById("currentThemeLabel");
        if (label) {
          label.textContent = t === "dark" ? "Dark (locked)" : "Light (locked)";
        }
      }
    }
  }

  // Expose for debugging
  window.JProApp = {
    switchPage,
    renderBoard,
    renderAllProjects,
    toast,
  };

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();