import React from "react";
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
        
      ];

  return (
    <div className="customer-review" id="#review">
      <section className="customer-reviews">
        <h2>What Our Customers Say</h2>
        <div className="reviews-container">
          {reviews.map((review) => (
            <div key={review.id} className="review-card">
              <div className="review-header">
                <img src={review.image} alt={review.name} />
                <div>
                  <h4>{review.name}</h4>
                  <div className="stars">{"★".repeat(review.rating)}</div>
                </div>
              </div>
              <p>{review.text}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default CustomerReview;
