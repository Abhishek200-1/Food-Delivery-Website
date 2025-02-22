import React, { useState } from 'react';
import './MyAddress.css';

const MyAddress = () => {
  const [addresses, setAddresses] = useState([
    {
      id: 1,
      name: "John Doe",
      phone: "9876543210",
      address: "123, Green Street, Mumbai",
      pincode: "400001",
      isDefault: true
    },
    {
      id: 2,
      name: "Jane Smith",
      phone: "9865321470",
      address: "45, Blue Lane, Bangalore",
      pincode: "560001",
      isDefault: false
    }
  ]);

  const [newAddress, setNewAddress] = useState({
    name: "",
    phone: "",
    address: "",
    pincode: ""
  });

  const [showForm, setShowForm] = useState(false);

  // Handle input change
  const handleChange = (e) => {
    setNewAddress({ ...newAddress, [e.target.name]: e.target.value });
  };

  // Add new address
  const addAddress = () => {
    if (newAddress.name && newAddress.phone && newAddress.address && newAddress.pincode) {
      setAddresses([...addresses, { ...newAddress, id: addresses.length + 1, isDefault: false }]);
      setNewAddress({ name: "", phone: "", address: "", pincode: "" });
      setShowForm(false);
    }
  };

  // Remove an address
  const removeAddress = (id) => {
    setAddresses(addresses.filter((address) => address.id !== id));
  };

  return (
    <div className="my-address">
      {/* Title & Add Address Button at the Top */}
      <div className="address-header">
        <h2>Manage Address</h2>
        <button className="add-address-btn" onClick={() => setShowForm(true)}>
          + Add Address
        </button>
      </div>

      {/* Address List */}
      <div className="address-list">
        {addresses.map((address) => (
          <div key={address.id} className={`address-card ${address.isDefault ? 'default' : ''}`}>
            <div className="address-details">
              <p className="address-name">{address.name}</p>
              <p className="address-text">{address.phone}</p>
              <p className="address-text">{address.address}</p>
              <p className="address-text">Pincode: {address.pincode}</p>
            </div>
            <button className="remove-btn" onClick={() => removeAddress(address.id)}>Remove</button>
          </div>
        ))}
      </div>

      {/* Address Form Modal */}
      {showForm && (
        <div className="address-modal">
          <div className="address-form">
            <h3>Add New Address</h3>
            <input type="text" name="name" placeholder="Full Name" value={newAddress.name} onChange={handleChange} />
            <input type="text" name="phone" placeholder="Phone Number" value={newAddress.phone} onChange={handleChange} />
            <textarea name="address" placeholder="Complete Address" value={newAddress.address} onChange={handleChange}></textarea>
            <input type="text" name="pincode" placeholder="Pincode" value={newAddress.pincode} onChange={handleChange} />
            <div className="address-actions">
              <button className="save-btn" onClick={addAddress}>Save Address</button>
              <button className="cancel-btn" onClick={() => setShowForm(false)}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyAddress;
