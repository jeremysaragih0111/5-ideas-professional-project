export const formatCurrency = (n, opts = {}) =>
  new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0, ...opts }).format(n);

export const formatNumber = (n) => new Intl.NumberFormat('en-US').format(n);

export const formatCompact = (n) =>
  new Intl.NumberFormat('en-US', { notation: 'compact', maximumFractionDigits: 1 }).format(n);

export const formatDate = (iso) =>
  new Date(iso).toLocaleDateString('id-ID', { day: '2-digit', month: 'short', year: 'numeric' });

export const initials = (name) =>
  name.split(' ').map(w => w[0]).slice(0, 2).join('').toUpperCase();