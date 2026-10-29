
window.CRM_DEMO_DATA = {
  contacts: [
    {
      id: 1, name: "Olivia Rhye",
      email: "olivia@orbitdesign.co",
      company: "Orbit Design",
      role: "Creative Director",
      status: "Active",
      lastContact: "Today",
      deal: 12400,
      initials: "OR", color: "#e8e3ff", ink: "#6654c8"
    },
    {
      id: 2, name: "Phoenix Baker",
      email: "phoenix@luminous.io",
      company: "Luminous",
      role: "Product Manager",
      status: "Lead",
      lastContact: "Today",
      deal: 8200,
      initials: "PB", color: "#ffe8d9", ink: "#b46c36"
    },
    {
      id: 3, name: "Lana Steiner",
      email: "lana@layers.app",
      company: "Layers",
      role: "VP of Marketing",
      status: "Active",
      lastContact: "Yesterday",
      deal: 18600,
      initials: "LS", color: "#dff5ed", ink: "#278b6d"
    },
    {
      id: 4, name: "Demi Wilkinson",
      email: "demi@catalog.com",
      company: "Catalog",
      role: "Operations Lead",
      status: "Inactive",
      lastContact: "Oct 23, 2026",
      deal: 3400,
      initials: "DW", color: "#fce4ed", ink: "#bc527d"
    },
    {
      id: 5, name: "Candice Wu",
      email: "candice@circooles.com",
      company: "Circooles",
      role: "Growth Manager",
      status: "Active",
      lastContact: "Oct 22, 2026",
      deal: 15200,
      initials: "CW", color: "#dceeff", ink: "#397ab7"
    },
    {
      id: 6, name: "Natali Craig",
      email: "natali@quotient.co",
      company: "Quotient",
      role: "Founder",
      status: "Lead",
      lastContact: "Oct 21, 2026",
      deal: 6800,
      initials: "NC", color: "#f9e9d4", ink: "#a9772f"
    },
    {
      id: 7, name: "Drew Cano",
      email: "drew@hourglass.app",
      company: "Hourglass",
      role: "Sales Director",
      status: "Active",
      lastContact: "Oct 20, 2026",
      deal: 22500,
      initials: "DC", color: "#e4e6ff", ink: "#6269b7"
    },
    {
      id: 8, name: "Orlando Diggs",
      email: "orlando@command.co",
      company: "Command+R",
      role: "Account Executive",
      status: "Lead",
      lastContact: "Oct 19, 2026",
      deal: 7150,
      initials: "OD", color: "#e2f4e5", ink: "#418454"
    }
  ],

  pipeline: [
    { label: "Lead", value: 23600, color: "#a59afc" },
    { label: "Qualified", value: 21050, color: "#7565e9" },
    { label: "Proposal", value: 22800, color: "#4a9de8" },
    { label: "Negotiation", value: 16800, color: "#49c3a1" }
  ],

  activities: [
    {
      icon: "↗",
      text: "Olivia Rhye moved a deal to Negotiation",
      time: "12 minutes ago"
    },
    {
      icon: "♙",
      text: "Alexandra added Phoenix Baker",
      time: "48 minutes ago"
    },
    {
      icon: "✉",
      text: "Lana Steiner replied to your email",
      time: "2 hours ago"
    },
    {
      icon: "▤",
      text: "You added a note to Orbit Design",
      time: "Yesterday"
    }
  ],

  tasks: [
    {
      id: 1, title: "Follow up with Olivia Rhye",
      detail: "Orbit Design · Deal follow-up",
      done: false
    },
    {
      id: 2, title: "Prepare proposal for Luminous",
      detail: "Phoenix Baker · Proposal",
      done: false
    },
    {
      id: 3, title: "Review Q4 pipeline",
      detail: "Sales team · Internal",
      done: false
    },
    {
      id: 4, title: "Send recap to Layers",
      detail: "Lana Steiner · Email",
      done: true
    }
  ],

  chart: {
    "7": [22, 28, 24, 36, 31, 43, 39],
    "30": [19, 25, 22, 34, 29, 43, 37, 47, 41, 56, 49, 64],
    "90": [14, 21, 18, 28, 25, 35, 30, 43, 38, 48, 44, 57]
  }
};
