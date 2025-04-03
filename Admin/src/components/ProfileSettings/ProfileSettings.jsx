import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './ProfileSettings.css';
import { assets } from '../../assets/assets';

const UserProfile = () => {
  const [admin, setAdmin] = useState({
    firstName: '',
    lastName: '',
    dateOfJoining: '',
    email: '',
    mobileNumber: '',
    address: '',
    profilePic: assets.profile_image
  });

  const [selectedFile, setSelectedFile] = useState(null);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    fetchAdminDetails();
  }, []);

  const fetchAdminDetails = async () => {
    try {
      const token = localStorage.getItem('adminToken');
      const response = await axios.get('http://localhost:3000/api/admin/profile', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setAdmin(response.data);
    } catch (error) {
      console.error("Error fetching admin details", error);
    }
  };

  const handleProfileUpdate = async () => {
    try {
      const token = localStorage.getItem('adminToken');
      await axios.put('http://localhost:3000/api/admin/profile', admin, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setSuccessMessage("Profile updated successfully");
    } catch (error) {
      setErrorMessage("Failed to update profile");
    }
  };

  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    setSelectedFile(file);
    
    const formData = new FormData();
    formData.append('profileImage', file);

    try {
      const token = localStorage.getItem('adminToken');
      const response = await axios.post('http://localhost:3000/api/admin/upload-profile-pic', formData, {
        headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'multipart/form-data' }
      });
      setAdmin({ ...admin, profilePic: response.data.profileImage });
      setSuccessMessage("Profile picture updated successfully");
    } catch (error) {
      setErrorMessage("Failed to upload profile picture");
    }
  };

  return (
    <div className='user-profile-container'>
      <div className='user-profile-box'>
        <h2 className='user-profile-heading'>Profile Settings</h2>
        <div className='user-profile-content'>
          <img className='user-profile-avatar' src={admin.profilePic} alt='Profile' />
          <label className='user-profile-upload'>
            Upload New Picture
            <input type='file' accept='image/*' hidden onChange={handleFileUpload} />
          </label>
          <div className='user-profile-details'>
            <p><strong>First Name:</strong> <input type='text' value={admin.firstName} onChange={(e) => setAdmin({ ...admin, firstName: e.target.value })} /></p>
            <p><strong>Last Name:</strong> <input type='text' value={admin.lastName} onChange={(e) => setAdmin({ ...admin, lastName: e.target.value })} /></p>
            <p><strong>Date of Joining:</strong> <input type='date' value={admin.dateOfJoining} onChange={(e) => setAdmin({ ...admin, dateOfJoining: e.target.value })} /></p>
            <p><strong>Email:</strong> <input type='email' value={admin.email} disabled /></p>
            <p><strong>Mobile Number:</strong> <input type='text' value={admin.mobileNumber} onChange={(e) => setAdmin({ ...admin, mobileNumber: e.target.value })} /></p>
            <p><strong>Address:</strong> <textarea value={admin.address} onChange={(e) => setAdmin({ ...admin, address: e.target.value })}></textarea></p>
          </div>
          {successMessage && <p className="success-message">{successMessage}</p>}
          {errorMessage && <p className="error-message">{errorMessage}</p>}
          <button className='user-profile-save-btn' onClick={handleProfileUpdate}>Update Profile</button>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
