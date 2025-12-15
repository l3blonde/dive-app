import type React from "react"
import type { Metadata } from "next"
import "./globals.css"
import "mapbox-gl/dist/mapbox-gl.css"

export const metadata: Metadata = {
    title: "Seafolio Dive App",
    description: "Discover amazing dive sites and marine species",
    icons: {
        icon: [
            {
                url: "/icon-light-32x32.png",
                media: "(prefers-color-scheme: light)",
            },
            {
                url: "/icon-dark-32x32.png",
                media: "(prefers-color-scheme: dark)",
            },
            {
                url: "/icon.svg",
                type: "image/svg+xml",
            },
        ],
        apple: "/apple-icon.png",
    },
}

export default function RootLayout({
                                       children,
                                   }: Readonly<{
    children: React.ReactNode
}>) {
    return (
        <html lang="en">
        <body className={`font-sans antialiased`} suppressHydrationWarning>
        {children}
        </body>
        </html>
    )
}
