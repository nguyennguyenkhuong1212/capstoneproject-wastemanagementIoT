import React, { useState } from 'react';
import './trash.css';
import { FaTrash } from 'react-icons/fa';
import Navbar from '../Components/Navbar';
const Trash = () => {
  const [fullness, setFullness] = useState(0);

  const handleInputChange = (e) => {
    const value = e.target.value;
    const numericValue = Math.min(100, Math.max(0, Number(value))); // Ensure the value stays between 0 and 100
    setFullness(numericValue);
  };

  return (
    <div>
        <Navbar/>
        <div className="trash-container">
        <div className="input-container">
            <label htmlFor="fullness-input">Set Fullness Percentage:</label>
            <input
            type="number"
            id="fullness-input"
            value={fullness}
            onChange={handleInputChange}
            min="0"
            max="100"
            />
        </div>
        <div className="trash-icon">
            <FaTrash className="icon" />
            <div className="percentage" style={{ height: `${fullness}%` }}></div>
            <div className="fullness-text">{fullness}%</div>
        </div>
        </div>
    </div>
  );
};

export default Trash;
