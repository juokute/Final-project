import { router } from "@inertiajs/react";
import { Head } from "@inertiajs/react";
import { useState } from "react";
import StoryCard from "@/Components/StoryCard";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";

export default function MyStory({ story }) {
    const [confirmDelete, setConfirmDelete] = useState(false);
    const [currentStory, setCurrentStory] = useState(story);

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
                            onEdit={(s) => router.visit(`/stories/${s.id}/edit`)}
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
                        <p>⚠️ Are you sure you want to delete this story? This action cannot be undone.</p>
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