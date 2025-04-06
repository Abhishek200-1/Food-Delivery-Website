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
    phoneNumber: "",
    gender: "",
    dateOfBirth: "",
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

  const isValidPhoneNumber = (number) => {
    const phoneRegex = /^\d{10}$/;
    return phoneRegex.test(number);
  };

  const isValidDOB = (dob) => {
    const dobDate = new Date(dob);
    const today = new Date();
    const age = today.getFullYear() - dobDate.getFullYear();
    const monthDiff = today.getMonth() - dobDate.getMonth();
    const dayDiff = today.getDate() - dobDate.getDate();

    return age > 18 || (age === 18 && (monthDiff > 0 || (monthDiff === 0 && dayDiff >= 0)));
  };

  const onChangeHandler = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    if (user.phoneNumber && !isValidPhoneNumber(user.phoneNumber)) {
      return alert("Phone number must be 10 digits.");
    }

    if (user.dateOfBirth && !isValidDOB(user.dateOfBirth)) {
      return alert("You must be at least 18 years old.");
    }

    try {
      const response = await axios.put(`${url}/api/user/update`, user, {
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

        <label>Phone Number</label>
        <input
          type="tel"
          name="phoneNumber"
          value={user.phoneNumber}
          onChange={onChangeHandler}
          placeholder="Enter 10-digit phone number"
        />

        <div className="input-group">
          <label>Gender</label>
          <select name="gender" value={user.gender} onChange={onChangeHandler} required>
            <option value="">Select Gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
        </div>

        <div className="input-group dob-group">
          <label>Date of Birth</label>
          <input
            type="date"
            name="dateOfBirth"
            value={user.dateOfBirth}
            onChange={onChangeHandler}
          />
        </div>

        <button className="update-btn" type="submit">
          Update Changes
        </button>
      </form>
    </div>
  );
};

export default ProfileForm;
