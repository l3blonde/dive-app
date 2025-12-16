"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { FilterChips, type FilterOptions } from "./filter-chips"
import { AutocompleteDropdown } from "./autocomplete-dropdown"
import type { AutocompleteResult, DiveSite } from "@/lib/types"

interface SearchBarProps {
    isOpen: boolean
    searchQuery: string
    onSearchChange: (query: string) => void
    onClose: () => void
    filters: FilterOptions
    onFilterChange: (filters: FilterOptions) => void
    resultsCount: number
    showFilters: boolean
    onToggleFilters: () => void
    onReset?: () => void
    allDiveSites: DiveSite[]
    onLocationSelect?: (coordinates: { longitude: number; latitude: number; zoom: number }) => void
    onDiveSiteSelect?: (site: DiveSite) => void
    onSearchExecute?: () => void
}

export function SearchBar({
                              isOpen,
                              searchQuery,
                              onSearchChange,
                              onClose,
                              filters,
                              onFilterChange,
                              resultsCount,
                              showFilters,
                              onToggleFilters,
                              onReset,
                              allDiveSites,
                              onLocationSelect,
                              onDiveSiteSelect,
                              onSearchExecute,
                          }: SearchBarProps) {
    console.log("[v0] SearchBar component rendering")
    const [isMounted, setIsMounted] = useState(false)

    useEffect(() => {
        console.log("[v0] SearchBar mounted")
        setIsMounted(true)
        const timer = setTimeout(() => setIsMounted(true), 100)
        return () => {
            console.log("[v0] SearchBar unmounted")
            clearTimeout(timer)
        }
    }, [])

    const [showAutocomplete, setShowAutocomplete] = useState(false)
    const [locationResults, setLocationResults] = useState<AutocompleteResult[]>([])
    const [isLoadingResults, setIsLoadingResults] = useState(false)
    const [localSearchQuery, setLocalSearchQuery] = useState(searchQuery)

    useEffect(() => {
        if (localSearchQuery.trim().length < 2) {
            setLocationResults([])
            setShowAutocomplete(false)
            return
        }

        setShowAutocomplete(true)
        setIsLoadingResults(true)

        const fetchLocations = async () => {
            try {
                const token = process.env.NEXT_PUBLIC_MAPBOX_TOKEN
                if (!token) {
                    setLocationResults([])
                    setIsLoadingResults(false)
                    return
                }

                const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(localSearchQuery)}.json?access_token=${token}&types=country,region,place&limit=5`

                const response = await fetch(url)

                if (!response.ok) {
                    setLocationResults([])
                    setIsLoadingResults(false)
                    return
                }

                const data = await response.json()

                const results: AutocompleteResult[] =
                    data.features?.map((feature: any) => {
                        const placeType = feature.place_type?.[0] || "place"
                        let type: "Country" | "City" | "Dive Site" = "City"
                        let icon: "globe" | "building" | "pin" = "building"

                        if (placeType === "country") {
                            type = "Country"
                            icon = "globe"
                        } else if (placeType === "place" || placeType === "region") {
                            type = "City"
                            icon = "building"
                        }

                        return {
                            id: feature.id,
                            name: feature.text || feature.place_name,
                            type,
                            icon,
                            subtitle: feature.place_name,
                            coordinates: {
                                longitude: feature.center[0],
                                latitude: feature.center[1],
                            },
                            zoom: type === "Country" ? 6 : type === "City" ? 10 : 14,
                        }
                    }) || []

                setLocationResults(results)
            } catch (error) {
                setLocationResults([])
            } finally {
                setIsLoadingResults(false)
            }
        }

        const debounceTimer = setTimeout(fetchLocations, 300)
        return () => clearTimeout(debounceTimer)
    }, [localSearchQuery])

    const matchingDiveSites = allDiveSites
        .filter((site) => {
            const query = localSearchQuery.toLowerCase()
            return (
                site.name.toLowerCase().includes(query) ||
                site.location_name.toLowerCase().includes(query) ||
                site.description?.toLowerCase().includes(query)
            )
        })
        .slice(0, 5)

    const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
        console.log("[v0] Backdrop clicked")
        e.stopPropagation()
        if (e.target === e.currentTarget && isMounted) {
            console.log("[v0] Calling onClose from backdrop")
            onClose()
        }
    }

    const handleResultSelect = (result: AutocompleteResult | DiveSite, isDiveSite: boolean) => {
        if (isDiveSite) {
            const site = result as DiveSite
            onSearchChange(site.name)
            setShowAutocomplete(false)
            onDiveSiteSelect?.(site)
            console.log("[v0] Dive site selected, not auto-closing")
        } else {
            const location = result as AutocompleteResult
            onSearchChange(location.name)
            setShowAutocomplete(false)
            if (location.coordinates) {
                onLocationSelect?.({
                    longitude: location.coordinates.longitude,
                    latitude: location.coordinates.latitude,
                    zoom: location.zoom || 10,
                })
            }
            console.log("[v0] Location selected, not auto-closing")
        }
    }

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            setShowAutocomplete(false)
            onSearchExecute?.()
        }
    }

    if (!isOpen) {
        return null
    }

    return (
        <>
            {/* Backdrop */}
            <div
                onClick={handleBackdropClick}
                style={{
                    position: "fixed",
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    background: "rgba(0, 0, 0, 0.3)",
                    zIndex: 1999,
                }}
            />

            <div
                style={{
                    position: "fixed",
                    top: "16px",
                    left: "16px",
                    right: "80px", // Leave space for map controls on the right
                    maxWidth: "800px", // Reduced from 1000px
                    zIndex: 2000,
                }}
            >
                {/* Main search row */}
                <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
                    {/* Search bar - more compact */}
                    <div
                        style={{
                            flex: 1,
                            display: "flex",
                            alignItems: "center",
                            gap: "10px",
                            background: "white",
                            borderRadius: "50px",
                            padding: "12px 20px", // Reduced padding
                            boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
                        }}
                    >
                        {/* Search icon */}
                        <svg
                            width="20"
                            height="20"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="#9CA3AF"
                            strokeWidth="2.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            style={{ flexShrink: 0 }}
                        >
                            <circle cx="11" cy="11" r="8" />
                            <path d="m21 21-4.35-4.35" />
                        </svg>

                        {/* Search input */}
                        <input
                            type="text"
                            placeholder="Search dive sites, cities, countries."
                            value={localSearchQuery}
                            onChange={(e) => {
                                setLocalSearchQuery(e.target.value)
                                onSearchChange(e.target.value)
                            }}
                            onKeyDown={handleKeyDown}
                            onFocus={() => {
                                if (localSearchQuery.trim().length >= 2) {
                                    setShowAutocomplete(true)
                                }
                            }}
                            autoFocus
                            style={{
                                flex: 1,
                                background: "transparent",
                                border: "none",
                                outline: "none",
                                color: "#374151",
                                fontSize: "15px", // Slightly smaller
                                fontWeight: 400,
                                minWidth: 0,
                            }}
                        />

                        {/* Clear button */}
                        {localSearchQuery && (
                            <button
                                onClick={() => {
                                    setLocalSearchQuery("")
                                    onSearchChange("")
                                    setShowAutocomplete(false)
                                }}
                                aria-label="Clear search"
                                style={{
                                    flexShrink: 0,
                                    width: "28px",
                                    height: "28px",
                                    borderRadius: "50%",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    border: "none",
                                    background: "transparent",
                                    cursor: "pointer",
                                    transition: "background 0.2s",
                                }}
                                onMouseEnter={(e) => (e.currentTarget.style.background = "#F3F4F6")}
                                onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
                            >
                                <svg width="14" height="14" viewBox="0 0 20 20" fill="none">
                                    <path
                                        d="M4 4l12 12M16 4L4 16"
                                        stroke="#9CA3AF"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    />
                                </svg>
                            </button>
                        )}
                    </div>

                    <button
                        onClick={onToggleFilters}
                        style={{
                            flexShrink: 0,
                            display: "flex",
                            alignItems: "center",
                            gap: "8px",
                            background: "white",
                            borderRadius: "50px",
                            padding: "12px 20px", // Reduced padding
                            boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
                            border: "none",
                            cursor: "pointer",
                            transition: "background 0.2s",
                        }}
                        onMouseEnter={(e) => (e.currentTarget.style.background = "#F9FAFB")}
                        onMouseLeave={(e) => (e.currentTarget.style.background = "white")}
                    >
                        <svg
                            width="18"
                            height="18"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke={showFilters ? "#3B82F6" : "#9CA3AF"}
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        >
                            <line x1="4" y1="6" x2="4" y2="6" />
                            <line x1="4" y1="12" x2="4" y2="12" />
                            <line x1="4" y1="18" x2="4" y2="18" />
                            <line x1="8" y1="6" x2="20" y2="6" />
                            <line x1="8" y1="12" x2="20" y2="12" />
                            <line x1="8" y1="18" x2="20" y2="18" />
                        </svg>
                        <span style={{ fontSize: "15px", fontWeight: 500, color: "#6B7280" }}>Filter</span>
                    </button>
                </div>

                {/* Autocomplete dropdown */}
                {showAutocomplete && (locationResults.length > 0 || matchingDiveSites.length > 0 || isLoadingResults) && (
                    <div style={{ marginTop: "12px" }}>
                        <AutocompleteDropdown
                            results={locationResults}
                            diveSites={matchingDiveSites}
                            onSelect={handleResultSelect}
                            isLoading={isLoadingResults}
                        />
                    </div>
                )}

                {/* Results count */}
                {localSearchQuery && !showAutocomplete && (
                    <div style={{ marginTop: "16px", textAlign: "center" }}>
            <span
                style={{
                    display: "inline-block",
                    background: "#DBEAFE",
                    color: "#1E40AF",
                    padding: "8px 16px",
                    borderRadius: "50px",
                    fontSize: "14px",
                    fontWeight: 500,
                }}
            >
              {resultsCount} {resultsCount === 1 ? "result" : "results"}
            </span>
                    </div>
                )}
            </div>

            {showFilters && (
                <FilterChips
                    filters={filters}
                    onFilterChange={onFilterChange}
                    resultsCount={resultsCount}
                    onClose={onToggleFilters}
                />
            )}
        </>
    )
}
