## admin dashboard :

Organize files like this:

src/
├── api/                  # API calls (axios)
│   └── api.js
├── components/ # Reusable UI
│   ├── layout/     # Header, Sidebar, Footer
│   └── ui/         # Cards, Charts, Tables
│   │   ├── StatsCard.js
│   │   ├── DashboardChart.js
│   │   └── DataTable.js
├── pages/                # Main views
│   ├── Dashboard.js
│   ├── Users.js
│   └── Login.js
│   ├── Users.js
│   └── Settings.js
├── context/              # Auth state
│   └── AuthContext.js
├── styles/               # Global CSS
│   └── global.css
└── App.js



