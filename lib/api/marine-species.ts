import type { MarineSpecies } from "@/lib/types"
import { MARINE_SPECIES_LIST } from "@/lib/data/marine-species"

/**
 * Fetch marine species from local data and OBIS/WoRMS APIs
 * Combines local curated data with external taxonomic information
 */
export async function fetchMarineSpecies(): Promise<MarineSpecies[]> {
    try {
        // For now, return local data
        // When ready, enhance with OBIS/WoRMS data via:
        // const obisData = await fetch("/api/species/obis")
        // const wormsData = await fetch("/api/species/worms")
        
        return MARINE_SPECIES_LIST
    } catch (error) {
        console.warn("[fetchMarineSpecies] Error fetching species:", error)
        return MARINE_SPECIES_LIST
    }
}

/**
 * Fetch a single marine species by ID
 */
export async function fetchMarineSpeciesById(id: string): Promise<MarineSpecies | null> {
    const species = await fetchMarineSpecies()
    return species.find(s => s.id === id) || null
}

/**
 * Search marine species by common name or scientific name
 */
export async function searchMarineSpecies(query: string): Promise<MarineSpecies[]> {
    const species = await fetchMarineSpecies()
    const lowerQuery = query.toLowerCase()
    
    return species.filter(s =>
        s.common_name.toLowerCase().includes(lowerQuery) ||
        s.scientific_name.toLowerCase().includes(lowerQuery) ||
        (s.description?.toLowerCase().includes(lowerQuery) ?? false)
    )
}

/**
 * Filter marine species by category or habitat
 */
export async function filterMarineSpecies(options: {
    category?: string
    habitat?: string
    conservation_status?: string
}): Promise<MarineSpecies[]> {
    const species = await fetchMarineSpecies()
    
    return species.filter(s => {
        if (options.category && s.category !== options.category) {
            return false
        }
        if (options.habitat && !(s.habitat?.includes(options.habitat) ?? false)) {
            return false
        }
        if (options.conservation_status && s.conservation_status !== options.conservation_status) {
            return false
        }
        return true
    })
}

/**
 * Get species by dive site ID (species observed at that site)
 * This will query species_observations table when Supabase is integrated
 */
export async function getSpeciesByDiveSite(diveSiteId: string): Promise<MarineSpecies[]> {
    try {
        const response = await fetch(`/api/dive-sites/${diveSiteId}/species`)
        if (!response.ok) {
            return []
        }
        return await response.json()
    } catch (error) {
        console.warn(`[getSpeciesByDiveSite] Error fetching species for site ${diveSiteId}:`, error)
        return []
    }
}
