import React from "react";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";
import BannerBackground from "../Assets/Image.png";
import BannerImage from "../Assets/BannerImage.png";
import "./landing.css";
import { FiArrowRight } from "react-icons/fi";

function LandingPage() {
  return (
    <div>
      <div className="home-container">
        <Navbar />
        <div className="home-banner-container">
          <div className="home-bannerImage-container">
            <img src={BannerBackground} alt="" />
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
    </div>
  );
}

export default LandingPage;
