import { useMemo, useState } from 'react';
import {
  Activity, ArrowDownRight, ArrowUpRight, Bell, CalendarDays, ChevronDown,
  ChevronLeft, ChevronRight, CircleHelp, Command, CreditCard, Download,
  Eye, FileChartColumn, Filter, Globe2, LayoutDashboard, LifeBuoy, Menu,
  MoreHorizontal, MousePointer2, Search, Settings2, ShoppingBag, Sparkles,
  Users, X, Zap
} from 'lucide-react';
import {
  Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis
} from 'recharts';

const chartSets = {
  '7 days': [
    { label: 'Mon', revenue: 8400, visitors: 2900 }, { label: 'Tue', revenue: 10200, visitors: 3400 },
    { label: 'Wed', revenue: 9100, visitors: 3150 }, { label: 'Thu', revenue: 12800, visitors: 4200 },
    { label: 'Fri', revenue: 11600, visitors: 3900 }, { label: 'Sat', revenue: 14800, visitors: 5100 },
    { label: 'Sun', revenue: 13900, visitors: 4800 }
  ],
  '30 days': [
    { label: '1–5', revenue: 7600, visitors: 2600 }, { label: '6–10', revenue: 9800, visitors: 3200 },
    { label: '11–15', revenue: 8700, visitors: 3000 }, { label: '16–20', revenue: 13200, visitors: 4400 },
    { label: '21–25', revenue: 11900, visitors: 4000 }, { label: '26–30', revenue: 15800, visitors: 5300 }
  ],
  '12 months': [
    { label: 'Jan', revenue: 6200, visitors: 2300 }, { label: 'Feb', revenue: 8100, visitors: 2700 },
    { label: 'Mar', revenue: 7900, visitors: 2900 }, { label: 'Apr', revenue: 10300, visitors: 3500 },
    { label: 'May', revenue: 9700, visitors: 3300 }, { label: 'Jun', revenue: 12600, visitors: 4100 },
    { label: 'Jul', revenue: 11900, visitors: 3900 }, { label: 'Aug', revenue: 14200, visitors: 4700 },
    { label: 'Sep', revenue: 13100, visitors: 4400 }, { label: 'Oct', revenue: 15800, visitors: 5200 },
    { label: 'Nov', revenue: 14900, visitors: 5000 }, { label: 'Dec', revenue: 17600, visitors: 5900 }
  ]
};

const sourceData = [
  { name: 'Direct', detail: 'Typed URL or bookmark', sessions: '18,426', share: 42, color: '#8b7cff', change: '+12.8%' },
  { name: 'Organic search', detail: 'Search engines', sessions: '12,890', share: 29, color: '#4fcbad', change: '+8.2%' },
  { name: 'Social media', detail: 'Social networks', sessions: '7,214', share: 17, color: '#f4b86a', change: '+4.6%' },
  { name: 'Referral', detail: 'External websites', sessions: '5,108', share: 12, color: '#6aa9ff', change: '−1.4%' }
];

const initialCampaigns = [
  { name: 'Spring launch', channel: 'Social', spend: '$4,280', conversions: '1,284', roas: '4.8x', status: 'Active', color: 'violet' },
  { name: 'Brand keywords', channel: 'Search', spend: '$2,140', conversions: '986', roas: '6.2x', status: 'Active', color: 'green' },
  { name: 'Retargeting Q3', channel: 'Display', spend: '$1,680', conversions: '412', roas: '3.1x', status: 'Paused', color: 'amber' },
  { name: 'Creator collab', channel: 'Social', spend: '$3,420', conversions: '763', roas: '4.2x', status: 'Active', color: 'blue' }
];

const navItems = [
  { label: 'Overview', icon: LayoutDashboard },
  { label: 'Audience', icon: Users },
  { label: 'Acquisition', icon: MousePointer2 },
  { label: 'Conversions', icon: Zap },
  { label: 'Revenue', icon: CreditCard }
];

function money(value) {
  return '$' + Number(value).toLocaleString('en-US');
}

function MetricCard({ icon: Icon, label, value, delta, positive, caption, color }) {
  return (
    <article className="metric-card panel">
      <div className="metric-top">
        <span className={`metric-icon ${color}`}><Icon size={18} strokeWidth={1.8} /></span>
        <button className="icon-button subtle" aria-label={`More about ${label}`}><MoreHorizontal size={18} /></button>
      </div>
      <p className="metric-label">{label}</p>
      <div className="metric-value-row"><h2>{value}</h2><span className={`delta ${positive ? 'up' : 'down'}`}>{positive ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />}{delta}</span></div>
      <p className="metric-caption">{caption}</p>
    </article>
  );
}

function App() {
  const [period, setPeriod] = useState('30 days');
  const [activeNav, setActiveNav] = useState('Overview');
  const [mobileNav, setMobileNav] = useState(false);
  const [search, setSearch] = useState('');
  const [campaignFilter, setCampaignFilter] = useState('All campaigns');
  const [noticeOpen, setNoticeOpen] = useState(false);
  const [helpOpen, setHelpOpen] = useState(false);
  const [toast, setToast] = useState('');
  const [campaigns, setCampaigns] = useState(initialCampaigns);

  const visibleCampaigns = useMemo(() => campaigns.filter((campaign) => {
    const matchesSearch = `${campaign.name} ${campaign.channel}`.toLowerCase().includes(search.toLowerCase());
    const matchesFilter = campaignFilter === 'All campaigns' || campaign.status === campaignFilter;
    return matchesSearch && matchesFilter;
  }), [campaigns, search, campaignFilter]);

  const showToast = (message) => {
    setToast(message);
    window.setTimeout(() => setToast(''), 2800);
  };

  const exportCsv = () => {
    const rows = [
      ['Campaign', 'Channel', 'Spend', 'Conversions', 'ROAS', 'Status'],
      ...visibleCampaigns.map((c) => [c.name, c.channel, c.spend, c.conversions, c.roas, c.status])
    ];
    const csv = rows.map((row) => row.map((cell) => `"${String(cell).replaceAll('"', '""')}"`).join(',')).join('\n');
    const url = URL.createObjectURL(new Blob([csv], { type: 'text/csv;charset=utf-8;' }));
    const link = document.createElement('a');
    link.href = url;
    link.download = 'nova-campaigns-demo.csv';
    link.click();
    URL.revokeObjectURL(url);
    showToast('CSV demo berhasil diekspor');
  };

  const toggleCampaignStatus = (campaignName) => {
    setCampaigns((current) => current.map((campaign) => campaign.name === campaignName
      ? { ...campaign, status: campaign.status === 'Active' ? 'Paused' : 'Active' }
      : campaign));
    showToast('Status campaign demo diperbarui');
  };

  const sectionTitle = activeNav === 'Overview' ? 'Overview' : activeNav;
  const sectionDescription = activeNav === 'Overview'
    ? 'Here’s what’s happening with your store today.'
    : `Your ${activeNav.toLowerCase()} insights at a glance.`;

  return (
    <div className="app-shell">
      {mobileNav && <button className="mobile-scrim" onClick={() => setMobileNav(false)} aria-label="Close navigation" />}
      <aside className={`sidebar ${mobileNav ? 'sidebar-open' : ''}`}>
        <div className="brand-row">
          <div className="brand-mark"><Activity size={21} strokeWidth={2.3} /></div>
          <div><span className="brand-name">nova<span>.</span></span><small>ANALYTICS</small></div>
          <button className="close-nav icon-button" onClick={() => setMobileNav(false)} aria-label="Close menu"><X size={18} /></button>
        </div>

        <div className="workspace-switcher">
          <div className="workspace-avatar">S</div>
          <div className="workspace-copy"><strong>Studio North</strong><span>Pro workspace</span></div>
          <ChevronDown size={15} />
        </div>

        <div className="nav-section-label">WORKSPACE</div>
        <nav className="main-nav" aria-label="Main navigation">
          {navItems.map(({ label, icon: Icon }) => (
            <button key={label} className={`nav-link ${activeNav === label ? 'active' : ''}`} onClick={() => { setActiveNav(label); setMobileNav(false); }}>
              <Icon size={18} strokeWidth={1.8} /><span>{label}</span>{label === 'Conversions' && <span className="nav-badge">4</span>}
            </button>
          ))}
        </nav>

        <div className="nav-section-label reports-label">SAVED REPORTS <button className="tiny-plus" onClick={() => showToast('Pembuatan report tersimpan belum dihubungkan')} aria-label="Add saved report">+</button></div>
        <nav className="main-nav">
          <button className="nav-link" onClick={() => { setActiveNav('Campaign report'); setMobileNav(false); }}><FileChartColumn size={18} /><span>Campaign report</span></button>
          <button className="nav-link" onClick={() => { setActiveNav('Sales overview'); setMobileNav(false); }}><ShoppingBag size={18} /><span>Sales overview</span></button>
        </nav>

        <div className="sidebar-bottom">
          <div className="upgrade-card">
            <div className="upgrade-icon"><Sparkles size={17} /></div>
            <strong>Unlock your growth</strong>
            <p>Get deeper insights with advanced analytics.</p>
            <button onClick={() => showToast('Upgrade flow belum terhubung ke backend')}>Explore Pro <ArrowUpRight size={14} /></button>
          </div>
          <button className="nav-link bottom-link" onClick={() => setHelpOpen(true)}><LifeBuoy size={18} /><span>Help & support</span></button>
          <button className="nav-link bottom-link" onClick={() => showToast('Pengaturan demo belum tersedia')}><Settings2 size={18} /><span>Settings</span></button>
          <div className="profile-row">
            <div className="profile-avatar">JD</div><div className="profile-copy"><strong>Jamie Davis</strong><span>Admin account</span></div><MoreHorizontal size={18} />
          </div>
        </div>
      </aside>

      <main className="main-content">
        <header className="topbar">
          <div className="breadcrumb"><button className="mobile-menu icon-button" onClick={() => setMobileNav(true)} aria-label="Open navigation"><Menu size={20} /></button><span>Workspace</span><ChevronRight size={14} /><strong>{sectionTitle}</strong></div>
          <div className="topbar-actions">
            <label className="global-search"><Search size={16} /><input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search campaigns..." aria-label="Search campaigns" /><kbd>⌘ K</kbd></label>
            <div className="popover-wrap">
              <button className={`icon-button notification-button ${noticeOpen ? 'selected' : ''}`} onClick={() => setNoticeOpen(!noticeOpen)} aria-label="Notifications"><Bell size={18} /><i /></button>
              {noticeOpen && <div className="floating-popover notification-popover"><strong>Notifications</strong><p><span className="notice-dot" /> Revenue is up 12.8% compared with last period.</p><p><span className="notice-dot purple" /> Your weekly report is ready to review.</p><button onClick={() => { setNoticeOpen(false); showToast('Semua notifikasi demo telah dibaca'); }}>Mark all as read</button></div>}
            </div>
            <button className="help-button" onClick={() => setHelpOpen(true)}><CircleHelp size={17} /><span>Help center</span></button>
          </div>
        </header>

        <div className="page-content">
          <section className="page-heading">
            <div><div className="eyebrow"><span className="live-dot" /> YOUR BUSINESS AT A GLANCE</div><h1>{sectionTitle} <span className="heading-spark">✳</span></h1><p>{sectionDescription}</p></div>
            <div className="heading-actions">
              <button className="button button-secondary" onClick={() => showToast('Date picker demo: gunakan pilihan periode di samping')}><CalendarDays size={16} /> Oct 01 – Oct 30, 2025 <ChevronDown size={14} /></button>
              <button className="button button-primary" onClick={exportCsv}><Download size={16} /> Export report</button>
            </div>
          </section>

          <section className="metrics-grid" aria-label="Key performance indicators">
            <MetricCard icon={Globe2} label="Total visitors" value="48,294" delta="12.8%" positive caption="vs. previous period" color="purple" />
            <MetricCard icon={Eye} label="Page views" value="126,842" delta="8.4%" positive caption="vs. previous period" color="blue" />
            <MetricCard icon={CreditCard} label="Total revenue" value="$24,568" delta="14.2%" positive caption="vs. previous period" color="green" />
            <MetricCard icon={MousePointer2} label="Conversion rate" value="3.62%" delta="2.1%" positive={false} caption="vs. previous period" color="orange" />
          </section>

          <section className="analytics-grid">
            <article className="panel revenue-panel">
              <div className="panel-heading">
                <div><div className="panel-title-row"><h2>Revenue overview</h2><span className="info-mark" title="Illustrative demo data">i</span></div><p>Track your revenue performance over time</p></div>
                <div className="period-tabs" role="group" aria-label="Chart time period">
                  {['7 days', '30 days', '12 months'].map((option) => <button key={option} className={period === option ? 'selected' : ''} onClick={() => setPeriod(option)}>{option}</button>)}
                </div>
              </div>
              <div className="chart-summary"><strong>$24,568.00</strong><span className="delta up"><ArrowUpRight size={14} /> 14.2%</span><span className="chart-summary-label">compared to previous period</span></div>
              <div className="chart-wrap">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={chartSets[period]} margin={{ top: 14, right: 8, left: -12, bottom: 0 }}>
                    <defs><linearGradient id="revenueFill" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#8978ff" stopOpacity={0.26} /><stop offset="95%" stopColor="#8978ff" stopOpacity={0.01} /></linearGradient></defs>
                    <CartesianGrid stroke="#292d40" strokeDasharray="3 5" vertical={false} />
                    <XAxis dataKey="label" axisLine={false} tickLine={false} tick={{ fill: '#85899d', fontSize: 11 }} dy={10} />
                    <YAxis axisLine={false} tickLine={false} tick={{ fill: '#85899d', fontSize: 11 }} tickFormatter={(v) => `$${v / 1000}k`} />
                    <Tooltip contentStyle={{ background: '#1b1f30', border: '1px solid #34384b', borderRadius: 10, color: '#f6f6fb', fontSize: 12 }} formatter={(value) => [money(value), 'Revenue']} labelStyle={{ color: '#aeb1c2', marginBottom: 4 }} />
                    <Area type="monotone" dataKey="revenue" stroke="#9a8bff" strokeWidth={2.5} fill="url(#revenueFill)" activeDot={{ r: 5, strokeWidth: 0, fill: '#b6aaff' }} />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
              <div className="chart-footer"><span><i className="legend-dot revenue-legend" /> Revenue</span><span className="chart-foot-note"><span className="mini-check">✓</span> Updated just now <span className="muted-separator">·</span> Demo data</span></div>
            </article>

            <article className="panel traffic-panel">
              <div className="panel-heading"><div><h2>Traffic sources</h2><p>Where your visitors come from</p></div><button className="icon-button subtle" onClick={() => showToast('Opsi traffic sources demo')} aria-label="Traffic source options"><MoreHorizontal size={19} /></button></div>
              <div className="traffic-total"><strong>43,638</strong><span className="delta up"><ArrowUpRight size={14} /> 9.6%</span><small>total sessions</small></div>
              <div className="traffic-bar" aria-label="Traffic source share">
                {sourceData.map((source) => <span key={source.name} style={{ width: `${source.share}%`, background: source.color }} title={`${source.name}: ${source.share}%`} />)}
              </div>
              <div className="source-list">
                {sourceData.map((source) => <div className="source-row" key={source.name}><span className="source-dot" style={{ background: source.color }} /><div className="source-name"><strong>{source.name}</strong><small>{source.detail}</small></div><div className="source-stats"><strong>{source.sessions}</strong><small>{source.share}%</small></div></div>)}
              </div>
              <button className="text-link" onClick={() => { setActiveNav('Acquisition'); showToast('Acquisition overview selected'); }}>View acquisition report <ArrowUpRight size={15} /></button>
            </article>
          </section>

          <section className="panel campaigns-panel">
            <div className="panel-heading campaign-heading">
              <div><div className="panel-title-row"><h2>Top campaigns</h2><span className="count-pill">{visibleCampaigns.length}</span></div><p>Monitor your best performing campaigns</p></div>
              <div className="table-actions">
                <label className="filter-select"><Filter size={15} /><select value={campaignFilter} onChange={(e) => setCampaignFilter(e.target.value)} aria-label="Filter campaign status"><option>All campaigns</option><option>Active</option><option>Paused</option></select><ChevronDown size={13} /></label>
                <button className="button button-secondary small-button" onClick={exportCsv}><Download size={15} /> Export</button>
              </div>
            </div>
            <div className="table-scroll"><table><thead><tr><th>CAMPAIGN NAME</th><th>CHANNEL</th><th>SPEND</th><th>CONVERSIONS</th><th>ROAS</th><th>STATUS</th><th aria-label="Actions" /></tr></thead>
              <tbody>{visibleCampaigns.map((campaign) => <tr key={campaign.name}><td><div className="campaign-name-cell"><span className={`campaign-symbol ${campaign.color}`}><Activity size={15} /></span><strong>{campaign.name}</strong></div></td><td><span className="channel-label">{campaign.channel}</span></td><td className="table-number">{campaign.spend}</td><td className="table-number">{campaign.conversions}</td><td><span className="roas-value">{campaign.roas}</span></td><td><button className={`status-pill ${campaign.status.toLowerCase()}`} onClick={() => toggleCampaignStatus(campaign.name)} title="Click to toggle demo status"><span />{campaign.status}</button></td><td><button className="icon-button row-more" onClick={() => toggleCampaignStatus(campaign.name)} aria-label={`Toggle ${campaign.name} status`}><MoreHorizontal size={18} /></button></td></tr>)}
                {visibleCampaigns.length === 0 && <tr><td colSpan="7" className="empty-state">No campaigns match your search.</td></tr>}
              </tbody></table></div>
            <div className="table-footer"><span>Showing <strong>{visibleCampaigns.length}</strong> of <strong>{campaigns.length}</strong> campaigns <span className="demo-tag">DEMO</span></span><div className="pagination"><button disabled aria-label="Previous page"><ChevronLeft size={16} /></button><button className="page-current">1</button><button onClick={() => showToast('Semua campaign demo ditampilkan pada satu halaman')} aria-label="Next page"><ChevronRight size={16} /></button></div></div>
          </section>

          <footer className="page-footer"><span>© 2025 NOVA Analytics</span><span><span className="footer-status" /> All systems operational <span className="muted-separator">·</span> Demo environment</span><button onClick={() => setHelpOpen(true)}>Documentation <ArrowUpRight size={13} /></button></footer>
        </div>
      </main>

      {helpOpen && <div className="modal-backdrop" role="presentation" onClick={() => setHelpOpen(false)}><section className="help-modal panel" role="dialog" aria-modal="true" aria-labelledby="help-title" onClick={(e) => e.stopPropagation()}><button className="icon-button modal-close" onClick={() => setHelpOpen(false)} aria-label="Close help"><X size={19} /></button><div className="help-modal-icon"><CircleHelp size={22} /></div><h2 id="help-title">How can we help?</h2><p>This is a front-end demo dashboard. Explore the time filters, search campaigns, toggle campaign statuses, and export the visible campaign data as CSV.</p><div className="help-note"><strong>Demo environment</strong><span>No account connection, backend, or live analytics data is configured.</span></div><button className="button button-primary modal-done" onClick={() => setHelpOpen(false)}>Got it</button></section></div>}
      {toast && <div className="toast-message"><span className="toast-check">✓</span>{toast}</div>}
    </div>
  );
}

export default App;
