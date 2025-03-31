import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import "./Feedback.css";

const Feedback = () => {
    const { orderId } = useParams();
    const navigate = useNavigate();

    const [rating, setRating] = useState(0);
    const [comment, setComment] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleSubmit = async () => {
        if (!rating || !comment) {
            alert("Please provide both rating and comment.");
            return;
        }
    
        setLoading(true);
        setError("");
    
        try {
            const token = localStorage.getItem("token"); // Get JWT token from storage
            const response = await axios.post("http://localhost:3000/api/feedback", {
                orderId,
                rating,
                comment,
            }, {
                headers: {
                    Authorization: `Bearer ${token}`, // Attach token to request
                },
            });
    
            if (response.status === 201) {
                alert("Feedback submitted successfully!");
                navigate("/");
            } else {
                setError("Failed to submit feedback. Please try again.");
            }
        } catch (err) {
            setError("Error submitting feedback. Check your internet connection.");
            console.error("API Error:", err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="feedback-container">
            <h2>Give Feedback</h2>
            <p><b>Order ID:</b> {orderId}</p>

            <label>Rating:</label>
            <input
                type="range"
                min="1"
                max="5"
                value={rating}
                onChange={(e) => setRating(e.target.value)}
                className="slider"
            />
            <p>Rating: {rating} ⭐</p>

            <label>Comment:</label>
            <textarea
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="Write your feedback..."
            ></textarea>

            {error && <p className="error-message">{error}</p>}

            <button onClick={handleSubmit} disabled={loading}>
                {loading ? "Submitting..." : "Submit Feedback"}
            </button>
            <button onClick={() => navigate("/")}>Cancel</button>
        </div>
    );
};

export default Feedback;