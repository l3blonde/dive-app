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
                width: "48px",
                height: "48px",
                borderRadius: "50%",
                background: "#3B5FCC",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
                boxShadow: "0 2px 8px rgba(0,0,0,0.3)",
                border: "3px solid white",
                transition: "transform 0.2s",
            }}
            onMouseEnter={(e) => {
                e.currentTarget.style.transform = "scale(1.1)"
            }}
            onMouseLeave={(e) => {
                e.currentTarget.style.transform = "scale(1)"
            }}
        >
      <span
          style={{
              color: "white",
              fontSize: "18px",
              fontWeight: "bold",
          }}
      >
        {index + 1}
      </span>
        </div>
    )
}
