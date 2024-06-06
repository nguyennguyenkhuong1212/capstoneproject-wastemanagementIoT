import React from "react";
import Navbar from "../Components/Navbar";
import BannerBackground from "../Assets/Image.png";
import BannerImage from "../Assets/BannerImage.png";
import "./landing.css";
import { FiArrowRight } from "react-icons/fi";
import Teaminfo from "./TeamInfo";
function LandingPage() {
  return (
    <>
      <Navbar />
      <div className="home-container">
        <div className="home-banner-container">
          <div className="home-bannerImage-container">
            <img src={BannerBackground} alt="" style={{transform: "translateX(40px)"}}/>
          </div>
          <div className="home-text-section">
            <h1 className="primary-heading">
              Optimize Waste Collection, Reduce Costs
            </h1>
            <p className="primary-text">
              Revolutionizing waste management with the power of IoT. Discover
              how our innovative solution uses sensors and data to optimize
              waste collection and create a cleaner future.
            </p>
            <button className="secondary-button">
              Get Started <FiArrowRight />{" "}
            </button>
          </div>
          <div className="home-image-section">
            <img src={BannerImage} alt="" />
          </div>
        </div>
      </div>
      <div className="teaminfo_section">
        <Teaminfo/>
      </div>
    </>
  );
}

export default LandingPage;
