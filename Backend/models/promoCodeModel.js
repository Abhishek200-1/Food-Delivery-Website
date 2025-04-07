import mongoose from "mongoose";

const promoCodeSchema = new mongoose.Schema({
  code: { type: String, required: true, unique: true },
  discountType: { type: String, enum: ["percentage", "fixed"], required: true },
  discountValue: { type: Number, required: true },
  minOrderAmount: { type: Number },
  maxDiscountAmount: { type: Number },
  expiryDate: { type: Date, required: true },
  usageLimit: { type: Number, default: 1 },
  isActive: { type: Boolean, default: true },
}, { timestamps: true });

export const PromoCode = mongoose.model("PromoCode", promoCodeSchema);
