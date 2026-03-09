# Seafolio - Dive App

**Ocean's 4 Team - Thomas More, Final Product Project**

Live app: https://dive-app-omega.vercel.app

# Dive App - Frontend

A mobile-first dive trip planning application built with Next.js. Users can explore dive sites on an interactive map, browse dive trips, discover marine species, and save favorites to personal dive plans, log their dives, and much more. 


## About This Project

Seafolio, an all-in-one app for beginner and hobby divers. 
The idea is to help divers plan their dives and learn about
the marine life they might encounter.

## What We Built

- Interactive map using Mapbox API (with geolocation so you can see dive sites near you)
- Database of dive sites with marine species information
- Marine species browser with filters
- Flip cards that show detailed info about each species and dive sites
- Search & filter functionality to find dive sites

## Tech Stack

- Next.js 16 (App Router)
- TypeScript
- Supabase (PostgreSQL database)
- Mapbox GL JS
- Tailwind CSS v4
- React 19

## Environment Variables Needed

If you want to run this locally:

```
NEXT_PUBLIC_MAPBOX_TOKEN=your_mapbox_token
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
DATABASE_URL=your_database_connection_string
```

## Running Locally

```bash
npm install
npm run dev
```

Open http://localhost:3000 in your browser.

---

