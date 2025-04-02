import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./WelcomePage.css";

const WelcomePage = ({ url }) => {
  const [orderCounts, setOrderCounts] = useState({
    "Food Processing": 0,
    "Out For Delivery": 0,
    "Delivered": 0,
    "Complete Orders": 0,
  });
  const navigate = useNavigate();

  // Check if the admin is authenticated
  useEffect(() => {
    const token = localStorage.getItem("adminToken");
    if (!token) {
      navigate("/login");  // Redirect to login if no token is found
    }
  }, [navigate]);

  const fetchOrderCounts = async () => {
    try {
      const response = await axios.get(url + "/api/order/list");
      if (response.data.success) {
        const counts = {
          "Food Processing": 0,
          "Out For Delivery": 0,
          "Delivered": 0,
          "Complete Orders": 0,
        };

        response.data.data.forEach((order) => {
          if (counts[order.status] !== undefined) {
            counts[order.status]++;
          }
        });

        counts["Complete Orders"] = counts["Food Processing"] + counts["Out For Delivery"] + counts["Delivered"];

        setOrderCounts(counts);
      }
    } catch (error) {
      console.error("Error fetching orders:", error);
    }
  };

  useEffect(() => {
    fetchOrderCounts();
  }, []);

  return (
    <div className="welcome-container welcome">
      <div className="cards-container">
        <div className="card food-processing">
          <h2>Food Processing</h2>
          <span className="count">{orderCounts["Food Processing"]}</span>
        </div>
        <div className="card out-for-delivery">
          <h2>Out For Delivery</h2>
          <span className="count">{orderCounts["Out For Delivery"]}</span>
        </div>
        <div className="card delivered">
          <h2>Delivered</h2>
          <span className="count">{orderCounts.Delivered}</span>
        </div>
        <div className="card complete-orders">
          <h2>Total Orders</h2>
          <span className="count">{orderCounts["Complete Orders"]}</span>
        </div>
      </div>

      <h1>Welcome, Admin!</h1>
      <p>Manage your platform with ease.</p>
      <div className="brand-logo">NomNomGo.</div>
    </div>
  );
};

export default WelcomePage;
