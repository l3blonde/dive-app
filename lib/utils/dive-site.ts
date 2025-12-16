import { User, Waves, Anchor, type LucideIcon } from "lucide-react"

/**
 * Returns the appropriate Lucide icon component for dive difficulty level
 * Used to display visual skill indicators on dive site cards
 */
export function getDifficultyIcon(difficulty: string): LucideIcon {
    switch (difficulty.toLowerCase()) {
        case "beginner":
            return User // Person icon for entry-level dives
        case "intermediate":
            return Waves // Waves icon for moderate skill dives
        case "advanced":
            return Anchor // Anchor icon for expert-level dives
        default:
            return User // Fallback to person icon if unknown
    }
}
