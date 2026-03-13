"use client"

import { useState } from "react"
import { Bookmark, X } from "lucide-react"
import type { DiveSite } from "@/lib/types"

interface BottomSheetProps {
    diveSites: DiveSite[]
    onClose?: () => void
}

const FILTER_CHIPS = ["Sort", "Nearby", "Boat Dive", "Wreck", "+9"]

export function BottomSheet({ diveSites, onClose }: BottomSheetProps) {
    const [selectedFilters, setSelectedFilters] = useState<string[]>(["Nearby"])
    const [scrollPosition, setScrollPosition] = useState(0)

    return (
        <div
            style={{
                position: "fixed",
                bottom: 0,
                left: 0,
                right: 0,
                maxHeight: "70vh",
                background: "rgba(12, 90, 122, 0.85)",
                backdropFilter: "blur(12px)",
                WebkitBackdropFilter: "blur(12px)",
                borderRadius: "28px 28px 0 0",
                border: "1px solid rgba(255, 255, 255, 0.2)",
                zIndex: 998,
                display: "flex",
                flexDirection: "column",
                boxShadow: "0 -8px 32px rgba(0, 0, 0, 0.3)",
            }}
        >
            {/* Drag Handle */}
            <div
                style={{
                    padding: "12px",
                    display: "flex",
                    justifyContent: "center",
                    borderBottom: "1px solid rgba(255, 255, 255, 0.1)",
                }}
            >
                <div
                    style={{
                        width: "40px",
                        height: "4px",
                        background: "rgba(255, 255, 255, 0.3)",
                        borderRadius: "2px",
                    }}
                />
            </div>

            {/* Filter Chips */}
            <div
                style={{
                    padding: "12px 16px",
                    display: "flex",
                    gap: "8px",
                    overflowX: "auto",
                    borderBottom: "1px solid rgba(255, 255, 255, 0.1)",
                }}
                onScroll={(e) => setScrollPosition((e.target as HTMLDivElement).scrollLeft)}
            >
                {FILTER_CHIPS.map((chip) => (
                    <button
                        key={chip}
                        onClick={() => {
                            if (selectedFilters.includes(chip)) {
                                setSelectedFilters(selectedFilters.filter((f) => f !== chip))
                            } else {
                                setSelectedFilters([...selectedFilters, chip])
                            }
                        }}
                        style={{
                            padding: "8px 16px",
                            borderRadius: "16px",
                            border: selectedFilters.includes(chip) ? "none" : "1px solid rgba(255, 255, 255, 0.3)",
                            background: selectedFilters.includes(chip) ? "rgba(0, 194, 215, 0.7)" : "rgba(255, 255, 255, 0.08)",
                            color: "white",
                            fontSize: "12px",
                            fontWeight: "600",
                            cursor: "pointer",
                            whiteSpace: "nowrap",
                            transition: "all 0.2s",
                        }}
                        onMouseEnter={(e) => {
                            e.currentTarget.style.background = selectedFilters.includes(chip)
                                ? "rgba(0, 194, 215, 0.9)"
                                : "rgba(255, 255, 255, 0.15)"
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.background = selectedFilters.includes(chip)
                                ? "rgba(0, 194, 215, 0.7)"
                                : "rgba(255, 255, 255, 0.08)"
                        }}
                    >
                        {chip}
                    </button>
                ))}
            </div>

            {/* Dive Sites List */}
            <div
                style={{
                    flex: 1,
                    overflowY: "auto",
                    padding: "12px 16px",
                    display: "flex",
                    flexDirection: "column",
                    gap: "12px",
                }}
            >
                {diveSites.map((site) => (
                    <div
                        key={site.id}
                        style={{
                            display: "flex",
                            gap: "12px",
                            padding: "12px",
                            background: "rgba(255, 255, 255, 0.08)",
                            backdropFilter: "blur(8px)",
                            WebkitBackdropFilter: "blur(8px)",
                            border: "1px solid rgba(255, 255, 255, 0.15)",
                            borderRadius: "12px",
                            cursor: "pointer",
                            transition: "all 0.2s",
                        }}
                        onMouseEnter={(e) => {
                            const el = e.currentTarget
                            el.style.background = "rgba(255, 255, 255, 0.12)"
                            el.style.borderColor = "rgba(0, 194, 215, 0.3)"
                        }}
                        onMouseLeave={(e) => {
                            const el = e.currentTarget
                            el.style.background = "rgba(255, 255, 255, 0.08)"
                            el.style.borderColor = "rgba(255, 255, 255, 0.15)"
                        }}
                    >
                        {/* Thumbnail */}
                        <div
                            style={{
                                width: "80px",
                                height: "80px",
                                borderRadius: "8px",
                                background: `url(${site.image_url || "https://xu5qaaigiohvkyk8.public.blob.vercel-storage.com/site-placeholder.png"})`,
                                backgroundSize: "cover",
                                backgroundPosition: "center",
                                flexShrink: 0,
                            }}
                        />

                        {/* Content */}
                        <div style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
                            {/* Header */}
                            <div>
                                <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "4px" }}>
                                    <h3 style={{ color: "white", fontSize: "14px", fontWeight: "700", margin: 0 }}>{site.name}</h3>
                                    <span style={{ color: "rgba(255, 255, 255, 0.6)", fontSize: "11px" }}>
                                        {site.location_name ? `${site.location_name.split(",")[0]}` : ""}
                                    </span>
                                </div>

                                {/* Rating and Distance */}
                                <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "6px" }}>
                                    <span style={{ color: "#FFD700", fontSize: "12px", fontWeight: "600" }}>⭐ 4.9 (214)</span>
                                    <span style={{ color: "rgba(255, 255, 255, 0.6)", fontSize: "11px" }}>0.8 km</span>
                                </div>

                                {/* Meta */}
                                <p style={{ color: "rgba(255, 255, 255, 0.7)", fontSize: "11px", margin: "0 0 6px 0" }}>
                                    {`Depth ${site.max_depth || "—"}m · Visibility Excellent`}
                                </p>

                                {/* Marine Life Tags */}
                                <div style={{ display: "flex", gap: "6px", flexWrap: "wrap" }}>
                                    {["Reef Shark", "Turtle", "Wall Dive"].map((tag) => (
                                        <span
                                            key={tag}
                                            style={{
                                                fontSize: "10px",
                                                background: "rgba(0, 194, 215, 0.3)",
                                                color: "#00C2D7",
                                                padding: "3px 8px",
                                                borderRadius: "6px",
                                                border: "1px solid rgba(0, 194, 215, 0.4)",
                                            }}
                                        >
                                            🐟 {tag}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Bookmark Icon */}
                        <button
                            style={{
                                background: "transparent",
                                border: "none",
                                cursor: "pointer",
                                display: "flex",
                                alignItems: "center",
                                padding: "4px",
                                color: "rgba(255, 255, 255, 0.6)",
                                transition: "all 0.2s",
                            }}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.color = "white"
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.color = "rgba(255, 255, 255, 0.6)"
                            }}
                        >
                            <Bookmark size={18} strokeWidth={1.8} />
                        </button>
                    </div>
                ))}
            </div>
        </div>
    )
}
