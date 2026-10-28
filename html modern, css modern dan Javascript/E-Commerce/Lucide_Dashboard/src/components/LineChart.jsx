export default function LineChart({
  primary, secondary, height = 240, primaryColor = '#7c5cff', secondaryColor = '#22d3ee'
}) {
  const W = 720, H = height, pad = 24;
  const all = [...primary, ...(secondary || [])].map(d => d.value);
  const max = Math.max(...all) * 1.1;
  const min = 0;

  const px = (i, len) => pad + (i / (len - 1)) * (W - pad * 2);
  const py = (v) => H - pad - ((v - min) / (max - min)) * (H - pad * 2);

  const makePath = (data) =>
    data.map((d, i) => `${i === 0 ? 'M' : 'L'} ${px(i, data.length)} ${py(d.value)}`).join(' ');

  const makeArea = (data) =>
    `${makePath(data)} L ${px(data.length - 1, data.length)} ${H - pad} L ${pad} ${H - pad} Z`;

  return (
    <svg className="chart-svg" viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="none">
      <defs>
        <linearGradient id="areaGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={primaryColor} stopOpacity="0.28" />
          <stop offset="100%" stopColor={primaryColor} stopOpacity="0" />
        </linearGradient>
      </defs>

      {[0.25, 0.5, 0.75, 1].map((t, i) => (
        <line
          key={i}
          x1={pad} x2={W - pad}
          y1={pad + t * (H - pad * 2)}
          y2={pad + t * (H - pad * 2)}
          stroke="var(--border)"
          strokeDasharray="3 5"
        />
      ))}

      <path d={makeArea(primary)} fill="url(#areaGrad)" />
      {secondary && (
        <path d={makePath(secondary)} fill="none" stroke={secondaryColor}
          strokeWidth="2" strokeDasharray="5 4" opacity="0.7" />
      )}
      <path d={makePath(primary)} fill="none" stroke={primaryColor} strokeWidth="2.5" strokeLinecap="round" />

      {primary.map((d, i) => (
        <circle key={i} cx={px(i, primary.length)} cy={py(d.value)} r="3.5"
          fill="var(--surface)" stroke={primaryColor} strokeWidth="2">
          <title>{d.label}: {d.value.toLocaleString()}</title>
        </circle>
      ))}

      {primary.map((d, i) => (
        <text
          key={d.label} x={px(i, primary.length)} y={H - 4}
          fontSize="10" fill="var(--text-dim)" textAnchor="middle"
        >{d.label}</text>
      ))}
    </svg>
  );
}