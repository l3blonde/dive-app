"use client"
import { SpeciesFlipCard } from "./species-flip-card"
import type { MarineSpecies } from "@/lib/types"

interface SpeciesBrowserProps {
    species: MarineSpecies[]
    onSpeciesSelect: (species: MarineSpecies) => void
    selectedSpeciesId?: string
    onClose: () => void
    onFavorite: (speciesId: string) => void
    favorites: string[]
}

export function SpeciesBrowser({
                                   species,
                                   onSpeciesSelect,
                                   selectedSpeciesId,
                                   onClose,
                                   onFavorite,
                                   favorites,
                               }: SpeciesBrowserProps) {
    const selectedSpecies = species.find((s) => s.id === selectedSpeciesId)

    return (
        <>
            <div
                onClick={onClose}
                style={{
                    position: "fixed",
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    background: "rgba(0, 0, 0, 0.3)",
                    zIndex: 60,
                }}
            />

            <div
                style={{
                    position: "fixed",
                    bottom: "180px",
                    left: 0,
                    right: 0,
                    zIndex: 61,
                    perspective: "1200px",
                }}
            >
                <div
                    style={{
                        display: "flex",
                        gap: "12px",
                        overflowX: "auto",
                        padding: "0 16px 0 16px",
                        paddingRight: "80px",
                        scrollSnapType: "x mandatory",
                        WebkitOverflowScrolling: "touch",
                        scrollbarWidth: "none",
                        msOverflowStyle: "none",
                    }}
                    className="hide-scrollbar"
                >
                    {species.map((sp) => {
                        const isFavorite = favorites.includes(sp.id)
                        const isSelected = sp.id === selectedSpeciesId

                        const overlayColors: Record<string, string> = {
                            shark: "rgb(59, 130, 246)",
                            ray: "rgb(168, 85, 247)",
                            fish: "rgb(34, 197, 94)",
                            coral: "rgb(251, 146, 60)",
                            crustacean: "rgb(236, 72, 153)",
                            other: "rgb(99, 102, 241)",
                        }

                        if (isSelected) {
                            return (
                                <SpeciesFlipCard
                                    key={sp.id}
                                    species={sp}
                                    locationCount={Math.floor(Math.random() * 15) + 3}
                                    onClose={() => onSpeciesSelect(sp)}
                                    onFindDiveSites={() => {
                                        console.log("Finding dive sites for species:", sp.common_name)
                                        onClose()
                                    }}
                                    onFavorite={onFavorite}
                                    isFavorite={isFavorite}
                                    colorOverlay={overlayColors[sp.category] || overlayColors.other}
                                />
                            )
                        }

                        return (
                            <div
                                key={sp.id}
                                onClick={() => onSpeciesSelect(sp)}
                                style={{
                                    minWidth: "140px",
                                    width: "140px",
                                    height: "240px",
                                    scrollSnapAlign: "center",
                                    cursor: "pointer",
                                    transition: "transform 0.2s ease",
                                }}
                                onMouseEnter={(e) => {
                                    e.currentTarget.style.transform = "translateY(-4px)"
                                }}
                                onMouseLeave={(e) => {
                                    e.currentTarget.style.transform = "translateY(0)"
                                }}
                            >
                                <div
                                    style={{
                                        width: "100%",
                                        height: "100%",
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "center",
                                        position: "relative",
                                        backgroundImage: `url(${sp.image_url || "/placeholder.svg"})`,
                                        backgroundSize: "cover",
                                        backgroundPosition: "center",
                                        borderRadius: "16px",
                                        overflow: "hidden",
                                        boxShadow: "0 4px 12px rgba(0,0,0,0.15), 0 8px 24px rgba(0,0,0,0.1), 0 16px 48px rgba(0,0,0,0.1)",
                                    }}
                                >
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
                                            {sp.common_name}
                                        </h4>
                                        <p
                                            style={{
                                                fontSize: "11px",
                                                color: "rgba(255,255,255,0.9)",
                                                margin: "4px 0 0 0",
                                                textTransform: "capitalize",
                                            }}
                                        >
                                            {sp.category}
                                        </p>
                                    </div>

                                    <button
                                        onClick={(e) => {
                                            e.stopPropagation()
                                            onFavorite(sp.id)
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
                                        onMouseEnter={(e) => {
                                            e.currentTarget.style.transform = "scale(1.1)"
                                        }}
                                        onMouseLeave={(e) => {
                                            e.currentTarget.style.transform = "scale(1)"
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
                            </div>
                        )
                    })}
                </div>
            </div>
        </>
    )
}
