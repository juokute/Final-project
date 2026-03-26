import { router } from "@inertiajs/react";
import { Head } from "@inertiajs/react";
import { useState } from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";

export default function AdminPanel({ stories, allTags }) {
    const [newTag, setNewTag] = useState("");

    const approve = (id) => router.post(`/stories/${id}/approve`);
    const reject = (id) => router.post(`/stories/${id}/reject`);
    const deleteStory = (id) => {
        if (confirm("Delete this story?")) {
            router.delete(`/stories/${id}`);
        }
    };

    const addTag = () => {
        if (!newTag) return;
        router.post("/admin/tags", { hash_tag: newTag }, {
            onSuccess: () => setNewTag(""),
        });
    };

    const deleteTag = (tag) => {
        router.delete("/admin/tags", { data: { hash_tag: tag } });
    };

    const statusColor = {
        pending: "#f59e0b",
        approved: "#10b981",
        rejected: "#ef4444",
    };

    return (
        <AuthenticatedLayout>
            <Head title="Admin Panel" />
            <div style={{ maxWidth: "1000px", margin: "40px auto", padding: "0 20px" }}>
                <h1 style={{ fontSize: "32px", fontWeight: "800", marginBottom: "30px" }}>
                    Admin Panel
                </h1>

                {/* STORIES */}
                <h2 style={{ fontSize: "22px", fontWeight: "700", marginBottom: "16px" }}>Stories</h2>
                <table style={{ width: "100%", borderCollapse: "collapse", background: "white", borderRadius: "12px", overflow: "hidden", boxShadow: "0 4px 15px rgba(0,0,0,0.1)" }}>
                    <thead>
                        <tr style={{ background: "#393b83d3", color: "white" }}>
                            <th style={{ padding: "12px" }}>Title</th>
                            <th style={{ padding: "12px" }}>Author</th>
                            <th style={{ padding: "12px" }}>Status</th>
                            <th style={{ padding: "12px" }}>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {stories.map((story) => (
                            <tr key={story.id} style={{ borderBottom: "1px solid #eee" }}>
                                <td style={{ padding: "12px" }}>{story.title}</td>
                                <td style={{ padding: "12px" }}>{story.user_id}</td>
                                <td style={{ padding: "12px" }}>
                                    <span style={{
                                        color: statusColor[story.status],
                                        fontWeight: "700",
                                        textTransform: "capitalize"
                                    }}>
                                        {story.status}
                                    </span>
                                </td>
                                <td style={{ padding: "12px", display: "flex", gap: "8px", flexWrap: "wrap" }}>
                                    <button
                                        onClick={() => router.visit(`/stories/${story.id}`)}
                                        style={{ padding: "6px 12px", borderRadius: "6px", border: "1px solid #6c7ae0", color: "#6c7ae0", cursor: "pointer", background: "white" }}
                                    >
                                        Preview
                                    </button>
                                    {story.status !== "approved" && (
                                        <button
                                            onClick={() => approve(story.id)}
                                            style={{ padding: "6px 12px", borderRadius: "6px", border: "1px solid #10b981", color: "#10b981", cursor: "pointer", background: "white" }}
                                        >
                                            Approve
                                        </button>
                                    )}
                                    {story.status !== "rejected" && (
                                        <button
                                            onClick={() => reject(story.id)}
                                            style={{ padding: "6px 12px", borderRadius: "6px", border: "1px solid #f59e0b", color: "#f59e0b", cursor: "pointer", background: "white" }}
                                        >
                                            Reject
                                        </button>
                                    )}
                                    <button
                                        onClick={() => deleteStory(story.id)}
                                        style={{ padding: "6px 12px", borderRadius: "6px", border: "1px solid #ef4444", color: "#ef4444", cursor: "pointer", background: "white" }}
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                {/* TAGS */}
                <h2 style={{ fontSize: "22px", fontWeight: "700", margin: "40px 0 16px" }}>Hash Tags</h2>
                <div style={{ display: "flex", gap: "8px", marginBottom: "20px" }}>
                    <input
                        type="text"
                        placeholder="New tag..."
                        value={newTag}
                        onChange={(e) => setNewTag(e.target.value)}
                        style={{ padding: "8px 12px", borderRadius: "8px", border: "1px solid #ddd", fontSize: "14px" }}
                    />
                    <button
                        onClick={addTag}
                        style={{ padding: "8px 16px", borderRadius: "8px", background: "#393b83d3", color: "white", border: "none", cursor: "pointer" }}
                    >
                        Add Tag
                    </button>
                </div>
                <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
                    {allTags.map((tag, i) => (
                        <div key={i} style={{ display: "flex", alignItems: "center", gap: "6px", background: "#e5e7eb", borderRadius: "10px", padding: "6px 12px" }}>
                            <span>#{tag}</span>
                            <button
                                onClick={() => deleteTag(tag)}
                                style={{ background: "none", border: "none", color: "#ef4444", cursor: "pointer", fontWeight: "bold" }}
                            >
                                ✕
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        </AuthenticatedLayout>
    );
}