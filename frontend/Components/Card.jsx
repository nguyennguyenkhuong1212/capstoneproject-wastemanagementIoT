import React from 'react';
import './card.css';

function Card({ name, address, trashPercentage }) {
  // Determine the color of the line based on the trash percentage
  const lineColor = trashPercentage > 80 ? 'red' : 'green';

  return (
    <div className="card">
      <h3>{name}</h3>
      <p>Address: {address}</p>
      <p>Trash Percentage: {trashPercentage}%</p>
      {/* The line color changes based on the trash percentage */}
      <div className="line" style={{ backgroundColor: lineColor }}></div>
    </div>
  );
}

export default Card;