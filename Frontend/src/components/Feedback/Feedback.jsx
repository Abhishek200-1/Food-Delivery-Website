import React, { useContext, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import "./Feedback.css";

const Feedback = () => {
    const { orderId } = useParams();
    const navigate = useNavigate();

    const [rating, setRating] = useState("");
    const [comment, setComment] = useState("");

    const handleSubmit = () => {
        if (!rating || !comment) {
            alert("Please provide both rating and comment.");
            return;
        }

        submitFeedback(orderId, user?.email, rating, comment);
        navigate("/"); // Redirect back to orders page
    };

    return (
        <div className="feedback-container">
            <h2>Give Feedback</h2>
            <p><b>Order ID:</b> {orderId}</p>

            <label>Rating:</label>
            <select value={rating} onChange={(e) => setRating(e.target.value)}>
                <option value="">Select Rating</option>
                <option value="1">⭐ 1</option>
                <option value="2">⭐⭐ 2</option>
                <option value="3">⭐⭐⭐ 3</option>
                <option value="4">⭐⭐⭐⭐ 4</option>
                <option value="5">⭐⭐⭐⭐⭐ 5</option>
            </select>

            <label>Comment:</label>
            <textarea
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="Write your feedback..."
            ></textarea>

            <button onClick={handleSubmit}>Submit Feedback</button>
            <button onClick={() => navigate("/")}>Cancel</button>
        </div>
    );
};

export default Feedback;
