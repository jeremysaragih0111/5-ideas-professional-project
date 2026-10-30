# WeProMan — Project Management SaaS UI

A responsive, multi-page project management workspace concept built with **HTML5 and CSS3 only**. There is no JavaScript, package manager, framework, build step, backend, or API.

## Pages

- `WeProMan.html` — workspace overview, KPI cards, project health, project focus, activity feed
- `projects.html` — project directory, project cards, project setup form preview
- `tasks.html` — Kanban-style task board and quick task form preview
- `calendar.html` — October 2026 calendar and upcoming events
- `team.html` — team directory and invitation form preview
- `reports.html` — delivery performance, project distribution, and workload reports
- `css/style.css` — shared design tokens, components, themes, and responsive layout

## Run locally

1. Extract the project folder.
2. Keep the file and folder names unchanged.
3. Open `index.html` in a modern browser.
4. Use the sidebar navigation to move between pages.
5. Use the moon/sun control in the top bar to switch the current page between light and dark themes.

No local server is required. You may also serve the folder with any static file server if preferred.

## CSS-only interactions

- Sidebar links navigate between the separate HTML pages.
- The theme control uses a native checkbox and CSS `:has()` selector; it changes the appearance of the current page without JavaScript.
- `<details>` panels expand and collapse the project setup, quick task, and team invitation previews.
- Native checkboxes on the task board can be checked visually.
- Anchor links jump to page sections.

## Important limitations

This deliverable is a **UI-only prototype** as requested. It deliberately contains no JavaScript. Therefore:

- Theme selection is not persisted when navigating to another HTML page or refreshing.
- Search boxes, filter chips, sort selectors, and report period selectors are visual controls only; they do not filter or query data.
- Demo forms are previews only. They do not submit, create records, send invitations, or save data.
- Task checkboxes only change their checked appearance in the browser; they do not update a data store.
- All names, projects, KPI values, chart bars, calendar events, and report values are illustrative sample data.
- There is no authentication, collaboration service, database, API, real-time sync, or cloud storage.

## Design

Brand: **WeProMan**

Visual direction: elegant dark mode, clean light mode, restrained violet branding, cool neutral surfaces, clear contrast, and responsive layouts for desktop, tablet, and mobile.

The theme control uses the CSS `:has()` selector, supported by current versions of major modern browsers. Google Fonts are loaded from an external font service; if unavailable, the layout falls back to system sans-serif fonts.
