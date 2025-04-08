import React, { useEffect, useState, useRef } from 'react';
import './DailySalesSummary.css';
import axios from 'axios';

const DailySalesSummary = () => {
  const [dailySales, setDailySales] = useState([]);
  const [loading, setLoading] = useState(true);
  const [fromDate, setFromDate] = useState('');
  const [toDate, setToDate] = useState('');
  const printRef = useRef();

  const fetchDailySales = async () => {
    setLoading(true);
    try {
      const res = await axios.get('http://localhost:3000/api/order/daily-sales', {
        params: { from: fromDate, to: toDate }
      });

      if (res.data && Array.isArray(res.data.data)) {
        setDailySales(res.data.data);
      } else {
        setDailySales([]);
      }
    } catch (err) {
      console.error('Failed to fetch sales data', err);
      setDailySales([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDailySales();
  }, []);

  const handleFilter = () => {
    fetchDailySales();
  };

  const handlePrint = () => {
    const printContents = printRef.current.innerHTML;
    const originalContents = document.body.innerHTML;
    document.body.innerHTML = printContents;
    window.print();
    document.body.innerHTML = originalContents;
    window.location.reload();
  };

  return (
    <div className="daily-sales-summary">
      <h2>📊 Daily Sales Report</h2>

      <div className="filter-container">
        <label>From: <input type="date" value={fromDate} onChange={(e) => setFromDate(e.target.value)} /></label>
        <label>To: <input type="date" value={toDate} onChange={(e) => setToDate(e.target.value)} /></label>
        <button onClick={handleFilter}>Filter</button>
        <button onClick={handlePrint}>🖨️ Print</button>
      </div>

      <div ref={printRef}>
        {loading ? (
          <p>Loading sales data...</p>
        ) : (
          <table>
            <thead>
              <tr>
                <th>Date</th>
                <th>Total Sales (₹)</th>
              </tr>
            </thead>
            <tbody>
              {dailySales.length > 0 ? (
                dailySales.map((sale) => (
                  <tr key={sale.date}>
                    <td>{sale.date}</td>
                    <td>₹ {sale.totalAmount}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={2}>No data found</td>
                </tr>
              )}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default DailySalesSummary;
