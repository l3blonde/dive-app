export function getDifficultyIcon(difficulty: string): string {
    switch (difficulty.toLowerCase()) {
        case "beginner":
            return "🏊"
        case "intermediate":
            return "🤿"
        case "advanced":
            return "⚓"
        default:
            return "🏊"
    }
}

export function getUnsplashImageForSite(siteName: string): string {
    const imageMap: { [key: string]: string } = {
        "Bitter Springs": "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=800&q=80",
        "The Cathedral": "https://images.unsplash.com/photo-1682687220742-aba13b6e50ba?w=800&q=80",
        "Coral Gardens": "https://images.unsplash.com/photo-1546026423-cc4642628d2b?w=800&q=80",
    }

    return imageMap[siteName] || "https://images.unsplash.com/photo-1682687220063-4742bd7fd538?w=800&q=80"
}
