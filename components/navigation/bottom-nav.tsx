"use client"

// Premium diver mask SVG icon
function DiverMaskIcon({ color }: { color: string }) {
    return (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            {/* Left lens */}
            <circle cx="8" cy="10" r="4.5" />
            {/* Right lens */}
            <circle cx="16" cy="10" r="4.5" />
            {/* Bridge between lenses */}
            <line x1="12.5" y1="10" x2="11.5" y2="10" strokeWidth="1.5" />
            {/* Top strap */}
            <path d="M5 8 Q5 6 8 5 Q12 4.5 16 5 Q19 6 19 8" strokeWidth="1.5" fill="none" />
            {/* Bottom strap left */}
            <path d="M6 14 Q5 16 6 17.5" strokeWidth="1.5" fill="none" />
            {/* Bottom strap right */}
            <path d="M18 14 Q19 16 18 17.5" strokeWidth="1.5" fill="none" />
        </svg>
    )
}

// Premium nautilus shell SVG icon for Memories
function ShellIcon({ color }: { color: string }) {
    return (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            {/* Outer spiral shell */}
            <path d="M12 2 C14 2 18 4 20 8 C21 10 21 14 19 17 C17 20 13 21 10 20" strokeWidth="1.5" fill="none" />
            {/* Middle spiral */}
            <path d="M12 6 C13 6 15 7 16 9 C17 11 16 14 14 16" strokeWidth="1.5" fill="none" />
            {/* Inner spiral */}
            <path d="M12 10 C13 10 14 11 14 12.5 C14 14 13 15 12 15" strokeWidth="1.5" fill="none" />
            {/* Shell ridges */}
            <line x1="15" y1="8" x2="13" y2="5" strokeWidth="1" opacity="0.6" />
            <line x1="18" y1="12" x2="16" y2="10" strokeWidth="1" opacity="0.6" />
            <line x1="19" y1="16" x2="17" y2="14" strokeWidth="1" opacity="0.6" />
        </svg>
    )
}

interface BottomNavProps {
    activeTab: string
    onTabChange: (tab: string) => void
    onSearchOpen: () => void
    searchOpen: boolean
}

const NAV_TABS = [
    {
        id: "home",
        icon: "M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7",
        label: "Explore",
        custom: null,
    },
    {
        id: "plan",
        icon: "M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z",
        label: "Plan",
        custom: null,
    },
    {
        id: "dive",
        icon: null,
        label: "Dive",
        custom: "mask",
    },
    {
        id: "logbook",
        icon: "M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253",
        label: "Logbook",
        custom: null,
    },
    {
        id: "profile",
        icon: null,
        label: "Memories",
        custom: "shell",
    },
]

export function BottomNav({ activeTab, onTabChange, onSearchOpen, searchOpen }: BottomNavProps) {
    return (
        <div
            style={{
                position: "fixed",
                bottom: 0,
                left: 0,
                right: 0,
                zIndex: 1002,
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                padding: "12px 16px 20px 16px",
                gap: "12px",
            }}
        >
            <div
                style={{
                    display: "flex",
                    background: "#94E0FF",
                    borderRadius: "32px",
                    padding: "8px 12px",
                    boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                    flex: 1,
                    justifyContent: "space-around",
                    gap: "4px",
                }}
            >
                {NAV_TABS.map((tab) => {
                    const isActive = activeTab === tab.id
                    const color = isActive ? "#1A1A33" : "#6A6A6A"
                    return (
                        <button
                            key={tab.id}
                            onClick={() => onTabChange(tab.id)}
                            style={{
                                flex: 1,
                                display: "flex",
                                flexDirection: "column",
                                alignItems: "center",
                                gap: "4px",
                                background: isActive ? "rgba(255,255,255,0.4)" : "transparent",
                                border: "none",
                                cursor: "pointer",
                                padding: "8px 4px",
                                borderRadius: "16px",
                                transition: "all 0.2s ease-in-out",
                            }}
                        >
                            {tab.custom === "mask" ? (
                                <DiverMaskIcon color={color} />
                            ) : tab.custom === "shell" ? (
                                <ShellIcon color={color} />
                            ) : (
                                <svg
                                    width="24"
                                    height="24"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke={color}
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    style={{ transition: "stroke 0.2s ease-in-out" }}
                                >
                                    <path d={tab.icon!} />
                                </svg>
                            )}
                            <span
                                style={{
                                    fontSize: "10px",
                                    fontWeight: isActive ? "700" : "500",
                                    color,
                                    transition: "all 0.2s ease-in-out",
                                }}
                            >
                                {tab.label}
                            </span>
                        </button>
                    )
                })}
            </div>

            <button
                onClick={onSearchOpen}
                style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "4px",
                    background: "#94E0FF",
                    border: "none",
                    borderRadius: "32px",
                    cursor: "pointer",
                    padding: "12px 16px",
                    boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                    minWidth: "70px",
                    transition: "all 0.2s ease-in-out",
                }}
                onMouseEnter={(e) => { e.currentTarget.style.transform = "scale(1.05)" }}
                onMouseLeave={(e) => { e.currentTarget.style.transform = "scale(1)" }}
            >
                <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke={searchOpen ? "#1A1A33" : "#6A6A6A"}
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    style={{ transition: "stroke 0.2s ease-in-out" }}
                >
                    <circle cx="11" cy="11" r="8" />
                    <path d="m21 21-4.35-4.35" />
                </svg>
                <span
                    style={{
                        fontSize: "10px",
                        fontWeight: "500",
                        color: searchOpen ? "#1A1A33" : "#6A6A6A",
                        transition: "color 0.2s ease-in-out",
                    }}
                >
                    Search
                </span>
            </button>
        </div>
    )
}
