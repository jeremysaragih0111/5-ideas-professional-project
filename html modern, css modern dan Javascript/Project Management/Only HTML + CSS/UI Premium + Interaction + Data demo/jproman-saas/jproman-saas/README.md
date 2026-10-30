# JProMan — Project Management SaaS UI

A premium, responsive multi-page project management interface built with **HTML5 and CSS3 only**. There is no JavaScript, framework, build step, or backend.

## Run locally
1. Extract the project folder.
2. Keep the file structure unchanged.
3. Open `index.html` in a modern browser.
4. Use the sidebar to navigate between pages.
5. Use the moon/sun control in the top-right corner to switch the current page between light and dark themes.

## Project structure
```text
jproman-saas/
├── index.html
├── projects.html
├── tasks.html
├── calendar.html
├── team.html
├── reports.html
├── css/
│   └── style.css
└── README.md
```

## Pages
- `index.html` — workspace dashboard and overview metrics
- `projects.html` — project portfolio cards and CSS-only create-project dialog preview
- `tasks.html` — Kanban board and CSS checkbox task checklist
- `calendar.html` — November 2026 calendar and static agenda
- `team.html` — team directory and CSS-only invite dialog preview
- `reports.html` — sample analytics and report definitions

## CSS-only interactions
- Multi-page navigation through ordinary HTML links
- Light/dark theme switch implemented with a checkbox and CSS custom properties
- Mobile navigation drawer implemented with a checkbox and CSS selectors
- Anchor-based dialog previews using `:target`
- Expand/collapse information using `<details>` and `<summary>`
- Task checklist states using native HTML checkboxes
- In-page section links and visual tabs

## Important limitations
This edition is a **UI prototype with static demo data**. Search fields are visual only; project cards cannot be created or edited; task states do not persist or sync; calendar navigation does not calculate other months; report values are illustrative. Forms are previews and do not submit or save. The theme toggle applies on the current page only and resets when another page is opened. No authentication, database, API, cloud sync, notifications, or real SaaS backend is included.

The interface uses Google Fonts when an internet connection is available and falls back to system sans-serif fonts otherwise.
