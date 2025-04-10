import express from "express";
import { loginAdmin, registerAdmin, getAdminProfile, changeAdminPassword, updateProfile } from "../controllers/adminController.js";
import authMiddleware from "../middleware/adminAuthMiddleware.js";


const router = express.Router();

router.post("/register", registerAdmin);
router.post("/login", loginAdmin);
router.get("/profile", authMiddleware, getAdminProfile);
router.put('/profile', authMiddleware, updateProfile);
router.post("/change-password", authMiddleware, changeAdminPassword);

export default router;
