import React, { useState } from 'react';
import './Navbar.css';
import { assets } from '../../assets/assets';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const [showMenu, setShowMenu] = useState(false);

  return (
    <div className='navbar'>
      {/* Brand Name and Admin Panel */}
      <div className='brand-container'>
        <Link to='/'>
          <img className='brand-name' src={assets.logo4} alt="" />
        </Link>
        <span className='admin-text'>Admin Panel</span>
      </div>

      {/* Profile Section with Hover Menu */}
      <div
        className='profile-container'
        onMouseEnter={() => setShowMenu(true)}
        onMouseLeave={() => setShowMenu(false)}
      >
        <img className='profile' src={assets.profile_image} alt='Profile' />
        {showMenu && (
          <div className='profile-menu'>
            <p>👤 Profile Settings</p>
            <p>🚪 Logout</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
