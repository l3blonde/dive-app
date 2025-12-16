"use client"

import { useState } from "react"
import { ChevronLeft, MapPin, Waves, AlertCircle } from "lucide-react"
import type { DiveSite } from "@/lib/types"

interface DiveSiteFlipCardProps {
    site: DiveSite
    onViewSite: () => void
    onFavorite: (siteId: string) => void
    isFavorite: boolean
    getDifficultyIcon: (difficulty: string) => any
}

export function DiveSiteFlipCard({
                                     site,
                                     onViewSite,
                                     onFavorite,
                                     isFavorite,
                                     getDifficultyIcon,
                                 }: DiveSiteFlipCardProps) {
    const [isFlipped, setIsFlipped] = useState(false)

    console.log("[v0] DiveSiteFlipCard - site:", site.name, "isFlipped:", isFlipped)

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
                {/* Front face */}
                <div
                    onClick={() => {
                        console.log("Front face clicked - flipping to back")
                        setIsFlipped(true)
                    }}
                    style={{
                        position: "absolute",
                        width: "100%",
                        height: "100%",
                        backfaceVisibility: "hidden",
                        borderRadius: "16px",
                        overflow: "hidden",
                        cursor: "pointer",
                        backgroundImage: `url(${site.image_url || "https://xu5qaaigiohvkyk8.public.blob.vercel-storage.com/site-placeholder.png"})`,
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                    }}
                >
                    {/* Text overlay at bottom */}
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
                                lineHeight: 1.2,
                            }}
                        >
                            {site.name}
                        </h4>
                        <p
                            style={{
                                fontSize: "11px",
                                color: "rgba(255,255,255,0.9)",
                                margin: "4px 0 0 0",
                            }}
                        >
                            {site.location_name?.replace(/^[,.\s]+/, "")}
                        </p>
                    </div>

                    {/* Heart button */}
                    <button
                        onClick={(e) => {
                            e.stopPropagation()
                            onFavorite(site.id)
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

                    {/* Rating badge */}
                    <div
                        style={{
                            position: "absolute",
                            bottom: "52px",
                            right: "12px",
                            background: "rgba(59, 130, 246, 0.95)",
                            borderRadius: "20px",
                            padding: "4px 10px",
                            display: "flex",
                            alignItems: "center",
                            gap: "4px",
                            boxShadow: "0 2px 8px rgba(0,0,0,0.2)",
                        }}
                    >
                        <span style={{ fontSize: "12px" }}>⭐</span>
                        <span style={{ fontSize: "12px", fontWeight: "700", color: "white" }}>4.7</span>
                    </div>
                </div>

                {/* Back face */}
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
                        zIndex: 20,
                        pointerEvents: "auto",
                    }}
                >
                    {/* Back button */}
                    <button
                        onClick={(e) => {
                            e.stopPropagation()
                            console.log("[Back button clicked - flipping to front")
                            setIsFlipped(false)
                        }}
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
                            zIndex: 30,
                            pointerEvents: "auto",
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
                            onFavorite(site.id)
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
                            zIndex: 30,
                            pointerEvents: "auto",
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
                            {site.name}
                        </h3>

                        <p
                            style={{
                                fontSize: "10px",
                                color: "#9CA3AF",
                                marginBottom: "12px",
                                display: "flex",
                                alignItems: "center",
                                gap: "4px",
                            }}
                        >
                            <MapPin size={10} />
                            {site.location_name?.replace(/^[,.\s]+/, "")}
                        </p>

                        <div style={{ flex: 1, overflowY: "auto", marginBottom: "8px", maxHeight: "120px" }}>
                            <div style={{ marginBottom: "10px" }}>
                                <div
                                    style={{
                                        display: "flex",
                                        alignItems: "center",
                                        gap: "4px",
                                        marginBottom: "4px",
                                    }}
                                >
                                    <Waves size={12} color="#3B82F6" />
                                    <h4
                                        style={{
                                            fontSize: "11px",
                                            fontWeight: "600",
                                            color: "#1A1A33",
                                            margin: 0,
                                        }}
                                    >
                                        Depth
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
                                    {site.min_depth}-{site.max_depth}m
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
                                    <AlertCircle size={12} color="#3B82F6" />
                                    <h4
                                        style={{
                                            fontSize: "11px",
                                            fontWeight: "600",
                                            color: "#1A1A33",
                                            margin: 0,
                                        }}
                                    >
                                        Difficulty
                                    </h4>
                                </div>
                                <p
                                    style={{
                                        fontSize: "10px",
                                        color: "#6B7280",
                                        margin: "0 0 0 16px",
                                        lineHeight: 1.4,
                                        textTransform: "capitalize",
                                        display: "flex",
                                        alignItems: "center",
                                        gap: "4px",
                                    }}
                                >
                                    {(() => {
                                        const IconComponent = getDifficultyIcon(site.difficulty)
                                        return <IconComponent size={10} />
                                    })()}
                                    {site.difficulty}
                                </p>
                            </div>

                            <div style={{ marginBottom: "8px" }}>
                                <p
                                    style={{
                                        fontSize: "10px",
                                        color: "#6B7280",
                                        lineHeight: 1.4,
                                    }}
                                >
                                    {site.description}
                                </p>
                            </div>
                        </div>

                        <button
                            onClick={onViewSite}
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
                            <span>View Site</span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}
