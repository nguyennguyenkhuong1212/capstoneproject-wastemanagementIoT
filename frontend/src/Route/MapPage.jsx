import React, { useEffect, useState, useRef } from 'react';
import Card from '../Components/Card';
import './map.css';
import Navbar from '../Components/Navbar';
import Footer from '../Components/Footer';
import Schedule from './Schedule';
import "leaflet/dist/leaflet.css"
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";

const ZOOM_LEVEL = 13;

function MapPage() {
    const map = useRef();
    const [location, setLocation] = useState({ lat: 10.7226964, lng: 106.7055181 });
    const [showPopup, setShowPopup] = useState(false);
    const [newBin, setNewBin] = useState({ name: '', address: '', trashPercentage: '' });

    const options = {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 0,
    };

    const success = (pos) => {
        const crd = { lat: pos.coords.latitude, lng: pos.coords.longitude };
        console.log(crd);
        setLocation(crd);
    };
    
    const errors = (err) => {
        console.warn(`ERROR(${err.code}): ${err.message}`);
    };

    useEffect(() => {
        if (navigator.geolocation) {
            navigator.permissions
                .query({ name: "geolocation" })
                .then(function (result) {
                    console.log(result);
                    if (result.state === "granted") {
                        navigator.geolocation.getCurrentPosition(success, errors, options);
                    } else if (result.state === "prompt") {
                        navigator.geolocation.getCurrentPosition(success, errors, options);
                    } else if (result.state === "denied") {
                        console.log("Geolocation permission denied");
                    }
                });
        } else {
            console.log("Geolocation is not supported by this browser.");
        }
    }, []);

    const FlyToLocation = ({ location, zoom }) => {
        const map = useMap();
    
        useEffect(() => {
            if (map) {
                map.flyTo(location, zoom);
            }
        }, [location, zoom, map]);
    
        return null;
    };

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

    const readyToCollectBins = binsData.filter(bin => bin.trashPercentage >= 80);
    const regularBins = binsData.filter(bin => bin.trashPercentage < 80);

    const handleAddBinClick = () => {
        setShowPopup(true);
    };

    const handlePopupClose = () => {
        setShowPopup(false);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewBin({ ...newBin, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('New Bin:', newBin);
        // Add logic to save the new bin information
        handlePopupClose();
    };

    return (
        <div>
            <Navbar name="Collection Route Planner" />
            <div className="main">
                <div className="section">
                    <div className="title">Route Map</div>
                    <div className="container">
                        <div className="map">
                            <MapContainer center={location} zoom={ZOOM_LEVEL} scrollWheelZoom={false} ref={map}>
                                <TileLayer
                                    noWrap={false}
                                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                                />
                                <FlyToLocation location={location} zoom={ZOOM_LEVEL} />
                            </MapContainer>
                        </div>
                    </div>
                </div>

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
                        <div className="column">
                            <div className="add-bin-card" onClick={handleAddBinClick}>
                                <div className="plus-icon">+</div>
                            </div>
                        </div>
                    </div>
                    {showPopup && (
                        <div className="popup">
                            <div className="popup-content">
                                <form onSubmit={handleSubmit}>
                                    <label>
                                        Bin Name:
                                        <input type="text" name="name" value={newBin.name} onChange={handleInputChange} required />
                                    </label>
                                    <label>
                                        Address:
                                        <input type="text" name="address" value={newBin.address} onChange={handleInputChange} required />
                                    </label>
                                    <label>
                                        Trash Percentage:
                                        <input type="number" name="trashPercentage" value={newBin.trashPercentage} onChange={handleInputChange} required />
                                    </label>
                                    <button type="submit">Finish</button>
                                </form>
                                <button onClick={handlePopupClose}>Close</button>
                            </div>
                        </div>
            )}
                </div>
            </div>
        </div>
    );
}

export default MapPage;
