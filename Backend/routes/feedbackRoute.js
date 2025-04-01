import express from "express";
import { submitFeedback, getFeedbackByOrderId, getAllFeedbacks, activateFeedback, deactivateFeedback, deleteFeedback } from "../controllers/feedbackController.js";

const feedbackRouter = express.Router();

feedbackRouter.post("/", submitFeedback);
feedbackRouter.get("/:orderId", getFeedbackByOrderId);
feedbackRouter.get("/", getAllFeedbacks);
feedbackRouter.put("/:id/activate", activateFeedback);
feedbackRouter.put("/:id/deactivate", deactivateFeedback);
feedbackRouter.delete("/:id", deleteFeedback);

export default feedbackRouter;
