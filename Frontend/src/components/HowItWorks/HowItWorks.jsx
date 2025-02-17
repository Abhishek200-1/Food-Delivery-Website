import React from "react";
import "./HowItWorks.css";
import { assets } from "../../assets/assets";

const HowItWorks = () => {

  // Step data with images
  const steps = [
    {
      id: 1,
      image: assets.howitworks_img1,
      title: "Pick Meals",
      description: "Choose your meals from our diverse menu. Find low carbs & veggie options."
    },
    {
      id: 2,
      image: assets.howitworks_img2,
      title: "Choose How Often",
      description: "Our team of chefs do the prep work no more choppinf, measuring, or sink full of dishes."
    },
    {
      id: 3,
      image: assets.howitworks_img3,
      title: "Fast Deliveries",
      description: "Your freshly prepped 15-min food arrive on your doorstep in a well packed Container."
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
