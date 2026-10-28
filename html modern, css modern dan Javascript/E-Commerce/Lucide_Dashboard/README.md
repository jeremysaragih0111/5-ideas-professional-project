# 🚀 Nimbus Analytics — SaaS Dashboard

Dashboard analytics SaaS premium yang dibangun dengan **React 18 + Vite + CSS murni** (tanpa Tailwind, tanpa UI framework). Dilengkapi tema custom brand (violet + cyan), dark/light mode, chart SVG native, dan interaksi UI lengkap.

> ⚠️ **Frontend only** — tidak ada backend, API, autentikasi nyata, atau database.
> Semua data bersumber dari file demo lokal di `src/data/`.

---

## ✨ Fitur

- 🎨 **Premium UI** — dark & light theme dengan brand palette custom
- 📊 **4 Jenis Chart SVG** — Line, Bar, Donut, Sparkline (tanpa library chart)
- 📱 **Fully Responsive** — desktop, tablet, mobile dengan sidebar drawer
- 🔍 **Pencarian realtime** — filter customer langsung dari topbar
- 🎯 **Filter interaktif** — status customer, rentang waktu analytics
- 🌗 **Theme persistence** — preferensi tema tersimpan di `localStorage`
- 🔔 **Modal + Toast** — feedback interaksi untuk demo report
- 🧩 **Struktur modular** — component / page / data / utils terpisah rapi

---

## 🛠️ Tech Stack

| Layer | Teknologi |
|---|---|
| Framework | React 18 |
| Build Tool | Vite 5 |
| Styling | CSS murni (custom properties) |
| Icons | lucide-react |
| Chart | SVG native (handmade) |
| Font | Inter + Space Grotesk (Google Fonts) |

---

## 📦 Instalasi

### Prasyarat
- **Node.js** ≥ 18 (rekomendasi LTS terbaru)
- **npm** ≥ 9

Cek versi:
```bash
node -v
npm -v

structure file
Lucide_Dashboard/
├── .gitignore
├── Lucide_Dashboard.html
├── package.json
├── vite.config.js
├── README.md
└── src/
    ├── main.jsx                    # Entry point React
    ├── App.jsx                     # Root komponen + routing state
    ├── context/
    │   └── ThemeContext.jsx        # Provider dark/light mode
    ├── data/
    │   ├── revenue.js              # Series revenue demo
    │   ├── users.js                # Data customer demo
    │   ├── traffic.js              # Sumber traffic & device
    │   ├── plans.js                # Distribusi plan
    │   └── activity.js             # Feed aktivitas terbaru
    ├── utils/
    │   └── format.js               # Format currency, number, date
    ├── components/
    │   ├── Sidebar.jsx
    │   ├── Topbar.jsx
    │   ├── StatCard.jsx
    │   ├── LineChart.jsx
    │   ├── BarChart.jsx
    │   ├── DonutChart.jsx
    │   ├── Sparkline.jsx
    │   ├── Table.jsx
    │   ├── ActivityFeed.jsx
    │   ├── Modal.jsx
    │   └── Toast.jsx
    ├── pages/
    │   ├── Dashboard.jsx
    │   ├── Analytics.jsx
    │   ├── Customers.jsx
    │   └── Settings.jsx
    └── styles/
        ├── theme.css               # Design tokens (brand palette)
        ├── global.css              # Reset & base
        ├── layout.css              # Grid & shell layout
        └── components.css          # Semua komponen UI