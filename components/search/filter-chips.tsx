"use client"

import { MARINE_SPECIES_LIST } from "@/lib/data/marine-species"

export interface FilterOptions {
    minRating?: number
    difficulty?: string
    marineSpecies?: string[]
    activityType?: string
    depthRange?: string
    sortBy?: "recent" | "rating" | "reviews" | "nearest"
}

interface FilterChipsProps {
    filters: FilterOptions
    onFilterChange: (filters: FilterOptions) => void
    resultsCount: number
    onClose: () => void
}

export function FilterChips({ filters, onFilterChange, resultsCount, onClose }: FilterChipsProps) {
    const activities = ["Snorkeling", "Diving", "Freediving", "Scuba Diving"]

    const sortOptions = [
        { value: "recent" as const, label: "Most Recent" },
        { value: "rating" as const, label: "Highest Rated" },
        { value: "reviews" as const, label: "Most Reviews" },
        { value: "nearest" as const, label: "Nearest to Me" },
    ]

    const popularSpecies = MARINE_SPECIES_LIST.slice(0, 10)

    const toggleActivity = (activity: string) => {
        onFilterChange({
            ...filters,
            activityType: filters.activityType === activity ? undefined : activity,
        })
    }

    const toggleSpecies = (speciesId: string) => {
        const current = filters.marineSpecies || []
        const updated = current.includes(speciesId) ? current.filter((s) => s !== speciesId) : [...current, speciesId]
        onFilterChange({ ...filters, marineSpecies: updated })
    }

    const clearFilters = () => {
        onFilterChange({})
    }

    const applyFilters = () => {
        console.log("Filters applied:", filters)
        onClose()
    }

    return (
        <>
            <div
                style={{
                    position: "fixed",
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    backdropFilter: "blur(10px)",
                    background: "rgba(0, 0, 0, 0.4)",
                    zIndex: 3999,
                }}
                onClick={onClose}
            />

            <div
                style={{
                    position: "fixed",
                    bottom: 0,
                    left: 0,
                    right: 0,
                    maxHeight: "90vh",
                    background: "white",
                    borderTopLeftRadius: "24px",
                    borderTopRightRadius: "24px",
                    boxShadow: "0 -4px 20px rgba(0, 0, 0, 0.2)",
                    zIndex: 4000,
                    display: "flex",
                    flexDirection: "column",
                    animation: "slideUp 0.3s ease-out",
                }}
                onClick={(e) => e.stopPropagation()}
            >
                <style>
                    {`
            @keyframes slideUp {
              from {
                transform: translateY(100%);
              }
              to {
                transform: translateY(0);
              }
            }
          `}
                </style>

                <div
                    style={{
                        display: "flex",
                        justifyContent: "center",
                        padding: "12px 0",
                    }}
                >
                    <div
                        style={{
                            width: "40px",
                            height: "4px",
                            background: "#E5E7EB",
                            borderRadius: "2px",
                        }}
                    />
                </div>

                {/* Header */}
                <div
                    style={{
                        padding: "0 24px 24px 24px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                    }}
                >
                    <h2 style={{ fontSize: "28px", fontWeight: "600", color: "#111827", margin: 0 }}>Filters</h2>
                    <button
                        onClick={onClose}
                        style={{
                            width: "44px",
                            height: "44px",
                            borderRadius: "50%",
                            border: "none",
                            background: "#F3F4F6",
                            cursor: "pointer",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            transition: "background 0.2s",
                        }}
                        onMouseEnter={(e) => (e.currentTarget.style.background = "#E5E7EB")}
                        onMouseLeave={(e) => (e.currentTarget.style.background = "#F3F4F6")}
                    >
                        <svg width="18" height="18" viewBox="0 0 20 20" fill="none">
                            <path
                                d="M4 4l12 12M16 4L4 16"
                                stroke="#6B7280"
                                strokeWidth="2.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                        </svg>
                    </button>
                </div>

                {/* Scrollable content */}
                <div style={{ flex: 1, overflowY: "auto", padding: "0 24px 24px 24px" }}>
                    {/* ACTIVITIES Section */}
                    <div style={{ marginBottom: "32px" }}>
                        <h3
                            style={{
                                fontSize: "13px",
                                fontWeight: "700",
                                color: "#111827",
                                marginBottom: "16px",
                                letterSpacing: "1px",
                            }}
                        >
                            ACTIVITIES
                        </h3>
                        <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
                            {activities.map((activity) => (
                                <button
                                    key={activity}
                                    onClick={() => toggleActivity(activity)}
                                    style={{
                                        padding: "16px 28px",
                                        background: filters.activityType === activity ? "#111827" : "white",
                                        color: filters.activityType === activity ? "white" : "#6B7280",
                                        border: filters.activityType === activity ? "none" : "1.5px solid #E5E7EB",
                                        borderRadius: "50px",
                                        fontSize: "16px",
                                        fontWeight: 500,
                                        cursor: "pointer",
                                        transition: "all 0.2s",
                                    }}
                                    onMouseEnter={(e) => {
                                        if (filters.activityType !== activity) {
                                            e.currentTarget.style.borderColor = "#9CA3AF"
                                        }
                                    }}
                                    onMouseLeave={(e) => {
                                        if (filters.activityType !== activity) {
                                            e.currentTarget.style.borderColor = "#E5E7EB"
                                        }
                                    }}
                                >
                                    {activity}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* SORT BY Section - replacing TYPE OF ACCESS */}
                    <div style={{ marginBottom: "32px" }}>
                        <h3
                            style={{
                                fontSize: "13px",
                                fontWeight: "700",
                                color: "#111827",
                                marginBottom: "16px",
                                letterSpacing: "1px",
                            }}
                        >
                            SORT BY
                        </h3>
                        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "12px" }}>
                            {sortOptions.map((option) => (
                                <button
                                    key={option.value}
                                    onClick={() => onFilterChange({ ...filters, sortBy: option.value })}
                                    style={{
                                        padding: "18px 16px",
                                        background: filters.sortBy === option.value ? "#111827" : "#F9FAFB",
                                        color: filters.sortBy === option.value ? "white" : "#374151",
                                        border: "none",
                                        borderRadius: "12px",
                                        fontSize: "15px",
                                        fontWeight: 500,
                                        cursor: "pointer",
                                        transition: "all 0.2s",
                                        textAlign: "center",
                                    }}
                                    onMouseEnter={(e) => {
                                        if (filters.sortBy !== option.value) {
                                            e.currentTarget.style.background = "#F3F4F6"
                                        }
                                    }}
                                    onMouseLeave={(e) => {
                                        if (filters.sortBy !== option.value) {
                                            e.currentTarget.style.background = "#F9FAFB"
                                        }
                                    }}
                                >
                                    {option.label}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* MARINE LIFE Section */}
                    <div>
                        <h3
                            style={{
                                fontSize: "13px",
                                fontWeight: "700",
                                color: "#111827",
                                marginBottom: "16px",
                                letterSpacing: "1px",
                            }}
                        >
                            MARINE LIFE
                        </h3>
                        <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
                            {popularSpecies.map((species) => (
                                <button
                                    key={species.id}
                                    onClick={() => toggleSpecies(species.id)}
                                    style={{
                                        padding: "14px 22px",
                                        background: filters.marineSpecies?.includes(species.id) ? "#111827" : "white",
                                        color: filters.marineSpecies?.includes(species.id) ? "white" : "#6B7280",
                                        border: filters.marineSpecies?.includes(species.id) ? "none" : "1.5px solid #E5E7EB",
                                        borderRadius: "50px",
                                        fontSize: "15px",
                                        fontWeight: 500,
                                        cursor: "pointer",
                                        transition: "all 0.2s",
                                        display: "flex",
                                        alignItems: "center",
                                        gap: "8px",
                                    }}
                                    onMouseEnter={(e) => {
                                        if (!filters.marineSpecies?.includes(species.id)) {
                                            e.currentTarget.style.borderColor = "#9CA3AF"
                                        }
                                    }}
                                    onMouseLeave={(e) => {
                                        if (!filters.marineSpecies?.includes(species.id)) {
                                            e.currentTarget.style.borderColor = "#E5E7EB"
                                        }
                                    }}
                                >
                                    {species.image_url && (
                                        <img
                                            src={species.image_url || "/placeholder.svg"}
                                            alt={species.common_name}
                                            style={{ width: "18px", height: "18px", borderRadius: "50%", objectFit: "cover" }}
                                        />
                                    )}
                                    {species.common_name}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Action buttons */}
                <div
                    style={{
                        padding: "20px 24px 32px 24px",
                        borderTop: "1px solid #E5E7EB",
                        display: "flex",
                        gap: "12px",
                    }}
                >
                    <button
                        onClick={clearFilters}
                        style={{
                            flex: 1,
                            padding: "18px",
                            background: "white",
                            color: "#374151",
                            border: "1.5px solid #E5E7EB",
                            borderRadius: "14px",
                            fontSize: "17px",
                            fontWeight: 600,
                            cursor: "pointer",
                            transition: "all 0.2s",
                        }}
                        onMouseEnter={(e) => {
                            e.currentTarget.style.background = "#F9FAFB"
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.background = "white"
                        }}
                    >
                        Clear all
                    </button>
                    <button
                        onClick={applyFilters}
                        style={{
                            flex: 1,
                            padding: "18px",
                            background: "#111827",
                            color: "white",
                            border: "none",
                            borderRadius: "14px",
                            fontSize: "17px",
                            fontWeight: 600,
                            cursor: "pointer",
                            transition: "all 0.2s",
                        }}
                        onMouseEnter={(e) => {
                            e.currentTarget.style.background = "#1F2937"
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.background = "#111827"
                        }}
                    >
                        Show results
                    </button>
                </div>
            </div>
        </>
    )
}
