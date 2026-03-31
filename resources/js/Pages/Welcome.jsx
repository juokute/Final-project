import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import { router } from "@inertiajs/react";
import "../../css/entry.css";
import { useState } from "react";
import { usePage } from "@inertiajs/react";

export default function Welcome({
    totalStories,
    totalDonated,
    totalDonors,
    featuredStories,
}) {
    const [hover1, setHover1] = useState(false);
    const [hover2, setHover2] = useState(false);
    const [hoverSeeAll, setHoverSeeAll] = useState(false);
    const [hoverGetStarted, setHoverGetStarted] = useState(false);
    const { auth } = usePage().props;
    const user = auth?.user || null;

    return (
        <AuthenticatedLayout>
            <Head title="Home" />

            {/* HERO */}
            <div
                style={{
                    width: "100%",
                    background: "#393b83d3",
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
                        onMouseEnter={() => setHover1(true)}
                        onMouseLeave={() => setHover1(false)}
                        style={{
                            padding: "14px 32px",
                            borderRadius: "10px",
                            background: hover1 ? "#f0f0f0" : "white",
                            color: "#393b83",
                            border: "none",
                            fontSize: "18px",
                            fontWeight: "700",
                            cursor: "pointer",
                            transition: "all 0.2s",
                            transform: hover1
                                ? "translateY(-2px)"
                                : "translateY(0)",
                        }}
                    >
                        Start Fundraising
                    </button>

                    <button
                        onClick={() => router.visit(route("home"))}
                        onMouseEnter={() => setHover2(true)}
                        onMouseLeave={() => setHover2(false)}
                        style={{
                            padding: "14px 32px",
                            borderRadius: "10px",
                            background: hover2
                                ? "rgba(255,255,255,0.15)"
                                : "transparent",
                            color: "white",
                            border: "2px solid white",
                            fontSize: "18px",
                            fontWeight: "700",
                            cursor: "pointer",
                            transition: "all 0.2s",
                            transform: hover2
                                ? "translateY(-2px)"
                                : "translateY(0)",
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
                                color: "#393b83d3",
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
                                color: "#393b83d3",
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
                                color: "#393b83d3",
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
                            color: "#393b83d3",
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
                                                            color: "#393b83d3",
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
                                                        : "#393b83d3",
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
                                                        : "#393b83d3",
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
                            onMouseEnter={() => setHoverSeeAll(true)}
                            onMouseLeave={() => setHoverSeeAll(false)}
                            style={{
                                padding: "14px 40px",
                                borderRadius: "10px",
                                background: hoverSeeAll
                                    ? "#2d2f6b"
                                    : "#393b83d3",
                                color: "white",
                                border: "none",
                                fontSize: "18px",
                                fontWeight: "700",
                                cursor: "pointer",
                                transition: "all 0.2s",
                                transform: hoverSeeAll
                                    ? "translateY(-2px)"
                                    : "translateY(0)",
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
                            color: "#393b83d3",
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
                                        color: "#393b83d3",
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
                    background: "#393b83d3",
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
                    onClick={() =>
                        router.visit(user ? route("home") : route("register"))
                    }
                    onMouseEnter={() => setHoverGetStarted(true)}
                    onMouseLeave={() => setHoverGetStarted(false)}
                    style={{
                        padding: "14px 40px",
                        borderRadius: "10px",
                        background: hoverGetStarted ? "#f0f0f0" : "white",
                        color: "#393b83d3",
                        border: "none",
                        fontSize: "18px",
                        fontWeight: "700",
                        cursor: "pointer",
                        transition: "all 0.2s",
                        transform: hoverGetStarted
                            ? "translateY(-2px)"
                            : "translateY(0)",
                    }}
                >
                    Get started for free
                </button>
            </div>
            {/* FOOTER */}
            <div
                style={{
                    width: "100%",
                    background: "#393b83d3",
                    padding: "40px 20px",
                    color: "rgba(255,255,255,0.7)",
                }}
            >
                <div
                    style={{
                        maxWidth: "1100px",
                        margin: "0 auto",
                        display: "grid",
                        gridTemplateColumns:
                            "repeat(auto-fit, minmax(200px, 1fr))",
                        gap: "40px",
                    }}
                >
                    {/* Logo ir aprašymas */}
                    <div>
                        <div
                            style={{
                                display: "flex",
                                alignItems: "center",
                                gap: "8px",
                                marginBottom: "12px",
                            }}
                        >
                            <div
                                style={{
                                    width: "36px",
                                    height: "36px",
                                    borderRadius: "50%",
                                    background: "white",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    color: "#393b83",
                                    fontSize: "18px",
                                    fontWeight: "900",
                                }}
                            >
                                ♥
                            </div>
                            <span
                                style={{
                                    fontSize: "20px",
                                    fontWeight: "900",
                                    color: "white",
                                }}
                            >
                                FundHeart
                            </span>
                        </div>
                        <p style={{ fontSize: "14px", lineHeight: "1.6" }}>
                            Helping people raise money for the causes that
                            matter most.
                        </p>
                    </div>

                    {/* Nuorodos */}
                    <div>
                        <h4
                            style={{
                                color: "white",
                                fontWeight: "700",
                                marginBottom: "16px",
                                fontSize: "15px",
                            }}
                        >
                            Fundraising
                        </h4>
                        <div
                            style={{
                                display: "flex",
                                flexDirection: "column",
                                gap: "10px",
                            }}
                        >
                            <span
                                onClick={() => router.visit(route("home"))}
                                style={{ cursor: "pointer", fontSize: "14px" }}
                                onMouseEnter={(e) =>
                                    (e.target.style.color = "white")
                                }
                                onMouseLeave={(e) =>
                                    (e.target.style.color =
                                        "rgba(255,255,255,0.7)")
                                }
                            >
                                Discover Causes
                            </span>
                            <span
                                onClick={() => router.visit(user ? route("story") : route("login"))}
                                style={{ cursor: "pointer", fontSize: "14px" }}
                                onMouseEnter={(e) =>
                                    (e.target.style.color = "white")
                                }
                                onMouseLeave={(e) =>
                                    (e.target.style.color =
                                        "rgba(255,255,255,0.7)")
                                }
                            >
                                Start Fundraising
                            </span>
                        </div>
                    </div>

                    {/* Paskyra */}
                    <div>
                        <h4
                            style={{
                                color: "white",
                                fontWeight: "700",
                                marginBottom: "16px",
                                fontSize: "15px",
                            }}
                        >
                            Account
                        </h4>
                        <div
                            style={{
                                display: "flex",
                                flexDirection: "column",
                                gap: "10px",
                            }}
                        >
                            <span
                                onClick={() => router.visit(user ? route("home") : route("login"))}
                                style={{ cursor: "pointer", fontSize: "14px" }}
                                onMouseEnter={(e) =>
                                    (e.target.style.color = "white")
                                }
                                onMouseLeave={(e) =>
                                    (e.target.style.color =
                                        "rgba(255,255,255,0.7)")
                                }
                            >
                                Log in
                            </span>
                            <span
                                onClick={() => router.visit(user ? route("home") : route("register"))}
                                style={{ cursor: "pointer", fontSize: "14px" }}
                                onMouseEnter={(e) =>
                                    (e.target.style.color = "white")
                                }
                                onMouseLeave={(e) =>
                                    (e.target.style.color =
                                        "rgba(255,255,255,0.7)")
                                }
                            >
                                Register
                            </span>
                        </div>
                    </div>
                </div>

                {/* Copyright */}
                <div
                    style={{
                        maxWidth: "1100px",
                        margin: "40px auto 0",
                        paddingTop: "20px",
                        borderTop: "1px solid rgba(255,255,255,0.15)",
                        textAlign: "center",
                        fontSize: "13px",
                    }}
                >
                    © {new Date().getFullYear()} FundHeart. All rights reserved.
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
