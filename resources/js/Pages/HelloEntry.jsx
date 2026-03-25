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
        const confirmed = window.confirm(
            "⚠️ Are you sure you want to delete this story? This action cannot be undone.",
        );

        if (!confirmed) return;

        router.delete(`/stories/${id}`, {
            onSuccess: () => {
                setSq((old) => old.filter((s) => s.id !== id));
            },
            onError: (err) => {
                console.log(err);
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
        </AuthenticatedLayout>
    );
}
