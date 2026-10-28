Cara Menjalankan

Buat 3 folder: css/, js/ .

Simpan ketiga file sesuai struktur.

Buka index.html di browser (tidak perlu server karena Chart.js via CDN).



Penjelasan HTML Modern , css dan Javascript

# 📘 Dokumentasi Lengkap — Nexus Analytics SaaS Dashboard

## 📁 Struktur File Final

Nexus Analytics - Saas Analytics Dashboard/
├── Nexus Analytics - Saas Analytics Dashboard.html    ← Halaman utama
├── css/
│   └── Nexus Analytics - Saas Analytics Dashboard.css ← Styling
└── js/
    ├── Nexus Analytics - Saas Analytics Dashboard.js  ← Logic
    └── Chart.min.js                                   ← Library Chart.js v4.4.1
```


# 📄 FILE 1: `Nexus Analytics - Saas Analytics Dashboard.html`

## 🗂️ Skema Bagian HTML

```
HTML Document
│
├── 1. <head> — Metadata & Resource Loading
│   ├── 1.1 Meta Tags (charset, viewport, description, theme-color)
│   ├── 1.2 Title
│   ├── 1.3 Preconnect & Google Fonts
│   ├── 1.4 Stylesheet Link
│   └── 1.5 Script Loaders (defer)
│
├── 2. <body> — Struktur Utama
│   │
│   ├── 3. .app — Grid Layout Container
│   │   │
│   │   ├── 4. <aside class="sidebar"> — Sidebar Navigasi
│   │   │   ├── 4.1 .brand — Logo + Tombol Collapse
│   │   │   ├── 4.2 <nav class="nav"> — Menu Item
│   │   │   └── 4.3 .sidebar-footer — Upgrade Card
│   │   │
│   │   ├── 5. .backdrop — Overlay Mobile
│   │   │
│   │   └── 6. <main class="main"> — Konten Utama
│   │       ├── 6.1 .topbar — Header Konten
│   │       ├── 6.2 .filters — Filter Periode
│   │       ├── 6.3 .kpi-grid — 4 KPI Cards
│   │       ├── 6.4 .charts-row — 2 Grafik
│   │       └── 6.5 .bottom-row — Tabel + AI Panel
│   │
│   ├── 7. #loading — Loading Overlay
│   └── 8. #toast — Notifikasi
```

## 📖 Penjelasan Kode HTML

### **1. `<head>` — Metadata & Resource Loading**

```html
<!DOCTYPE html>
<html lang="en">
```
- **`<!DOCTYPE html>`** → Deklarasi HTML5, memaksa browser menggunakan *standards mode* (bukan quirks mode).
- **`lang="en"`** → Menentukan bahasa halaman untuk screen reader dan SEO.

```html
<meta charset="UTF-8" />
```
- **UTF-8** → Encoding karakter universal (mendukung emoji 🔍⚠️ dan simbol ▲▼).

```html
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
```
- **Wajib untuk responsive** → Tanpa ini, mobile akan render halaman di 980px virtual lalu zoom-out.

```html
<meta name="description" content="Nexus Analytics — Premium SaaS analytics dashboard" />
```
- **SEO meta description** → Muncul di hasil pencarian Google.

```html
<meta name="theme-color" content="#0a0e1a" />
```
- **Mobile address bar color** → Di Android Chrome, address bar akan menyatu dengan dark theme.

```html
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
```
- **`preconnect`** → Browser membuka koneksi TCP/TLS ke Google Fonts **lebih awal** (~100ms lebih cepat) sebelum font dibutuhkan.
- **`crossorigin`** → Wajib untuk domain font karena request cross-origin.

```html
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap" rel="stylesheet" />
```
- **`family=Inter:wght@400;500;600;700;800`** → Load 5 weight Inter (regular → extrabold) dalam 1 request.
- **`&display=swap`** → Font swap: tampilkan fallback font dulu, lalu replace saat Inter siap (mencegah FOIT — Flash of Invisible Text).

```html
<link rel="stylesheet" href="css/Nexus Analytics - Saas Analytics Dashboard.css" />
```
- **Path relatif** ke folder `css/` — harus sesuai struktur folder.

```html
<script src="js/Chart.min.js" defer></script>
<script src="js/Nexus Analytics - Saas Analytics Dashboard.js" defer></script>
```
- **`defer`** → Script diunduh **paralel** saat HTML di-parse, tapi **dieksekusi berurutan** setelah DOM selesai. Ini menjamin:
  1. Chart.js sudah tersedia sebelum `app.js` jalan
  2. `app.js` bisa query DOM tanpa `DOMContentLoaded` wrapper
- **Hanya satu sumber Chart.js** → tidak ada konflik antara CDN dan file lokal.

### **2. `<body>` — Struktur Utama**

```html
<div class="app">
```
- **Grid container** 2 kolom: `250px sidebar + 1fr main`. Class `.sidebar-collapsed` di elemen ini mengontrol lebar sidebar via CSS variable.

### **3. `<aside class="sidebar">` — Sidebar Navigasi**

```html
<aside class="sidebar" id="sidebar" aria-label="Main navigation">
```
- **`<aside>`** → Elemen semantic untuk konten **samping** (komplemen). Screen reader mengumumkan "complementary region".
- **`aria-label="Main navigation"`** → Memberi nama region agar saat keyboard navigation, pengguna tahu ini navigasi utama.

#### **4.1 `.brand` — Logo + Tombol Collapse**

```html
<div class="logo" aria-hidden="true">N</div>
```
- **`aria-hidden="true"`** → Logo huruf "N" adalah **dekoratif**. Screen reader tidak perlu membacakannya (nama brand sudah ada di `<h1>Nexus</h1>`).

```html
<button class="collapse-btn" id="collapseBtn" type="button"
        aria-label="Collapse sidebar" aria-expanded="true" title="Collapse sidebar (Ctrl+B)">
```
- **`type="button"`** → Mencegah default `submit` jika nanti dibungkus `<form>`.
- **`aria-expanded="true"`** → Mengumumkan state: sidebar sedang expanded. JS akan toggle ke `false` saat collapsed.
- **`title`** → Tooltip native browser saat hover.
- **`<svg><path d="M15 6l-6 6 6 6"/></svg>`** → Chevron kiri `<`. Saat collapsed, CSS merotasi 180° jadi `>`.

#### **4.2 `<nav class="nav">` — Menu Item**

```html
<button class="nav-item active" data-page="Overview" aria-current="page">
```
- **`data-page`** → Custom attribute untuk JS. HTML tetap bersih dari `onclick`.
- **`aria-current="page"`** → Memberitahu screen reader halaman mana yang aktif saat ini.
- **`.active`** → Styling visual (background gradient + indikator kiri).

```html
<span class="nav-text">Overview</span>
<span class="tooltip">Overview</span>
```
- **`.nav-text`** → Dibungkus `<span>` agar bisa disembunyikan saat collapsed (`opacity: 0; width: 0`) tanpa merusak layout.
- **`.tooltip`** → Muncul saat hover (kondisi collapsed). Menggunakan CSS `::before` untuk panah.

```html
<span class="badge">128</span>
```
- **Badge notifikasi** → Angka kecil (mis. 128 transaksi) di sisi kanan. `margin-left: auto` mendorongnya ke kanan.

```html
<p class="nav-label nav-label--spaced">Workspace</p>
```
- **`.nav-label`** → Label grup navigasi ("Menu", "Workspace"). Huruf kapital dengan `text-transform: uppercase`.
- **`.nav-label--spaced`** → Modifier BEM untuk margin atas tambahan.

#### **4.3 `.sidebar-footer` — Upgrade Card**

```html
<div class="upgrade">
  <strong>Upgrade to Pro</strong>
  <p>Unlock advanced forecasting...</p>
  <button type="button" data-action="upgrade">Upgrade Plan</button>
</div>
```
- **`data-action="upgrade"`** → Ditangani event delegation global di `app.js`. Menghindari listener individual.
- **`.sidebar-footer`** dengan `margin-top: auto` → Mendorongnya ke **bawah sidebar** menggunakan Flexbox.

### **5. `.backdrop` — Overlay Mobile**

```html
<div class="backdrop" id="backdrop" aria-hidden="true"></div>
```
- **Overlay gelap** (`rgba(0,0,0,.5)`) di belakang sidebar saat mode mobile.
- **`aria-hidden="true"`** → Murni dekoratif.
- Klik backdrop = `closeSidebar()` via JS.

### **6. `<main class="main">` — Konten Utama**

```html
<main class="main">
```
- **`<main>`** → Landmark semantic utama. Screen reader bisa langsung "skip to main content".

#### **6.1 `.topbar` — Header Konten**

```html
<button class="menu-btn" id="menuBtn" aria-label="Open menu" type="button">
```
- **`.menu-btn`** → Hamburger icon, **hanya tampil di mobile** (`display: none` default, `display: grid` di `@media max-width 820px`).

```html
<input type="search" id="globalSearch" placeholder="..." aria-label="Search transactions" />
```
- **`type="search"`** → Browser memberi clear button ❌ bawaan dan styling search-specific.
- **`aria-label`** → Placeholder tidak dibaca konsisten oleh screen reader, jadi beri label eksplisit.

```html
<button class="icon-btn" id="refreshBtn" title="Refresh data" aria-label="Refresh data" type="button">
```
- Tombol refresh dengan **dua label**: `title` (tooltip hover) dan `aria-label` (screen reader).

```html
<button class="avatar" title="Alex Morgan" aria-label="User menu" type="button">AM</button>
```
- **Avatar inisial** "AM" (Alex Morgan). Gradient CSS dari violet → cyan.

#### **6.2 `.filters` — Filter Periode**

```html
<div class="segmented" id="periodFilter" role="tablist">
  <button data-period="7" class="active" role="tab" aria-selected="true" type="button">7 Days</button>
  <button data-period="30" role="tab" aria-selected="false" type="button">30 Days</button>
  <button data-period="365" role="tab" aria-selected="false" type="button">12 Months</button>
</div>
```
- **`role="tablist"` / `role="tab"`** → Pola ARIA untuk tab interface. Screen reader mengumumkan "tab 1 of 3".
- **`aria-selected`** → Sinkron dengan `.active` class.
- **`data-period`** → Nilai numerik (7, 30, 365) dipetakan ke `PERIODS` object di JS.

```html
<button class="btn" id="exportBtn" type="button">
  <svg viewBox="0 0 24 24" aria-hidden="true">...</svg>
  Export Report
</button>
```
- Icon download + text. Icon `aria-hidden` karena ada label teks.

#### **6.3 `.kpi-grid` — 4 KPI Cards**

```html
<article class="kpi">
```
- **`<article>`** → Elemen **mandiri** yang bisa berdiri sendiri (seperti kartu berita). Lebih semantic dari `<div>`.

```html
<div class="kpi-icon cyan">
  <svg viewBox="0 0 24 24" aria-hidden="true">...</svg>
</div>
```
- **`.kpi-icon.cyan`** → Modifier BEM untuk warna ikon (cyan, violet, green, amber).

```html
<span class="kpi-trend up" id="revTrend">▲ 12.4%</span>
```
- **Simbol ▲▼** → Unicode arrows untuk indikator naik/turun.
- **`.up` vs `.down`** → CSS beda warna hijau/merah.
- **`id="revTrend"`** → Target manipulasi JS saat ganti periode.

```html
<p class="kpi-value" id="revValue">$284,920</p>
```
- **`<p>` bukan `<div>`** → Ini teks paragrafifikasi (value metrik), jadi `<p>` tepat secara semantic.

```html
<canvas class="kpi-spark" id="sparkRev" aria-hidden="true"></canvas>
```
- **`<canvas>`** → Canvas Chart.js untuk sparkline mini (100×40px).
- **`aria-hidden="true"`** → Sparkline dekoratif, tidak perlu dibaca screen reader.

**⚠️ PENTING — Perhatikan tiap `id`:**
| ID | Fungsi |
|----|--------|
| `revValue`, `revSub`, `revTrend` | KPI Revenue |
| `usersValue`, `usersSub`, `usersTrend` | KPI Users |
| `convValue`, `convSub`, `convTrend` | KPI Conversion |
| `mrrValue`, `mrrSub`, `mrrTrend` | KPI MRR |
| `sparkRev`, `sparkUsers`, `sparkConv`, `sparkMrr` | Sparkline canvas |

#### **6.4 `.charts-row` — 2 Grafik**

```html
<canvas id="revenueChart" role="img" aria-label="Revenue growth chart"></canvas>
```
- **`role="img"`** → Canvas diperlakukan sebagai gambar.
- **`aria-label`** → Deskripsi alternatif untuk screen reader.
- **`id="revenueChart"`** → Target dari `buildRevenueChart()`.

```html
<div class="legend">
  <span><i class="legend-dot legend-dot--cyan"></i>Revenue</span>
  <span><i class="legend-dot legend-dot--violet"></i>Target</span>
</div>
```
- **`<i>` sebagai dot** → Elemen inline minimalis, diberi `width: 9px; height: 9px; border-radius: 3px` di CSS.

#### **6.5 `.bottom-row` — Tabel + AI Panel**

```html
<table>
  <thead>
    <tr>
      <th scope="col">Customer</th>
      <th scope="col">Plan</th>
      ...
    </tr>
  </thead>
  <tbody id="txBody"></tbody>
</table>
```
- **`scope="col"`** → Memberitahu screen reader bahwa `<th>` adalah header **kolom** (bukan baris).
- **`<tbody>` kosong** → Diisi JavaScript via `innerHTML = list.map(...).join('')`.

```html
<div class="state" id="emptyState">
  <div class="emoji">🔍</div>
  <h4>No transactions found</h4>
  <p>...</p>
  <button class="btn primary" id="clearSearch" type="button">Clear Search</button>
</div>
```
- **Empty state** → Default `display: none`, di-show via `.show` class saat hasil filter kosong.
- **Parallel dengan `#errorState`** → Dua state berbeda untuk skenario berbeda.

```html
<aside class="ai-panel" aria-label="AI Insights">
```
- **`<aside>`** (lagi) → AI panel adalah konten sampingan dari tabel transaksi.

```html
<span class="ico pos">▲</span>
```
- **`.pos`, `.warn`, `.info`** → Modifier untuk tipe insight (positif/warning/info).

### **7. `#loading` — Loading Overlay**

```html
<div class="loading-overlay" id="loading" aria-hidden="true">
  <div class="spinner"></div>
</div>
```
- **Default `display: none`**, di-show saat `init()` dengan `.show` class.
- **`backdrop-filter: blur(4px)`** di CSS → Efek frosted glass modern.
- **`.spinner`** → Border berputar via `@keyframes spin`.

### **8. `#toast` — Notifikasi**

```html
<div class="toast" id="toast" role="status" aria-live="polite">
  <span class="dot"></span>
  <span id="toastMsg">Done</span>
</div>
```
- **`role="status"`** → Landmark ARIA untuk pesan status.
- **`aria-live="polite"`** → Screen reader mengumumkan perubahan text **saat idle** (tidak interrupt). Bandingkan `assertive` yang interrupt.
- Default: `transform: translateY(120%)` → Slide up saat `.show` ditambahkan.
```


# 🎨 FILE 2: `Nexus Analytics - Saas Analytics Dashboard.css`

## 🗂️ Skema Bagian CSS

```
STYLESHEET (17 seksi)
│
├── 1. DESIGN TOKENS (:root)
│   ├── 1.1 Warna
│   ├── 1.2 Radius
│   ├── 1.3 Shadow
│   ├── 1.4 Motion (easing & duration)
│   └── 1.5 Layout (--sidebar-w)
│
├── 2. RESET
│   ├── 2.1 Universal box-sizing
│   ├── 2.2 Body base
│   ├── 2.3 Form element inherit
│   └── 2.4 Scrollbar
│
├── 3. LAYOUT (.app)
├── 4. SIDEBAR
│   ├── 4.1 Container
│   ├── 4.2 Brand + Collapse btn
│   ├── 4.3 Nav & item
│   ├── 4.4 Tooltip (collapsed state)
│   ├── 4.5 Collapsed overrides
│   └── 4.6 Footer / Upgrade
│
├── 5. MAIN & TOPBAR
│   ├── 5.1 Container
│   ├── 5.2 Topbar layout
│   ├── 5.3 Search
│   └── 5.4 Actions (icon, avatar)
│
├── 6. FILTERS (.segmented, .btn)
├── 7. KPI CARDS
├── 8. CARDS & CHARTS
├── 9. BOTTOM ROW
├── 10. TABLE
├── 11. AI PANEL
├── 12. STATES (empty/error)
├── 13. LOADING
├── 14. TOAST
├── 15. BACKDROP
├── 16. RESPONSIVE (3 breakpoints)
└── 17. ACCESSIBILITY
```

## 📖 Penjelasan Kode CSS

### **1. DESIGN TOKENS (`:root`)**

```css
:root {
  --bg: #0a0e1a;
  --bg-2: #0f1526;
  --panel: #121a2e;
  --panel-2: #162036;
  --border: #1f2b45;
  --border-hover: #2c3a58;

  --text: #e6ecf5;
  --muted: #8494b0;
  --muted-2: #5c6b8a;
  --table-muted: #6b7c9a;

  --cyan: #22d3ee;
  --violet: #8b5cf6;
  --green: #10b981;
  --amber: #f59e0b;
  --red: #ef4444;

  --radius-sm: 8px;
  --radius: 12px;
  --radius-lg: 14px;
  --radius-pill: 20px;

  --shadow-sm: 0 2px 8px rgba(0, 0, 0, 0.3);
  --shadow: 0 10px 30px rgba(0, 0, 0, 0.35);

  --ease: cubic-bezier(0.2, 0.8, 0.2, 1);
  --duration-fast: 0.15s;
  --duration: 0.2s;
  --duration-slow: 0.35s;

  --sidebar-w: 250px;
}
```

- **Design tokens (CSS Variables)** → Semua nilai visual terpusat. Ubah `--cyan` sekali → seluruh dashboard berubah.
- **`--ease: cubic-bezier(0.2, 0.8, 0.2, 1)`** → Custom easing yang "springy" (percepatan cepat di awal, deceleration lembut di akhir). Lebih premium dari `ease` default.
- **`--sidebar-w: 250px`** → Satu variable mengendalikan lebar sidebar. Saat collapsed, JS menambahkan class yang override ke `76px`.

### **2. RESET**

```css
*, *::before, *::after {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}
```
- **`box-sizing: border-box` pada semua elemen** → Padding dan border **termasuk** dalam width. Jadi `width: 250px` benar-benar 250px (bukan 250+padding).
- **`*::before, *::after`** → Wajib! Tanpa ini, pseudo-elements akan tetap pakai `content-box` → layout meleset.

```css
html { height: 100%; scroll-behavior: smooth; }
body { min-height: 100vh; overflow-x: hidden; }
```
- **`overflow-x: hidden`** → Mencegah scroll horizontal yang tidak diinginkan.
- **`min-height: 100vh`** → Body minimal setinggi viewport, meski konten sedikit.

```css
background:
  radial-gradient(1200px 600px at 85% -10%, rgba(139, 92, 246, 0.12), transparent 60%),
  radial-gradient(900px 500px at 0% 0%, rgba(34, 211, 238, 0.10), transparent 55%),
  var(--bg);
```
- **Multiple `radial-gradient`** → Dua glow subtle: violet di kanan atas, cyan di kiri atas.
- **Urutan penting** → Gradient paling atas dulu, warna base `--bg` di akhir (paling belakang).

```css
::-webkit-scrollbar-thumb {
  background: #243049;
  border-radius: 10px;
  border: 2px solid var(--bg);
}
```
- **Custom scrollbar** → Chrome/Edge/Safari saja. Firefox pakai `scrollbar-color` (tidak di-set karena minor).
- **`border: 2px solid var(--bg)`** → Trick untuk membuat gap visual antara thumb dan track.

### **3. LAYOUT (.app)**

```css
.app {
  display: grid;
  grid-template-columns: var(--sidebar-w) 1fr;
  min-height: 100vh;
  transition: grid-template-columns var(--duration-slow) var(--ease);
}
.app.sidebar-collapsed { --sidebar-w: 76px; }
```
- **`grid-template-columns`** → 2 kolom: sidebar + main.
- **`transition: grid-template-columns`** → Modern browser (Chrome 107+, Firefox 120+) animate perubahan nilai.
- **`.sidebar-collapsed { --sidebar-w: 76px }`** → Cukup ubah satu variable di `.app`, transisi otomatis berlaku untuk **seluruh layout grid**.

### **4. SIDEBAR**

#### **4.1 Container**

```css
.sidebar {
  position: sticky;
  top: 0;
  height: 100vh;
  overflow: visible;
  transition: padding var(--duration-slow) var(--ease), gap var(--duration-slow) var(--ease);
}
```
- **`position: sticky; top: 0`** → Tetap menempel saat scroll tanpa JS.
- **`height: 100vh`** → Selalu setinggi viewport.
- **`overflow: visible`** → Wajib agar tooltip `.nav-item` bisa "keluar" dari sidebar. Jika `hidden`, tooltip akan terpotong.

#### **4.2 Brand + Collapse Button**

```css
.collapse-btn {
  margin-left: auto;
  width: 26px;
  height: 26px;
  display: grid;
  place-items: center;
}
.collapse-btn svg { transition: transform var(--duration-slow) var(--ease); }
.app.sidebar-collapsed .collapse-btn svg { transform: rotate(180deg); }
```
- **`margin-left: auto`** → Mendorong tombol ke **ujung kanan** brand row.
- **`place-items: center`** → Cara modern center konten (2 kata, bukan 4 baris).
- **`rotate(180deg)`** → Chevron `‹` berubah jadi `›` saat collapsed.

#### **4.3 Nav Item + Active Indicator**

```css
.nav-item.active {
  color: #fff;
  background: linear-gradient(90deg,
    rgba(34, 211, 238, 0.15),
    rgba(139, 92, 246, 0.10));
}
.nav-item.active::before {
  content: '';
  position: absolute;
  left: 0;
  top: 20%;
  height: 60%;
  width: 3px;
  background: linear-gradient(var(--cyan), var(--violet));
}
```
- **Pseudo-element `::before`** → Bar indikator kiri tanpa HTML tambahan.
- **`top: 20%; height: 60%`** → Vertical centering hack: (100-60)/2 = 20%.

#### **4.4 Tooltip (Collapsed)**

```css
.tooltip {
  position: absolute;
  left: calc(100% + 14px);
  top: 50%;
  transform: translateY(-50%) translateX(-6px);
  opacity: 0;
  pointer-events: none;
  transition: opacity var(--duration) var(--ease),
              transform var(--duration) var(--ease);
}
.app.sidebar-collapsed .nav-item:hover .tooltip,
.app.sidebar-collapsed .nav-item:focus-visible .tooltip {
  opacity: 1;
  transform: translateY(-50%) translateX(0);
}
```
- **`left: calc(100% + 14px)`** → 14px di kanan item.
- **`translateY(-50%) translateX(-6px)`** → Hidden state: naik sedikit ke kiri (off-screen-ish).
- **Hover/focus-visible** → Muncul karena dua state ini. `:focus-visible` = keyboard navigation (accessibility).
- **`pointer-events: none`** → Tooltip tidak menghalangi klik meski invisible.

```css
.tooltip::before {
  content: '';
  position: absolute;
  top: 50%;
  left: -4px;
  width: 8px;
  height: 8px;
  background: var(--panel-2);
  border-left: 1px solid var(--border);
  border-bottom: 1px solid var(--border);
  transform: translateY(-50%) rotate(45deg);
}
```
- **Panah tooltip** → Kotak 8×8 yang di-rotate 45° = diamond → terlihat seperti triangle pointer.

#### **4.5 Collapsed Overrides**

```css
.app.sidebar-collapsed .brand-text {
  opacity: 0;
  width: 0;
  pointer-events: none;
}
.app.sidebar-collapsed .nav-item {
  justify-content: center;
  padding: 10px;
}
.app.sidebar-collapsed .nav-item .nav-text,
.app.sidebar-collapsed .nav-item .badge {
  opacity: 0;
  width: 0;
  pointer-events: none;
}
```
- **`opacity: 0; width: 0`** → Teks hilang dengan transisi halus (bukan `display: none` yang abrupt).
- **`justify-content: center`** → Icon tetap center saat text hilang.
- **`pointer-events: none`** → Elemen invisible tidak "menangkap" klik.

#### **4.6 Upgrade Card (collapsed → icon ⚡)**

```css
.app.sidebar-collapsed .upgrade button::before {
  content: '⚡';
  font-size: 14px;
}
.app.sidebar-collapsed .upgrade button {
  font-size: 0;
}
```
- **`font-size: 0`** → Sembunyikan text tapi **bukan** `visibility: hidden`.
- **`::before { content: '⚡' }`** → Icon pengganti. `font-size: 14px` karena parent 0.
- Trick ini membuat text hilang tapi tombol tetap accessible & clickable.

### **5. MAIN & TOPBAR**

```css
.search-wrap input:focus {
  border-color: var(--cyan);
  box-shadow: 0 0 0 3px rgba(34, 211, 238, 0.12);
}
```
- **`box-shadow` sebagai focus ring** → Trick: `0 0 0 3px` = ring solid 3px tanpa blur. Lebih rapi dari `outline`.

```css
.icon-btn .dot {
  position: absolute;
  top: 8px;
  right: 9px;
  width: 7px;
  height: 7px;
  background: var(--cyan);
  box-shadow: 0 0 0 2px var(--panel);
}
```
- **Dot notifikasi** → `box-shadow: 0 0 0 2px var(--panel)` = ring 2px berwarna panel di sekeliling dot → efek "cutout" dari background tombol.

### **6. FILTERS (.segmented)**

```css
.segmented {
  display: inline-flex;
  gap: 2px;
  padding: 4px;
  background: var(--panel);
  border-radius: 10px;
}
.segmented button.active {
  color: var(--cyan);
  background: var(--panel-2);
  box-shadow: var(--shadow-sm);
}
```
- **Segmented control** → Parent dengan background + padding, child tanpa background. Active child diberi background → efek "tombol aktif" klasik iOS/macOS.

```css
.btn.primary {
  background: linear-gradient(135deg, var(--cyan), var(--violet));
  border: none;
}
.btn.primary:hover { filter: brightness(1.08); }
```
- **`filter: brightness(1.08)`** → Hover effect **tanpa** ubah background gradient. Lebih ringan dari re-compute gradient.

### **7. KPI CARDS**

```css
.kpi {
  position: relative;
  overflow: hidden;
  transition: transform var(--duration), border-color var(--duration);
}
.kpi:hover {
  transform: translateY(-3px);
  border-color: var(--border-hover);
}
.kpi::after {
  content: '';
  position: absolute;
  top: 0; right: 0;
  width: 120px; height: 120px;
  background: radial-gradient(circle, rgba(34, 211, 238, 0.10), transparent 70%);
  border-radius: 50%;
  transform: translate(40%, -40%);
  pointer-events: none;
}
```
- **`translateY(-3px)`** → Hover "lift" effect. Bukan `margin-top: -3px` yang akan mengganggu flow.
- **`.kpi::after` radial glow** → `overflow: hidden` di parent memotongnya jadi quadrant glow di sudut kanan atas.
- **`pointer-events: none`** → Glow tidak menangkap klik.

```css
.kpi-value {
  font-variant-numeric: tabular-nums;
}
```
- **`tabular-nums`** → Angka menggunakan **lebar sama** (monospaced), jadi `$284,920` dan `$1,128,400` rata kanan.
- Bandingkan `proportional-nums` (default): angka `1` lebih sempit dari `8`.

```css
.kpi-spark {
  position: absolute;
  bottom: 0; right: 0;
  width: 100px; height: 40px;
  opacity: 0.7;
  pointer-events: none;
}
```
- **Sparkline overlay** → Menempel di sudut bawah kanan card, opacity 70% agar subtle.

### **10. TABLE**

```css
tbody tr { transition: background var(--duration-fast); }
tbody tr:hover { background: rgba(255, 255, 255, 0.025); }
```
- **`rgba(255,255,255,.025)`** → Overlay putih sangat subtle (2.5%). Bekerja di dark theme.

```css
.badge-status.paid     { color: var(--green);  background: rgba(16, 185, 129, 0.13); }
.badge-status.pending  { color: var(--amber);  background: rgba(245, 158, 11, 0.13); }
.badge-status.failed   { color: var(--red);    background: rgba(239, 68, 68, 0.13); }
.badge-status.refunded { color: var(--violet); background: rgba(139, 92, 246, 0.14); }
```
- **Color coding** → 4 status warna berbeda, masing-masing dengan **tint background 13-14%**.
- **`::before` bullet** → `content: ''; width: 5px; height: 5px; background: currentColor` → Circle kecil di kiri text.

### **11. AI PANEL**

```css
.ai-panel {
  position: relative;
  overflow: hidden;
  background: linear-gradient(160deg,
    rgba(139, 92, 246, 0.12),
    rgba(34, 211, 238, 0.05));
  border: 1px solid rgba(139, 92, 246, 0.28);
}
.ai-panel::before {
  content: '';
  position: absolute;
  top: -60px; right: -60px;
  width: 180px; height: 180px;
  background: radial-gradient(circle, rgba(139, 92, 246, 0.30), transparent 70%);
  border-radius: 50%;
}
```
- **Violet border + gradient** → Membedakan AI panel dari card biasa.
- **`.ai-orb` dengan `box-shadow: 0 0 20px rgba(139, 92, 246, 0.5)`** → Efek "glowing orb".

```css
.ai-item { animation: fadeIn 0.5s var(--ease) both; }
.ai-item:nth-child(2) { animation-delay: 0.1s; }
.ai-item:nth-child(3) { animation-delay: 0.2s; }
@keyframes fadeIn {
  from { opacity: 0; transform: translateY(8px); }
  to   { opacity: 1; transform: none; }
}
```
- **Staggered animation** → Setiap item muncul 100ms lebih lambat dari sebelumnya.
- **`both`** → Animation-fill-mode: tetap di state `from` sebelum mulai, tetap di state `to` setelah selesai.

### **13. LOADING**

```css
.loading-overlay {
  position: fixed;
  inset: 0;
  z-index: 200;
  backdrop-filter: blur(4px);
  -webkit-backdrop-filter: blur(4px);
}
.spinner {
  width: 44px;
  height: 44px;
  border: 3px solid rgba(34, 211, 238, 0.15);
  border-top-color: var(--cyan);
  border-radius: 50%;
  animation: spin 0.8s linear infinite;
}
@keyframes spin { to { transform: rotate(360deg); } }
```
- **`inset: 0`** → Shorthand `top:0; right:0; bottom:0; left:0`.
- **`backdrop-filter: blur()`** → Efek frosted glass di belakang loading overlay.
- **`-webkit-` prefix** → Untuk Safari (masih butuh prefix).
- **Spinner CSS only** → Border lingkaran dengan 1 sisi berwarna beda + rotate 360° = spinner.

### **16. RESPONSIVE — 3 Breakpoints**

```css
@media (max-width: 1150px) {
  .kpi-grid { grid-template-columns: repeat(2, 1fr); }
  .charts-row, .bottom-row { grid-template-columns: 1fr; }
}
```
- **Tablet landscape** → KPI jadi 2 kolom, chart/table stack vertikal.

```css
@media (max-width: 820px) {
  .app { grid-template-columns: 1fr !important; }
  .sidebar {
    position: fixed;
    transform: translateX(-100%);
  }
  .sidebar.open { transform: translateX(0); }
  .menu-btn { display: grid; }
}
```
- **Mobile mode** → Sidebar jadi `position: fixed` slide-in dari kiri.
- **`!important`** pada `grid-template-columns` → Memaksa override variable `--sidebar-w` yang bisa diubah `.sidebar-collapsed`.

```css
@media (max-width: 820px) {
  .app.sidebar-collapsed .brand-text,
  .app.sidebar-collapsed .nav-label,
  .app.sidebar-collapsed .nav-item .nav-text,
  .app.sidebar-collapsed .nav-item .badge,
  .app.sidebar-collapsed .upgrade strong,
  .app.sidebar-collapsed .upgrade p {
    opacity: 1 !important;
    width: auto !important;
    pointer-events: auto !important;
  }
}
```
- **Reset state collapsed di mobile** → Sidebar selalu tampil expanded karena `translateX(-100%)` sudah menyembunyikannya.
- **`!important` massal** → Karena ini emergency override, acceptable.

### **17. ACCESSIBILITY**

```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
}
```
- **`prefers-reduced-motion`** → Menghormati OS-level setting user yang sensitif terhadap animasi (epilepsi, vestibular disorder).

```css
:focus-visible {
  outline: 2px solid var(--cyan);
  outline-offset: 2px;
  border-radius: 6px;
}
button:focus:not(:focus-visible) { outline: none; }
```
- **`:focus-visible`** → Focus ring **hanya** muncul saat keyboard navigation (Tab), tidak saat mouse click.
- **`button:focus:not(:focus-visible)`** → Hilangkan outline untuk mouse click, pertahankan untuk keyboard.

---

# ⚙️ FILE 3: `Nexus Analytics - Saas Analytics Dashboard.js`

## 🗂️ Skema Bagian JavaScript

```
JavaScript (12 bagian)
│
├── 1. 'use strict'
│
├── 2. DATA LAYER
│   ├── 2.1 PERIODS — Data per periode (7/30/365)
│   ├── 2.2 TRANSACTIONS — 8 transaksi sample
│   └── 2.3 PAGE_SUBTITLES — Map subtitle
│
├── 3. HELPERS ($, $$, SIDEBAR_KEY, MOBILE_QUERY)
│
├── 4. STATE (charts, sparkCharts, els, kpiEls)
│
├── 5. DOM CACHE
│   └── cacheDom() — Query & simpan elemen
│
├── 6. CHART HELPERS
│   ├── createGradient()
│   └── formatShort()
│
├── 7. KPI RENDER
│   ├── setTrend()
│   └── renderKPIs()
│
├── 8. CHART BUILDERS
│   ├── buildRevenueChart()
│   ├── buildUsersChart()
│   ├── buildSparkline()
│   └── buildSparklines()
│
├── 9. TRANSACTIONS RENDER
│   └── renderTransactions()
│
├── 10. PERIOD SWITCHER
│   └── setPeriod()
│
├── 11. UI HELPERS
│   ├── withLoading()
│   ├── showToast()
│   └── closeSidebar()
│
├── 12. SIDEBAR COLLAPSE
│   ├── setSidebarCollapsed()
│   ├── toggleSidebar()
│   └── restoreSidebarState()
│
├── 13. EVENT BINDINGS
│   └── bindEvents() — 15+ listener
│
└── 14. INIT
    ├── init() — Bootstrap
    └── readyState check
```

## 📖 Penjelasan Kode JavaScript

### **1. Strict Mode**

```javascript
'use strict';
```
- **Mode ketat** → Mencegah error umum:
  - Variabel tanpa deklarasi → error (bukan jadi global variable)
  - Assignment ke read-only → error
  - Duplikat parameter fungsi → error
  - `this` = `undefined` di fungsi strict (bukan `window`)

### **2. DATA LAYER**

```javascript
const PERIODS = {
  7: {
    revenue: [32000, 35500, 33800, ...],
    target:  [33000, 34500, 36000, ...],
    users:   [12400, 13100, 12800, ...],
    labels:  ['Mon', 'Tue', 'Wed', ...],
    kpi: { rev: '$284,920', revTrend: '▲ 12.4%', revDir: 'up', ... }
  },
  30: { ... },
  365: { ... }
};
```
- **Object dengan numeric keys** → `PERIODS[7]`, `PERIODS[30]`, `PERIODS[365]`. Angka otomatis jadi string key.
- **Single source of truth** → Semua data chart & KPI ada di sini, tidak tersebar.
- **Struktur konsisten** → Semua periode punya shape data yang sama → `setPeriod()` bisa generik.

```javascript
const TRANSACTIONS = [
  { name: 'Sophia Carter', email: 'sophia@acme.io', plan: 'Enterprise',
    amount: 2499, status: 'paid', date: 'Dec 14, 2025', color: '#22d3ee' },
  ...
];
```
- **Array of objects** → Setiap transaksi adalah record dengan schema sama.
- **`color` field** → Bukan data asli bisnis, tapi metadata presentasi (dipakai untuk avatar background).

```javascript
const PAGE_SUBTITLES = {
  'Overview': 'Welcome back, Alex...',
  'Revenue': 'Track revenue streams...',
  ...
};
```
- **Lookup map** → Daripada `if-else` 7 cabang, cukup `PAGE_SUBTITLES[page]`.

### **3. HELPERS**

```javascript
const $  = (sel) => document.querySelector(sel);
const $$ = (sel) => document.querySelectorAll(sel);
```
- **Arrow function shorthands** → Pengganti ringan jQuery.
- **`$$` returns NodeList** → Bisa `.forEach()` langsung (tidak seperti `HTMLCollection`).

```javascript
const SIDEBAR_KEY = 'nexus-sidebar-collapsed';
const MOBILE_QUERY = window.matchMedia('(max-width: 820px)');
```
- **`SIDEBAR_KEY`** → Konstanta localStorage key. Cegah typo yang sulit di-debug.
- **`matchMedia`** → Media query di JavaScript. Punya property `.matches` (boolean) dan `.addEventListener('change', fn)` — reaktif seperti CSS `@media`.

### **4-5. STATE & DOM CACHE**

```javascript
const charts = { revenue: null, users: null };
const sparkCharts = {};
let els = {};
let kpiEls = {};

function cacheDom() {
  els = {
    sidebar: $('#sidebar'),
    backdrop: $('#backdrop'),
    ...
  };
  kpiEls = {
    revValue: $('#revValue'), revSub: $('#revSub'), revTrend: $('#revTrend'),
    ...
  };
}
```
- **DOM cache pattern** → Query DOM **sekali** di awal, simpan di object.
- **Kenapa penting?** → `document.querySelector()` adalah operasi **mahal**. Kalau dipanggil berulang di event handler, akan ada performance hit.
- **`charts` object** → Menyimpan **referensi** Chart instance agar bisa `.destroy()` sebelum re-create.

### **6. CHART HELPERS**

```javascript
function createGradient(ctx, area, c1, c2) {
  const g = ctx.createLinearGradient(0, area.top, 0, area.bottom);
  g.addColorStop(0, c1);
  g.addColorStop(1, c2);
  return g;
}
```
- **Gradient factory** → Chart.js butuh gradient object, bukan CSS string.
- **`area.top` → `area.bottom`** → Gradient vertikal dari atas ke bawah chart area.
- **Parameter `c1, c2`** → Reusable untuk berbagai kombinasi warna.

```javascript
function formatShort(v) {
  return v >= 1000 ? `${Math.round(v / 1000)}k` : v;
}
```
- **Formatter y-axis** → 32000 → `"32k"`. Angka kecil di bawah 1000 tetap as-is.
- **Template literal** → Lebih ringkas dari `Math.round(v / 1000) + 'k'`.

### **7. KPI RENDER**

```javascript
function setTrend(el, text, dir) {
  if (!el) return;
  el.textContent = text;
  el.className = `kpi-trend ${dir === 'up' ? 'up' : 'down'}`;
}
```
- **Guard `if (!el) return`** → Defensive programming. Jika elemen tidak ada, jangan crash.
- **`el.className =` (bukan `classList.add`)** → Replace seluruh class. Aman karena class lama (`kpi-trend up`) memang perlu diganti (`kpi-trend down`).
- **Ternary** → `dir === 'up' ? 'up' : 'down'` — normalize any non-'up' value to 'down'.

```javascript
function renderKPIs(kpi) {
  if (!kpiEls.revValue) return;
  kpiEls.revValue.textContent = kpi.rev;
  kpiEls.revSub.textContent   = kpi.revSub;
  setTrend(kpiEls.revTrend, kpi.revTrend, kpi.revDir);
  ...
}
```
- **Guard sekali di atas** → Jika `revValue` null, semua elemen KPI pasti null juga (karena mereka ada di struktur yang sama). Save 11 guards.
- **`.textContent` vs `.innerHTML`** → `textContent` lebih aman (no XSS risk) dan lebih cepat.

### **8. CHART BUILDERS**

```javascript
function buildRevenueChart(data) {
  const canvas = $('#revenueChart');
  if (!canvas || typeof Chart === 'undefined') return;

  if (charts.revenue) charts.revenue.destroy();

  charts.revenue = new Chart(canvas, { ... });
}
```
- **Double guard** → Canvas harus ada DAN `Chart` harus tersedia (library ter-load).
- **`if (charts.revenue) charts.revenue.destroy()`** → **WAJIB** sebelum re-create. Tanpa ini:
  - Chart bertumpuk di canvas yang sama
  - Memory leak (event listener lama tidak dihapus)
  - Chart.js akan error: "Canvas is already in use"
- **Store reference** → `charts.revenue = new Chart(...)` agar destroy bisa dipanggil di re-render berikutnya.

```javascript
backgroundColor: (c) => {
  if (!c.chart.chartArea) return 'rgba(34,211,238,.1)';
  return createGradient(c.chart.ctx, c.chart.chartArea, 'rgba(34,211,238,.28)', 'rgba(34,211,238,0)');
}
```
- **Function as value** → Chart.js callback. Dipanggil saat chart pertama render (saat `chartArea` undefined) dan setiap resize.
- **Fallback** → Saat `chartArea` belum ada, return static color untuk prevent crash.
- **`c`** → Chart.js context: `{ chart, dataIndex, dataset, ... }`.

```javascript
plugins: {
  tooltip: {
    callbacks: {
      label: (c) => `${c.dataset.label}: $${c.parsed.y.toLocaleString()}`
    }
  }
}
```
- **Tooltip formatter** → `c.parsed.y` = nilai mentah dari data. `.toLocaleString()` = 32000 → "32,000".

```javascript
function buildSparkline(id, data, color) {
  const canvas = document.getElementById(id);
  if (!canvas || typeof Chart === 'undefined') return;
  if (sparkCharts[id]) sparkCharts[id].destroy();

  sparkCharts[id] = new Chart(canvas, {
    type: 'line',
    data: {
      datasets: [{
        data,
        fill: true,
        backgroundColor: (c) => {
          if (!c.chart.chartArea) return 'transparent';
          return createGradient(c.chart.ctx, c.chart.chartArea, color + '55', color + '00');
        }
      }]
    },
    options: {
      scales: { x: { display: false }, y: { display: false } },
      plugins: { legend: { display: false }, tooltip: { enabled: false } },
      elements: { line: { borderCapStyle: 'round' } }
    }
  });
}
```
- **`color + '55'` / `color + '00'`** → String concat untuk alpha hex. `#22d3ee` + `55` = `#22d3ee55` (33% opacity). Trik CSS color.
- **`display: false` pada scales** → Sembunyikan axis (sparkline tidak perlu axis).
- **`enabled: false` pada tooltip** → Nonaktifkan hover tooltip.
- **`borderCapStyle: 'round'`** → Ujung line membulat (lebih halus dari default `butt`).

```javascript
function buildSparklines(data) {
  buildSparkline('sparkRev',   data.revenue.slice(-10), '#22d3ee');
  buildSparkline('sparkUsers', data.users.slice(-10),   '#8b5cf6');
  buildSparkline('sparkConv',
    data.users.map((u, i) => Math.round(u / data.revenue[i] * 100)).slice(-10),
    '#10b981');
  buildSparkline('sparkMrr',
    data.revenue.map((v) => v * 0.15).slice(-10),
    '#f59e0b');
}
```
- **`.slice(-10)`** → 10 data terakhir. Sparkline dengan data terlalu panjang akan terlihat noisy.
- **Conversion dihitung dinamis** → `users/revenue * 100` — derived data, bukan hard-coded.
- **MRR = 15% of revenue** → Simulasi bisnis realistis (15% conversion dari total revenue).

### **9. TRANSACTIONS RENDER**

```javascript
function renderTransactions(list) {
  if (!els.txBody) return;

  if (list.length === 0) {
    els.tableWrap.style.display = 'none';
    els.emptyState.classList.add('show');
    els.errorState.classList.remove('show');
    return;
  }

  els.emptyState.classList.remove('show');
  els.errorState.classList.remove('show');
  els.tableWrap.style.display = '';

  els.txBody.innerHTML = list.map((t) => {
    const initials = t.name.split(' ').map((n) => n[0]).join('');
    return `
      <tr>
        <td>
          <div class="cust">
            <div class="cust-av" style="background:${t.color}">${initials}</div>
            <div>
              <div class="cust-name">${t.name}</div>
              <div class="cust-email">${t.email}</div>
            </div>
          </div>
        </td>
        <td><span style="color:${t.color};font-weight:600">${t.plan}</span></td>
        <td class="amount">$${t.amount.toLocaleString()}</td>
        <td><span class="badge-status ${t.status}">${t.status}</span></td>
        <td style="color:var(--muted)">${t.date}</td>
      </tr>
    `;
  }).join('');
}
```
- **`.split(' ').map(n => n[0]).join('')`** → "Sophia Carter" → `['Sophia', 'Carter']` → `['S','C']` → `"SC"`.
- **`.map().join('')`** → Pattern render list. `.map` menghasilkan array string HTML, `.join('')` menggabungkan tanpa koma. **JANGAN** pakai `.join(',')` — koma akan muncul di HTML.
- **`.style.display = ''`** (empty string) → Reset ke default CSS. Bukan `'table'` atau `'block'` karena kita tidak tahu default-nya.
- **Security note** → Data di sini **trusted** (dari `TRANSACTIONS` array lokal). Untuk data user, gunakan `textContent` atau sanitize HTML.

### **10. PERIOD SWITCHER**

```javascript
function setPeriod(period) {
  const data = PERIODS[period];
  if (!data) return;
  renderKPIs(data.kpi);
  buildRevenueChart(data);
  buildUsersChart(data);
  buildSparklines(data);
}
```
- **Single entry point** → Semua bagian yang berubah saat period berubah di sini.
- **Guard `if (!data)`** → Validasi period sebelum proses.

### **11. UI HELPERS**

```javascript
function withLoading(fn, delay = 400) {
  if (!els.loading) { fn(); return; }
  els.loading.classList.add('show');
  setTimeout(() => {
    try { fn(); }
    catch (err) { console.error('withLoading error:', err); }
    finally { els.loading.classList.remove('show'); }
  }, delay);
}
```
- **Pattern "loading wrapper"** → Bungkus fungsi async-like dengan spinner.
- **`try/catch/finally`** → `finally` **wajib** memastikan `loading.classList.remove('show')` jalan meski error.
- **Default parameter** → `delay = 400` jika tidak diberikan.
- **Guard `if (!els.loading)`** → Fallback: langsung jalankan `fn()` tanpa loading.

```javascript
let toastTimer;
function showToast(msg) {
  if (!els.toast) return;
  els.toastMsg.textContent = msg;
  els.toast.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => els.toast.classList.remove('show'), 2200);
}
```
- **`clearTimeout(toastTimer)`** → Setiap toast baru, reset timer lama. Mencegah toast "flicker" jika user spam klik.
- **`let toastTimer`** di scope luar → Menyimpan timer ID antar call.

### **12. SIDEBAR COLLAPSE**

```javascript
function setSidebarCollapsed(collapsed, persist = true) {
  if (!els.app || !els.collapseBtn) return;

  els.app.classList.toggle('sidebar-collapsed', collapsed);
  els.collapseBtn.setAttribute('aria-label', collapsed ? 'Expand sidebar' : 'Collapse sidebar');
  els.collapseBtn.setAttribute('title', collapsed ? 'Expand sidebar' : 'Collapse sidebar');
  els.collapseBtn.setAttribute('aria-expanded', String(!collapsed));

  if (persist) {
    try {
      localStorage.setItem(SIDEBAR_KEY, collapsed ? '1' : '0');
    } catch (_) { /* private mode */ }
  }

  setTimeout(() => {
    if (charts.revenue) charts.revenue.resize();
    if (charts.users) charts.users.resize();
  }, 380);
}
```
- **`classList.toggle(cls, force)`** → `toggle('cls', true)` = force add. `toggle('cls', false)` = force remove. Tidak flip seperti `toggle('cls')` tanpa argumen.
- **Sinkronisasi ARIA** → `aria-expanded` dibalik dari `collapsed` (expanded = !collapsed).
- **`localStorage` dengan try/catch** → Private mode / Safari ITP akan throw error saat `setItem`. Catch dan abaikan.
- **`setTimeout(380)`** → Tunggu transisi grid selesai (durasi CSS `--duration-slow` = 0.35s = 350ms, +30ms buffer). Setelah itu Chart.js `.resize()` agar chart menyesuaikan container baru.

```javascript
function toggleSidebar() {
  if (MOBILE_QUERY.matches) return;
  const isCollapsed = els.app.classList.contains('sidebar-collapsed');
  setSidebarCollapsed(!isCollapsed);
}
```
- **Guard mobile** → Di mobile, sidebar pakai mode slide-in (`.open` class). Toggle collapse tidak relevan.
- **`classList.contains`** → Baca state saat ini, lalu kirim `!isCollapsed` sebagai target state.

```javascript
function restoreSidebarState() {
  if (MOBILE_QUERY.matches) return;
  try {
    const saved = localStorage.getItem(SIDEBAR_KEY);
    setSidebarCollapsed(saved === '1', false);
  } catch (_) {
    setSidebarCollapsed(false, false);
  }
}
```
- **`saved === '1'`** → localStorage menyimpan string. Default `false` (expanded) jika `null`.
- **`persist: false`** → Saat restore, **jangan** simpan kembali (sudah tersimpan). Cegah infinite loop/glitch.
- **Catch fallback** → Jika localStorage diblokir, default ke expanded.

### **13. EVENT BINDINGS (`bindEvents`)**

```javascript
els.periodFilter.addEventListener('click', (e) => {
  const btn = e.target.closest('button');
  if (!btn) return;
  ...
});
```
- **Event delegation** → 1 listener untuk 3 tombol. `e.target.closest('button')` naik ke parent `<button>` terdekat. Guard `if (!btn)` untuk klik area di luar tombol.

```javascript
els.globalSearch.addEventListener('input', () => {
  const q = els.globalSearch.value.trim().toLowerCase();
  if (!q) { renderTransactions(TRANSACTIONS); return; }
  const filtered = TRANSACTIONS.filter((t) =>
    t.name.toLowerCase().includes(q) ||
    t.email.toLowerCase().includes(q) ||
    t.plan.toLowerCase().includes(q) ||
    t.status.toLowerCase().includes(q)
  );
  renderTransactions(filtered);
});
```
- **`.trim().toLowerCase()`** → Normalize query. `"Sophia"`, `"sophia"`, `" SOPHIA "` semua cocok.
- **`.includes(q)`** → Substring match. Bukan exact match.
- **Multiple `||`** → Search di 4 field. Jika salah satu cocok, transaksi masuk.

```javascript
els.exportBtn.addEventListener('click', () => {
  withLoading(() => {
    const rows = [
      ['Customer','Email','Plan','Amount','Status','Date'],
      ...TRANSACTIONS.map((t) => [t.name, t.email, t.plan, t.amount, t.status, t.date])
    ];
    const csv = rows.map((r) => r.map((v) => `"${v}"`).join(',')).join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'nexus-report.csv';
    a.click();
    URL.revokeObjectURL(url);
    showToast('Report exported successfully');
  }, 500);
});
```
- **CSV building** → Array of arrays → `.map` ke CSV rows → join `\n`.
- **Quote each value** → `"${v}"` melindungi koma dalam nilai (misal "Carter, Sophia").
- **`Blob` + `URL.createObjectURL`** → Membuat file in-memory tanpa server.
- **`a.click()`** → Trigger download programatik.
- **`URL.revokeObjectURL`** → **WAJIB** untuk free memory. Tanpa ini, blob tetap di memory sampai page close.

```javascript
document.addEventListener('keydown', (e) => {
  if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'b') {
    e.preventDefault();
    toggleSidebar();
  }
});
```
- **`e.ctrlKey || e.metaKey`** → Support Windows (Ctrl) dan Mac (Cmd).
- **`e.key.toLowerCase()`** → Case-insensitive (bisa Shift+B juga).
- **`e.preventDefault()`** → Cegah default browser (Ctrl+B = bold di contenteditable).

```javascript
MOBILE_QUERY.addEventListener('change', (e) => {
  if (e.matches) {
    els.app.classList.remove('sidebar-collapsed');
    closeSidebar();
  } else {
    restoreSidebarState();
  }
});
```
- **Responsive listener** → Setiap resize melewati 820px:
  - **Masuk mobile** → Paksa expanded + tutup sidebar slide-in.
  - **Keluar mobile** → Restore collapsed state dari localStorage.

```javascript
document.addEventListener('click', (e) => {
  const action = e.target.closest('[data-action]')?.dataset.action;
  if (action === 'upgrade')   showToast('Upgrade flow opened');
  if (action === 'ai-report') showToast('Opening full AI report…');
});
```
- **Optional chaining `?.`** → Jika `closest` return null, `.dataset` tidak akan throw.
- **`[data-action]` selector** → Attribute selector. Cocok semua elemen dengan `data-action`.
- **Pattern "action dispatcher"** → Satu listener global untuk semua tombol dengan `data-action`.

### **14. INIT**

```javascript
function init() {
  cacheDom();
  if (!els.loading) {
    console.error('[Nexus] #loading tidak ditemukan di DOM!');
    return;
  }
  els.loading.classList.add('show');

  setTimeout(() => {
    try {
      if (typeof Chart === 'undefined') {
        console.warn('[Nexus] Chart.js tidak terdeteksi. Grafik dilewati.');
        showToast('Chart library gagal dimuat');
      } else {
        Chart.defaults.color = '#8494b0';
        Chart.defaults.font.family = "Inter, -apple-system, 'Segoe UI', sans-serif";
        Chart.defaults.font.size = 11;
      }

      restoreSidebarState();
      setPeriod(7);
      renderTransactions(TRANSACTIONS);
      bindEvents();

      console.log('[Nexus] ✅ Dashboard siap.');
    } catch (err) {
      console.error('[Nexus] Init error:', err);
      showToast('Terjadi kesalahan saat memuat dashboard');
    } finally {
      els.loading.classList.remove('show');
    }
  }, 300);
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}
```
- **`cacheDom()` dulu** → Selalu. Tanpa ini, `els` kosong.
- **Guard `#loading`** → Fail fast dengan error jelas jika struktur HTML rusak.
- **`setTimeout(300)`** → Simulasi loading agar spinner sempat terlihat. Jika terlalu cepat, user tidak sadar ada loading.
- **Guard `Chart === 'undefined'`** → Jika Chart.js gagal load (404, offline), dashboard tetap render (chart kosong, tapi tabel & KPI jalan).
- **`try/catch/finally`**:
  - **try** → Semua kode normal
  - **catch** → Log error + toast user-friendly
  - **finally** → **PASTI** hilangkan loading, apapun yang terjadi. Ini kunci anti-"spinner stuck".
- **`document.readyState`**:
  - `'loading'` → DOM belum siap → tunggu `DOMContentLoaded`
  - Lainnya (`'interactive'` atau `'complete'`) → DOM sudah siap → panggil `init()` langsung
- **Kenapa perlu?** → Meski `<script defer>` menjamin DOM ready, pattern ini **defensive** untuk kasus edge (mis. script di-inject dinamis).

---

# 📦 FILE 4: `Chart.min.js`

## 🗂️ Skema Bagian Chart.js

```
Chart.js v4.4.1 UMD (minified, 200KB)
│
├── 1. Header & License
│   └── Copyright + MIT License
│
├── 2. UMD Wrapper
│   └── !function(t, e) { ... }
│
├── 3. Core Engine
│   ├── Animation (bt class)
│   ├── Color utils (@kurkle/color)
│   ├── DOM utilities
│   └── Event system
│
├── 4. Chart Base (An class)
│   ├── Constructor
│   ├── Lifecycle (init, resize, update, render, draw)
│   ├── Dataset management
│   └── Event handling
│
├── 5. Controllers (10+)
│   ├── BarController
│   ├── LineController
│   ├── DoughnutController
│   ├── PieController
│   ├── RadarController
│   ├── BubbleController
│   ├── ScatterController
│   ├── PolarAreaController
│   └── ...
│
├── 6. Elements (5)
│   ├── ArcElement
│   ├── BarElement
│   ├── LineElement
│   ├── PointElement
│   └── ...
│
├── 7. Scales (7+)
│   ├── CategoryScale
│   ├── LinearScale
│   ├── LogarithmicScale
│   ├── RadialLinearScale
│   ├── TimeScale
│   └── TimeSeriesScale
│
├── 8. Plugins (7)
│   ├── Colors
│   ├── Decimation
│   ├── Filler
│   ├── Legend
│   ├── Subtitle
│   ├── Title
│   └── Tooltip
│
└── 9. Global Registration
    └── window.Chart = An
```

## 📖 Penjelasan Kode Chart.min.js

### **1. Header & License**

```javascript
/*!
 * Chart.js v4.4.1
 * https://www.chartjs.org
 * (c) 2023 Chart.js Contributors
 * Released under the MIT License
 */
```
- **License block** → MIT = bebas digunakan, dimodifikasi, dikomersilkan, asalkan copyright notice tetap ada.
- **`/*! ... */`** → `!` setelah `/*` = "important comment" — tidak akan dihapus oleh minifier.

### **2. UMD Wrapper (Universal Module Definition)**

```javascript
!function(t, e) {
  "object" == typeof exports && "undefined" != typeof module
    ? module.exports = e()                                    // Node.js / CommonJS
    : "function" == typeof define && define.amd
      ? define(e)                                             // AMD (RequireJS)
      : (t = "undefined" != typeof globalThis ? globalThis : t || self).Chart = e()
  //                                                          ↑ Browser global
}(this, function() {
  "use strict";
  // ... seluruh library
});
```
- **UMD pattern** → Satu file bisa dipakai di 3 environment:
  - **CommonJS** (Node, Webpack, Vite) → `require('chart.js')`
  - **AMD** (RequireJS, legacy) → `define(['chart.js'], ...)`
  - **Browser global** → `<script src="chart.min.js">` → `window.Chart` tersedia
- **`!function(){...}()`** → IIFE (Immediately Invoked Function Expression). `!` didepan = memastikan parser memperlakukan sebagai ekspresi (bukan deklarasi).
- **`this` di top-level** → Di browser non-module = `window`. Di module = `undefined`. Karena itu ada fallback `globalThis`.
- **Ini yang membuat `<script defer>` di HTML bisa langsung memakai `Chart`** — library sudah otomatis `window.Chart = ...`.

### **3. Core Engine**

```javascript
var t = Object.freeze({ __proto__: null, get Colors(){...}, ... });
```
- **Frozen namespace** → Object berisi semua plugin, tidak bisa dimodifikasi dari luar.

```javascript
class bt {
  // Animation engine
  _refresh() {
    this._request = ht.call(window, () => {
      this._update();
      this._request = null;
      this._running && this._refresh();
    });
  }
}
var xt = new bt;
```
- **Animation loop** → Menggunakan `requestAnimationFrame` (`ht`) untuk smooth 60fps animation.
- **`_refresh` recursive** → Loop terus selama `_running` true.

### **4. Chart Base Class**

```javascript
class An {
  static defaults = ue;
  static instances = Pn;
  static overrides = re;
  static registry = en;
  static version = "4.4.1";

  constructor(t, e) {
    const s = this.config = new bn(e);
    // ... 40+ lines setup
    Pn[this.id] = this;
  }

  update(t) { /* recompute layout + datasets */ }
  render() { /* draw */ }
  draw() { /* actual canvas drawing */ }
  destroy() { /* cleanup */ }
  resize(t, e) { /* recompute size */ }
}
```
- **`static instances = Pn`** → Registry semua chart aktif. Dipakai untuk "chart already in use" error.
- **`constructor(canvas, config)`** → Signature standar. `new Chart(canvas, {...})`.
- **`.destroy()`** → Yang kita panggil di `app.js` sebelum re-create chart baru.
- **Lifecycle**: `init → resize → update → render → draw`.

### **5. Controllers**

```javascript
BarController: class extends Ns { static id = "bar"; ... }
LineController: class extends Ns { static id = "line"; ... }
DoughnutController: jn
PieController: class extends jn { static id = "pie"; ... }
```

- **Kita pakai**: `BarController` (user growth) dan `LineController` (revenue + sparkline).
- **Static `id`** → String identifier untuk registry. `type: 'bar'` di config → lookup `BarController` via id.
- **Extends `Ns`** (DatasetController) → Base class untuk semua tipe chart.

### **6. Elements**

```javascript
BarElement: class extends Hs { ... }
LineElement: no
PointElement: class extends Hs { ... }
ArcElement: class extends Hs { ... }
```

- **Kita pakai**: `BarElement` (bar chart), `LineElement` + `PointElement` (line chart).
- **`PointElement`** → Titik di line chart. Kita set `pointRadius: 0` → tersembunyi.
- **`Hs`** = base Element class → punya `.draw()`, `.getCenterPoint()`, `.inRange()`, dll.

### **7. Scales**

```javascript
CategoryScale: class extends Js { static id = "category"; ... }
LinearScale: xo (extends bo)
LogarithmicScale: ko
RadialLinearScale: Eo
TimeScale: No
```

- **`CategoryScale`** → X-axis untuk labels array (`['Mon', 'Tue', ...]`).
- **`LinearScale`** → Y-axis untuk numeric values (`[32000, 35500, ...]`).
- **Chart.js otomatis pilih** berdasarkan tipe data:
  - Data array of strings → `CategoryScale` (x) + `LinearScale` (y)
  - Data array of numbers → `LinearScale` (y), x = index
- **`RadialLinearScale`** → Untuk radar/polar chart (kita tidak pakai).

### **8. Plugins**

```javascript
var Go = { id: "colors", beforeLayout(t, e, i) { ... } };       // Auto colors
var Qo = { id: "decimation", ... };                             // Data downsampling
var ma = { id: "filler", ... };                                 // Fill under line
var ya = { id: "legend", ... };                                 // Legend box
var ka = { id: "subtitle", ... };                               // Subtitle
var Ma = { id: "title", ... };                                  // Title
var Ba = { id: "tooltip", ... };                                // Hover tooltip
```

- **`Filler`** → Yang membuat `fill: true` di line chart benar-benar mengisi area bawah line dengan gradient. **Kita pakai** untuk revenue chart & sparkline.
- **`Tooltip`** → Yang memunculkan hover popup dengan `callbacks.label`. **Kita pakai** untuk revenue & users chart.
- **`Legend`** → Kotak legend. **Kita matikan** dengan `legend: { display: false }` (pakai custom HTML legend).
- **`Colors`** → Auto-assign warna jika tidak di-set. **Kita override** warna sendiri → plugin ini otomatis skip.
- **`Decimation`** → Untuk dataset > 10,000 points. Tidak dipakai (data kita kecil).

### **9. Global Registration**

```javascript
An.register(Yn, jo, fo, t);
An.helpers = { ...Wi };
An.Chart = An;
"undefined" != typeof window && (window.Chart = An);
```

- **`An.register(...)`** → Daftarkan semua controllers (`Yn`), scales (`jo`), elements (`fo`), plugins (`t`) ke registry global.
- **`window.Chart = An`** → **Ini yang membuat `Chart` global variable bisa dipakai di `app.js`**.
- **Tanpa line ini**, Anda harus import manual:
  ```javascript
  import { Chart, BarController, LineController, ... } from 'chart.js';
  Chart.register(BarController, LineController, ...);
  ```
- Karena file ini sudah otomatis register semua, `app.js` tinggal `new Chart(...)` — tidak perlu setup.

### **⚠️ Catatan: `//# sourceMappingURL`**

```javascript
//# sourceMappingURL=chart.umd.js.map
```
- **Source map reference** → Untuk debugging: DevTools bisa map minified code kembali ke source asli.
- **File `.map` tidak perlu didownload** → Hanya dipakai jika DevTools aktif. Jika 404, tidak error (hanya warning di Console).
- **Boleh dihapus** untuk production, tidak berpengaruh ke fungsi.

---

## 🎯 Ringkasan Integrasi Antar File

### **Alur Load & Eksekusi**

```
1. Browser request HTML
   ↓
2. Parse <head>
   ├── Fetch Google Fonts (async)
   ├── Fetch CSS file (blocking render)
   └── Queue Chart.min.js & app.js dengan defer
   ↓
3. Parse <body>
   └── Build DOM tree
   ↓
4. DOM siap (DOMContentLoaded)
   ↓
5. Script defer dieksekusi berurutan:
   ├── Chart.min.js → window.Chart = library
   └── app.js → init() dijalankan
   ↓
6. init():
   ├── cacheDom() → Simpan referensi DOM
   ├── showLoading() → Tampilkan spinner
   ├── setTimeout(300):
   │   ├── Check Chart.js tersedia
   │   ├── Set Chart.defaults
   │   ├── restoreSidebarState() → Apply localStorage
   │   ├── setPeriod(7) → Render KPI + charts
   │   ├── renderTransactions() → Render tabel
   │   ├── bindEvents() → Pasang semua listener
   │   └── hideLoading() (di finally)
   ↓
7. Dashboard interaktif ✅
```

### **State Management**

| State | Disimpan Di | Persist? |
|-------|-------------|----------|
| Active period | `.segmented .active` (CSS class) | ❌ No |
| Active menu | `.nav-item.active` | ❌ No |
| Sidebar collapsed | `.app.sidebar-collapsed` | ✅ localStorage |
| Search query | `<input>.value` | ❌ No |
| Chart instances | `charts.revenue`, `charts.users` | ❌ Memory only |
| Sparkline instances | `sparkCharts[id]` | ❌ Memory only |
| DOM references | `els`, `kpiEls` | ❌ Memory only |

### **Dependency Graph**

```
index.html
    ├── css/...css (styling)
    ├── js/Chart.min.js (library)
    │       ↓ exposes window.Chart
    └── js/...js (app logic)
            ↓ depends on
            ├── window.Chart
            ├── CSS classes (styling)
            ├── DOM IDs (targets)
            └── data-* attributes (config)
```

---

## ✅ Checklist Final — Semua Fitur Berjalan

| Fitur | File | Status |
|-------|------|--------|
| Render halaman | HTML | ✅ |
| Dark theme premium | CSS | ✅ |
| Responsive mobile | CSS `@media` | ✅ |
| Sidebar collapse/expand | JS + CSS | ✅ |
| Ctrl+B shortcut | JS keydown | ✅ |
| Persist sidebar state | JS localStorage | ✅ |
| Period filter (3 opsi) | HTML + JS | ✅ |
| KPI cards update | JS `renderKPIs` | ✅ |
| Revenue chart (line) | JS + Chart.js | ✅ |
| Users chart (bar) | JS + Chart.js | ✅ |
| 4 sparklines | JS + Chart.js | ✅ |
| Tabel transaksi | JS render | ✅ |
| Search filter | JS input event | ✅ |
| Empty state | CSS + JS | ✅ |
| Error state + retry | CSS + JS | ✅ |
| Loading overlay | CSS + JS | ✅ |
| Export CSV | JS Blob + download | ✅ |
| Toast notification | CSS + JS | ✅ |
| Accessibility (ARIA) | HTML + CSS + JS | ✅ |
| Keyboard nav | CSS `:focus-visible` | ✅ |
| Reduced motion | CSS `@media` | ✅ |