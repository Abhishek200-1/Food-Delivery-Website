import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import './ProfileSettings.css';
import { assets } from '../../assets/assets';

const UserProfile = () => {
  const [showPasswordForm, setShowPasswordForm] = useState(false);

  const [admin, setAdmin] = useState({
    firstName: '',
    lastName: '',
    dateOfJoining: '',
    email: '',
    mobileNumber: '',
    address: '',
    profilePic: assets.profile_image
  });

  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  useEffect(() => {
    fetchAdminDetails();
  }, []);

  const fetchAdminDetails = async () => {
    try {
      const token = localStorage.getItem('adminToken');
      const response = await axios.get('http://localhost:3000/api/admin/profile', {
        headers: { Authorization: `Bearer ${token}` }
      });

      // Convert ISO date to yyyy-MM-dd
      const date = new Date(response.data.dateOfJoining);
      const formattedDate = date.toISOString().split('T')[0];

      setAdmin({
        ...response.data,
        dateOfJoining: formattedDate,
        profilePic: response.data.profilePic || assets.profile_image,
      });
    } catch (error) {
      console.error("Error fetching admin details", error);
    }
  };

  const handleProfileUpdate = async () => {
    try {
      const token = localStorage.getItem('adminToken');
      const { firstName, lastName, dateOfJoining, mobileNumber, address } = admin;

      await axios.put(
        'http://localhost:3000/api/admin/profile',
        { firstName, lastName, dateOfJoining, mobileNumber, address },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      toast.success("Profile details updated successfully!");
      setSuccessMessage("Profile updated successfully");
    } catch (error) {
      setErrorMessage("Failed to update profile");
      console.error("Profile update failed:", error);
    }
  };

  const handlePasswordChange = async () => {
    setErrorMessage('');
    setSuccessMessage('');
  
    // 🛑 New: Check for empty fields
    if (!currentPassword || !newPassword || !confirmPassword) {
      setErrorMessage("All password fields are required.");
      return;
    }
  
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
      toast.success("Password updated successfully!");
      setShowPasswordForm(false);
      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');
    } catch (error) {
      setErrorMessage(error.response?.data?.message || "An error occurred");
    }
  };

  return (
    <div className='user-profile-container'>
      <h2 className='user-profile-heading'>Profile Settings</h2>
      <div className='user-profile-content'>
        {!showPasswordForm ? (
          <>
            <img className='user-profile-avatar' src={admin.profilePic} alt='Profile' />
            <div className='user-profile-details'>
              <div className="input-row">
                <div className="input-group">
                  <label>First Name:</label>
                  <input
                    type='text'
                    value={admin.firstName}
                    onChange={(e) => setAdmin({ ...admin, firstName: e.target.value })}
                  />
                </div>
                <div className="input-group">
                  <label>Last Name:</label>
                  <input
                    type='text'
                    value={admin.lastName}
                    onChange={(e) => setAdmin({ ...admin, lastName: e.target.value })}
                  />
                </div>
              </div>

              <div className="input-row">
                <div className="input-group">
                  <label>Date of Joining:</label>
                  <input
                    type='date'
                    value={admin.dateOfJoining}
                    onChange={(e) => setAdmin({ ...admin, dateOfJoining: e.target.value })}
                  />
                </div>
                <div className="input-group">
                  <label>Email:</label>
                  <input
                    type='email'
                    value={admin.email}
                    disabled
                  />
                </div>
              </div>

              <div className="input-group">
                <label>Mobile Number:</label>
                <input
                  type='text'
                  value={admin.mobileNumber}
                  onChange={(e) => setAdmin({ ...admin, mobileNumber: e.target.value })}
                />
              </div>

              <div className="input-group">
                <label>Address:</label>
                <textarea
                  value={admin.address}
                  onChange={(e) => setAdmin({ ...admin, address: e.target.value })}
                ></textarea>
              </div>
            </div>

            <div className="button-container">
              <button className='user-profile-save-btn' onClick={handleProfileUpdate}>Update Profile</button>
              <button className='user-profile-password-btn' onClick={() => setShowPasswordForm(true)}>Change Password</button>
            </div>
          </>
        ) : (
          <div className='user-password-change'>
            <h3>Change Password</h3>
            {errorMessage && <p className="error-message">{errorMessage}</p>}
            {successMessage && <p className="success-message">{successMessage}</p>}
            <input
              type='password'
              placeholder='Current Password'
              className='user-password-input'
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
            />
            <input
              type='password'
              placeholder='New Password'
              className='user-password-input'
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
            />
            <input
              type='password'
              placeholder='Confirm New Password'
              className='user-password-input'
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
            <div className='password-actions'>
              <button className='user-profile-password-btn' onClick={handlePasswordChange}>Update Password</button>
              <button className='user-profile-cancel-btn' onClick={() => setShowPasswordForm(false)}>Cancel</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserProfile;
