import React, { useEffect, useState } from 'react';
import './DailySalesSummary.css';
import axios from 'axios';

const DailySalesSummary = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [fromDate, setFromDate] = useState('');
  const [toDate, setToDate] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const fetchOrders = async () => {
    setLoading(true);
    try {
      const res = await axios.get('http://localhost:3000/api/order/daily-sales', {
        params: { from: fromDate, to: toDate }
      });

      if (res.data && Array.isArray(res.data.data)) {
        setOrders(res.data.data);
      } else {
        setOrders([]);
      }
    } catch (err) {
      console.error('Failed to fetch order data', err);
      setOrders([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const handleFilter = () => {
    setCurrentPage(1);
    fetchOrders();
  };

  const handlePrint = () => {
    const printWindow = window.open('', '_blank');
    const grouped = groupByDate(orders);
    const grandTotal = orders.reduce((sum, order) => sum + order.amount, 0);

    let html = `
      <html>
        <head>
          <title>Print Summary</title>
          <style>
            body { font-family: Arial, sans-serif; padding: 20px; }
            table { width: 100%; border-collapse: collapse; margin-bottom: 20px; }
            th, td { border: 1px solid #ccc; padding: 8px; text-align: left; }
            h2, h3 { margin-top: 20px; }
            .total-row { font-weight: bold; }
          </style>
        </head>
        <body>
          <h2>📋 Paid Orders Report</h2>
    `;

    for (const date in grouped) {
      const ordersOnDate = grouped[date];
      const total = ordersOnDate.reduce((sum, order) => sum + order.amount, 0);
      html += `
        <h3>📅 On ${date}:</h3>
        <table>
          <thead>
            <tr><th>Order ID</th><th>Customer</th><th>Amount (₹)</th></tr>
          </thead>
          <tbody>
      `;
      ordersOnDate.forEach(order => {
        html += `<tr>
          <td>${order.orderId}</td>
          <td>${order.address?.firstName || ''} ${order.address?.lastName || ''}</td>
          <td>₹ ${order.amount}</td>
        </tr>`;
      });
      html += `<tr class="total-row"><td colspan="2">Total</td><td>₹ ${total}</td></tr>`;
      html += `</tbody></table>`;
    }

    html += `<h3 style="text-align: right;">Grand Total: ₹ ${grandTotal}</h3>`;
    html += `</body></html>`;

    printWindow.document.write(html);
    printWindow.document.close();
    printWindow.print();
  };

  const indexOfLast = currentPage * itemsPerPage;
  const indexOfFirst = indexOfLast - itemsPerPage;
  const currentOrders = orders.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(orders.length / itemsPerPage);

  const groupByDate = (data) => {
    return data.reduce((acc, order) => {
      if (!acc[order.date]) acc[order.date] = [];
      acc[order.date].push(order);
      return acc;
    }, {});
  };

  const groupedCurrentOrders = groupByDate(currentOrders);

  return (
    <div className="daily-sales-summary">
      <h2>📋 Paid Orders Report</h2>

      <div className="filter-container">
        <label>From: <input type="date" value={fromDate} onChange={(e) => setFromDate(e.target.value)} /></label>
        <label>To: <input type="date" value={toDate} onChange={(e) => setToDate(e.target.value)} /></label>
        <button onClick={handleFilter}>Filter</button>
        <button onClick={handlePrint}>🖨️ Print</button>
      </div>

      {loading ? (
        <p>Loading order data...</p>
      ) : Object.keys(groupedCurrentOrders).length > 0 ? (
        Object.entries(groupedCurrentOrders).map(([date, ordersOnDate]) => {
          const totalOfDay = ordersOnDate.reduce((sum, order) => sum + order.amount, 0);
          return (
            <div key={date} className="date-group">
              <h3>📅 On {date} :</h3>
              <table>
                <thead>
                  <tr>
                    <th style={{ width: "35%" }}>Order ID</th>
                    <th style={{ width: "40%" }}>Customer</th> 
                    <th>Amount (₹)</th>
                  </tr>
                </thead>
                <tbody>
                  {ordersOnDate.map((order) => (
                    <tr key={order.orderId}>
                      <td>{order.orderId}</td>
                      <td>{order.address?.firstName || ''} {order.address?.lastName || ''}</td>
                      <td>₹ {order.amount}</td>
                    </tr>
                  ))}
                  <tr className="total-row">
                    <td colSpan="2"><strong>💰 Total</strong></td>
                    <td><strong>₹ {totalOfDay}</strong></td>
                  </tr>
                </tbody>
              </table>
            </div>
          );
        })
      ) : (
        <p>No data found</p>
      )}

      {/* Pagination */}
      {orders.length > itemsPerPage && (
        <div className="pagination">
          {Array.from({ length: totalPages }, (_, index) => (
            <button
              key={index + 1}
              onClick={() => setCurrentPage(index + 1)}
              className={currentPage === index + 1 ? 'active' : ''}
            >
              {index + 1}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default DailySalesSummary;
