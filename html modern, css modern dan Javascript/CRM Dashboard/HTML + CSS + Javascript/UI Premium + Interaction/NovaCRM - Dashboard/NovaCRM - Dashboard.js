
(() => {
  "use strict";

  const $ = (selector, scope = document) => scope.querySelector(selector);
  const $$ = (selector, scope = document) => [...scope.querySelectorAll(selector)];
  const themeButton = $("#themeToggle");
  const root = document.documentElement;
  let toastTimer;

  // Theme: persist preference in this browser.
  try {
    const saved = localStorage.getItem("nova-theme");
    if (saved === "dark" || saved === "light") root.dataset.theme = saved;
  } catch (_) {}

  function updateThemeButton() {
    const dark = root.dataset.theme === "dark";
    themeButton.textContent = dark ? "☀" : "☾";
    themeButton.setAttribute("aria-label", dark ? "Enable light mode" : "Enable dark mode");
    $('meta[name="theme-color"]').content = dark ? "#12131a" : "#f5f6fb";
  }
  updateThemeButton();

  themeButton.addEventListener("click", () => {
    root.dataset.theme = root.dataset.theme === "dark" ? "light" : "dark";
    try { localStorage.setItem("nova-theme", root.dataset.theme); } catch (_) {}
    updateThemeButton();
    toast(`${root.dataset.theme === "dark" ? "Dark" : "Light"} mode enabled.`);
  });

  function toast(message) {
    let node = $("#toast");
    if (!node) {
      node = document.createElement("div");
      node.id = "toast";
      node.className = "toast";
      node.setAttribute("role", "status");
      node.setAttribute("aria-live", "polite");
      document.body.append(node);
    }
    node.textContent = message;
    node.classList.add("show");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => node.classList.remove("show"), 2600);
  }

  // Global search filters the contact table.
  const searchInput = $("#searchInput");
  const tableBody = $("#contactsBody");
  const emptyState = $("#emptyState");

  function filterContacts() {
    const query = searchInput.value.trim().toLocaleLowerCase();
    const rows = $$("tr", tableBody);
    let shown = 0;
    rows.forEach(row => {
      const matches = row.textContent.toLocaleLowerCase().includes(query);
      row.hidden = !matches;
      if (matches) shown++;
    });
    emptyState.hidden = shown > 0;
    $("#contactCount").textContent = shown;
    $("#tableSummary").textContent = `Showing ${shown} demo contacts`;
  }
  searchInput.addEventListener("input", filterContacts);

  document.addEventListener("keydown", event => {
    if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === "k") {
      event.preventDefault();
      searchInput.focus();
    }
  });

  $("#clearSearch").addEventListener("click", () => {
    searchInput.value = "";
    filterContacts();
    toast("Search cleared.");
  });

  // Select visible contacts.
  $("#selectAll").addEventListener("change", event => {
    $$(".row-check", tableBody).forEach(box => {
      if (!box.closest("tr").hidden) box.checked = event.target.checked;
    });
    toast(event.target.checked ? "Visible contacts selected." : "Selection cleared.");
  });

  tableBody.addEventListener("change", event => {
    if (!event.target.matches(".row-check")) return;
    const visible = $$(".row-check", tableBody).filter(box => !box.closest("tr").hidden);
    $("#selectAll").checked = visible.length > 0 && visible.every(box => box.checked);
  });

  // Accessible add-contact dialog.
  const dialog = $("#contactDialog");
  $("#addContactButton").addEventListener("click", () => dialog.showModal());
  $("#closeDialog").addEventListener("click", () => dialog.close());
  $("#cancelDialog").addEventListener("click", () => dialog.close());
  dialog.addEventListener("click", event => {
    if (event.target === dialog) dialog.close();
  });

  function initials(name) {
    return name.trim().split(/\s+/).slice(0, 2).map(word => word[0]).join("").toUpperCase();
  }
  function avatarColor(name) {
    return ["purple", "pink", "orange", "blue", "green", "teal"][name.length % 6];
  }

  $("#contactForm").addEventListener("submit", event => {
    event.preventDefault();
    const form = event.currentTarget;
    if (!form.reportValidity()) return;

    const data = new FormData(form);
    const name = String(data.get("name")).trim();
    const email = String(data.get("email")).trim();
    const company = String(data.get("company")).trim();
    const status = String(data.get("status"));

    const row = document.createElement("tr");
    const selectCell = document.createElement("td");
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.className = "row-check";
    checkbox.setAttribute("aria-label", `Select ${name}`);
    selectCell.append(checkbox);

    const contactCell = document.createElement("td");
    const contact = document.createElement("div");
    contact.className = "contact";
    const avatar = document.createElement("span");
    avatar.className = `avatar ${avatarColor(name)}`;
    avatar.textContent = initials(name);
    const details = document.createElement("span");
    const nameNode = document.createElement("b");
    nameNode.textContent = name;
    const emailNode = document.createElement("small");
    emailNode.textContent = email;
    details.append(nameNode, emailNode);
    contact.append(avatar, details);
    contactCell.append(contact);

    const companyCell = document.createElement("td");
    companyCell.textContent = company;
    const statusCell = document.createElement("td");
    const badge = document.createElement("span");
    badge.className = `status ${status.toLowerCase()}`;
    badge.textContent = status;
    statusCell.append(badge);
    const lastCell = document.createElement("td");
    lastCell.textContent = "Just now";
    const menuCell = document.createElement("td");
    const menuButton = document.createElement("button");
    menuButton.className = "row-menu";
    menuButton.textContent = "···";
    menuButton.setAttribute("aria-label", `Menu ${name}`);
    menuButton.addEventListener("click", () => toast("Contact actions are demo-only."));
    menuCell.append(menuButton);

    row.append(selectCell, contactCell, companyCell, statusCell, lastCell, menuCell);
    tableBody.prepend(row);
    form.reset();
    dialog.close();
    searchInput.value = "";
    filterContacts();

    const metric = $("#contactMetric");
    metric.textContent = (1284 + tableBody.rows.length - 6).toLocaleString("en-US");
    toast(`${name} added to the demo contacts.`);
  });

  // Export visible contact rows as a CSV file.
  $("#exportButton").addEventListener("click", () => {
    const rows = $$("tr", tableBody).filter(row => !row.hidden);
    const values = [["Name", "Email", "Company", "Status", "Last contact"]];
    rows.forEach(row => {
      const cells = $$("td", row);
      values.push([
        $("b", cells[1])?.textContent || "",
        $("small", cells[1])?.textContent || "",
        cells[2].textContent.trim(),
        cells[3].textContent.trim(),
        cells[4].textContent.trim()
      ]);
    });
    if (values.length === 1) return toast("No contacts to export.");
    const csv = values.map(row => row.map(value =>
      `"${String(value).replace(/"/g, '""')}"`
    ).join(",")).join("\r\n");
    const blob = new Blob(["\uFEFF" + csv], { type: "text/csv;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "nova-crm-contacts-demo.csv";
    document.body.append(link);
    link.click();
    link.remove();
    URL.revokeObjectURL(url);
    toast(`CSV exported: ${rows.length} demo contacts.`);
  });

  // Task checklist and summary.
  function updateTasks() {
    const checks = $$(".task-list input[type=checkbox]");
    const completed = checks.filter(check => check.checked).length;
    const remaining = checks.length - completed;
    $("#taskCount").textContent = remaining;
    $("#tasksRemaining").textContent = `${remaining} remaining`;
  }
  $("#taskList").addEventListener("change", event => {
    if (event.target.matches('input[type="checkbox"]')) {
      updateTasks();
      toast(event.target.checked ? "Task marked complete." : "Task reopened.");
    }
  });

  $("#addTask").addEventListener("click", () => {
    const title = prompt("Enter a new demo task:");
    if (!title || !title.trim()) return;

    const label = document.createElement("label");
    label.className = "task";
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    const fakeCheck = document.createElement("span");
    fakeCheck.className = "fake-check";
    const copy = document.createElement("span");
    copy.className = "task-copy";
    const name = document.createElement("b");
    name.textContent = title.trim();
    const meta = document.createElement("small");
    const priority = document.createElement("i");
    priority.className = "priority low";
    meta.append(priority, document.createTextNode(" New task · Just added"));
    copy.append(name, meta);
    const owner = document.createElement("span");
    owner.className = "avatar purple task-avatar";
    owner.textContent = "AR";
    label.append(checkbox, fakeCheck, copy, owner);
    $("#taskList").append(label);
    updateTasks();
    toast("Demo task added.");
  });

  // Small UI feedback for controls that do not connect to a backend.
  $("#notifications").addEventListener("click", () => toast("You are all caught up."));
  $("#profileMenu").addEventListener("click", () => toast("Profile menu is a UI demo."));
  $("#pipelineButton").addEventListener("click", () => toast("Showing the demo pipeline summary."));
  $("#allTasks").addEventListener("click", () => toast("All demo tasks are shown here."));
  $("#chartRange").addEventListener("change", event => {
    toast(`Selected ${event.target.value} months. Chart is illustrative demo data.`);
  });

  // Responsive sidebar.
  $("#menuToggle").addEventListener("click", () => {
    $("#sidebar").classList.toggle("open");
  });
  $$(".nav-link").forEach(link => link.addEventListener("click", () => {
    $$(".nav-link").forEach(item => item.classList.remove("active"));
    link.classList.add("active");
    $("#sidebar").classList.remove("open");
  }));
})();
