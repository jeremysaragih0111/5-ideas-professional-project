export default function BarChart({ data, height = 220, color = '#7c5cff' }) {
  const W = 720, H = height, pad = 24;
  const max = Math.max(...data.map(d => d.value)) * 1.15;
  const bw = (W - pad * 2) / data.length * 0.55;
  const gap = (W - pad * 2) / data.length;

  return (
    <svg className="chart-svg" viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="none">
      <defs>
        <linearGradient id="barGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={color} />
          <stop offset="100%" stopColor={color} stopOpacity="0.35" />
        </linearGradient>
      </defs>

      {[0.25, 0.5, 0.75, 1].map((t, i) => (
        <line key={i} x1={pad} x2={W - pad}
          y1={pad + t * (H - pad * 2)} y2={pad + t * (H - pad * 2)}
          stroke="var(--border)" strokeDasharray="3 5" />
      ))}

      {data.map((d, i) => {
        const bh = (d.value / max) * (H - pad * 2);
        const x = pad + i * gap + (gap - bw) / 2;
        const y = H - pad - bh;
        return (
          <g key={i}>
            <rect x={x} y={y} width={bw} height={bh} rx="6" fill="url(#barGrad)">
              <title>{d.label}: {d.value.toLocaleString()}</title>
            </rect>
            <text x={x + bw / 2} y={H - 4} fontSize="10" fill="var(--text-dim)" textAnchor="middle">
              {d.label}
            </text>
          </g>
        );
      })}
    </svg>
  );
}