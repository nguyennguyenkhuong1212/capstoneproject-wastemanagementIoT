import React from 'react';
import './schedule.css';

function Schedule() {
    // Example schedule data for the pickup trucks
    const scheduleData = [
        { truckNumber: 1, available: true, schedule: '8:00 AM - 10:00 AM', pickupPoint: '123 Main St' },
        { truckNumber: 2, available: false, schedule: '10:30 AM - 12:30 PM', pickupPoint: '456 Elm St' },
        { truckNumber: 3, available: true, schedule: '1:00 PM - 3:00 PM', pickupPoint: '789 Oak St' },
        // Add more data as needed
    ];

    return (
        <div className="schedule-container">
            <h2>Pickup Truck Schedule</h2>
            <table className="schedule-table">
                <thead>
                    <tr>
                        <th>Truck Number</th>
                        <th>Available</th>
                        <th>Schedule</th>
                        <th>Pickup Point</th> {/* New column for pickup point */}
                    </tr>
                </thead>
                <tbody>
                    {scheduleData.map((item) => (
                        <tr key={item.truckNumber}>
                            <td>{item.truckNumber}</td>
                            <td>{item.available ? 'Yes' : 'No'}</td>
                            <td>{item.schedule}</td>
                            <td>{item.pickupPoint}</td> {/* New cell for pickup point */}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default Schedule;
