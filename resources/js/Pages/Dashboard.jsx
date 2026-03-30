import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import { router } from "@inertiajs/react";
import "../../css/entry.css";

export default function Dashboard({
    totalStories,
    totalDonated,
    totalDonors,
    featuredStories,
}) {
    return (
        <AuthenticatedLayout>
            <Head title="Home" />

            {/* HERO */}
            <div
                style={{
                    width: "100%",
                    background: "#393b83",
                    padding: "80px 20px",
                    textAlign: "center",
                    color: "white",
                }}
            >
                <h1
                    style={{
                        fontSize: "52px",
                        fontWeight: "900",
                        color: "white",
                        marginBottom: "16px",
                        padding: 0,
                    }}
                >
                    Make a difference today
                </h1>
                <p
                    style={{
                        fontSize: "20px",
                        color: "rgba(255,255,255,0.85)",
                        maxWidth: "600px",
                        margin: "0 auto 32px",
                        lineHeight: "1.6",
                    }}
                >
                    Join thousands of people raising money for what matters
                    most. Every donation counts.
                </p>
                <div
                    style={{
                        display: "flex",
                        gap: "16px",
                        justifyContent: "center",
                        flexWrap: "wrap",
                    }}
                >
                    <button
                        onClick={() => router.visit(route("story"))}
                        style={{
                            padding: "14px 32px",
                            borderRadius: "10px",
                            background: "white",
                            color: "#393b83",
                            border: "none",
                            fontSize: "18px",
                            fontWeight: "700",
                            cursor: "pointer",
                        }}
                    >
                        Start Fundraising
                    </button>
                    <button
                        onClick={() => router.visit(route("home"))}
                        style={{
                            padding: "14px 32px",
                            borderRadius: "10px",
                            background: "transparent",
                            color: "white",
                            border: "2px solid white",
                            fontSize: "18px",
                            fontWeight: "700",
                            cursor: "pointer",
                        }}
                    >
                        Discover Causes
                    </button>
                </div>
            </div>

            {/* STATS */}
            <div
                style={{
                    width: "100%",
                    background: "white",
                    padding: "40px 20px",
                    borderBottom: "1px solid #eee",
                }}
            >
                <div
                    style={{
                        maxWidth: "900px",
                        margin: "0 auto",
                        display: "grid",
                        gridTemplateColumns: "repeat(3, 1fr)",
                        gap: "24px",
                        textAlign: "center",
                    }}
                >
                    <div>
                        <div
                            style={{
                                fontSize: "42px",
                                fontWeight: "900",
                                color: "#393b83",
                            }}
                        >
                            {totalStories}
                        </div>
                        <div style={{ fontSize: "16px", color: "#888" }}>
                            Active fundraisers
                        </div>
                    </div>
                    <div>
                        <div
                            style={{
                                fontSize: "42px",
                                fontWeight: "900",
                                color: "#393b83",
                            }}
                        >
                            {Number(totalDonated).toFixed(0)} €
                        </div>
                        <div style={{ fontSize: "16px", color: "#888" }}>
                            Total raised
                        </div>
                    </div>
                    <div>
                        <div
                            style={{
                                fontSize: "42px",
                                fontWeight: "900",
                                color: "#393b83",
                            }}
                        >
                            {totalDonors}
                        </div>
                        <div style={{ fontSize: "16px", color: "#888" }}>
                            Donors
                        </div>
                    </div>
                </div>
            </div>

            {/* FEATURED STORIES */}
            <div
                style={{
                    width: "100%",
                    background: "#f4f6f9",
                    padding: "60px 20px",
                }}
            >
                <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
                    <h2
                        style={{
                            fontSize: "32px",
                            fontWeight: "900",
                            color: "#393b83",
                            marginBottom: "8px",
                            textAlign: "center",
                        }}
                    >
                        Featured fundraisers
                    </h2>
                    <p
                        style={{
                            textAlign: "center",
                            color: "#888",
                            marginBottom: "40px",
                            fontSize: "16px",
                        }}
                    >
                        Most supported causes right now
                    </p>

                    <div
                        style={{
                            display: "grid",
                            gridTemplateColumns:
                                "repeat(auto-fit, minmax(300px, 1fr))",
                            gap: "24px",
                        }}
                    >
                        {featuredStories.map((story) => {
                            const percent =
                                story.required_amount > 0
                                    ? Math.min(
                                          (story.total_donated /
                                              story.required_amount) *
                                              100,
                                          100,
                                      )
                                    : 0;
                            const isCompleted = percent >= 100;

                            return (
                                <div
                                    key={story.id}
                                    onClick={() =>
                                        router.visit(`/stories/${story.id}`)
                                    }
                                    style={{
                                        background: "white",
                                        borderRadius: "16px",
                                        overflow: "hidden",
                                        border: "1px solid #eee",
                                        cursor: "pointer",
                                        transition: "transform 0.2s",
                                    }}
                                    onMouseEnter={(e) =>
                                        (e.currentTarget.style.transform =
                                            "translateY(-4px)")
                                    }
                                    onMouseLeave={(e) =>
                                        (e.currentTarget.style.transform =
                                            "translateY(0)")
                                    }
                                >
                                    {story.title_photo && (
                                        <img
                                            src={`/storage/${story.title_photo}`}
                                            alt={story.title}
                                            style={{
                                                width: "100%",
                                                height: "200px",
                                                objectFit: "cover",
                                                display: "block",
                                                margin: 0,
                                                borderRadius: 0,
                                                border: "none",
                                            }}
                                        />
                                    )}
                                    <div style={{ padding: "20px" }}>
                                        {/* Tags */}
                                        <div
                                            style={{
                                                display: "flex",
                                                flexWrap: "wrap",
                                                gap: "6px",
                                                marginBottom: "10px",
                                            }}
                                        >
                                            {story.hash_tags
                                                ?.slice(0, 3)
                                                .map((t, i) => (
                                                    <span
                                                        key={i}
                                                        style={{
                                                            background:
                                                                "#eef0fb",
                                                            color: "#393b83",
                                                            borderRadius: "6px",
                                                            padding: "2px 8px",
                                                            fontSize: "13px",
                                                            fontWeight: "600",
                                                        }}
                                                    >
                                                        #{t.hash_tag}
                                                    </span>
                                                ))}
                                        </div>

                                        {/* Title */}
                                        <h3
                                            style={{
                                                fontSize: "18px",
                                                fontWeight: "700",
                                                color: "#1a1a1a",
                                                marginBottom: "8px",
                                            }}
                                        >
                                            {story.title}
                                        </h3>

                                        {/* Text preview */}
                                        <p
                                            style={{
                                                fontSize: "14px",
                                                color: "#666",
                                                lineHeight: "1.5",
                                                marginBottom: "16px",
                                            }}
                                        >
                                            {story.text?.slice(0, 100)}...
                                        </p>

                                        {/* Progress bar */}
                                        <div
                                            style={{
                                                background: "#f0f0f0",
                                                borderRadius: "10px",
                                                height: "8px",
                                                marginBottom: "8px",
                                            }}
                                        >
                                            <div
                                                style={{
                                                    width: `${percent}%`,
                                                    height: "100%",
                                                    borderRadius: "10px",
                                                    background: isCompleted
                                                        ? "#10b981"
                                                        : "#393b83",
                                                    transition: "width 0.5s",
                                                }}
                                            />
                                        </div>

                                        {/* Amount */}
                                        <div
                                            style={{
                                                display: "flex",
                                                justifyContent: "space-between",
                                                fontSize: "14px",
                                            }}
                                        >
                                            <span
                                                style={{
                                                    fontWeight: "700",
                                                    color: isCompleted
                                                        ? "#10b981"
                                                        : "#393b83",
                                                }}
                                            >
                                                {Number(
                                                    story.total_donated,
                                                ).toFixed(2)}{" "}
                                                € raised
                                            </span>
                                            <span style={{ color: "#888" }}>
                                                of {story.required_amount} €
                                            </span>
                                        </div>

                                        {/* Hearts */}
                                        <div
                                            style={{
                                                marginTop: "12px",
                                                fontSize: "14px",
                                                color: "#e63946",
                                                fontWeight: "600",
                                            }}
                                        >
                                            ♥ {story.heart_count ?? 0} people
                                            support this
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>

                    <div style={{ textAlign: "center", marginTop: "40px" }}>
                        <button
                            onClick={() => router.visit(route("home"))}
                            style={{
                                padding: "14px 40px",
                                borderRadius: "10px",
                                background: "#393b83",
                                color: "white",
                                border: "none",
                                fontSize: "18px",
                                fontWeight: "700",
                                cursor: "pointer",
                            }}
                        >
                            See all fundraisers
                        </button>
                    </div>
                </div>
            </div>

            {/* HOW IT WORKS */}
            <div
                style={{
                    width: "100%",
                    background: "white",
                    padding: "60px 20px",
                }}
            >
                <div style={{ maxWidth: "900px", margin: "0 auto" }}>
                    <h2
                        style={{
                            fontSize: "32px",
                            fontWeight: "900",
                            color: "#393b83",
                            marginBottom: "40px",
                            textAlign: "center",
                        }}
                    >
                        How it works
                    </h2>
                    <div
                        style={{
                            display: "grid",
                            gridTemplateColumns: "repeat(3, 1fr)",
                            gap: "32px",
                            textAlign: "center",
                        }}
                    >
                        {[
                            {
                                icon: "✍️",
                                title: "Share your story",
                                text: "Create your fundraiser and tell people why you need support.",
                            },
                            {
                                icon: "❤️",
                                title: "Get support",
                                text: "Friends, family and strangers donate to causes they care about.",
                            },
                            {
                                icon: "🎯",
                                title: "Reach your goal",
                                text: "Track your progress and celebrate when you hit your target.",
                            },
                        ].map((step, i) => (
                            <div key={i}>
                                <div
                                    style={{
                                        fontSize: "40px",
                                        marginBottom: "16px",
                                    }}
                                >
                                    {step.icon}
                                </div>
                                <h3
                                    style={{
                                        fontSize: "20px",
                                        fontWeight: "700",
                                        color: "#393b83",
                                        marginBottom: "8px",
                                    }}
                                >
                                    {step.title}
                                </h3>
                                <p
                                    style={{
                                        color: "#666",
                                        fontSize: "15px",
                                        lineHeight: "1.6",
                                    }}
                                >
                                    {step.text}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* CTA */}
            <div
                style={{
                    width: "100%",
                    background: "#393b83",
                    padding: "60px 20px",
                    textAlign: "center",
                }}
            >
                <h2
                    style={{
                        fontSize: "36px",
                        fontWeight: "900",
                        color: "white",
                        marginBottom: "16px",
                    }}
                >
                    Ready to make a difference?
                </h2>
                <p
                    style={{
                        color: "rgba(255,255,255,0.85)",
                        fontSize: "18px",
                        marginBottom: "32px",
                    }}
                >
                    Start your fundraiser today and reach people who care.
                </p>
                <button
                    onClick={() => router.visit(route("register"))}
                    style={{
                        padding: "14px 40px",
                        borderRadius: "10px",
                        background: "white",
                        color: "#393b83",
                        border: "none",
                        fontSize: "18px",
                        fontWeight: "700",
                        cursor: "pointer",
                    }}
                >
                    Get started for free
                </button>
            </div>
        </AuthenticatedLayout>
    );
}
