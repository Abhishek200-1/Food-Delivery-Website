import React, { useState, useEffect } from "react";
import "./Orders.css";
import { toast } from "react-toastify";
import axios from "axios";
import { assets } from "../../assets/assets";

const Orders = ({ url, fetchOrderCounts }) => {
  const [orders, setOrders] = useState({});

  // Fetch all orders
  const fetchAllOrders = async () => {
    try {
      const response = await axios.get(url + "/api/order/list");
      if (response.data.success) {
        const sortedOrders = response.data.data.sort((a, b) => new Date(b.date) - new Date(a.date));

        const groupedOrders = sortedOrders.reduce((acc, order) => {
          const orderDate = new Date(order.date).toISOString().split("T")[0];
          if (!acc[orderDate]) acc[orderDate] = [];
          acc[orderDate].push(order);
          return acc;
        }, {});

        setOrders(groupedOrders);
      } else {
        toast.error("Failed to fetch orders");
      }
    } catch (error) {
      toast.error(`Error fetching orders: ${error.message}`);
    }
  };

  // Update order status
  const statusHandler = async (event, orderId) => {
    try {
      const response = await axios.post(url + "/api/order/status", {
        orderId,
        status: event.target.value,
      });

      if (response.data.success) {
        await fetchAllOrders();
        
        // Update the counts in WelcomePage after status update
        if (typeof fetchOrderCounts === "function") {
          await fetchOrderCounts(); // ✅ Ensure the function exists before calling
        } else {
          console.warn("fetchOrderCounts is not a function");
        }

        toast.success("Order status updated!");
      }
    } catch (error) {
      toast.error(`Error updating status: ${error.message}`);
    }
  };

  useEffect(() => {
    fetchAllOrders();
  }, []);

  return (
    <div className="order add">
      <h3>Order Page</h3>

      <div className="order-list">
        {Object.keys(orders).length > 0 ? (
          Object.keys(orders)
            .sort((a, b) => new Date(b) - new Date(a))
            .map((date, index) => (
              <div key={index}>
                <h3>{new Date(date).toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" })}</h3>

                {orders[date].map((order, i) => (
                  <div key={i} className="order-item">
                    <img src={assets.parcel_icon} alt="Parcel Icon" />

                    <div>
                      <p className="order-item-food">
                        {order.items.map(item => `${item.name} X ${item.quantity}`).join(", ")}
                      </p>

                      <p className="order-item-name">{order.address.firstname} {order.address.lastname}</p>

                      <div className="order-item-address">
                        <p>{order.address.street},</p>
                        <p>{order.address.city}, {order.address.state}, {order.address.country}, {order.address.zipcode}</p>
                      </div>

                      <p className="order-item-phone">{order.address.phone}</p>
                    </div>

                    <p>Items: {order.items.length}</p>
                    <p>&#8377; {order.amount}</p>

                    <select onChange={(event) => statusHandler(event, order._id)} value={order.status}>
                      <option value="Food Processing">Food Processing</option>
                      <option value="Out For Delivery">Out For Delivery</option>
                      <option value="Delivered">Delivered</option>
                    </select>
                  </div>
                ))}
              </div>
            ))
        ) : (
          <p>No orders found</p>
        )}
      </div>
    </div>
  );
};

export default Orders;
