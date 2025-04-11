import React, { useState } from "react";
import { motion } from "framer-motion";
import "./AboutUs.css"; // Import CSS file
import { assets } from "../../assets/assets";

const AboutUs = () => {
  const [menu, setMenu] = useState("");

  return (
    <div className="about-container" id="about-us">
      <div className="about-content">
        
        {/* Left Side - Image */}
        <motion.div
          className="about-image"
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <img
            src={assets.header_img12}
            alt="About Us"
            className="about-img"
          />
        </motion.div>

        {/* Right Side - Content */}
        <motion.div
          className="about-text"
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h2>About Us</h2>
          <p>
            Welcome to <span>NomNomGo.</span>, we believe in delivering happiness in every bite. 
            Our mission is to bring you the best food from your favorite restaurants, 
            fresh and hot, right to your doorstep.
          </p>
          <p>
          With a network of top-rated restaurants and a team of dedicated delivery partners, 
          we ensure fast, reliable, and quality service. Your cravings, our responsibility!
          </p>
          <button className="learn-more-btn"><a href='#explore-menu' onClick={() => setmenu("menu")} className={menu === "menu"?"active":""}>Order Now</a></button>
        </motion.div>

      </div>
    </div>
  );
};

export default AboutUs;
