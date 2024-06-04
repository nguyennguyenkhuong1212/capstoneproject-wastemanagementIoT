import React, { useState, useRef, useEffect } from "react";
import "./schedule.css";
import Navbar from "../Components/Navbar";

function Schedule() {
  const [currentTruck, setCurrentTruck] = useState(1)
  const [scheduleData, setScheduleData] = useState([
    {
      truckNumber: 1,
      plate: "51D-19012",
      available: true,
      schedule: [
        {
          hospitalName: "Hospital 1",
          address: "123 Main St",
          latitude: 37.7749,
          longitude: -122.4194
        },
        {
          hospitalName: "Hospital 2",
          address: "456 Elm St",
          latitude: 37.7858,
          longitude: -122.4364
        },
        {
          hospitalName: "Hospital 3",
          address: "789 Oak St",
          latitude: 37.7963,
          longitude: -122.4576
        },
        {
          hospitalName: "Hospital 4",
          address: "321 Cedar St",
          latitude: 37.8069,
          longitude: -122.4789
        }
      ],
      pickupPoint: "123 Main St",
    },
    {
      truckNumber: 2,
      plate: "51C-01704",
      available: false,
      schedule: [
        {
          hospitalName: "Hospital 5",
          address: "901 Maple St",
          latitude: 37.8175,
          longitude: -122.5002
        },
        {
          hospitalName: "Hospital 6",
          address: "111 Pine St",
          latitude: 37.8281,
          longitude: -122.5215
        }
      ],
      pickupPoint: "456 Elm St",
    }
  ]);

  const [modalOpen, setModalOpen] = useState(false);
  const [newTruck, setNewTruck] = useState({
    truckNumber: "",
    available: true,
    schedule: "",
    pickupPoint: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewTruck((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setScheduleData((prev) => [...prev, newTruck]);
    setModalOpen(false);
    setNewTruck({ truckNumber: "", available: true, schedule: "", pickupPoint: "" });
  };

  const handleChangeSelectTruck = (e) => {
    setCurrentTruck(e.target.value)
  }

  return (
    <div className="main-container">
      <Navbar name="Pickup Truck Schedule" />
      <div className="truckSelect">
        <div className="truckSelectText">Select Truck: </div>
        <select name="truck" onChange={handleChangeSelectTruck}>
          {scheduleData.map((truck, index) => {
            return (<option key={index} value={truck.truckNumber}>{truck.plate}</option>)
          })}
        </select>
      </div>
      
      <div className="schedule-container">
        <table className="schedule-table">
          <thead>
            <tr>
              <th>Location</th>
              <th>Address</th>
              <th style={{width: "100px"}}>Collected(?)</th>
            </tr>
          </thead>
          <tbody>
            {
              scheduleData.filter((truck) => Number(truck.truckNumber) === Number(currentTruck))[0]
                ?.schedule
                ?.map((location, index) => (
                  <tr key={index}>
                    <td>{location.hospitalName}</td>
                    <td>{location.address}</td>
                    <td style={{textAlign: "center", paddingBottom: "10px"}}><input type="checkbox" /></td>
                  </tr>
                )) || (
                  <tr>
                    <td colSpan={3}>No schedule found</td>
                  </tr>
                )
            }
          </tbody>
        </table>
      </div>
      <button className="add-button" onClick={() => setModalOpen(true)}>+</button>
      {modalOpen && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={() => setModalOpen(false)}>&times;</span>
            <h2>Add New Schedule</h2>
            <form onSubmit={handleSubmit}>
              <label>
                Truck Number:
                <input
                  type="number"
                  name="truckNumber"
                  value={newTruck.truckNumber}
                  onChange={handleInputChange}
                  required
                />
              </label>
              <br />
              <label>
                Available:
                <select
                  name="available"
                  value={newTruck.available}
                  onChange={handleInputChange}
                  required
                >
                  <option value={true}>Yes</option>
                  <option value={false}>No</option>
                </select>
              </label>
              <br />
              <label>
                Schedule:
                <input
                  type="text"
                  name="schedule"
                  value={newTruck.schedule}
                  onChange={handleInputChange}
                  required
                />
              </label>
              <br />
              <label>
                Pickup Point:
                <input
                  type="text"
                  name="pickupPoint"
                  value={newTruck.pickupPoint}
                  onChange={handleInputChange}
                  required
                />
              </label>
              <br />
              <button type="submit">Add Schedule</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default Schedule;
