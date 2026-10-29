# NOVA Analytics Dashboard

Premium SaaS analytics dashboard built with React, Vite, CSS, Recharts, and Lucide icons.

## Requirements
- Node.js 18+ (Node.js 20+ recommended)
- npm

## Run locally
1. Extract the ZIP file.
2. Open a terminal in the `nova-analytics-dashboard` folder.
3. Install dependencies:
   ```bash
   npm install
   ```
4. Start the development server:
   ```bash
   npm run dev
   ```
5. Open the local URL shown by Vite (typically `http://localhost:5173`).

## Production build
```bash
npm run build
npm run preview
```

## Project structure
```text
nova-analytics-dashboard/
├── index.html
├── package.json
├── README.md
└── src/
    ├── main.jsx
    ├── App.jsx
    └── styles.css
```

## Demo interactions
- Switch chart period: 7 days, 30 days, 12 months.
- Search campaign names/channels.
- Filter campaigns by status.
- Toggle campaign Active/Paused by clicking its status pill or row action.
- Export currently visible campaign rows as CSV.
- Open notifications and Help Center modal.
- Responsive mobile sidebar.

## Important limitations
This is a front-end prototype. The metrics and campaigns are static/demo data held in the React component. Campaign status changes only in the current browser session and are not saved to a database. There is no backend/API, authentication, account connection, real-time analytics integration, billing, or real report generation. Buttons marked as demo show a toast rather than performing backend actions. Google Fonts require an internet connection; system fallback fonts are provided.
