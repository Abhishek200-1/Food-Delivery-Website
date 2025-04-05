import express from "express";
import { loginAdmin, registerAdmin, getAdminProfile, changeAdminPassword } from "../controllers/adminController.js";
import authMiddleware from "../middleware/adminAuthMiddleware.js";


const router = express.Router();

router.post("/register", registerAdmin);
router.post("/login", loginAdmin);
router.get("/profile", authMiddleware, getAdminProfile);
router.post("/change-password", authMiddleware, changeAdminPassword);

export default router;
