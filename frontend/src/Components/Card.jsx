import React from "react";
import "./card.css";
import ProgressBar from "react-bootstrap/ProgressBar";

function Card({ name, address, trashPercentage }) {
  // Determine the color of the line based on the trash percentage
  if (!trashPercentage) {
    trashPercentage = 0;
    console.log(trashPercentage);
  }

  return (
    <div className="split-box">
      <div>
        <h5>{name}</h5>
        <p className="address">{address}</p>
        <div className="bar" >
          {trashPercentage < 80 ? (
            <ProgressBar
              now={trashPercentage}
              variant="success"
              style={{ height: "10px" }}
            />
          ) : (
            <ProgressBar
              now={trashPercentage}
              variant="danger"
              style={{ height: "10px" }}
            />
          )}
        </div>
      </div>
      <div className="bottom-bar">
        <p>{trashPercentage}% Full</p>
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" class="bi bi-arrow-clockwise" viewBox="0 0 16 16">
          <path fill-rule="evenodd" d="M8 3a5 5 0 1 0 4.546 2.914.5.5 0 0 1 .908-.417A6 6 0 1 1 8 2z"/>
          <path d="M8 4.466V.534a.25.25 0 0 1 .41-.192l2.36 1.966c.12.1.12.284 0 .384L8.41 4.658A.25.25 0 0 1 8 4.466"/>
        </svg>
      </div>
    </div>
  );
}

export default Card;
