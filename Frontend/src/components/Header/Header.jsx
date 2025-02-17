import React, { useState, useEffect } from 'react';
import './Header.css';
import { assets } from '../../assets/assets'


const images = [
  assets.header_img2,
  assets.header_img4,
  // assets.header_img7,
  assets.header_img5,
  // assets.header_img10,
  assets.header_img11,
  assets.header_img12
];

const Header = () => {
  const [currentImage, setCurrentImage] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % images.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="header" style={{ backgroundImage: `url(${images[currentImage]})` }}>
      <div className="header-contents">
        <h2>Your Favourite Food Delivered Hot & Fresh</h2>
        <p>Choose from a diverse menu featuring a delectable array of dishes crafted with the finest ingredients and culinary expertise. Our mission is to satisfy your cravings and elevate your dining experience, one delicious meal at a time.</p>
        <button>View Menu</button>
      </div>
    </div>
  );
};

export default Header;
