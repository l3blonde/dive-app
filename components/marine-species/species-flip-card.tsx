"use client"

import { useState } from "react"
import { ChevronLeft, MapPin, Calendar, AlertCircle } from "lucide-react"
import type { MarineSpecies } from "@/lib/types"

interface SpeciesFlipCardProps {
    species: MarineSpecies
    locationCount: number
    onClose: () => void
    onFindDiveSites: () => void
    onFavorite: (speciesId: string) => void
    isFavorite: boolean
    colorOverlay: string
}

export function SpeciesFlipCard({
                                    species,
                                    locationCount,
                                    onClose,
                                    onFindDiveSites,
                                    onFavorite,
                                    isFavorite,
                                    colorOverlay,
                                }: SpeciesFlipCardProps) {
    const [isFlipped, setIsFlipped] = useState(false)

    return (
        <div
            style={{
                minWidth: "140px",
                width: "140px",
                height: "240px",
                perspective: "1200px",
                scrollSnapAlign: "center",
                position: "relative",
            }}
            onClick={(e) => e.stopPropagation()}
        >
            <div
                style={{
                    position: "relative",
                    width: "100%",
                    height: "100%",
                    transformStyle: "preserve-3d",
                    transform: isFlipped ? "rotateY(180deg)" : "rotateY(2deg) translateZ(20px)",
                    transition: "transform 0.6s cubic-bezier(0.4, 0.0, 0.2, 1)",
                    boxShadow: "0 4px 8px rgba(0,0,0,0.15), 0 8px 16px rgba(0,0,0,0.1), 0 16px 32px rgba(0,0,0,0.08)",
                }}
            >
                <div
                    onClick={() => setIsFlipped(true)}
                    style={{
                        position: "absolute",
                        width: "100%",
                        height: "100%",
                        backfaceVisibility: "hidden",
                        borderRadius: "16px",
                        overflow: "hidden",
                        cursor: "pointer",
                        backgroundImage: `url(${species.image_url || "https://xu5qaaigiohvkyk8.public.blob.vercel-storage.com/species-placeholder.png"})`,
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                    }}
                >
                    <div
                        style={{
                            position: "absolute",
                            top: 0,
                            left: 0,
                            right: 0,
                            bottom: 0,
                            background: colorOverlay,
                        }}
                    />

                    <div
                        style={{
                            position: "absolute",
                            bottom: 0,
                            left: 0,
                            right: 0,
                            padding: "12px",
                            background: "linear-gradient(to top, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.4) 70%, transparent 100%)",
                        }}
                    >
                        <h4
                            style={{
                                fontSize: "14px",
                                fontWeight: "700",
                                color: "white",
                                margin: 0,
                                textShadow: "0 1px 2px rgba(0,0,0,0.5)",
                            }}
                        >
                            {species.common_name}
                        </h4>
                        <p
                            style={{
                                fontSize: "11px",
                                color: "rgba(255,255,255,0.9)",
                                margin: "4px 0 0 0",
                                textTransform: "capitalize",
                            }}
                        >
                            {species.category}
                        </p>
                    </div>

                    <button
                        onClick={(e) => {
                            e.stopPropagation()
                            onFavorite(species.id)
                        }}
                        style={{
                            position: "absolute",
                            top: "12px",
                            right: "12px",
                            width: "32px",
                            height: "32px",
                            borderRadius: "50%",
                            background: "rgba(255,255,255,0.9)",
                            border: "none",
                            cursor: "pointer",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            transition: "transform 0.2s",
                            boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
                        }}
                    >
                        <svg
                            width="16"
                            height="16"
                            viewBox="0 0 24 24"
                            fill={isFavorite ? "#EF4444" : "none"}
                            stroke={isFavorite ? "#EF4444" : "rgba(0,0,0,0.4)"}
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        >
                            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                        </svg>
                    </button>
                </div>

                <div
                    style={{
                        position: "absolute",
                        width: "100%",
                        height: "100%",
                        backfaceVisibility: "hidden",
                        transform: "rotateY(180deg)",
                        borderRadius: "16px",
                        overflow: "hidden",
                        background: "white",
                    }}
                >
                    {/* Back button */}
                    <button
                        onClick={() => setIsFlipped(false)}
                        style={{
                            position: "absolute",
                            top: "8px",
                            left: "8px",
                            width: "28px",
                            height: "28px",
                            borderRadius: "50%",
                            background: "#F3F4F6",
                            border: "none",
                            cursor: "pointer",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            zIndex: 10,
                            transition: "transform 0.2s",
                        }}
                        onMouseEnter={(e) => {
                            e.currentTarget.style.transform = "scale(1.1)"
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.transform = "scale(1)"
                        }}
                    >
                        <ChevronLeft size={16} color="#1A1A33" />
                    </button>

                    {/* Heart button */}
                    <button
                        onClick={(e) => {
                            e.stopPropagation()
                            onFavorite(species.id)
                        }}
                        style={{
                            position: "absolute",
                            top: "8px",
                            right: "8px",
                            width: "28px",
                            height: "28px",
                            borderRadius: "50%",
                            background: "#F3F4F6",
                            border: "none",
                            cursor: "pointer",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            zIndex: 10,
                            transition: "transform 0.2s",
                        }}
                    >
                        <svg
                            width="14"
                            height="14"
                            viewBox="0 0 24 24"
                            fill={isFavorite ? "#EF4444" : "none"}
                            stroke={isFavorite ? "#EF4444" : "#9CA3AF"}
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        >
                            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                        </svg>
                    </button>

                    {/* Content */}
                    <div
                        style={{
                            padding: "44px 12px 12px 12px",
                            height: "100%",
                            display: "flex",
                            flexDirection: "column",
                            fontSize: "11px",
                        }}
                    >
                        <h3
                            style={{
                                fontSize: "14px",
                                fontWeight: "700",
                                color: "#1A1A33",
                                marginBottom: "4px",
                                lineHeight: 1.2,
                            }}
                        >
                            {species.common_name}
                        </h3>

                        <p
                            style={{
                                fontSize: "10px",
                                fontStyle: "italic",
                                color: "#9CA3AF",
                                marginBottom: "12px",
                            }}
                        >
                            {species.scientific_name || "Scientific name"}
                        </p>

                        <div style={{ flex: 1, overflowY: "auto", marginBottom: "8px" }}>
                            <div style={{ marginBottom: "10px" }}>
                                <div
                                    style={{
                                        display: "flex",
                                        alignItems: "center",
                                        gap: "4px",
                                        marginBottom: "4px",
                                    }}
                                >
                                    <MapPin size={12} color="#667eea" />
                                    <h4
                                        style={{
                                            fontSize: "11px",
                                            fontWeight: "600",
                                            color: "#1A1A33",
                                            margin: 0,
                                        }}
                                    >
                                        Habitat
                                    </h4>
                                </div>
                                <p
                                    style={{
                                        fontSize: "10px",
                                        color: "#6B7280",
                                        margin: "0 0 0 16px",
                                        lineHeight: 1.4,
                                    }}
                                >
                                    {species.habitat || "Tropical waters, coral reefs"}
                                </p>
                            </div>

                            <div style={{ marginBottom: "10px" }}>
                                <div
                                    style={{
                                        display: "flex",
                                        alignItems: "center",
                                        gap: "4px",
                                        marginBottom: "4px",
                                    }}
                                >
                                    <Calendar size={12} color="#667eea" />
                                    <h4
                                        style={{
                                            fontSize: "11px",
                                            fontWeight: "600",
                                            color: "#1A1A33",
                                            margin: 0,
                                        }}
                                    >
                                        Best Months
                                    </h4>
                                </div>
                                <p
                                    style={{
                                        fontSize: "10px",
                                        color: "#6B7280",
                                        margin: "0 0 0 16px",
                                        lineHeight: 1.4,
                                    }}
                                >
                                    {species.best_months || "Year-round"}
                                </p>
                            </div>

                            <div style={{ marginBottom: "8px" }}>
                                <div
                                    style={{
                                        display: "flex",
                                        alignItems: "center",
                                        gap: "4px",
                                        marginBottom: "4px",
                                    }}
                                >
                                    <AlertCircle size={12} color="#667eea" />
                                    <h4
                                        style={{
                                            fontSize: "11px",
                                            fontWeight: "600",
                                            color: "#1A1A33",
                                            margin: 0,
                                        }}
                                    >
                                        About
                                    </h4>
                                </div>
                                <p
                                    style={{
                                        fontSize: "10px",
                                        color: "#6B7280",
                                        margin: "0 0 0 16px",
                                        lineHeight: 1.4,
                                    }}
                                >
                                    Found in {locationCount} dive sites
                                </p>
                            </div>
                        </div>

                        <button
                            onClick={onFindDiveSites}
                            style={{
                                width: "100%",
                                padding: "10px",
                                background: "#3B82F6",
                                border: "none",
                                borderRadius: "8px",
                                fontSize: "11px",
                                fontWeight: "700",
                                color: "white",
                                cursor: "pointer",
                                transition: "background 0.2s",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                gap: "4px",
                            }}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.background = "#2563EB"
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.background = "#3B82F6"
                            }}
                        >
                            <MapPin size={14} />
                            <span>Find Dive Sites</span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}
