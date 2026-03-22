import { useEffect, useState } from "react";
import { router } from "@inertiajs/react";
import "../../css/entry.css";
import axios from "axios";
import Sq from "@/Components/Str";
import rand from "@/Functions/rand";
import randColor from "@/Functions/randColor";
import { Head } from "@inertiajs/react";
import { usePage } from "@inertiajs/react";

import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";

export default function HelloEntry({ number, entriesUrl }) {
    const [likes, setLikes] = useState(0);
    const [sq, setSq] = useState(null);
    const { auth } = usePage().props;
    const user = auth?.user || null;

    useEffect(
        (_) => {
            if (!entriesUrl) return;

            axios
                .get(entriesUrl)
                .then((res) => setSq(res.data.stories))
                .catch((e) => console.log(e));

            // console.log('Kreipiuosi į serverį adresu: ' + entriesUrl);
            //     axios.get(entriesUrl)
            //     .then(res => {
            //         const entriesFromServer = res.data.entries;
            //         setSq(entriesFromServer);
            //     })
            //     .catch(e => console.log(e))
        },
        [entriesUrl],
    );

    if (sq === null) {
        return (
            <div className="loader-container">
                <div className="loader">
                    <span></span>
                </div>
            </div>
        );
    }

    const addLike = () => {
        setLikes(likes + 1);
    };

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

                <h1>Discover fundraisers inspired by what you care about!</h1>

                <table>
                    <thead>
                        <tr>
                            <th>Stories</th>
                            <th>Donation History</th>
                        </tr>
                    </thead>

                    <tbody>
                        {sq.map((story) => {
                            const percent = 40;
                            // (story.current_amount / story.required_amount) *
                            // 100;
                            return (
                                <tr key={story.id}>
                                    <td className="gallery-container">
                                        <h2 className="stories-title-td">
                                            {story.title}
                                        </h2>
                                        <div className="tags">
                                            {story.hash_tags?.map((tag, i) => (
                                                <span key={i}>
                                                    #{tag.hash_tag}{" "}
                                                </span>
                                            ))}
                                        </div>
                                        {story.title_photo && (
                                            <img
                                                className="main"
                                                src={`/storage/${story.title_photo}`}
                                                alt="Title"
                                            />
                                        )}

                                        <div className="gallery">
                                            {story.photos &&
                                                story.photos
                                                    ?.slice(0, 4)
                                                    .map((photo, i) => (
                                                        <img
                                                            key={i}
                                                            src={`/storage/${photo}`}
                                                            alt={`photo-${i}`}
                                                        />
                                                    ))}
                                            {story.photos?.length > 4 && (
                                                <div className="more">
                                                    +{story.photos.length - 4}
                                                </div>
                                            )}
                                        </div>
                                        <div className="stories-td">
                                            {story.text}
                                        </div>
                                    </td>

                                    <td className="donation-history-container">
                                        <div className="donation-history">
                                            <div className="circle-progress">
                                                <svg viewBox="0 0 100 100">
                                                    <circle
                                                        className="bg"
                                                        cx="50"
                                                        cy="50"
                                                        r="45"
                                                    />
                                                    <circle
                                                        className="progress"
                                                        cx="50"
                                                        cy="50"
                                                        r="45"
                                                        style={{
                                                            strokeDashoffset: `calc(283 - (283 * ${percent}) / 100)`,
                                                        }}
                                                    />
                                                </svg>
                                                <div className="circle-text">
                                                    {Math.round(percent)}%
                                                </div>
                                            </div>
                                            <div className="amount-container">
                                                <div className="current-amount">
                                                    {(
                                                        story.required_amount *
                                                        0.4
                                                    ).toFixed(2)}{" "}
                                                    € raised
                                                </div>
                                                <div className="required-amount">
                                                    of {story.required_amount} €
                                                </div>
                                            </div>
                                        </div>

                                        <div className="donate-react-buttons">
                                            <button
                                                className="btn new-story-button-save btn-list like-btn"
                                                onClick={addLike}
                                            >
                                                <i class="fa-solid fa-heart-circle-plus"></i>{" "}
                                                React
                                            </button>

                                            <button className="btn new-story-button-save btn-list donate-btn">
                                                Donate
                                            </button>
                                        </div>

                                        <ol className="donations-container">
                                            <h3 className="recent-donations">
                                                <i className="fa-solid fa-chart-line"></i>{" "}
                                                Recent donations
                                            </h3>
                                            <li>
                                                <i class="fa-brands fa-supportnow"></i>{" "}
                                                Jonas – 50,00 €
                                            </li>
                                            <li>
                                                <i class="fa-brands fa-supportnow"></i>{" "}
                                                Ona – 20,00 €
                                            </li>
                                            <li>
                                                <i class="fa-brands fa-supportnow"></i>{" "}
                                                Petras – 100,00 €
                                            </li>
                                        </ol>
                                        <div className="donation-buttons">
                                            <button
                                                type="button"
                                                className="btn new-story-button-save donation-button-see"
                                            >
                                                See all
                                            </button>
                                            <button
                                                type="button"
                                                className="btn new-story-button-save donation-button-see"
                                            >
                                                See top
                                            </button>
                                        </div>
                                        <div className="action-buttons">
                                            <button className="btn new-story-button-save edit-btn" onClick={() => router.visit(`/stories/${story.id}/edit`)}>
                                                Edit
                                            </button>
                                            <button className="btn new-story-button-save preview-btn">
                                                Preview
                                            </button>
                                            <button
                                                className="btn new-story-button-save delete-btn"
                                                onClick={(_) =>
                                                    remove(story.id)
                                                }
                                            >
                                                Delete
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        </AuthenticatedLayout>
    );
}
