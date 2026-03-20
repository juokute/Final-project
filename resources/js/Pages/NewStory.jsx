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
    const { auth, errors: serverErrors } = usePage().props;
    const [localErrors, setLocalErrors] = useState({});
    const user = auth?.user || null;
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLocalErrors(serverErrors || {});
    }, [serverErrors]);

    const [str, setStr] = useState({
        title: "",
        text: "",
        title_photo: null,
        photos: [],
        required_amount: "",
        hash_tag: "",
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
        }));
    };

    const handleFileChange = (e) => {
        setStr((prev) => ({
            ...prev,
            title_photo: e.target.files[0],
        }));
    };

    const handlePhotosChange = (e) => {
        setStr((prev) => ({
            ...prev,
            photos: Array.from(e.target.files),
        }));
    };

    const addStr = (_) => {
        // if (
        //     !str.title ||
        //     !str.text ||
        //     !str.title_photo ||
        //     !str.required_amount
        // ) {
        //     alert("Please fill all required fields");
        //     return;
        // }

        setLoading(true);

        const data = new FormData();

        data.append("title", str.title);
        data.append("text", str.text);
        data.append("required_amount", str.required_amount);
        data.append("hash_tag", str.hash_tag);

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
        <AuthenticatedLayout user={user}>
            <Head title="Create Your Story!" />
            {loading ? (
                <div className="loader-container">
                    <div className="loader">
                        <span></span>
                    </div>
                </div>
            ) : (
                <>
                    <h1 className="new-story-h1">Create Your Story!</h1>
                    <div className="new-story-container">
                        <Str
                            str={str}
                            handleChange={handleChange}
                            handleFileChange={handleFileChange}
                            handlePhotosChange={handlePhotosChange}
                            errors={localErrors}
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
