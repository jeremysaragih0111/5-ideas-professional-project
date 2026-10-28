import { useState, useEffect } from 'react';
import Sidebar from './components/Sidebar';
import Topbar from './components/Topbar';
import Modal from './components/Modal';
import Toast from './components/Toast';
import Dashboard from './pages/Dashboard';
import Analytics from './pages/Analytics';
import Customers from './pages/Customers';
import Settings from './pages/Settings';

export default function App() {
  const [page, setPage] = useState('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [toast, setToast] = useState(null);
  const [search, setSearch] = useState('');

  useEffect(() => {
    if (!toast) return;
    const t = setTimeout(() => setToast(null), 2800);
    return () => clearTimeout(t);
  }, [toast]);

  const renderPage = () => {
    switch (page) {
      case 'analytics': return <Analytics />;
      case 'customers': return <Customers search={search} />;
      case 'settings': return <Settings />;
      default: return <Dashboard />;
    }
  };

  return (
    <div className="app-shell">
      <Sidebar page={page} onNavigate={setPage} open={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <div className="main-content">
        <Topbar onMenu={() => setSidebarOpen(true)} onOpenModal={() => setModalOpen(true)} search={search} setSearch={setSearch} />
        <main className="page-content">{renderPage()}</main>
      </div>
      <Modal open={modalOpen} onClose={() => setModalOpen(false)}
        title="Buat Custom Report"
        description="Fitur ini adalah demo interaksi. Belum terhubung ke backend."
        actions={<>
          <button className="btn btn-ghost" onClick={() => setModalOpen(false)}>Batal</button>
          <button className="btn btn-primary" onClick={() => { setModalOpen(false); setToast('Report berhasil dibuat (demo)'); }}>Buat Report</button>
        </>} />
      {toast && <div className="toast-stack"><Toast message={toast} /></div>}
    </div>
  );
}