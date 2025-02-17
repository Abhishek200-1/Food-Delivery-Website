import React from "react";
import { motion } from "framer-motion";
import "./CustomerReview.css";

const CustomerReview = () => {
  const reviews = [
    {
      id: 1,
      name: "John Doe",
      image: "https://i.pravatar.cc/50?img=1",
      rating: 5,
      text: "Amazing experience! The product quality was top-notch, and the service was outstanding. Highly recommended!",
    },
    {
      id: 2,
      name: "Sarah Smith",
      image: "https://i.pravatar.cc/50?img=2",
      rating: 4,
      text: "Great product! The delivery was fast, and the packaging was excellent. Will buy again!",
    },
    {
      id: 3,
      name: "Michael Brown",
      image: "https://i.pravatar.cc/50?img=3",
      rating: 5,
      text: "Absolutely loved it! The best shopping experience I've ever had. Thank you!",
    },
    {
      id: 4,
      name: "Michael Brown",
      image: "https://i.pravatar.cc/50?img=4",
      rating: 5,
      text: "Absolutely loved it! The best shopping experience I've ever had. Thank you!",
    },
    {
      id: 5,
      name: "Michael Brown",
      image: "https://i.pravatar.cc/50?img=5",
      rating: 5,
      text: "Absolutely loved it! The best shopping experience I've ever had. Thank you!",
    },
    // {
    //   id: 6,
    //   name: "Michael Brown",
    //   image: "https://i.pravatar.cc/50?img=6",
    //   rating: 4,
    //   text: "Absolutely loved it! The best shopping experience I've ever had. Thank you!",
    // },
  ];

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
        
        <div className="reviews-container">
          {reviews.map((review, index) => (
            <motion.div
              key={review.id}
              className="review-card"
              initial={{ opacity: 0, y: 70 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{
                duration: 1.2,
                delay: index * 0.3,
                ease: "easeOut",
              }}
              viewport={{ once: true }}
              whileHover={{  transition: { duration: 0.2 } }}
            >
              <div className="review-header">
                <img src={review.image} alt={review.name} />
                <div>
                  <h4>{review.name}</h4>
                  <div className="stars">{"★".repeat(review.rating)}</div>
                </div>
              </div>
              <p>{review.text}</p>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default CustomerReview;
