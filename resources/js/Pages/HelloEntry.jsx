import { useEffect, useState } from "react";
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

    //   const addSq = (_) => {
    //     const number = rand(1000, 9999);
    //     const color = randColor();
    //     const id = rand(100000000, 999999999);

    //     setSq((s) => [...s, { number, color, id }]);
    //   };

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

    return (
        <AuthenticatedLayout user={user}>
            <div className="layout">
                <Head title="Stories of Fundraises" />

                <h1>Platform for funding Ideas</h1>

                <table>
                    <thead>
                        <tr>
                            <th></th>
                            <th>Stories</th>
                            <th>Target Amount €</th>
                            <th>Amount Collected €</th>
                            <th>Remaining to Goal €</th>
                            <th>React ❤️</th>
                            <th>Donation History</th>
                            <th>Donate</th>
                            <th>#Tags</th>
                        </tr>
                    </thead>

                    <tbody>
                        {sq.map((story) => (
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
                                            story.photos.map((photo, i) => (
                                                <img
                                                    key={i}
                                                    src={`/storage/${photo}`}
                                                    alt={`photo-${i}`}
                                                />
                                            ))}
                                    </div>
                                </td>
                                <td className="stories-td">{story.text}</td>
                                <td>{story.required_amount}</td>

                                <td className="amount-collected">
                                    0
                                    <div className="progress">
                                        <div
                                            className="progress-bar"
                                            style={{ width: "35%" }}
                                        ></div>
                                    </div>
                                </td>

                                <td>{story.required_amount}</td>

                                <td>
                                    <span className="likes-span">{likes}</span>

                                    <br />

                                    <button
                                        className="btn-list like-btn"
                                        onClick={addLike}
                                    >
                                        +❤️
                                    </button>
                                </td>

                                <td>
                                    <ul>
                                        <li>Jonas – 50,00 €</li>
                                        <li>Ona – 20,00 €</li>
                                        <li>Petras – 100,00 €</li>
                                    </ul>
                                </td>

                                <td>
                                    <input
                                        type="number"
                                        placeholder="... €"
                                        style={{ textAlign: "center" }}
                                    />

                                    <br />

                                    <button className="btn-list donate-btn">
                                        Donate
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                {/* <h1>Hello Entry {number} </h1>
            <div className='kvadrato-konteineris'>
                {
                    sq.length === 0
                    ?
                    <h3>Kvadratukų nėra. Galite sukurti.</h3>
                    :
                    sq.map(s => <Sq key={s.id} sq={s}></Sq>)
                }

            </div>
            <div className='buttons'>
                <button className="green" onClick={addSq}>ADD SQ</button>
            </div> */}
            </div>
        </AuthenticatedLayout>
    );
}
