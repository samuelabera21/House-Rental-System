 # 🚨 TEAM WORKFLOW GUIDE (MANDATORY)

## 🎯 Goal

Every task in Jira must be linked to GitHub work:

➡ Branch → Commit → Push → Pull Request → Review → Merge

---

## 🔁 1. BEFORE STARTING WORK

✅ Step 1: Pick a Jira Task

• Go to Jira backlog
• Select your assigned task (e.g. HS-4)
• Click “Start Progress”

---

## 🌿 2. CREATE BRANCH (VERY IMPORTANT)

🔹 Rule:
Branch name MUST include Jira ID

✅ Format:
feature/JIRA-ID-short-description

✅ Examples:
feature/HS-1-navbar
feature/HS-4-renter-dashboard
feature/HS-6-house-list

✅ Commands:
```bash
git checkout dev
git pull origin dev
git checkout -b feature/HS-4-renter-dashboard
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
HS-ID: short message

✅ Examples:
```bash
git add .
git commit -m "HS-4: create renter dashboard UI layout"
```

🚨 WRONG:
```bash
git commit -m "dashboard done"
```

---

## 🚀 5. PUSH YOUR CODE

```bash
git push origin feature/HS-4-renter-dashboard
```

## 🔁 6. CREATE PULL REQUEST (PR)

Go to GitHub → Click Compare & Pull Request

## 🏷 PR TITLE FORMAT (MANDATORY)

[HS-ID] Feature Name

✅ Example:
[HS-4] Renter Dashboard UI Implementation

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
HS-5 Search Page UI

Steps:

```bash
git checkout dev
git pull origin dev
git checkout -b feature/HS-5-search-page

# do work

git add .
git commit -m "HS-5: create search page UI with filters"
git push origin feature/HS-5-search-page
```

Then:

• Create PR:
[HS-5] Search Page UI Implementation

## 🎯 FINAL NOTE (VERY IMPORTANT)

This workflow ensures:

• 🔗 Jira ↔ GitHub connection
• 👥 Team collaboration
• 🧼 Clean codebase
• 🚀 Real-world engineering practice
