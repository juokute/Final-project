import { useRef } from "react";

export default function Str({
    str,
    setStr,
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
    const fileInputRef = useRef(null);

    return (


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
                    ref={fileInputRef}
                    className={errors.title_photo ? "input-error" : ""}
                />
                {errors.title_photo && (
                    <div className="error">{errors.title_photo}</div>
                )}
                {str.title_photo && (
                    <div>
                        <img
                            className="x-img"
                            src={
                                str.title_photo instanceof File
                                    ? URL.createObjectURL(str.title_photo)
                                    : `/storage/${str.title_photo}`
                            }
                        />

                        <button
                            className="x-button"
                            type="button"
                            onClick={() => {
                                setStr((prev) => ({
                                    ...prev,
                                    title_photo: null,
                                }));

                                if (fileInputRef.current) {
                                    fileInputRef.current.value = null;
                                }
                            }}
                        >
                            X
                        </button>
                    </div>
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
                <div>
                    {str.photos?.map((photo, i) => {
                        if (!photo) return null;

                        const src =
                            typeof photo === "string"
                                ? `/storage/${photo}`
                                : URL.createObjectURL(photo);

                        return (
                            <div key={i} className="photo-wrapper">
                                <img src={src} />

                                <button
                                    className="x-button"
                                    type="button"
                                    onClick={() => {
                                        setStr((prev) => ({
                                            ...prev,
                                            photos: prev.photos.filter(
                                                (_, index) => index !== i,
                                            ),
                                        }));
                                    }}
                                >
                                    X
                                </button>
                            </div>
                        );
                    })}
                </div>
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
                        <div key={tag} className="tag-item">
                            <span>#{tag}</span>

                            <button
                                type="button"
                                className="x-button"
                                onClick={() =>
                                    setSelectedTags(
                                        selectedTags.filter((t) => t !== tag),
                                    )
                                }
                            >
                                X
                            </button>
                        </div>
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
