import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
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
      toast.success("Password updated successfully!");
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
      await axios.put('http://localhost:3000/api/admin/profile', admin, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setSuccessMessage("Profile updated successfully");
      toast.success("Profile details updated successfully!");
    } catch (error) {
      setErrorMessage("Failed to update profile");
    }
  };

  return (
    <div className='user-profile-container'>
      <div className='user-profile-box'>
        <h2 className='user-profile-heading'>Profile Settings</h2>
        <div className='user-profile-content'>
          {!showPasswordForm ? (
            <>
              <img className='user-profile-avatar' src={assets.profile_image} alt='Profile' />
              <div className='user-profile-details'>
                <p><strong>First Name:</strong> <input type='text' value={admin.firstName} onChange={(e) => setAdmin({ ...admin, firstName: e.target.value })} /></p>
                <p><strong>Last Name:</strong> <input type='text' value={admin.lastName} onChange={(e) => setAdmin({ ...admin, lastName: e.target.value })} /></p>
                <p><strong>Date of Joining:</strong> <input type='date' value={admin.dateOfJoining} onChange={(e) => setAdmin({ ...admin, dateOfJoining: e.target.value })} /></p>
                <p><strong>Email:</strong> <input type='email' value={admin.email} disabled /></p>
                <p><strong>Mobile Number:</strong> <input type='text' value={admin.mobileNumber} onChange={(e) => setAdmin({ ...admin, mobileNumber: e.target.value })} /></p>
                <p><strong>Address:</strong> <textarea value={admin.address} onChange={(e) => setAdmin({ ...admin, address: e.target.value })}></textarea></p>
              </div>
              <button className='user-profile-save-btn' onClick={handleProfileUpdate}>Update Profile</button>
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