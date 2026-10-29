/* ============================================================
   app.js — Logika utama aplikasi
   ============================================================ */

(function () {
  'use strict';

  /* ---------- State ---------- */
  let tasks = Storage.load();
  let currentFilter = 'all';
  let searchQuery = '';

  /* ---------- DOM ---------- */
  const $ = (id) => document.getElementById(id);
  const form = $('task-form');
  const input = $('task-input');
  const prioritySelect = $('priority-select');
  const searchInput = $('search-input');
  const sidebar = $('sidebar');
  const overlay = $('overlay');
  const menuToggle = $('menu-toggle');
  const pageTitle = $('page-title');
  const pageSubtitle = $('page-subtitle');
  const tasksHeading = $('tasks-heading');

  /* ---------- Persist ---------- */
  function persist() {
    Storage.save(tasks);
  }

  /* ---------- ID generator ---------- */
  function uid() {
    return 't_' + Date.now().toString(36) + Math.random().toString(36).slice(2, 7);
  }

  /* ---------- Filtering ---------- */
  function getVisibleTasks() {
    let list = tasks.slice();

    switch (currentFilter) {
      case 'active':          list = list.filter(t => !t.completed); break;
      case 'completed':       list = list.filter(t => t.completed); break;
      case 'priority-high':   list = list.filter(t => t.priority === 'high'); break;
    }

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      list = list.filter(t => t.text.toLowerCase().includes(q));
    }

    // Urutkan: yang belum selesai dulu, lalu prioritas tertinggi, lalu terbaru
    const order = { high: 0, medium: 1, low: 2 };
    list.sort((a, b) => {
      if (a.completed !== b.completed) return a.completed ? 1 : -1;
      const pa = order[a.priority] ?? 1;
      const pb = order[b.priority] ?? 1;
      if (pa !== pb) return pa - pb;
      return (b.createdAt || '').localeCompare(a.createdAt || '');
    });

    return list;
  }

  /* ---------- Render semua ---------- */
  function render() {
    UI.renderTasks(getVisibleTasks());
    UI.updateStats(tasks);
    updatePageMeta();
  }

  /* ---------- Update judul halaman sesuai filter ---------- */
  function updatePageMeta() {
    const meta = {
      'all':            { title: 'Semua Tugas',      sub: 'Kelola produktivitas harianmu',        heading: 'Daftar Tugas' },
      'active':         { title: 'Tugas Aktif',      sub: 'Fokus pada yang belum selesai',        heading: 'Tugas Aktif' },
      'completed':      { title: 'Tugas Selesai',    sub: 'Kerja bagus! Ini pencapaianmu',        heading: 'Tugas Selesai' },
      'priority-high':  { title: 'Prioritas Tinggi', sub: 'Tugas yang paling penting',            heading: 'Prioritas Tinggi' }
    }[currentFilter] || { title: 'Semua Tugas', sub: '', heading: 'Daftar Tugas' };

    pageTitle.textContent = meta.title;
    pageSubtitle.textContent = meta.sub;
    tasksHeading.textContent = meta.heading;
  }

  /* ---------- CRUD ---------- */
  function addTask(text, priority) {
    const trimmed = text.trim();
    if (!trimmed) {
      UI.toast('Teks tugas tidak boleh kosong', 'error');
      return false;
    }
    if (trimmed.length > 120) {
      UI.toast('Teks terlalu panjang (maks 120 karakter)', 'error');
      return false;
    }

    const task = {
      id: uid(),
      text: trimmed,
      completed: false,
      priority: priority || 'medium',
      createdAt: new Date().toISOString()
    };
    tasks.unshift(task);
    persist();
    render();
    UI.toast('Tugas ditambahkan', 'success');
    return true;
  }

  function toggleTask(id) {
    const t = tasks.find(x => x.id === id);
    if (!t) return;
    t.completed = !t.completed;
    t.completedAt = t.completed ? new Date().toISOString() : null;
    persist();
    render();
    UI.toast(t.completed ? 'Tugas diselesaikan 🎉' : 'Tugas dibuka kembali', 'info');
  }

  function deleteTask(id) {
    const el = document.querySelector(`.task-item[data-id="${id}"]`);
    const remove = () => {
      tasks = tasks.filter(x => x.id !== id);
      persist();
      render();
      UI.toast('Tugas dihapus', 'info');
    };
    if (el) {
      el.classList.add('removing');
      el.addEventListener('animationend', remove, { once: true });
      // Fallback kalau animationend tidak fired
      setTimeout(() => { if (document.body.contains(el)) remove(); }, 400);
    } else {
      remove();
    }
  }

  function clearCompleted() {
    const count = tasks.filter(t => t.completed).length;
    if (!count) {
      UI.toast('Tidak ada tugas selesai', 'info');
      return;
    }
    tasks = tasks.filter(t => !t.completed);
    persist();
    render();
    UI.toast(`${count} tugas selesai dihapus`, 'success');
  }

  /* ---------- Event: form submit ---------- */
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const ok = addTask(input.value, prioritySelect.value);
    if (ok) {
      input.value = '';
      input.focus();
    }
  });

  /* ---------- Event: task list (delegasi) ---------- */
  document.getElementById('task-list').addEventListener('click', (e) => {
    const btn = e.target.closest('[data-action]');
    if (!btn) return;
    const item = btn.closest('.task-item');
    if (!item) return;
    const id = item.dataset.id;
    const action = btn.dataset.action;

    if (action === 'toggle') toggleTask(id);
    else if (action === 'delete') deleteTask(id);
  });

  /* ---------- Event: filter nav ---------- */
  document.querySelectorAll('.nav-item').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.nav-item').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      currentFilter = btn.dataset.filter;
      render();
      closeSidebarOnMobile();
    });
  });

  /* ---------- Event: search ---------- */
  let searchTimer;
  searchInput.addEventListener('input', (e) => {
    clearTimeout(searchTimer);
    searchTimer = setTimeout(() => {
      searchQuery = e.target.value;
      render();
    }, 180);
  });

  /* ---------- Event: clear completed ---------- */
  document.getElementById('clear-completed').addEventListener('click', clearCompleted);

  /* ---------- Sidebar mobile ---------- */
  function openSidebar() {
    sidebar.classList.add('open');
    overlay.classList.add('show');
  }
  function closeSidebar() {
    sidebar.classList.remove('open');
    overlay.classList.remove('show');
  }
  function closeSidebarOnMobile() {
    if (window.innerWidth <= 860) closeSidebar();
  }

  menuToggle.addEventListener('click', openSidebar);
  overlay.addEventListener('click', closeSidebar);

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeSidebar();
    // Shortcut "/" untuk fokus search
    if (e.key === '/' && document.activeElement.tagName !== 'INPUT') {
      e.preventDefault();
      searchInput.focus();
    }
  });

  window.addEventListener('resize', () => {
    if (window.innerWidth > 860) closeSidebar();
  });

  /* ---------- Init ---------- */
  render();
  console.log('%c⚡ TaskFlow AI siap digunakan', 'color:#8b5cf6;font-weight:bold;');
})();