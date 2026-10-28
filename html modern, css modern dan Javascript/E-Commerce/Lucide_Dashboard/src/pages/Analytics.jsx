import { useState } from 'react';
import { revenueSeries, secondarySeries } from '../data/revenue';
import { trafficSources, deviceUsage, topPages } from '../data/traffic';
import LineChart from '../components/LineChart';
import BarChart from '../components/BarChart';
import DonutChart from '../components/DonutChart';
import Table from '../components/Table';
import { formatNumber } from '../utils/format';

const RANGES = ['7 hari', '30 hari', '90 hari', '1 tahun'];

export default function Analytics() {
  const [range, setRange] = useState('1 tahun');

  return (
    <>
      <div className="page-header">
        <h1>Analytics</h1>
        <p>Analisis mendalam performa produk dan traffic.</p>
      </div>

      <div className="filter-bar">
        {RANGES.map(r => (
          <button
            key={r}
            className={`filter-pill ${range === r ? 'active' : ''}`}
            onClick={() => setRange(r)}
          >
            {r}
          </button>
        ))}
      </div>

      <div className="grid grid-2" style={{ marginBottom: 20 }}>
        <div className="card">
          <div className="card-header">
            <div className="card-title">Revenue Trend</div>
            <span className="chip up">Filter: {range}</span>
          </div>
          <LineChart primary={revenueSeries} secondary={secondarySeries} height={260} />
        </div>
        <div className="card">
          <div className="card-header">
            <div className="card-title">Distribusi Device</div>
          </div>
          <DonutChart data={deviceUsage} />
        </div>
      </div>

      <div className="grid grid-2">
        <div className="card">
          <div className="card-header"><div className="card-title">Top Pages</div></div>
          <Table
            columns={[
              { key: 'path', label: 'Path', primary: true },
              { key: 'views', label: 'Views' },
              { key: 'avgTime', label: 'Avg. Time' },
            ]}
            rows={topPages.map((p, i) => ({ ...p, id: i }))}
            renderCell={(r, k) =>
              k === 'views' ? formatNumber(r.views) : r[k]
            }
          />
        </div>
        <div className="card">
          <div className="card-header"><div className="card-title">Traffic per Source</div></div>
          <BarChart data={trafficSources.map(t => ({ label: t.label, value: t.value }))} color="#22d3ee" height={240} />
        </div>
      </div>
    </>
  );
}