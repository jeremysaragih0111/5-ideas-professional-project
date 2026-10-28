import { useState, useMemo } from 'react';
import { users } from '../data/users';
import Table from '../components/Table';
import { formatCurrency, formatDate } from '../utils/format';

const STATUSES = ['Semua', 'active', 'trial', 'churned'];

export default function Customers({ search }) {
  const [status, setStatus] = useState('Semua');

  const filtered = useMemo(() => users.filter(u => {
    const matchSearch = !search || (
      u.name.toLowerCase().includes(search.toLowerCase()) ||
      u.email.toLowerCase().includes(search.toLowerCase())
    );
    const matchStatus = status === 'Semua' || u.status === status;
    return matchSearch && matchStatus;
  }), [search, status]);

  const totalMrr = users.reduce((s, u) => s + u.mrr, 0);

  return (
    <>
      <div className="page-header">
        <h1>Customers</h1>
        <p>{users.length} customer terdaftar · Total MRR {formatCurrency(totalMrr)}</p>
      </div>

      <div className="filter-bar">
        {STATUSES.map(s => (
          <button
            key={s}
            className={`filter-pill ${status === s ? 'active' : ''}`}
            onClick={() => setStatus(s)}
          >
            {s === 'Semua' ? 'Semua' : s.charAt(0).toUpperCase() + s.slice(1)}
          </button>
        ))}
      </div>

      <div className="card">
        <Table
          columns={[
            { key: 'name', label: 'Customer', primary: true },
            { key: 'email', label: 'Email' },
            { key: 'plan', label: 'Plan' },
            { key: 'status', label: 'Status' },
            { key: 'mrr', label: 'MRR' },
            { key: 'joined', label: 'Joined' },
          ]}
          rows={filtered}
          renderCell={(r, k) => {
            if (k === 'status') return <span className={`status-pill ${r.status}`}>{r.status}</span>;
            if (k === 'mrr') return formatCurrency(r.mrr);
            if (k === 'joined') return formatDate(r.joined);
            return r[k];
          }}
        />
      </div>
    </>
  );
}