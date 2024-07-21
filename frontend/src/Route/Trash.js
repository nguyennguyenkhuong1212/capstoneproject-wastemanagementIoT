import React, { useState, useEffect } from 'react';
import './trash.css';
import { FaTrash } from 'react-icons/fa';
import Navbar from '../Components/Navbar';

const Trash = () => {
  const [fullness, setFullness] = useState(0);
  const backendURL = process.env.REACT_APP_BACKEND_URL

  useEffect(() => {
    const fetchFullnessData = async () => {
      try {
        const response = await fetch(`${backendURL}}/api/fullness`);
        const data = await response.json();
        setFullness(data.fullness);
      } catch (error) {
        console.error('Error fetching fullness data:', error);
      }
    };

    const intervalId = setInterval(fetchFullnessData, 10000);

    fetchFullnessData();

    return () => clearInterval(intervalId);
  }, []);

  const handleInputChange = (e) => {
    const value = e.target.value;
    const numericValue = Math.min(100, Math.max(0, Number(value)));
    setFullness(numericValue);
  };

  return (
    <div>
      <Navbar />
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
