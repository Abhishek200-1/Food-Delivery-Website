import React, { useContext, useEffect, useState } from "react";
import "./MyOrders.css";
import { StoreContext } from "../../context/StoreContext";
import axios from "axios";
import { assets } from "../../assets/assets";

const MyOrders = () => {
    const { url, token } = useContext(StoreContext);
    const [data, setData] = useState({}); // All orders grouped by date
    const [filteredData, setFilteredData] = useState({}); // Filtered orders grouped by date
    const [selectedDate, setSelectedDate] = useState(""); // Selected date for filtering

    // Function to get today's date in YYYY-MM-DD format
    const getTodayDate = () => new Date().toISOString().split("T")[0];

    // Fetch user orders
    const fetchOrders = async () => {
        try {
            const response = await axios.post(url + "/api/order/userorders", {}, { headers: { token } });

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

                setData(groupedOrders);
                setFilteredData(groupedOrders); // Initially show all orders
                setSelectedDate(""); // No filter applied at the beginning
            } else {
                console.error("Failed to fetch orders");
            }
        } catch (error) {
            console.error("Error fetching orders:", error);
        }
    };

    // Filter orders based on selected date
    const filterOrdersByDate = (date) => {
        setSelectedDate(date);
        if (date === "") {
            setFilteredData(data); // Show all orders if no date is selected
        } else {
            const filteredOrders = { [date]: data[date] || [] }; // Show only selected date's orders
            setFilteredData(filteredOrders);
        }
    };

    // Reset the filter
    const resetFilter = () => {
        setSelectedDate("");
        setFilteredData(data);
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
                <label><b>Filter by Date:</b></label>
                <input type="date" value={selectedDate} onChange={(e) => filterOrdersByDate(e.target.value)} />
                <button onClick={resetFilter} disabled={!selectedDate}>Reset Date</button>

                <div className="container">
                    {/* Display orders grouped by date */}
                    {Object.keys(filteredData).length > 0 ? (
                        Object.keys(filteredData)
                            .sort((a, b) => new Date(b) - new Date(a)) // Sort dates in descending order (latest first)
                            .map((date, index) => (
                                <div key={index}>
                                    <h3>{new Date(date).toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" })}</h3>
                                    {filteredData[date].length > 0 ? (
                                        filteredData[date].map((order, i) => (
                                            <div key={i} className="my-orders-order">
                                                <img src={assets.parcel_icon} alt="Parcel Icon" />

                                                {/* Order Items */}
                                                <p>
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

                                                {/* Track Order Button */}
                                                <button onClick={fetchOrders}>Track order</button>
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
