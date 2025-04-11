import React, { useContext, useEffect, useState } from 'react';
import './PlaceOrder.css';
import { StoreContext } from '../../context/StoreContext';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const PlaceOrder = () => {
  const { getTotalCartAmount, token, food_list, cartItems, url } = useContext(StoreContext);

  const [data, setData] = useState({
    firstname: '',
    lastname: '',
    email: '',
    street: '',
    city: '',
    state: 'Gujarat',
    zipcode: '',
    country: 'India',
    phone: '',
  });

  const navigate = useNavigate();

  const onChangeHandler = (event) => {
    const { name, value } = event.target;
    setData((prevData) => ({ ...prevData, [name]: value }));
  };

  const validateForm = () => {
    const { firstname, lastname, email, street, city, state, zipcode, country, phone } = data;

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^[6-9]\d{9}$/; // Indian mobile numbers
    const zipRegex = /^\d{5,6}$/;

    if (!firstname.trim() || !lastname.trim()) {
      alert('Please enter your full name.');
      return false;
    }

    if (!emailRegex.test(email)) {
      alert('Please enter a valid email address.');
      return false;
    }

    if (!street.trim() || !city.trim() || !state.trim() || !country.trim()) {
      alert('Please fill all address fields.');
      return false;
    }

    if (!zipRegex.test(zipcode)) {
      alert('Please enter a valid zip code (5 or 6 digits).');
      return false;
    }

    if (!phoneRegex.test(phone)) {
      alert('Please enter a valid 10-digit phone number.');
      return false;
    }

    return true;
  };

  const placeOrder = async (event) => {
    event.preventDefault();

    if (!validateForm()) return;

    let orderItems = [];

    food_list.map((item) => {
      if (cartItems[item._id] > 0) {
        const itemInfo = { ...item, quantity: cartItems[item._id] };
        orderItems.push(itemInfo);
      }
    });

    const orderData = {
      address: data,
      items: orderItems,
      amount: getTotalCartAmount() + 50,
    };

    try {
      const response = await axios.post(url + '/api/order/place', orderData, {
        headers: { token },
      });

      if (response.data.success) {
        const { session_url } = response.data;
        window.location.replace(session_url);
      } else {
        alert('Order failed. Try again.');
      }
    } catch (error) {
      console.error('Order Error:', error);
      alert('Something went wrong. Try again later.');
    }
  };

  useEffect(() => {
    if (!token || getTotalCartAmount() === 0) {
      navigate('/cart');
    }
  }, [token]);

  return (
    <div>
      <form className='place-order' onSubmit={placeOrder}>
        <div className='place-order-left'>
          <p className='title'>Delivery Information</p>
          <div className='multi-fields'>
            <input name='firstname' onChange={onChangeHandler} value={data.firstname} type='text' placeholder='First Name' required />
            <input name='lastname' onChange={onChangeHandler} value={data.lastname} type='text' placeholder='Last Name' required />
          </div>
          <input name='email' onChange={onChangeHandler} value={data.email} type='email' placeholder='Email address' required />
          <input name='street' onChange={onChangeHandler} value={data.street} type='text' placeholder='Street' required />
          <div className='multi-fields'>
            <input name='city' onChange={onChangeHandler} value={data.city} type='text' placeholder='City' required />
            <input name='state' onChange={onChangeHandler} value={data.state} type='text' placeholder='State' required />
          </div>
          <div className='multi-fields'>
            <input name='zipcode' onChange={onChangeHandler} value={data.zipcode} type='text' placeholder='Zip Code' required />
            <input name='country' onChange={onChangeHandler} value={data.country} type='text' placeholder='Country' required />
          </div>
          <input name='phone' onChange={onChangeHandler} value={data.phone} type='text' placeholder='Phone' required />
        </div>

        <div className='place-order-right'>
          <div className='cart-total'>
            <h2>Cart totals</h2>
            <div>
              <div className='cart-total-details'>
                <p>Subtotal</p>
                <p>&#8377; {getTotalCartAmount()}</p>
              </div>
              <hr />
              <div className='cart-total-details'>
                <p>Delivery Fee</p>
                <p>&#8377; {getTotalCartAmount() === 0 ? 0 : 50}</p>
              </div>
              <hr />
              <div className='cart-total-details'>
                <b>Total</b>
                <b>&#8377; {getTotalCartAmount() === 0 ? 0 : getTotalCartAmount() + 50}</b>
              </div>
            </div>
            <button type='submit'>PROCEED TO CHECKOUT</button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default PlaceOrder;
