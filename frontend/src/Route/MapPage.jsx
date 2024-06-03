import React, { useEffect, useState, useRef } from "react";
import Card from "../Components/Card";
import "./map.css";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";
import Schedule from "./Schedule";
import "leaflet/dist/leaflet.css";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import { Icon, DivIcon } from "leaflet";
import axios from "axios";
import Carousel from "react-bootstrap/Carousel";
import CarouselItem from "react-bootstrap/esm/CarouselItem";

const ZOOM_LEVEL = 13;

function MapPage() {
  const map = useRef();
  const [location, setLocation] = useState({
    lat: 10.792838340026323,
    lng: 106.69810333702068,
  });
  const [showPopup, setShowPopup] = useState(false);
  const [newBin, setNewBin] = useState({
    name: "",
    address: "",
    trashPercentage: "",
    lat: "",
    lng: "",
  });
  const [bins, setBins] = useState([]);
  const [readyToCollectBins, setReadyToCollectBins] = useState([]);
  const [regularBins, setRegularBins] = useState([]);

  const options = {
    enableHighAccuracy: true,
    timeout: 5000,
    maximumAge: 0,
  };

  const customIcon = new Icon({
    iconUrl: "https://cdn-icons-png.flaticon.com/512/447/447031.png",
    iconSize: [38, 38], // size of the icon
  });

  const createDivIcon = (fullness) => {
    const className = fullness >= 80 ? "ready-to-collect-bin" : "regular-bin";
    return new DivIcon({
      className,
      html: `<div className="bin-icon ${className}">
            <svg xmlns="http://www.w3.org/2000/svg" width="35" height="35" fill="currentColor" class="bi bi-geo-alt-fill" viewBox="0 0 16 16">
                <path d="M8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10m0-7a3 3 0 1 1 0-6 3 3 0 0 1 0 6"/>
            </svg>
        </div>`,
      iconSize: [30, 42], // Adjust the size as needed
      iconAnchor: [15, 42],
    });
  };

  const success = (pos) => {
    const crd = { lat: pos.coords.latitude, lng: pos.coords.longitude };
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

  useEffect(() => {
    // Function to fetch bins from the backend
    const fetchBins = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8080/api/bin/getAllBins"
        );
        if (response.data && response.data.data && response.data.data.bins) {
          setBins(response.data.data.bins);
        }
      } catch (error) {
        console.error("Error fetching bins:", error);
      }
    };

    fetchBins();
  }, []);

  useEffect(() => {
    const updateBinCategories = () => {
      const readyToCollect = bins.filter((bin) => bin.fullness >= 80);
      const regular = bins.filter((bin) => bin.fullness < 80);
      setReadyToCollectBins(readyToCollect);
      setRegularBins(regular);
    };

    updateBinCategories();
  }, [bins]);

  const FlyToLocation = ({ location, zoom }) => {
    const map = useMap();

    useEffect(() => {
      if (map) {
        map.flyTo(location, zoom);
      }
    }, [location, zoom, map]);

    return null;
  };

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:8080/api/bin/createBin",
        newBin
      );
      if (response.data && response.data.statusCode === 200) {
        alert("Bin created successfully!");
        handlePopupClose();
        window.location.reload();
      }
    } catch (error) {
      console.error("Error creating bin:", error);
      alert("Failed to create bin. Please try again.");
    }
  };

  return (
    <div>
      <Navbar name="Collection Route Planner" />
      <div className="main">
        <div className="section">
          <div className="title">Route Map</div>
          <div className="container">
            <div className="map">
              <MapContainer
                center={location}
                zoom={ZOOM_LEVEL}
                scrollWheelZoom={false}
                ref={map}
              >
                <TileLayer
                  noWrap={false}
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <FlyToLocation location={location} zoom={ZOOM_LEVEL} />
                {bins.map((bin, index) => (
                  <Marker
                    key={index}
                    position={[bin.lat, bin.lng]}
                    icon={createDivIcon(bin.fullness)}
                  >
                    <Popup>
                      <div className="popup-title">{bin.name}</div>
                      <div className="popup-description">{bin.address}</div>
                    </Popup>
                  </Marker>
                ))}
              </MapContainer>
            </div>
          </div>
        </div>

        <div className="section">
          <div className="title">Ready-to-collect Bin</div>
          <Carousel>
            <CarouselItem>
              <div className="container">
                {readyToCollectBins.map((bin) => (
                  <div className="column" key={bin.name}>
                    <Card
                      name={bin.name}
                      address={bin.address}
                      trashPercentage={bin.fullness}
                    />
                  </div>
                ))}
              </div>
            </CarouselItem>
          </Carousel>
        </div>

        <div className="section">
          <div className="title">Bins</div>
          <Carousel></Carousel>
          <div className="container">
            {regularBins.map((bin) => (
              <div className="column" key={bin.name}>
                <Card
                  name={bin.name}
                  address={bin.address}
                  trashPercentage={bin.fullness}
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
                    <input
                      type="text"
                      name="name"
                      value={newBin.name}
                      onChange={handleInputChange}
                      required
                    />
                  </label>
                  <label>
                    Address:
                    <input
                      type="text"
                      name="address"
                      value={newBin.address}
                      onChange={handleInputChange}
                      required
                    />
                  </label>
                  <label>
                    Trash Percentage:
                    <input
                      type="number"
                      name="fullness"
                      value={newBin.fullness}
                      onChange={handleInputChange}
                      required
                    />
                  </label>
                  <label>
                    Lattitude:
                    <input
                      type="number"
                      name="lat"
                      value={newBin.lat}
                      onChange={handleInputChange}
                      required
                    />
                  </label>
                  <label>
                    Longitude:
                    <input
                      type="number"
                      name="lng"
                      value={newBin.lng}
                      onChange={handleInputChange}
                      required
                    />
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
