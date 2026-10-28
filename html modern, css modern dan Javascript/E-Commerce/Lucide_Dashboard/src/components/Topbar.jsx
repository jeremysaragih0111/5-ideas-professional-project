import { Search, Bell, Sun, Moon, Menu, Plus } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

export default function Topbar({ onMenu, onOpenModal, search, setSearch }) {
  const { theme, toggle } = useTheme();

  return (
    <header className="topbar">
      <button className="icon-btn menu-btn" onClick={onMenu}><Menu size={18} /></button>

      <div className="search">
        <Search size={16} color="var(--text-dim)" />
        <input
          placeholder="Cari customer, page, atau report..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <div className="topbar-actions">
        <button className="icon-btn" onClick={onOpenModal} title="Tambah report">
          <Plus size={18} />
        </button>
        <button className="icon-btn" onClick={toggle} title="Ganti tema">
          {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
        </button>
        <button className="icon-btn">
          <Bell size={18} />
          <span className="dot" />
        </button>
        <div className="avatar" title="Jeremy">J</div>
      </div>
    </header>
  );
}