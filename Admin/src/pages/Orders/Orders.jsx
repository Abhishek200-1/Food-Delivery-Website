import React, { useState, useEffect } from 'react';
import './Orders.css';
import { toast } from 'react-toastify';
import axios from "axios";
import { assets } from '../../assets/assets';

const Orders = ({ url }) => {
  const [orders, setOrders] = useState({}); // Grouped orders by date

  // Fetch all orders from API
  const fetchAllOrders = async () => {
    try {
      const response = await axios.get(url + "/api/order/list");
      if (response.data.success) {
        // Sort orders by date (newest first)
        const sortedOrders = response.data.data.sort((a, b) => new Date(b.date) - new Date(a.date));

        // Group orders by date
        const groupedOrders = sortedOrders.reduce((acc, order) => {
          const orderDate = new Date(order.date).toISOString().split("T")[0]; // Extract YYYY-MM-DD
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
        await fetchAllOrders(); // Refresh orders
        toast.success("Order status updated!");
      }
    } catch (error) {
      toast.error(`Error updating status: ${error.message}`);
    }
  };

  // Fetch orders on component mount
  useEffect(() => {
    fetchAllOrders();
  }, []);

  return (
    <div className="order add">
      <h3>Order Page</h3>

      <div className="order-list">
        {Object.keys(orders).length > 0 ? (
          Object.keys(orders)
            .sort((a, b) => new Date(b) - new Date(a)) // Sort dates in descending order (latest first)
            .map((date, index) => (
              <div key={index}>
                <h3>{new Date(date).toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" })}</h3>

                {orders[date].map((order, i) => (
                  <div key={i} className="order-item">
                    <img src={assets.parcel_icon} alt="Parcel Icon" />

                    <div>
                      {/* Order Items */}
                      <p className="order-item-food">
                        {order.items.map(item => `${item.name} X ${item.quantity}`).join(", ")}
                      </p>

                      {/* Customer Name */}
                      <p className="order-item-name">{order.address.firstname} {order.address.lastname}</p>

                      {/* Address */}
                      <div className="order-item-address">
                        <p>{order.address.street},</p>
                        <p>{order.address.city}, {order.address.state}, {order.address.country}, {order.address.zipcode}</p>
                      </div>

                      {/* Phone Number */}
                      <p className="order-item-phone">{order.address.phone}</p>
                    </div>

                    {/* Order Details */}
                    <p>Items: {order.items.length}</p>
                    <p>&#8377; {order.amount}</p>

                    {/* Order Status Dropdown */}
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
