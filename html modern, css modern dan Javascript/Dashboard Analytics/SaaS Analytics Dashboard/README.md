# 🚀 SaaS Analytics Dashboard — Dark Premium + Collapsible Sidebar

Dashboard analytics **HTML + CSS murni** dengan tema dark premium dan sidebar
yang bisa di-**minimize / maximize** tanpa JavaScript.

## ✨ Fitur

| Fitur | Cara |
|-------|------|
| **Collapse sidebar** (minimize) | Klik tombol `⟨⟨` di topbar |
| **Expand sidebar** (maximize) | Klik tombol `⟩⟩` lagi |
| **Tooltip saat collapsed** | Hover ikon → tooltip muncul |
| Icon-only mode | Otomatis saat collapse |
| Drawer mobile | Klik ☰ di kiri atas |
| Responsive | Desktop / tablet / mobile |
| Dark premium UI | Gradien, glow, shadow |
| Chart statis | SVG + CSS donut |
| Data tabel | Demo statis |

## ⚠️ Batasan (jujur)

- ❌ Tidak ada backend / API
- ❌ Tidak ada JavaScript
- ❌ Chart statis (tidak berubah saat ganti chip 7H/30H/90H)
- ❌ Search & tombol hanya visual
- ⚠️ Collapse pakai CSS `:has()` — didukung Chrome/Edge 105+,
  Safari 15.4+, Firefox 121+. Browser lebih lama: sidebar collapse
  tetap jalan, tapi grid tidak menyesuaikan (ada ruang kosong)

## 📂 Struktur

```
saas-dashboard-dark/
├── index.html
├── css/
│   ├── reset.css
│   ├── variables.css
│   ├── layout.css
│   ├── components.css
│   └── responsive.css
└── README.md
```

## 🚀 Cara Menjalankan

### Opsi 1 — Buka langsung
Klik dua kali `index.html`.

### Opsi 2 — Local server
```bash
python -m http.server 8000
# atau
npx serve .
```
Buka `http://localhost:8000`.

### Opsi 3 — VS Code Live Server
Install extension **Live Server** → klik kanan `index.html` → *Open with Live Server*.

## 🎮 Cara Pakai

1. **Desktop** — Klik tombol `⟨⟨` di topbar untuk minimize sidebar.
   Hover ikon untuk melihat tooltip. Klik lagi untuk maximize.
2. **Mobile (≤900px)** — Sidebar otomatis jadi drawer. Klik ☰ untuk buka.
   Tombol collapse disembunyikan (tidak relevan di mobile).
3. **Resize browser** — Layout menyesuaikan otomatis.

## 🔧 Kustomisasi

Semua di `css/variables.css`:

```css
:root {
  --primary: #6366f1;
  --sidebar-w: 260px;              /* lebar normal */
  --sidebar-w-collapsed: 76px;     /* lebar saat minimize */
}
```

## 📱 Breakpoints

| Breakpoint | Perubahan |
|------------|-----------|
| `≤ 1200px` | KPI 2 kolom, chart 1 kolom |
| `≤ 900px`  | Sidebar jadi drawer, collapse di-disable |
| `≤ 600px`  | KPI 1 kolom, search disembunyikan |

## 📄 Lisensi

Bebas untuk portfolio & pembelajaran.