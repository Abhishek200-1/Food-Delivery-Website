import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar/Navbar';
import Sidebar from './components/Sidebar/Sidebar';
import { Route, Routes } from 'react-router-dom';
import Add from './pages/Add/Add';
import List from './pages/List/List';
import Orders from './pages/Orders/Orders';
import WelcomePage from './pages/WelcomePage/WelcomePage';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AdminLogin from './pages/AdminLogin/AdminLogin';
import AdminFeedback from './pages/AdminFeedback/AdminFeedback';

const App = () => {
  const url = "http://localhost:3000";

  // Initialize state based on localStorage to prevent flicker on reload
  const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem("adminToken"));
  const [showLoginPopup, setShowLoginPopup] = useState(!localStorage.getItem("adminToken"));

  useEffect(() => {
    if (localStorage.getItem("adminToken")) {
      setIsAuthenticated(true);
      setShowLoginPopup(false);
    }
  }, []);

  const handleLoginSuccess = () => {
    setIsAuthenticated(true);
    setShowLoginPopup(false);
  };

  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    setIsAuthenticated(false);
    setShowLoginPopup(true);
  };

  return (
    <>
      <ToastContainer />
      {showLoginPopup ? (
        <AdminLogin onLoginSuccess={handleLoginSuccess} />
      ) : (
        <>
          <Navbar onLogout={handleLogout} />
          <hr />
          <div className="app-content">
            <Sidebar />
            <Routes>
              <Route path='/' element={<WelcomePage url={url} />} />
              <Route path='/add' element={<Add url={url} />} />
              <Route path='/list' element={<List url={url} />} />
              <Route path='/orders' element={<Orders url={url} />} />
              <Route path='/AdminFeedback' element={<AdminFeedback url={url} />} />
            </Routes>
          </div>
        </>
      )}
    </>
  );
};

export default App;
