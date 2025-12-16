"use client"

import { NavigationControl, GeolocateControl } from "react-map-gl/mapbox"
import { Fish, MapPin } from "lucide-react"

interface MapControlsProps {
    onMarineSpeciesClick: () => void
    mapMode?: "dive-sites" | "marine-species"
}

export function MapControls({ onMarineSpeciesClick, mapMode = "dive-sites" }: MapControlsProps) {
    const Icon = mapMode === "dive-sites" ? Fish : MapPin

    return (
        <>
            <GeolocateControl position="top-right" trackUserLocation={true} showUserHeading={true} />
            <NavigationControl position="top-right" showCompass={true} showZoom={true} />

            <button
                onClick={onMarineSpeciesClick}
                style={{
                    position: "absolute",
                    top: "32%",
                    right: "10px",
                    transform: "translateY(-50%)",
                    width: "40px",
                    height: "40px",
                    backgroundColor: mapMode === "marine-species" ? "#3B82F6" : "white",
                    borderRadius: "4px",
                    border: "none",
                    boxShadow: "0 0 0 2px rgba(0,0,0,0.1)",
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    zIndex: 10,
                    transition: "background-color 0.3s, transform 0.2s",
                }}
                title={mapMode === "dive-sites" ? "View marine species" : "View dive sites"}
                aria-label={mapMode === "dive-sites" ? "Marine species mode" : "Dive sites mode"}
                onMouseEnter={(e) => {
                    e.currentTarget.style.transform = "translateY(-50%) scale(1.05)"
                }}
                onMouseLeave={(e) => {
                    e.currentTarget.style.transform = "translateY(-50%) scale(1)"
                }}
            >
                <Icon size={20} color={mapMode === "marine-species" ? "white" : "#333"} strokeWidth={2} />
            </button>
        </>
    )
}
