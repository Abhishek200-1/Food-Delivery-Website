import express from "express";
import { createPromoCode, getPromoCodes, validatePromoCode } from "../controllers/promoCodeController.js";

const router = express.Router();

router.post("/create", createPromoCode);
router.get("/", getPromoCodes);
router.post("/validate", validatePromoCode);


export default router;
