import { useEffect, useState } from "react";
import { router } from "@inertiajs/react";
import "../../css/entry.css";
import axios from "axios";
import { Head } from "@inertiajs/react";
import { usePage } from "@inertiajs/react";
import StoryCard from "@/Components/StoryCard";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";

export default function HelloEntry({ number, entriesUrl }) {
    const [sq, setSq] = useState(null);
    const [filtered, setFiltered] = useState(null);
    const { auth } = usePage().props;
    const user = auth?.user || null;
    const [confirmId, setConfirmId] = useState(null);
    const [selectedTag, setSelectedTag] = useState(null);
    const [sortBy, setSortBy] = useState("default");

    useEffect(() => {
        if (!entriesUrl) return;
        axios
            .get(entriesUrl)
            .then((res) => {
                setSq(res.data.stories);
                setFiltered(res.data.stories);
            })
            .catch((e) => console.log(e));
    }, [entriesUrl]);

    useEffect(() => {
        if (!sq) return;

        let result = [...sq];

        // Filtravimas pagal tagą
        if (selectedTag) {
            result = result.filter((story) =>
                story.hash_tags?.some((t) => t.hash_tag === selectedTag),
            );
        }

        // Rūšiavimas
        if (sortBy === "hearts") {
            result = result.sort(
                (a, b) => (b.heart_count ?? 0) - (a.heart_count ?? 0),
            );
        } else {
            // default – nesurinko viršuje
            result = result.sort((a, b) => {
                const aCompleted = a.total_donated >= a.required_amount ? 1 : 0;
                const bCompleted = b.total_donated >= b.required_amount ? 1 : 0;
                return aCompleted - bCompleted;
            });
        }

        setFiltered(result);
    }, [selectedTag, sortBy, sq]);

    // Surink visus unikalius tagus
    const allTags = sq
        ? [
              ...new Set(
                  sq.flatMap((s) => s.hash_tags?.map((t) => t.hash_tag) ?? []),
              ),
          ]
        : [];

    if (sq === null) {
        return (
            <AuthenticatedLayout user={user}>
                <div className="loader-container">
                    <div className="loader">
                        <span></span>
                    </div>
                </div>
            </AuthenticatedLayout>
        );
    }

    const remove = (id) => setConfirmId(id);

    const confirmDelete = () => {
        router.delete(`/stories/${confirmId}`, {
            onSuccess: () => {
                setSq((old) => old.filter((s) => s.id !== confirmId));
                setConfirmId(null);
            },
            onError: (err) => {
                console.log(err);
                setConfirmId(null);
            },
        });
    };

    return (
        <AuthenticatedLayout user={user}>
            <div className="layout">
                <Head title="Stories of Fundraises" />
                <h1>Discover fundraisers inspired by what you care about!</h1>

                {/* FILTRAI */}
                <div
                    style={{
                        display: "flex",
                        flexWrap: "wrap",
                        gap: "12px",
                        alignItems: "center",
                        marginBottom: "20px",
                        width: "100%",
                        maxWidth: "1400px",
                        padding: "0 10px",
                    }}
                >
                    {/* Sort */}
                    <div
                        style={{
                            display: "flex",
                            gap: "8px",
                            alignItems: "center",
                        }}
                    >
                        <span style={{ fontWeight: "600", color: "#555" }}>
                            Sort:
                        </span>
                        <button
                            onClick={() => setSortBy("default")}
                            style={{
                                padding: "6px 14px",
                                borderRadius: "8px",
                                border: "1px solid #393b83d3",
                                background:
                                    sortBy === "default"
                                        ? "#393b83d3"
                                        : "white",
                                color:
                                    sortBy === "default"
                                        ? "white"
                                        : "#393b83d3",
                                cursor: "pointer",
                                fontWeight: "600",
                            }}
                        >
                            All
                        </button>
                        <button
                            onClick={() => setSortBy("hearts")}
                            style={{
                                padding: "6px 14px",
                                borderRadius: "8px",
                                border: "1px solid #393b83d3",
                                background:
                                    sortBy === "hearts" ? "#393b83d3" : "white",
                                color:
                                    sortBy === "hearts" ? "white" : "#393b83d3",
                                cursor: "pointer",
                                fontWeight: "600",
                            }}
                        >
                            ❤️ Most Liked
                        </button>
                    </div>

                    {/* Tags filter */}
                    <div
                        style={{
                            display: "flex",
                            flexWrap: "wrap",
                            gap: "8px",
                            alignItems: "center",
                        }}
                    >
                        <span style={{ fontWeight: "600", color: "#555" }}>
                            Filter:
                        </span>
                        <button
                            onClick={() => setSelectedTag(null)}
                            style={{
                                padding: "6px 14px",
                                borderRadius: "8px",
                                border: "1px solid #ccc",
                                background:
                                    selectedTag === null
                                        ? "#393b83d3"
                                        : "white",
                                color: selectedTag === null ? "white" : "#555",
                                cursor: "pointer",
                            }}
                        >
                            All
                        </button>
                        {allTags.map((tag, i) => (
                            <button
                                key={i}
                                onClick={() =>
                                    setSelectedTag(
                                        tag === selectedTag ? null : tag,
                                    )
                                }
                                style={{
                                    padding: "6px 14px",
                                    borderRadius: "8px",
                                    border: "1px solid #ccc",
                                    background:
                                        selectedTag === tag
                                            ? "#393b83d3"
                                            : "white",
                                    color:
                                        selectedTag === tag ? "white" : "#555",
                                    cursor: "pointer",
                                }}
                            >
                                #{tag}
                            </button>
                        ))}
                    </div>
                </div>

                {filtered?.length === 0 && (
                    <p style={{ color: "#888", fontSize: "18px" }}>
                        No stories found for this tag.
                    </p>
                )}

                <table>
                    <thead>
                        <tr>
                            <th>About</th>
                            <th>Donation History</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filtered?.map((story) => (
                            <StoryCard
                                key={story.id}
                                story={story}
                                onPreview={(story) =>
                                    router.visit(`/stories/${story.id}`)
                                }
                                onEdit={(story) =>
                                    router.visit(`/stories/${story.id}/edit`)
                                }
                                onDelete={remove}
                            />
                        ))}
                    </tbody>
                </table>
            </div>

            {confirmId && (
                <div className="modal-overlay">
                    <div className="modal-box">
                        <h3>Delete Story?</h3>
                        <p>
                            ⚠️ Are you sure you want to delete this story? This
                            action cannot be undone.
                        </p>
                        <div className="modal-buttons">
                            <button
                                className="btn delete-btn"
                                onClick={confirmDelete}
                            >
                                Yes, Delete
                            </button>
                            <button
                                className="modal-cancel-btn"
                                onClick={() => setConfirmId(null)}
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </AuthenticatedLayout>
    );
}
