# lib/ Directory Structure Guide

## Why lib/ Exists

The `lib/` directory holds all the business logic, data utilities,
and helper functions that power our dive app.
We separate these from components to keep code organised, reusable, and testable.
Lib/ is like the engine room while components/ is the user-facing deck.

## Directory Structure Breakdown

\`\`\`
lib/
├── data/               # Static data and curated content
│   └── marine-species.ts
├── db/                 # Database connection setup
│   └── client.ts
├── types/              # TypeScript type definitions
│   └── index.ts
└── utils/              # Helper functions
├── cn.ts
└── dive-site.ts
\`\`\`

---

## 1. lib/data/marine-species.ts

**Purpose:** Here we will store the curated list of marine species visible at dive sites.

**Why it exists:** We manually curated 48 marine species from dive atlases, PADI guides,
and Wikipedia and connected them to AphiaID for taxonomy lookup, World Register of Marine Species (WoRMS) API.
This gives us full control over species data quality.

### Code Translation:

\`\`\`typescript
export interface MarineSpecies {
id: string                    // Unique identifier like "whale-shark"
name: string                  // Common name like "Whale Shark"
category: "coral" | "crustacean" | "fish" | "shark" | "ray" | "other"  // Species type
scientificName?: string       // Latin name like "Rhincodon typus" (from WoRMS API)
description?: string          // Species behaviour and characteristics
habitat?: string              // Where it lives and depth range
bestMonths?: string           // Best time to see it at dive sites
imageUrl?: string             // Species photo URL from Vercel Blob storage
aphiaId?: number              // WoRMS AphiaID for taxonomy lookups
}
\`\`\`

**Explanation:**
- `id`: Used for matching species in database JSON arrays
- `name`: Displayed to users in flip cards and popups
- `category`: Groups species by type for filtering (sharks, rays, fish, coral, etc.)
- `scientificName`: Latin binomial name fetched from WoRMS API for scientific accuracy
- `description`: Detailed information about behaviour, appearance, and diving tips
- `habitat`: Preferred depth ranges and reef zones
- `bestMonths`: Seasonal migration patterns (important for whale sharks, mantas, hammerheads)
- `imageUrl`: High-quality underwater photos stored in Vercel Blob (CDN-delivered globally), we could also move Cloudflare CDN later
- `aphiaId`: Links to World Register of Marine Species database for taxonomy data

**WoRMS Integration:**
- WoRMS (World Register of Marine Species) provides authoritative marine taxonomy
- Each species has unique AphiaID used to fetch scientific names, classification, and images
- We call `/api/species/worms?name=Whale Shark` to get taxonomy data
- This ensures scientifically accurate species information

\`\`\`typescript
export const MARINE_SPECIES_LIST: MarineSpecies[] = [
{
id: "whale-shark",
name: "Whale shark",
category: "shark",
scientificName: "Rhincodon typus",
description: "Largest fish in the world, filter-feeding giant reaching 12m+ in length.",
habitat: "Open water near reef drop-offs, 1-100m depth",
bestMonths: "March-June, September-November",
imageUrl: "https://xu5qaaigiohvkyk8.public.blob.vercel-storage.com/species-placeholder.png",
},
// ... 47 more species
]
\`\`\`

---

## 2. lib/db/client.ts

**Purpose:** Creates Supabase database connection that components use to fetch dive sites.

**Why it exists:** Centralizes database configuration so we don't duplicate connection code across files.

### Code Translation:

\`\`\`typescript
import { createClient } from "@supabase/supabase-js"
\`\`\`
**Translation:** Import Supabase's JavaScript library that handles database queries.

\`\`\`typescript
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
\`\`\`
**Translation:**
- Read environment variables from `.env.local` file
- `NEXT_PUBLIC_` prefix means these variables work in browser code
- `supabaseUrl`: Supabase project URL
- `supabaseAnonKey`: Public API key for read-only database access

\`\`\`typescript
if (!supabaseUrl || !supabaseAnonKey) {
throw new Error(
"Missing Supabase environment variables. Please create .env.local file..."
)
}
\`\`\`
**Translation:**
- Check if environment variables exist
- If missing, throw helpful error message
- Prevents silent failures when `.env.local` file is missing

\`\`\`typescript
export const supabase = createClient(supabaseUrl, supabaseAnonKey)
\`\`\`
**Translation:**
- Create Supabase client instance using URL and key
- Export it so other files can import and use it
- Used in components/dive-map.tsx: `import { supabase } from "@/lib/db/client"`

**Functions used:**
- `createClient()`: Supabase function that establishes database connection

---

## 3. lib/types/index.ts

**Purpose:** Defines TypeScript interfaces that describe the shape of our data.
The manual dive site database of over 50 sites

**Why it exists:** TypeScript catches bugs by checking data types.
These interfaces ensure database responses match expected structure.
We manually curated 50+ dive sites worldwide from dive atlases, PADI guides,
and Wikipedia because we experimented with third-party dive site APIs
but they turned out to be either unreliable or expensive.
This gives us full control over species data quality.

### Code Translation:

\`\`\`typescript
export interface DiveSite {
id: string                    // UUID from database
name: string                  // Dive site name like "SS Thistlegorm"
region: string                // Geographic region like "Sinai Peninsula"
location_name: string         // Display location like "Red Sea, Egypt"
latitude: number              // GPS coordinate for map positioning
longitude: number             // GPS coordinate for map positioning
min_depth: number             // Minimum depth in meters
max_depth: number             // Maximum depth in meters
difficulty: "beginner" | "intermediate" | "advanced"  // Skill level required
description: string           // Full site description
best_season: string           // Best months to dive
local_name?: string           // Native language name (optional)
country?: string              // Country name (optional)
marine_life?: string          // JSON string array of species (optional)
rating?: number               // Star rating out of 5 (optional)
created_at?: string           // When record was created (optional)
image_url?: string            // Site photo URL (optional)
}
\`\`\`

**Explanation:**
- Matches database table schema exactly
- `?` means optional field (might be null in database)
- `marine_life` stores JSON string like `'["whale-shark","manta-ray"]'`
- Used throughout app to type-check dive site data

\`\`\`typescript
export interface MarineSpecies {
id: string                    // Species identifier
common_name: string           // Name like "Whale Shark"
scientific_name: string       // Latin name like "Rhincodon typus"
aphia_id: number | null       // WoRMS database ID (for future API integration)
category: string              // Fish, coral, ray, shark, etc.
icon_name: string             // Emoji or icon identifier
}
\`\`\`

**Explanation:**
- Defines structure for species stored in database (future feature)
- `aphia_id` will link to WoRMS API for taxonomy data
- Currently using curated list from marine-species.ts instead

\`\`\`typescript
export interface AutocompleteResult {
id: string
name: string
type: "Country" | "City" | "Dive Site"
icon: "globe" | "building" | "pin"
location?: string
subtitle?: string
coordinates?: { longitude: number; latitude: number }
zoom?: number
}
\`\`\`

**Explanation:**
- Used by search bar autocomplete dropdown
- Shows countries, cities, and dive sites as search results
- Icons indicate result type visually

---

## 4. lib/utils/cn.ts

**Purpose:** Combines CSS class names intelligently using Tailwind utilities.

**Why it exists:** Tailwind classes can conflict (e.g., `p-4 p-2` only applies one).
This function merges them correctly.

### Code Translation:

\`\`\`typescript
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
\`\`\`
**Translation:**
- `clsx`: Package for conditionally joining class names
- `twMerge`: Package that resolves Tailwind class conflicts

\`\`\`typescript
export function cn(...inputs: ClassValue[]) {
return twMerge(clsx(inputs))
}
\`\`\`
**Translation:**
- Takes any number of class name arguments
- `clsx()` combines them into single string
- `twMerge()` deduplicates and resolves conflicts
- Returns final clean class string

**Example usage:**
\`\`\`typescript
// In a component:
cn("p-4", "bg-blue-500", someCondition && "text-white")
// Returns: "p-4 bg-blue-500 text-white" (if someCondition is true)

cn("p-4", "p-2")  // Returns: "p-2" (later class wins)
\`\`\`

**Functions used:**
- `clsx()`: Conditionally joins class names, filters falsy values
- `twMerge()`: Merges Tailwind classes, removing conflicts

---

## 5. lib/utils/dive-site.ts

**Purpose:** Helper functions for dive site display logic.

**Why it exists:** Keeps icon selection logic out of components for reusability.

### Code Translation:

\`\`\`typescript
export function getDifficultyIcon(difficulty: string): string {
switch (difficulty.toLowerCase()) {
case "beginner":
return "🏊"        // Swimmer emoji for easy dives
case "intermediate":
return "🤿"        // Diver emoji for moderate dives
case "advanced":
return "⚓"         // Anchor emoji for challenging dives
default:
return "🏊"        // Fallback to swimmer if unknown
}
}
\`\`\`

**Translation:**
- Takes difficulty level string as input
- Converts to lowercase to handle case variations
- Returns appropriate emoji icon
- Default case handles unexpected values gracefully

**Usage example:**
\`\`\`typescript
// In dive-site-flip-card.tsx:
<span>{getDifficultyIcon(site.difficulty)}</span>
// Displays: 🤿 for intermediate sites
\`\`\`

**Functions used:**
- `toLowerCase()`: JavaScript string method converting to lowercase
- `switch/case`: JavaScript control flow for multiple conditions

---

## How We Built Our Own Dive Site Database

### The Problem

We researched existing dive site APIs and databases:
- **DiveSpots API** - Shut down in 2022
- **ScubaTribe API** - Only covers Caribbean, requires paid subscription
- **Diveboard API** - Rate-limited, missing major sites in Asia-Pacific
- **PADI Dive Site Locator** - Not available as public API

None provided global coverage with consistent quality data, so we built our own.

### Our Solution

We manually curated 51 world-class dive sites from authoritative sources:
- **Dive atlases:** "Dive Atlas of The World" by Jack Jackson, "World's Best Dives" by Carrie Miller
- **Dive books:**  50 Places to Dive Before You Die, Chris Santella, Lonely Planet Diving & Snorkeling guides, Dive Maldives by Tim Godfrey
- **Wikipedia:** Verified dive site articles with citations and marine species
- **PADI manuals:** Regional dive site recommendations
- **Dive magazines:** Scuba Diving Magazine's Top 100 Readers Choice Awards

### Database Schema for Supabase

We created the `dive_sites` table in Supabase with this SQL:

\`\`\`sql
CREATE TABLE dive_sites (
id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
name TEXT NOT NULL,
region TEXT NOT NULL,
location_name TEXT NOT NULL,
latitude NUMERIC NOT NULL,
longitude NUMERIC NOT NULL,
min_depth INTEGER NOT NULL,
max_depth INTEGER NOT NULL,
difficulty TEXT NOT NULL CHECK (difficulty IN ('beginner', 'intermediate', 'advanced')),
description TEXT NOT NULL,
best_season TEXT NOT NULL,
local_name TEXT,
country TEXT,
marine_life TEXT,
rating NUMERIC,
image_url TEXT,
created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
\`\`\`

**Schema explanation:**
- `id`: Auto-generated unique identifier for each site
- `name`: English name of dive site (e.g., "SS Thistlegorm")
- `region`: Geographic area (e.g., "Sinai Peninsula", "North Malé Atoll")
- `location_name`: Display-friendly location (e.g., "Red Sea, Egypt")
- `latitude/longitude`: GPS coordinates for map markers
- `min_depth/max_depth`: Depth range in meters for dive planning
- `difficulty`: Skill level with database constraint ensuring valid values
- `description`: Full site details with marine life and features
- `best_season`: Optimal diving months
- `local_name`: Native language name (e.g., "Trou aux Biches" → French, a dive site at Mauritius)
- `country`: Country name for filtering and grouping
- `marine_life`: JSON text storing species array like `'["soft-coral","manta-ray"]'`
- `rating`: Star rating out of 5.0 based on dive quality
- `image_url`: Link to site photo (currently using placeholders)
- `created_at`: Timestamp for record tracking

**Why JSON for marine_life:**
- Supabase doesn't have native array columns in free tier
- Text column with JSON string works across all plans
- Easy to parse in JavaScript: `JSON.parse(site.marine_life)`
- Flexible - can add species without schema changes

### Data Quality Process

1. **Research phase:** Found 50+ potential sites from dive atlases
2. **Verification:** Cross-referenced with Wikipedia and dive operator reviews
3. **Selection:** Chose 50+ iconic sites representing all major diving regions
4. **Data entry:** Manually input coordinates, depths, marine life
5. **Quality check:** Verified GPS coordinates match Google Maps
6. **Testing:** Ensured all sites display correctly on Mapbox

### Marine Species Integration

For each dive site, we documented common species encounters:
- Read dive atlases and operator websites for species lists
- Cross-referenced with underwater photography galleries
- Matched common names to our curated species list (marine-species.ts)
- Stored as JSON array in `marine_life` column

**Example:**
\`\`\`sql
INSERT INTO dive_sites (..., marine_life, ...) VALUES
(..., 'Tiger Sharks, Lemon Sharks, Caribbean Reef Sharks, Nurse Sharks', ...);
\`\`\`

This lets us show species icons on flip cards and enable filtering by marine life.

### Future Enhancements

Phase 2 integrate external APIs:
- **WoRMS API:** Fetch scientific names and taxonomy for species
- **OBIS API:** Get species occurrence data for map locations
- **User-generated content:** Let divers submit sightings and photos

But for MVP, our manually curated database provides reliable, high-quality dive site information without API dependencies or costs.
Later, we can continue to expand our dive sites database or connect to external paid APIs.
We could also build partnership with PADI.

---

## Summary

The `lib/` directory provides the foundation for our dive app:
- **data/**: Curated marine species list (48 species)
- **db/**: Supabase connection for fetching dive sites
- **types/**: TypeScript interfaces ensuring type safety
- **utils/**: Helper functions for class names and icons

We built our own dive site database because existing APIs were inadequate,
giving us 50+ world-class sites with verified data from authoritative dive sources.
The Supabase schema stores site details, GPS coordinates,
and marine life as JSON for flexible species tracking.
