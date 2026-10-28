export default function DonutChart({ data, size = 180, thickness = 26 }) {
  const total = data.reduce((s, d) => s + d.value, 0);
  const r = (size - thickness) / 2;
  const c = size / 2;
  const circumference = 2 * Math.PI * r;
  let offset = 0;

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 28, flexWrap: 'wrap' }}>
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
        <g transform={`rotate(-90 ${c} ${c})`}>
          {data.map((d, i) => {
            const len = (d.value / total) * circumference;
            const seg = (
              <circle
                key={i}
                cx={c} cy={c} r={r}
                fill="none"
                stroke={d.color}
                strokeWidth={thickness}
                strokeDasharray={`${len} ${circumference - len}`}
                strokeDashoffset={-offset}
                strokeLinecap="round"
              >
                <title>{d.label}: {d.value}%</title>
              </circle>
            );
            offset += len;
            return seg;
          })}
        </g>
        <text x={c} y={c - 4} textAnchor="middle" fontSize="22" fontWeight="700" fill="var(--text)">
          {total}%
        </text>
        <text x={c} y={c + 16} textAnchor="middle" fontSize="10" fill="var(--text-dim)">
          TOTAL
        </text>
      </svg>
      <div className="legend" style={{ flexDirection: 'column', gap: 10, marginTop: 0 }}>
        {data.map(d => (
          <div key={d.label} className="legend-item">
            <span className="legend-dot" style={{ background: d.color }} />
            {d.label} — <b style={{ color: 'var(--text)' }}>{d.value}%</b>
          </div>
        ))}
      </div>
    </div>
  );
}