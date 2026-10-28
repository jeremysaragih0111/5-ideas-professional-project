/* ============================================================
   NEXUS ANALYTICS — APP LOGIC (CLEAN v3)
   ============================================================ */
'use strict';

/* ============ DATA ============ */
const PERIODS = {
  7: {
    revenue: [32000, 35500, 33800, 38200, 40100, 42600, 45300],
    target:  [33000, 34500, 36000, 37500, 39000, 41000, 43000],
    users:   [12400, 13100, 12800, 14200, 15100, 16800, 18742],
    labels:  ['Mon','Tue','Wed','Thu','Fri','Sat','Sun'],
    kpi: {
      rev: '$284,920', revTrend: '▲ 12.4%', revDir: 'up', revSub: 'vs. $253,410 last period',
      users: '18,742', usersTrend: '▲ 8.1%', usersDir: 'up', usersSub: '1,204 new this period',
      conv: '3.84%', convTrend: '▼ 1.2%', convDir: 'down', convSub: 'Goal: 4.5%',
      mrr: '$42,180', mrrTrend: '▲ 9.6%', mrrDir: 'up', mrrSub: '+$3,690 this month'
    }
  },
  30: {
    revenue: [24000, 26500, 28900, 27200, 31000, 33400, 32100, 35200, 37800, 36400, 40100, 42600],
    target:  [25000, 26000, 27500, 29000, 30000, 31500, 33000, 34500, 36000, 37500, 39000, 40500],
    users:   [9000, 9800, 10400, 11200, 10800, 12100, 13400, 14200, 13800, 15600, 16800, 18742],
    labels:  ['W1','','W2','','W3','','W4','','W5','','W6','Now'],
    kpi: {
      rev: '$1,128,400', revTrend: '▲ 18.2%', revDir: 'up', revSub: 'vs. $954,600 last month',
      users: '18,742', usersTrend: '▲ 14.7%', usersDir: 'up', usersSub: '4,820 new this month',
      conv: '3.91%', convTrend: '▲ 0.4%', convDir: 'up', convSub: 'Goal: 4.5%',
      mrr: '$42,180', mrrTrend: '▲ 11.3%', mrrDir: 'up', mrrSub: '+$4,290 this month'
    }
  },
  365: {
    revenue: [180000, 205000, 232000, 218000, 254000, 281000, 268000, 302000, 334000, 318000, 356000, 389000],
    target:  [190000, 200000, 215000, 230000, 245000, 260000, 275000, 290000, 305000, 320000, 335000, 350000],
    users:   [5200, 6100, 7400, 8100, 9600, 10800, 11400, 12900, 14200, 15400, 16800, 18742],
    labels:  ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'],
    kpi: {
      rev: '$3,237,000', revTrend: '▲ 42.8%', revDir: 'up', revSub: 'vs. $2,266,000 last year',
      users: '18,742', usersTrend: '▲ 61.2%', usersDir: 'up', usersSub: '+7,100 avg. monthly',
      conv: '3.76%', convTrend: '▲ 0.9%', convDir: 'up', convSub: 'Goal: 4.5%',
      mrr: '$42,180', mrrTrend: '▲ 58.4%', mrrDir: 'up', mrrSub: '+$15,500 this year'
    }
  }
};

const TRANSACTIONS = [
  { name: 'Sophia Carter', email: 'sophia@acme.io',      plan: 'Enterprise', amount: 2499, status: 'paid',     date: 'Dec 14, 2025', color: '#22d3ee' },
  { name: 'Liam Nguyen',   email: 'liam@brightlabs.co',  plan: 'Pro',        amount: 299,  status: 'paid',     date: 'Dec 14, 2025', color: '#8b5cf6' },
  { name: 'Olivia Brooks', email: 'olivia@fintrack.app', plan: 'Starter',    amount: 49,   status: 'pending',  date: 'Dec 13, 2025', color: '#10b981' },
  { name: 'Noah Patel',    email: 'noah@cloudwave.dev',  plan: 'Pro',        amount: 299,  status: 'paid',     date: 'Dec 13, 2025', color: '#f59e0b' },
  { name: 'Emma Wilson',   email: 'emma@zenithhq.com',   plan: 'Enterprise', amount: 2499, status: 'paid',     date: 'Dec 12, 2025', color: '#ec4899' },
  { name: 'James Kim',     email: 'james@orbitly.io',    plan: 'Pro',        amount: 299,  status: 'failed',   date: 'Dec 12, 2025', color: '#06b6d4' },
  { name: 'Ava Martinez',  email: 'ava@lumina.co',       plan: 'Starter',    amount: 49,   status: 'refunded', date: 'Dec 11, 2025', color: '#8b5cf6' },
  { name: 'Ethan Clark',   email: 'ethan@vertexai.io',   plan: 'Pro',        amount: 299,  status: 'paid',     date: 'Dec 11, 2025', color: '#22d3ee' }
];

const PAGE_SUBTITLES = {
  'Overview':     "Welcome back, Alex — here's your business at a glance.",
  'Revenue':      'Track revenue streams, targets, and growth performance.',
  'Customers':    'Understand your customer base and retention health.',
  'Products':     'Monitor product performance and adoption.',
  'Transactions': 'Review and reconcile every payment.',
  'AI Insights':  'AI-generated recommendations to grow your business.',
  'Settings':     'Manage your workspace preferences.'
};

/* ============ HELPERS ============ */
const $  = (sel) => document.querySelector(sel);
const $$ = (sel) => document.querySelectorAll(sel);

const SIDEBAR_KEY = 'nexus-sidebar-collapsed';
const MOBILE_QUERY = window.matchMedia('(max-width: 820px)');

/* ============ CHART STATE ============ */
const charts = { revenue: null, users: null };
const sparkCharts = {};

/* ============ DOM CACHE (dilakukan setelah DOMContentLoaded) ============ */
let els = {};
let kpiEls = {};

function cacheDom() {
  els = {
    sidebar:      $('#sidebar'),
    backdrop:     $('#backdrop'),
    menuBtn:      $('#menuBtn'),
    collapseBtn:  $('#collapseBtn'),
    app:          $('.app'),
    pageTitle:    $('#pageTitle'),
    pageSub:      $('#pageSub'),
    globalSearch: $('#globalSearch'),
    periodFilter: $('#periodFilter'),
    exportBtn:    $('#exportBtn'),
    refreshBtn:   $('#refreshBtn'),
    viewAllBtn:   $('#viewAllBtn'),
    clearSearch:  $('#clearSearch'),
    retryBtn:     $('#retryBtn'),
    tableWrap:    $('#tableWrap'),
    txBody:       $('#txBody'),
    emptyState:   $('#emptyState'),
    errorState:   $('#errorState'),
    loading:      $('#loading'),
    toast:        $('#toast'),
    toastMsg:     $('#toastMsg')
  };

  kpiEls = {
    revValue:   $('#revValue'),   revSub:   $('#revSub'),   revTrend:   $('#revTrend'),
    usersValue: $('#usersValue'), usersSub: $('#usersSub'), usersTrend: $('#usersTrend'),
    convValue:  $('#convValue'),  convSub:  $('#convSub'),  convTrend:  $('#convTrend'),
    mrrValue:   $('#mrrValue'),   mrrSub:   $('#mrrSub'),   mrrTrend:   $('#mrrTrend')
  };
}

/* ============ CHART HELPERS ============ */
function createGradient(ctx, area, c1, c2) {
  const g = ctx.createLinearGradient(0, area.top, 0, area.bottom);
  g.addColorStop(0, c1);
  g.addColorStop(1, c2);
  return g;
}

function formatShort(v) {
  return v >= 1000 ? `${Math.round(v / 1000)}k` : v;
}

/* ============ KPI RENDER ============ */
function setTrend(el, text, dir) {
  if (!el) return;
  el.textContent = text;
  el.className = `kpi-trend ${dir === 'up' ? 'up' : 'down'}`;
}

function renderKPIs(kpi) {
  if (!kpiEls.revValue) return;
  kpiEls.revValue.textContent = kpi.rev;
  kpiEls.revSub.textContent   = kpi.revSub;
  setTrend(kpiEls.revTrend, kpi.revTrend, kpi.revDir);

  kpiEls.usersValue.textContent = kpi.users;
  kpiEls.usersSub.textContent   = kpi.usersSub;
  setTrend(kpiEls.usersTrend, kpi.usersTrend, kpi.usersDir);

  kpiEls.convValue.textContent = kpi.conv;
  kpiEls.convSub.textContent   = kpi.convSub;
  setTrend(kpiEls.convTrend, kpi.convTrend, kpi.convDir);

  kpiEls.mrrValue.textContent = kpi.mrr;
  kpiEls.mrrSub.textContent   = kpi.mrrSub;
  setTrend(kpiEls.mrrTrend, kpi.mrrTrend, kpi.mrrDir);
}

/* ============ CHART BUILDERS ============ */
function buildRevenueChart(data) {
  const canvas = $('#revenueChart');
  if (!canvas || typeof Chart === 'undefined') return;

  if (charts.revenue) charts.revenue.destroy();

  charts.revenue = new Chart(canvas, {
    type: 'line',
    data: {
      labels: data.labels,
      datasets: [
        {
          label: 'Revenue',
          data: data.revenue,
          borderColor: '#22d3ee',
          borderWidth: 2.5,
          tension: 0.4,
          pointRadius: 0,
          pointHoverRadius: 5,
          pointHoverBackgroundColor: '#22d3ee',
          pointHoverBorderColor: '#06101f',
          pointHoverBorderWidth: 2,
          fill: true,
          backgroundColor: (c) => {
            if (!c.chart.chartArea) return 'rgba(34,211,238,.1)';
            return createGradient(c.chart.ctx, c.chart.chartArea, 'rgba(34,211,238,.28)', 'rgba(34,211,238,0)');
          }
        },
        {
          label: 'Target',
          data: data.target,
          borderColor: '#8b5cf6',
          borderWidth: 2,
          borderDash: [5, 5],
          tension: 0.4,
          pointRadius: 0,
          pointHoverRadius: 4,
          fill: false
        }
      ]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      interaction: { mode: 'index', intersect: false },
      plugins: {
        legend: { display: false },
        tooltip: {
          backgroundColor: '#162036', borderColor: '#2c3a58', borderWidth: 1,
          padding: 10, cornerRadius: 8, titleColor: '#e6ecf5', bodyColor: '#c3cfe2',
          callbacks: { label: (c) => `${c.dataset.label}: $${c.parsed.y.toLocaleString()}` }
        }
      },
      scales: {
        x: { grid: { display: false }, border: { display: false }, ticks: { maxRotation: 0 } },
        y: {
          grid: { color: 'rgba(31,43,69,.55)', drawTicks: false },
          border: { display: false },
          ticks: { padding: 8, callback: (v) => '$' + formatShort(v) }
        }
      }
    }
  });
}

function buildUsersChart(data) {
  const canvas = $('#usersChart');
  if (!canvas || typeof Chart === 'undefined') return;

  if (charts.users) charts.users.destroy();

  charts.users = new Chart(canvas, {
    type: 'bar',
    data: {
      labels: data.labels,
      datasets: [{
        label: 'Users',
        data: data.users,
        backgroundColor: (c) => {
          if (!c.chart.chartArea) return 'rgba(139,92,246,.5)';
          return createGradient(c.chart.ctx, c.chart.chartArea, 'rgba(139,92,246,.95)', 'rgba(34,211,238,.35)');
        },
        borderRadius: 6,
        borderSkipped: false,
        maxBarThickness: 22
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: { display: false },
        tooltip: {
          backgroundColor: '#162036', borderColor: '#2c3a58', borderWidth: 1,
          padding: 10, cornerRadius: 8, titleColor: '#e6ecf5', bodyColor: '#c3cfe2',
          callbacks: { label: (c) => `${c.parsed.y.toLocaleString()} users` }
        }
      },
      scales: {
        x: { grid: { display: false }, border: { display: false }, ticks: { maxRotation: 0 } },
        y: {
          grid: { color: 'rgba(31,43,69,.55)', drawTicks: false },
          border: { display: false },
          ticks: { padding: 8, callback: (v) => formatShort(v) }
        }
      }
    }
  });
}

function buildSparkline(id, data, color) {
  const canvas = document.getElementById(id);
  if (!canvas || typeof Chart === 'undefined') return;
  if (sparkCharts[id]) sparkCharts[id].destroy();

  sparkCharts[id] = new Chart(canvas, {
    type: 'line',
    data: {
      labels: data.map((_, i) => i),
      datasets: [{
        data,
        borderColor: color,
        borderWidth: 2,
        tension: 0.45,
        pointRadius: 0,
        fill: true,
        backgroundColor: (c) => {
          if (!c.chart.chartArea) return 'transparent';
          return createGradient(c.chart.ctx, c.chart.chartArea, color + '55', color + '00');
        }
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: { legend: { display: false }, tooltip: { enabled: false } },
      scales: { x: { display: false }, y: { display: false } },
      elements: { line: { borderCapStyle: 'round' } }
    }
  });
}

function buildSparklines(data) {
  buildSparkline('sparkRev',   data.revenue.slice(-10), '#22d3ee');
  buildSparkline('sparkUsers', data.users.slice(-10),   '#8b5cf6');
  buildSparkline('sparkConv',
    data.users.map((u, i) => Math.round(u / data.revenue[i] * 100)).slice(-10),
    '#10b981');
  buildSparkline('sparkMrr',
    data.revenue.map((v) => v * 0.15).slice(-10),
    '#f59e0b');
}

/* ============ TRANSACTIONS ============ */
function renderTransactions(list) {
  if (!els.txBody) return;

  if (list.length === 0) {
    els.tableWrap.style.display = 'none';
    els.emptyState.classList.add('show');
    els.errorState.classList.remove('show');
    return;
  }

  els.emptyState.classList.remove('show');
  els.errorState.classList.remove('show');
  els.tableWrap.style.display = '';

  els.txBody.innerHTML = list.map((t) => {
    const initials = t.name.split(' ').map((n) => n[0]).join('');
    return `
      <tr>
        <td>
          <div class="cust">
            <div class="cust-av" style="background:${t.color}">${initials}</div>
            <div>
              <div class="cust-name">${t.name}</div>
              <div class="cust-email">${t.email}</div>
            </div>
          </div>
        </td>
        <td><span style="color:${t.color};font-weight:600">${t.plan}</span></td>
        <td class="amount">$${t.amount.toLocaleString()}</td>
        <td><span class="badge-status ${t.status}">${t.status}</span></td>
        <td style="color:var(--muted)">${t.date}</td>
      </tr>
    `;
  }).join('');
}

/* ============ PERIOD ============ */
function setPeriod(period) {
  const data = PERIODS[period];
  if (!data) return;
  renderKPIs(data.kpi);
  buildRevenueChart(data);
  buildUsersChart(data);
  buildSparklines(data);
}

/* ============ UI HELPERS ============ */
function withLoading(fn, delay = 400) {
  if (!els.loading) { fn(); return; }
  els.loading.classList.add('show');
  setTimeout(() => {
    try { fn(); }
    catch (err) { console.error('withLoading error:', err); }
    finally { els.loading.classList.remove('show'); }
  }, delay);
}

let toastTimer;
function showToast(msg) {
  if (!els.toast) return;
  els.toastMsg.textContent = msg;
  els.toast.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => els.toast.classList.remove('show'), 2200);
}

function closeSidebar() {
  if (els.sidebar) els.sidebar.classList.remove('open');
  if (els.backdrop) els.backdrop.classList.remove('show');
}

/* ============ SIDEBAR COLLAPSE ============ */
function setSidebarCollapsed(collapsed, persist = true) {
  if (!els.app || !els.collapseBtn) return;

  els.app.classList.toggle('sidebar-collapsed', collapsed);
  els.collapseBtn.setAttribute('aria-label', collapsed ? 'Expand sidebar' : 'Collapse sidebar');
  els.collapseBtn.setAttribute('title', collapsed ? 'Expand sidebar' : 'Collapse sidebar');
  els.collapseBtn.setAttribute('aria-expanded', String(!collapsed));

  if (persist) {
    try {
      localStorage.setItem(SIDEBAR_KEY, collapsed ? '1' : '0');
    } catch (_) { /* private mode */ }
  }

  // Rebuild chart size setelah transisi grid selesai
  setTimeout(() => {
    if (charts.revenue) charts.revenue.resize();
    if (charts.users) charts.users.resize();
  }, 380);
}

function toggleSidebar() {
  if (MOBILE_QUERY.matches) return;
  const isCollapsed = els.app.classList.contains('sidebar-collapsed');
  setSidebarCollapsed(!isCollapsed);
}

function restoreSidebarState() {
  if (MOBILE_QUERY.matches) return;
  try {
    const saved = localStorage.getItem(SIDEBAR_KEY);
    setSidebarCollapsed(saved === '1', false);
  } catch (_) {
    setSidebarCollapsed(false, false);
  }
}

/* ============ EVENT BINDINGS ============ */
function bindEvents() {

  // ---- Period filter ----
  if (els.periodFilter) {
    els.periodFilter.addEventListener('click', (e) => {
      const btn = e.target.closest('button');
      if (!btn) return;

      $$('#periodFilter button').forEach((b) => {
        b.classList.remove('active');
        b.setAttribute('aria-selected', 'false');
      });
      btn.classList.add('active');
      btn.setAttribute('aria-selected', 'true');

      withLoading(() => {
        setPeriod(Number(btn.dataset.period));
        renderTransactions(TRANSACTIONS);
      }, 350);
    });
  }

  // ---- Search ----
  if (els.globalSearch) {
    els.globalSearch.addEventListener('input', () => {
      const q = els.globalSearch.value.trim().toLowerCase();
      if (!q) { renderTransactions(TRANSACTIONS); return; }
      const filtered = TRANSACTIONS.filter((t) =>
        t.name.toLowerCase().includes(q) ||
        t.email.toLowerCase().includes(q) ||
        t.plan.toLowerCase().includes(q) ||
        t.status.toLowerCase().includes(q)
      );
      renderTransactions(filtered);
    });
  }

  // ---- Clear search ----
  if (els.clearSearch) {
    els.clearSearch.addEventListener('click', () => {
      els.globalSearch.value = '';
      renderTransactions(TRANSACTIONS);
    });
  }

  // ---- Retry ----
  if (els.retryBtn) {
    els.retryBtn.addEventListener('click', () => {
      withLoading(() => renderTransactions(TRANSACTIONS), 500);
    });
  }

  // ---- Export CSV ----
  if (els.exportBtn) {
    els.exportBtn.addEventListener('click', () => {
      withLoading(() => {
        const rows = [
          ['Customer','Email','Plan','Amount','Status','Date'],
          ...TRANSACTIONS.map((t) => [t.name, t.email, t.plan, t.amount, t.status, t.date])
        ];
        const csv = rows.map((r) => r.map((v) => `"${v}"`).join(',')).join('\n');
        const blob = new Blob([csv], { type: 'text/csv' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'nexus-report.csv';
        a.click();
        URL.revokeObjectURL(url);
        showToast('Report exported successfully');
      }, 500);
    });
  }

  // ---- Refresh ----
  if (els.refreshBtn) {
    els.refreshBtn.addEventListener('click', () => {
      const activePeriod = $('.segmented button.active')?.dataset.period || 7;
      withLoading(() => {
        setPeriod(Number(activePeriod));
        renderTransactions(TRANSACTIONS);
        showToast('Data refreshed');
      }, 500);
    });
  }

  // ---- View all ----
  if (els.viewAllBtn) {
    els.viewAllBtn.addEventListener('click', () => showToast('Opening all transactions…'));
  }

  // ---- Sidebar nav ----
  $$('.nav-item').forEach((item) => {
    item.addEventListener('click', () => {
      $$('.nav-item').forEach((i) => {
        i.classList.remove('active');
        i.removeAttribute('aria-current');
      });
      item.classList.add('active');
      item.setAttribute('aria-current', 'page');

      const page = item.dataset.page;
      if (els.pageTitle) els.pageTitle.textContent = page;
      if (els.pageSub)   els.pageSub.textContent = PAGE_SUBTITLES[page] || '';

      closeSidebar();
      showToast(`Navigated to ${page}`);
    });
  });

  // ---- Mobile sidebar ----
  if (els.menuBtn) {
    els.menuBtn.addEventListener('click', () => {
      els.sidebar.classList.toggle('open');
      els.backdrop.classList.toggle('show');
    });
  }
  if (els.backdrop) els.backdrop.addEventListener('click', closeSidebar);

  // ---- Collapse btn ----
  if (els.collapseBtn) {
    els.collapseBtn.addEventListener('click', toggleSidebar);
  }

  // ---- Ctrl/Cmd + B shortcut ----
  document.addEventListener('keydown', (e) => {
    if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'b') {
      e.preventDefault();
      toggleSidebar();
    }
  });

  // ---- Mobile breakpoint ----
  MOBILE_QUERY.addEventListener('change', (e) => {
    if (e.matches) {
      els.app.classList.remove('sidebar-collapsed');
      closeSidebar();
    } else {
      restoreSidebarState();
    }
  });

  // ---- data-action buttons ----
  document.addEventListener('click', (e) => {
    const action = e.target.closest('[data-action]')?.dataset.action;
    if (action === 'upgrade')   showToast('Upgrade flow opened');
    if (action === 'ai-report') showToast('Opening full AI report…');
  });
}

/* ============ INIT ============ */
function init() {
  cacheDom();

  // Guard: pastikan elemen penting ada
  if (!els.loading) {
    console.error('[Nexus] #loading tidak ditemukan di DOM!');
    return;
  }

  els.loading.classList.add('show');

  // Beri delay 300ms agar spinner terlihat (opsional)
  setTimeout(() => {
    try {
      if (typeof Chart === 'undefined') {
        console.warn('[Nexus] Chart.js tidak terdeteksi. Grafik dilewati.');
        showToast('Chart library gagal dimuat');
      } else {
        Chart.defaults.color = '#8494b0';
        Chart.defaults.font.family = "Inter, -apple-system, 'Segoe UI', sans-serif";
        Chart.defaults.font.size = 11;
      }

      restoreSidebarState();
      setPeriod(7);
      renderTransactions(TRANSACTIONS);
      bindEvents();

      console.log('[Nexus] ✅ Dashboard siap.');
    } catch (err) {
      console.error('[Nexus] Init error:', err);
      showToast('Terjadi kesalahan saat memuat dashboard');
    } finally {
      els.loading.classList.remove('show');
    }
  }, 300);
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}