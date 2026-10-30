# JProMan — Project Management SaaS (UI Demo)

> **JProMan** adalah antarmuka web *Project Management SaaS* premium dengan tema **Dark (elegan, modern, kontras)** dan **Light Mode (bersih, minimalis, profesional)** — dibangun **sepenuhnya dengan HTML + CSS murni**, tanpa JavaScript, tanpa build tools, dan tanpa backend.

![Status](https://img.shields.io/badge/status-demo-blueviolet)
![HTML](https://img.shields.io/badge/HTML5-E34F26?logo=html5&logoColor=white)
![CSS](https://img.shields.io/badge/CSS3-1572B6?logo=css3&logoColor=white)
![No JavaScript](https://img.shields.io/badge/JavaScript-none-yellow)

---

## ✨ Fitur Utama

- 🌗 **Dual Theme** — Dark Mode (elegan, kontras tinggi) & Light Mode (bersih, minimalis) yang bisa diganti via CSS-only toggle.
- 🧭 **Multi-Halaman Terhubung** — Semua fitur punya file HTML terpisah namun tetap saling terhubung lewat sidebar navigasi.
- 📊 **Dashboard** — Statistik, progres project, aktivitas terbaru, tabel tugas mendatang.
- 📁 **Projects** — Grid kartu project dengan progres, status, deadline, dan avatar tim.
- 🗂️ **Project Detail + Kanban** — Board Kanban (To Do / In Progress / Done), daftar tim, dan milestone.
- ✅ **Tasks** — Tabel tugas lengkap dengan prioritas, status, assignee, dan deadline.
- 👥 **Team** — Kartu anggota tim dengan role, statistik project & task.
- ⚙️ **Settings** — Profil, preferensi notifikasi, workspace, dan zona berbahaya.
- 🔐 **Login** — Halaman autentikasi demo (kredensial terisi otomatis).
- 📱 **Fully Responsive** — Layout adaptif untuk desktop, tablet, dan mobile.
- 🎨 **Design System** — Variabel CSS terpusat untuk warna, radius, shadow, dan transisi.

---

## 🖥️ Teknologi

| Teknologi | Keterangan |
|-----------|------------|
| **HTML5** | Struktur semantik & form native |
| **CSS3** | Variabel, Grid, Flexbox, `:has()`, `:checked`, `:focus-within`, animasi transisi |
| **Google Fonts** | Inter (400–800) |
| **SVG Inline** | Semua ikon dibuat dengan SVG inline (tanpa library) |
| ❌ **JavaScript** | **Tidak digunakan sama sekali** |
| ❌ **Backend/API** | **Tidak ada** — semua data adalah data demo statis |

---

## 📁 Struktur File

jproman/
├── README.md
├── JProMan.html # Dashboard utama
├── login.html # Halaman login
├── projects.html # Daftar project
├── project-detail.html # Detail project + Kanban board
├── tasks.html # Daftar tugas
├── team.html # Anggota tim
├── settings.html # Pengaturan akun & workspace
└── css/
├── JProMan.css # Design token, variabel tema, reset, tipografi
└── layout.css # Layout app shell, komponen, theme engine, responsif



---

## 🚀 Cara Menjalankan

Tidak perlu instalasi, build, atau server khusus.

### Opsi 1 — Buka langsung di browser
1. Download/clone folder project.
2. Buka file **`login.html`** atau **`JProMan.html`** langsung dengan double-click.

### Opsi 2 — Local server (opsional)
```bash
# Menggunakan Python
python -m http.server 8000

# Atau menggunakan Node.js
npx serve .