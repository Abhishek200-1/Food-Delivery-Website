import React, { useState } from 'react';
import './LoginPopUp.css';
import { assets } from '../../assets/assets';
import { useContext } from 'react';
import { StoreContext } from '../../context/StoreContext';
import axios from 'axios';

const LoginPopUp = ({ setShowLogin }) => {
   const { url, setToken } = useContext(StoreContext);

   const [currState, setCurrState] = useState("Login");
   const [data, setData] = useState({
      firstName: "",
      lastName: "",
      email: "",
      password: ""
   });

   const onChangeHandler = (event) => {
      const { name, value } = event.target;
      setData(prevData => ({ ...prevData, [name]: value }));
   };

   const onLogin = async (event) => {
      event.preventDefault();
      let newUrl = currState === "Login" ? `${url}/api/user/login` : `${url}/api/user/register`;

      const requestData = currState === "Login" 
         ? { email: data.email, password: data.password } 
         : data;

      try {
         const response = await axios.post(newUrl, requestData);
         if (response.data.success) {
            setToken(response.data.token);
            localStorage.setItem("token", response.data.token);
            setShowLogin(false);
         } else {
            alert(response.data.message);
         }
      } catch (error) {
         alert("Something went wrong. Please try again.");
      }
   };

   return (
      <div className='login-pop-up'>
         <form className='login-pop-up-container' onSubmit={onLogin}>
            <div className='login-pop-up-title'>
               <h2>{currState}</h2>  
               <img onClick={() => setShowLogin(false)} src={assets.cross_icon} alt="Close" />
            </div>
            <div className='login-popup-inputs'>
               {currState === "Sign Up" && (
                  <>
                     <input name='firstName' onChange={onChangeHandler} value={data.firstName} type="text" placeholder='First Name' required />
                     <input name='lastName' onChange={onChangeHandler} value={data.lastName} type="text" placeholder='Last Name' required />
                  </>
               )}
               <input name='email' onChange={onChangeHandler} value={data.email} type="email" placeholder='Enter your email' required />
               <input name='password' onChange={onChangeHandler} value={data.password} type="password" placeholder='Enter your password' required />
            </div>
            <button type='submit'>{currState === "Sign Up" ? "Create Account" : "Login"}</button>
            <div className='login-popup-condition'>
               <input type="checkbox" required />
               <p>By continuing, I agree to the terms of use & privacy policy.</p>
            </div>
            {currState === "Login"
               ? <p>Create a new account? <span onClick={() => setCurrState("Sign Up")}>Click here</span></p>
               : <p>Already have an account? <span onClick={() => setCurrState("Login")}>Login here</span></p>
            }
         </form>
      </div>
   );
};

export default LoginPopUp;
