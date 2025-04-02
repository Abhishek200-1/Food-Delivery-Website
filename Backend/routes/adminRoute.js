// routes/adminRoute.js
import express from 'express';
import { loginAdmin, registerAdmin, changeAdminPassword } from '../controllers/adminController.js'; // Add registerAdmin function import
import authMiddleware from '../middleware/adminAuthMiddleware.js';

const router = express.Router();

router.post('/login', loginAdmin);
router.post('/register', registerAdmin);
router.post('/change-password', authMiddleware, changeAdminPassword);

export default router;
