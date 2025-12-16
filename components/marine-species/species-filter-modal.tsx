"use client"

import { useState } from "react"
import { X } from "lucide-react"
import type { MarineSpecies } from "@/lib/types"

interface SpeciesFilterModalProps {
    selectedSpecies: string[]
    onSpeciesChange: (species: string[]) => void
    onClose: () => void
    speciesList: MarineSpecies[]
}

export function SpeciesFilterModal({
                                       selectedSpecies,
                                       onSpeciesChange,
                                       onClose,
                                       speciesList,
                                   }: SpeciesFilterModalProps) {
    const [localSelection, setLocalSelection] = useState<string[]>(selectedSpecies)

    const handleToggleSpecies = (speciesId: string) => {
        setLocalSelection((prev) =>
            prev.includes(speciesId) ? prev.filter((id) => id !== speciesId) : [...prev, speciesId],
        )
    }

    const handleApply = () => {
        onSpeciesChange(localSelection)
        onClose()
    }

    const handleClear = () => {
        setLocalSelection([])
    }

    return (
        <div
            style={{
                position: "fixed",
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                background: "rgba(0,0,0,0.5)",
                zIndex: 1000,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                padding: "16px",
            }}
            onClick={onClose}
        >
            <div
                style={{
                    background: "white",
                    borderRadius: "12px",
                    maxWidth: "600px",
                    width: "100%",
                    maxHeight: "80vh",
                    display: "flex",
                    flexDirection: "column",
                    boxShadow: "0 8px 32px rgba(0,0,0,0.2)",
                }}
                onClick={(e) => e.stopPropagation()}
            >
                {/* Header */}
                <div
                    style={{
                        padding: "20px 24px",
                        borderBottom: "1px solid #E5E7EB",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                    }}
                >
                    <h2 style={{ fontSize: "20px", fontWeight: "600", color: "#1F2937" }}>Filter by Marine Species</h2>
                    <button
                        onClick={onClose}
                        style={{
                            background: "none",
                            border: "none",
                            cursor: "pointer",
                            padding: "4px",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                        }}
                    >
                        <X size={24} color="#6A6A6A" />
                    </button>
                </div>

                {/* Species Grid */}
                <div
                    style={{
                        flex: 1,
                        overflowY: "auto",
                        padding: "24px",
                    }}
                >
                    <div
                        style={{
                            display: "grid",
                            gridTemplateColumns: "repeat(auto-fill, minmax(140px, 1fr))",
                            gap: "12px",
                        }}
                    >
                        {speciesList.map((species: MarineSpecies) => {
                            const isSelected = localSelection.includes(species.id)
                            return (
                                <button
                                    key={species.id}
                                    onClick={() => handleToggleSpecies(species.id)}
                                    style={{
                                        padding: "12px",
                                        background: isSelected ? "#E0F2FE" : "#F9FAFB",
                                        border: isSelected ? "2px solid #0EA5E9" : "2px solid #E5E7EB",
                                        borderRadius: "8px",
                                        cursor: "pointer",
                                        transition: "all 0.2s",
                                        display: "flex",
                                        flexDirection: "column",
                                        alignItems: "center",
                                        gap: "8px",
                                    }}
                                >
                                    {species.image_url ? (
                                        <img
                                            src={species.image_url || "/placeholder.svg"}
                                            alt={species.common_name}
                                            style={{ width: "40px", height: "40px", borderRadius: "8px", objectFit: "cover" }}
                                        />
                                    ) : (
                                        <span style={{ fontSize: "28px" }}>🐠</span>
                                    )}
                                    <span
                                        style={{
                                            fontSize: "12px",
                                            fontWeight: isSelected ? "600" : "400",
                                            color: isSelected ? "#0EA5E9" : "#6B7280",
                                            textAlign: "center",
                                        }}
                                    >
                    {species.common_name}
                  </span>
                                </button>
                            )
                        })}
                    </div>
                </div>

                {/* Footer */}
                <div
                    style={{
                        padding: "16px 24px",
                        borderTop: "1px solid #E5E7EB",
                        display: "flex",
                        gap: "12px",
                        justifyContent: "space-between",
                    }}
                >
                    <button
                        onClick={handleClear}
                        style={{
                            padding: "12px 24px",
                            background: "white",
                            border: "1px solid #D1D5DB",
                            borderRadius: "8px",
                            fontSize: "14px",
                            fontWeight: "500",
                            color: "#6B7280",
                            cursor: "pointer",
                        }}
                    >
                        Clear All
                    </button>
                    <div style={{ display: "flex", gap: "12px" }}>
                        <button
                            onClick={onClose}
                            style={{
                                padding: "12px 24px",
                                background: "white",
                                border: "1px solid #D1D5DB",
                                borderRadius: "8px",
                                fontSize: "14px",
                                fontWeight: "500",
                                color: "#6B7280",
                                cursor: "pointer",
                            }}
                        >
                            Cancel
                        </button>
                        <button
                            onClick={handleApply}
                            style={{
                                padding: "12px 24px",
                                background: "#0EA5E9",
                                border: "none",
                                borderRadius: "8px",
                                fontSize: "14px",
                                fontWeight: "600",
                                color: "white",
                                cursor: "pointer",
                            }}
                        >
                            Apply ({localSelection.length})
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}
