import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js";
import Stripe from "stripe";


const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// Define frontend URL
const frontend_url = "http://localhost:5173";

// Function to place an order
const placeOrder = async (req, res) => {
    try {
        // Create new order in database
        const newOrder = new orderModel({
            userId: req.body.userId,
            items: req.body.items,
            amount: req.body.amount,
            address: req.body.address
        });
        await newOrder.save();

        // Clear user's cart after order placement
        await userModel.findByIdAndUpdate(req.body.userId, { cartData: {} });

        // Convert price to paisa (Stripe uses the smallest currency unit)
        const line_items = req.body.items.map((item) => ({
            price_data: {
                currency: "inr",
                product_data: {
                    name: item.name
                },
                unit_amount: item.price * 100 // Convert INR to paisa
            },
            quantity: item.quantity
        }));

        // Add delivery charges (15 INR)
        line_items.push({
            price_data: {
                currency: "inr",
                product_data: {
                    name: "Delivery Charges"
                },
                unit_amount: 15 * 100 // Convert INR 15 to paisa
            },
            quantity: 1
        });

        // Create Stripe checkout session
        const session = await stripe.checkout.sessions.create({
            line_items: line_items,
            mode: "payment",
            success_url: `${frontend_url}/verify?success=true&orderId=${newOrder._id}`,
            cancel_url: `${frontend_url}/verify?success=false&orderId=${newOrder._id}`
        });

        res.json({ success: true, session_url: session.url });
    } catch (error) {
        console.error("Stripe Payment Error:", error);
        res.status(500).json({ success: false, message: "Payment failed" });
    }
};

// Function to verify order after payment
const verifyOrder = async (req, res) => {
    const { orderId, success } = req.body;
    try {
        if (success === "true") {
            await orderModel.findByIdAndUpdate(orderId, { payment: true });
            res.json({ success: true, message: "Payment Successful" });
        } else {
            await orderModel.findByIdAndDelete(orderId);
            res.json({ success: false, message: "Payment Failed, Order Removed" });
        }
    } catch (error) {
        console.error("Order Verification Error:", error);
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
};

// Function to get all orders of a user
const userOrders = async (req, res) => {
    try {
        const orders = await orderModel.find({ userId: req.body.userId });
        res.json({ success: true, data: orders });
    } catch (error) {
        console.error("Fetching User Orders Error:", error);
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
};

// Function to list all orders (Admin Panel)
const listOrders = async (req, res) => {
    try {
        const orders = await orderModel.find({});
        res.json({ success: true, data: orders });
    } catch (error) {
        console.error("Fetching Orders for Admin Error:", error);
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
};

// Function to update order status
const updateStatus = async (req, res) => {
    try {
        await orderModel.findByIdAndUpdate(req.body.orderId, { status: req.body.status });
        res.json({ success: true, message: "Status Updated Successfully" });
    } catch (error) {
        console.error("Updating Order Status Error:", error);
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
};

// Function to get daily sales data (Admin Panel)
const getDailySales = async (req, res) => {
    const { from, to } = req.query;
  
    const matchQuery = { payment: true }; // Only paid orders
  
    if (from && to) {
      matchQuery.createdAt = {
        $gte: new Date(from),
        $lte: new Date(new Date(to).setHours(23, 59, 59, 999))
      };
    }
  
    try {
      const orders = await orderModel.find(matchQuery).sort({ createdAt: -1 });
  
      const response = orders.map(order => ({
        orderId: order._id,
        date: order.createdAt.toISOString().split('T')[0],
        amount: order.amount,
        // Add more fields if needed like userName, items, etc.
      }));
  
      res.json({ success: true, data: response });
    } catch (error) {
      console.error("Order Fetch Error:", error);
      res.status(500).json({ success: false, message: "Failed to fetch order data" });
    }
  };
  
  

export { placeOrder, verifyOrder, userOrders, listOrders, updateStatus, getDailySales };
