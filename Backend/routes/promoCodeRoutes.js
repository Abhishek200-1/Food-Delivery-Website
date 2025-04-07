import express from "express";
import { createPromoCode, getPromoCodes, validatePromoCode, deletePromoCode, togglePromoStatus } from "../controllers/promoCodeController.js";

const router = express.Router();

router.post("/create", createPromoCode);
router.get("/", getPromoCodes);
router.post("/validate", validatePromoCode);
router.delete("/:id", deletePromoCode);
router.put("/:id/toggle", togglePromoStatus);


export default router;
