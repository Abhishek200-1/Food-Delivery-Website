import React, { useState, useContext } from 'react';
import './ProfilePage.css';
import { assets } from '../../assets/assets';
import ProfileForm from '../../components/MyAccountComponents/ProfileForm/ProfileForm';
import Order from '../../components/MyAccountComponents/Orders/Order';
import MyAddress from '../../components/MyAccountComponents/MyAddress/MyAddress';
import { StoreContext } from '../../context/StoreContext';
import { useNavigate } from 'react-router-dom';
import ResetPassword from '../../components/MyAccountComponents/ResetPassword/ResetPassword';

const ProfilePage = () => {
  const [activeSection, setActiveSection] = useState("profile"); // Manage which section to show


  const {token,setToken} = useContext(StoreContext);


  const navigate = useNavigate();

  // logout Function
  const logout = () => {
    localStorage.removeItem("token");
    setToken("");
    navigate("/")
  }

  return (
    <div className='profile-page'>
      {/* <h2>My Account</h2> */}

      {/* Fixed Left Sidebar */}
      <div className="profile-page-left">
        <div className="sidebar">
          <div className="profile-page-left-option" onClick={() => setActiveSection("profile")}>
            <img src={assets.profile_icon2} alt="Profile Icon" />
            <p>Profile Information</p>
          </div>
          <div className="profile-page-left-option" onClick={() => setActiveSection("orders")}>
            <img src={assets.order_icon} alt="Order Icon" />
            <p>My Orders</p>
          </div>
          {/* <div className="profile-page-left-option" onClick={() => setActiveSection("address")}>
            <img src={assets.address_icon} alt="Address Icon" />
            <p>Manage Address</p>
          </div> */}
          <div className="profile-page-left-option" onClick={() => setActiveSection("password")}>
            <img src={assets.password_icon} alt="Password Icon" />
            <p>Password Manager</p>
          </div>
          <div className="profile-page-left-option" onClick={logout}>
            <img src={assets.logout_icon2} alt="Logout Icon" />
            <p>Logout</p>
          </div>
        </div>
      </div>

      {/* Right Side Dynamic Content */}
      <div className="profile-page-right">
        {activeSection === "profile" && <ProfileForm/>}
        {activeSection === "orders" && <Order/>}
        {activeSection === "address" && <MyAddress/>}
        {activeSection === "password" && <ResetPassword/>}
      </div>
    </div>
  );
};

export default ProfilePage;
