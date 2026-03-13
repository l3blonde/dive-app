"use client"

import { useState } from "react"
import { Bookmark, Star } from "lucide-react"
import type { DiveSite } from "@/lib/types"

interface BottomSheetProps {
    diveSites: DiveSite[]
    onClose?: () => void
    onViewDetails?: (site: DiveSite) => void
    onAddToPlan?: (site: DiveSite) => void
}

const FILTER_CHIPS = ["Sort", "Filter", "Nearby", "Dive Sites", "Trips", "Marine Life"]

export function BottomSheet({ diveSites, onClose, onViewDetails, onAddToPlan }: BottomSheetProps) {
    const [selectedFilters, setSelectedFilters] = useState<string[]>(["Nearby"])

    const toggleFilter = (chip: string) => {
        if (selectedFilters.includes(chip)) {
            setSelectedFilters(selectedFilters.filter((f) => f !== chip))
        } else {
            setSelectedFilters([...selectedFilters, chip])
        }
    }

    return (
        <div
            style={{
                position: "fixed",
                bottom: "90px",
                left: 0,
                right: 0,
                maxHeight: "55vh",
                background: "rgba(8, 59, 83, 0.92)",
                backdropFilter: "blur(16px)",
                WebkitBackdropFilter: "blur(16px)",
                borderRadius: "24px 24px 0 0",
                border: "1px solid rgba(255, 255, 255, 0.15)",
                borderBottom: "none",
                zIndex: 997,
                display: "flex",
                flexDirection: "column",
                boxShadow: "0 -8px 40px rgba(0, 0, 0, 0.4)",
            }}
        >
            {/* Drag Handle */}
            <div
                style={{
                    padding: "14px",
                    display: "flex",
                    justifyContent: "center",
                }}
            >
                <div
                    style={{
                        width: "48px",
                        height: "4px",
                        background: "rgba(255, 255, 255, 0.3)",
                        borderRadius: "2px",
                    }}
                />
            </div>

            {/* Filter Chips */}
            <div
                style={{
                    padding: "0 16px 14px 16px",
                    display: "flex",
                    gap: "8px",
                    overflowX: "auto",
                    scrollbarWidth: "none",
                    msOverflowStyle: "none",
                }}
                className="hide-scrollbar"
            >
                {FILTER_CHIPS.map((chip) => {
                    const isActive = selectedFilters.includes(chip)
                    return (
                        <button
                            key={chip}
                            onClick={() => toggleFilter(chip)}
                            style={{
                                padding: "10px 18px",
                                borderRadius: "20px",
                                border: isActive ? "1px solid rgba(0, 194, 215, 0.5)" : "1px solid rgba(255, 255, 255, 0.25)",
                                background: isActive ? "rgba(0, 194, 215, 0.25)" : "rgba(255, 255, 255, 0.08)",
                                color: isActive ? "#00C2D7" : "white",
                                fontSize: "13px",
                                fontWeight: "600",
                                cursor: "pointer",
                                whiteSpace: "nowrap",
                                transition: "all 0.2s",
                                flexShrink: 0,
                            }}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.background = isActive ? "rgba(0, 194, 215, 0.35)" : "rgba(255, 255, 255, 0.15)"
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.background = isActive ? "rgba(0, 194, 215, 0.25)" : "rgba(255, 255, 255, 0.08)"
                            }}
                        >
                            {chip}
                        </button>
                    )
                })}
            </div>

            {/* Dive Sites List */}
            <div
                style={{
                    flex: 1,
                    overflowY: "auto",
                    padding: "0 16px 16px 16px",
                    display: "flex",
                    flexDirection: "column",
                    gap: "12px",
                }}
            >
                {diveSites.map((site, index) => (
                    <div
                        key={site.id}
                        style={{
                            display: "flex",
                            gap: "14px",
                            padding: "14px",
                            background: "rgba(255, 255, 255, 0.06)",
                            backdropFilter: "blur(8px)",
                            WebkitBackdropFilter: "blur(8px)",
                            border: "1px solid rgba(255, 255, 255, 0.1)",
                            borderRadius: "16px",
                            cursor: "pointer",
                            transition: "all 0.2s",
                        }}
                        onMouseEnter={(e) => {
                            e.currentTarget.style.background = "rgba(255, 255, 255, 0.1)"
                            e.currentTarget.style.borderColor = "rgba(0, 194, 215, 0.3)"
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.background = "rgba(255, 255, 255, 0.06)"
                            e.currentTarget.style.borderColor = "rgba(255, 255, 255, 0.1)"
                        }}
                    >
                        {/* Thumbnail */}
                        <div
                            style={{
                                width: "90px",
                                height: "90px",
                                borderRadius: "12px",
                                background: `url(${site.image_url || "https://xu5qaaigiohvkyk8.public.blob.vercel-storage.com/site-placeholder.png"})`,
                                backgroundSize: "cover",
                                backgroundPosition: "center",
                                flexShrink: 0,
                            }}
                        />

                        {/* Content */}
                        <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: "6px" }}>
                            {/* Header Row */}
                            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                                <div>
                                    <h3 style={{ color: "white", fontSize: "15px", fontWeight: "700", margin: 0, marginBottom: "2px" }}>
                                        {site.name}
                                    </h3>
                                    <span style={{ color: "rgba(255, 255, 255, 0.5)", fontSize: "12px" }}>
                                        {site.location_name?.split(",")[0] || "Maldives"}
                                    </span>
                                </div>
                                <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                                    <span style={{ color: "rgba(255, 255, 255, 0.6)", fontSize: "12px" }}>
                                        {(index * 0.3 + 0.5).toFixed(1)} km
                                    </span>
                                    <button
                                        style={{
                                            background: "transparent",
                                            border: "none",
                                            cursor: "pointer",
                                            padding: "4px",
                                            color: "rgba(255, 255, 255, 0.5)",
                                            transition: "color 0.2s",
                                        }}
                                        onMouseEnter={(e) => { e.currentTarget.style.color = "#00C2D7" }}
                                        onMouseLeave={(e) => { e.currentTarget.style.color = "rgba(255, 255, 255, 0.5)" }}
                                    >
                                        <Bookmark size={18} strokeWidth={1.6} />
                                    </button>
                                </div>
                            </div>

                            {/* Rating */}
                            <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                                <div style={{ display: "flex", alignItems: "center", gap: "2px" }}>
                                    {[1, 2, 3, 4, 5].map((star) => (
                                        <Star key={star} size={12} fill={star <= 4 ? "#FFD700" : "transparent"} color="#FFD700" strokeWidth={1.5} />
                                    ))}
                                </div>
                                <span style={{ color: "#FFD700", fontSize: "12px", fontWeight: "600" }}>4.9</span>
                                <span style={{ color: "rgba(255, 255, 255, 0.5)", fontSize: "11px" }}>(214)</span>
                            </div>

                            {/* Meta Info */}
                            <p style={{ color: "rgba(255, 255, 255, 0.6)", fontSize: "12px", margin: 0 }}>
                                Depth {site.max_depth || 30}m · Visibility Excellent
                            </p>

                            {/* Tags */}
                            <div style={{ display: "flex", gap: "6px", flexWrap: "wrap" }}>
                                {["Reef Shark", "Turtle", "Wall Dive"].slice(0, 3).map((tag) => (
                                    <span
                                        key={tag}
                                        style={{
                                            fontSize: "10px",
                                            background: "rgba(0, 194, 215, 0.2)",
                                            color: "#00C2D7",
                                            padding: "4px 8px",
                                            borderRadius: "8px",
                                            border: "1px solid rgba(0, 194, 215, 0.3)",
                                        }}
                                    >
                                        {tag}
                                    </span>
                                ))}
                            </div>

                            {/* CTA Buttons */}
                            <div style={{ display: "flex", gap: "8px", marginTop: "4px" }}>
                                <button
                                    onClick={(e) => {
                                        e.stopPropagation()
                                        onAddToPlan?.(site)
                                    }}
                                    style={{
                                        flex: 1,
                                        padding: "8px 12px",
                                        borderRadius: "10px",
                                        border: "1px solid rgba(255, 255, 255, 0.3)",
                                        background: "rgba(255, 255, 255, 0.1)",
                                        color: "white",
                                        fontSize: "12px",
                                        fontWeight: "600",
                                        cursor: "pointer",
                                        transition: "all 0.2s",
                                    }}
                                    onMouseEnter={(e) => { e.currentTarget.style.background = "rgba(255, 255, 255, 0.2)" }}
                                    onMouseLeave={(e) => { e.currentTarget.style.background = "rgba(255, 255, 255, 0.1)" }}
                                >
                                    Add to Plan
                                </button>
                                <button
                                    onClick={(e) => {
                                        e.stopPropagation()
                                        onViewDetails?.(site)
                                    }}
                                    style={{
                                        flex: 1,
                                        padding: "8px 12px",
                                        borderRadius: "10px",
                                        border: "none",
                                        background: "rgba(0, 194, 215, 0.8)",
                                        color: "white",
                                        fontSize: "12px",
                                        fontWeight: "600",
                                        cursor: "pointer",
                                        transition: "all 0.2s",
                                    }}
                                    onMouseEnter={(e) => { e.currentTarget.style.background = "rgba(0, 194, 215, 1)" }}
                                    onMouseLeave={(e) => { e.currentTarget.style.background = "rgba(0, 194, 215, 0.8)" }}
                                >
                                    View Details
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}
