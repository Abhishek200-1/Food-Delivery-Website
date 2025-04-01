import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify"; 
import "./AdminFeedback.css";

const AdminFeedback = () => {
  const [feedbacks, setFeedbacks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [popupComment, setPopupComment] = useState("");
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  useEffect(() => {
    const fetchFeedbacks = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/feedback");
        setFeedbacks(response.data);
      } catch (err) {
        setError("Error fetching feedbacks");
        console.error("API Error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchFeedbacks();
  }, []);

  const handleMarkActive = async (id) => {
    try {
      const response = await axios.put(`http://localhost:3000/api/feedback/${id}/activate`);
      if (response.status === 200) {
        setFeedbacks((prevFeedbacks) =>
          prevFeedbacks.map((fb) => (fb._id === id ? { ...fb, active: true } : fb))
        );
        toast.success("Feedback marked as Active!"); // Show success toast
      }
    } catch (err) {
      console.error("Error updating feedback status:", err);
      toast.error("Error marking feedback as Active!"); // Show error toast
    }
  };

  const handleMarkInactive = async (id) => {
    try {
      const response = await axios.put(`http://localhost:3000/api/feedback/${id}/deactivate`);
      if (response.status === 200) {
        setFeedbacks((prevFeedbacks) =>
          prevFeedbacks.map((fb) => (fb._id === id ? { ...fb, active: false } : fb))
        );
        toast.success("Feedback marked as Inactive!"); // Show success toast
      }
    } catch (err) {
      console.error("Error updating feedback status:", err);
      toast.error("Error marking feedback as Inactive!"); // Show error toast
    }
  };

  const handleDelete = async (id) => {
    try {
      const response = await axios.delete(`http://localhost:3000/api/feedback/${id}`);
      if (response.status === 200) {
        setFeedbacks((prevFeedbacks) =>
          prevFeedbacks.filter((fb) => fb._id !== id)
        );
        toast.success("Feedback deleted successfully!"); // Show success toast
      }
    } catch (err) {
      console.error("Error deleting feedback:", err);
      toast.error("Error deleting feedback!"); // Show error toast
    }
  };

  const handleSeeMore = (comment) => {
    setPopupComment(comment);
    setIsPopupOpen(true);
  };

  const handleClosePopup = () => {
    setIsPopupOpen(false);
  };

  const truncateComment = (comment) => {
    return comment.length > 100 ? `${comment.substring(0, 100)}...` : comment;
  };

  return (
    <div className="admin-feedback-container">
      <h2>Customer Feedback Management</h2>
      {loading ? (
        <p>Loading feedbacks...</p>
      ) : error ? (
        <p className="error-message">{error}</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Order ID</th>
              <th>Rating</th>
              <th>Comment</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {feedbacks.map((feedback) => (
              <tr key={feedback._id}>
                <td>{feedback.orderId}</td>
                <td>{"★".repeat(feedback.rating)}</td>
                <td>
                  {truncateComment(feedback.comment)}
                  {feedback.comment.length > 100 && (
                    <button onClick={() => handleSeeMore(feedback.comment)}>
                      See More
                    </button>
                  )}
                </td>
                <td>{feedback.active ? "Active" : "Pending"}</td>
                <td>
                  {!feedback.active ? (
                    <button onClick={() => handleMarkActive(feedback._id)}>
                      Mark as Active
                    </button>
                  ) : (
                    <button onClick={() => handleMarkInactive(feedback._id)}>
                      Mark as Inactive
                    </button>
                  )}
                  <button 
                    onClick={() => handleDelete(feedback._id)} 
                    style={{ marginLeft: '10px', backgroundColor: '#dc3545' }}>
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {/* Popup for full comment */}
      {isPopupOpen && (
        <div className="popup-overlay">
          <div className="popup-container">
            <button className="close-btn" onClick={handleClosePopup}>X</button>
            <h3>Full Comment</h3>
            <p>{popupComment}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminFeedback;
