# House Rental Management System (Frontend)

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
