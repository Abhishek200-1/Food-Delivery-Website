import React, { useState } from "react";
import "./AddCategory.css";
import axios from "axios";
import { toast } from "react-toastify";

const AddCategory = ({ url, updateCategories }) => {
  const [categoryName, setCategoryName] = useState("");

  const handleAddCategory = async (event) => {
    event.preventDefault();

    if (!categoryName.trim()) {
      toast.error("Category name cannot be empty");
      return;
    }

    try {
      const response = await axios.post(`${url}/api/category/add`, {
        name: categoryName,
      });

      if (response.data.success) {
        toast.success("Category added successfully");
        setCategoryName("");
        updateCategories(); // Refresh the category list in the parent component
      } else {
        toast.error("Failed to add category");
      }
    } catch (error) {
      toast.error("Error adding category: " + error.message);
    }
  };

  return (
    <div className="add-category-container">
      <h3>Add New Category</h3>
      <form onSubmit={handleAddCategory} className="add-category-form">
        <input
          type="text"
          placeholder="Enter category name"
          value={categoryName}
          onChange={(e) => setCategoryName(e.target.value)}
          required
        />
        <button type="submit" className="add-category-button">Add</button>
      </form>
    </div>
  );
};

export default AddCategory;
