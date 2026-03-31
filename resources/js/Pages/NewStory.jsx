import { useEffect, useState } from "react";
import "../../css/entry.css";
import axios from "axios";
import Str from "@/Components/Str";
import rand from "@/Functions/rand";
import { router } from "@inertiajs/react";
import { usePage } from "@inertiajs/react";
import { Head } from "@inertiajs/react";

import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";

export default function NewStory({ storiesUrl }) {
    const { auth, errors = {}, allTags } = usePage().props;
    const [localErrors, setLocalErrors] = useState({});
    const user = auth?.user || null;
    const [loading, setLoading] = useState(false);
    const [selectedTags, setSelectedTags] = useState([]);
    const [newTag, setNewTag] = useState("");

    // useEffect(() => {
    //     setLocalErrors(serverErrors || {});
    // }, [serverErrors]);

    useEffect(() => {
        setLocalErrors(errors || {});
    }, [errors]);

    const [str, setStr] = useState({
        title: "",
        text: "",
        title_photo: null,
        photos: [],
        required_amount: "",
    });

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
        setStr((prev) => ({
            ...prev,
            photos: Array.from(e.target.files),
        }));
    //     setLocalErrors((prev) => ({
    //     ...prev,
    //     photos: null,
    // }));
    };

    const addStr = (_) => {
        setLoading(true);

        const data = new FormData();

        data.append("title", str.title);
        data.append("text", str.text);
        data.append("required_amount", str.required_amount);
        selectedTags.forEach((tag, index) => {
            data.append(`hash_tags[${index}]`, tag);
        });

        if (str.title_photo) {
            data.append("title_photo", str.title_photo);
        }

        str.photos.forEach((photo, index) => {
            data.append(`photos[${index}]`, photo);
        });

        // Laravel POST
        router.post("/stories", data, {
            forceFormData: true,
            onFinish: () => setLoading(false),
        });
    };

    return (
        <AuthenticatedLayout user={user} >
            <Head title="Create Your Story!" />
            {loading ? (
                <div className="loader-container">
                    <div className="loader">
                        <span></span>
                    </div>
                </div>
            ) : (
                <>
                    <h1 className="new-story-h1" style={{ background: "none"}}>Create Your Story!</h1>
                    <div className="new-story-container" >
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
                                onClick={addStr}
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
