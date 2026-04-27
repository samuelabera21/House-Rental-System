# 🧱 TEAM STRUCTURE (4 PEOPLE TOTAL)

• 👑 You (Lead + Core Features)
• 👤 Member 1 (Auth + Landing UI support)
• 👤 Member 2 (Renter Module)
• 👤 Member 3 (Owner + Admin Module)

## 🌿 BRANCHING STRATEGY (STRICT RULE)

### 🔹 Branch Types

Every branch must follow this format:

feature/JIRA-ID-short-description

Examples:

• feature/HS-1-navbar
• feature/HS-2-login-ui
• feature/HS-7-renter-dashboard
• feature/HS-12-owner-listings

### 🔹 Main Branch Rules

• main → stable only
• dev → integration branch (optional but recommended)

👉 Flow:

feature → dev → main

## 🧾 COMMIT RULE (MANDATORY)

Every commit MUST include JIRA ID:

• HS-2: create login form UI
• HS-7: add renter dashboard layout

## 🔁 PULL REQUEST RULE

Title format:

[HS-2] Login Page UI Implementation

Description must include:

• What was done
• Screenshots (if UI)
• Any notes

## 🎨 UI RULES (VERY IMPORTANT)

Everyone MUST follow:

### Colors:

• Primary → #2563eb
• Success → Green
• Error → Red

### UI:

• Tailwind only
• Card-based layout
• Mobile responsive
• Reusable components

## 📦 TASK DISTRIBUTION

### 👤 MEMBER 1 — AUTH + LANDING SUPPORT

Branches:

• feature/HS-1-navbar
• feature/HS-2-login-page
• feature/HS-3-register-page

Tasks:

• Improve Navbar
• Login UI (form, validation UI only)
• Register UI (with role select)
• Connect navigation (Login/Register buttons)

👉 Small + safe + foundational

### 👤 MEMBER 2 — RENTER MODULE

Branches:

• feature/HS-4-renter-dashboard
• feature/HS-5-search-page
• feature/HS-6-house-list

Tasks:

• Renter Dashboard UI
• Search page with filters UI
• House listing cards page

👉 Reuse HouseCard component

### 👤 MEMBER 3 — OWNER + ADMIN (LIGHT VERSION)

Branches:

• feature/HS-7-owner-dashboard
• feature/HS-8-add-listing
• feature/HS-9-admin-dashboard

Tasks:

• Owner dashboard UI
• Add listing form UI
• Simple admin dashboard (stats cards only)

### 👑 TEAM LEAD

Branches:

• feature/HS-10-layout-system
• feature/HS-11-routing-structure
• feature/HS-12-ui-consistency

Tasks:

• Fix layout (Navbar + Footer global)
• Ensure routing structure is clean
• Review PRs
• Maintain UI consistency
• Merge branches

## 📁 FOLDER RULE (NO MESS)

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

## ⚠️ DAILY WORKFLOW (VERY IMPORTANT)

Each member MUST:

1. Pull latest code

```bash
git pull origin dev
```

2. Create branch

```bash
git checkout -b feature/HS-4-renter-dashboard
```

3. Work → Commit

```bash
git add .
git commit -m "HS-4: create renter dashboard UI"
```

4. Push

```bash
git push origin feature/HS-4-renter-dashboard
```

5. Create Pull Request → dev

## 🚨 STRICT RULES (WRITE THIS IN README)

• No direct push to main
• No large PRs (max 1 feature per PR)
• Always use JIRA ID
• UI must follow design system
• Reuse components — don’t duplicate
• PR must be reviewed before merge
