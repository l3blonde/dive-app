"use client"

import { MapPin, Plus, Minus, Compass, Fish, Waves } from "lucide-react"

interface MapControlsProps {
    onMarineSpeciesClick: () => void
    mapMode?: "dive-sites" | "marine-species"
    onZoomIn?: () => void
    onZoomOut?: () => void
    onLocate?: () => void
}

export function MapControls({ 
    onMarineSpeciesClick, 
    mapMode = "dive-sites",
    onZoomIn,
    onZoomOut,
    onLocate,
}: MapControlsProps) {
    const buttonStyle: React.CSSProperties = {
        width: "44px",
        height: "44px",
        backgroundColor: "rgba(255, 255, 255, 0.12)",
        backdropFilter: "blur(12px)",
        WebkitBackdropFilter: "blur(12px)",
        borderRadius: "12px",
        border: "1px solid rgba(255, 255, 255, 0.2)",
        boxShadow: "0 4px 16px rgba(0, 0, 0, 0.15), 0 0 12px rgba(0, 194, 215, 0.2)",
        cursor: "pointer",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        transition: "all 0.2s ease",
    }

    const handleMouseEnter = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.currentTarget.style.backgroundColor = "rgba(255, 255, 255, 0.2)"
        e.currentTarget.style.boxShadow = "0 4px 16px rgba(0, 0, 0, 0.2), 0 0 20px rgba(0, 194, 215, 0.4)"
    }

    const handleMouseLeave = (e: React.MouseEvent<HTMLButtonElement>, isActive = false) => {
        e.currentTarget.style.backgroundColor = isActive ? "rgba(0, 194, 215, 0.25)" : "rgba(255, 255, 255, 0.12)"
        e.currentTarget.style.boxShadow = isActive 
            ? "0 4px 16px rgba(0, 0, 0, 0.15), 0 0 20px rgba(0, 194, 215, 0.5)"
            : "0 4px 16px rgba(0, 0, 0, 0.15), 0 0 12px rgba(0, 194, 215, 0.2)"
    }

    return (
        <div
            style={{
                position: "absolute",
                top: "100px",
                right: "16px",
                display: "flex",
                flexDirection: "column",
                gap: "8px",
                zIndex: 10,
            }}
        >
            {/* Compass */}
            <button
                style={buttonStyle}
                title="Compass"
                aria-label="Compass"
                onMouseEnter={handleMouseEnter}
                onMouseLeave={(e) => handleMouseLeave(e)}
            >
                <Compass size={20} color="white" strokeWidth={1.6} />
            </button>

            {/* Location */}
            <button
                onClick={onLocate}
                style={buttonStyle}
                title="My location"
                aria-label="My location"
                onMouseEnter={handleMouseEnter}
                onMouseLeave={(e) => handleMouseLeave(e)}
            >
                <MapPin size={20} color="white" strokeWidth={1.6} />
            </button>

            {/* Zoom In */}
            <button
                onClick={onZoomIn}
                style={buttonStyle}
                title="Zoom in"
                aria-label="Zoom in"
                onMouseEnter={handleMouseEnter}
                onMouseLeave={(e) => handleMouseLeave(e)}
            >
                <Plus size={20} color="white" strokeWidth={1.6} />
            </button>

            {/* Zoom Out */}
            <button
                onClick={onZoomOut}
                style={buttonStyle}
                title="Zoom out"
                aria-label="Zoom out"
                onMouseEnter={handleMouseEnter}
                onMouseLeave={(e) => handleMouseLeave(e)}
            >
                <Minus size={20} color="white" strokeWidth={1.6} />
            </button>

            {/* Fish / Marine Life Toggle */}
            <button
                onClick={onMarineSpeciesClick}
                style={{
                    ...buttonStyle,
                    backgroundColor: mapMode === "marine-species" ? "rgba(0, 194, 215, 0.25)" : "rgba(255, 255, 255, 0.12)",
                    borderColor: mapMode === "marine-species" ? "rgba(0, 194, 215, 0.5)" : "rgba(255, 255, 255, 0.2)",
                    boxShadow: mapMode === "marine-species" 
                        ? "0 4px 16px rgba(0, 0, 0, 0.15), 0 0 20px rgba(0, 194, 215, 0.5)"
                        : "0 4px 16px rgba(0, 0, 0, 0.15), 0 0 12px rgba(0, 194, 215, 0.2)",
                }}
                title={mapMode === "dive-sites" ? "View marine species" : "View dive sites"}
                aria-label={mapMode === "dive-sites" ? "Marine species mode" : "Dive sites mode"}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={(e) => handleMouseLeave(e, mapMode === "marine-species")}
            >
                <Fish size={20} color={mapMode === "marine-species" ? "#00C2D7" : "white"} strokeWidth={1.6} />
            </button>

            {/* Waves / Layers */}
            <button
                style={buttonStyle}
                title="Map layers"
                aria-label="Map layers"
                onMouseEnter={handleMouseEnter}
                onMouseLeave={(e) => handleMouseLeave(e)}
            >
                <Waves size={20} color="white" strokeWidth={1.6} />
            </button>
        </div>
    )
}
