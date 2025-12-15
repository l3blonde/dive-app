// Type definitions for dive site data structures
// These interfaces define the shape of data we get from the database

// DiveSite interface: defines structure of dive site records (used in dive-map.tsx)
export interface DiveSite {
    id: string
    name: string
    atoll: string
    location_name: string
    latitude: number
    longitude: number
    min_depth: number
    max_depth: number
    difficulty: "beginner" | "intermediate" | "advanced"
    description: string
    best_season: string
    created_at?: string
    image_url?: string
}

// MarineSpecies interface: defines structure of species records (for future use)
export interface MarineSpecies {
    id: string
    common_name: string
    scientific_name: string
    aphia_id: number | null
    category: string
    icon_name: string
}

// Additional interfaces for future use

// WeatherData interface: defines structure of weather records
export interface WeatherData {
    id: string
    dive_site_id: string
    date: Date
    temperature: number
    wind_speed: number
    visibility: string
}

// DiveLog interface: defines structure of dive log records
export interface DiveLog {
    id: string
    dive_site_id: string
    diver_id: string
    date: Date
    duration: number
    species_seen: string[]
    notes: string
}

export interface AutocompleteResult {
    id: string
    name: string
    type: "Country" | "City" | "Dive Site"
    icon: "globe" | "building" | "pin"
    location?: string
    subtitle?: string
    coordinates?: {
        longitude: number
        latitude: number
    }
    zoom?: number
}
