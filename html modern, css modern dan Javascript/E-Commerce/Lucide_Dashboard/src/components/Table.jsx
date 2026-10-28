export default function Table({ columns, rows, renderCell }) {
  return (
    <div className="table-wrap">
      <table>
        <thead>
          <tr>{columns.map(c => <th key={c.key}>{c.label}</th>)}</tr>
        </thead>
        <tbody>
          {rows.length === 0 && (
            <tr>
              <td colSpan={columns.length} style={{ textAlign: 'center', padding: '40px 0', color: 'var(--text-dim)' }}>
                Tidak ada data ditemukan.
              </td>
            </tr>
          )}
          {rows.map(row => (
            <tr key={row.id}>
              {columns.map(c => (
                <td key={c.key} className={c.primary ? 'cell-primary' : ''}>
                  {renderCell(row, c.key)}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}