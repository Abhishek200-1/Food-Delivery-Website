import React from 'react'
import './Footer.css'
import { assets } from '../../assets/assets'

const Footer = () => {
  return (
    <div className='footer' id='footer'>
        <div className="footer-content">
            <div className="footer-content-left">
                <img src={assets.logo4} alt="NomNomGo Logo" />
                <p>At NomNomGo, we believe that great food should be accessible to everyone. Whether you're working late, hosting a party, or just too cozy to cook—we’re here to make your life easier and tastier.
                With a curated menu from top-rated chefs and local favorites, we deliver dishes made with love, speed, and care.</p>
                <div className="footer-social-icons">
                    <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
                        <img src={assets.facebook_icon} alt="Facebook" />
                    </a>
                    <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
                        <img src={assets.twitter_icon} alt="Twitter" />
                    </a>
                    <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
                        <img src={assets.linkedin_icon} alt="LinkedIn" />
                    </a>
                </div>
            </div>
            <div className="footer-content-center">
                <h2>COMPANY</h2>
                <ul>
                    <li><a href="/">Home</a></li>
                    <li><a href="#about-us">About us</a></li>
                    <li><a href="#app-download">Delivery</a></li>
                    <li><a href="#privacy-policy">Privacy Policy</a></li>
                </ul>
            </div>
            <div className="footer-content-right">
                <h2>GET IN TOUCH</h2>
                <ul>
                    <li><a href="tel:+919898098980">+91-98980 98980</a></li>
                    <li><a href="mailto:contact@nomnomgo.com">contact@nomnomgo.com</a></li>
                </ul>
            </div>
        </div>
        <hr />
        <p className="footer-copyright">Copyright 2025 &#169; NomNomGo.com - All Rights Reserved.</p>
    </div>
  )
}

export default Footer
