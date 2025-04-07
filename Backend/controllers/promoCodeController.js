import { PromoCode } from "../models/promoCodeModel.js";

// Create new promo code
export const createPromoCode = async (req, res) => {
  try {
    const promo = await PromoCode.create(req.body);
    res.status(201).json({ success: true, message: "Promo code created", promo });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// (Optional) Get all promo codes
export const getPromoCodes = async (req, res) => {
  const promos = await PromoCode.find().sort({ createdAt: -1 });
  res.json({ success: true, promos });
};

export const validatePromoCode = async (req, res) => {
  const { code, totalAmount } = req.body;
  try {
    const promo = await PromoCode.findOne({ code, isActive: true });

    if (!promo) return res.status(400).json({ success: false, message: "Invalid promo code" });

    const now = new Date();
    if (promo.expiryDate < now) return res.status(400).json({ success: false, message: "Promo code expired" });

    if (totalAmount < promo.minOrderAmount) {
      return res.status(400).json({ success: false, message: `Minimum order should be ₹${promo.minOrderAmount}` });
    }

    let discount = 0;
    if (promo.discountType === "percentage") {
      discount = (promo.discountValue / 100) * totalAmount;
      if (promo.maxDiscountAmount && discount > promo.maxDiscountAmount) {
        discount = promo.maxDiscountAmount;
      }
    } else {
      discount = promo.discountValue;
    }

    return res.json({ success: true, discount, message: "Promo code applied successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// Delete promo code by ID
export const deletePromoCode = async (req, res) => {
  try {
    const { id } = req.params;

    const promo = await PromoCode.findByIdAndDelete(id);

    if (!promo) {
      return res.status(404).json({ success: false, message: "Promo code not found" });
    }

    res.json({ success: true, message: "Promo code deleted successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// Toggle active status
export const togglePromoStatus = async (req, res) => {
  const { id } = req.params;
  try {
    const promo = await PromoCode.findById(id);
    if (!promo) return res.status(404).json({ message: "Promo code not found" });

    promo.isActive = !promo.isActive;
    await promo.save();
    res.status(200).json({ message: "Promo code status updated", promo });
  } catch (err) {
    res.status(500).json({ message: "Failed to toggle promo status" });
  }
};