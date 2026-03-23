export default function StoryCard({
    story,
    showActions = true,
    onPreview,
    onEdit,
    onDelete,
    onBack,
}) {
    const percent = 40;

    return (
        <tr>
            <td className="gallery-container">
                <div
                    style={{
                        display: "flex",
                        justifyContent: "center",
                        // alignContent: "center",
                        gap: "10px",
                    }}
                >
                    {onBack && (
                        <button
                            className="back-btn"
                            onClick={onBack}
                            style={{ padding: "5px 5px", border: "1px solid #393b83d3", borderRadius: "7px" }}
                        >
                            <i className="fa-solid fa-arrow-left"></i>
                        </button>
                    )}

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
                        <div className="more">+{story.photos.length - 4}</div>
                    )}
                </div>

                <div className="stories-td">{story.text}</div>
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
                            {(story.required_amount * 0.4).toFixed(2)} € raised
                        </div>
                        <div className="required-amount">
                            of {story.required_amount} €
                        </div>
                    </div>
                </div>

                <div className="donate-react-buttons">
                    <button className="btn new-story-button-save btn-list like-btn">
                        <i className="fa-solid fa-heart-circle-plus"></i> React
                    </button>

                    <button className="btn new-story-button-save btn-list donate-btn">
                        Donate
                    </button>
                </div>

                <ol className="donations-container">
                    <h3 className="recent-donations">
                        <i className="fa-solid fa-chart-line"></i> Recent
                        donations
                    </h3>
                    <li>
                        <i className="fa-brands fa-supportnow"></i> Jonas –
                        50,00 €
                    </li>
                    <li>
                        <i className="fa-brands fa-supportnow"></i> Ona – 20,00
                        €
                    </li>
                    <li>
                        <i className="fa-brands fa-supportnow"></i> Petras –
                        100,00 €
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

                {/* 🔥 Tik šita dalis yra valdoma */}
                {showActions && (
                    <div className="action-buttons">
                        <button
                            className="btn new-story-button-save edit-btn"
                            onClick={() => onEdit(story)}
                        >
                            Edit
                        </button>

                        <button
                            className="btn new-story-button-save preview-btn"
                            onClick={() => onPreview(story)}
                        >
                            Preview
                        </button>

                        <button
                            className="btn new-story-button-save delete-btn"
                            onClick={() => onDelete(story.id)}
                        >
                            Delete
                        </button>
                    </div>
                )}
            </td>
        </tr>
    );
}
