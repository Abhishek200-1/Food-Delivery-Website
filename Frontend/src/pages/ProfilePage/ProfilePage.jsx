import React, { useState } from 'react';
import './ProfilePage.css';
import { NavLink } from 'react-router-dom';
import { assets } from '../../assets/assets';

const ProfilePage = () => {
  const [image, setImage] = useState(assets.defoult_profile_icon);

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      setImage(URL.createObjectURL(file)); // Preview the uploaded image
    }
  };

  return (
    <div className='profile-page'>
      <h2>My Account</h2>
      
      <div className="profile-page-left">
        <NavLink to='/' className="profile-page-left-option">
          <img src={assets.profile_icon2} alt="Profile Icon" />
          <p>Profile Information</p>
        </NavLink>
        <NavLink to='/' className="profile-page-left-option">
          <img src={assets.order_icon} alt="Order Icon" />
          <p>My Orders</p>
        </NavLink>
        <NavLink to='/' className="profile-page-left-option">
          <img src={assets.address_icon} alt="Address Icon" />
          <p>Manage Address</p>
        </NavLink>
        <NavLink to='/' className="profile-page-left-option">
          <img src={assets.password_icon} alt="Password Icon" />
          <p>Password Manager</p>
        </NavLink>
        <NavLink to='/' className="profile-page-left-option">
          <img src={assets.logout_icon2} alt="Logout Icon" />
          <p>Logout</p>
        </NavLink>
      </div>

      <div className="profile-page-right">
        <div className="add-image-upload flex-col">
          <p>Upload Profile Picture</p>
          <label htmlFor="imageUpload" className="upload-label">
            <img src={image || assets.default_profile_icon} alt="Profile" />
          </label>
          <input
            type="file"
            id="imageUpload"
            accept="image/*"
            onChange={handleImageUpload}
            hidden
          />
        </div>
        
        <div className="form-container">
          <div className="input-row">
            <div className="input-group">
              <label>First Name</label>
              <input type="text" placeholder='First Name' />
            </div>
            <div className="input-group">
              <label>Last Name</label>
              <input type="text" placeholder='Last Name' />
            </div>
          </div>

          <label>Email</label>
          <input type="email" placeholder='Email' />

          <label>Phone</label>
          <input type="number" placeholder='Phone Number' />

          {/* Gender & Button in same row */}
          <div className="input-row">
            <div className="input-group">
              <label>Gender</label>
              <select>
                <option value="">Select Gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
            </div>
            <button className="update-btn">Update Changes</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
