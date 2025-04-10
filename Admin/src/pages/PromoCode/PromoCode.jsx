import React, { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";
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

  const [promoCodes, setPromoCodes] = useState([]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const fetchPromoCodes = async () => {
    try {
      const res = await axios.get("http://localhost:3000/api/promocodes");
      setPromoCodes(res.data.promos || []);
    } catch (err) {
      console.error("Error fetching promo codes:", err.message);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:3000/api/promocodes/create", form);
      Swal.fire("Success", "Promo code created successfully!", "success");
      setForm({
        code: "",
        discountType: "percentage",
        discountValue: "",
        minOrderAmount: "",
        maxDiscountAmount: "",
        expiryDate: "",
        usageLimit: 1,
        isActive: true,
      });
      fetchPromoCodes();
    } catch (error) {
      Swal.fire("Error", error.response?.data?.message || "Failed to create promo code.", "error");
    }
  };

  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
    });

    if (result.isConfirmed) {
      try {
        await axios.delete(`http://localhost:3000/api/promocodes/${id}`);
        fetchPromoCodes();
        Swal.fire("Deleted!", "Promo code has been deleted.", "success");
      } catch (err) {
        Swal.fire("Error", "Error deleting promo code.", "error");
      }
    }
  };

  const handleToggleStatus = async (id, currentStatus) => {
    try {
      await axios.put(`http://localhost:3000/api/promocodes/${id}/toggle`);
      fetchPromoCodes();
  
      if (!currentStatus) {
        // Was inactive, now activated
        Swal.fire({
          title: "Activated!",
          text: "Promo code is now Active.",
          icon: "success",
          confirmButtonColor: "#28a745", // Green
        });
      } else {
        // Was active, now inactivated
        Swal.fire({
          title: "Inactivated!",
          text: "Promo code is now Inactive.",
          icon: "warning",
          confirmButtonColor: "#dc3545", // Red
        });
      }
    } catch (err) {
      Swal.fire("Error", "Failed to update promo code status.", "error");
    }
  };

  useEffect(() => {
    fetchPromoCodes();
  }, []);

  return (
    <div className="promo-container">
      <div className="promo-wrapper" style={{ display: "flex", gap: "30px" }}>
        {/* Promo Form */}
        <form className="promo-form" onSubmit={handleSubmit}>
          <h2>Create Promo Code</h2>

          <div className="form-group">
            <label>Promo Code</label>
            <input
              name="code"
              value={form.code}
              onChange={handleChange}
              required
              placeholder="e.g. SAVE10"
            />
          </div>

          <div className="form-group">
            <label>Discount Type</label>
            <select name="discountType" value={form.discountType} onChange={handleChange}>
              <option value="percentage">Percentage</option>
              {/* <option value="fixed">Fixed</option> */}
            </select>
          </div>

          <div className="input-row">
            <div className="form-group">
              <label>Discount Value</label>
              <input
                name="discountValue"
                type="number"
                value={form.discountValue}
                onChange={handleChange}
                required
                placeholder="e.g. 10 (10% or ₹10)"
              />
            </div>

            <div className="form-group">
              <label>Min Order Amount</label>
              <input
                name="minOrderAmount"
                type="number"
                value={form.minOrderAmount}
                onChange={handleChange}
                placeholder="e.g. 500"
              />
            </div>
          </div>

          <div className="input-row">
            <div className="form-group">
              <label>Max Discount Amount</label>
              <input
                name="maxDiscountAmount"
                type="number"
                value={form.maxDiscountAmount}
                onChange={handleChange}
                placeholder="e.g. 100"
              />
            </div>

            <div className="form-group">
              <label>Usage Limit</label>
              <input
                name="usageLimit"
                type="number"
                value={form.usageLimit}
                onChange={handleChange}
                placeholder="e.g. 1"
              />
            </div>
          </div>

          <div className="form-group">
            <label>Expiry Date</label>
            <input
              name="expiryDate"
              type="date"
              value={form.expiryDate}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group checkbox-group">
            <input
              name="isActive"
              type="checkbox"
              checked={form.isActive}
              onChange={handleChange}
            />
            <label>Active</label>
          </div>

          <button type="submit">Create</button>
        </form>

        {/* Promo List */}
        <div className="promo-list">
          <h3>All Promo Codes</h3>
          {promoCodes.length === 0 ? (
            <p>No promo codes available.</p>
          ) : (
            <ul>
              {promoCodes.map((promo) => (
                <li key={promo._id} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: "10px", marginBottom: "10px" }}>
                  <div>
                    <strong>{promo.code}</strong> -{" "}
                    {promo.discountType === "percentage"
                      ? `${promo.discountValue}%`
                      : `₹${promo.discountValue}`}{" "}
                    off
                  </div>
                  <div style={{ display: "flex", gap: "10px" }}>
                    <button onClick={() => handleDelete(promo._id)}>Delete</button>
                    <button
                      style={{
                        backgroundColor: promo.isActive ? "#dc3545" : "#28a745",
                        color: "white",
                        border: "none",
                        padding: "4px 10px",
                        borderRadius: "4px",
                        cursor: "pointer",
                      }}
                      onClick={() => handleToggleStatus(promo._id, promo.isActive)}
                    >
                      {promo.isActive ? "Inactivate" : "Activate"}
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

export default PromoCodeForm;
