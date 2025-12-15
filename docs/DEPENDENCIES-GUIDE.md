# Essential Dependencies Guide - Seafolio Dive App

Complete guide to all dependencies used in this project with installation commands, version checking, and detailed explanations.

---

## Quick Install All Dependencies

\`\`\`bash
npm install
\`\`\`

his installs everything from package.json.
But for learning, here's each dependency explained individually:

---

## Core Framework & Runtime

### 1. Next.js 16

**What it is:** React meta-framework for building full-stack web applications

**Install:**
\`\`\`bash
npm install next@16.0.7
\`\`\`

**Check version:**
\`\`\`bash
npm list next
\`\`\`

**Why it's great:**
- Server Components (render on server, reduce JavaScript sent to browser)
- Server Actions (call backend functions without API routes)
- Built-in routing (file-based, no need for React Router)
- Image optimization, font optimization, performance built-in
- Turbopack bundler (faster than Webpack)

**Why we chose it:**
- All-in-one solution (frontend + backend in one framework)
- Best for academic projects (impressive, modern, fast development)
- Vercel deployment is free and instant
- Latest React 19 features built-in

**Features we need:**
- API routes for database queries
- Server Components for dive site data
- Client Components for interactive map
- File-based routing for pages

**How we use it:**
- `app/page.tsx` - Main map page
- `app/api/*` - API endpoints
- Server Actions for database operations

**Is it new in 2025?**
- Next.js 16 released December 2024
- Uses cutting-edge React 19.2 (released January 2025)
- Turbopack stable (new in 2025)
- Cache Components feature (new in 2025)

---

### 2. React 19.2

**What it is:** JavaScript library for building user interfaces

**Install:**
\`\`\`bash
npm install react@19.2.0 react-dom@19.2.0
\`\`\`

**Check version:**
\`\`\`bash
npm list react
\`\`\`

**Why it's great:**
- Component-based architecture (reusable UI pieces)
- Virtual DOM (fast updates)
- Hooks for state management
- Server Components support
- useEffectEvent (new in 19)

**Why we chose it:**
- Industry standard for interactive UIs
- Huge ecosystem of libraries
- Perfect for maps and interactive elements
- Works seamlessly with Next.js

**Features we need:**
- useState for managing dive sites data
- useEffect for fetching data on load
- Components for map, markers, popups

**How we use it:**
- `components/dive-map.tsx` - Interactive map component
- React hooks for state management
- Client-side interactivity

**Is it new in 2025?**
- React 19.2 released January 2025
- Includes React Compiler support
- useEffectEvent hook (stable in 19)
- Activity component for UI state

---

### 3. TypeScript 5

**What it is:** JavaScript with type safety (catches errors before runtime)

**Install:**
\`\`\`bash
npm install --save-dev typescript@^5
\`\`\`

**Check version:**
\`\`\`bash
npx tsc --version
\`\`\`

**Why it's great:**
- Catches bugs during development, not production
- Autocomplete in IDE (knows what properties exist)
- Self-documenting code (types explain what data looks like)
- Refactoring is safer

**Why we chose it:**
- Required for academic project quality
- Prevents "undefined is not a function" errors
- Better developer experience in WebStorm
- Industry best practice

**Features we need:**
- Interface definitions (DiveSite type)
- Type checking for database queries
- Props validation for components

**How we use it:**
- `lib/types.ts` - Type definitions
- All `.tsx` files use TypeScript
- Ensures database data matches expected structure

**Is it new in 2025?**
- TypeScript 5.x released 2023, stable and mature
- Not new, but industry standard

---

## Database & Backend

### 4. Supabase Client (@supabase/supabase-js)

**What it is:** Client library for Supabase (PostgreSQL database as a service)

**Install:**
\`\`\`bash
npm install @supabase/supabase-js@2.87.1
\`\`\`

**Check version:**
\`\`\`bash
npm list @supabase/supabase-js
\`\`\`

**Why it's great:**
- PostgreSQL database with simple API
- Real-time subscriptions (data updates live)
- Built-in authentication
- Row Level Security (users can't access others' data)
- Free tier: 500MB database, 1GB storage

**Why we chose it:**
- Free for academic projects
- PostGIS support for geographic queries
- Easy setup (no server configuration)
- Built-in auth (for future user features)

**Features we need:**
- `.from('dive_sites').select('*')` - Query dive sites
- Geographic queries with PostGIS
- Future: User favorites, dive logs

**How we use it:**
- `lib/supabase.ts` - Supabase client setup
- `components/dive-map.tsx` - Fetch dive sites on load
- Future: Save favorites, add dive logs

**Is it new in 2025?**
- Supabase launched 2020, mature platform
- Version 2.x stable since 2023
- Not new, but best-in-class

---

## Maps & Geographic Data

### 5. Mapbox GL JS

**What it is:** JavaScript library for interactive, customizable maps

**Install:**
\`\`\`bash
npm install mapbox-gl@3.17.0
\`\`\`

**Check version:**
\`\`\`bash
npm list mapbox-gl
\`\`\`

**Why it's great:**
- Vector maps (smooth zooming, no pixelation)
- Custom styling (we control every color, icon)
- 3D terrain support
- Offline map caching
- Free tier: 50,000 map loads/month

**Why we chose it:**
- Best map rendering quality
- Custom dive site markers (numbered circles)
- Can add bathymetry (ocean depth) layers
- Industry standard for custom maps

**Features we need:**
- Display Maldives map centered on North Malé Atoll
- Custom markers (numbered circles for dive sites)
- Popups on marker click
- Future: Dive site clusters, custom symbology

**How we use it:**
- `components/dive-map.tsx` - Map rendering
- Custom marker style (blue circles with numbers)
- Popups showing dive site details

**Is it new in 2025?**
- Mapbox GL v3 released 2023
- Mature, stable platform
- Not new, industry standard

---

### 6. React Map GL

**What it is:** React wrapper for Mapbox GL (makes Mapbox work nicely with React)

**Install:**
\`\`\`bash
npm install react-map-gl@8.1.0
\`\`\`

**Check version:**
\`\`\`bash
npm list react-map-gl
\`\`\`

**Why it's great:**
- React components for map elements (`<Map>`, `<Marker>`, `<Popup>`)
- Hooks for map interaction
- Automatic cleanup (removes map when component unmounts)
- TypeScript support

**Why we chose it:**
- Simplifies Mapbox integration with React
- Better state management
- Cleaner code than vanilla Mapbox GL
- Maintained by Uber (production-ready)

**Features we need:**
- `<Map>` component with Mapbox style
- `<Marker>` for dive site locations
- `<Popup>` for showing dive details
- Click handlers for interactivity

**How we use it:**
- Wraps Mapbox GL in React components
- Handles map state (viewport, zoom level)
- Manages marker rendering

**Is it new in 2025?**
- Version 8.x released 2024
- Active development, modern hooks API
- Not new, but actively maintained

---

### 7. @types/mapbox-gl

**What it is:** TypeScript type definitions for Mapbox GL

**Install:**
\`\`\`bash
npm install --save-dev @types/mapbox-gl
\`\`\`

**Check version:**
\`\`\`bash
npm list @types/mapbox-gl
\`\`\`

**Why it's great:**
- Adds autocomplete for Mapbox functions
- Prevents typos in Mapbox API calls
- Shows what properties are available

**Why we chose it:**
- Required for TypeScript projects using Mapbox
- Better developer experience
- Catches errors early

**Features we need:**
- Type safety for map configuration
- Marker type definitions
- Event handler types

**How we use it:**
- Automatically used by TypeScript
- Provides types in components/dive-map.tsx

**Is it new in 2025?**
- Community-maintained types, always updated
- Not a new concept

---

## Styling & UI Components

### 8. Tailwind CSS 4.1

**What it is:** Utility-first CSS framework (style with classes, not CSS files)

**Install:**
\`\`\`bash
npm install tailwindcss@^4.1.9
\`\`\`

**Check version:**
\`\`\`bash
npx tailwindcss --help | head -n 1
\`\`\`

**Why it's great:**
- No writing CSS files (use classes like `bg-blue-500`, `p-4`)
- Consistent design system
- Responsive design built-in (`md:grid-cols-2`)
- Very small CSS output (only used classes included)

**Why we chose it:**
- Fastest way to style modern UIs
- Industry standard
- Perfect for rapid prototyping
- Consistent spacing, colors

**Features we need:**
- Layout classes (`flex`, `grid`)
- Spacing (`p-4`, `mt-2`)
- Colors (`bg-blue-500`, `text-white`)
- Responsive design (`md:`, `lg:` prefixes)

**How we use it:**
- All component styling
- Map marker styling
- Popup styling

**Is it new in 2025?**
- Tailwind v4 released December 2024
- New CSS-first architecture
- Lightning-fast build times
- YES, cutting-edge 2025 technology

---

### 9. Lucide React

**What it is:** Icon library with 1000+ SVG icons as React components

**Install:**
\`\`\`bash
npm install lucide-react@^0.454.0
\`\`\`

**Check version:**
\`\`\`bash
npm list lucide-react
\`\`\`

**Why it's great:**
- Clean, consistent icon design
- Tree-shakeable (only import icons you use)
- Customizable (change size, color, stroke width)
- TypeScript support

**Why we chose it:**
- Best modern icon library
- Comes with Next.js v0 projects
- Future icons: heart (favorites), filter, search, waves

**Features we need:**
- Heart icon for favorites
- Search icon for search bar
- Filter icon for filters
- Map pin icon (alternative marker)

**How we use it:**
- Future: UI icons throughout app
- Currently: Available when needed

---

## Utility Libraries

### 10. tailwind-merge

**What it is:** Utility for conditionally joining class names

**Install:**
\`\`\`bash
npm install tailwind-merge@^3.3.1
\`\`\`

**Check version:**
\`\`\`bash
npm list tailwind-merge
\`\`\`

**Why it's great:**
- Merges conflicting Tailwind classes correctly

**Why we chose it:**
- Standard in Next.js projects
- Prevents class conflicts

**Features we need:**
- Conditional marker styling (active/inactive dive sites)
- Dynamic difficulty badge colors
- Future: Theme switching

**How we use it:**
- `lib/utils.ts` exports `cn()` helper
- Used throughout components for dynamic classes


## Summary: Why This Tech Stack?

**All-in-one Modern Stack:**
- Next.js 16 + React 19.2 (cutting-edge 2025 framework)
- TypeScript 5 (type safety)
- Tailwind CSS 4 (fastest styling, new in 2025)
- Supabase + PostgreSQL (free database with PostGIS)
- Mapbox GL + React Map GL (best map library)

**2025 Technologies Used:**
- Next.js 16 (December 2024) ✅
- React 19.2 (January 2025) ✅
- Tailwind CSS v4 (December 2024) ✅
- React Compiler support ✅

**Perfect for academic project because:**
- Impressive tech stack (shows you know modern tools)
- Fast development (finish in weeks, not months)
- Production-ready (not just a prototype)
- Free hosting and database
- Easy to demo

---

## Quick Verification Commands

**Check all installed packages:**
\`\`\`bash
npm list --depth=0
\`\`\`

**Check outdated packages:**
\`\`\`bash
npm outdated
\`\`\`

**Remove unused packages:**
\`\`\`bash
npm prune
\`\`\`

---

## Installation Order (From Scratch)

If starting from zero, install in this order:

\`\`\`bash
# 1. Create Next.js project
npx create-next-app@latest seafolio-dive-app --typescript --tailwind --app

cd seafolio-dive-app

# 2. Install map dependencies
npm install mapbox-gl react-map-gl
npm install --save-dev @types/mapbox-gl

# 3. Install database client
npm install @supabase/supabase-js

# 4. Install type definitions (if missing)
npm install --save-dev @types/react @types/react-dom @types/node

# 5. Verify everything is installed
npm list --depth=0
\`\`\`

---

## Troubleshooting

**If TypeScript can't find modules:**
1. Restart WebStorm TypeScript service: Cmd+Shift+A → "Restart TypeScript Service"
2. Delete `node_modules` and reinstall: `rm -rf node_modules && npm install`
3. Clear Next.js cache: `rm -rf .next`

**If npm install fails:**
1. Check Node.js version: `node --version` (should be 18.x or higher)
2. Clear npm cache: `npm cache clean --force`
3. Try again: `npm install`

**If map doesn't load:**
1. Check .env.local has correct Mapbox token
2. Verify token starts with `pk.`
3. Check browser console for errors (F12)


