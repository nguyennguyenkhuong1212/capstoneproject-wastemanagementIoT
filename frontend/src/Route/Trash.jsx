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
        const response = await fetch(`${backendURL}/api/fullness`);
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
          <svg width="300" height="300" viewBox="0 0 300 300" className="trashIcon">
            <defs>
              <clipPath id="clipPath">
                {/* Define a clipping path to fill the icon */}
                <rect x="0" y={`${100 - fullness}%`} width="300" height={`${fullness}%`} />
              </clipPath>
            </defs>
            {/* Background of the trash icon */}
            <path
              d="M 289.2857 18.75 H 208.9286 l -6.2946 -10.957 A 16.0714 14.0625 0 0 0 188.2366 0 H 111.6964 a 15.8839 13.8984 0 0 0 -14.3304 7.793 L 91.0714 18.75 H 10.7143 A 10.7143 9.375 0 0 0 0 28.125 v 18.75 a 10.7143 9.375 0 0 0 10.7143 9.375 h 278.5714 a 10.7143 9.375 0 0 0 10.7143 -9.375 V 28.125 a 10.7143 9.375 0 0 0 -10.7143 -9.375 z M 35.625 273.6328 a 32.1429 28.125 0 0 0 32.0759 26.3672 h 164.5982 a 32.1429 28.125 0 0 0 32.0759 -26.3672 L 278.5714 75 H 21.4286 z"
              fill="lightgrey"
            />
            {/* Fill based on fullness */}
            <path
              d="M 289.2857 18.75 H 208.9286 l -6.2946 -10.957 A 16.0714 14.0625 0 0 0 188.2366 0 H 111.6964 a 15.8839 13.8984 0 0 0 -14.3304 7.793 L 91.0714 18.75 H 10.7143 A 10.7143 9.375 0 0 0 0 28.125 v 18.75 a 10.7143 9.375 0 0 0 10.7143 9.375 h 278.5714 a 10.7143 9.375 0 0 0 10.7143 -9.375 V 28.125 a 10.7143 9.375 0 0 0 -10.7143 -9.375 z M 35.625 273.6328 a 32.1429 28.125 0 0 0 32.0759 26.3672 h 164.5982 a 32.1429 28.125 0 0 0 32.0759 -26.3672 L 278.5714 75 H 21.4286 z"
              fill="green"
              clipPath="url(#clipPath)"
            />
          </svg>
          <div className="fullness-text">{fullness}%</div>
        </div>
      </div>
    </div>
  );
};

export default Trash;
