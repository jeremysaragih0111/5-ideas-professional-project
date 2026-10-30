/* ============================================================
   JProYMana · Demo Data (in-memory only, no backend)
   ============================================================ */

(function () {
  "use strict";

  const projects = [
    {
      id: "p1",
      name: "Website Redesign",
      status: "In Progress",
      team: "Design",
      due: "2026-06-15",
      progress: 62,
    },
    {
      id: "p2",
      name: "Mobile App v2",
      status: "In Progress",
      team: "Engineering",
      due: "2026-07-01",
      progress: 45,
    },
    {
      id: "p3",
      name: "Q1 Marketing Campaign",
      status: "Completed",
      team: "Marketing",
      due: "2026-03-31",
      progress: 100,
    },
    {
      id: "p4",
      name: "Data Warehouse Migration",
      status: "On Hold",
      team: "Data",
      due: "2026-08-20",
      progress: 22,
    },
    {
      id: "p5",
      name: "Customer Portal Revamp",
      status: "In Progress",
      team: "Engineering",
      due: "2026-09-10",
      progress: 58,
    },
    {
      id: "p6",
      name: "Brand Guidelines Refresh",
      status: "Completed",
      team: "Design",
      due: "2026-02-10",
      progress: 100,
    },
  ];

  const tasks = [
    { id: "t1", title: "Design login screen", projectId: "p1", status: "todo", assignee: "Yudha M." },
    { id: "t2", title: "Wireframe homepage", projectId: "p1", status: "inprogress", assignee: "Ayu L." },
    { id: "t3", title: "Set up design tokens", projectId: "p1", status: "done", assignee: "Yudha M." },
    { id: "t4", title: "Auth flow implementation", projectId: "p2", status: "inprogress", assignee: "Rizky S." },
    { id: "t5", title: "Push notification service", projectId: "p2", status: "todo", assignee: "Bayu P." },
    { id: "t6", title: "App icon variants", projectId: "p2", status: "done", assignee: "Ayu L." },
    { id: "t7", title: "Copy landing page", projectId: "p3", status: "done", assignee: "Citra N." },
    { id: "t8", title: "Asset migration script", projectId: "p4", status: "todo", assignee: "Rizky S." },
    { id: "t9", title: "Stakeholder review", projectId: "p5", status: "inprogress", assignee: "Citra N." },
  ];

  const team = [
    { id: "u1", name: "Yudha M.", role: "Product Lead", initials: "YM" },
    { id: "u2", name: "Ayu L.", role: "Senior Designer", initials: "AL" },
    { id: "u3", name: "Rizky S.", role: "Full-stack Engineer", initials: "RS" },
    { id: "u4", name: "Bayu P.", role: "Mobile Engineer", initials: "BP" },
    { id: "u5", name: "Citra N.", role: "Marketing Lead", initials: "CN" },
    { id: "u6", name: "Damar W.", role: "Data Analyst", initials: "DW" },
  ];

  const activities = [
    { user: "Ayu L.", action: "updated the homepage wireframe", time: "12 min ago", initials: "AL" },
    { user: "Rizky S.", action: "moved Auth flow to In Progress", time: "48 min ago", initials: "RS" },
    { user: "Citra N.", action: "completed Copy landing page", time: "2 hours ago", initials: "CN" },
    { user: "Yudha M.", action: "created project Website Redesign", time: "Yesterday", initials: "YM" },
  ];

  const stats = [
    { icon: "fa-folder-open", value: 6, label: "Active Projects", trend: "+2 this month", trendDir: "up" },
    { icon: "fa-list-check", value: 9, label: "Open Tasks", trend: "-3 from last week", trendDir: "up" },
    { icon: "fa-users", value: 6, label: "Team Members", trend: "Stable", trendDir: "up" },
    { icon: "fa-circle-check", value: 87, label: "Completion Rate (%)", trend: "+4.2%", trendDir: "up" },
  ];

  window.JProData = {
    projects,
    tasks,
    team,
    activities,
    stats,
    getProjectById(id) {
      return projects.find((p) => p.id === id);
    },
    addProject(project) {
      projects.unshift(project);
      return project;
    },
    addTask(task) {
      tasks.unshift(task);
      return task;
    },
    updateTaskStatus(taskId, status) {
      const task = tasks.find((t) => t.id === taskId);
      if (task) task.status = status;
      return task;
    },
  };
})();