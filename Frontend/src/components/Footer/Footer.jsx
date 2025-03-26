import React from 'react'
import './Footer.css'
import { assets } from '../../assets/assets'

const Footer = () => {
  return (
    <div className='footer' id='footer'>
        <div className="footer-content">
            <div className="footer-content-left">
                <img src={assets.logo4} alt="" />
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Sapiente porro animi quo? Lorem ipsum dolor sit amet consectetur adipisicing elit. Modi ipsa atque voluptas? Cupiditate, repudiandae exercitationem!</p>
                <div className="footer-social-icons">
                    <img src={assets.facebook_icon} alt="" />
                    <img src={assets.twitter_icon} alt="" />
                    <img src={assets.linkedin_icon} alt="" />
                </div>
            </div>
            <div className="footer-content-center">
                <h2>COMPANY</h2>
                <ul>
                    <li>Home</li>
                    <li>About us</li>
                    <li>Delivery</li>
                    <li>Privecy policy</li>
                </ul>
            </div>
            <div className="footer-content-right">
                <h2>GET IN TOUCH</h2>
                <ul>
                    <li>+91-98980 98980</li>
                    <li>contact@nomnomgo.com</li>
                </ul>
            </div>
        </div>
        <hr />
        <p className="footer-copyright">Copyright 2025 &#169; NomNomGo.com - All Rights Reserved.</p>
    </div>
  )
}

export default Footer
