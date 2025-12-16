"use client"
import { useState, useEffect, useRef } from "react"
import { DiveSiteFlipCard } from "./dive-site-flip-card"
import type { DiveSite } from "@/lib/types"
import type { LucideIcon } from "lucide-react"

interface SiteCarouselProps {
    sites: DiveSite[]
    onCardClick: (site: DiveSite) => void
    onClose: () => void
    getDifficultyIcon: (difficulty: string) => LucideIcon
    onIndexChange: (index: number) => void
}

export function SiteCarousel({ sites, onCardClick, onClose, getDifficultyIcon, onIndexChange }: SiteCarouselProps) {
    const scrollContainerRef = useRef<HTMLDivElement>(null)
    const [selectedSiteId, setSelectedSiteId] = useState<string | null>(null)

    useEffect(() => {
        console.log("[v0] ===== CAROUSEL MOUNTED =====")
        console.log("[v0] Sites count:", sites.length)
        console.log("[v0] Scroll container ref:", scrollContainerRef.current)

        if (scrollContainerRef.current) {
            const rect = scrollContainerRef.current.getBoundingClientRect()
            console.log("[v0] Scroll container dimensions:", {
                width: rect.width,
                height: rect.height,
                top: rect.top,
                left: rect.left,
                bottom: rect.bottom,
                right: rect.right,
            })
            console.log("[v0] Scroll container computed style:")
            const computed = window.getComputedStyle(scrollContainerRef.current)
            console.log("  - position:", computed.position)
            console.log("  - zIndex:", computed.zIndex)
            console.log("  - pointerEvents:", computed.pointerEvents)
            console.log("  - display:", computed.display)
            console.log("  - visibility:", computed.visibility)

            // Check first card
            const firstCard = scrollContainerRef.current.querySelector('div[style*="cursor: pointer"]')
            if (firstCard) {
                const cardRect = firstCard.getBoundingClientRect()
                console.log("[v0] First card dimensions:", {
                    width: cardRect.width,
                    height: cardRect.height,
                    top: cardRect.top,
                    left: cardRect.left,
                })
                const cardStyle = window.getComputedStyle(firstCard)
                console.log("[v0] First card computed style:")
                console.log("  - pointerEvents:", cardStyle.pointerEvents)
                console.log("  - cursor:", cardStyle.cursor)
            }
        }
        console.log("[v0] ===============================")
    }, [sites])

    console.log("[v0] SiteCarousel - selectedSiteId:", selectedSiteId)
    console.log("[v0] SiteCarousel - sites count:", sites.length)

    return (
        <div
            style={{
                position: "fixed",
                bottom: "180px",
                left: 0,
                right: 0,
                zIndex: 1000,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
            }}
            onClick={() => {
                console.log("[v0] CONTAINER OUTER DIV CLICKED - This should NOT happen if cards work")
            }}
        >
            <div
                ref={scrollContainerRef}
                onClick={() => {
                    console.log("SCROLL CONTAINER CLICKED")
                }}
                onMouseMove={(e) => {
                    // Log mouse position to verify the container is receiving events
                    if (Math.random() < 0.01) {
                        console.log("Mouse moving over scroll container at:", e.clientX, e.clientY)
                    }
                }}
                style={{
                    display: "flex",
                    gap: "16px",
                    padding: "20px",
                    overflowX: "auto",
                    overflowY: "hidden",
                    maxWidth: "90vw",
                    WebkitOverflowScrolling: "touch",
                    scrollSnapType: "x mandatory",
                    scrollBehavior: "smooth",
                    pointerEvents: "auto",
                    zIndex: 1001,
                }}
            >
                {sites.map((site, index) => {
                    const isFavorite = false
                    const isSelected = selectedSiteId === site.id

                    console.log("Rendering site:", site.name, "isSelected:", isSelected, "index:", index)

                    if (isSelected) {
                        return (
                            <DiveSiteFlipCard
                                key={site.id}
                                site={site}
                                onViewSite={() => {
                                    onCardClick(site)
                                    onClose()
                                }}
                                onFavorite={() => {
                                }}
                                isFavorite={isFavorite}
                                getDifficultyIcon={getDifficultyIcon}
                            />
                        )
                    }

                    return (
                        <div
                            key={site.id}
                            onClick={(e) => {
                                e.stopPropagation()
                                setSelectedSiteId(site.id)
                                onIndexChange(index)
                            }}
                            style={{
                                minWidth: "140px",
                                width: "140px",
                                height: "240px",
                                position: "relative",
                                transformStyle: "preserve-3d",
                                transform: "rotateY(2deg) translateZ(20px)",
                                transition: "transform 0.3s",
                                boxShadow: "0 4px 8px rgba(0,0,0,0.15), 0 8px 16px rgba(0,0,0,0.1)",
                                borderRadius: "16px",
                                overflow: "hidden",
                                cursor: "pointer",
                                backgroundImage: `url(${site.image_url || "https://xu5qaaigiohvkyk8.public.blob.vercel-storage.com/site-placeholder.png"})`,
                                backgroundSize: "cover",
                                backgroundPosition: "center",
                                scrollSnapAlign: "center",
                                pointerEvents: "auto",
                            }}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.transform = "rotateY(2deg) translateZ(30px) scale(1.05)"
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.transform = "rotateY(2deg) translateZ(20px)"
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
                                    pointerEvents: "none",
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
                                    {site.location_name}
                                </p>
                            </div>

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
                                    pointerEvents: "none",
                                }}
                            >
                                <span style={{ fontSize: "12px" }}>⭐</span>
                                <span style={{ fontSize: "12px", fontWeight: "700", color: "white" }}>4.7</span>
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}
