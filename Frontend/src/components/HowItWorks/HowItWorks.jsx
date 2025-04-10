import React from "react";
import "./HowItWorks.css";
import { assets } from "../../assets/assets";

const HowItWorks = () => {

  // Step data with images
  const steps = [
    {
      id: 1,
      image: assets.howitworks_img1,
      title: "Pick Your Meals",
      description: "Browse our diverse menu and select your favorite dishes — including low-carb, vegan, and chef specials."
    },
    {
      id: 2,
      image: assets.howitworks_img2,
      title: "Set Your Schedule",
      description: "Choose how often you want meals. Our chefs handle all the prep — no chopping, measuring, or mess."
    },
    {
      id: 3,
      image: assets.howitworks_img3,
      title: "Get It Delivered",
      description: "Enjoy fast and fresh deliveries right to your doorstep in eco-friendly, sealed containers."
    }
  ];  

  return (
    <div className="how-it-works-container">
      <p className="works-title">Works</p>
      <h2 className="title">How It Works</h2>
      <p className="description">
        It's through mistakes that you actually can grow you get rid of everithing that is <br />not essential to makihave to get bad.
      </p>
      <div className="steps-container">
        {steps.map((step) => (
          <div key={step.id} className="step-card">
            {/* Render images if it's an array */}
            {Array.isArray(step.images) ? (
              <div className="step-images">
                {step.images.map((image, index) => (
                  <img key={index} src={image} alt={`${step.title} - ${index}`} className="step-image" />
                ))}
              </div>
            ) : (
              <img src={step.image} alt={step.title} className="step-image" />
            )}
            <h3 className="step-title">{step.title}</h3>
            <p className="step-description">{step.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HowItWorks;
