import { useState, useEffect } from "react";
import axios from "axios";
import { usePage, router } from "@inertiajs/react";
import { createPortal } from "react-dom";

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

    const [showDonateConfirm, setShowDonateConfirm] = useState(false);
    const [pendingAmount, setPendingAmount] = useState("");

    const isOwner = user && story.user_id === user.id;

    const [showAllDonations, setShowAllDonations] = useState(false);
    const [allDonations, setAllDonations] = useState([]);
    const [allDonationsLoading, setAllDonationsLoading] = useState(false);

    const [showTopDonations, setShowTopDonations] = useState(false);
    const [topDonations, setTopDonations] = useState([]);
    const [topDonationsLoading, setTopDonationsLoading] = useState(false);

    const [lightbox, setLightbox] = useState(null); // null arba index
    const allPhotos = [
        ...(story.title_photo ? [story.title_photo] : []),
        ...(story.photos ?? []),
    ];

    const openLightbox = (index) => setLightbox(index);
    const closeLightbox = () => setLightbox(null);
    const prevPhoto = () =>
        setLightbox((i) => (i > 0 ? i - 1 : allPhotos.length - 1));
    const nextPhoto = () =>
        setLightbox((i) => (i < allPhotos.length - 1 ? i + 1 : 0));

    const handleSeeTop = async () => {
        setTopDonationsLoading(true);
        setShowTopDonations(true);
        try {
            const res = await axios.get(`/stories/${story.id}/donations/top`);
            setTopDonations(res.data.donations);
        } catch (e) {
            console.error(e);
        } finally {
            setTopDonationsLoading(false);
        }
    };

    useEffect(() => {
        const handleKey = (e) => {
            if (lightbox === null) return;
            if (e.key === "ArrowRight") nextPhoto();
            if (e.key === "ArrowLeft") prevPhoto();
            if (e.key === "Escape") closeLightbox();
        };
        window.addEventListener("keydown", handleKey);
        return () => window.removeEventListener("keydown", handleKey);
    }, [lightbox]);

    const handleSeeAll = async () => {
        setAllDonationsLoading(true);
        setShowAllDonations(true);
        try {
            const res = await axios.get(`/stories/${story.id}/donations`);
            setAllDonations(res.data.donations);
        } catch (e) {
            console.error(e);
        } finally {
            setAllDonationsLoading(false);
        }
    };

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

    const handleDonateSubmit = () => {
        if (!donateAmount || isNaN(donateAmount) || Number(donateAmount) < 1) {
            setDonateError("Please enter a valid amount (min 1€)");
            return;
        }
        setPendingAmount(donateAmount);
        setShowDonateConfirm(true);
    };

    const confirmDonate = async () => {
        setDonateLoading(true);
        setDonateError("");
        setShowDonateConfirm(false);
        try {
            const res = await axios.post(`/stories/${story.id}/donate`, {
                amount: pendingAmount,
            });
            setPercent(res.data.percent);
            setTotalDonated(res.data.total_donated);
            setRecentDonations(res.data.recent_donations);
            setShowDonateInput(false);
            setDonateAmount("");
            setPendingAmount("");
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
                <div
                    style={{
                        display: "flex",
                        justifyContent: "center",
                        gap: "10px",
                    }}
                >
                    <h2 className="stories-title-td">{story.title}</h2>
                </div>

                <div className="tags">
                    {story.hash_tags?.map((tag, i) => (
                        <span key={i}>#{tag.hash_tag} </span>
                    ))}
                </div>

                {story.title_photo && (
                    <img
                        className="main"
                        src={`/storage/${story.title_photo}`}
                        alt="Title"
                        onClick={() => openLightbox(0)}
                        style={{ cursor: "pointer" }}
                    />
                )}

                <div className="gallery">
                    {story.photos?.slice(0, 4).map((photo, i) => (
                        <img
                            key={i}
                            src={`/storage/${photo}`}
                            alt={`photo-${i}`}
                            onClick={() =>
                                openLightbox(story.title_photo ? i + 1 : i)
                            }
                            style={{ cursor: "pointer" }}
                        />
                    ))}
                    {story.photos?.length > 4 && (
                        <div
                            className="more"
                            onClick={() =>
                                openLightbox(story.title_photo ? 5 : 4)
                            }
                            style={{ cursor: "pointer" }}
                        >
                            +{story.photos.length - 4}
                        </div>
                    )}
                </div>

                <div className="stories-td">
                    {fullText ? (
                        story.text
                    ) : story.text.length > 200 ? (
                        <>
                            {story.text.slice(0, 200)}...
                            <span
                                className="read-more"
                                onClick={() => onPreview(story)}
                            >
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
                        <i
                            className={`fa-${hearted ? "solid" : "regular"} fa-heart`}
                        ></i>
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
                    <div
                        className="donate-input-container"
                        style={{ marginTop: "10px" }}
                    >
                        <input
                            className="donate-input"
                            type="number"
                            min="1"
                            placeholder="Enter amount €"
                            value={donateAmount}
                            onChange={(e) => setDonateAmount(e.target.value)}
                        />
                        {donateError && (
                            <div
                                style={{
                                    color: "red",
                                    fontSize: "12px",
                                    marginTop: "4px",
                                }}
                            >
                                {donateError}
                            </div>
                        )}
                        <div
                            style={{
                                display: "flex",
                                justifyContent: "center",
                                gap: "8px",
                            }}
                        >
                            <button
                                className="btn new-story-button-save donation-button-see"
                                onClick={handleDonateSubmit}
                                disabled={donateLoading}
                            >
                                {donateLoading ? "..." : "Donate"}
                            </button>
                            <button
                                className="btn new-story-button-save donation-button-see"
                                onClick={() => {
                                    setShowDonateInput(false);
                                    setDonateAmount("");
                                    setDonateError("");
                                }}
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                )}

                <ol className="donations-container">
                    <h3 className="recent-donations">
                        <i className="fa-solid fa-chart-line"></i> Recent
                        donations
                    </h3>
                    {recentDonations.length > 0 ? (
                        recentDonations.map((d, i) => (
                            <li key={i}>
                                <i className="fa-brands fa-supportnow"></i>{" "}
                                {d.name} – {Number(d.amount).toFixed(2)} €
                            </li>
                        ))
                    ) : (
                        <li>No donations yet</li>
                    )}
                </ol>

                <div className="donation-buttons">
                    <button
                        type="button"
                        className="btn new-story-button-save donation-button-see"
                        onClick={handleSeeAll}
                    >
                        See all
                    </button>
                    <button
                        type="button"
                        className="btn new-story-button-save donation-button-see"
                        onClick={handleSeeTop}
                    >
                        See top
                    </button>
                </div>

                {/* Preview - visada matomas */}
                {onPreview && (
                    <div className="action-buttons">
                        <button
                            className="btn new-story-button-save preview-btn"
                            onClick={() => onPreview(story)}
                        >
                            Preview
                        </button>

                        {/* Edit ir Delete - tik savininkui */}
                        {isOwner && (
                            <>
                                <button
                                    className="btn new-story-button-save edit-btn"
                                    onClick={() => onEdit(story)}
                                >
                                    Edit
                                </button>
                                <button
                                    className="btn new-story-button-save delete-btn"
                                    onClick={() => onDelete(story.id)}
                                >
                                    Delete
                                </button>
                            </>
                        )}
                    </div>
                )}
            </td>
            {showDonateConfirm &&
                createPortal(
                    <div className="modal-overlay">
                        <div className="modal-box">
                            <h3>Confirm Donation</h3>
                            <p>
                                Are you sure you want to donate{" "}
                                <strong>
                                    {Number(pendingAmount).toFixed(2)} €
                                </strong>
                                ?
                            </p>
                            <div className="modal-buttons">
                                <button
                                    className="btn new-story-button-save"
                                    style={{
                                        background: "#393b83d3",
                                        color: "white",
                                    }}
                                    onClick={confirmDonate}
                                    disabled={donateLoading}
                                >
                                    {donateLoading ? "..." : "Donate"}
                                </button>
                                <button
                                    className="modal-cancel-btn"
                                    onClick={() => setShowDonateConfirm(false)}
                                    style={{
                                        height: "39px",
                                        width: "120px",
                                        borderRadius: "10px",
                                        fontSize: "18px",
                                        padding: "0 20px",
                                        marginTop: "20px",
                                        borderColor: "#393b83d3",
                                    }}
                                >
                                    Cancel
                                </button>
                            </div>
                        </div>
                    </div>,
                    document.body,
                )}
            {showAllDonations &&
                createPortal(
                    <div className="modal-overlay">
                        <div className="modal-box">
                            <h3>All Donations</h3>
                            {allDonationsLoading ? (
                                <p>Loading...</p>
                            ) : allDonations.length > 0 ? (
                                <ol
                                    style={{
                                        textAlign: "left",
                                        maxHeight: "400px",
                                        overflowY: "auto",
                                        paddingLeft: "20px",
                                    }}
                                >
                                    {allDonations.map((d, i) => (
                                        <li
                                            key={i}
                                            style={{
                                                padding: "8px 0",
                                                borderBottom: "1px solid #eee",
                                            }}
                                        >
                                            <i className="fa-brands fa-supportnow"></i>{" "}
                                            {d.name} –{" "}
                                            {Number(d.amount).toFixed(2)} €
                                        </li>
                                    ))}
                                </ol>
                            ) : (
                                <p>No donations yet.</p>
                            )}
                            <div
                                className="modal-buttons"
                                style={{ marginTop: "20px" }}
                            >
                                <button
                                    className="modal-cancel-btn"
                                    onClick={() => setShowAllDonations(false)}
                                    style={{
                                        height: "39px",
                                        width: "120px",
                                        borderRadius: "10px",
                                        fontSize: "18px",
                                        padding: "0 20px",
                                        marginTop: "20px",
                                        borderColor: "#393b83d3",
                                    }}
                                >
                                    Close
                                </button>
                            </div>
                        </div>
                    </div>,
                    document.body,
                )}
            {showTopDonations &&
                createPortal(
                    <div className="modal-overlay">
                        <div className="modal-box">
                            <h3>Top Donors</h3>
                            {topDonationsLoading ? (
                                <p>Loading...</p>
                            ) : topDonations.length > 0 ? (
                                <ol
                                    style={{
                                        textAlign: "left",
                                        maxHeight: "400px",
                                        overflowY: "auto",
                                        paddingLeft: "20px",
                                    }}
                                >
                                    {topDonations.map((d, i) => (
                                        <li
                                            key={i}
                                            style={{
                                                padding: "8px 0",
                                                borderBottom: "1px solid #eee",
                                            }}
                                        >
                                            <i className="fa-brands fa-supportnow"></i>{" "}
                                            {d.name} –{" "}
                                            {Number(d.total).toFixed(2)} €
                                        </li>
                                    ))}
                                </ol>
                            ) : (
                                <p>No donations yet.</p>
                            )}
                            <div
                                className="modal-buttons"
                                style={{ marginTop: "20px" }}
                            >
                                <button
                                    className="modal-cancel-btn"
                                    onClick={() => setShowTopDonations(false)}
                                >
                                    Close
                                </button>
                            </div>
                        </div>
                    </div>,
                    document.body,
                )}
            {lightbox !== null &&
                createPortal(
                    <div
                        className="modal-overlay"
                        onClick={closeLightbox}
                        style={{ background: "rgba(0,0,0,0.9)" }}
                    >
                        <div
                            onClick={(e) => e.stopPropagation()}
                            style={{
                                position: "relative",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                maxWidth: "90vw",
                                maxHeight: "90vh",
                            }}
                        >
                            {/* Uždarymo mygtukas */}
                            <button
                                onClick={closeLightbox}
                                style={{
                                    position: "absolute",
                                    top: "-40px",
                                    right: "0",
                                    background: "none",
                                    border: "none",
                                    color: "white",
                                    fontSize: "32px",
                                    cursor: "pointer",
                                }}
                            >
                                ✕
                            </button>

                            {/* Kairė rodyklė */}
                            {allPhotos.length > 1 && (
                                <button
                                    onClick={prevPhoto}
                                    style={{
                                        position: "absolute",
                                        left: "-60px",
                                        background: "none",
                                        border: "none",
                                        color: "white",
                                        fontSize: "48px",
                                        cursor: "pointer",
                                    }}
                                >
                                    ‹
                                </button>
                            )}

                            {/* Nuotrauka */}
                            <img
                                src={`/storage/${allPhotos[lightbox]}`}
                                alt="lightbox"
                                style={{
                                    maxWidth: "90vw",
                                    maxHeight: "85vh",
                                    borderRadius: "8px",
                                    objectFit: "contain",
                                    border: "none",
                                    margin: 0,
                                }}
                            />

                            {/* Dešinė rodyklė */}
                            {allPhotos.length > 1 && (
                                <button
                                    onClick={nextPhoto}
                                    style={{
                                        position: "absolute",
                                        right: "-60px",
                                        background: "none",
                                        border: "none",
                                        color: "white",
                                        fontSize: "48px",
                                        cursor: "pointer",
                                    }}
                                >
                                    ›
                                </button>
                            )}

                            {/* Skaitliukas */}
                            <div
                                style={{
                                    position: "absolute",
                                    bottom: "-35px",
                                    color: "white",
                                    fontSize: "14px",
                                }}
                            >
                                {lightbox + 1} / {allPhotos.length}
                            </div>
                        </div>
                    </div>,
                    document.body,
                )}
        </tr>
    );
}
