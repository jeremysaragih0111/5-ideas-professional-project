# JCRM — Premium CRM Dashboard

Dashboard CRM premium dengan tema **light premium** dan **dark mode**, dibangun sepenuhnya menggunakan **HTML + CSS modern** tanpa JavaScript. Cocok sebagai template UI untuk aplikasi CRM, sales pipeline, atau customer management.

![Status](https://img.shields.io/badge/status-ready%20to%20use-success)
![Tech](https://img.shields.io/badge/tech-HTML%20%2B%20CSS-4f46e5)
![JS](https://img.shields.io/badge/JavaScript-0%25-10b981)
![License](https://img.shields.io/badge/license-MIT-blue)

---

## 📸 Preview

> _Tambahkan screenshot di sini setelah project dijalankan._

| Light Mode | Dark Mode |
|---|---|
| _(screenshot)_ | _(screenshot)_ |

---

## ✨ Fitur

- 🌗 **Dark Mode / Light Mode** — Toggle via CSS `:checked` (tanpa JS)
- 🎨 **Desain Premium** — Gradient brand, shadow halus, tipografi Inter
- 📊 **Grafik Batang** — Pure CSS dengan tooltip nilai saat hover
- 🍩 **Donut Chart** — Menggunakan `conic-gradient()`
- 📋 **Tabel Customer** — Hover state dan status pill berwarna
- 📱 **Fully Responsive** — Desktop, tablet, dan mobile
- ♿ **Aksesibel** — `aria-label`, `role="img"` pada chart, `prefers-reduced-motion`
- 🚀 **Zero Dependency** — Tidak perlu npm, bundler, atau framework

---

## 📁 Struktur Project

jcrm-dashboard/
├── index.html # Markup HTML
├── styles.css # Semua styling
└── README.md # Dokumentasi ini



---

## 🚀 Cara Menjalankan

### Opsi 1 — Buka langsung di browser
1. Clone atau unduh repository ini.
2. Klik dua kali `index.html`.
3. Selesai. 🎉

### Opsi 2 — Live Server (VSCode)
1. Install ekstensi **Live Server**.
2. Klik kanan `index.html` → **Open with Live Server**.
3. Browser terbuka di `http://127.0.0.1:5500`.

### Opsi 3 — Python HTTP Server
```bash
cd jcrm-dashboard
python -m http.server 8000