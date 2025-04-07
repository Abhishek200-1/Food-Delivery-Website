import React, { useContext, useEffect, useState } from 'react'
import './FoodItem.css';
import { assets } from '../../assets/assets';
import { StoreContext } from '../../context/StoreContext';
import { useNavigate } from 'react-router-dom';

const FoodItem = ({id,name,price,description,image}) => {

    // const [itemCount, setItemCount] = useState(0);
    const {cartItems, addToCart, removeFromCart,url} = useContext(StoreContext);
    const [showPopup, setShowPopup] = useState(false);
    const navigate = useNavigate();

    const handleAddToCart = () => {
        addToCart(id);
        setShowPopup(true);
    };
    
    const handlePopupClick = () => {
        setShowPopup(false);
        navigate('/cart');
    };

    //for hidden 
    useEffect(() => {
        if (!cartItems[id]) {
          setShowPopup(false);
        }
      }, [cartItems, id]);

  return (
    <>
        <div className='food-item'>
            <div className="food-item-img-container">
                <img className='food-item-image' src={url+"/images/"+image} alt="" /> 
                {!cartItems[id]
                    ?<img className='add' onClick={handleAddToCart} src={assets.add_icon_white} alt="" />
                    :<div className='food-item-counter'>
                        <img onClick={() => removeFromCart(id)} src={assets.remove_icon_red} alt="" />
                        <p>{cartItems[id]}</p>
                        <img onClick={() => addToCart(id)} src={assets.add_icon_green} alt="" />
                    </div>
                }
            </div>
            <div className="food-item-info">
                <div className="food-item-name-rating">
                    <p>{name}</p>
                    <img src={assets.rating_starts} alt="" />
                </div>
                <p className='food-item-desc'>{description}</p>
                <p className='food-item-price'>&#x20B9; {price}.00</p>
            </div>
        </div>

        {showPopup && (
            <div className="popup" onClick={handlePopupClick}>
                Item added to cart! Click here to go to your cart 🛒
            </div>
        )}
   </>
  )
}

export default FoodItem
