import React, { useEffect, useState } from "react";
import "./List.css";
import axios from "axios";
import { toast } from "react-toastify";

const List = ({ url }) => {
  // const url = "http://localhost:3000";
  const [list, setList] = useState([]);

  const fetchList = async () => {
    try {
      const response = await axios.get(`${url}/api/food/list`);
      // console.log(response.data)
      if (response.data.success) {
        setList(response.data.data);
        // toast.success("")
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
      await fetchList();
      if (response.data.success) {
        toast.success(response.data.success);
      } else {
        toast.error("Error removing item");
      }
    } catch (error) {
      toast.error("Request failed");
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
          <b>Action</b>
        </div>
        {list.map((item, index) => (
          <div key={index} className="list-table-format">
            <img src={`${url}/images/` + item.image} alt={item.name} />
            <p>{item.name}</p>
            <p>{item.category}</p>
            <p>&#x20B9; {item.price}</p>
            <button onClick={() => removeFood(item._id)} className="remove-btn">
              Remove
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default List;
