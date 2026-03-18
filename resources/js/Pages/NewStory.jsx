import "../../css/entry.css";

export default function NewStory() {
    return (
        <>
            <h1 className="new-story-h1">Creat Your Story!</h1>

            <div className="new-story-container">
                <div className="new-story-title">
                    <label>Story Title</label>
                    <input type="text" placeholder="Your Story Title..." />
                </div>
                <div className="new-story-text">
                    <label>Story Summary</label>
                    <textarea type="text" placeholder="Your Story..." />
                </div>
                <div className="new-story-main-photo">
                    <label>Main Photo</label>
                    <input type="file" accept="image/*" />
                    <img></img>
                </div>
                <div className="new-story-photo">
                    <label>Photos</label>
                    <input type="file" accept="image/*" />
                    <img></img>
                </div>
                <div className="new-story-hash-tag">
                    <label>#hash-tag</label>
                    <input
                        type="text"
                        placeholder="List the keywords..."
                    />
                </div>
                <div className="new-story-amount">
                    <label>Target Amount</label>
                    <input
                        type="number"
                        placeholder="Enter amount..."
                    />
                </div>
            </div>
        </>
    );
}
