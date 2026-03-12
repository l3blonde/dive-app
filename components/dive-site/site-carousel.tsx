"use client"

import { useState, useRef, useEffect } from "react"
import { Star, BookmarkPlus, ArrowRight } from "lucide-react"
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
    const [activeIndex, setActiveIndex] = useState(0)

    // Track scroll position to update pagination dots
    useEffect(() => {
        const container = scrollContainerRef.current
        if (!container) return

        const handleScroll = () => {
            const cardWidth = 300 + 16 // card width + gap
            const index = Math.round(container.scrollLeft / cardWidth)
            setActiveIndex(index)
            onIndexChange(index)
        }

        container.addEventListener("scroll", handleScroll, { passive: true })
        return () => container.removeEventListener("scroll", handleScroll)
    }, [onIndexChange])

    const scrollToIndex = (index: number) => {
        const container = scrollContainerRef.current
        if (!container) return
        const cardWidth = 300 + 16
        container.scrollTo({ left: index * cardWidth, behavior: "smooth" })
    }

    return (
        <div
            style={{
                position: "fixed",
                bottom: "100px",
                left: 0,
                right: 0,
                zIndex: 1000,
            }}
        >
            {/* Card scroll strip */}
            <div
                ref={scrollContainerRef}
                style={{
                    display: "flex",
                    gap: "16px",
                    padding: "12px 20px",
                    overflowX: "auto",
                    overflowY: "hidden",
                    WebkitOverflowScrolling: "touch",
                    scrollSnapType: "x mandatory",
                    scrollBehavior: "smooth",
                    // hide scrollbar
                    msOverflowStyle: "none",
                    scrollbarWidth: "none",
                }}
            >
                {sites.map((site, index) => (
                    <CarouselCard
                        key={site.id}
                        site={site}
                        onViewDetails={() => {
                            onCardClick(site)
                            onClose()
                        }}
                        onAddToPlan={() => {
                            // Plan action — wired up later
                        }}
                    />
                ))}
            </div>

            {/* Pagination dots */}
            {sites.length > 1 && (
                <div
                    style={{
                        display: "flex",
                        justifyContent: "center",
                        gap: "6px",
                        marginTop: "8px",
                    }}
                >
                    {sites.map((_, i) => (
                        <button
                            key={i}
                            onClick={() => scrollToIndex(i)}
                            aria-label={`Go to slide ${i + 1}`}
                            style={{
                                width: i === activeIndex ? "20px" : "6px",
                                height: "6px",
                                borderRadius: "3px",
                                border: "none",
                                cursor: "pointer",
                                padding: 0,
                                background: i === activeIndex ? "#1A2744" : "rgba(255,255,255,0.6)",
                                transition: "all 0.3s ease",
                            }}
                        />
                    ))}
                </div>
            )}
        </div>
    )
}

// ─── Individual card ──────────────────────────────────────────────────────────

interface CarouselCardProps {
    site: DiveSite
    onViewDetails: () => void
    onAddToPlan: () => void
}

function CarouselCard({ site, onViewDetails, onAddToPlan }: CarouselCardProps) {
    const [hovered, setHovered] = useState(false)

    // Generate a deterministic-ish rating from site id
    const rating = ((site.id?.charCodeAt(0) ?? 70) % 15) / 10 + 4.0
    const ratingDisplay = Math.min(rating, 5.0).toFixed(1)

    // Dive count fallback
    const diveCount = (site as any).dive_count ?? (site as any).number_of_dives ?? "—"

    return (
        <div
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            style={{
                minWidth: "300px",
                width: "300px",
                height: "190px",
                position: "relative",
                borderRadius: "12px",
                overflow: "hidden",
                cursor: "pointer",
                scrollSnapAlign: "center",
                boxShadow: hovered
                    ? "0 12px 32px rgba(0,0,0,0.35)"
                    : "0 6px 20px rgba(0,0,0,0.2)",
                transform: hovered ? "translateY(-3px)" : "translateY(0)",
                transition: "box-shadow 0.25s ease, transform 0.25s ease",
                backgroundImage: `url(${site.image_url || "https://xu5qaaigiohvkyk8.public.blob.vercel-storage.com/site-placeholder.png"})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                flexShrink: 0,
            }}
        >
            {/* Dark gradient overlay */}
            <div
                style={{
                    position: "absolute",
                    inset: 0,
                    background: "linear-gradient(to top, rgba(0,0,0,0.82) 0%, rgba(0,0,0,0.3) 55%, transparent 100%)",
                    pointerEvents: "none",
                }}
            />

            {/* Rating badge — top right */}
            <div
                style={{
                    position: "absolute",
                    top: "12px",
                    right: "12px",
                    display: "flex",
                    alignItems: "center",
                    gap: "4px",
                    background: "rgba(26,39,68,0.85)",
                    backdropFilter: "blur(6px)",
                    WebkitBackdropFilter: "blur(6px)",
                    borderRadius: "12px",
                    padding: "4px 10px",
                    pointerEvents: "none",
                }}
            >
                <Star size={12} fill="#FACC15" color="#FACC15" />
                <span style={{ fontSize: "12px", fontWeight: 700, color: "white" }}>{ratingDisplay}</span>
            </div>

            {/* Bottom content */}
            <div
                style={{
                    position: "absolute",
                    bottom: 0,
                    left: 0,
                    right: 0,
                    padding: "12px 14px",
                }}
            >
                {/* Site name */}
                <h4
                    style={{
                        fontSize: "16px",
                        fontWeight: 700,
                        color: "white",
                        margin: "0 0 2px 0",
                        lineHeight: 1.2,
                        textShadow: "0 1px 4px rgba(0,0,0,0.5)",
                    }}
                >
                    {site.name}
                </h4>

                {/* Meta row */}
                <p
                    style={{
                        fontSize: "12px",
                        color: "rgba(255,255,255,0.8)",
                        margin: "0 0 10px 0",
                    }}
                >
                    {diveCount !== "—" && `${diveCount} Dives · `}{site.location_name}
                </p>

                {/* CTA buttons row */}
                <div style={{ display: "flex", gap: "8px" }}>
                    {/* Add to Plan */}
                    <button
                        onClick={(e) => {
                            e.stopPropagation()
                            onAddToPlan()
                        }}
                        style={{
                            flex: 1,
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            gap: "6px",
                            padding: "8px 0",
                            borderRadius: "12px",
                            border: "1.5px solid rgba(255,255,255,0.6)",
                            background: "rgba(255,255,255,0.15)",
                            backdropFilter: "blur(8px)",
                            WebkitBackdropFilter: "blur(8px)",
                            color: "white",
                            fontSize: "12px",
                            fontWeight: 600,
                            cursor: "pointer",
                            transition: "background 0.2s",
                        }}
                        onMouseEnter={(e) => { e.currentTarget.style.background = "rgba(255,255,255,0.25)" }}
                        onMouseLeave={(e) => { e.currentTarget.style.background = "rgba(255,255,255,0.15)" }}
                    >
                        <BookmarkPlus size={14} color="white" />
                        Add to Plan
                    </button>

                    {/* View Details */}
                    <button
                        onClick={(e) => {
                            e.stopPropagation()
                            onViewDetails()
                        }}
                        style={{
                            flex: 1,
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            gap: "6px",
                            padding: "8px 0",
                            borderRadius: "12px",
                            border: "none",
                            background: "#1A2744",
                            color: "white",
                            fontSize: "12px",
                            fontWeight: 600,
                            cursor: "pointer",
                            transition: "background 0.2s",
                        }}
                        onMouseEnter={(e) => { e.currentTarget.style.background = "#263660" }}
                        onMouseLeave={(e) => { e.currentTarget.style.background = "#1A2744" }}
                    >
                        <ArrowRight size={14} color="white" />
                        View Details
                    </button>
                </div>
            </div>
        </div>
    )
}
