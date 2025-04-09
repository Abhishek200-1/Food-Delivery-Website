import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
    userId: { type: String, required: true },
    items: { type: Array, required: true },
    amount: { type: Number, required: true },
    address: { type: Object, required: true },
    status: { type: String, default: "Food Processing" },
    date: { type: Date, default: Date.now }, 
    payment: { type: Boolean, default: false }
},{
    timestamps: true // ✅ this adds createdAt and updatedAt automatically
  });

// If model already exists, use it; otherwise, create a new one
const orderModel = mongoose.models.order || mongoose.model("order", orderSchema);

// Exporting order model
export default orderModel;
