"use client"

import { useState } from "react"
import { MapPin, Fish, Calendar, ChevronLeft, Heart } from "lucide-react"
import type { MarineSpecies } from "@/lib/types"

interface SpeciesPopupProps {
    species: MarineSpecies
    imageUrl?: string
    onClose: () => void
    onFindDiveSites: () => void
    scientificName?: string
    habitat?: string
    bestMonths?: string
    sightingsCount?: number
}

export function SpeciesPopup({
                                 species,
                                 imageUrl,
                                 onClose,
                                 onFindDiveSites,
                                 scientificName,
                                 habitat,
                                 bestMonths,
                                 sightingsCount = 0,
                             }: SpeciesPopupProps) {
    const [isFlipped, setIsFlipped] = useState(false)
    const [isFavorite, setIsFavorite] = useState(false)

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
                        backgroundImage: imageUrl || species?.image_url ? `url(${imageUrl || species.image_url})` : "none",
                        backgroundColor: getCategoryColor(species.category),
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
                        ✕
                    </button>

                    {/* Favorite button */}
                    <button
                        onClick={(e) => {
                            e.stopPropagation()
                            setIsFavorite(!isFavorite)
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
                            zIndex: 10,
                            transition: "transform 0.2s",
                            boxShadow: "0 2px 8px rgba(0,0,0,0.2)",
                        }}
                    >
                        <Heart size={16} fill={isFavorite ? "#EF4444" : "none"} color={isFavorite ? "#EF4444" : "#6B7280"} />
                    </button>

                    {/* Species icon/image centered if no background image */}
                    {!imageUrl && !species.image_url && (
                        <div
                            style={{
                                position: "absolute",
                                top: "50%",
                                left: "50%",
                                transform: "translate(-50%, -50%)",
                                fontSize: "80px",
                                filter: "drop-shadow(0 4px 8px rgba(0,0,0,0.2))",
                            }}
                        >
                            🐠
                        </div>
                    )}

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
                            {species.common_name}
                        </h4>
                        {(scientificName || species.scientific_name) && (
                            <p
                                style={{
                                    fontSize: "12px",
                                    fontStyle: "italic",
                                    color: "rgba(255,255,255,0.9)",
                                    margin: "4px 0 0 0",
                                }}
                            >
                                {scientificName || species.scientific_name}
                            </p>
                        )}
                    </div>

                    {/* Category badge */}
                    <div
                        style={{
                            position: "absolute",
                            bottom: scientificName || species.scientific_name ? "80px" : "68px",
                            right: "16px",
                            background: getCategoryColor(species.category),
                            borderRadius: "20px",
                            padding: "4px 10px",
                            display: "flex",
                            alignItems: "center",
                            gap: "4px",
                            boxShadow: "0 2px 8px rgba(0,0,0,0.2)",
                        }}
                    >
            <span style={{ fontSize: "12px", fontWeight: "700", color: "white", textTransform: "capitalize" }}>
              {species.category}
            </span>
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
                        <ChevronLeft size={18} color="#1A1A33" />
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
                        ✕
                    </button>

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
                            {species.common_name}
                        </h3>

                        {(scientificName || species.scientific_name) && (
                            <p
                                style={{
                                    fontSize: "11px",
                                    fontStyle: "italic",
                                    color: "#9CA3AF",
                                    marginBottom: "12px",
                                }}
                            >
                                {scientificName || species.scientific_name}
                            </p>
                        )}

                        <div style={{ flex: 1, overflowY: "auto", marginBottom: "12px", maxHeight: "160px" }}>
                            {/* Size */}
                            {species.size && (
                                <div style={{ marginBottom: "10px" }}>
                                    <h4 style={{ fontSize: "12px", fontWeight: "600", color: "#1A1A33", margin: "0 0 4px 0" }}>
                                        📏 Size
                                    </h4>
                                    <p style={{ fontSize: "11px", color: "#6B7280", margin: "0 0 0 18px", lineHeight: 1.4 }}>
                                        {species.size}
                                    </p>
                                </div>
                            )}

                            {/* Habitat */}
                            {(habitat || species.habitat) && (
                                <div style={{ marginBottom: "10px" }}>
                                    <div style={{ display: "flex", alignItems: "center", gap: "4px", marginBottom: "4px" }}>
                                        <MapPin size={14} color="#3B82F6" />
                                        <h4 style={{ fontSize: "12px", fontWeight: "600", color: "#1A1A33", margin: 0 }}>Habitat</h4>
                                    </div>
                                    <p style={{ fontSize: "11px", color: "#6B7280", margin: "0 0 0 18px", lineHeight: 1.4 }}>
                                        {habitat || species.habitat}
                                    </p>
                                </div>
                            )}

                            {/* Best Months */}
                            {(bestMonths || species.best_months) && (
                                <div style={{ marginBottom: "10px" }}>
                                    <div style={{ display: "flex", alignItems: "center", gap: "4px", marginBottom: "4px" }}>
                                        <Calendar size={14} color="#3B82F6" />
                                        <h4 style={{ fontSize: "12px", fontWeight: "600", color: "#1A1A33", margin: 0 }}>Best Months</h4>
                                    </div>
                                    <p style={{ fontSize: "11px", color: "#6B7280", margin: "0 0 0 18px", lineHeight: 1.4 }}>
                                        {bestMonths || species.best_months}
                                    </p>
                                </div>
                            )}

                            {/* Found in X dive sites */}
                            <div style={{ marginBottom: "10px" }}>
                                <div style={{ display: "flex", alignItems: "center", gap: "4px", marginBottom: "4px" }}>
                                    <Fish size={14} color="#3B82F6" />
                                    <h4 style={{ fontSize: "12px", fontWeight: "600", color: "#1A1A33", margin: 0 }}>Dive Sites</h4>
                                </div>
                                <p style={{ fontSize: "11px", color: "#6B7280", margin: "0 0 0 18px", lineHeight: 1.4 }}>
                                    Found in {sightingsCount} dive sites
                                </p>
                            </div>

                            {/* Behavior */}
                            {species.behavior && (
                                <div style={{ marginBottom: "10px" }}>
                                    <h4 style={{ fontSize: "12px", fontWeight: "600", color: "#1A1A33", margin: "0 0 4px 0" }}>
                                        🎭 Behavior
                                    </h4>
                                    <p style={{ fontSize: "11px", color: "#6B7280", margin: "0 0 0 18px", lineHeight: 1.4 }}>
                                        {species.behavior}
                                    </p>
                                </div>
                            )}

                            {/* Diet */}
                            {species.diet && (
                                <div style={{ marginBottom: "10px" }}>
                                    <h4 style={{ fontSize: "12px", fontWeight: "600", color: "#1A1A33", margin: "0 0 4px 0" }}>🍽️ Diet</h4>
                                    <p style={{ fontSize: "11px", color: "#6B7280", margin: "0 0 0 18px", lineHeight: 1.4 }}>
                                        {species.diet}
                                    </p>
                                </div>
                            )}

                            {/* Conservation */}
                            {species.conservation_status && (
                                <div style={{ marginBottom: "10px" }}>
                                    <h4 style={{ fontSize: "12px", fontWeight: "600", color: "#1A1A33", margin: "0 0 4px 0" }}>
                                        🌍 Conservation
                                    </h4>
                                    <p style={{ fontSize: "11px", color: "#6B7280", margin: "0 0 0 18px", lineHeight: 1.4 }}>
                                        {species.conservation_status}
                                    </p>
                                </div>
                            )}

                            {/* Did You Know */}
                            {species.did_you_know && (
                                <div style={{ marginBottom: "10px" }}>
                                    <h4 style={{ fontSize: "12px", fontWeight: "600", color: "#1A1A33", margin: "0 0 4px 0" }}>
                                        💡 Did You Know?
                                    </h4>
                                    <p style={{ fontSize: "11px", color: "#6B7280", margin: "0 0 0 18px", lineHeight: 1.4 }}>
                                        {species.did_you_know}
                                    </p>
                                </div>
                            )}

                            {/* FAQs */}
                            {species.faqs && species.faqs.length > 0 && (
                                <div style={{ marginBottom: "10px" }}>
                                    <h4 style={{ fontSize: "12px", fontWeight: "600", color: "#1A1A33", margin: "0 0 8px 0" }}>
                                        ❓ Common Questions
                                    </h4>
                                    {species.faqs.map((faq, index) => (
                                        <div key={index} style={{ marginBottom: "8px" }}>
                                            <p
                                                style={{
                                                    fontSize: "11px",
                                                    fontWeight: "600",
                                                    color: "#3B82F6",
                                                    margin: "0 0 2px 18px",
                                                    lineHeight: 1.4,
                                                }}
                                            >
                                                {faq.question}
                                            </p>
                                            <p style={{ fontSize: "11px", color: "#6B7280", margin: "0 0 0 18px", lineHeight: 1.4 }}>
                                                {faq.answer}
                                            </p>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>

                        <button
                            onClick={(e) => {
                                e.stopPropagation()
                                onFindDiveSites()
                            }}
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
                            VIEW DIVE SITES
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

function getCategoryColor(category: string): string {
    const colors: Record<string, string> = {
        shark: "#3B82F6",
        ray: "#A855F7",
        fish: "#22C55E",
        coral: "#FB923C",
        crustacean: "#EC4899",
        other: "#6366F1",
    }
    return colors[category] || "#6366F1"
}
