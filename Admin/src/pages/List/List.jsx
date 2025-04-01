import React, { useState, useEffect } from "react";
import "./List.css";
import axios from "axios";
import { toast } from "react-toastify";

const List = ({ url }) => {
  const [list, setList] = useState([]);
  const [editData, setEditData] = useState(null);
  const [showEditForm, setShowEditForm] = useState(false);

  const fetchList = async () => {
    try {
      const response = await axios.get(`${url}/api/food/list`);
      if (response.data.success) {
        setList(response.data.data);
      } else {
        toast.error("Data not found");
      }
    } catch (error) {
      toast.error("Error fetching data");
    }
  };

  const removeFood = async (foodid) => {
    try {
      const response = await axios.post(`${url}/api/food/remove`, { id: foodid });
      if (response.data.success) {
        toast.success(response.data.message);
        fetchList();
      } else {
        toast.error("Error removing item");
      }
    } catch (error) {
      toast.error("Request failed");
    }
  };

  const editFood = (item) => {
    setEditData(item);
    setShowEditForm(true);
  };

  const closeEditForm = () => {
    setShowEditForm(false);
    setEditData(null);
  };

  const handleEditSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("id", editData._id);
    formData.append("name", editData.name);
    formData.append("description", editData.description);
    formData.append("price", Number(editData.price));
    formData.append("category", editData.category);
    if (editData.image instanceof File) {
      formData.append("image", editData.image);
    }

    try {
      const response = await axios.post(`${url}/api/food/update`, formData);
      if (response.data.success) {
        toast.success("Food item updated successfully");
        fetchList();
        closeEditForm();
      } else {
        toast.error("Error updating item");
      }
    } catch (error) {
      toast.error("Update request failed");
    }
  };

  useEffect(() => {
    fetchList();
  }, []);

  return (
    <div className="list add flex-col">
      <p>All Food List</p>
      <div className="list-table">
        <div className="list-table-format title">
          <b>Image</b>
          <b>Name</b>
          <b>Category</b>
          <b>Price</b>
          <b>Actions</b>
        </div>
        {list.map((item, index) => (
          <div key={index} className="list-table-format">
            <img src={`${url}/images/` + item.image} alt={item.name} />
            <p>{item.name}</p>
            <p>{item.category}</p>
            <p>&#x20B9; {item.price}</p>
            <div className="actions">
              <button onClick={() => editFood(item)} className="edit-btn">
                Edit
              </button>
              <button onClick={() => removeFood(item._id)} className="remove-btn">
                Remove
              </button>
            </div>
          </div>
        ))}
      </div>
      {showEditForm && (
        <div className="edit-popup">
          <div className="edit-container">
            <h3>Edit Food Item</h3>
            <form onSubmit={handleEditSubmit} className="edit-form">
              <label>Product Name</label>
              <input type="text" value={editData.name} onChange={(e) => setEditData({...editData, name: e.target.value})} required />
              <label>Product Description</label>
              <textarea value={editData.description} onChange={(e) => setEditData({...editData, description: e.target.value})} required></textarea>
              <label>Product Category</label>
              <select value={editData.category} onChange={(e) => setEditData({...editData, category: e.target.value})}>
                <option value="Salad">Salad</option>
                <option value="Rolls">Rolls</option>
                <option value="Deserts">Deserts</option>
                <option value="Sandwich">Sandwich</option>
                <option value="Cake">Cake</option>
                <option value="Pure Veg">Pure Veg</option>
                <option value="Pasta">Pasta</option>
                <option value="Noodles">Noodles</option>
              </select>
              <label>Product Price</label>
              <input type="number" value={editData.price} onChange={(e) => setEditData({...editData, price: e.target.value})} required />
              <label>Upload New Image (Optional)</label>
              <input type="file" onChange={(e) => setEditData({...editData, image: e.target.files[0]})} />
              <div className="edit-buttons">
                <button type="submit" className="save-btn">Save</button>
                <button type="button" className="cancel-btn" onClick={closeEditForm}>Cancel</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default List;
