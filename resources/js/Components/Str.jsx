export default function Str({
    str,
    handleChange,
    handleFileChange,
    handlePhotosChange,
    errors,
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
                {str.title_photo && (
                    <img src={URL.createObjectURL(str.title_photo)} />
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
                <label>#hash-tag</label>
                <input
                    name="hash_tag"
                    type="text"
                    value={str.hash_tag}
                    onChange={handleChange}
                    className={errors.hash_tag ? "input-error" : ""}
                    placeholder="List the keywords..."
                />
                {errors.hash_tag && (
                    <div className="error">{errors.hash_tag}</div>
                )}
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
