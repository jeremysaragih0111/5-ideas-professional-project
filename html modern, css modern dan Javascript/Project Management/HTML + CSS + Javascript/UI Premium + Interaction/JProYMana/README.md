# JProYMana · Project Management SaaS

> Premium project management UI — dark & light themes, global theme lock, interactive dashboard, task board, and team view. Built with pure **HTML + CSS + JavaScript** (no build tools, no backend, no framework).

![Status](https://img.shields.io/badge/status-ready--to--run-brightgreen)
![Tech](https://img.shields.io/badge/tech-HTML%20%7C%20CSS%20%7C%20JS-blue)
![License](https://img.shields.io/badge/license-MIT-lightgrey)

---

## ✨ Fitur Utama

| Fitur | Keterangan |
|---|---|
| 🌗 **Global Theme Lock** | Setelah user memilih Light/Dark di awal, pilihan tersimpan permanen di `localStorage`. Berlaku saat refresh, pindah halaman, maupun buka tab baru. |
| 🔄 **Cross-Tab Sync** | Perubahan tema di satu tab langsung tersinkron ke tab lain lewat event `storage`. |
| 🧭 **5 Halaman Terpisah** | Dashboard · Projects · Task Board · Team · Settings — semuanya saling terhubung. |
| 📊 **Dashboard Interaktif** | Statistik real-time dari data demo, tabel project terbaru, activity feed. |
| 🗂️ **Project Table + Filter** | Filter status (All / In Progress / Completed / On Hold). |
| 🧩 **Kanban Task Board** | Klik kartu task untuk memindahkannya ke kolom berikutnya (To Do → In Progress → Done). |
| ➕ **Modal Form** | Buat project baru & task baru (data demo in-memory). |
| 🔍 **Global Search** | Cari project berdasarkan nama, tim, atau status. |
| 🔔 **Toast Notification** | Feedback halus untuk setiap aksi. |
| 📱 **Responsive** | Sidebar collapse di mobile, layout adaptif hingga 320px. |
| 🎨 **Premium Visual** | Font Inter, gradient aksen brand, shadow berlapis, micro-interactions. |

---

## 📁 Struktur Project


jproymana/
├── JProYMana.html
├── README.md
├── css/
│ ├── themes.css # Design tokens (light + dark)
│ └── main.css # Layout, komponen, responsive
└── js/
├── theme.js # Global theme lock (localStorage + sync)
├── data.js # Demo data (projects, tasks, team, activity)
├── JProYMana.js # UI controller (render, modal, filter, board)
└── main.js # Bootstrap & safety init



### Kenapa file dipisah?

- **`themes.css`** — semua variabel warna terpusat. Ubah brand color cukup di satu file.
- **`main.css`** — semua layout & komponen.
- **`theme.js`** — logika tema terisolasi (mudah dipakai ulang di project lain).
- **`data.js`** — data demo murni, tidak menyentuh DOM. Gampang diganti API nyata nanti.
- **`JProYMana.js`** — semua render & event UI.
- **`main.js`** — pintu masuk bootstrap, memisahkan "startup" dari "logic".

Semua file tetap **saling terhubung** lewat `JProYMana.html` (urutan `<script>` sudah diatur).

---

## 🚀 Cara Menjalankan

### Opsi 1 — Buka langsung
Cukup **double-click `JProYMana.html`** di file explorer. Selesai.

> ⚠️ Beberapa browser modern membatasi `localStorage` pada protokol `file://`. Jika tema tidak persist, gunakan Opsi 2.

### Opsi 2 — Server statis (disarankan)

**Python 3:**
```bash
cd jproymana
python -m http.server 8000

Node.js (npx):
cd jproymana
npx serve .


PHP:
cd jproymana
php -S localhost:8000
Lalu buka http://localhost:8000 di browser.

Tech Stack
HTML5 semantik

CSS3 modern: custom properties, grid, color-mix(), backdrop-filter, @media

JavaScript (ES2015+) vanilla: localStorage, CustomEvent, storage event, IIFE modules

Inter font (Google Fonts)

Font Awesome 6 (CDN)

Tanpa framework, tanpa build step, tanpa dependency npm — cukup taruh file & jalankan.