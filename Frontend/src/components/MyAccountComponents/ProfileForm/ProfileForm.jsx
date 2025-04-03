import React, { useState, useEffect } from "react";
import "./ProfileForm.css";
import { assets } from "../../../assets/assets";
import axios from "axios";

const ProfileForm = () => {
  const [user, setUser] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    gender: "",
  });

  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem("token");
      const response = await axios.get("/api/user/profile", {
        headers: { Authorization: token },
      });
      if (response.data.success) {
        setUser(response.data.user);
      }
    };
    fetchUser();
  }, []);

  const onChangeHandler = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    const response = await axios.put("/api/user/profile", user, {
      headers: { Authorization: token },
    });
    if (response.data.success) {
      alert("Profile updated successfully!");
    } else {
      alert(response.data.message);
    }
  };

  return (
    <div className="profile-form">
      <div className="add-image-upload flex-col">
        <img src={assets.default_profile_icon} alt="Profile" />
      </div>

      <form className="form-container" onSubmit={onSubmitHandler}>
        <div className="input-row">
          <div className="input-group">
            <label>First Name</label>
            <input type="text" name="firstName" value={user.firstName} onChange={onChangeHandler} required />
          </div>
          <div className="input-group">
            <label>Last Name</label>
            <input type="text" name="lastName" value={user.lastName} onChange={onChangeHandler} required />
          </div>
        </div>

        <label>Email</label>
        <input type="email" name="email" value={user.email} readOnly />

        <label>Phone</label>
        <input type="number" name="phone" value={user.phone} onChange={onChangeHandler} />

        <label>Gender</label>
        <select name="gender" value={user.gender} onChange={onChangeHandler}>
          <option value="">Select Gender</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
          <option value="other">Other</option>
        </select>

        <button className="update-btn" type="submit">Update Changes</button>
      </form>
    </div>
  );
};

export default ProfileForm;
