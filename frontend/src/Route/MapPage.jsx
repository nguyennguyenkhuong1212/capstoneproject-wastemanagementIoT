import React from 'react';
import Card from '../Components/Card';
import './MapPage.css';
import pic from './holder.png';
import Navbar from '../Components/Navbar';
import Footer from '../Components/Footer';
import Schedule from './Schedule';

function MapPage() {
    // Example bins data
    const binsData = [
        {
            name: 'Tu Du Hospital',
            address: '248 Cong Quynh St., Pham Ngu Lao Ward, District 1',
            trashPercentage: 80
        },
        {
            name: 'Hospital A',
            address: '789 Street, Ward 5, District 3',
            trashPercentage: 85
        },
        {
            name: 'Market B',
            address: '456 Road, Ward 4, District 5',
            trashPercentage: 30
        },
        {
            name: 'Building C',
            address: '123 Avenue, Ward 1, District 10',
            trashPercentage: 45
        }
    ];

    // Separate the bins based on trash percentage
    const readyToCollectBins = binsData.filter(bin => bin.trashPercentage >= 80);
    const regularBins = binsData.filter(bin => bin.trashPercentage < 80);

    return (
        <div>
            <Navbar name="Collection Route Planner" />
            <div className="main">
                {/* Route Map Section */}
                <div className="section">
                    <div className="title">Route Map</div>
                    <div className="container">
                        <img className="img" src={pic} alt="Route Map" />
                    </div>
                </div>

                {/* Ready-to-collect Bin Section */}
                <div className="section">
                    <div className="title">Ready-to-collect Bin</div>
                    <div className="container">
                        {readyToCollectBins.map(bin => (
                            <div className="column" key={bin.name}>
                                <Card
                                    name={bin.name}
                                    address={bin.address}
                                    trashPercentage={bin.trashPercentage}
                                />
                            </div>
                        ))}
                    </div>
                </div>

                {/* Bins Section */}
                <div className="section">
                    <div className="title">Bins</div>
                    <div className="container">
                        {regularBins.map(bin => (
                            <div className="column" key={bin.name}>
                                <Card
                                    name={bin.name}
                                    address={bin.address}
                                    trashPercentage={bin.trashPercentage}
                                />
                            </div>
                        ))}
                    </div>
                </div>

                {/* Schedule Section */}
                <Schedule />

            </div>

            {/* Footer Section */}
            <div className="footer">
                <Footer />
            </div>
        </div>
    );
}

export default MapPage;
