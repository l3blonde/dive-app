import type { DiveSite } from "@/lib/types"
import { FALLBACK_DIVE_SITES } from "@/lib/data/dive-sites"

/**
 * Fetch dive sites from Supabase
 * Falls back to local data if fetch fails
 */
export async function fetchDiveSites(): Promise<DiveSite[]> {
    try {
        // Try to fetch from Supabase via API route (when connected)
        const response = await fetch("/api/dive-sites", { 
            cache: "revalidate",
            next: { revalidate: 3600 } // Cache for 1 hour
        })
        
        if (!response.ok) {
            console.warn("[fetchDiveSites] API request failed, using fallback data")
            return FALLBACK_DIVE_SITES
        }
        
        const data = await response.json()
        return data.sites || FALLBACK_DIVE_SITES
    } catch (error) {
        console.warn("[fetchDiveSites] Error fetching from Supabase:", error)
        return FALLBACK_DIVE_SITES
    }
}

/**
 * Fetch a single dive site by ID
 */
export async function fetchDiveSiteById(id: string): Promise<DiveSite | null> {
    const sites = await fetchDiveSites()
    return sites.find(site => site.id === id) || null
}

/**
 * Search dive sites by name or location
 */
export async function searchDiveSites(query: string): Promise<DiveSite[]> {
    const sites = await fetchDiveSites()
    const lowerQuery = query.toLowerCase()
    
    return sites.filter(site => 
        site.name.toLowerCase().includes(lowerQuery) ||
        site.location_name.toLowerCase().includes(lowerQuery) ||
        site.region.toLowerCase().includes(lowerQuery)
    )
}

/**
 * Filter dive sites by criteria
 */
export async function filterDiveSites(options: {
    difficulty?: string[]
    minDepth?: number
    maxDepth?: number
    region?: string
    rating?: number
}): Promise<DiveSite[]> {
    const sites = await fetchDiveSites()
    
    return sites.filter(site => {
        if (options.difficulty && !options.difficulty.includes(site.difficulty)) {
            return false
        }
        if (options.minDepth !== undefined && site.max_depth < options.minDepth) {
            return false
        }
        if (options.maxDepth !== undefined && site.min_depth > options.maxDepth) {
            return false
        }
        if (options.region && !site.region.includes(options.region)) {
            return false
        }
        if (options.rating !== undefined && (site.rating || 0) < options.rating) {
            return false
        }
        return true
    })
}
