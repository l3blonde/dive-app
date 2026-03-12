"use client"

import { NavigationControl, GeolocateControl } from "react-map-gl/mapbox"
import { Fish, Anchor } from "lucide-react"

interface MapControlsProps {
    onMarineSpeciesClick: () => void
    mapMode?: "dive-sites" | "marine-species"
    onNearbyClick?: () => void
}

export function MapControls({ onMarineSpeciesClick, mapMode = "dive-sites", onNearbyClick }: MapControlsProps) {
    const SpeciesIcon = mapMode === "dive-sites" ? Fish : Anchor

    const buttonBase: React.CSSProperties = {
        position: "absolute",
        right: "10px",
        width: "40px",
        height: "40px",
        backgroundColor: "white",
        borderRadius: "12px",
        border: "none",
        boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
        cursor: "pointer",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 10,
        transition: "background-color 0.2s, transform 0.2s",
    }

    return (
        <>
            <GeolocateControl position="top-right" trackUserLocation={true} showUserHeading={true} />
            <NavigationControl position="top-right" showCompass={true} showZoom={true} />

            {/* Marine species / dive sites toggle */}
            <button
                onClick={onMarineSpeciesClick}
                style={{
                    ...buttonBase,
                    top: "32%",
                    transform: "translateY(-50%)",
                    backgroundColor: mapMode === "marine-species" ? "#1A2744" : "white",
                }}
                title={mapMode === "dive-sites" ? "View marine species" : "View dive sites"}
                aria-label={mapMode === "dive-sites" ? "Marine species mode" : "Dive sites mode"}
                onMouseEnter={(e) => { e.currentTarget.style.transform = "translateY(-50%) scale(1.05)" }}
                onMouseLeave={(e) => { e.currentTarget.style.transform = "translateY(-50%) scale(1)" }}
            >
                <Fish size={20} color={mapMode === "marine-species" ? "white" : "#333"} strokeWidth={2} />
            </button>

            {/* Nearby dive sites — Anchor icon */}
            <button
                onClick={onNearbyClick}
                style={{
                    ...buttonBase,
                    top: "calc(32% + 52px)",
                    transform: "translateY(-50%)",
                }}
                title="Nearby dive sites"
                aria-label="Nearby dive sites"
                onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = "#1A2744"
                    ;(e.currentTarget.querySelector("svg") as SVGElement | null)?.setAttribute("stroke", "white")
                }}
                onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = "white"
                    ;(e.currentTarget.querySelector("svg") as SVGElement | null)?.setAttribute("stroke", "#333")
                }}
            >
                <Anchor size={20} color="#333" strokeWidth={2} />
            </button>
        </>
    )
}
