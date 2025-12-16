import { NextResponse } from "next/server"

// WoRMS API endpoint for species taxonomy lookup
// Example: https://www.marinespecies.org/rest/AphiaRecordsByName/Manta%20birostris
export async function GET(request: Request) {
    const { searchParams } = new URL(request.url)
    const name = searchParams.get("name")

    if (!name) {
        return NextResponse.json({ error: "Species name is required" }, { status: 400 })
    }

    try {
        const encodedName = encodeURIComponent(name)
        const response = await fetch(
            `https://www.marinespecies.org/rest/AphiaRecordsByName/${encodedName}?like=true&marine_only=true`,
            {
                headers: {
                    Accept: "application/json",
                },
                // Cache for 7 days since taxonomy doesn't change often
                next: { revalidate: 604800 },
            },
        )

        if (!response.ok) {
            console.error("[WoRMS API] Error:", response.statusText)
            return NextResponse.json({ error: "Failed to fetch from WoRMS" }, { status: response.status })
        }

        const data = await response.json()

        // WoRMS returns an array, get the first valid result
        const validResult = Array.isArray(data) ? data.find((record: any) => record.status === "accepted") || data[0] : data

        return NextResponse.json({
            aphiaId: validResult?.AphiaID,
            scientificName: validResult?.scientificname,
            authority: validResult?.authority,
            status: validResult?.status,
            rank: validResult?.rank,
            kingdom: validResult?.kingdom,
            phylum: validResult?.phylum,
            class: validResult?.class,
            order: validResult?.order,
            family: validResult?.family,
            genus: validResult?.genus,
            isMarine: validResult?.isMarine,
            isBrackish: validResult?.isBrackish,
            isFreshwater: validResult?.isFreshwater,
            isTerrestrial: validResult?.isTerrestrial,
            isExtinct: validResult?.isExtinct,
        })
    } catch (error) {
        console.error("[WoRMS API] Fetch error:", error)
        return NextResponse.json({ error: "Internal server error" }, { status: 500 })
    }
}
