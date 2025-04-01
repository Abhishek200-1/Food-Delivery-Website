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

// Activate Feedback
export const activateFeedback = async (req, res) => {
    try {
      const { id } = req.params;
      
      // Find the feedback by ID and update the status
      const feedback = await Feedback.findByIdAndUpdate(id, { active: true }, { new: true });
  
      if (!feedback) {
        return res.status(404).json({ message: "Feedback not found." });
      }
  
      res.status(200).json(feedback);
    } catch (error) {
      console.error("Activate Feedback Error:", error);
      res.status(500).json({ message: "Error activating feedback" });
    }
  };
 
// Deactivate Feedback
export const deactivateFeedback = async (req, res) => {
    try {
        const { id } = req.params;

        const feedback = await Feedback.findById(id);
        if (!feedback) {
            return res.status(404).json({ message: "Feedback not found" });
        }

        feedback.active = false;
        await feedback.save();

        res.status(200).json({ message: "Feedback marked as inactive", feedback });
    } catch (error) {
        console.error("Error deactivating feedback:", error);
        res.status(500).json({ message: "Error deactivating feedback" });
    }
};

export const deleteFeedback = async (req, res) => {
    try {
        const { id } = req.params;

        // Find and delete the feedback by ID
        const feedback = await Feedback.findByIdAndDelete(id);
        if (!feedback) {
            return res.status(404).json({ message: "Feedback not found" });
        }

        res.status(200).json({ message: "Feedback deleted successfully", feedback });
    } catch (error) {
        console.error("Delete Feedback Error:", error);
        res.status(500).json({ message: "Error deleting feedback" });
    }
};

