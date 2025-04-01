import express from "express";
import { submitFeedback, getFeedbackByOrderId, getAllFeedbacks, activateFeedback, deactivateFeedback } from "../controllers/feedbackController.js";

const feedbackRouter = express.Router();

feedbackRouter.post("/", submitFeedback);
feedbackRouter.get("/:orderId", getFeedbackByOrderId);
feedbackRouter.get("/", getAllFeedbacks);
feedbackRouter.put("/:id/activate", activateFeedback);
feedbackRouter.put("/:id/deactivate", deactivateFeedback);


export default feedbackRouter;
