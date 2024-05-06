import React from "react";
import "./card.css";
import ProgressBar from "react-bootstrap/ProgressBar";

function Card({ name, address, trashPercentage }) {
  // Determine the color of the line based on the trash percentage
if (!trashPercentage) {
  trashPercentage = 0;
  console.log(trashPercentage)
}

  return (
    <div className="card">
      <h3>{name}</h3>
      <p>{address}</p>
      {/* The line color changes based on the trash percentage */}
      <div>
        {trashPercentage < 80 ? (
          <ProgressBar now={0} variant="success" />
        ) : (
          <ProgressBar now={10} variant="danger" />
        )}
        
      </div>
      <ProgressBar variant="success" now={40} />
    </div>
  );
}

export default Card;
