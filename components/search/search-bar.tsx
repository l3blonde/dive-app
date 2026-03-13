"use client"

import { useState } from "react"
import { Search, SlidersHorizontal } from "lucide-react"

interface SearchBarProps {
    onToggleFilters: () => void
}

export function SearchBar({ onToggleFilters }: SearchBarProps) {
    const [searchQuery, setSearchQuery] = useState("")

    return (
        <div
            style={{
                position: "fixed",
                top: 0,
                left: 0,
                right: 0,
                zIndex: 999,
                padding: "20px 16px",
                display: "flex",
                justifyContent: "center",
            }}
        >
            {/* Glassmorphism search bar */}
            <div
                style={{
                    width: "100%",
                    maxWidth: "500px",
                    display: "flex",
                    gap: "10px",
                    alignItems: "center",
                    background: "rgba(255, 255, 255, 0.12)",
                    backdropFilter: "blur(12px)",
                    WebkitBackdropFilter: "blur(12px)",
                    borderRadius: "24px",
                    border: "1px solid rgba(255, 255, 255, 0.25)",
                    padding: "12px 16px",
                }}
            >
                {/* Search Icon */}
                <Search size={20} color="white" strokeWidth={1.8} />

                {/* Input */}
                <input
                    type="text"
                    placeholder="Search dive sites, trips, marine life"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    style={{
                        flex: 1,
                        border: "none",
                        background: "transparent",
                        color: "white",
                        fontSize: "14px",
                        outline: "none",
                        fontFamily: "inherit",
                    }}
                />

                {/* Filter Button - Icon only */}
                <button
                    onClick={onToggleFilters}
                    style={{
                        background: "transparent",
                        border: "none",
                        cursor: "pointer",
                        display: "flex",
                        alignItems: "center",
                        padding: "4px",
                        transition: "all 0.2s",
                    }}
                    onMouseEnter={(e) => {
                        e.currentTarget.style.opacity = "0.8"
                    }}
                    onMouseLeave={(e) => {
                        e.currentTarget.style.opacity = "1"
                    }}
                    title="Filter"
                >
                    <SlidersHorizontal size={20} color="white" strokeWidth={1.8} />
                </button>
            </div>
        </div>
    )
}
