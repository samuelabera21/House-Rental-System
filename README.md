# House Rental Management System (Frontend)

## Guide Documents

Use these links to open the shared team docs directly:

- [Team Workflow Guide](Guide%20documents/Guied.md)
- [Team Structure](Guide%20documents/Structure.md)
- [UI Structure & Functional Design](Guide%20documents/UI%20structure.md)

## 🚨 TEAM WORKFLOW GUIDE (MANDATORY)

## 🎯 Goal

Every task in Jira must be linked to GitHub work:

➡ Branch → Commit → Push → Pull Request → Review → Merge

---

## 🔁 1. BEFORE STARTING WORK

✅ Step 1: Pick a Jira Task

• Go to Jira backlog
• Select your assigned task (e.g. HOR-4)
• Click “Start Progress”

---

## 🌿 2. CREATE BRANCH (VERY IMPORTANT)

🔹 Rule:
Branch name MUST include Jira ID

✅ Format:
feature/JIRA-ID-short-description

✅ Examples:
feature/HOR-1-navbar
feature/HOR-4-renter-dashboard
feature/HOR-6-house-list

✅ Commands:
```bash
git checkout dev
git pull origin dev
git checkout -b feature/HOR-4-renter-dashboard
```

## 💻 3. DO YOUR WORK

✅ Follow project rules:

• Use Tailwind only
• Use components/ for reusable UI
• Use app/ for pages
• DO NOT create random folders

## 🧾 4. COMMIT (STRICT RULE)

🔹 Every commit MUST include Jira ID

✅ Format:
HOR-ID: short message

✅ Examples:
```bash
git add .
git commit -m "HOR-4: create renter dashboard UI layout"
```

🚨 WRONG:
```bash
git commit -m "dashboard done"
```

---

## 🚀 5. PUSH YOUR CODE

```bash
git push origin feature/HOR-4-renter-dashboard
```

## 🔁 6. CREATE PULL REQUEST (PR)

Go to GitHub → Click Compare & Pull Request

## 🏷 PR TITLE FORMAT (MANDATORY)

[HOR-ID] Feature Name

✅ Example:
[HOR-4] Renter Dashboard UI Implementation

## 📝 PR DESCRIPTION TEMPLATE (COPY THIS)

```md
## ✅ What was done
- Created renter dashboard layout
- Added cards for listings
- Responsive design applied

## 📸 Screenshots
(Add screenshots here)

## 📝 Notes
- UI only (no backend)
- Uses reusable components
```

## 👑 7. TEAM LEAD REVIEW

Before merge, you MUST check:

✅ Checklist:

• ✔ Correct branch name
• ✔ Jira ID in commits
• ✔ UI follows design (#2563eb, cards, responsive)
• ✔ No duplicate components
• ✔ Clean code

## 🔀 8. MERGE RULE

🚨 NEVER merge to main directly

✅ Flow:
feature → dev → main

Commands (after PR approved):

Merge PR → dev

## 🔄 9. AFTER MERGE (VERY IMPORTANT)

Every member MUST update code:

```bash
git checkout dev
git pull origin dev
```

## ⚠️ STRICT TEAM RULES

❌ No direct push to main
❌ No commit without Jira ID
❌ No large PRs (1 feature only)
❌ No duplicate components

✅ Always use:

• Jira ID
• Correct branch naming
• Clean UI rules

## 📦 EXAMPLE FULL FLOW (REAL)

Task:
HOR-5 Search Page UI

Steps:

```bash
git checkout dev
git pull origin dev
git checkout -b feature/HOR-5-search-page

# do work

git add .
git commit -m "HOR-5: create search page UI with filters"
git push origin feature/HOR-5-search-page
```

Then:

• Create PR:
[HOR-5] Search Page UI Implementation

## 🎯 FINAL NOTE (VERY IMPORTANT)

This workflow ensures:

• 🔗 Jira ↔ GitHub connection
• 👥 Team collaboration
• 🧼 Clean codebase
• 🚀 Real-world engineering practice

## Team Structure

The team structure guide is included below for quick reference and also available as [Structure.md](Structure.md).

### 🧱 TEAM STRUCTURE (4 PEOPLE TOTAL)

• 👑 You (Lead + Core Features)
• 👤 Member 1 (Auth + Landing UI support)
• 👤 Member 2 (Renter Module)
• 👤 Member 3 (Owner + Admin Module)

### 🌿 BRANCHING STRATEGY (STRICT RULE)

#### 🔹 Branch Types

Every branch must follow this format:

feature/JIRA-ID-short-description

Examples:

• feature/HOR-1-navbar
• feature/HOR-2-login-ui
• feature/HOR-7-renter-dashboard
• feature/HOR-12-owner-listings

#### 🔹 Main Branch Rules

• main → stable only
• dev → integration branch (optional but recommended)

👉 Flow:

feature → dev → main

### 🧾 COMMIT RULE (MANDATORY)

Every commit MUST include JIRA ID:

• HOR-2: create login form UI
• HOR-7: add renter dashboard layout

### 🔁 PULL REQUEST RULE

Title format:

[HOR-2] Login Page UI Implementation

Description must include:

• What was done
• Screenshots (if UI)
• Any notes

### 🎨 UI RULES (VERY IMPORTANT)

Everyone MUST follow:

#### Colors:

• Primary → #2563eb
• Success → Green
• Error → Red

#### UI:

• Tailwind only
• Card-based layout
• Mobile responsive
• Reusable components

### 📦 TASK DISTRIBUTION

#### 👤 MEMBER 1 — AUTH + LANDING SUPPORT

Branches:

• feature/HOR-1-navbar
• feature/HOR-2-login-page
• feature/HOR-3-register-page

Tasks:

• Improve Navbar
• Login UI (form, validation UI only)
• Register UI (with role select)
• Connect navigation (Login/Register buttons)

👉 Small + safe + foundational

#### 👤 MEMBER 2 — RENTER MODULE

Branches:

• feature/HOR-4-renter-dashboard
• feature/HOR-5-search-page
• feature/HOR-6-house-list

Tasks:

• Renter Dashboard UI
• Search page with filters UI
• House listing cards page

👉 Reuse HouseCard component

#### 👤 MEMBER 3 — OWNER + ADMIN (LIGHT VERSION)

Branches:

• feature/HOR-7-owner-dashboard
• feature/HOR-8-add-listing
• feature/HOR-9-admin-dashboard

Tasks:

• Owner dashboard UI
• Add listing form UI
• Simple admin dashboard (stats cards only)

#### 👑 TEAM LEAD

Branches:

• feature/HOR-10-layout-system
• feature/HOR-11-routing-structure
• feature/HOR-12-ui-consistency

Tasks:

• Fix layout (Navbar + Footer global)
• Ensure routing structure is clean
• Review PRs
• Maintain UI consistency
• Merge branches

### 📁 FOLDER RULE (NO MESS)

Everyone MUST follow:

```text
app/
  (routes only)

components/
  (reusable UI only)

lib/
  (data / helpers)

styles/
  (global styles)
```

• No random folders
• No duplicate components

### ⚠️ DAILY WORKFLOW (VERY IMPORTANT)

Each member MUST:

1. Pull latest code

```bash
git pull origin dev
```

2. Create branch

```bash
git checkout -b feature/HOR-4-renter-dashboard
```

3. Work → Commit

```bash
git add .
git commit -m "HOR-4: create renter dashboard UI"
```

4. Push

```bash
git push origin feature/HOR-4-renter-dashboard
```

5. Create Pull Request → dev

### 🚨 STRICT RULES (WRITE THIS IN README)

• No direct push to main
• No large PRs (max 1 feature per PR)
• Always use JIRA ID
• UI must follow design system
• Reuse components — don’t duplicate
• PR must be reviewed before merge


A production-ready frontend foundation for a role-based rental platform built with Next.js App Router, React, and Tailwind CSS.

## 1. Project Overview

House Rental Management System is designed for three user groups:

- Renters: Search houses, view listings, send rental requests, track status.
- House Owners: Add and manage listings, review and respond to requests.
- Administrators: Manage users and approve listings.

Current scope in this repository:

- Frontend structure setup (team-ready).
- Landing page implementation (Home page UI only).
- Login and Register page placeholders (UI only, no backend).

Backend and API integration are intentionally not implemented yet.

## 2. Tech Stack

- Next.js (App Router)
- React
- Tailwind CSS
- PostCSS + Autoprefixer

## 3. Current Features Implemented

### Landing Page

- Sticky responsive navigation bar.
- Hero section with strong headline and search input.
- Featured houses rendered from reusable dummy data.
- Reusable house cards.
- About section describing system purpose.
- Responsive footer.

### Shared Frontend Foundations

- Central layout wrapping all pages with Navbar + Footer.
- Reusable component structure for scale.
- Global styles with design tokens and responsive behavior.

### Auth Placeholders

- Login page UI scaffold.
- Register page UI scaffold with role selection.

## 4. Design System Notes

Primary color:

- #2563eb

Design direction:

- Clean and minimal
- Card-based content
- Mobile-first responsive layout
- High readability and clear section separation

## 5. Folder Structure

```text
HOR/
  app/
    layout.js
    page.js
    login/
      page.js
    register/
      page.js
  components/
    Navbar.jsx
    Footer.jsx
    HouseCard.jsx
    SearchBar.jsx
  lib/
    dummyData.js
  public/
    images/
  styles/
    globals.css
  jsconfig.json
  next.config.mjs
  package.json
  postcss.config.js
  tailwind.config.js
```

## 6. File-by-File Explanation

### app/layout.js

- Declares root metadata.
- Loads global styles.
- Wraps all pages in a shared shell:
  - Navbar at top
  - Dynamic page content
  - Footer at bottom

### app/page.js

- Home page implementation.
- Uses local state to filter featured houses by location.
- Renders these sections:
  - Hero
  - Featured Houses
  - About
- Uses reusable components: SearchBar and HouseCard.

### app/login/page.js

- Placeholder login form UI:
  - Email
  - Password

### app/register/page.js

- Placeholder registration form UI:
  - Full name
  - Email
  - Password
  - Role select (Renter / House Owner)

### components/Navbar.jsx

- Brand: House Rental System
- Navigation links:
  - Home
  - Login
  - Register

### components/Footer.jsx

- Clean footer with project branding and role-based message.

### components/HouseCard.jsx

- Reusable listing card component.
- Displays:
  - House image
  - Monthly price
  - Location
  - Short description

### components/SearchBar.jsx

- Reusable location search input + submit button.
- Emits query to parent page through callback props.

### lib/dummyData.js

- Provides static featured house data for UI rendering.
- Keeps data separate from view logic for maintainability.

### styles/globals.css

- Tailwind directives.
- Global tokens and utility classes.
- Section-level responsive styling.

## 7. Getting Started

## Prerequisites

- Node.js 18.18+ recommended (Node.js 20+ preferred)
- npm 9+

## Install

```bash
npm install
```

## Run Development Server

```bash
npm run dev
```

Open in browser:

- http://localhost:3000

## Production Build

```bash
npm run build
npm run start
```

## 8. Available Scripts

- npm run dev: Start local development server.
- npm run build: Build production bundle.
- npm run start: Start production server.
- npm run lint: Run Next.js lint command.

## 9. Why This Structure Scales for Teams

- Clear separation of concerns:
  - Routing in app
  - Reusable UI in components
  - Shared/mock data in lib
  - Styling in styles
- Feature growth path is straightforward:
  - Add role-based route groups under app
  - Reuse cards, forms, and layout primitives
  - Replace dummyData with API data source without rewriting UI structure

## 10. Suggested Next Implementation Phases

### Phase 2

- Complete Authentication UX flow (form validation, error states, loading states).
- Add role-based dashboard routes:
  - renter
  - owner
  - admin

### Phase 3

- Listing management pages (add/edit/delete).
- Search filters (price, rooms, location).
- Request flow pages (send, review, status).

### Phase 4

- Admin moderation tools.
- Notifications center.
- Profile settings and media upload flow.

### Phase 5

- Backend/API integration.
- Auth and role guards.
- Real database models and state management.

## 11. Troubleshooting

### npm run dev exits with code 1

Common causes and fixes:

1. You are not inside project directory.

```bash
cd /c/Users/hp/Desktop/HOR
npm run dev
```

2. Port 3000 already in use.

```bash
npx next dev -p 3001
```

3. Corrupted install.

```bash
rm -rf node_modules package-lock.json
npm install
npm run dev
```

4. VS Code diagnostics cache is stale.

- Reload window from Command Palette: Developer: Reload Window

### TypeScript deprecation warning for baseUrl

This project sets this in jsconfig to silence known TS 6 deprecation diagnostics:

- compilerOptions.ignoreDeprecations = "6.0"

## 12. Important Notes

- This repo currently focuses on frontend UI structure and landing experience.
- Forms are non-functional placeholders until backend integration is added.
- Dummy listing images are loaded from remote URLs; local image assets can be added later to public/images.
