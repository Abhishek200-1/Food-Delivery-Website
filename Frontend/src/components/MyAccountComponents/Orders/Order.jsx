import React, { useContext, useEffect, useState } from 'react';
import './Order.css';
import { StoreContext } from '../../../context/StoreContext';
import axios from 'axios';
import { assets } from '../../../assets/assets';

const Order = () => {
    const { url, token } = useContext(StoreContext);
    const [orders, setOrders] = useState([]);

    const fetchOrders = async () => {
        if (!token) return;
        try {
            const response = await axios.post(`${url}/api/order/userorders`, {}, { headers: { token } });
            setOrders(response.data.data);
        } catch (error) {
            console.error("Error fetching orders:", error);
        }
    };

    useEffect(() => {
        fetchOrders();
    }, [token]);

    return (
        <div className="order-section">
            <h2>My Orders</h2>
            <div className="order-container">
                {orders.length === 0 ? (
                    <p className="no-orders">No orders found.</p>
                ) : (
                    orders.map((order, index) => (
                        <div key={index} className="order-card">
                            <img
                                className="order-image"
                                src={assets.order_icon} 
                                alt="Order Item"
                            />
                            <div className="order-details">
                                <p className="order-items">
                                    {order.items.map((item, idx) =>
                                        `${item.name} x ${item.quantity}${idx < order.items.length - 1 ? ', ' : ''}`
                                    )}
                                </p>
                                <p className="order-price">&#8377; {order.amount}.00</p>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default Order;
