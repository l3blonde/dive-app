"use client"

import type React from "react"
import { useState } from "react"
import { MapPin, Waves, AlertCircle, X, Heart, ArrowLeft, Star } from "lucide-react"
import type { DiveSite } from "@/lib/types"
import { getDifficultyIcon } from "@/lib/utils/dive-site"
import type { LucideIcon } from "lucide-react"

interface SitePopupProps {
    site: DiveSite
    imageUrl: string
    isDescriptionExpanded: boolean
    onClose: () => void
    onToggleDescription: () => void
    onFavorite: (siteId: string) => void
    isFavorite: boolean
}

export function SitePopup({
                              site,
                              imageUrl,
                              isDescriptionExpanded,
                              onClose,
                              onToggleDescription,
                              onFavorite,
                              isFavorite,
                          }: SitePopupProps) {
    const [isFlipped, setIsFlipped] = useState(false)

    // Safe handler for onFavorite
    const handleFavorite = (e: React.MouseEvent) => {
        e.stopPropagation()
        if (typeof onFavorite === "function") {
            onFavorite(site.id)
        } else {
            console.error("onFavorite is not a function:", onFavorite)
        }
    }

    return (
        <div
            style={{
                position: "fixed",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                zIndex: 1000,
                perspective: "1200px",
            }}
        >
            <div
                style={{
                    width: "200px",
                    height: "280px",
                    transformStyle: "preserve-3d",
                    transform: isFlipped ? "rotateY(180deg)" : "rotateY(0deg)",
                    transition: "transform 0.6s cubic-bezier(0.4, 0.0, 0.2, 1)",
                    position: "relative",
                    boxShadow: "0 4px 8px rgba(0,0,0,0.15), 0 8px 16px rgba(0,0,0,0.1), 0 16px 32px rgba(0,0,0,0.08)",
                }}
            >
                {/* Front face */}
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
                        backgroundImage: `url(${imageUrl || "https://xu5qaaigiohvkyk8.public.blob.vercel-storage.com/site-placeholder.png"})`,
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                    }}
                >
                    {/* Close button */}
                    <button
                        onClick={(e) => {
                            e.stopPropagation()
                            onClose()
                        }}
                        style={{
                            position: "absolute",
                            top: "12px",
                            left: "12px",
                            width: "32px",
                            height: "32px",
                            borderRadius: "50%",
                            background: "rgba(255,255,255,0.9)",
                            border: "none",
                            cursor: "pointer",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            fontSize: "16px",
                            color: "#6B7280",
                            zIndex: 10,
                            transition: "background 0.2s",
                            boxShadow: "0 2px 8px rgba(0,0,0,0.2)",
                        }}
                    >
                        <X size={16} color="#6B7280" />
                    </button>

                    {/* Text overlay at bottom */}
                    <div
                        style={{
                            position: "absolute",
                            bottom: 0,
                            left: 0,
                            right: 0,
                            padding: "16px",
                            background: "linear-gradient(to top, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.4) 70%, transparent 100%)",
                        }}
                    >
                        <h4
                            style={{
                                fontSize: "16px",
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
                                fontSize: "12px",
                                color: "rgba(255,255,255,0.9)",
                                margin: "4px 0 0 0",
                            }}
                        >
                            {site.location_name?.replace(/^[,.\s]+/, "")}
                        </p>
                    </div>

                    {/* Heart button */}
                    <button
                        onClick={handleFavorite}
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
                            zIndex: 10,
                        }}
                    >
                        <Heart size={16} color={isFavorite ? "#EF4444" : "rgba(0,0,0,0.4)"} />
                    </button>

                    {/* Rating badge */}
                    <div
                        style={{
                            position: "absolute",
                            bottom: "68px",
                            right: "16px",
                            background: "rgba(59, 130, 246, 0.95)",
                            borderRadius: "20px",
                            padding: "4px 10px",
                            display: "flex",
                            alignItems: "center",
                            gap: "4px",
                            boxShadow: "0 2px 8px rgba(0,0,0,0.2)",
                        }}
                    >
                        <Star size={12} color="white" />
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
                        zIndex: 20, // Added z-index to establish stacking context
                        pointerEvents: "auto", // Ensure clicks work on back face
                    }}
                >
                    {/* Back button */}
                    <button
                        onClick={(e) => {
                            e.stopPropagation()
                            setIsFlipped(false)
                        }}
                        style={{
                            position: "absolute",
                            top: "12px",
                            left: "12px",
                            width: "32px",
                            height: "32px",
                            borderRadius: "50%",
                            background: "#F3F4F6",
                            border: "none",
                            cursor: "pointer",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            zIndex: 30,
                            pointerEvents: "auto",
                        }}
                    >
                        <ArrowLeft size={18} color="#1A1A33" />
                    </button>

                    {/* Close button */}
                    <button
                        onClick={(e) => {
                            e.stopPropagation()
                            onClose()
                        }}
                        style={{
                            position: "absolute",
                            top: "12px",
                            right: "12px",
                            width: "32px",
                            height: "32px",
                            borderRadius: "50%",
                            background: "#F3F4F6",
                            border: "none",
                            cursor: "pointer",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            fontSize: "16px",
                            color: "#6B7280",
                            zIndex: 30,
                            pointerEvents: "auto",
                        }}
                    >
                        <X size={16} color="#6B7280" />
                    </button>

                    {/* Content */}
                    <div
                        style={{
                            padding: "52px 16px 16px 16px",
                            height: "100%",
                            display: "flex",
                            flexDirection: "column",
                            fontSize: "12px",
                        }}
                    >
                        <h3
                            style={{
                                fontSize: "16px",
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
                                fontSize: "11px",
                                color: "#9CA3AF",
                                marginBottom: "12px",
                                display: "flex",
                                alignItems: "center",
                                gap: "4px",
                            }}
                        >
                            <MapPin size={11} />
                            {site.location_name?.replace(/^[,.\s]+/, "")}
                        </p>

                        <div style={{ flex: 1, overflowY: "auto", marginBottom: "12px", maxHeight: "160px" }}>
                            <div style={{ marginBottom: "10px" }}>
                                <div
                                    style={{
                                        display: "flex",
                                        alignItems: "center",
                                        gap: "4px",
                                        marginBottom: "4px",
                                    }}
                                >
                                    <Waves size={14} color="#3B82F6" />
                                    <h4
                                        style={{
                                            fontSize: "12px",
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
                                        fontSize: "11px",
                                        color: "#6B7280",
                                        margin: "0 0 0 18px",
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
                                    <AlertCircle size={14} color="#3B82F6" />
                                    <h4
                                        style={{
                                            fontSize: "12px",
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
                                        fontSize: "11px",
                                        color: "#6B7280",
                                        margin: "0 0 0 18px",
                                        lineHeight: 1.4,
                                        textTransform: "capitalize",
                                        display: "flex",
                                        alignItems: "center",
                                        gap: "4px",
                                    }}
                                >
                                    {(() => {
                                        const DifficultyIcon = getDifficultyIcon(site.difficulty) as LucideIcon
                                        return <DifficultyIcon size={14} className="flex-shrink-0" />
                                    })()}
                                    {site.difficulty}
                                </p>
                            </div>

                            {isDescriptionExpanded && (
                                <div style={{ marginBottom: "8px" }}>
                                    <p
                                        style={{
                                            fontSize: "11px",
                                            color: "#6B7280",
                                            lineHeight: 1.4,
                                        }}
                                    >
                                        {site.description}
                                    </p>
                                </div>
                            )}
                        </div>

                        <button
                            onClick={onToggleDescription}
                            style={{
                                width: "100%",
                                padding: "8px",
                                background: "white",
                                border: "1px solid #E5E7EB",
                                borderRadius: "8px",
                                fontSize: "11px",
                                fontWeight: "600",
                                color: "#3B82F6",
                                cursor: "pointer",
                                marginBottom: "8px",
                            }}
                        >
                            {isDescriptionExpanded ? "SHOW LESS" : "READ MORE"}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}
