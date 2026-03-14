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
        width: "40px",
        height: "40px",
        backgroundColor: "rgba(4, 24, 38, 0.55)",
        backdropFilter: "blur(20px)",
        WebkitBackdropFilter: "blur(20px)",
        borderRadius: "12px",
        border: "1px solid rgba(0, 194, 215, 0.25)",
        boxShadow: [
            "0 4px 24px rgba(0, 0, 0, 0.5)",
            "0 0 12px rgba(0, 194, 215, 0.18)",
            "inset 0 1px 0 rgba(255, 255, 255, 0.08)",
            "inset 0 -1px 0 rgba(0, 0, 0, 0.25)",
        ].join(", "),
        cursor: "pointer",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        transition: "all 0.2s ease-out",
    }

    const handleMouseEnter = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.currentTarget.style.backgroundColor = "rgba(0, 194, 215, 0.15)"
        e.currentTarget.style.borderColor = "rgba(0, 194, 215, 0.5)"
        e.currentTarget.style.boxShadow = [
            "0 4px 24px rgba(0, 0, 0, 0.5)",
            "0 0 20px rgba(0, 194, 215, 0.4)",
            "inset 0 1px 0 rgba(255, 255, 255, 0.1)",
        ].join(", ")
    }

    const handleMouseLeave = (e: React.MouseEvent<HTMLButtonElement>, isActive = false) => {
        e.currentTarget.style.backgroundColor = isActive ? "rgba(0, 194, 215, 0.2)" : "rgba(4, 24, 38, 0.55)"
        e.currentTarget.style.borderColor = isActive ? "rgba(0, 194, 215, 0.5)" : "rgba(0, 194, 215, 0.25)"
        e.currentTarget.style.boxShadow = isActive
            ? [
                "0 4px 24px rgba(0, 0, 0, 0.5)",
                "0 0 20px rgba(0, 194, 215, 0.45)",
                "inset 0 1px 0 rgba(255, 255, 255, 0.08)",
            ].join(", ")
            : [
                "0 4px 24px rgba(0, 0, 0, 0.5)",
                "0 0 12px rgba(0, 194, 215, 0.18)",
                "inset 0 1px 0 rgba(255, 255, 255, 0.08)",
            ].join(", ")
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
                    backgroundColor: mapMode === "marine-species" ? "rgba(0, 194, 215, 0.2)" : "rgba(6, 43, 61, 0.4)",
                    borderColor: mapMode === "marine-species" ? "rgba(0, 194, 215, 0.4)" : "rgba(0, 194, 215, 0.15)",
                    boxShadow: mapMode === "marine-species" 
                        ? "0 8px 32px rgba(0, 0, 0, 0.4), 0 0 20px rgba(0, 194, 215, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.05)"
                        : "0 8px 32px rgba(0, 0, 0, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.05)",
                }}
                title={mapMode === "dive-sites" ? "View marine species" : "View dive sites"}
                aria-label={mapMode === "dive-sites" ? "Marine species mode" : "Dive sites mode"}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={(e) => handleMouseLeave(e, mapMode === "marine-species")}
            >
                <Fish size={20} color={mapMode === "marine-species" ? "#00C2D7" : "rgba(255, 255, 255, 0.7)"} strokeWidth={1.6} />
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
