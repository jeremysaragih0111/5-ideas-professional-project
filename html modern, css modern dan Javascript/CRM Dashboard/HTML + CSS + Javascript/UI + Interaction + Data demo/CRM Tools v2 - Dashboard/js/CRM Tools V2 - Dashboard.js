/* =========================================================
   CRM Tools V2 — app.js
   Logika UI, routing, render data, interaksi
   ========================================================= */

(function () {
  'use strict';

  const $ = (s, c = document) => c.querySelector(s);
  const $$ = (s, c = document) => Array.from(c.querySelectorAll(s));

  /* ============ FORMATTERS ============ */
  const fmtCurrency = (n) => {
    if (n >= 1e9) return 'Rp ' + (n / 1e9).toFixed(1).replace('.0','') + ' M';
    if (n >= 1e6) return 'Rp ' + (n / 1e6).toFixed(1).replace('.0','') + ' Jt';
    if (n >= 1e3) return 'Rp ' + (n / 1e3).toFixed(0) + ' Rb';
    return 'Rp ' + n;
  };
  const fmtFull = (n) =>
    'Rp ' + n.toLocaleString('id-ID');

  const initials = (name) =>
    name.split(' ').map(w => w[0]).slice(0, 2).join('').toUpperCase();

  const $money = (v) => v;

  /* ============ ICONS ============ */
  const ICONS = {
    revenue: '<path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>',
    deals:   '<path d="M3 7l9-4 9 4-9 4-9-4z"/><path d="M3 12l9 4 9-4"/><path d="M3 17l9 4 9-4"/>',
    contacts:'<circle cx="9" cy="8" r="3.2"/><path d="M3 20c0-3.3 2.7-6 6-6s6 2.7 6 6"/><circle cx="17.5" cy="8" r="2.5"/>',
    target:  '<circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="5"/><circle cx="12" cy="12" r="1.4"/>',
    deal:    '<path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>',
    contact: '<circle cx="9" cy="8" r="3.2"/><path d="M3 20c0-3.3 2.7-6 6-6s6 2.7 6 6"/>',
    task:    '<path d="M9 11l3 3 8-8"/><path d="M20 12v6a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h9"/>'
  };
  const svg = (path) =>
    `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">${path}</svg>`;

  /* ============ TOAST ============ */
  let toastTimer;
  function toast(msg) {
    const el = $('#toast');
    if (!el) return;
    el.textContent = msg;
    el.classList.add('show');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => el.classList.remove('show'), 2600);
  }
  window.CRMToast = toast;

  /* ============ ROUTING ============ */
  function navigate(page) {
    $$('.page').forEach(p => p.classList.remove('active'));
    const target = document.getElementById('page-' + page);
    if (target) target.classList.add('active');

    $$('.nav-item').forEach(n => {
      n.classList.toggle('active', n.dataset.page === page);
    });

    // close mobile sidebar
    $('#sidebar')?.classList.remove('open');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  /* ============ RENDER: STATS ============ */
  function renderStats(container, list) {
    if (!container) return;
    container.innerHTML = list.map(s => {
      let val = s.value;
      if (s.fmt === 'currency') val = fmtCurrency(s.value);
      else if (s.suffix) val = s.value + s.suffix;
      else val = s.value.toLocaleString('id-ID');

      return `
        <div class="stat">
          <div class="stat-top">
            <div class="stat-icon">${svg(ICONS[s.icon] || ICONS.deals)}</div>
            <span class="trend ${s.up ? 'up' : 'down'}">${s.up ? '▲' : '▼'} ${s.trend}%</span>
          </div>
          <div class="stat-label">${s.label}</div>
          <div class="stat-value">${val}</div>
          <div class="stat-foot muted">vs bulan lalu</div>
        </div>`;
    }).join('');
  }

  /* ============ RENDER: CHART ============ */
  function drawLineChart(canvas, labels, values, color) {
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const dpr = window.devicePixelRatio || 1;
    const rect = canvas.getBoundingClientRect();
    const W = rect.width || canvas.parentElement.clientWidth || 600;
    const H = canvas.height || 240;

    canvas.width = W * dpr;
    canvas.height = H * dpr;
    canvas.style.width = W + 'px';
    canvas.style.height = H + 'px';
    ctx.scale(dpr, dpr);

    ctx.clearRect(0, 0, W, H);

    const pad = { top: 20, right: 16, bottom: 30, left: 44 };
    const chartW = W - pad.left - pad.right;
    const chartH = H - pad.top - pad.bottom;

    const maxV = Math.max(...values) * 1.15;
    const stepX = chartW / (labels.length - 1 || 1);

    const style = getComputedStyle(document.documentElement);
    const cMuted = style.getPropertyValue('--muted').trim() || '#94a3b8';
    const cBorder = style.getPropertyValue('--border').trim() || '#e5e8f0';
    const cBrand = color || style.getPropertyValue('--brand').trim() || '#5b6cff';
    const cBrand2 = style.getPropertyValue('--brand-2').trim() || '#8b5cf6';

    // grid
    ctx.strokeStyle = cBorder;
    ctx.lineWidth = 1;
    ctx.font = '11px Plus Jakarta Sans, sans-serif';
    ctx.fillStyle = cMuted;
    const rows = 4;
    for (let i = 0; i <= rows; i++) {
      const y = pad.top + (chartH / rows) * i;
      ctx.beginPath();
      ctx.moveTo(pad.left, y);
      ctx.lineTo(pad.left + chartW, y);
      ctx.stroke();

      const val = Math.round(maxV - (maxV / rows) * i);
      ctx.textAlign = 'right';
      ctx.fillText(val, pad.left - 8, y + 4);
    }

    // points
    const pts = values.map((v, i) => ({
      x: pad.left + i * stepX,
      y: pad.top + chartH - (v / maxV) * chartH
    }));

    // area
    const grad = ctx.createLinearGradient(0, pad.top, 0, pad.top + chartH);
    grad.addColorStop(0, hexA(cBrand, 0.28));
    grad.addColorStop(1, hexA(cBrand, 0));
    ctx.beginPath();
    ctx.moveTo(pts[0].x, pad.top + chartH);
    pts.forEach(p => ctx.lineTo(p.x, p.y));
    ctx.lineTo(pts[pts.length - 1].x, pad.top + chartH);
    ctx.closePath();
    ctx.fillStyle = grad;
    ctx.fill();

    // line
    const lineGrad = ctx.createLinearGradient(pad.left, 0, pad.left + chartW, 0);
    lineGrad.addColorStop(0, cBrand);
    lineGrad.addColorStop(1, cBrand2);
    ctx.beginPath();
    pts.forEach((p, i) => i ? ctx.lineTo(p.x, p.y) : ctx.moveTo(p.x, p.y));
    ctx.strokeStyle = lineGrad;
    ctx.lineWidth = 2.5;
    ctx.lineJoin = 'round';
    ctx.lineCap = 'round';
    ctx.stroke();

    // dots
    pts.forEach((p, i) => {
      ctx.beginPath();
      ctx.arc(p.x, p.y, 3.4, 0, Math.PI * 2);
      ctx.fillStyle = cBrand;
      ctx.fill();
      ctx.strokeStyle = '#fff';
      ctx.lineWidth = 1.6;
      ctx.stroke();
    });

    // x labels
    ctx.fillStyle = cMuted;
    ctx.textAlign = 'center';
    const skip = Math.ceil(labels.length / 8);
    labels.forEach((l, i) => {
      if (i % skip !== 0 && i !== labels.length - 1) return;
      ctx.fillText(l, pts[i].x, pad.top + chartH + 20);
    });
  }

  function hexA(hex, a) {
    if (!hex) return 'rgba(91,108,255,' + a + ')';
    hex = hex.replace('#', '');
    if (hex.length === 3) hex = hex.split('').map(c => c + c).join('');
    const r = parseInt(hex.slice(0, 2), 16);
    const g = parseInt(hex.slice(2, 4), 16);
    const b = parseInt(hex.slice(4, 6), 16);
    if (isNaN(r)) return 'rgba(91,108,255,' + a + ')';
    return `rgba(${r},${g},${b},${a})`;
  }

  /* ============ RENDER: PIPELINE ============ */
  function renderPipeline() {
    const el = $('#pipelineList');
    if (!el) return;
    el.innerHTML = CRM_DATA.pipeline.map(p => {
      const pct = Math.round((p.count / p.max) * 100);
      return `
        <div class="pipe-row">
          <div class="pipe-head">
            <span>${p.stage} · ${p.count} deals</span>
            <span>${fmtCurrency(p.value)}</span>
          </div>
          <div class="pipe-bar">
            <div class="pipe-fill" style="width:${pct}%"></div>
          </div>
        </div>`;
    }).join('');
  }

  /* ============ RENDER: RECENT DEALS ============ */
  function renderRecentDeals() {
    const tbl = $('#recentDeals');
    if (!tbl) return;
    const rows = CRM_DATA.deals.slice(0, 5).map(d => `
      <tr>
        <td>
          <div class="cell-user">
            <div class="av">${initials(d.owner)}</div>
            <div>
              <strong>${d.title}</strong>
              <small>${d.contact}</small>
            </div>
          </div>
        </td>
        <td>${fmtCurrency(d.value)}</td>
        <td><span class="pill ${d.stage.toLowerCase()}">${d.stage}</span></td>
      </tr>`).join('');

    tbl.innerHTML = `
      <thead>
        <tr><th>Deal</th><th>Nilai</th><th>Stage</th></tr>
      </thead>
      <tbody>${rows}</tbody>`;
  }

  /* ============ RENDER: ACTIVITY ============ */
  function renderActivity() {
    const el = $('#activityList');
    if (!el) return;
    el.innerHTML = CRM_DATA.activities.map(a => `
      <li>
        <div class="act-icon">${svg(ICONS[a.icon] || ICONS.task)}</div>
        <div>
          <p>${a.text}</p>
          <small>${a.time}</small>
        </div>
      </li>`).join('');
  }

  /* ============ RENDER: CONTACTS ============ */
  let contactQuery = '';
  let contactStatus = 'all';

  function renderContacts() {
    const tbl = $('#contactsTable');
    if (!tbl) return;

    let list = CRM_DATA.contacts.filter(c => {
      const matchQ = !contactQuery ||
        (c.name + c.company + c.email).toLowerCase().includes(contactQuery);
      const matchS = contactStatus === 'all' || c.status === contactStatus;
      return matchQ && matchS;
    });

    const statusLabel = { customer:'Customer', lead:'Lead', prospect:'Prospect' };

    tbl.innerHTML = `
      <thead>
        <tr>
          <th>Nama</th><th>Perusahaan</th><th>Email</th><th>Telepon</th><th>Status</th>
        </tr>
      </thead>
      <tbody>
        ${list.map(c => `
          <tr>
            <td>
              <div class="cell-user">
                <div class="av">${initials(c.name)}</div>
                <strong>${c.name}</strong>
              </div>
            </td>
            <td>${c.company}</td>
            <td>${c.email}</td>
            <td>${c.phone}</td>
            <td><span class="pill ${c.status}">${statusLabel[c.status]}</span></td>
          </tr>`).join('') ||
          `<tr><td colspan="5" style="text-align:center;padding:32px;color:var(--muted)">Tidak ada kontak ditemukan.</td></tr>`}
      </tbody>`;

    updateBadges();
  }

  function updateBadges() {
    const cb = $('#contactBadge');
    const tb = $('#taskBadge');
    if (cb) cb.textContent = CRM_DATA.contacts.length;
    if (tb) tb.textContent = CRM_DATA.tasks.filter(t => !t.done).length;
  }

  /* ============ RENDER: KANBAN ============ */
  const STAGES = ['Lead', 'Qualified', 'Proposal', 'Negotiation', 'Won'];

  function renderKanban() {
    const el = $('#kanban');
    if (!el) return;

    el.innerHTML = STAGES.map(stage => {
      const items = CRM_DATA.deals.filter(d => d.stage === stage);
      return `
        <div class="kcol" data-stage="${stage}">
          <div class="kcol-head">
            <h3>${stage}</h3>
            <span class="count">${items.length}</span>
          </div>
          ${items.map(d => `
            <div class="kcard" draggable="true" data-id="${d.id}">
              <strong>${d.title}</strong>
              <div class="kval">${fmtCurrency(d.value)}</div>
              <div class="kmeta">
                <span>${d.owner}</span>
                <span>${initials(d.owner)}</span>
              </div>
            </div>`).join('')}
        </div>`;
    }).join('');

    attachDragDrop();
  }

  /* ============ DRAG & DROP KANBAN ============ */
  function attachDragDrop() {
    let dragged = null;

    $$('.kcard').forEach(card => {
      card.addEventListener('dragstart', () => {
        dragged = card;
        card.style.opacity = '0.4';
      });
      card.addEventListener('dragend', () => {
        if (dragged) dragged.style.opacity = '';
        dragged = null;
      });
    });

    $$('.kcol').forEach(col => {
      col.addEventListener('dragover', (e) => {
        e.preventDefault();
        col.style.background = 'var(--brand-soft)';
      });
      col.addEventListener('dragleave', () => {
        col.style.background = '';
      });
      col.addEventListener('drop', (e) => {
        e.preventDefault();
        col.style.background = '';
        if (!dragged) return;
        const id = Number(dragged.dataset.id);
        const newStage = col.dataset.stage;
        const deal = CRM_DATA.deals.find(d => d.id === id);
        if (deal) {
          deal.stage = newStage;
          toast(`Deal "${deal.title}" dipindah ke ${newStage}.`);
          renderKanban();
        }
      });
    });
  }

  /* ============ RENDER: TASKS ============ */
  function renderTasks() {
    const el = $('#taskList');
    if (!el) return;
    el.innerHTML = CRM_DATA.tasks.map(t => `
      <li class="${t.done ? 'done' : ''}">
        <input type="checkbox" id="task-${t.id}" data-id="${t.id}" ${t.done ? 'checked' : ''} />
        <label for="task-${t.id}">${t.title}</label>
        <small>${t.due}</small>
      </li>`).join('');

    $$('#taskList input[type="checkbox"]').forEach(cb => {
      cb.addEventListener('change', () => {
        const id = Number(cb.dataset.id);
        const task = CRM_DATA.tasks.find(t => t.id === id);
        if (task) {
          task.done = cb.checked;
          cb.closest('li').classList.toggle('done', task.done);
          updateBadges();
          toast(task.done ? 'Tugas selesai! 🎉' : 'Tugas dibuka kembali.');
        }
      });
    });
  }

  /* ============ RENDER: REPORTS ============ */
  function renderReports() {
    const statsEl = $('#reportStats');
    if (statsEl) {
      statsEl.innerHTML = CRM_DATA.reports.stats.map(s => `
        <div class="stat">
          <div class="stat-top">
            <div class="stat-icon">${svg(ICONS[s.icon] || ICONS.target)}</div>
            <span class="trend ${s.up ? 'up' : 'down'}">${s.up ? '▲' : '▼'} ${s.trend}%</span>
          </div>
          <div class="stat-label">${s.label}</div>
          <div class="stat-value">${
            s.icon === 'revenue' ? fmtCurrency(s.value) :
            (s.suffix ? s.value + s.suffix : s.value)
          }</div>
          <div class="stat-foot muted">vs periode lalu</div>
        </div>`).join('');
    }

    const conv = $('#convChart');
    if (conv) {
      drawLineChart(conv, CRM_DATA.reports.conversion.labels, CRM_DATA.reports.conversion.values);
    }
  }

  /* ============ ADD DEAL (demo) ============ */
  let dealCounter = 100;

  function openAddDeal() {
    const title = prompt('Nama deal baru:', 'Deal Baru ' + (++dealCounter));
    if (!title) return;
    const valStr = prompt('Nilai deal (dalam rupiah, contoh: 50000000):', '50000000');
    const value = Number(String(valStr).replace(/[^0-9]/g, '')) || 50000000;

    CRM_DATA.deals.unshift({
      id: Date.now(),
      title,
      value,
      stage: 'Lead',
      owner: 'Ayu Lestari',
      contact: 'Kontak Baru'
    });

    renderRecentDeals();
    renderKanban();
    toast(`Deal "${title}" ditambahkan.`);
  }

  /* ============ INIT DASHBOARD ============ */
  function renderDashboard() {
    renderStats($('#statsGrid'), CRM_DATA.stats);
    renderPipeline();
    renderRecentDeals();
    renderActivity();
  }

  /* ============ GLOBAL SEARCH ============ */
  function globalSearch(q) {
    q = q.trim().toLowerCase();
    if (!q) return;

    const contact = CRM_DATA.contacts.find(c =>
      (c.name + c.company).toLowerCase().includes(q));
    if (contact) {
      navigate('contacts');
      contactQuery = q;
      const si = $('#contactSearch');
      if (si) si.value = q;
      renderContacts();
      return;
    }

    const deal = CRM_DATA.deals.find(d => d.title.toLowerCase().includes(q));
    if (deal) {
      navigate('deals');
      toast(`Menampilkan deal: ${deal.title}`);
      return;
    }

    const task = CRM_DATA.tasks.find(t => t.title.toLowerCase().includes(q));
    if (task) {
      navigate('tasks');
      toast(`Menampilkan tugas: ${task.title}`);
      return;
    }

    toast('Tidak ada hasil untuk "' + q + '"');
  }

  /* ============ EVENT BINDINGS ============ */
  function bindEvents() {
    // NAV
    $$('.nav-item').forEach(n => {
      n.addEventListener('click', (e) => {
        e.preventDefault();
        navigate(n.dataset.page);
      });
    });

    // Link "Lihat semua"
    $$('[data-page]').forEach(el => {
      if (el.classList.contains('nav-item')) return;
      el.addEventListener('click', (e) => {
        e.preventDefault();
        navigate(el.dataset.page);
      });
    });

    // TOAST demo buttons
    $$('[data-toast]').forEach(btn => {
      btn.addEventListener('click', () => toast(btn.dataset.toast));
    });

    // SIDEBAR TOGGLE
    $('#menuToggle')?.addEventListener('click', () => {
      $('#sidebar')?.classList.toggle('open');
    });

    // GLOBAL SEARCH
    $('#globalSearch')?.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') globalSearch(e.target.value);
    });

    // CONTACT SEARCH & FILTER
    $('#contactSearch')?.addEventListener('input', (e) => {
      contactQuery = e.target.value.trim().toLowerCase();
      renderContacts();
    });
    $('#contactFilter')?.addEventListener('change', (e) => {
      contactStatus = e.target.value;
      renderContacts();
    });

    // ADD DEAL
    $('#addDealBtn')?.addEventListener('click', openAddDeal);
    $('#addDealBtn2')?.addEventListener('click', openAddDeal);

    // REVENUE RANGE
    $('#revRange')?.addEventListener('change', (e) => {
      const n = Number(e.target.value);
      const labels = CRM_DATA.revenue.labels.slice(-n);
      const values = CRM_DATA.revenue.values.slice(-n);
      drawLineChart($('#revenueChart'), labels, values);
      toast(`Menampilkan ${n} bulan terakhir.`);
    });

    // NOTIF
    $('#notifBtn')?.addEventListener('click', () => {
      toast('🔔 3 notifikasi baru (demo).');
    });

    // SETTINGS TOGGLE
    $('#emailSwitch')?.addEventListener('change', (e) => {
      toast('Notifikasi email: ' + (e.target.checked ? 'Aktif' : 'Nonaktif'));
    });
    $('#filterSwitch')?.addEventListener('change', (e) => {
      toast('Auto-save filter: ' + (e.target.checked ? 'Aktif' : 'Nonaktif'));
    });

    // THEME CHANGE → redraw chart
    document.addEventListener('themechange', () => {
      setTimeout(() => {
        const canvas = $('#revenueChart');
        if (canvas) {
          const n = Number($('#revRange')?.value || 12);
          drawLineChart(canvas,
            CRM_DATA.revenue.labels.slice(-n),
            CRM_DATA.revenue.values.slice(-n));
        }
        const conv = $('#convChart');
        if (conv) {
          drawLineChart(conv,
            CRM_DATA.reports.conversion.labels,
            CRM_DATA.reports.conversion.values);
        }
      }, 60);
    });

    // Redraw on resize
    let rz;
    window.addEventListener('resize', () => {
      clearTimeout(rz);
      rz = setTimeout(() => {
        const canvas = $('#revenueChart');
        if (canvas) {
          const n = Number($('#revRange')?.value || 12);
          drawLineChart(canvas,
            CRM_DATA.revenue.labels.slice(-n),
            CRM_DATA.revenue.values.slice(-n));
        }
      }, 180);
    });
  }

  /* ============ BOOT ============ */
  function boot() {
    renderDashboard();
    renderContacts();
    renderKanban();
    renderTasks();
    renderReports();
    bindEvents();
    updateBadges();

    // First draw chart after layout
    requestAnimationFrame(() => {
      const canvas = $('#revenueChart');
      if (canvas) {
        drawLineChart(canvas,
          CRM_DATA.revenue.labels,
          CRM_DATA.revenue.values);
      }
      const conv = $('#convChart');
      if (conv) {
        drawLineChart(conv,
          CRM_DATA.reports.conversion.labels,
          CRM_DATA.reports.conversion.values);
      }
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot);
  } else {
    boot();
  }

})();