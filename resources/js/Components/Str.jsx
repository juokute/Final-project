export default function Str({
    str,
    handleChange,
    handleFileChange,
    handlePhotosChange,
    errors,
    selectedTags,
    setSelectedTags,
    newTag,
    setNewTag,
    allTags,
}) {
    return (
        // <div className="kvadratas" style={{
        //     backgroundColor: sq.color + '77',
        //     borderColor: sq.color
        // }}>{sq.number}</div>

        <div className="new-story-container-str">
            <div className="new-story-title">
                <label>Story Title</label>
                <input
                    type="text"
                    name="title"
                    value={str.title}
                    onChange={handleChange}
                    className={errors.title ? "input-error" : ""}
                    placeholder="Your Story Title..."
                />
                {errors.title && <div className="error">{errors.title}</div>}
            </div>
            <div className="new-story-text">
                <label>Story Summary</label>
                <textarea
                    name="text"
                    value={str.text}
                    onChange={handleChange}
                    className={errors.text ? "input-error" : ""}
                    placeholder="Your Story..."
                />
                {errors.text && <div className="error">{errors.text}</div>}
            </div>
            <div className="new-story-main-photo">
                <label>Main Photo</label>
                <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    className={errors.title_photo ? "input-error" : ""}
                />
                {errors.title_photo && (
                    <div className="error">{errors.title_photo}</div>
                )}
                {str.title_photo && typeof str.title_photo === "object" ? (
                    <img src={URL.createObjectURL(str.title_photo)} />
                ) : (
                    str.title_photo && (
                        <img src={`/storage/${str.title_photo}`} />
                    )
                )}
            </div>
            <div className="new-story-photo">
                <label>Photos</label>
                <input
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={handlePhotosChange}
                />
                {str.photos?.map((photo, i) => (
                    <img key={i} src={URL.createObjectURL(photo)} />
                ))}
            </div>
            <div className="new-story-hash-tag">
                {/* <label>#hash-tag</label> */}

                {/* TAG BUTTONS */}
                <div
                    style={{
                        marginTop: "10px",
                        display: "flex",
                        flexWrap: "wrap",
                        gap: "8px",
                    }}
                >
                    {allTags?.map((tag) => {
                        const isSelected = selectedTags.includes(tag);

                        return (
                            <button
                                key={tag}
                                type="button"
                                onClick={() => {
                                    if (isSelected) {
                                        setSelectedTags(
                                            selectedTags.filter(
                                                (t) => t !== tag,
                                            ),
                                        );
                                    } else {
                                        setSelectedTags([...selectedTags, tag]);
                                    }
                                }}
                                style={{
                                    padding: "6px 12px",
                                    borderRadius: "10px",
                                    fontSize: "14px",
                                    border: "1px solid #ccc",
                                    cursor: "pointer",
                                    background: isSelected
                                        ? "#6366f1"
                                        : "#bcbdc0",
                                    color: isSelected ? "#fff" : "#000",
                                }}
                            >
                                #{tag}
                            </button>
                        );
                    })}
                </div>

                {/* ERROR */}
                {errors.hash_tags && (
                    <div className="error">{errors.hash_tags}</div>
                )}

                {/* ADD NEW TAG */}
                <div style={{ display: "flex", gap: "8px", height: "45px" }}>
                    <input
                        type="text"
                        placeholder="Add new tag..."
                        value={newTag}
                        onChange={(e) => setNewTag(e.target.value)}
                    />

                    <button
                        className="btn new-story-button-save add-btn"
                        type="button"
                        onClick={() => {
                            if (newTag && !selectedTags.includes(newTag)) {
                                setSelectedTags([...selectedTags, newTag]);
                                setNewTag("");
                            }
                        }}
                    >
                        Add
                    </button>
                </div>

                {/* SELECTED TAGS PREVIEW */}
                <div style={{ marginTop: "10px" }}>
                    {selectedTags.map((tag) => (
                        <span key={tag} style={{ marginRight: "8px" }}>
                            #{tag}
                        </span>
                    ))}
                </div>
            </div>
            <div className="new-story-amount">
                <label>Target Amount €</label>
                <input
                    type="number"
                    name="required_amount"
                    value={str.required_amount}
                    onChange={handleChange}
                    className={errors.required_amount ? "input-error" : ""}
                    placeholder="Enter amount..."
                />
                {errors.required_amount && (
                    <div className="error">{errors.required_amount}</div>
                )}
            </div>
        </div>
    );
}
