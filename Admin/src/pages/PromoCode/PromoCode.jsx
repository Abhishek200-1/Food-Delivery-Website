import React, { useState } from "react";
import axios from "axios";
import "./PromoCode.css";

const PromoCodeForm = () => {
  const [form, setForm] = useState({
    code: "",
    discountType: "percentage",
    discountValue: "",
    minOrderAmount: "",
    maxDiscountAmount: "",
    expiryDate: "",
    usageLimit: 1,
    isActive: true,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:3000/api/promocodes/create", form);
      alert("Promo code created successfully!");
    } catch (error) {
      alert(error.response?.data?.message || "Failed to create promo code.");
    }
  };

  return (
    <form className="promo-form" onSubmit={handleSubmit}>
      <h2>Create Promo Code</h2>

      <div className="form-group">
        <label htmlFor="code">Promo Code</label>
        <input
          id="code"
          name="code"
          placeholder="Enter promo code"
          value={form.code}
          onChange={handleChange}
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="discountType">Discount Type</label>
        <select
          id="discountType"
          name="discountType"
          value={form.discountType}
          onChange={handleChange}
        >
          <option value="percentage">Percentage</option>
          <option value="fixed">Fixed</option>
        </select>
      </div>

      <div className="input-row">
        <div className="form-group">
          <label htmlFor="discountValue">Discount Value</label>
          <input
            id="discountValue"
            name="discountValue"
            type="number"
            placeholder="e.g. 20"
            value={form.discountValue}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="minOrderAmount">Min Order Amount</label>
          <input
            id="minOrderAmount"
            name="minOrderAmount"
            type="number"
            placeholder="e.g. 200"
            value={form.minOrderAmount}
            onChange={handleChange}
          />
        </div>
      </div>

      <div className="input-row">
        <div className="form-group">
          <label htmlFor="maxDiscountAmount">Max Discount Amount</label>
          <input
            id="maxDiscountAmount"
            name="maxDiscountAmount"
            type="number"
            placeholder="e.g. 100"
            value={form.maxDiscountAmount}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label htmlFor="usageLimit">Usage Limit</label>
          <input
            id="usageLimit"
            name="usageLimit"
            type="number"
            placeholder="e.g. 5"
            value={form.usageLimit}
            onChange={handleChange}
          />
        </div>
      </div>

      <div className="form-group">
        <label htmlFor="expiryDate">Expiry Date</label>
        <input
          id="expiryDate"
          name="expiryDate"
          type="date"
          value={form.expiryDate}
          onChange={handleChange}
          required
        />
      </div>

      <div className="form-group checkbox-group">
        <input
          id="isActive"
          name="isActive"
          type="checkbox"
          checked={form.isActive}
          onChange={handleChange}
        />
        <label htmlFor="isActive">Active</label>
      </div>

      <button type="submit">Create</button>
    </form>
  );
};

export default PromoCodeForm;
