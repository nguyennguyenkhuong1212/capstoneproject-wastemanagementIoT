import React, { useState, useEffect } from 'react';
import axios from 'axios';

const RouteFinder = () => {
  const backendURL = process.env.REACT_APP_BACKEND_URL
  const [travelTimeMatrix, setTravelTimeMatrix] = useState([]);
  const [route, setRoute] = useState([]);
  const [cost, setCost] = useState(0);

  useEffect(() => {
    const fetchTravelTimes = async () => {
      try {
        const response = await axios.get(`${backendURL}/get-travel-times`);
        setTravelTimeMatrix(response.data);
      } catch (error) {
        console.error("Error fetching travel times:", error);
      }
    };

    fetchTravelTimes();
  }, []);

  const findBestRoute = async () => {
    try {
      const response = await axios.post(`${backendURL}/find-route`, {
        travel_time_matrix: travelTimeMatrix
      });
      const { route, cost } = response.data;
      setRoute(route);
      setCost(cost);
    } catch (error) {
      console.error("Error finding route:", error);
    }
  };

  const locations = ['warehouse', 'cust1', 'cust2', 'cust3'];

  return (
    <div>
      <h2>Route Finder</h2>
      <button onClick={findBestRoute}>Find Best Route</button>
      {route.length > 0 && (
        <div>
          <h3>Best Route:</h3>
          <p>{route.map((i) => locations[i]).join(' -> ')}</p>
          <p>Total Travel Time: {cost} minutes</p>
        </div>
      )}
    </div>
  );
};

export default RouteFinder;
