"use client"

import type React from "react"

import { Fish } from "lucide-react"

interface SpeciesMarkerProps {
    speciesIcon?: React.ReactNode
    count?: number
    onClick: () => void
}

export function SpeciesMarker({ speciesIcon, count, onClick }: SpeciesMarkerProps) {
    return (
        <div
            onClick={onClick}
            className="relative cursor-pointer group"
            style={{
                width: "60px",
                height: "60px",
            }}
        >
            {/* Outer glow circle */}
            <div
                className="absolute inset-0 rounded-full transition-all duration-300 group-hover:scale-110"
                style={{
                    background: "rgba(74, 144, 226, 0.2)",
                    boxShadow: "0 0 20px rgba(74, 144, 226, 0.4)",
                }}
            />

            {/* Main circular marker */}
            <div
                className="absolute inset-2 rounded-full bg-white shadow-lg flex items-center justify-center transition-transform group-hover:scale-105"
                style={{
                    border: "3px solid #4A90E2",
                }}
            >
                {speciesIcon || <Fish size={24} color="#6A6A6A" />}
            </div>

            {/* Count badge if multiple dive sites have this species */}
            {count && count > 1 && (
                <div
                    className="absolute -top-1 -right-1 w-6 h-6 rounded-full bg-red-500 text-white text-xs font-bold flex items-center justify-center shadow-md"
                    style={{
                        fontSize: "10px",
                    }}
                >
                    {count}
                </div>
            )}

            {/* Pulse animation for active marker */}
            <div
                className="absolute inset-0 rounded-full animate-ping opacity-20"
                style={{
                    background: "#4A90E2",
                }}
            />
        </div>
    )
}
