import mongoose from "mongoose";

const feedbackSchema = new mongoose.Schema({
    orderId: {
        type: String,
        required: true,
    },
    rating: {
        type: Number,
        required: true,
        min: 1,
        max: 5,
    },
    comment: {
        type: String,
        required: true,
    },
    active: {
        type: Boolean,
        default: false,  // default to false if not provided
      },
}, { timestamps: true });

const Feedback = mongoose.model("Feedback", feedbackSchema);
export default Feedback;
