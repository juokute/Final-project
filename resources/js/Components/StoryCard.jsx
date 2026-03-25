import { useState } from "react";
import axios from "axios";
import { usePage, router } from "@inertiajs/react";

export default function StoryCard({
    story,
    showActions = true,
    onPreview,
    onEdit,
    onDelete,
    onBack,
    fullText = false,
}) {
    const { auth } = usePage().props;
    const user = auth?.user || null;

    const [hearted, setHearted] = useState(story.hearted);
    const [heartCount, setHeartCount] = useState(story.heart_count);
    const [heartLoading, setHeartLoading] = useState(false);

    const [percent, setPercent] = useState(story.percent ?? 0);
    const [totalDonated, setTotalDonated] = useState(story.total_donated ?? 0);
    const [recentDonations, setRecentDonations] = useState(
        story.recent_donations ?? [],
    );

    const [showDonateInput, setShowDonateInput] = useState(false);
    const [donateAmount, setDonateAmount] = useState("");
    const [donateLoading, setDonateLoading] = useState(false);
    const [donateError, setDonateError] = useState("");

    const toggleHeart = async () => {
        if (!user) {
            router.visit(route("register"));
            return;
        }
        if (heartLoading) return;
        setHeartLoading(true);
        try {
            const res = await axios.post(`/stories/${story.id}/heart`);
            setHearted(res.data.hearted);
            setHeartCount(res.data.count);
        } catch (e) {
            console.error(e);
        } finally {
            setHeartLoading(false);
        }
    };

    const handleDonateClick = () => {
        if (!user) {
            router.visit(route("register"));
            return;
        }
        setShowDonateInput(true);
    };

    const handleDonateSubmit = async () => {
        if (!donateAmount || isNaN(donateAmount) || Number(donateAmount) < 1) {
            setDonateError("Please enter a valid amount (min 1€)");
            return;
        }
        setDonateLoading(true);
        setDonateError("");
        try {
            const res = await axios.post(`/stories/${story.id}/donate`, {
                amount: donateAmount,
            });
            setPercent(res.data.percent);
            setTotalDonated(res.data.total_donated);
            setRecentDonations(res.data.recent_donations);
            setShowDonateInput(false);
            setDonateAmount("");
        } catch (e) {
            setDonateError("Something went wrong. Try again.");
            console.error(e);
        } finally {
            setDonateLoading(false);
        }
    };

    return (
        <tr>
            <td className="gallery-container">
                <div style={{ display: "flex", justifyContent: "center", gap: "10px" }}>
                    <h2 className="stories-title-td">{story.title}</h2>
                </div>

                <div className="tags">
                    {story.hash_tags?.map((tag, i) => (
                        <span key={i}>#{tag.hash_tag} </span>
                    ))}
                </div>

                {story.title_photo && (
                    <img className="main" src={`/storage/${story.title_photo}`} alt="Title" />
                )}

                <div className="gallery">
                    {story.photos?.slice(0, 4).map((photo, i) => (
                        <img key={i} src={`/storage/${photo}`} alt={`photo-${i}`} />
                    ))}
                    {story.photos?.length > 4 && (
                        <div className="more">+{story.photos.length - 4}</div>
                    )}
                </div>

                <div className="stories-td">
                    {fullText ? (
                        story.text
                    ) : story.text.length > 200 ? (
                        <>
                            {story.text.slice(0, 200)}...
                            <span className="read-more" onClick={() => onPreview(story)}>
                                Read more
                            </span>
                        </>
                    ) : (
                        story.text
                    )}
                </div>
            </td>

            <td className="donation-history-container">
                <div className="donation-history">
                    <div className="circle-progress">
                        <svg viewBox="0 0 100 100">
                            <circle className="bg" cx="50" cy="50" r="45" />
                            <circle
                                className="progress"
                                cx="50" cy="50" r="45"
                                style={{
                                    strokeDashoffset: `calc(283 - (283 * ${percent}) / 100)`,
                                }}
                            />
                        </svg>
                        <div className="circle-text">{Math.round(percent)}%</div>
                    </div>
                    <div className="amount-container">
                        <div className="current-amount">
                            {Number(totalDonated).toFixed(2)} € raised
                        </div>
                        <div className="required-amount">
                            of {story.required_amount} €
                        </div>
                    </div>
                </div>

                <div className="donate-react-buttons">
                    <button
                        className={`btn new-story-button-save btn-list like-btn ${hearted ? "hearted" : ""}`}
                        onClick={toggleHeart}
                        disabled={heartLoading}
                    >
                        <i className={`fa-${hearted ? "solid" : "regular"} fa-heart`}></i>
                        {heartCount > 0 && <span>{heartCount}</span>}
                        <span>&nbsp;&nbsp;&nbsp;React</span>
                    </button>

                    <button
                        className="btn new-story-button-save btn-list donate-btn"
                        onClick={handleDonateClick}
                    >
                        Donate
                    </button>
                </div>

                {/* 💰 DONATE INPUT */}
                {showDonateInput && (
                    <div className="donate-input-container" style={{ marginTop: "10px" }}>
                        <input
                            type="number"
                            min="1"
                            placeholder="Enter amount €"
                            value={donateAmount}
                            onChange={(e) => setDonateAmount(e.target.value)}
                            style={{ padding: "6px", borderRadius: "6px", border: "1px solid #ccc", width: "120px" }}
                        />
                        {donateError && (
                            <div style={{ color: "red", fontSize: "12px", marginTop: "4px" }}>
                                {donateError}
                            </div>
                        )}
                        <div style={{ display: "flex", gap: "8px", marginTop: "6px" }}>
                            <button
                                className="btn new-story-button-save"
                                onClick={handleDonateSubmit}
                                disabled={donateLoading}
                            >
                                {donateLoading ? "..." : "Donate"}
                            </button>
                            <button
                                className="btn"
                                onClick={() => { setShowDonateInput(false); setDonateAmount(""); setDonateError(""); }}
                                style={{ border: "1px solid #ccc", borderRadius: "6px", padding: "4px 10px" }}
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                )}

                <ol className="donations-container">
                    <h3 className="recent-donations">
                        <i className="fa-solid fa-chart-line"></i> Recent donations
                    </h3>
                    {recentDonations.length > 0 ? (
                        recentDonations.map((d, i) => (
                            <li key={i}>
                                <i className="fa-brands fa-supportnow"></i> {d.name} – {Number(d.amount).toFixed(2)} €
                            </li>
                        ))
                    ) : (
                        <li>No donations yet</li>
                    )}
                </ol>

                <div className="donation-buttons">
                    <button type="button" className="btn new-story-button-save donation-button-see">See all</button>
                    <button type="button" className="btn new-story-button-save donation-button-see">See top</button>
                </div>

                {showActions && (
                    <div className="action-buttons">
                        <button className="btn new-story-button-save edit-btn" onClick={() => onEdit(story)}>Edit</button>
                        <button className="btn new-story-button-save preview-btn" onClick={() => onPreview(story)}>Preview</button>
                        <button className="btn new-story-button-save delete-btn" onClick={() => onDelete(story.id)}>Delete</button>
                    </div>
                )}
            </td>
        </tr>
    );
}