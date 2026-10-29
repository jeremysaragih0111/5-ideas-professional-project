# JCRM Dashboard

CRM Dashboard premium dengan **HTML + CSS murni** — tanpa JavaScript.

## Cara Menjalankan

1. Letakkan semua file sesuai struktur:
Novacrm-dashboard/
├── index.html
└── css/
├── variables.css
├── base.css
├── layout.css
├── components.css
├── tabs-filter.css
└── responsive.css


2. Buka `index.html` di browser modern (Chrome, Firefox, Safari, Edge).
3. Tidak perlu build step, server, atau npm install.

## Fitur Interaktif (CSS-Only)

| Fitur | Teknik CSS |
|-------|-----------|
| Dark / Light Mode | `#theme-toggle:checked ~ .app` override variabel |
| Tab Switching | Radio `:checked ~ .panel-container` |
| Filter Leads | Radio `:checked ~ .table-wrap .row-item:not(.r-*)` |
| Modal | `:target` pada `.modal-overlay` |

## Struktur CSS

- **variables.css** — design token & tema
- **base.css** — reset, tipografi, utilitas
- **layout.css** — topbar, sidebar, main, stat grid
- **components.css** — button, card, table, deal, contact, modal
- **tabs-filter.css** — logika tab & filter
- **responsive.css** — media queries

## Catatan

Data yang tampil adalah **data demo statis** — tidak ada backend atau API nyata.