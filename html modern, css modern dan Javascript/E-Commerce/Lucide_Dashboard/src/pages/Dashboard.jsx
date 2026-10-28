import { useMemo } from 'react';
import StatCard from '../components/StatCard';
import LineChart from '../components/LineChart';
import BarChart from '../components/BarChart';
import DonutChart from '../components/DonutChart';
import ActivityFeed from '../components/ActivityFeed';
import { revenueSeries, secondarySeries } from '../data/revenue';
import { userGrowth } from '../data/users';
import { trafficSources } from '../data/traffic';
import { activity } from '../data/activity';
import { formatCurrency, formatNumber, formatCompact } from '../utils/format';

export default function Dashboard() {
  const totalRevenue = revenueSeries.reduce((s, d) => s + d.value, 0);

  const stats = useMemo(() => [
    {
      icon: '💰', label: 'Monthly Revenue', value: formatCurrency(98400),
      change: 8.2, period: 'vs bulan lalu', accent: '#7c5cff',
    },
    {
      icon: '👥', label: 'Active Users', value: formatNumber(12480),
      change: 12.5, period: 'vs bulan lalu', accent: '#22d3ee',
    },
    {
      icon: '⚡', label: 'Conversion Rate', value: '4.82%',
      change: 2.1, period: 'vs bulan lalu', accent: '#34d399',
    },
    {
      icon: '📉', label: 'Churn Rate', value: '1.34%',
      change: -0.4, period: 'vs bulan lalu', accent: '#fb7185',
    },
  ], []);

  return (
    <>
      <div className="page-header">
        <h1>Selamat datang, Boss Jeremy 👋</h1>
        <p>Ringkasan performa bisnis Nimbus Analytics bulan ini.</p>
      </div>

      <div className="grid grid-4" style={{ marginBottom: 20 }}>
        {stats.map((s, i) => (
          <StatCard key={s.label} {...s} delay={i * 60} />
        ))}
      </div>

      <div className="grid grid-2-1" style={{ marginBottom: 20 }}>
        <div className="card">
          <div className="card-header">
            <div>
              <div className="card-title">Pertumbuhan Revenue</div>
              <div className="card-sub">Total {formatCompact(totalRevenue)} di 2025</div>
            </div>
            <span className="chip up">+18.4% YoY</span>
          </div>
          <LineChart primary={revenueSeries} secondary={secondarySeries} />
          <div className="legend">
            <div className="legend-item"><span className="legend-dot" style={{ background: '#7c5cff' }} />Gross Revenue</div>
            <div className="legend-item"><span className="legend-dot" style={{ background: '#22d3ee' }} />Recurring (MRR)</div>
          </div>
        </div>

        <div className="card">
          <div className="card-header">
            <div className="card-title">Sumber Traffic</div>
            <span className="chip up">Live</span>
          </div>
          <DonutChart data={trafficSources} />
        </div>
      </div>

      <div className="grid grid-2-1">
        <div className="card">
          <div className="card-header">
            <div>
              <div className="card-title">User Growth</div>
              <div className="card-sub">8 minggu terakhir</div>
            </div>
            <span className="chip up">▲ 34.2%</span>
          </div>
          <BarChart data={userGrowth} />
        </div>

        <div className="card">
          <div className="card-header">
            <div className="card-title">Aktivitas Terbaru</div>
          </div>
          <ActivityFeed items={activity} />
        </div>
      </div>
    </>
  );
}