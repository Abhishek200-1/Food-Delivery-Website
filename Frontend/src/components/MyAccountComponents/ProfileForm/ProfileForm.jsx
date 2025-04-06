import React, { useState, useEffect, useContext } from "react";
import "./ProfileForm.css";
import { assets } from "../../../assets/assets";
import axios from "axios";
import { StoreContext } from "../../../context/StoreContext";

const ProfileForm = () => {
  const { token, url } = useContext(StoreContext);

  const [user, setUser] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    gender: "",
  });

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(`${url}/api/user/profile`, {
          headers: { token },
        });

        if (response.data.success) {
          setUser(response.data.user);
        } else {
          alert(response.data.message || "Failed to fetch user data.");
        }
      } catch (err) {
        console.error("Error fetching user profile:", err);
        alert("Something went wrong while fetching profile data.");
      }
    };

    if (token) {
      fetchUser();
    }
  }, [token]);

  const onChangeHandler = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.put(`${url}/api/user/profile`, user, {
        headers: { token },
      });

      if (response.data.success) {
        alert("Profile updated successfully!");
      } else {
        alert(response.data.message || "Failed to update profile.");
      }
    } catch (err) {
      console.error("Error updating profile:", err);
      alert("Something went wrong while updating your profile.");
    }
  };

  return (
    <div className="profile-form">
      <div className="add-image-upload flex-col">
        <img src={assets.profile_icon} alt="Profile" />
      </div>

      <form className="form-container" onSubmit={onSubmitHandler}>
        <div className="input-row">
          <div className="input-group">
            <label>First Name</label>
            <input
              type="text"
              name="firstName"
              value={user.firstName}
              onChange={onChangeHandler}
              required
            />
          </div>
          <div className="input-group">
            <label>Last Name</label>
            <input
              type="text"
              name="lastName"
              value={user.lastName}
              onChange={onChangeHandler}
              required
            />
          </div>
        </div>

        <label>Email</label>
        <input type="email" name="email" value={user.email} readOnly />

        <button className="update-btn" type="submit">
          Update Changes
        </button>
      </form>
    </div>
  );
};

export default ProfileForm;
