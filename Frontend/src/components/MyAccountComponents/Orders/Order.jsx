import React, { useContext, useEffect, useState } from 'react';
import './Order.css';
import { StoreContext } from '../../../context/StoreContext';
import axios from 'axios';
import { assets } from '../../../assets/assets';

const Order = () => {
  const { url, token } = useContext(StoreContext);
  const [orders, setOrders] = useState([]);
  const [user, setUser] = useState({});

  const fetchOrders = async () => {
    if (!token) return;
    try {
      const orderRes = await axios.post(`${url}/api/order/userorders`, {}, {
        headers: { token }
      });
      setOrders(orderRes.data.data);

      const profileRes = await axios.get(`${url}/api/user/profile`, {
        headers: { token }
      });
      setUser(profileRes.data.user);
    } catch (error) {
      console.error("Error fetching orders or profile:", error);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, [token]);

  const handlePrint = (order) => {
    const logo = assets.logo4 || 'https://via.placeholder.com/150x50?text=Logo';
    const deliveryCharge = order.deliveryCharge || 30;
    const grandTotal = order.amount + deliveryCharge;

    const itemsHTML = order.items.map(item => (
      `<tr>
        <td>${item.name}</td>
        <td>${item.quantity}</td>
      </tr>`
    )).join('');

    const address = order.address || {};

    const customerInfoHTML = `
      <strong>Customer Name:</strong> ${address.firstname || ''} ${address.lastname || ''}<br/>
      <strong>Phone:</strong> ${address.phone || ''}<br/>
      <strong>Email:</strong> ${user.email || ''}<br/>
      <strong>Address:</strong><br/>
      ${address.street || ''},<br/>
      ${address.city || ''}, ${address.state || ''},<br/>
      ${address.country || ''}, ${address.zipcode || ''}
    `;

    const billHTML = `
      <html>
      <head>
        <title>Order Bill</title>
        <style>
          body {
            font-family: 'Segoe UI', sans-serif;
            background: white;
            padding: 30px;
            color: #333;
          }
          .bill-container {
            max-width: 600px;
            margin: auto;
            border: 1px solid #ccc;
            border-radius: 10px;
            padding: 20px;
            box-shadow: 0 0 10px rgba(0,0,0,0.1);
          }
          .logo {
            text-align: center;
            margin-bottom: 20px;
          }
          .logo img {
            width: 150px;
          }
          h2 {
            text-align: center;
            color: #2E8B57;
          }
          .customer-info {
            margin-bottom: 20px;
            font-size: 14px;
            line-height: 1.5;
          }
          table {
            width: 100%;
            border-collapse: collapse;
            margin-bottom: 15px;
          }
          th, td {
            border: 1px solid #ddd;
            padding: 10px;
            text-align: left;
          }
          .summary {
            font-size: 15px;
            margin-top: 15px;
          }
          .total {
            font-weight: bold;
            font-size: 17px;
            color: #2E8B57;
            margin-top: 10px;
          }
          .footer {
            text-align: center;
            font-size: 13px;
            color: #999;
            margin-top: 30px;
          }
        </style>
      </head>
      <body>
        <div class="bill-container">
          <div class="logo">
            <img src="${logo}" alt="Restaurant Logo" />
          </div>
          <h2>Order Receipt</h2>
          <div class="customer-info">
            ${customerInfoHTML}
          </div>
          <p><strong>Order Date:</strong> ${new Date(order.date).toLocaleString()}</p>
          <table>
            <thead>
              <tr>
                <th>Item</th>
                <th>Qty</th>
              </tr>
            </thead>
            <tbody>
              ${itemsHTML}
            </tbody>
          </table>
          <div class="summary">
            <p>Subtotal: ₹${order.amount}.00</p>
            <p>Delivery Charges: ₹${deliveryCharge}.00</p>
            <p class="total">Grand Total: ₹${grandTotal}.00</p>
          </div>
          <div class="footer">
            Thank you for your order!<br/>
            For support, contact: support@nomnomgo.com
          </div>
        </div>
      </body>
      </html>
    `;

    const printWindow = window.open('', '_blank');
    printWindow.document.write(billHTML);
    printWindow.document.close();
    printWindow.focus();
    printWindow.print();
  };

  return (
    <div className="order-section">
      <h2>My Orders</h2>
      <div className="order-container">
        {orders.length === 0 ? (
          <p className="no-orders">No orders found.</p>
        ) : (
          orders.map((order, index) => (
            <div key={index} className="order-card">
              <img className="order-image" src={assets.order_icon} alt="Order Icon" />
              <div className="order-details">
                <p className="order-items">
                  {order.items.map((item, idx) => `${item.name} x ${item.quantity}${idx < order.items.length - 1 ? ', ' : ''}`)}
                </p>
                <p className="order-price">&#8377; {order.amount}.00</p>
                <button className="print-btn" onClick={() => handlePrint(order)}>
                  Print Bill
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Order;
