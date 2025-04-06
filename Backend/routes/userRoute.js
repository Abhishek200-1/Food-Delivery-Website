import express from 'express';
import { loginUser, registerUser, getUserProfile, updateUserProfile } from '../controllers/userController.js';
import authMiddlerware from '../middleware/auth.js'

const userRouter = express.Router();

userRouter.post("/register", registerUser);
userRouter.post("/login", loginUser);
userRouter.get("/profile", authMiddlerware, getUserProfile);
userRouter.put("/update", authMiddlerware, updateUserProfile);


export default userRouter;
