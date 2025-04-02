import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './ProfileSettings.css';
import { assets } from '../../assets/assets';

const UserProfile = () => {
  const [showPasswordForm, setShowPasswordForm] = useState(false);
  const [admin, setAdmin] = useState({ name: '', email: '', profileImage: assets.profile_image });
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [selectedFile, setSelectedFile] = useState(null);

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

  const handlePasswordChange = async () => {
    setErrorMessage('');
    setSuccessMessage('');

    if (newPassword !== confirmPassword) {
      setErrorMessage("New passwords do not match.");
      return;
    }

    try {
      const token = localStorage.getItem('adminToken');
      const response = await axios.post(
        'http://localhost:3000/api/admin/change-password',
        { currentPassword, newPassword },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setSuccessMessage(response.data.message);
      setShowPasswordForm(false);
      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');
    } catch (error) {
      setErrorMessage(error.response?.data?.message || "An error occurred");
    }
  };

  const handleProfileUpdate = async () => {
    try {
      const token = localStorage.getItem('adminToken');
      const response = await axios.put('http://localhost:3000/api/admin/update', admin, {
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
      setAdmin({ ...admin, profileImage: response.data.profileImage });
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
          {!showPasswordForm ? (
            <>
              <img className='user-profile-avatar' src={admin.profileImage} alt='Profile' />
              <label className='user-profile-upload'>
                Upload New Picture
                <input type='file' accept='image/*' hidden onChange={handleFileUpload} />
              </label>
              <div className='user-profile-details'>
                <p><strong>Name:</strong> <input type='text' value={admin.name} onChange={(e) => setAdmin({ ...admin, name: e.target.value })} /></p>
                <p><strong>Email:</strong> <input type='email' value={admin.email} onChange={(e) => setAdmin({ ...admin, email: e.target.value })} /></p>
              </div>
              <button className='user-profile-save-btn' onClick={handleProfileUpdate}>Save Changes</button>
              <button className='user-profile-password-btn' onClick={() => setShowPasswordForm(true)}>Change Password</button>
            </>
          ) : (
            <div className='user-password-change'>
              <h3>Change Password</h3>
              {errorMessage && <p className="error-message">{errorMessage}</p>}
              {successMessage && <p className="success-message">{successMessage}</p>}
              <input type='password' placeholder='Current Password' className='user-password-input' value={currentPassword} onChange={(e) => setCurrentPassword(e.target.value)} />
              <input type='password' placeholder='New Password' className='user-password-input' value={newPassword} onChange={(e) => setNewPassword(e.target.value)} />
              <input type='password' placeholder='Confirm New Password' className='user-password-input' value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
              <div className='password-actions'>
                <button className='user-profile-password-btn' onClick={handlePasswordChange}>Update Password</button>
                <button className='user-profile-cancel-btn' onClick={() => setShowPasswordForm(false)}>Cancel</button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
