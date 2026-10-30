# 🟦 WeProMan — Project Management SaaS (UI Premium)

> **WeProMan** adalah UI premium untuk aplikasi *Project Management SaaS* yang dibangun **100% dengan HTML + CSS murni** — tanpa JavaScript, tanpa framework, tanpa backend. Cocok sebagai referensi desain, template statis, atau fondasi prototipe.

![Status](https://img.shields.io/badge/status-complete-success)
![Tech](https://img.shields.io/badge/tech-HTML%20%2B%20CSS-blue)
![JS](https://img.shields.io/badge/JavaScript-0%25-lightgrey)
![Theme](https://img.shields.io/badge/theme-Dark%20%26%20Light-6f42c1)
![Responsive](https://img.shields.io/badge/responsive-yes-brightgreen)

---

## ✨ Fitur Utama

| Fitur | Keterangan |
|---|---|
| 🌗 **Dark & Light Mode Persisten** | Pilihan tema **tersimpan** saat berpindah halaman (via URL hash `#dark` / `#light`) — tanpa JavaScript |
| 📱 **Responsive Design** | Layout adaptif untuk desktop, tablet, dan mobile |
| 🎨 **Design System Terpusat** | Semua warna, radius, shadow, dan spacing dikelola lewat CSS custom properties |
| 🧭 **Multi-Halaman Terhubung** | 11 halaman HTML yang saling terhubung via navigasi konsisten |
| 🖼️ **UI Premium** | Gradient, glassmorphism, hover-lift, shadow elegan, tipografi Plus Jakarta Sans |
| 📊 **Data Demo Realistis** | Project, task, tim, kalender, laporan — semua statis sebagai contoh visual |
| 🚫 **Zero JavaScript** | Semua interaksi visual (tema, mobile menu) memakai CSS `:target`, `:has()`, dan checkbox trick |
| 🧩 **Kanban Board** | Tampilan board dengan kolom Backlog / To Do / In Progress / Done |
| 📈 **Chart Pure CSS** | Bar chart (`flex`) dan donut chart (`conic-gradient`) tanpa library |

---

## 🧱 Teknologi

- **HTML5** — struktur semantik, aksesibel
- **CSS3 Modern**:
  - Custom Properties (`--var`)
  - `:has()`, `:target`
  - CSS Grid & Flexbox
  - `backdrop-filter`, `conic-gradient`
  - Media Queries
- **Font**: [Plus Jakarta Sans](https://fonts.google.com/specimen/Plus+Jakarta+Sans) via Google Fonts
- **Zero dependencies** — tidak ada library JS/CSS eksternal

---

## 📁 Struktur Project

weproman/
├── index.html # Landing page
├── login.html # Halaman login
├── register.html # Halaman registrasi
├── dashboard.html # Dashboard utama
├── projects.html # Daftar project
├── project-detail.html # Detail project + Kanban board
├── tasks.html # Daftar task (tabel)
├── team.html # Daftar anggota tim
├── calendar.html # Kalender bulanan
├── reports.html # Laporan & analitik
├── settings.html # Pengaturan akun & tema
├── css/
│ ├── global.css # Design system, tema, sidebar, topbar, komponen
│ ├── landing.css # Styling landing page
│ ├── auth.css # Styling login & register
│ └── dashboard.css # Styling dashboard & halaman app
└── README.md



---

## 🚀 Cara Menjalankan

Karena project ini **100% statis**, tidak butuh build tool atau server khusus.

### Opsi 1 — Buka langsung di browser
1. Ekstrak / clone folder project
2. Klik dua kali `index.html`
3. Selesai ✅

### Opsi 2 — Jalankan local server (opsional, direkomendasikan)
Dengan **Python**:
```bash
python3 -m http.server 8000