import mongoose from "mongoose";

const foodSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    image: { type: String, required: true },
    category: { type: String, required: true }
}, { timestamps: true });  // Adds createdAt and updatedAt fields automatically



// agar model h toh usse use krega or agar nahi h toh usse wapsh create krega.
const foodModel = mongoose.models.food || mongoose.model("food", foodSchema);



// exporting foodmodel
export default foodModel;
