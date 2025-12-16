"use client"

interface BottomNavProps {
    activeTab: string
    onTabChange: (tab: string) => void
    onSearchOpen: () => void
    searchOpen: boolean
}

const NAV_TABS = [
    {
        id: "home",
        icon: "M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6",
        label: "Home",
    },
    {
        id: "plan",
        icon: "M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z",
        label: "Plan",
    },
    {
        id: "logbook",
        icon: "M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 16.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253",
        label: "Logbook",
    },
    {
        id: "profile",
        icon: "M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z",
        label: "Profile",
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
                {NAV_TABS.map((tab) => (
                    <button
                        key={tab.id}
                        onClick={() => onTabChange(tab.id)}
                        style={{
                            flex: 1,
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                            gap: "4px",
                            background: activeTab === tab.id ? "rgba(255,255,255,0.4)" : "transparent",
                            border: "none",
                            cursor: "pointer",
                            padding: "8px 4px",
                            borderRadius: "16px",
                            transition: "all 0.2s ease-in-out",
                        }}
                    >
                        <svg
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke={activeTab === tab.id ? "#1A1A33" : "#6A6A6A"}
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            style={{
                                transition: "stroke 0.2s ease-in-out",
                            }}
                        >
                            <path d={tab.icon} />
                        </svg>
                        <span
                            style={{
                                fontSize: "10px",
                                fontWeight: activeTab === tab.id ? "700" : "500",
                                color: activeTab === tab.id ? "#1A1A33" : "#6A6A6A",
                                transition: "all 0.2s ease-in-out",
                            }}
                        >
              {tab.label}
            </span>
                    </button>
                ))}
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
                onMouseEnter={(e) => {
                    e.currentTarget.style.transform = "scale(1.05)"
                }}
                onMouseLeave={(e) => {
                    e.currentTarget.style.transform = "scale(1)"
                }}
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
