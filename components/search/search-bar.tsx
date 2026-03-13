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
    placeholder = "Search dive trips, dive sites, marine life"
}: SearchBarProps) {
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
                    gap: "12px",
                    alignItems: "center",
                    background: "rgba(6, 43, 61, 0.4)",
                    backdropFilter: "blur(16px)",
                    WebkitBackdropFilter: "blur(16px)",
                    borderRadius: "9999px",
                    border: "1px solid rgba(0, 194, 215, 0.15)",
                    padding: "12px 20px",
                    boxShadow: "0 8px 32px rgba(0, 0, 0, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.05)",
                }}
            >
                {/* Search Icon */}
                <Search size={20} color="rgba(255, 255, 255, 0.6)" strokeWidth={1.8} />

                {/* Input */}
                <input
                    type="text"
                    placeholder={placeholder}
                    value={searchQuery}
                    onChange={(e) => onSearchChange(e.target.value)}
                    style={{
                        flex: 1,
                        border: "none",
                        background: "transparent",
                        color: "rgba(255, 255, 255, 0.85)",
                        fontSize: "15px",
                        outline: "none",
                        fontFamily: "inherit",
                    }}
                    placeholderStyle={{
                        color: "rgba(255, 255, 255, 0.4)"
                    }}
                />

                {/* Filter Button - Icon only */}
                <button
                    onClick={onToggleFilters}
                    style={{
                        background: "rgba(255, 255, 255, 0.1)",
                        border: "none",
                        borderRadius: "10px",
                        cursor: "pointer",
                        display: "flex",
                        alignItems: "center",
                        padding: "8px",
                        transition: "all 0.2s",
                    }}
                    onMouseEnter={(e) => {
                        e.currentTarget.style.background = "rgba(255, 255, 255, 0.2)"
                    }}
                    onMouseLeave={(e) => {
                        e.currentTarget.style.background = "rgba(255, 255, 255, 0.1)"
                    }}
                    title="Filter"
                >
                    <SlidersHorizontal size={18} color="white" strokeWidth={1.8} />
                </button>
            </div>
        </div>
    )
}
