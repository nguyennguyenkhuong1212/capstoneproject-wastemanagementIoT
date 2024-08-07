import React from "react";
import "./landingcard.css"

function LandingCard() {
  return (
    <div className="landingCard">
      <div className="landingCardText">
        <h2>Cleaning up the Danube</h2>
        <p>
          Our team is actively working to clean up the Danube River from
          pollution in order to restore its natural beauty.
        </p>
        <button>
          <div className="readMoreText">Read More</div>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="45"
            height="45"
            fill="currentColor"
            className="bi bi-arrow-up-right-circle-fill readMoreBtn"
            viewBox="0 0 16 16"
          >
            <path d="M0 8a8 8 0 1 0 16 0A8 8 0 0 0 0 8m5.904 2.803a.5.5 0 1 1-.707-.707L9.293 6H6.525a.5.5 0 1 1 0-1H10.5a.5.5 0 0 1 .5.5v3.975a.5.5 0 0 1-1 0V6.707z" />
          </svg>
        </button>
      </div>
      <div className="landingCardImg">
        <img src="https://i.imgur.com/dQm6Q0Z.jpg" alt="Danube River" />
      </div>
    </div>
  );
}

export default LandingCard;
