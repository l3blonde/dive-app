"use client"

import { Bookmark } from "lucide-react"
import type { MarineSpecies } from "@/lib/types"

interface MarineSpeciesCardProps {
    species: MarineSpecies
    onViewProfile?: (species: MarineSpecies) => void
    onAddSighting?: (species: MarineSpecies) => void
    isFavorited?: boolean
}

export function MarineSpeciesCard({ species, onViewProfile, onAddSighting, isFavorited }: MarineSpeciesCardProps) {
    return (
        <div
            style={{
                background: "radial-gradient(ellipse 100% 80% at 50% 0%, rgba(0,194,215,0.15), rgba(4,24,38,0.4), rgba(4,24,38,0.6))",
                backdropFilter: "blur(16px)",
                WebkitBackdropFilter: "blur(16px)",
                border: "1px solid rgba(0, 194, 215, 0.3)",
                borderRadius: "16px",
                padding: "16px",
                marginBottom: "12px",
                overflow: "hidden",
                boxShadow: [
                    "0 0 12px rgba(0, 194, 215, 0.2)",
                    "inset 0 1px 0 rgba(255, 255, 255, 0.05)",
                ].join(", "),
            }}
        >
            {/* Image */}
            <div
                style={{
                    width: "100%",
                    height: "160px",
                    borderRadius: "12px",
                    overflow: "hidden",
                    marginBottom: "12px",
                    backgroundImage: `url(${species.image_url})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.3)",
                    position: "relative",
                }}
            >
                {/* Favorite Badge */}
                {isFavorited && (
                    <div
                        style={{
                            position: "absolute",
                            top: "8px",
                            right: "8px",
                            backgroundColor: "rgba(255, 184, 0, 0.9)",
                            borderRadius: "50%",
                            padding: "6px",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            boxShadow: "0 2px 8px rgba(0, 0, 0, 0.3)",
                        }}
                    >
                        <Bookmark size={14} fill="white" color="white" />
                    </div>
                )}
            </div>

            {/* Content */}
            <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                {/* Title Row */}
                <div style={{ minWidth: 0 }}>
                    <h3
                        style={{
                            fontSize: "15px",
                            fontWeight: "600",
                            color: "#FFFFFF",
                            margin: 0,
                            whiteSpace: "nowrap",
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                        }}
                    >
                        {species.common_name}
                    </h3>
                    <p
                        style={{
                            fontSize: "11px",
                            color: "rgba(0, 194, 215, 0.8)",
                            fontStyle: "italic",
                            margin: "2px 0 0 0",
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                            whiteSpace: "nowrap",
                        }}
                    >
                        {species.scientific_name}
                    </p>
                </div>

                {/* Category & Conservation Status */}
                <div
                    style={{
                        display: "flex",
                        gap: "8px",
                        flexWrap: "wrap",
                        fontSize: "10px",
                    }}
                >
                    <span
                        style={{
                            backgroundColor: "rgba(0, 194, 215, 0.2)",
                            color: "#00C2D7",
                            padding: "3px 8px",
                            borderRadius: "4px",
                            textTransform: "capitalize",
                            fontWeight: "500",
                        }}
                    >
                        {species.category}
                    </span>
                    {species.conservation_status && (
                        <span
                            style={{
                                backgroundColor: species.conservation_status.includes("Endangered")
                                    ? "rgba(255, 80, 80, 0.2)"
                                    : species.conservation_status.includes("Vulnerable")
                                      ? "rgba(255, 180, 0, 0.2)"
                                      : "rgba(80, 200, 80, 0.2)",
                                color: species.conservation_status.includes("Endangered")
                                    ? "#FF5050"
                                    : species.conservation_status.includes("Vulnerable")
                                      ? "#FFB400"
                                      : "#50C850",
                                padding: "3px 8px",
                                borderRadius: "4px",
                                fontWeight: "600",
                            }}
                        >
                            {species.conservation_status}
                        </span>
                    )}
                </div>

                {/* Habitat & Best Months */}
                <div style={{ fontSize: "11px", color: "rgba(255, 255, 255, 0.6)" }}>
                    {species.habitat && (
                        <div style={{ marginBottom: "4px" }}>
                            <span style={{ fontWeight: "500", color: "rgba(0, 194, 215, 0.8)" }}>Habitat:</span> {species.habitat}
                        </div>
                    )}
                    {species.best_months && (
                        <div>
                            <span style={{ fontWeight: "500", color: "rgba(0, 194, 215, 0.8)" }}>Best Months:</span> {species.best_months}
                        </div>
                    )}
                </div>

                {/* Description */}
                {species.description && (
                    <p
                        style={{
                            fontSize: "12px",
                            color: "rgba(255, 255, 255, 0.6)",
                            margin: "4px 0 0 0",
                            lineHeight: "1.4",
                        }}
                    >
                        {species.description}
                    </p>
                )}

                {/* Size & Distinctive Features */}
                <div style={{ fontSize: "11px", color: "rgba(255, 255, 255, 0.6)" }}>
                    {species.size && (
                        <div style={{ marginBottom: "4px" }}>
                            <span style={{ fontWeight: "500", color: "rgba(0, 194, 215, 0.8)" }}>Size:</span> {species.size}
                        </div>
                    )}
                    {species.distinctive_features && (
                        <div>
                            <span style={{ fontWeight: "500", color: "rgba(0, 194, 215, 0.8)" }}>Features:</span> {species.distinctive_features}
                        </div>
                    )}
                </div>

                {/* CTAs */}
                <div style={{ display: "flex", gap: "8px", marginTop: "12px" }}>
                    <button
                        onClick={() => onAddSighting?.(species)}
                        style={{
                            flex: 1,
                            padding: "8px 12px",
                            borderRadius: "8px",
                            border: "1px solid rgba(0, 194, 215, 0.5)",
                            background: "rgba(0, 194, 215, 0.1)",
                            color: "#00C2D7",
                            fontSize: "12px",
                            fontWeight: "600",
                            cursor: "pointer",
                            transition: "all 0.2s ease-out",
                        }}
                        onMouseEnter={(e) => {
                            e.currentTarget.style.background = "rgba(0, 194, 215, 0.2)"
                            e.currentTarget.style.borderColor = "rgba(0, 194, 215, 0.7)"
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.background = "rgba(0, 194, 215, 0.1)"
                            e.currentTarget.style.borderColor = "rgba(0, 194, 215, 0.5)"
                        }}
                    >
                        Add Sighting
                    </button>
                    <button
                        onClick={() => onViewProfile?.(species)}
                        style={{
                            flex: 1,
                            padding: "8px 12px",
                            borderRadius: "8px",
                            border: "none",
                            background: "linear-gradient(135deg, rgba(0, 194, 215, 0.4), rgba(0, 194, 215, 0.2))",
                            color: "#00C2D7",
                            fontSize: "12px",
                            fontWeight: "600",
                            cursor: "pointer",
                            transition: "all 0.2s ease-out",
                            boxShadow: "0 0 8px rgba(0, 194, 215, 0.3)",
                        }}
                        onMouseEnter={(e) => {
                            e.currentTarget.style.background = "linear-gradient(135deg, rgba(0, 194, 215, 0.5), rgba(0, 194, 215, 0.3))"
                            e.currentTarget.style.boxShadow = "0 0 12px rgba(0, 194, 215, 0.5)"
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.background = "linear-gradient(135deg, rgba(0, 194, 215, 0.4), rgba(0, 194, 215, 0.2))"
                            e.currentTarget.style.boxShadow = "0 0 8px rgba(0, 194, 215, 0.3)"
                        }}
                    >
                        View Profile
                    </button>
                </div>
            </div>
        </div>
    )
}
