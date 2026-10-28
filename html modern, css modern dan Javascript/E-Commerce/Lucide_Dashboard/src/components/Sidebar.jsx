import { LayoutDashboard, BarChart3, Users, Settings, Zap, X } from 'lucide-react';

const navItems = [
  { id: 'dashboard', label: 'Dashboard', icon: <LayoutDashboard size={18} /> },
  { id: 'analytics', label: 'Analytics', icon: <BarChart3 size={18} /> },
  { id: 'customers', label: 'Customers', icon: <Users size={18} />, badge: '12' },
  { id: 'settings', label: 'Settings', icon: <Settings size={18} /> },
];

export default function Sidebar({ page, onNavigate, open, onClose }) {
  return (
    <>
      <div className={`sidebar-overlay ${open ? 'open' : ''}`} onClick={onClose} />
      <aside className={`sidebar ${open ? 'open' : ''}`}>
        <div className="brand">
          <div className="brand-logo">N</div>
          <div>
            <div className="brand-name">Lucide</div>
            <div className="brand-tag">Analytics</div>
          </div>
        </div>

        <div className="nav-group-label">Menu</div>
        {navItems.map(item => (
          <button
            key={item.id}
            className={`nav-item ${page === item.id ? 'active' : ''}`}
            onClick={() => { onNavigate(item.id); onClose?.(); }}
          >
            <span className="nav-icon">{item.icon}</span>
            {item.label}
            {item.badge && <span className="nav-badge">{item.badge}</span>}
          </button>
        ))}

        <div className="sidebar-footer">
          <h4>⚡ Upgrade to Business</h4>
          <p>Unlock advanced analytics & unlimited seats.</p>
          <button className="upgrade-btn">Upgrade Now</button>
        </div>
      </aside>
    </>
  );
}