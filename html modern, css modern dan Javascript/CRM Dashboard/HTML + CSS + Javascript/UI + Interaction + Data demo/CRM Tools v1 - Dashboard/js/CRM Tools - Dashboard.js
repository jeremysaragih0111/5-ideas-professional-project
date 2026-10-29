
(() => {
  "use strict";

  const $ = (selector) => document.querySelector(selector);
  const $$ = (selector) => [...document.querySelectorAll(selector)];

  const STORAGE = {
    contacts: "crm-dashboard-contacts",
    tasks: "crm-dashboard-tasks",
    theme: "crm-dashboard-theme"
  };

  const clone = value => JSON.parse(JSON.stringify(value));

  function load(key, fallback) {
    try {
      const saved = localStorage.getItem(key);
      return saved ? JSON.parse(saved) : clone(fallback);
    } catch {
      return clone(fallback);
    }
  }

  function save(key, value) {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch {
      // Penyimpanan browser mungkin dinonaktifkan.
    }
  }

  const money = value =>
    new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      maximumFractionDigits: 0
    }).format(Number(value) || 0);

  const escapeHTML = value =>
    String(value ?? "").replace(/[&<>"']/g, char => ({
      "&": "&amp;", "<": "&lt;", ">": "&gt;",
      '"': "&quot;", "'": "&#39;"
    })[char]);

  let contacts = load(
    STORAGE.contacts,
    window.CRM_DEMO_DATA.contacts
  );
  let tasks = load(STORAGE.tasks, window.CRM_DEMO_DATA.tasks);
  let currentPage = 1;
  const pageSize = 5;
  let filteredContacts = [...contacts];
  let toastTimer;

  function showToast(message) {
    const toast = $("#toast");
    toast.textContent = message;
    toast.classList.add("show");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => toast.classList.remove("show"), 2500);
  }

  function getInitials(name) {
    return name.trim().split(/\s+/).slice(0, 2)
      .map(part => part[0] || "").join("").toUpperCase();
  }

  function renderContacts() {
    const query = (
      $("#contactSearch").value || $("#globalSearch").value
    ).trim().toLowerCase();

    const status = $("#statusFilter").value;

    filteredContacts = contacts.filter(contact => {
      const searchable = [
        contact.name, contact.email,
        contact.company, contact.role
      ].join(" ").toLowerCase();

      return searchable.includes(query) &&
        (status === "all" || contact.status === status);
    });

    const pages = Math.max(1, Math.ceil(filteredContacts.length / pageSize));
    currentPage = Math.min(currentPage, pages);

    const start = (currentPage - 1) * pageSize;
    const visible = filteredContacts.slice(start, start + pageSize);

    $("#contactTableBody").innerHTML = visible.length
      ? visible.map(contact => `
        <tr>
          <td>
            <div class="contact-name">
              <span class="contact-avatar"
                style="background:${escapeHTML(contact.color)};
                color:${escapeHTML(contact.ink)}">
                ${escapeHTML(contact.initials || getInitials(contact.name))}
              </span>
              <span>
                <strong>${escapeHTML(contact.name)}</strong>
                <small>${escapeHTML(contact.email)}</small>
              </span>
            </div>
          </td>
          <td>${escapeHTML(contact.company)}
            <small>${escapeHTML(contact.role || "Contact")}</small>
          </td>
          <td><span class="status status-${contact.status.toLowerCase()}">
            ${escapeHTML(contact.status)}
          </span></td>
          <td>${escapeHTML(contact.lastContact || "Just added")}</td>
          <td><strong>${money(contact.deal)}</strong></td>
          <td><button class="secondary delete-contact"
            data-id="${contact.id}">Delete</button></td>
        </tr>
      `).join("")
      : `<tr><td colspan="6">No contacts found.</td></tr>`;

    $("#contactCount").textContent = contacts.length;
    $("#tableSummary").textContent =
      `Showing ${visible.length ? start + 1 : 0}–${start + visible.length} of ${filteredContacts.length} contacts`;
    $("#pageIndicator").textContent = `${currentPage} / ${pages}`;
    $("#prevPage").disabled = currentPage <= 1;
    $("#nextPage").disabled = currentPage >= pages;

    const active = contacts.filter(c => c.status === "Active").length;
    $("#activeContacts").textContent = active.toLocaleString("en-US");
  }

  function renderPipeline() {
    const stages = window.CRM_DEMO_DATA.pipeline;
    $("#pipelineLegend").innerHTML = stages.map(stage => `
      <div class="pipeline-item">
        <span><i style="background:${stage.color}"></i>${stage.label}</span>
        <strong>${money(stage.value)}</strong>
      </div>
    `).join("");
  }

  function renderActivities() {
    $("#activityList").innerHTML =
      window.CRM_DEMO_DATA.activities.map(activity => `
        <div class="activity">
          <span class="activity-icon">${activity.icon}</span>
          <div>
            <strong>${escapeHTML(activity.text)}</strong>
            <small>${escapeHTML(activity.time)}</small>
          </div>
        </div>
      `).join("");
  }

  function renderTasks() {
    $("#taskList").innerHTML = tasks.map(task => `
      <label class="task ${task.done ? "completed" : ""}">
        <input type="checkbox" data-task-id="${task.id}"
          ${task.done ? "checked" : ""}>
        <span class="task-copy">
          <strong>${escapeHTML(task.title)}</strong>
          <small>${escapeHTML(task.detail)}</small>
        </span>
      </label>
    `).join("");
  }

  function renderChart() {
    const values = window.CRM_DEMO_DATA.chart[$("#revenueRange").value];
    const chart = $("#revenueChart");
    chart.innerHTML = "";

    values.forEach(value => {
      const bar = document.createElement("div");
      bar.className = "chart-bar";
      bar.style.height = `${value}%`;
      bar.title = `Demo revenue: ${value}`;
      chart.appendChild(bar);
    });

    $("#chartTotal").textContent =
      $("#revenueRange").value === "7" ? "$28,640" :
      $("#revenueRange").value === "90" ? "$382,900" : "$128,430";
  }

  function applyTheme(theme) {
    document.documentElement.dataset.theme = theme;
    $("#themeToggle").textContent = theme === "dark" ? "☀" : "☾";
    save(STORAGE.theme, theme);
  }

  function openModal() {
    $("#contactModal").classList.add("open");
    $("#contactModal").setAttribute("aria-hidden", "false");
    $("#contactForm input[name=name]").focus();
  }

  function closeModal() {
    $("#contactModal").classList.remove("open");
    $("#contactModal").setAttribute("aria-hidden", "true");
    $("#contactForm").reset();
  }

  function addContact(form) {
    const data = new FormData(form);
    const name = String(data.get("name")).trim();
    const id = Math.max(0, ...contacts.map(c => Number(c.id) || 0)) + 1;
    const colorSet = [
      { color: "#e8e3ff", ink: "#6654c8" },
      { color: "#dff5ed", ink: "#278b6d" },
      { color: "#dceeff", ink: "#397ab7" },
      { color: "#fce4ed", ink: "#bc527d" }
    ];
    const colors = colorSet[id % colorSet.length];

    contacts.unshift({
      id,
      name,
      email: String(data.get("email")).trim(),
      company: String(data.get("company")).trim(),
      role: String(data.get("role")).trim() || "Contact",
      status: String(data.get("status")),
      lastContact: "Just now",
      deal: Number(data.get("deal")) || 0,
      initials: getInitials(name),
      ...colors
    });

    save(STORAGE.contacts, contacts);
    currentPage = 1;
    $("#contactSearch").value = "";
    $("#globalSearch").value = "";
    $("#statusFilter").value = "all";
    renderContacts();
    closeModal();
    showToast(`${name} added successfully`);
  }

  function exportCSV() {
    const rows = [
      ["Name", "Email", "Company", "Role", "Status", "Last Contact", "Deal Value"],
      ...filteredContacts.map(c => [
        c.name, c.email, c.company, c.role,
        c.status, c.lastContact, c.deal
      ])
    ];

    const csv = rows.map(row => row.map(value =>
      `"${String(value ?? "").replace(/"/g, '""')}"`
    ).join(",")).join("\r\n");

    const blob = new Blob(["\ufeff" + csv], {
      type: "text/csv;charset=utf-8;"
    });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "crm-contacts.csv";
    link.click();
    URL.revokeObjectURL(url);
    showToast("CSV exported successfully");
  }

  function addTask() {
    const title = prompt("Masukkan nama tugas baru:");
    if (!title || !title.trim()) return;

    tasks.unshift({
      id: Math.max(0, ...tasks.map(task => task.id)) + 1,
      title: title.trim(),
      detail: "Personal task · Added just now",
      done: false
    });

    save(STORAGE.tasks, tasks);
    renderTasks();
    showToast("Task added");
  }

  function bindEvents() {
    $("#themeToggle").addEventListener("click", () => {
      applyTheme(document.documentElement.dataset.theme === "dark" ? "light" : "dark");
    });

    $("#mobileMenu").addEventListener("click", () => {
      document.querySelector(".sidebar").classList.toggle("open");
    });

    $("#addContactButton").addEventListener("click", openModal);
    $("#closeModal").addEventListener("click", closeModal);
    $("#cancelModal").addEventListener("click", closeModal);

    $("#contactModal").addEventListener("click", event => {
      if (event.target === $("#contactModal")) closeModal();
    });

    $("#contactForm").addEventListener("submit", event => {
      event.preventDefault();
      if (event.currentTarget.reportValidity()) addContact(event.currentTarget);
    });

    $("#contactSearch").addEventListener("input", () => {
      currentPage = 1;
      $("#globalSearch").value = "";
      renderContacts();
    });

    $("#globalSearch").addEventListener("input", () => {
      currentPage = 1;
      $("#contactSearch").value = "";
      renderContacts();
    });

    $("#statusFilter").addEventListener("change", () => {
      currentPage = 1;
      renderContacts();
    });

    $("#prevPage").addEventListener("click", () => {
      if (currentPage > 1) currentPage--;
      renderContacts();
    });

    $("#nextPage").addEventListener("click", () => {
      currentPage++;
      renderContacts();
    });

    $("#exportButton").addEventListener("click", exportCSV);
    $("#revenueRange").addEventListener("change", renderChart);
    $("#newTaskButton").addEventListener("click", addTask);

    $("#contactTableBody").addEventListener("click", event => {
      const button = event.target.closest(".delete-contact");
      if (!button) return;

      const contact = contacts.find(c => c.id === Number(button.dataset.id));
      if (!contact) return;

      if (!confirm(`Hapus kontak ${contact.name}?`)) return;

      contacts = contacts.filter(c => c.id !== contact.id);
      save(STORAGE.contacts, contacts);
      renderContacts();
      showToast("Contact deleted");
    });

    $("#taskList").addEventListener("change", event => {
      const input = event.target.closest("[data-task-id]");
      if (!input) return;

      const task = tasks.find(t => t.id === Number(input.dataset.taskId));
      if (!task) return;

      task.done = input.checked;
      save(STORAGE.tasks, tasks);
      renderTasks();
      showToast(task.done ? "Task completed" : "Task reopened");
    });

    document.addEventListener("keydown", event => {
      if (event.key === "Escape") closeModal();
      if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        $("#globalSearch").focus();
      }
    });
  }

  function init() {
    applyTheme(load(STORAGE.theme, "light"));
    renderContacts();
    renderPipeline();
    renderActivities();
    renderTasks();
    renderChart();
    bindEvents();
  }

  init();
})();
