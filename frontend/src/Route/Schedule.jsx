import React, { useState } from "react";
import "./schedule.css";
import Navbar from "../Components/Navbar";

function Schedule() {
  const [scheduleData, setScheduleData] = useState([
    {
      truckNumber: 1,
      available: true,
      schedule: "8:00 AM - 10:00 AM",
      pickupPoint: "123 Main St",
    },
    {
      truckNumber: 2,
      available: false,
      schedule: "10:30 AM - 12:30 PM",
      pickupPoint: "456 Elm St",
    },
    {
      truckNumber: 3,
      available: true,
      schedule: "1:00 PM - 3:00 PM",
      pickupPoint: "789 Oak St",
    },
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

  return (
    <div className="main-container">
      <Navbar name="Pickup Truck Schedule" />
      <div className="schedule-container">
        <table className="schedule-table">
          <thead>
            <tr>
              <th>Truck Number</th>
              <th>Available</th>
              <th>Schedule</th>
              <th>Pickup Point</th>
            </tr>
          </thead>
          <tbody>
            {scheduleData.map((item, index) => (
              <tr key={index}>
                <td>{item.truckNumber}</td>
                <td>{item.available ? "Yes" : "No"}</td>
                <td>{item.schedule}</td>
                <td>{item.pickupPoint}</td>
              </tr>
            ))}
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
