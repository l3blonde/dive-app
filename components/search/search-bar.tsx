"use client"

import { Search, SlidersHorizontal } from "lucide-react"

interface SearchBarProps {
    searchQuery: string
    onSearchChange: (query: string) => void
    onToggleFilters: () => void
    placeholder?: string
}

export function SearchBar({
    searchQuery,
    onSearchChange,
    onToggleFilters,
    placeholder = "Search dive trips, dive sites, marine life",
}: SearchBarProps) {
    return (
        <>
            {/* Placeholder color style */}
            <style>{`
                .search-input::placeholder { color: rgba(255,255,255,0.55); }
            `}</style>

            <div
                style={{
                    position: "fixed",
                    top: 0,
                    left: 0,
                    right: 0,
                    zIndex: 999,
                    padding: "20px 16px 12px 16px",
                    display: "flex",
                    justifyContent: "center",
                    pointerEvents: "none",
                }}
            >
                {/* 3D Bubble Glass Search Bar - Neon Aqua Glow */}
                <div
                    style={{
                        width: "100%",
                        maxWidth: "500px",
                        display: "flex",
                        alignItems: "center",
                        gap: "10px",
                        padding: "14px 18px",
                        borderRadius: "9999px",
                        background: "radial-gradient(ellipse 120% 80% at 50% 0%, rgba(255,255,255,0.28) 0%, rgba(0,194,215,0.18) 25%, rgba(6,43,61,0.55) 60%, rgba(4,28,44,0.75) 100%)",
                        backdropFilter: "blur(20px)",
                        WebkitBackdropFilter: "blur(20px)",
                        border: "1.5px solid rgba(0, 194, 215, 0.55)",
                        boxShadow: [
                            "0 0 12px rgba(0, 194, 215, 0.7)",
                            "0 0 28px rgba(0, 194, 215, 0.45)",
                            "0 0 48px rgba(0, 194, 215, 0.2)",
                            "0 8px 32px rgba(0, 0, 0, 0.5)",
                            "inset 0 2px 6px rgba(255, 255, 255, 0.2)",
                            "inset 0 -1px 2px rgba(0, 0, 0, 0.25)",
                        ].join(", "),
                        pointerEvents: "auto",
                        transition: "all 0.3s ease-out",
                    }}
                    onMouseEnter={(e) => {
                        e.currentTarget.style.boxShadow = [
                            "0 0 18px rgba(0, 194, 215, 0.9)",
                            "0 0 40px rgba(0, 194, 215, 0.6)",
                            "0 0 64px rgba(0, 194, 215, 0.3)",
                            "0 8px 32px rgba(0, 0, 0, 0.5)",
                            "inset 0 2px 6px rgba(255, 255, 255, 0.25)",
                            "inset 0 -1px 2px rgba(0, 0, 0, 0.25)",
                        ].join(", ")
                        e.currentTarget.style.borderColor = "rgba(0, 194, 215, 0.75)"
                    }}
                    onMouseLeave={(e) => {
                        e.currentTarget.style.boxShadow = [
                            "0 0 12px rgba(0, 194, 215, 0.7)",
                            "0 0 28px rgba(0, 194, 215, 0.45)",
                            "0 0 48px rgba(0, 194, 215, 0.2)",
                            "0 8px 32px rgba(0, 0, 0, 0.5)",
                            "inset 0 2px 6px rgba(255, 255, 255, 0.2)",
                            "inset 0 -1px 2px rgba(0, 0, 0, 0.25)",
                        ].join(", ")
                        e.currentTarget.style.borderColor = "rgba(0, 194, 215, 0.55)"
                    }}
                >
                        {/* Search icon */}
                        <Search
                            size={18}
                            color="rgba(255, 255, 255, 0.85)"
                            strokeWidth={1.8}
                            style={{ flexShrink: 0 }}
                        />

                        {/* Input */}
                        <input
                            className="search-input"
                            type="text"
                            placeholder={placeholder}
                            value={searchQuery}
                            onChange={(e) => onSearchChange(e.target.value)}
                            style={{
                                flex: 1,
                                border: "none",
                                background: "transparent",
                                color: "rgba(255, 255, 255, 0.88)",
                                fontSize: "14px",
                                fontWeight: 400,
                                letterSpacing: "0.01em",
                                outline: "none",
                                fontFamily: "inherit",
                                minWidth: 0,
                            }}
                        />

                        {/* Divider */}
                        <div
                            style={{
                                width: "1px",
                                height: "18px",
                                background: "rgba(0, 194, 215, 0.2)",
                                flexShrink: 0,
                            }}
                        />

                        {/* Filter sliders button */}
                        <button
                            onClick={onToggleFilters}
                            style={{
                                background: "transparent",
                                border: "none",
                                cursor: "pointer",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                padding: "4px",
                                borderRadius: "9999px",
                                transition: "all 0.25s ease",
                                flexShrink: 0,
                            }}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.background = "rgba(0,194,215,0.12)"
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.background = "transparent"
                            }}
                            title="Filters"
                            aria-label="Open filters"
                        >
                            <SlidersHorizontal size={18} color="rgba(255, 255, 255, 0.85)" strokeWidth={1.8} />
                        </button>
                </div>
            </div>
        </>
    )
}
