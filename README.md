# Seafolio - Dive Site Explorer

**Ocean's 4 Team - Thomas More, Final Product Project, Proof of Concept (POC) for an interactive map feature**

Live app: https://dive-app-omega.vercel.app

## About This Project

This is our final project for the Ocean's team course.
And this is our TechDesign Proof of Concept (POF) for
Seafolio, an all-in-one app for divers 
We wanted to test the feature of an interactive map that shows
dive sites and marine species you can find there for our Seafolio app.
The idea was to help divers plan their dives and learn about
the marine life they might encounter.

## What We Built

- Interactive map using Mapbox API (with geolocation so you can see dive sites near you)
- Database of dive sites with marine species information
- Marine species browser with filters
- Flip cards that show detailed info about each species and dive sites
- Search & filter functionality to find dive sites

## Our Journey (aka what went wrong and right)

Initially we wanted to connect to existing dive site APIs to get real data,
but most of them were either really bad quality
or cost money that we didn't have as students.
None provided global coverage with consistent quality data.
So we had to change our approach.
We ended up creating our own database using information from
dive atlases and guide books.
For the marine species data, we connected to:
- **WoRMS (World Register of Marine Species)** to get the AphiaID for each species
- **OBIS (Ocean Biodiversity Information System)** to get occurrence data and validate species information

It took way longer than expected to structure the database
properly and connect everything, but it works now!

**APIs we looked at:**
1)**The Dive API** (17,000 dive sites via RapidAPI)
Has a free trial but then requires paid subscription.
The free tier on RapidAPI is limited to 100-1000 requests/month
which wouldn't be enough for our project
2)**Divesites API** (publicapis.io listing)
Found it listed as a "public API" but when we tried to test it,
we couldn't get reliable access or documentation.
3)**Navionics Web API**
This is mainly for nautical charts and boating, requires developer approval from Garmin,
and is designed more for navigation than dive site information specifically
4)**PADI Dive Sites**
They have 4,734 dive sites on their website but no public API.
You can only browse them on their interactive map, can't pull the data programmatically
5)**ScubaTribe, Diveboard**
We found mentions of these but couldn't find working public APIs
and they had very limited coverage (like Caribbean only)
6)**OpenSeaMap**
Open source project but it's focused on depth data and nautical charts,
not dive site locations and marine life

## Tech Stack

- Next.js 16 (App Router)
- TypeScript
- Supabase (PostgreSQL database)
- Mapbox GL JS
- Tailwind CSS v4
- React 19
- WoRMS API
- OBIS API

## Features

- **Map View**
- **Marine Species Mode**
- **Dive Sites Mode**
- **Search & Filters**
- **Species Details**
- **Responsive Design**

## Known Issues & Future Improvements

- List view of map feature
- Expand dive sites database
- Expand marine species db
- Improve & test search and filter features
- Would be cool to add other markers like the ones for dive trips and dive lessons in the future
- Would be cool to add user reviews or dive logs in the future
- Authentication system is basic, could use more features like home page could start from other screen with:
1. search bar and "Find Sites Near You" button;
2. Top Dive Destinations
3. Top Dive Sites
4. Trips From Community
5. Discover Species Categories
6. Popular Species
7. Di you know?
4. Explore Activities (diving, scuba-diving, freediving, snorkelling)
5. Download our app
6. Header & Footer of the website

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

## Team

Ocean's 4 Team - Thomas More, 2025

## Acknowledgments

- Dive atlas references for site data
- WoRMS for species taxonomy
- OBIS for species occurrence data
- Mapbox for the mapping platform
- Our teachers for guidance (and patience when things broke :)

---

This project taught us a lot about working with APIs, databases, and building a real application from scratch.
It's not perfect but we're proud of what we built!
