import { useEffect, useState } from "react";
import "../../css/entry.css";
import axios from "axios";
import Str from "@/Components/Str";
import rand from "@/Functions/rand";
import { router } from "@inertiajs/react";
import { usePage } from "@inertiajs/react";
import { Head } from "@inertiajs/react";

import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";

export default function EditStory({ story, allTags }) {
    const { auth, errors = {} } = usePage().props;
    const [localErrors, setLocalErrors] = useState({});
    const user = auth?.user || null;
    const [loading, setLoading] = useState(false);
    // const [selectedTags, setSelectedTags] = useState([]);
    const [newTag, setNewTag] = useState("");

    // useEffect(() => {
    //     setLocalErrors(serverErrors || {});
    // }, [serverErrors]);

    useEffect(() => {
        setLocalErrors(errors || {});
    }, [errors]);

    const [str, setStr] = useState({
        title: story.title || "",
        text: story.text || "",
        title_photo: story.title_photo || null,
        photos: story.photos || [],
        required_amount: story.required_amount || "",
    });

    const [selectedTags, setSelectedTags] = useState(
        story.hash_tags?.map((t) => t.hash_tag) || [],
    );

    const handleChange = (e) => {
        const { name, value } = e.target;

        setStr((prev) => ({
            ...prev,
            [name]: value,
        }));

        setLocalErrors((prev) => ({
            ...prev,
            [name]: null,
            hash_tags: null,
        }));
    };

    const handleFileChange = (e) => {
        setStr((prev) => ({
            ...prev,
            title_photo: e.target.files[0],
        }));
        setLocalErrors((prev) => ({
            ...prev,
            title_photo: null,
        }));
    };

    const handlePhotosChange = (e) => {
        const files = Array.from(e.target.files);

        setStr((prev) => ({
            ...prev,
            photos: [...(prev.photos || []), ...files],
        }));
    };

    const updateStr = (_) => {
        setLoading(true);

        const data = new FormData();

        data.append("_method", "put");

        data.append("title", str.title);
        data.append("text", str.text);
        data.append("required_amount", str.required_amount);

        selectedTags.forEach((tag, index) => {
            data.append(`hash_tags[${index}]`, tag);
        });

        if (str.title_photo instanceof File) {
            data.append("title_photo", str.title_photo);
        }

        if (str.title_photo === null) {
            data.append("remove_title_photo", 1);
        }

        const existingPhotos = str.photos.filter(
            (photo) => !(photo instanceof File),
        );

        data.append("existing_photos", JSON.stringify(existingPhotos));

        str.photos.forEach((photo, index) => {
            if (photo instanceof File) {
                data.append(`photos[${index}]`, photo);
            }
        });

        router.post(`/stories/${story.id}`, data, {
            forceFormData: true,
            preserveScroll: false,
            preserveState: false,
            onSuccess: () => {
                // router.visit("/home");
            },
            onFinish: () => setLoading(false),
        });
    };

    return (
        <AuthenticatedLayout user={user}>
            <Head title="Improve Your Story!" />
            {loading ? (
                <div className="loader-container">
                    <div className="loader">
                        <span></span>
                    </div>
                </div>
            ) : (
                <>
                    <h1 className="new-story-h1">Improve Your Story!</h1>
                    <div className="new-story-container">
                        <Str
                            str={str}
                            setStr={setStr}
                            handleChange={handleChange}
                            handleFileChange={handleFileChange}
                            handlePhotosChange={handlePhotosChange}
                            errors={localErrors}
                            selectedTags={selectedTags}
                            setSelectedTags={setSelectedTags}
                            newTag={newTag}
                            setNewTag={setNewTag}
                            allTags={allTags}
                        />

                        <div className="new-story-buttons">
                            <button
                                className="btn new-story-button-save"
                                onClick={updateStr}
                                type="button"
                            >
                                Save
                            </button>

                            <button
                                className="btn new-story-button-cancel"
                                type="button"
                                onClick={() => router.visit("/home")}
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                </>
            )}
        </AuthenticatedLayout>
    );
}
