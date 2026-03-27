import { router } from "@inertiajs/react";
import { Head } from "@inertiajs/react";
import { useState } from "react";
import StoryCard from "@/Components/StoryCard";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";

export default function MyStory({ story }) {
    const [confirmDelete, setConfirmDelete] = useState(false);
    const [currentStory, setCurrentStory] = useState(story);

    const statusColors = {
        pending: { bg: "#fef3c7", color: "#92400e", border: "#fcd34d" },
        approved: { bg: "#d1fae5", color: "#065f46", border: "#6ee7b7" },
        rejected: { bg: "#fee2e2", color: "#7f1d1d", border: "#fca5a5" },
    };

    const statusIcons = {
        pending: "⏳",
        approved: "✅",
        rejected: "❌",
    };

    const s = statusColors[story.status];

    const handleDelete = () => {
        router.delete(`/stories/${story.id}`, {
            onSuccess: () => router.visit(route("home")),
        });
    };

    return (
        <AuthenticatedLayout>
            <Head title="My Story" />
            <div className="layout">
                <h1>My Story</h1>
                <div
                    style={{
                        background: s.bg,
                        border: `1px solid ${s.border}`,
                        borderRadius: "12px",
                        padding: "16px 24px",
                        marginBottom: "24px",
                        maxWidth: "800px",
                        width: "100%",
                    }}
                >
                    <div
                        style={{
                            fontSize: "18px",
                            fontWeight: "700",
                            color: s.color,
                        }}
                    >
                        {statusIcons[story.status]} Story Status:{" "}
                        <span style={{ textTransform: "capitalize" }}>
                            {story.status}
                        </span>
                    </div>
                    {story.status === "pending" && (
                        <p
                            style={{
                                color: s.color,
                                marginTop: "8px",
                                fontSize: "14px",
                            }}
                        >
                            Your story is awaiting admin approval. You will see
                            it publicly once approved.
                        </p>
                    )}
                    {story.status === "rejected" && story.admin_comment && (
                        <div style={{ marginTop: "10px" }}>
                            <p
                                style={{
                                    color: s.color,
                                    fontWeight: "600",
                                    fontSize: "14px",
                                }}
                            >
                                Admin comment:
                            </p>
                            <p
                                style={{
                                    color: s.color,
                                    fontSize: "14px",
                                    marginTop: "4px",
                                }}
                            >
                                {story.admin_comment}
                            </p>
                        </div>
                    )}
                </div>
                <table>
                    <thead>
                        <tr>
                            <th>About</th>
                            <th>Donation History</th>
                        </tr>
                    </thead>
                    <tbody>
                        <StoryCard
                            story={currentStory}
                            showActions={true}
                            onPreview={(s) => router.visit(`/stories/${s.id}`)}
                            onEdit={(s) =>
                                router.visit(`/stories/${s.id}/edit`)
                            }
                            onDelete={() => setConfirmDelete(true)}
                        />
                    </tbody>
                </table>
            </div>

            {/* Delete Modal */}
            {confirmDelete && (
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
                                onClick={handleDelete}
                            >
                                Yes, Delete
                            </button>
                            <button
                                className="modal-cancel-btn"
                                onClick={() => setConfirmDelete(false)}
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
