import type { DiveTrip } from "@/components/trips/dive-trip-card"
import { MOCK_DIVE_TRIPS } from "@/lib/data/dive-trips"

/**
 * Fetch dive trips from Supabase
 * Falls back to local mock data until Supabase table is ready
 */
export async function fetchDiveTrips(): Promise<DiveTrip[]> {
    try {
        // Try to fetch from Supabase via API route (when connected)
        const response = await fetch("/api/dive-trips", { 
            cache: "revalidate",
            next: { revalidate: 3600 }
        })
        
        if (!response.ok) {
            console.warn("[fetchDiveTrips] API request failed, using local data")
            return MOCK_DIVE_TRIPS
        }
        
        const data = await response.json()
        return data.trips || MOCK_DIVE_TRIPS
    } catch (error) {
        console.warn("[fetchDiveTrips] Error fetching from Supabase:", error)
        return MOCK_DIVE_TRIPS
    }
}

/**
 * Fetch a single dive trip by ID
 */
export async function fetchDiveTripById(id: string): Promise<DiveTrip | null> {
    const trips = await fetchDiveTrips()
    return trips.find(trip => trip.id === id) || null
}

/**
 * Search dive trips by name or location
 */
export async function searchDiveTrips(query: string): Promise<DiveTrip[]> {
    const trips = await fetchDiveTrips()
    const lowerQuery = query.toLowerCase()
    
    return trips.filter(trip =>
        trip.name.toLowerCase().includes(lowerQuery) ||
        trip.location?.toLowerCase().includes(lowerQuery) ||
        trip.type.toLowerCase().includes(lowerQuery)
    )
}

/**
 * Filter dive trips by criteria
 */
export async function filterDiveTrips(options: {
    type?: string[]
    difficulty?: string[]
    startDate?: Date
    endDate?: Date
    rating?: number
}): Promise<DiveTrip[]> {
    const trips = await fetchDiveTrips()
    
    return trips.filter(trip => {
        if (options.type && !options.type.includes(trip.type)) {
            return false
        }
        if (options.difficulty && trip.difficulty && !options.difficulty.includes(trip.difficulty)) {
            return false
        }
        if (options.startDate && new Date(trip.start_date) < options.startDate) {
            return false
        }
        if (options.endDate && new Date(trip.end_date) > options.endDate) {
            return false
        }
        if (options.rating !== undefined && (trip.rating || 0) < options.rating) {
            return false
        }
        return true
    })
}
