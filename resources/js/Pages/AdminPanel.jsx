import { router } from "@inertiajs/react";
import { Head } from "@inertiajs/react";
import { useState } from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";

export default function AdminPanel({ stories, allTags }) {
    const [newTag, setNewTag] = useState("");
    const [editingTags, setEditingTags] = useState(null); // { storyId, tags[] }
    const [tagInput, setTagInput] = useState("");
    const [rejectModal, setRejectModal] = useState(null);
    const [rejectMessage, setRejectMessage] = useState("");
    const [deleteModal, setDeleteModal] = useState(null);

    const approve = (id) => router.post(`/stories/${id}/approve`);
    const openRejectModal = (id) => {
        setRejectModal(id);
        setRejectMessage("");
    };

    const deleteStory = (id) => setDeleteModal(id);

    const confirmDelete = () => {
        router.delete(`/stories/${deleteModal}`, {
            onSuccess: () => setDeleteModal(null),
        });
    };

    const openTagEditor = (story) => {
        setEditingTags({
            storyId: story.id,
            tags: story.hash_tags?.map((t) => t.hash_tag) ?? [],
        });
        setTagInput("");
    };

    const addTagToStory = () => {
        if (!tagInput || editingTags.tags.includes(tagInput)) return;
        setEditingTags((prev) => ({ ...prev, tags: [...prev.tags, tagInput] }));
        setTagInput("");
    };

    const removeTagFromStory = (tag) => {
        setEditingTags((prev) => ({
            ...prev,
            tags: prev.tags.filter((t) => t !== tag),
        }));
    };

    const saveStoryTags = () => {
        router.put(
            `/stories/${editingTags.storyId}/tags`,
            {
                hash_tags: editingTags.tags,
            },
            {
                onSuccess: () => setEditingTags(null),
            },
        );
    };

    const addTag = () => {
        if (!newTag) return;
        router.post(
            "/admin/tags",
            { hash_tag: newTag },
            {
                onSuccess: () => setNewTag(""),
            },
        );
    };

    const deleteTag = (tag) => {
        router.delete("/admin/tags", { data: { hash_tag: tag } });
    };

    const statusColor = {
        pending: "#f59e0b",
        approved: "#10b981",
        rejected: "#ef4444",
    };

    const submitReject = () => {
        router.post(
            `/stories/${rejectModal}/reject`,
            {
                message: rejectMessage,
            },
            {
                onSuccess: () => setRejectModal(null),
            },
        );
    };

    return (
        <AuthenticatedLayout>
            <Head title="Admin Panel" />
            <div style={{ width: "1400px", margin: "20px auto" }}>
                <h1
                    style={{
                        fontSize: "45px",
                        fontWeight: "900",
                        marginBottom: "20px",
                    }}
                >
                    Admin Panel
                </h1>

                {/* STORIES */}
                <table
                    style={{
                        width: "100%",
                        borderCollapse: "collapse",
                        background: "white",
                        overflow: "hidden",
                        boxShadow: "0 4px 15px rgba(0,0,0,0.1)",
                    }}
                >
                    <thead>
                        <tr style={{ background: "#393b83d3", color: "white" }}>
                            <th style={{ padding: "12px" }}>Author</th>
                            <th style={{ padding: "12px" }}>Title</th>
                            <th style={{ padding: "12px" }}>Tags</th>
                            <th style={{ padding: "12px" }}>Status</th>
                            <th style={{ padding: "12px" }}>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {stories.map((story) => (
                            <tr
                                key={story.id}
                                style={{ borderBottom: "1px solid #eee" }}
                            >
                                <td style={{ padding: "12px" }}>
                                    {story.user?.name ?? "Unknown"}
                                </td>
                                <td style={{ padding: "12px" }}>
                                    {story.title}
                                </td>
                                <td style={{ padding: "12px" }}>
                                    <div
                                        style={{
                                            display: "flex",
                                            justifyContent: "center",
                                            flexWrap: "wrap",
                                            gap: "4px",
                                            marginBottom: "6px",
                                        }}
                                    >
                                        {story.hash_tags?.map((t, i) => (
                                            <span
                                                key={i}
                                                style={{
                                                    background: "#e5e7eb",
                                                    borderRadius: "8px",
                                                    padding: "2px 8px",
                                                    fontSize: "13px",
                                                }}
                                            >
                                                #{t.hash_tag}
                                            </span>
                                        ))}
                                    </div>
                                    <button
                                        onClick={() => openTagEditor(story)}
                                        style={{
                                            padding: "6px 12px",
                                            borderRadius: "6px",
                                            border: "1px solid #f59e0b",
                                            color: "#f59e0b",
                                            cursor: "pointer",
                                            background: "white",
                                        }}
                                    >
                                        Edit Tags
                                    </button>
                                </td>
                                <td style={{ padding: "12px" }}>
                                    <span
                                        style={{
                                            color: statusColor[story.status],
                                            fontWeight: "700",
                                            textTransform: "capitalize",
                                        }}
                                    >
                                        {story.status}
                                    </span>
                                </td>
                                <td style={{ padding: "12px" }}>
                                    <div
                                        style={{
                                            display: "flex",
                                            justifyContent: "center",
                                            gap: "8px",
                                            flexWrap: "wrap",
                                        }}
                                    >
                                        <button
                                            onClick={() =>
                                                router.visit(
                                                    `/stories/${story.id}`,
                                                )
                                            }
                                            style={{
                                                width: "90px",
                                                padding: "6px 12px",
                                                borderRadius: "6px",
                                                border: "1px solid #6c7ae0",
                                                color: "#6c7ae0",
                                                cursor: "pointer",
                                                background: "white",
                                            }}
                                        >
                                            Preview
                                        </button>
                                        {story.status !== "approved" && (
                                            <button
                                                onClick={() =>
                                                    approve(story.id)
                                                }
                                                style={{
                                                    width: "90px",
                                                    padding: "6px 12px",
                                                    borderRadius: "6px",
                                                    border: "1px solid #10b981",
                                                    color: "#10b981",
                                                    cursor: "pointer",
                                                    background: "white",
                                                }}
                                            >
                                                Approve
                                            </button>
                                        )}
                                        {story.status !== "rejected" && (
                                            <button
                                                onClick={() =>
                                                    openRejectModal(story.id)
                                                }
                                                style={{
                                                    width: "90px",
                                                    padding: "6px 12px",
                                                    borderRadius: "6px",
                                                    border: "1px solid #f59e0b",
                                                    color: "#f59e0b",
                                                    cursor: "pointer",
                                                    background: "white",
                                                }}
                                            >
                                                Reject
                                            </button>
                                        )}
                                        <button
                                            onClick={() =>
                                                deleteStory(story.id)
                                            }
                                            style={{
                                                width: "90px",
                                                padding: "6px 12px",
                                                borderRadius: "6px",
                                                border: "1px solid #ef4444",
                                                color: "#ef4444",
                                                cursor: "pointer",
                                                background: "white",
                                            }}
                                        >
                                            Delete
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                {/* GLOBAL TAGS */}
                <h2
                    style={{
                        fontSize: "22px",
                        fontWeight: "700",
                        margin: "40px 0 16px",
                    }}
                >
                    Hash Tags
                </h2>
                <div
                    style={{
                        display: "flex",
                        gap: "8px",
                        marginBottom: "20px",
                    }}
                >
                    <input
                        type="text"
                        placeholder="New tag..."
                        value={newTag}
                        onChange={(e) => setNewTag(e.target.value)}
                        style={{
                            padding: "8px 12px",
                            borderRadius: "8px",
                            border: "1px solid #ddd",
                            fontSize: "14px",
                        }}
                    />
                    <button
                        onClick={addTag}
                        style={{
                            padding: "8px 16px",
                            borderRadius: "8px",
                            background: "#393b83d3",
                            color: "white",
                            border: "none",
                            cursor: "pointer",
                        }}
                    >
                        Add Tag
                    </button>
                </div>
                <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
                    {allTags.map((tag, i) => (
                        <div
                            key={i}
                            style={{
                                display: "flex",
                                alignItems: "center",
                                gap: "6px",
                                background: "#e5e7eb",
                                borderRadius: "10px",
                                padding: "6px 12px",
                            }}
                        >
                            <span>#{tag}</span>
                            <button
                                onClick={() => deleteTag(tag)}
                                style={{
                                    background: "none",
                                    border: "none",
                                    color: "#ef4444",
                                    cursor: "pointer",
                                    fontWeight: "bold",
                                }}
                            >
                                ✕
                            </button>
                        </div>
                    ))}
                </div>
            </div>

            {/* TAG EDITOR MODAL */}
            {editingTags && (
                <div className="modal-overlay">
                    <div className="modal-box" style={{ maxWidth: "500px" }}>
                        <h3>Edit Tags</h3>

                        {/* Esami tagai */}
                        <div
                            style={{
                                display: "flex",
                                flexWrap: "wrap",
                                gap: "8px",
                                margin: "16px 0",
                            }}
                        >
                            {editingTags.tags.map((tag, i) => (
                                <div
                                    key={i}
                                    style={{
                                        display: "flex",
                                        alignItems: "center",
                                        gap: "6px",
                                        background: "#e5e7eb",
                                        borderRadius: "10px",
                                        padding: "6px 12px",
                                    }}
                                >
                                    <span>#{tag}</span>
                                    <button
                                        onClick={() => removeTagFromStory(tag)}
                                        style={{
                                            background: "none",
                                            border: "none",
                                            color: "#ef4444",
                                            cursor: "pointer",
                                            fontWeight: "bold",
                                        }}
                                    >
                                        ✕
                                    </button>
                                </div>
                            ))}
                        </div>

                        {/* Pridėt iš globalių tagų */}
                        <div style={{ marginBottom: "12px" }}>
                            <p
                                style={{
                                    fontSize: "13px",
                                    color: "#888",
                                    marginBottom: "8px",
                                }}
                            >
                                Add from existing tags:
                            </p>
                            <div
                                style={{
                                    display: "flex",
                                    flexWrap: "wrap",
                                    gap: "6px",
                                }}
                            >
                                {allTags
                                    .filter(
                                        (t) => !editingTags.tags.includes(t),
                                    )
                                    .map((tag, i) => (
                                        <button
                                            key={i}
                                            onClick={() =>
                                                setEditingTags((prev) => ({
                                                    ...prev,
                                                    tags: [...prev.tags, tag],
                                                }))
                                            }
                                            style={{
                                                padding: "4px 10px",
                                                borderRadius: "8px",
                                                border: "1px solid #ccc",
                                                cursor: "pointer",
                                                background: "white",
                                                fontSize: "13px",
                                            }}
                                        >
                                            #{tag}
                                        </button>
                                    ))}
                            </div>
                        </div>

                        {/* Naujas tagas */}
                        <div
                            style={{
                                display: "flex",
                                gap: "8px",
                                marginBottom: "20px",
                            }}
                        >
                            <input
                                type="text"
                                placeholder="New tag..."
                                value={tagInput}
                                onChange={(e) => setTagInput(e.target.value)}
                                style={{
                                    padding: "8px 12px",
                                    borderRadius: "8px",
                                    border: "1px solid #ddd",
                                    fontSize: "14px",
                                    flex: 1,
                                }}
                            />
                            <button
                                onClick={addTagToStory}
                                style={{
                                    width: "90px",
                                    padding: "8px 16px",
                                    borderRadius: "8px",
                                    background: "#393b83d3",
                                    color: "white",
                                    border: "none",
                                    cursor: "pointer",
                                }}
                            >
                                Add
                            </button>
                        </div>

                        <div className="modal-buttons">
                            <button
                                onClick={saveStoryTags}
                                style={{
                                    width: "90px",
                                    padding: "8px 20px",
                                    borderRadius: "8px",
                                    background: "#393b83d3",
                                    color: "white",
                                    border: "none",
                                    cursor: "pointer",
                                    fontSize: "16px",
                                    marginTop: "0",
                                }}
                            >
                                Save
                            </button>
                            <button
                                className="modal-cancel-btn"
                                onClick={() => setEditingTags(null)}
                                style={{
                                    width: "90px",
                                    fontSize: "16px",
                                    padding: "8px 20px",
                                    border: "1px solid #393b83d3",
                                }}
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            )}
            {rejectModal && (
                <div className="modal-overlay">
                    <div className="modal-box" style={{ maxWidth: "480px" }}>
                        <h3>Reject Story</h3>
                        <p style={{ color: "#666", marginBottom: "16px" }}>
                            Optionally write a comment explaining why the story
                            was rejected.
                        </p>
                        <textarea
                            value={rejectMessage}
                            onChange={(e) => setRejectMessage(e.target.value)}
                            placeholder="Rejection reason (optional)..."
                            rows={5}
                            style={{
                                width: "100%",
                                padding: "10px",
                                borderRadius: "8px",
                                border: "1px solid #ddd",
                                fontSize: "14px",
                                resize: "vertical",
                                fontFamily: "inherit",
                            }}
                        />
                        <div
                            className="modal-buttons"
                            style={{ marginTop: "16px" }}
                        >
                            <button
                                onClick={submitReject}
                                style={{
                                    width: "90px",
                                    padding: "8px 20px",
                                    borderRadius: "8px",
                                    background: "#ef4444",
                                    color: "white",
                                    border: "none",
                                    cursor: "pointer",
                                    fontSize: "16px",
                                }}
                            >
                                Reject
                            </button>
                            <button
                                className="modal-cancel-btn"
                                style={{
                                    width: "90px",
                                    fontSize: "16px",
                                    padding: "8px 20px",
                                    border: "1px solid #393b83d3",
                                }}
                                onClick={() => setRejectModal(null)}
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            )}
            {deleteModal && (
                <div className="modal-overlay">
                    <div className="modal-box">
                        <h3>Delete Story?</h3>
                        <p>
                            ⚠️ Are you sure you want to delete this story? This
                            action cannot be undone.
                        </p>
                        <div className="modal-buttons">
                            <button
                                onClick={confirmDelete}
                                style={{
                                    width: "90px",
                                    padding: "8px 20px",
                                    borderRadius: "8px",
                                    background: "#ef4444",
                                    color: "white",
                                    border: "none",
                                    cursor: "pointer",
                                    fontSize: "16px",
                                }}
                            >
                                Delete
                            </button>
                            <button
                                className="modal-cancel-btn"
                                style={{
                                    width: "90px",
                                    fontSize: "16px",
                                    padding: "8px 20px",
                                    border: "1px solid #393b83d3",
                                }}
                                onClick={() => setDeleteModal(null)}
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
