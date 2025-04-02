// routes/adminRoute.js
import express from 'express';
import { loginAdmin, registerAdmin } from '../controllers/adminController.js'; // Add registerAdmin function import

const router = express.Router();

// POST /login for login
router.post('/login', loginAdmin);

// POST /register for registration (ensure this route exists)
router.post('/register', registerAdmin);

export default router;
