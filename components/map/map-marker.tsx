"use client"

interface MapMarkerProps {
    index: number
    onClick: () => void
}

export function MapMarker({ index, onClick }: MapMarkerProps) {
    return (
        <div
            onClick={onClick}
            style={{
                width: "52px",
                height: "52px",
                borderRadius: "50%",
                background: "radial-gradient(circle at 30% 25%, rgba(255,255,255,0.35), rgba(0,194,215,0.3) 35%, rgba(0,140,180,0.4) 60%, rgba(4,28,44,0.7))",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
                border: "2px solid rgba(0, 194, 215, 0.7)",
                boxShadow: [
                    "0 0 16px rgba(0, 194, 215, 0.8)",
                    "0 0 32px rgba(0, 194, 215, 0.5)",
                    "0 0 48px rgba(0, 194, 215, 0.25)",
                    "inset 0 0 12px rgba(0, 194, 215, 0.3)",
                    "inset 2px 2px 8px rgba(255, 255, 255, 0.25)",
                ].join(", "),
                transition: "all 0.25s ease-out",
                backdropFilter: "blur(8px)",
                WebkitBackdropFilter: "blur(8px)",
            }}
            onMouseEnter={(e) => {
                e.currentTarget.style.transform = "scale(1.15)"
                e.currentTarget.style.boxShadow = [
                    "0 0 24px rgba(0, 194, 215, 1)",
                    "0 0 48px rgba(0, 194, 215, 0.7)",
                    "0 0 72px rgba(0, 194, 215, 0.35)",
                    "inset 0 0 16px rgba(0, 194, 215, 0.4)",
                    "inset 2px 2px 10px rgba(255, 255, 255, 0.3)",
                ].join(", ")
            }}
            onMouseLeave={(e) => {
                e.currentTarget.style.transform = "scale(1)"
                e.currentTarget.style.boxShadow = [
                    "0 0 16px rgba(0, 194, 215, 0.8)",
                    "0 0 32px rgba(0, 194, 215, 0.5)",
                    "0 0 48px rgba(0, 194, 215, 0.25)",
                    "inset 0 0 12px rgba(0, 194, 215, 0.3)",
                    "inset 2px 2px 8px rgba(255, 255, 255, 0.25)",
                ].join(", ")
            }}
        >
            <span
                style={{
                    color: "white",
                    fontSize: "18px",
                    fontWeight: "700",
                    textShadow: "0 0 8px rgba(0, 194, 215, 0.6), 0 1px 2px rgba(0,0,0,0.5)",
                    letterSpacing: "-0.02em",
                }}
            >
                {index + 1}
            </span>
        </div>
    )
}
