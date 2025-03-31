import Feedback from "../models/feedbackModel.js";

// Submit Feedback
export const submitFeedback = async (req, res) => {
    try {
        const { orderId, rating, comment } = req.body;

        // Validate input fields
        if (!orderId || !rating || !comment) {
            return res.status(400).json({ message: "All fields are required." });
        }

        // Create a new feedback entry
        const feedback = new Feedback({ orderId, rating, comment });
        await feedback.save();

        res.status(201).json({ message: "Feedback submitted successfully!", feedback });
    } catch (error) {
        console.error("Submit Feedback Error:", error);
        res.status(500).json({ message: "Error submitting feedback" });
    }
};

// Get Feedback by Order ID
export const getFeedbackByOrderId = async (req, res) => {
    try {
        const { orderId } = req.params;

        // Find feedback for the given order ID
        const feedback = await Feedback.find({ orderId });

        if (!feedback.length) {
            return res.status(404).json({ message: "No feedback found for this order." });
        }

        res.status(200).json(feedback);
    } catch (error) {
        console.error("Get Feedback Error:", error);
        res.status(500).json({ message: "Error fetching feedback" });
    }
};

// Get All Feedbacks
export const getAllFeedbacks = async (req, res) => {
    try {
        // Fetch all feedback entries from the database
        const feedbacks = await Feedback.find();

        res.status(200).json(feedbacks);
    } catch (error) {
        console.error("Get All Feedbacks Error:", error);
        res.status(500).json({ message: "Error fetching all feedbacks" });
    }
};
