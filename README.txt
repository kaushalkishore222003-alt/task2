========================================================================
SYNCROTASK - TEAM TASK MANAGER (EDITORIAL EDITION)
========================================================================

SyncroTask is a professional-grade SaaS task management platform designed 
with an "Editorial Aesthetic" — leveraging high-end typography, 
spacious layouts, and a "Vanguard" design philosophy.

------------------------------------------------------------------------
PROJECT OVERVIEW
------------------------------------------------------------------------
This is a full-featured frontend implementation built with:
- React 19 + Vite
- TypeScript
- Tailwind CSS 4.0
- Framer Motion (for smooth transitions)
- React Router DOM 7
- Lucide Icons
- Recharts (configured for analytics)
- Zustand (State Management)

------------------------------------------------------------------------
FOLDER STRUCTURE
------------------------------------------------------------------------
src/
  ├── components/       # Reusable UI components (Buttons, Cards, Modals)
  ├── layouts/          # Auth and Dashboard layout wrappers
  ├── pages/            # Page-level components
  │   ├── auth/         # Login, Signup, Forgot Password
  │   ├── dashboard/    # Main overview
  │   ├── projects/     # Listing and Detail views
  │   └── ...           # Tasks, Kanban, Analytics, Team, etc.
  ├── routes/           # Centralized routing configuration
  ├── types/            # Global TypeScript definitions
  ├── utils/            # Helper functions (cn utility, etc.)
  └── index.css         # Theme tokens and global styles

------------------------------------------------------------------------
DESIGN PHILOSOPHY
------------------------------------------------------------------------
- Typography: Inter (Sans) for UI, Playfair Display (Serif) for headings.
- Color Palette: Primary Dark (#064E3B), Primary Light (#DCFCE7), Ink (#111827).
- Shadows: Custom soft elevation shadows for an airy, premium feel.
- Animations: Staggered entrance, spring-based transitions, and glassmorphism.

------------------------------------------------------------------------
HOW TO RUN
------------------------------------------------------------------------
1. Install dependencies:
   npm install

2. Start the development server:
   npm run dev

3. Build for production:
   npm run build

------------------------------------------------------------------------
CURRENT STATUS (PHASE 1 COMPLETE)
------------------------------------------------------------------------
- [x] Responsive Sidebar & Navigation
- [x] Editorial Theme Implementation
- [x] Landing Page (Hero, Features, CTAs)
- [x] Authentication UI (Login Page)
- [x] Dashboard Overview (Killed KPIs, Recent Projects, Velocity)
- [x] Routing for 15+ subpages configured

------------------------------------------------------------------------
AUTHOR
------------------------------------------------------------------------
