import React from 'react'
import './Sidebar.css';
import { assets } from '../../assets/assets';
import { NavLink } from 'react-router-dom';

const Sidebar = () => {
  return (
    <div className='sidebar'>
      <div className="sidebar-options">
        <NavLink to='/' className="sidebar-option">
            <img src={assets.home_icon} alt="" />
            <p>Home</p>
        </NavLink>
        <NavLink to='/add' className="sidebar-option">
            <img src={assets.add_icon} alt="" />
            <p>Add Items</p>
        </NavLink>
        <NavLink to='/list' className="sidebar-option">
            <img src={assets.order_icon} alt="" />
            <p>List Items</p>
        </NavLink>
        <NavLink to='/orders' className="sidebar-option">
            <img src={assets.cart_icon} alt="" />
            <p>Orders</p>
        </NavLink>
        {/* <NavLink to='/update' className="sidebar-option">
            <img src={assets.cart_icon} alt="" />
            <p>Update Details</p>
        </NavLink> */}
        {/* <NavLink to='/UpdateCategory' className="sidebar-option">
            <img src={assets.cart_icon} alt="" />
            <p>Add New Category</p>
        </NavLink> */}
        <NavLink to='/AdminFeedback' className="sidebar-option">
            <img src={assets.feedback_icon} alt="" />
            <p>See Feedbacks</p>
        </NavLink>
        <NavLink to='/promocodes' className="sidebar-option">
            <img src={assets.promo_icon} alt="" />
            <p>PromoCodes</p>
        </NavLink>
        <NavLink to='/daily-sales-summery' className="sidebar-option">
            <img src={assets.report_icon} alt="" />
            <p>Daily Sales</p>
        </NavLink>
      </div>
    </div>
  )
}

export default Sidebar
