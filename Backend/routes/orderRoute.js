import express from 'express'
import authMiddlerware from '../middleware/auth.js'
import { placeOrder, verifyOrder, userOrders, listOrders, updateStatus, getDailySales } from '../controllers/orderController.js';
// import { verify } from 'jsonwebtoken';



const orderRouter = express.Router()

orderRouter.post("/place", authMiddlerware, placeOrder);
orderRouter.post("/verify", verifyOrder)
orderRouter.post("/userorders", authMiddlerware, userOrders)
orderRouter.get("/list", listOrders);
orderRouter.post("/status", updateStatus);
orderRouter.get("/daily-sales", getDailySales);




export default orderRouter;