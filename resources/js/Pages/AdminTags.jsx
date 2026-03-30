import { router } from "@inertiajs/react";
import { Head } from "@inertiajs/react";
import { useState } from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";

export default function AdminTags({ allTags }) {
    const [newTag, setNewTag] = useState("");
    const [deleteModal, setDeleteModal] = useState(null);

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

    const deleteTag = (tag) => setDeleteModal(tag);

    const confirmDelete = () => {
        router.delete("/admin/tags", {
            data: { hash_tag: deleteModal },
            onSuccess: () => setDeleteModal(null),
        });
    };

    return (
        <AuthenticatedLayout>
            <Head title="Manage Tags" />
            <div
                style={{
                    maxWidth: "800px",
                    margin: "40px auto",
                    padding: "0 20px",
                }}
            >
                <div
                    style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        gap: "16px",
                        marginBottom: "30px",
                    }}
                >
                    <h1 style={{ margin: 0 }}>Manage Hash Tags</h1>
                </div>

                {/* ADD TAG */}
                <div
                    style={{
                        background: "white",
                        borderRadius: "12px",
                        padding: "24px",
                        boxShadow: "0 4px 15px rgba(0,0,0,0.1)",
                        marginBottom: "24px",
                    }}
                >
                    <h2
                        style={{
                            fontSize: "18px",
                            fontWeight: "700",
                            marginBottom: "16px",
                        }}
                    >
                        Add New Tag
                    </h2>
                    <div style={{ display: "flex", gap: "8px" }}>
                        <input
                            type="text"
                            placeholder="New tag..."
                            value={newTag}
                            onChange={(e) => setNewTag(e.target.value)}
                            onKeyDown={(e) => e.key === "Enter" && addTag()}
                            style={{
                                flex: 1,
                                padding: "10px 14px",
                                borderRadius: "8px",
                                border: "1px solid #ddd",
                                fontSize: "15px",
                            }}
                        />
                        <button
                            onClick={addTag}
                            style={{
                                padding: "10px 20px",
                                borderRadius: "8px",
                                background: "#393b83d3",
                                color: "white",
                                border: "none",
                                cursor: "pointer",
                                fontSize: "15px",
                            }}
                        >
                            Add Tag
                        </button>
                    </div>
                </div>

                {/* TAGS LIST */}
                <div
                    style={{
                        background: "white",
                        borderRadius: "12px",
                        padding: "24px",
                        boxShadow: "0 4px 15px rgba(0,0,0,0.1)",
                    }}
                >
                    <h2
                        style={{
                            fontSize: "18px",
                            fontWeight: "700",
                            marginBottom: "16px",
                        }}
                    >
                        All Tags{" "}
                        <span
                            style={{
                                color: "#888",
                                fontWeight: "400",
                                fontSize: "15px",
                            }}
                        >
                            ({allTags.length})
                        </span>
                    </h2>
                    {allTags.length === 0 ? (
                        <p style={{ color: "#888" }}>No tags yet.</p>
                    ) : (
                        <div
                            style={{
                                display: "flex",
                                flexWrap: "wrap",
                                gap: "10px",
                            }}
                        >
                            {allTags.map((tag, i) => (
                                <div
                                    key={i}
                                    style={{
                                        display: "flex",
                                        alignItems: "center",
                                        gap: "8px",
                                        background: "#f3f4f6",
                                        borderRadius: "10px",
                                        padding: "8px 14px",
                                        border: "1px solid #e5e7eb",
                                    }}
                                >
                                    <span
                                        style={{
                                            fontSize: "15px",
                                            color: "#393b83d3",
                                            fontWeight: "600",
                                        }}
                                    >
                                        #{tag}
                                    </span>
                                    <button
                                        onClick={() => deleteTag(tag)}
                                        style={{
                                            background: "none",
                                            border: "none",
                                            color: "#ef4444",
                                            cursor: "pointer",
                                            fontWeight: "bold",
                                            fontSize: "16px",
                                            lineHeight: 1,
                                        }}
                                    >
                                        ✕
                                    </button>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>

            {/* DELETE MODAL */}
            {deleteModal && (
                <div className="modal-overlay">
                    <div className="modal-box">
                        <h3>Delete Tag?</h3>
                        <p>
                            Are you sure you want to delete{" "}
                            <strong>#{deleteModal}</strong>? This will remove it
                            from all stories.
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
