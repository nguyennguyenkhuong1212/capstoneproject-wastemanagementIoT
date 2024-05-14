import React, { useEffect, useState, useRef } from 'react';
import Card from '../Components/Card';
import './MapPage.css';
import pic from './holder.png';
import Navbar from '../Components/Navbar';
import Footer from '../Components/Footer';
import Schedule from './Schedule';
import "leaflet/dist/leaflet.css"
import { MapContainer, TileLayer, Marker, Popup, useMap} from "react-leaflet"

const APIkey = "5f704fb8aaca4ffca303820700c9781f"
const ZOOM_LEVEL = 13

function MapPage() {
    const map = useRef();
    // get user location
    const [location, setLocation] = useState({ lat: 10.7226964, lng: 33.7055181 });

    const options = {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 0,
    };

    const success = (pos) => {
        const crd = { lat: pos.coords.latitude, lng: pos.coords.longitude };
        console.log(crd);
        setLocation(crd);
    }
    
    const errors = (err) => {
        console.warn(`ERROR(${err.code}): ${err.message}`);
    }

    useEffect(() => {
        if (navigator.geolocation) {
          navigator.permissions
            .query({ name: "geolocation" })
            .then(function (result) {
              console.log(result);
              if (result.state === "granted") {
                //If granted then you can directly call your function here
                navigator.geolocation.getCurrentPosition(success, errors, options);
              } else if (result.state === "prompt") {
                //If prompt then the user will be asked to give permission
                navigator.geolocation.getCurrentPosition(success, errors, options);
              } else if (result.state === "denied") {
                //If denied then you have to show instructions to enable location
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

            </div>

            {/* Footer Section */}
            <div className="footer">
                <Footer />
            </div>
        </div>
    );
}

export default MapPage;
