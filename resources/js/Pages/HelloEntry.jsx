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
    const { auth } = usePage().props;
    const user = auth?.user || null;
    const [previewStory, setPreviewStory] = useState(null);
    const [confirmId, setConfirmId] = useState(null);

    useEffect(
        (_) => {
            if (!entriesUrl) return;

            axios
                .get(entriesUrl)
                .then((res) => setSq(res.data.stories))
                .catch((e) => console.log(e));
        },
        [entriesUrl],
    );

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

    const remove = (id) => {
        setConfirmId(id); // ← vietoj window.confirm
    };

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

                {previewStory ? (
                    <div className="preview-container">
                        <table>
                            <tbody>
                                <StoryCard
                                    story={previewStory}
                                    showActions={false}
                                    onBack={() => setPreviewStory(null)}
                                />
                            </tbody>
                        </table>
                    </div>
                ) : (
                    <>
                        <h1>
                            Discover fundraisers inspired by what you care
                            about!
                        </h1>

                        <table>
                            <thead>
                                <tr>
                                    <th>About</th>
                                    <th>Donation History</th>
                                </tr>
                            </thead>

                            <tbody>
                                {sq.map((story) => (
                                    <StoryCard
                                        key={story.id}
                                        story={story}
                                        onPreview={(story) =>
                                            router.visit(`/stories/${story.id}`)
                                        }
                                        onEdit={(story) =>
                                            router.visit(
                                                `/stories/${story.id}/edit`,
                                            )
                                        }
                                        onDelete={remove}
                                    />
                                ))}
                            </tbody>
                        </table>
                    </>
                )}
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
                                Delete
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
