import React, { useContext, useState, useEffect } from 'react'
import './Cart.css';
import { StoreContext } from '../../context/StoreContext';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Cart = () => {
  const { cartItems, food_list, removeFromCart, getTotalCartAmount, url } = useContext(StoreContext);
  const navigate = useNavigate();

  const [promoInput, setPromoInput] = useState('');
  const [discount, setDiscount] = useState(0);
  const [message, setMessage] = useState('');
  const [promoCodes, setPromoCodes] = useState([]);

  useEffect(() => {
    const fetchPromoCodes = async () => {
      try {
        const res = await axios.get(`${url}/api/promocodes`);
        const activePromos = res.data.promos.filter(promo => promo.isActive);
        setPromoCodes(activePromos);
      } catch (err) {
        console.error("Failed to fetch promo codes", err);
      }
    };
    fetchPromoCodes();
  }, [url]);

  const handlePromoSubmit = async () => {
    try {
      const res = await axios.post(`${url}/api/promocodes/validate`, {
        code: promoInput,
        totalAmount: getTotalCartAmount()
      });
      setDiscount(res.data.discount);
      setMessage(res.data.message);
    } catch (err) {
      setMessage(err.response?.data?.message || "Invalid promo code");
      setDiscount(0);
    }
  };

  const calculateTotal = () => {
    const subtotal = getTotalCartAmount();
    const deliveryFee = subtotal === 0 ? 0 : 50;
    const discountedTotal = subtotal - discount;
    return subtotal === 0 ? 0 : discountedTotal + deliveryFee;
  };

  return (
    <div className='cart'>
      <div className="cart-items">
        <div className="cart-items-title">
          <p>Items</p>
          <p>Title</p>
          <p>Price</p>
          <p>Quantity</p>
          <p>Total</p>
          <p>Remove</p>
        </div>
        <br />
        <hr />
        {food_list.map((item) => {
          if (cartItems[item._id] > 0) {
            return (
              <div key={item._id}>
                <div className='cart-items-title cart-items-item'>
                  <img src={`${url}/images/${item.image}`} alt="" />
                  <p>{item.name}</p>
                  <p>₹{item.price}</p>
                  <p>{cartItems[item._id]}</p>
                  <p>₹{item.price * cartItems[item._id]}</p>
                  <p onClick={() => removeFromCart(item._id)} className='cross'>x</p>
                </div>
                <hr />
              </div>
            )
          }
          return null;
        })}
      </div>

      <div className="cart-button">
        <div className="cart-total">
          <h2>Cart totals</h2>
          <div>
            <div className="cart-total-details">
              <p>Subtotal</p>
              <p>₹{getTotalCartAmount()}</p>
            </div>
            <hr />
            {discount > 0 && (
              <>
                <div className="cart-total-details">
                  <p>Promo Discount</p>
                  <p>- ₹{discount}</p>
                </div>
                <hr />
              </>
            )}
            <div className="cart-total-details">
              <p>Delivery Fee</p>
              <p>₹{getTotalCartAmount() === 0 ? 0 : 50}</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <b>Total</b>
              <b>₹{calculateTotal()}</b>
            </div>
          </div>
          <button onClick={() => navigate("/order")}>PROCEED TO CHECKOUT</button>
        </div>

        <div className="cart-promocode">
          <div>
            <p>If you have a promocode, enter it here</p>
            <div className="cart-promocode-input">
              <input
                type="text"
                placeholder='Promocode'
                value={promoInput}
                onChange={(e) => setPromoInput(e.target.value)}
              />
              <button onClick={handlePromoSubmit}>Submit</button>
            </div>
            {message && <p style={{ color: discount > 0 ? 'green' : 'red', marginTop: '10px' }}>{message}</p>}

            {promoCodes.length > 0 && (
              <div className="available-promocodes">
                <h4 style={{ marginTop: '20px', marginBottom: '10px', color: '#555' }}>
                  Get discount by applying promocode below:
                </h4>
                <ul>
                  {promoCodes.map((promo) => (
                      <li key={promo._id}>
                      <strong>{promo.code}</strong> - 
                      {promo.discountType === "percentage"
                        ? ` ${promo.discountValue}% off`
                        : ` ₹${promo.discountValue} off`}
                      {promo.minOrderAmount && ` (Min: ₹${promo.minOrderAmount})`}
                      {promo.maxDiscountAmount && `, Max: ₹${promo.maxDiscountAmount}`}
                      {promo.expiryDate && (
                        <span className="promo-expiry">, Expires: {new Date(promo.expiryDate).toLocaleDateString()}</span>
                      )}
                      <button className="copy-button" onClick={() => {
                        navigator.clipboard.writeText(promo.code);
                        setMessage(`Copied "${promo.code}"!`);
                      }}>
                        Copy
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
};

export default Cart;
