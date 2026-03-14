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
            {/* Subtle aqua glow pulse keyframe injected inline */}
            <style>{`
                @keyframes search-glow-breathe {
                    0%, 100% { box-shadow: 0 0 0 1px rgba(0,194,215,0.10), 0 8px 32px rgba(0,0,0,0.45), inset 0 1px 0 rgba(255,255,255,0.05); }
                    50%       { box-shadow: 0 0 0 1px rgba(0,194,215,0.22), 0 8px 36px rgba(0,0,0,0.50), 0 0 22px rgba(0,194,215,0.10), inset 0 1px 0 rgba(255,255,255,0.07); }
                }
                .search-input::placeholder { color: rgba(255,255,255,0.38); }
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
                {/* Outer frosted wrap — very subtle, purely depth */}
                <div
                    style={{
                        width: "100%",
                        maxWidth: "500px",
                        padding: "4px",
                        borderRadius: "9999px",
                        background: "rgba(4, 28, 44, 0.28)",
                        backdropFilter: "blur(6px)",
                        WebkitBackdropFilter: "blur(6px)",
                        border: "1px solid rgba(0, 194, 215, 0.09)",
                        pointerEvents: "auto",
                    }}
                >
                    {/* Inner pill — main glass surface */}
                    <div
                        style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "10px",
                            background: "rgba(6, 43, 61, 0.55)",
                            backdropFilter: "blur(18px)",
                            WebkitBackdropFilter: "blur(18px)",
                            borderRadius: "9999px",
                            border: "1px solid rgba(0, 194, 215, 0.18)",
                            padding: "11px 16px",
                            animation: "search-glow-breathe 6s ease-in-out infinite",
                        }}
                    >
                        {/* Search icon */}
                        <Search
                            size={18}
                            color="rgba(0, 194, 215, 0.7)"
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
                            <SlidersHorizontal size={18} color="rgba(0, 194, 215, 0.8)" strokeWidth={1.8} />
                        </button>
                    </div>
                </div>
            </div>
        </>
    )
}
