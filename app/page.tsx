"use client"

import dynamic from "next/dynamic"

const DiveMap = dynamic(() => import("@/components/dive-map").then((mod) => ({ default: mod.DiveMap })), {
    ssr: false,
    loading: () => (
        <div className="flex h-screen items-center justify-center bg-blue-50">
            <div className="text-center">
                <div className="mb-4 h-12 w-12 animate-spin rounded-full border-4 border-blue-500 border-t-transparent mx-auto"></div>
                <p className="text-sm text-gray-600">Loading map...</p>
            </div>
        </div>
    ),
})

export default function Home() {
    return <DiveMap />
}
