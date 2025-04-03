import express from 'express';
import { loginAdmin, registerAdmin, changeAdminPassword, getAdminProfile, updateAdminProfile } from '../controllers/adminController.js';
import authMiddleware from '../middleware/adminAuthMiddleware.js';

const router = express.Router();

router.post('/login', loginAdmin);
router.post('/register', registerAdmin);
router.post('/change-password', authMiddleware, changeAdminPassword);
router.get('/profile', authMiddleware, getAdminProfile);
router.put('/profile', authMiddleware, updateAdminProfile);

export default router;
