import express from "express";
import { submitFeedback, getFeedbackByOrderId, getAllFeedbacks } from "../controllers/feedbackController.js";

const feedbackRouter = express.Router();

feedbackRouter.post("/", submitFeedback);
feedbackRouter.get("/:orderId", getFeedbackByOrderId);
feedbackRouter.get("/", getAllFeedbacks);

export default feedbackRouter;
