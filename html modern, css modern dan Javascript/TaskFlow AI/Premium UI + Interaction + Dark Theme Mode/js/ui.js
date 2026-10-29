/* ============================================================
   ui.js — Helper render & toast
   ============================================================ */

const UI = {
  /* ---------- Toast ---------- */
  toast(message, type = 'info') {
    const container = document.getElementById('toast-container');
    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    const icon = type === 'success' ? '✅' : type === 'error' ? '⚠️' : 'ℹ️';
    toast.innerHTML = `<span>${icon}</span><span>${message}</span>`;
    container.appendChild(toast);

    setTimeout(() => {
      toast.classList.add('hide');
      toast.addEventListener('animationend', () => toast.remove(), { once: true });
    }, 2600);
  },

  /* ---------- Format tanggal ---------- */
  formatDate(iso) {
    if (!iso) return '';
    try {
      const d = new Date(iso);
      return d.toLocaleDateString('id-ID', {
        day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit'
      });
    } catch { return ''; }
  },

  /* ---------- Escape HTML ---------- */
  escape(str) {
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  },

  /* ---------- Buat elemen task ---------- */
  createTaskElement(task) {
    const el = document.createElement('div');
    el.className = 'task-item' + (task.completed ? ' completed' : '');
    el.dataset.id = task.id;

    const labelMap = { low: 'Rendah', medium: 'Sedang', high: 'Tinggi' };
    const priority = task.priority || 'medium';

    el.innerHTML = `
      <button class="task-checkbox ${task.completed ? 'checked' : ''}"
              data-action="toggle" aria-label="Tandai selesai">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3">
          <path d="M5 13l4 4L19 7" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      </button>
      <div class="task-body">
        <div class="task-text">${UI.escape(task.text)}</div>
        <div class="task-meta">
          <span class="task-tag tag-${priority}">${labelMap[priority]}</span>
          <span>·</span>
          <span>${UI.formatDate(task.createdAt)}</span>
        </div>
      </div>
      <div class="task-actions">
        <button class="task-btn delete" data-action="delete" aria-label="Hapus">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M3 6h18M8 6V4a1 1 0 011-1h6a1 1 0 011 1v2m2 0v14a2 2 0 01-2 2H8a2 2 0 01-2-2V6" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M10 11v6M14 11v6" stroke-linecap="round"/>
          </svg>
        </button>
      </div>
    `;
    return el;
  },

  /* ---------- Render seluruh task list ---------- */
  renderTasks(tasks) {
    const list = document.getElementById('task-list');
    const empty = document.getElementById('empty-state');
    list.innerHTML = '';

    if (!tasks.length) {
      empty.classList.add('show');
      return;
    }
    empty.classList.remove('show');

    const frag = document.createDocumentFragment();
    tasks.forEach(t => frag.appendChild(UI.createTaskElement(t)));
    list.appendChild(frag);
  },

  /* ---------- Update statistik & progress ---------- */
  updateStats(allTasks) {
    const total = allTasks.length;
    const done = allTasks.filter(t => t.completed).length;
    const active = total - done;
    const high = allTasks.filter(t => !t.completed && t.priority === 'high').length;

    document.getElementById('stat-total').textContent = total;
    document.getElementById('stat-active').textContent = active;
    document.getElementById('stat-done').textContent = done;
    document.getElementById('stat-high').textContent = high;

    document.getElementById('count-all').textContent = total;
    document.getElementById('count-active').textContent = active;
    document.getElementById('count-completed').textContent = done;
    document.getElementById('count-high').textContent = high;

    const percent = total ? Math.round((done / total) * 100) : 0;
    document.getElementById('progress-percent').textContent = `${percent}%`;
    document.getElementById('progress-fill').style.width = `${percent}%`;
    document.getElementById('progress-sub').textContent =
      total ? `${done} dari ${total} tugas selesai` : 'Belum ada tugas';
  }
};