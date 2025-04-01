import React, { useContext, useEffect, useState } from "react";
import "./MyOrders.css";
import { StoreContext } from "../../context/StoreContext";
import axios from "axios";
import { assets } from "../../assets/assets";
import { useNavigate } from "react-router-dom"; // Import useNavigate

const MyOrders = () => {
    const { url, token } = useContext(StoreContext);
    const [data, setData] = useState({}); // All orders grouped by date
    const [filteredData, setFilteredData] = useState({}); // Filtered orders grouped by date
    const [selectedDate, setSelectedDate] = useState(""); // Selected date for filtering
    const navigate = useNavigate(); // Hook for navigation

    // Fetch user orders
    const fetchOrders = async () => {
        try {
            const response = await axios.post(url + "/api/order/userorders", {}, { headers: { token } });

            if (response.data.success) {
                const sortedOrders = response.data.data.sort((a, b) => new Date(b.date) - new Date(a.date));

                const groupedOrders = sortedOrders.reduce((acc, order) => {
                    const orderDate = new Date(order.date).toISOString().split("T")[0];
                    if (!acc[orderDate]) acc[orderDate] = [];
                    acc[orderDate].push(order);
                    return acc;
                }, {});

                setData(groupedOrders);
                setFilteredData(groupedOrders);
                setSelectedDate("");
            } else {
                console.error("Failed to fetch orders");
            }
        } catch (error) {
            console.error("Error fetching orders:", error);
        }
    };

    // Filter orders by selected date
    const filterOrdersByDate = (date) => {
        setSelectedDate(date);
        if (date === "") {
            setFilteredData(data);
        } else {
            setFilteredData({ [date]: data[date] || [] });
        }
    };

    // Reset the date filter
    const resetFilter = () => {
        setSelectedDate("");
        setFilteredData(data);
    };

    // Navigate to the feedback page
    const handleGiveFeedback = (orderId) => {
        navigate(`/feedback/${orderId}`);
    };

    // Fetch orders on component mount
    useEffect(() => {
        if (token) {
            fetchOrders();
        }
    }, [token]);

    return (
        <div>
            <div className="my-orders">
                <h2>My Orders</h2>

                {/* Date Filter */}
                <div className="filter-container">
                    <label><b>Filter by Date:</b></label>
                    <input type="date" value={selectedDate} onChange={(e) => filterOrdersByDate(e.target.value)} />
                    <button onClick={resetFilter} disabled={!selectedDate}>Reset Date</button>
                </div>

                <div className="container">
                    {Object.keys(filteredData).length > 0 ? (
                        Object.keys(filteredData)
                            .sort((a, b) => new Date(b) - new Date(a))
                            .map((date, index) => (
                                <div key={index}>
                                    <h3>{new Date(date).toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" })}</h3>
                                    {filteredData[date].length > 0 ? (
                                        filteredData[date].map((order, i) => (
                                            <div key={i} className="my-orders-order">
                                                <img src={assets.parcel_icon} alt="Parcel Icon" />

                                                {/* Order Items */}
                                                <p className="fooditem">
                                                    {order.items.map((item, j) =>
                                                        j === order.items.length - 1
                                                            ? `${item.name} X ${item.quantity}`
                                                            : `${item.name} X ${item.quantity}, `
                                                    )}
                                                </p>

                                                {/* Order Amount */}
                                                <p>&#8377; {order.amount}.00</p>

                                                {/* Number of Items */}
                                                <p>Items: {order.items.length}</p>

                                                {/* Order Status */}
                                                <p>
                                                    <span>&#x25cf; </span>
                                                    <b>{order.status}</b>
                                                </p>

                                                {/* Buttons Container */}
                                                <div className="order-buttons">
                                                    <button className="track-btn" onClick={fetchOrders}>Track Order</button>
                                                    <button className="feedback-btn" onClick={() => handleGiveFeedback(order._id)}>Give Feedback</button>
                                                </div>
                                            </div>
                                        ))
                                    ) : (
                                        <p>No orders found for this date</p>
                                    )}
                                </div>
                            ))
                    ) : (
                        <p>No orders found</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default MyOrders;
