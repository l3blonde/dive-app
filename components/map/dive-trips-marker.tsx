"use client"

import { Anchor } from "lucide-react"

interface DiveTripsMarkerProps {
    imageUrl?: string
    isSelected?: boolean
    onClick: () => void
}

export function DiveTripsMarker({ imageUrl, isSelected = false, onClick }: DiveTripsMarkerProps) {
    return (
        <div
            onClick={onClick}
            style={{
                width: "56px",
                height: "56px",
                cursor: "pointer",
                position: "relative",
                transition: "transform 0.25s ease-out",
            }}
            onMouseEnter={(e) => {
                e.currentTarget.style.transform = "scale(1.1)"
            }}
            onMouseLeave={(e) => {
                e.currentTarget.style.transform = "scale(1)"
            }}
        >
            {/* 3D Bubble with aqua glow */}
            <div
                style={{
                    position: "absolute",
                    inset: 0,
                    borderRadius: "50%",
                    overflow: "hidden",
                    border: isSelected ? "2px solid rgba(0, 194, 215, 0.95)" : "2px solid rgba(0, 194, 215, 0.6)",
                    boxShadow: isSelected
                        ? [
                            "0 0 18px rgba(0, 194, 215, 1)",
                            "0 0 40px rgba(0, 194, 215, 0.7)",
                            "0 0 60px rgba(0, 194, 215, 0.35)",
                            "inset 0 0 18px rgba(0, 194, 215, 0.4)",
                        ].join(", ")
                        : [
                            "0 0 14px rgba(0, 194, 215, 0.85)",
                            "0 0 32px rgba(0, 194, 215, 0.5)",
                            "0 0 52px rgba(0, 194, 215, 0.25)",
                            "inset 0 0 14px rgba(0, 194, 215, 0.3)",
                        ].join(", "),
                    transition: "all 0.25s ease-out",
                }}
            >
                {/* Background image OR fallback gradient with icon */}
                {imageUrl ? (
                    <>
                        <img
                            src={imageUrl}
                            alt=""
                            style={{
                                width: "100%",
                                height: "100%",
                                objectFit: "cover",
                            }}
                        />
                        {/* Overlay gradient for 3D effect */}
                        <div
                            style={{
                                position: "absolute",
                                inset: 0,
                                background: "radial-gradient(circle at 30% 25%, rgba(255,255,255,0.25) 0%, transparent 40%, rgba(0,0,0,0.2) 100%)",
                                pointerEvents: "none",
                            }}
                        />
                    </>
                ) : (
                    <div
                        style={{
                            width: "100%",
                            height: "100%",
                            background: isSelected
                                ? "radial-gradient(circle at 30% 25%, rgba(255,255,255,0.45), rgba(0,194,215,0.35) 35%, rgba(4,28,44,0.7))"
                                : "radial-gradient(circle at 30% 25%, rgba(255,255,255,0.35), rgba(0,194,215,0.22) 35%, rgba(4,28,44,0.65))",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                        }}
                    >
                        <Anchor 
                            size={24} 
                            color="#FFFFFF"
                            strokeWidth={1.8}
                            style={{
                                filter: "drop-shadow(0 0 6px rgba(0, 194, 215, 0.7))",
                            }}
                        />
                    </div>
                )}
            </div>

            {/* Inner highlight ring for 3D depth */}
            <div
                style={{
                    position: "absolute",
                    inset: "2px",
                    borderRadius: "50%",
                    border: "1px solid rgba(255, 255, 255, 0.2)",
                    pointerEvents: "none",
                    background: "radial-gradient(circle at 30% 20%, rgba(255,255,255,0.15) 0%, transparent 50%)",
                }}
            />

            {/* Pulse animation ring for selected state */}
            {isSelected && (
                <div
                    style={{
                        position: "absolute",
                        inset: "-4px",
                        borderRadius: "50%",
                        border: "2px solid rgba(0, 194, 215, 0.5)",
                        animation: "trips-marker-pulse 2s ease-out infinite",
                    }}
                />
            )}

            {/* Inject keyframes */}
            <style>{`
                @keyframes trips-marker-pulse {
                    0% {
                        transform: scale(1);
                        opacity: 0.6;
                    }
                    100% {
                        transform: scale(1.4);
                        opacity: 0;
                    }
                }
            `}</style>
        </div>
    )
}
