import React, { useState } from 'react';
import './ProfileForm.css';
import { assets } from '../../../assets/assets';

const ProfileForm = () => {
  const [image, setImage] = useState(assets.defoult_profile_icon);

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      setImage(URL.createObjectURL(file)); // Preview uploaded image
    }
  };

  return (
    <div className="profile-form">
      <div className="add-image-upload flex-col">
        {/* <p>Upload Profile Picture</p> */}
        <label htmlFor="imageUpload" className="upload-label">
          <img src={image} alt="Profile" />
        </label>
        <input
          type="file"
          id="imageUpload"
          accept="image/*"
          onChange={handleImageUpload}
          hidden
        />
      </div>

      {/* Form Fields */}
      <div className="form-container">
        <div className="input-row">
          <div className="input-group">
            <label>First Name</label>
            <input type="text" placeholder="First Name" />
          </div>
          <div className="input-group">
            <label>Last Name</label>
            <input type="text" placeholder="Last Name" />
          </div>
        </div>

        <label>Email</label>
        <input type="email" placeholder="Email" />

        <label>Phone</label>
        <input type="number" placeholder="Phone Number" />

        {/* Gender & Button in Same Row */}
        <div className="input-row">
          <div className="input-group">
            <label>Gender</label>
            <select>
              <option value="">Select Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
          </div>
          <button className="update-btn">Update Changes</button>
        </div>
      </div>
    </div>
  );
};

export default ProfileForm;
