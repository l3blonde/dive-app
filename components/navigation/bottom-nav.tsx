"use client"

// Premium diver mask SVG icon
function DiverMaskIcon({ color }: { color: string }) {
    return (
        <svg width="26" height="26" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
            {/* Head strap - top arc */}
            <path d="M6 13 C6 8 9 6 13 6 L19 6 C23 6 26 8 26 13" stroke={color} strokeWidth="1.6" strokeLinecap="round" fill="none"/>
            {/* Left lens rounded rect */}
            <rect x="4" y="13" width="10" height="8" rx="3" stroke={color} strokeWidth="1.6" fill="none"/>
            {/* Right lens rounded rect */}
            <rect x="18" y="13" width="10" height="8" rx="3" stroke={color} strokeWidth="1.6" fill="none"/>
            {/* Nose bridge connecting lenses */}
            <path d="M14 17 L18 17" stroke={color} strokeWidth="1.6" strokeLinecap="round"/>
            {/* Left strap tail */}
            <path d="M4 18 Q3 21 5 23" stroke={color} strokeWidth="1.6" strokeLinecap="round" fill="none"/>
            {/* Right strap tail */}
            <path d="M28 18 Q29 21 27 23" stroke={color} strokeWidth="1.6" strokeLinecap="round" fill="none"/>
        </svg>
    )
}

// Premium nautilus shell SVG icon for Memories
function ShellIcon({ color }: { color: string }) {
    return (
        <svg width="26" height="26" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
            {/* Outer shell curve */}
            <path d="M16 4 C22 4 28 9 28 16 C28 22 23 27 17 27 C13 27 9 25 8 22" stroke={color} strokeWidth="1.6" strokeLinecap="round" fill="none"/>
            {/* Second whorl */}
            <path d="M16 8 C20 8 24 11.5 24 16 C24 20 21 23 17 23 C14 23 11 21 10 19" stroke={color} strokeWidth="1.6" strokeLinecap="round" fill="none"/>
            {/* Third whorl */}
            <path d="M16 12 C18 12 20 13.8 20 16 C20 18 18.5 19.5 17 20" stroke={color} strokeWidth="1.6" strokeLinecap="round" fill="none"/>
            {/* Inner core */}
            <circle cx="16" cy="16" r="1.5" stroke={color} strokeWidth="1.4" fill="none"/>
            {/* Shell base opening */}
            <path d="M8 22 C6 23 5 25 7 27 C9 28.5 13 28 16 27" stroke={color} strokeWidth="1.6" strokeLinecap="round" fill="none"/>
            {/* Ridge lines on shell */}
            <path d="M22 9 L20 7" stroke={color} strokeWidth="1" strokeLinecap="round" opacity="0.5"/>
            <path d="M26 14 L24 13" stroke={color} strokeWidth="1" strokeLinecap="round" opacity="0.5"/>
            <path d="M26 19 L24 19" stroke={color} strokeWidth="1" strokeLinecap="round" opacity="0.5"/>
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
