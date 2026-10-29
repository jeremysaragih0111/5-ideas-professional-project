# AgentTaskFlow-AI — Premium Dark UI

Project frontend statis (HTML + CSS saja) yang menampilkan UI task manager bertema **Dark Premium**.
Tidak ada backend, database, JavaScript interaktif, maupun fungsionalitas nyata — ini murni tampilan.

## Struktur
AgentTaskFlow-AI/
├── index.html
├── css/
│ ├── reset.css
│ ├── variables.css
│ ├── base.css
│ ├── layout.css
│ ├── components.css
│ └── responsive.css
└── README.md

## Cara Menjalankan

1. **Langsung buka file**  
   Klik dua kali `AgentTaskFlow-ai.html` — project akan terbuka di browser.

2. **Atau via local server** (opsional, disarankan)
   ```bash
   cd `AgentTaskFlow-ai.html`
   python3 -m http.server 5500
Buka http://localhost:5500.

3. **Atau klik kanan pada file `AgentTaskFlow-ai.html`** --> pilih dan klik **open with Live Server**
## 🎨 Ringkasan Desain

| Elemen | Detail |
|---|---|
| Tema | Dark premium (deep black + violet/cyan glow) |
| Font | Inter + Space Grotesk (Google Fonts) |
| Efek | Glassmorphism card, gradient glow, backdrop blur |
| Komponen | Stat card, progress bar, task list, AI insight, bar chart, team list |
| Responsive | 4 breakpoint (1280 / 1024 / 768 / 480 px) |
| Aksesibilitas | Focus-visible outline, `prefers-reduced-motion` |

> ⚠️ Semua fitur bersifat **statis**. Tidak ada backend, autentikasi, penyimpanan, atau AI sungguhan yang dijalankan — sesuai permintaan agar tidak mengklaim fitur yang belum dibuat.