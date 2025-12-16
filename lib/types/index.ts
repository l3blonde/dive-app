// Type definitions for dive site data structures
// These interfaces define the shape of data we get from the database

// DiveSite interface: defines structure of dive site records (used in dive-map.tsx)
export interface DiveSite {
    id: string
    name: string
    region: string
    location_name: string
    latitude: number
    longitude: number
    min_depth: number
    max_depth: number
    difficulty: "beginner" | "intermediate" | "advanced"
    description: string
    best_season: string
    local_name?: string
    country?: string
    marine_life?: string // JSON string array of species names like '["whale-shark","manta-ray"]'
    rating?: number
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
    image_url: string
    description?: string
    conservation_status?: string
    habitat?: string
    best_months?: string
    size?: string
    distinctive_features?: string
    behavior?: string
    diet?: string
    did_you_know?: string
    faqs?: Array<{
        question: string
        answer: string
    }>
    created_at?: string
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

// SpeciesBrowserProps interface: defines props for species browser component
export interface SpeciesBrowserProps {
    species: MarineSpecies[]
    onSpeciesSelect: (species: MarineSpecies) => void
    selectedSpeciesId?: string
    onClose: () => void
    onFavorite: (speciesId: string) => void
    favorites: string[]
}
