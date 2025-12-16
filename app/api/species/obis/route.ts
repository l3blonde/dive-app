import { NextResponse } from "next/server"

// OBIS API endpoint for species occurrence data
// Example: https://api.obis.org/occurrence?scientificname=Manta%20birostris&size=100
export async function GET(request: Request) {
    const { searchParams } = new URL(request.url)
    const scientificName = searchParams.get("scientificName")
    const bounds = searchParams.get("bounds") // Format: "minLng,minLat,maxLng,maxLat"
    const size = searchParams.get("size") || "50"

    if (!scientificName) {
        return NextResponse.json({ error: "Scientific name is required" }, { status: 400 })
    }

    try {
        const params = new URLSearchParams({
            scientificname: scientificName,
            size: size,
        })

        // Add bounding box if provided (limits results to visible map area)
        if (bounds) {
            params.append("geometry", `POLYGON((${bounds}))`)
        }

        const response = await fetch(`https://api.obis.org/occurrence?${params.toString()}`, {
            headers: {
                Accept: "application/json",
            },
            // Cache for 1 hour since occurrence data updates occasionally
            next: { revalidate: 3600 },
        })

        if (!response.ok) {
            console.error("[OBIS API] Error:", response.statusText)
            return NextResponse.json({ error: "Failed to fetch from OBIS" }, { status: response.status })
        }

        const data = await response.json()

        // Transform OBIS results to our format
        const occurrences =
            data.results?.map((record: any) => ({
                id: record.id,
                scientificName: record.scientificName,
                decimalLatitude: record.decimalLatitude,
                decimalLongitude: record.decimalLongitude,
                depth: record.depth,
                date: record.eventDate,
                datasetName: record.datasetName,
                occurrenceStatus: record.occurrenceStatus,
            })) || []

        return NextResponse.json({
            total: data.total || 0,
            occurrences: occurrences,
        })
    } catch (error) {
        console.error("[OBIS API] Fetch error:", error)
        return NextResponse.json({ error: "Internal server error" }, { status: 500 })
    }
}
