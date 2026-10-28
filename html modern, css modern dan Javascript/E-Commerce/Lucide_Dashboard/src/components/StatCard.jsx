export default function StatCard({ icon, label, value, change, period, accent, delay = 0 }) {
  const positive = change >= 0;
  return (
    <div className="card stat-card" style={{ animationDelay: `${delay}ms` }}>
      <div
        className="stat-icon"
        style={{ background: `${accent}20`, color: accent }}
      >
        {icon}
      </div>
      <div className="stat-label">{label}</div>
      <div className="stat-value">{value}</div>
      <div className="stat-footer">
        <span className={`change ${positive ? 'up' : 'down'}`}>
          {positive ? '▲' : '▼'} {Math.abs(change)}%
        </span>
        <span className="period">{period}</span>
      </div>
    </div>
  );
}