import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import "./CustomerReview.css";

const CustomerReview = () => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFeedback = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/feedback");
        console.log(response.data);  // Log the response data to verify it
        // Filter only active feedbacks
        const activeFeedbacks = response.data.filter(feedback => feedback.active === true);
        setReviews(activeFeedbacks);
      } catch (error) {
        console.error("Error fetching feedback:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchFeedback();
  }, []);

  return (
    <div className="customer-review" id="review">
      <section className="customer-reviews">
        <motion.h2
          initial={{ opacity: 0, y: -50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
        >
          What Our Customers Say
        </motion.h2>

        {loading ? (
          <p>Loading feedback...</p>
        ) : (
          <div className="reviews-container">
            {reviews.length > 0 ? (
              reviews.map((review, index) => (
                <motion.div
                  key={review._id}
                  className="review-card"
                  initial={{ opacity: 0, y: 70 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 1.2, delay: index * 0.3, ease: "easeOut" }}
                  viewport={{ once: true }}
                  whileHover={{ transition: { duration: 0.2 } }}
                >
                  <div className="review-header">
                    <img
                      src={`https://i.pravatar.cc/50?u=${review._id}`}
                      alt={review.userName || "User"}
                    />
                    <div>
                      <h4>{review.userName || "Anonymous"}</h4>
                      <div className="stars">{"★".repeat(review.rating)}</div>
                    </div>
                  </div>
                  <p>{review.comment}</p>
                </motion.div>
              ))
            ) : (
              <p>No active feedback available yet.</p>
            )}
          </div>
        )}
      </section>
    </div>
  );
};

export default CustomerReview;
