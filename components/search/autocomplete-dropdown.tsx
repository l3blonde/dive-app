"use client"

import type { AutocompleteResult } from "@/lib/types"
import type { DiveSite } from "@/lib/types"

interface AutocompleteDropdownProps {
    results: AutocompleteResult[]
    diveSites: DiveSite[]
    onSelect: (result: AutocompleteResult | DiveSite, isDiveSite: boolean) => void
    isLoading?: boolean
}

export function AutocompleteDropdown({ results, diveSites, onSelect, isLoading }: AutocompleteDropdownProps) {
    const getIcon = (type: "Country" | "City" | "Dive Site") => {
        if (type === "Country") {
            return (
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="12" cy="12" r="9" stroke="#3B5FCC" strokeWidth="2" />
                    <path d="M3 12h18M12 3a9 9 0 0 1 0 18 9 9 0 0 1 0-18z" stroke="#3B5FCC" strokeWidth="2" />
                </svg>
            )
        }
        if (type === "City") {
            return (
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect x="4" y="8" width="6" height="14" stroke="#3B5FCC" strokeWidth="2" />
                    <rect x="14" y="4" width="6" height="18" stroke="#3B5FCC" strokeWidth="2" />
                </svg>
            )
        }
        return (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                    d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z"
                    stroke="#3B5FCC"
                    strokeWidth="2"
                    fill="#94E0FF"
                />
                <circle cx="12" cy="9" r="2.5" fill="#3B5FCC" />
            </svg>
        )
    }

    const getDiveSiteIcon = () => {
        return (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                    d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z"
                    stroke="#3B5FCC"
                    strokeWidth="2"
                    fill="#94E0FF"
                />
                <circle cx="12" cy="9" r="2.5" fill="#3B5FCC" />
            </svg>
        )
    }

    if (isLoading) {
        return (
            <div
                style={{
                    marginTop: "12px",
                    background: "white",
                    borderRadius: "20px",
                    boxShadow: "0 8px 24px rgba(0,0,0,0.15)",
                    padding: "24px",
                    zIndex: 2001,
                    animation: "fadeIn 0.2s ease-out",
                    textAlign: "center",
                }}
            >
                <div style={{ color: "#6A6A6A", fontSize: "14px" }}>Searching...</div>
            </div>
        )
    }

    if (results.length === 0 && diveSites.length === 0) {
        return null
    }

    return (
        <div
            style={{
                marginTop: "12px",
                background: "white",
                borderRadius: "20px",
                boxShadow: "0 8px 24px rgba(0,0,0,0.15)",
                maxHeight: "400px",
                overflowY: "auto",
                zIndex: 2001,
                animation: "fadeIn 0.2s ease-out",
            }}
        >
            {results.map((result) => (
                <button
                    key={result.id}
                    onClick={() => onSelect(result, false)}
                    style={{
                        width: "100%",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        padding: "16px 20px",
                        border: "none",
                        background: "transparent",
                        cursor: "pointer",
                        borderBottom: "1px solid #F0F0F0",
                        transition: "background 0.2s",
                    }}
                    onMouseEnter={(e) => {
                        e.currentTarget.style.background = "#F8F9FA"
                    }}
                    onMouseLeave={(e) => {
                        e.currentTarget.style.background = "transparent"
                    }}
                >
                    <div style={{ display: "flex", alignItems: "center", gap: "14px", flex: 1 }}>
                        <div style={{ flexShrink: 0 }}>{getIcon(result.type as "Country" | "City" | "Dive Site")}</div>
                        <div style={{ textAlign: "left" }}>
                            <div style={{ fontSize: "16px", fontWeight: "500", color: "#1A1A33" }}>{result.name}</div>
                            {result.subtitle && (
                                <div style={{ fontSize: "13px", color: "#6A6A6A", marginTop: "2px" }}>{result.subtitle}</div>
                            )}
                        </div>
                    </div>
                    <div
                        style={{
                            fontSize: "13px",
                            color: "#6A6A6A",
                            fontWeight: "500",
                            padding: "4px 10px",
                            background: "#F0F0F0",
                            borderRadius: "8px",
                        }}
                    >
                        {result.type}
                    </div>
                </button>
            ))}

            {diveSites.map((site) => (
                <button
                    key={site.id}
                    onClick={() => onSelect(site, true)}
                    style={{
                        width: "100%",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        padding: "16px 20px",
                        border: "none",
                        background: "transparent",
                        cursor: "pointer",
                        borderBottom: diveSites[diveSites.length - 1].id === site.id ? "none" : "1px solid #F0F0F0",
                        transition: "background 0.2s",
                    }}
                    onMouseEnter={(e) => {
                        e.currentTarget.style.background = "#F8F9FA"
                    }}
                    onMouseLeave={(e) => {
                        e.currentTarget.style.background = "transparent"
                    }}
                >
                    <div style={{ display: "flex", alignItems: "center", gap: "14px", flex: 1 }}>
                        <div style={{ flexShrink: 0 }}>{getDiveSiteIcon()}</div>
                        <div style={{ textAlign: "left" }}>
                            <div style={{ fontSize: "16px", fontWeight: "500", color: "#1A1A33" }}>{site.name}</div>
                            <div style={{ fontSize: "13px", color: "#6A6A6A", marginTop: "2px" }}>{site.location_name}</div>
                        </div>
                    </div>
                    <div
                        style={{
                            fontSize: "13px",
                            color: "#6A6A6A",
                            fontWeight: "500",
                            padding: "4px 10px",
                            background: "#F0F0F0",
                            borderRadius: "8px",
                        }}
                    >
                        Dive Site
                    </div>
                </button>
            ))}
        </div>
    )
}
