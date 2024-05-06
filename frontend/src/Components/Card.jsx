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
        <p>{address}</p>
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
      <div>
        <p>{trashPercentage}% full</p>
      </div>
    </div>
  );
}

export default Card;
