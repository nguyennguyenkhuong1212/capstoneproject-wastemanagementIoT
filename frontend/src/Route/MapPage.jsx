import React, { useEffect, useState, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "./map.css";
import Navbar from "../Components/Navbar";
import 'leaflet-routing-machine/dist/leaflet-routing-machine.css';
import "leaflet/dist/leaflet.css";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import L, { Icon, DivIcon } from "leaflet";
import "leaflet-routing-machine";
import axios from "axios";
import BinCarousel from "../Components/BinCarousel";
import e from "cors";

const BASE_URL = process.env.REACT_APP_ROUTING_URL;
const ZOOM_LEVEL = 13;
const ACCESS_TOKEN = 'pk.eyJ1IjoidG9naWFoeSIsImEiOiJjbHd3NThyeXgwdWE0MnFxNXh3MzF4YjE3In0.Ikxdlh66ijGULuZhR3QaMw'; // Your Mapbox access token
const BIN_ID = '66ac9524a6f4888fcfe0030a';

function MapPage() {
  const [titleSolution, setTitleSolution] = useState("None");
  const [runOption, setRunOption] = useState("Run 1");
  const [binMap, setBinMap] = useState([]);
  const [showMap, setShowMap] = useState(false);
  const navigate = useNavigate();
  const currentLocation = useLocation();
  const [run1Bins, setRun1Bins] = useState([]);
  const [run2Bins, setRun2Bins] = useState([]);
  const [totalDistance, setTotalDistance] = useState(0);
  const [totalTime, setTotalTime] = useState(0);

  const handleChangeSelectTitleSolution = (e) => {
    setTitleSolution(e.target.value);
  };

  const handleRunOptionChange = (e) => {
    setRunOption(e.target.value);
  };

  const [scheduleData, setScheduleData] = useState([
    // Schedule data here...
  ]);

  const backendURL = process.env.REACT_APP_BACKEND_URL;
  const mapRef = useRef(null);
  const routingControlRef = useRef(null);
  const [location, setLocation] = useState({ lat: 10.792838340026323, lng: 106.69810333702068 });
  const [showPopup, setShowPopup] = useState(false);
  const [newBin, setNewBin] = useState({ name: "", address: "", trashPercentage: "", lat: "", lng: "" });
  const [bins, setBins] = useState([]);
  const [readyToCollectBins, setReadyToCollectBins] = useState([]);
  const [regularBins, setRegularBins] = useState([]);
  const [isRotating, setIsRotating] = useState(false);

  const options = { enableHighAccuracy: true, timeout: 5000, maximumAge: 0 };

  const createNumberedIcon = (number) => {
    return new DivIcon({
      className: 'custom-div-icon',
      html: `<div style="background-color: blue; color: white; border-radius: 50%; text-align: center; width: 24px; height: 24px; line-height: 24px;">${number}</div>`,
      iconSize: [24, 24],
    });
  };

  const customIcon = new Icon({
    iconUrl: "https://cdn-icons-png.flaticon.com/512/447/447031.png",
    iconSize: [38, 38],
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
      iconSize: [30, 42],
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
      navigator.permissions.query({ name: "geolocation" }).then(function (result) {
        if (result.state === "granted") {
          navigator.geolocation.getCurrentPosition(success, errors, options);
        } else if (result.state === "prompt") {
          navigator.geolocation.getCurrentPosition(success, errors, options);
        } else if (result.state === "denied") {
          console.error("Geolocation permission denied");
        }
      });
    } else {
      console.error("Geolocation is not supported by this browser.");
    }
  }, []);

  useEffect(() => {
    const fetchBins = async () => {
      try {
        const response = await axios.get(`${backendURL}/api/bin/getAllBins`);
        if (response.data && response.data.data && response.data.data.bins) {
          setBins(response.data.data.bins);
        }
      } catch (error) {
        console.error("Error fetching bins:", error);
      }
    };

    fetchBins();
  }, []);

  const updateBin = async () => {
    setIsRotating(!isRotating);
    const delay = ms => new Promise(resolve => setTimeout(resolve, ms));
    try {
      await delay(2000);
      // Fetch data from Twilio
      const twilioResponse = await axios.get(`${backendURL}/api/fullness`);
      const fullnessData = Math.round(twilioResponse.data.fullness);

      // Update the specific bin with the new data
      const updateResponse = await axios.put(`${backendURL}/api/bin/updateBin`, {
        id: BIN_ID,
        newInfo: {
          fullness: fullnessData,
        },
      });
      window.location.reload();

      if (updateResponse.data && updateResponse.data.status === 'success') {
        // alert("Bin updated successfully!");
      } else {
        // alert("Failed to update bin.");
      }
    } catch (error) {
      // console.error("Error updating bin:", error);
      // alert("An error occurred while updating the bin.");
    }
  };

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
      const response = await axios.post(`${backendURL}/api/bin/createBin`, newBin);
      if (response.data && response.data.statusCode === 200) {
        alert("Bin created successfully!");
        handlePopupClose();
        window.location.reload();
      }
    } catch (error) {
      console.error("Error creating bin:", error);
      alert("Failed to create bin. Please try again.");
      window.location.reload();
    }
  };

  const fetchFilteredBins = async () => {
    try {
      const response = await axios.post(`${BASE_URL}/filter-bins-by-weight`, readyToCollectBins);
      if (response.data && response.data.filtered_bins) {
        setBinMap(response.data.filtered_bins);
        setTotalDistance(response.data.filteredDistance);
        setTotalTime(response.data.filteredCost);
      }
    } catch (error) {
      console.error("Error filtering bins:", error);
      alert("Failed to filter bins. Please try again.");
    }
  };

  const fetchOptimizedRoute = async () => {
    try {
      const response = await axios.post(`${BASE_URL}/optimize-route`, readyToCollectBins);
      if (response.data && response.data.optimized_bins) {
        setBinMap(response.data.optimized_bins);
        setTotalDistance(response.data.distance);
        setTotalTime(response.data.cost);
      }
    } catch (error) {
      console.error("Error fetching optimized route:", error);
      alert("Failed to fetch optimized route. Please try again.");
    }
  };

  const fetchBaselineRoute = async () => {
    try {
      const response = await axios.post(`${BASE_URL}/baseline-route`, readyToCollectBins);
      if (response.data && response.data.optimized_bins) {
        setBinMap(response.data.optimized_bins);
        setTotalDistance(response.data.distance);
        setTotalTime(response.data.cost);
      }
    } catch (error) {
      console.error("Error fetching baseline route:", error);
      alert("Failed to fetch baseline route. Please try again.");
    }
  };

  const fetchOptimizedMultiTrip = async () => {
    try {
      const response = await axios.post(`${BASE_URL}/multi-run-route`, readyToCollectBins);
      if (response.data) {
        if (runOption === "Run 1" && response.data.Run1) {
          setBinMap(response.data.Run1);
          setTotalDistance(response.data.Run1Distance);
          setTotalTime(response.data.Run1Time);
        } else if (runOption === "Run 2" && response.data.Run2) {
          setBinMap(response.data.Run2);
          setTotalDistance(response.data.Run2Distance);
          setTotalTime(response.data.Run2Time);
        } else {
          setTotalDistance(0);
          setTotalTime(0);
        }
      } else {
        setTotalDistance(0);
        setTotalTime(0);
      }
    } catch (error) {
      console.error("Error fetching optimized multi-trip route:", error);
      alert("Failed to fetch optimized multi-trip route. Please try again.");
    }
  };
  

  useEffect(() => {
    if (titleSolution === "optimized") {
      fetchOptimizedRoute();
    } else if (titleSolution === "optimized2") {
      fetchFilteredBins();
    } else if (titleSolution === "baseline") {
      fetchBaselineRoute();
    } else if (titleSolution === "Optimized Multi Trip") {
      fetchOptimizedMultiTrip();
    } else if (titleSolution === "None" && routingControlRef.current) {
      routingControlRef.current.getPlan().setWaypoints([]);
      mapRef.current.removeControl(routingControlRef.current);
      routingControlRef.current = null;
    }
  }, [titleSolution, runOption, run1Bins, run2Bins]);

  useEffect(() => {
    const handleNavigation = (e) => {
      if (showMap) {
        e.preventDefault();
        setTitleSolution("None");
        setTimeout(() => {
          setShowMap(false);
          navigate(e.target.getAttribute("href"));
        }, 100);
      }
    };

    const navLinks = document.querySelectorAll("a");
    navLinks.forEach((link) => {
      link.addEventListener("click", handleNavigation);
    });

    return () => {
      navLinks.forEach((link) => {
        link.removeEventListener("click", handleNavigation);
      });
    };
  }, [showMap, navigate]);

  const RoutingControl = () => {
    const map = useMap();

    useEffect(() => {
      if (!map) return;

      if (routingControlRef.current) {
        routingControlRef.current.getPlan().setWaypoints([]);
        map.removeControl(routingControlRef.current);
        routingControlRef.current = null;
      }

      if (titleSolution === "None") {
        return;
      }

      const waypoints = binMap.map((bin) => L.latLng(parseFloat(bin.lat), parseFloat(bin.lng)));

      if (waypoints.length < 2) {
        console.log('Not enough waypoints to create a route');
        return;
      }

      const router = L.Routing.mapbox(ACCESS_TOKEN, {
        alternatives: true,
        profile: 'mapbox/driving',
      });

      const routingControl = L.Routing.control({
        waypoints,
        router,
        createMarker: function (i, wp) {
          const marker = L.marker(wp.latLng, { icon: createNumberedIcon(i + 1) }).bindPopup(binMap[i]?.name || "Bin");
          return marker;
        },
        routeWhileDragging: false,
      }).addTo(map);

      routingControlRef.current = routingControl;

      routingControl.on('routesfound', function (e) {
        const routes = e.routes;
        routes.forEach((route, index) => {
          if (index > 0) {
            L.Routing.line(route, {
              styles: [{ color: 'green', weight: 4, opacity: 0.7 }],
            }).addTo(map);
          }
        });
      });

      return () => {
        if (routingControlRef.current) {
          routingControlRef.current.getPlan().setWaypoints([]);
          map.removeControl(routingControlRef.current);
          routingControlRef.current = null;
        }
      };
    }, [map, binMap, titleSolution]);

    return null;
  };

  useEffect(() => {
    return () => {
      setTitleSolution("None");
      if (mapRef.current) {
        mapRef.current.eachLayer((layer) => {
          mapRef.current.removeLayer(layer);
        });
        if (routingControlRef.current) {
          routingControlRef.current.getPlan().setWaypoints([]);
          mapRef.current.removeControl(routingControlRef.current);
          routingControlRef.current = null;
        }
      }
    };
  }, []);

  const handleToggleMap = () => {
    setTitleSolution("None");
    setTimeout(() => {
      setShowMap(!showMap);
    }, 100);
  };

  return (
    <div>
      <Navbar name="Collection Route Planner" />
      <div className="map-container">
        <button className="hide-map-btn" onClick={handleToggleMap}>
          {showMap ? "Hide Map" : "Show Map"}
        </button>
        {showMap && (
          <div className="section">
            <div className="title">Route Map</div>
            <div className="routeMap">
              <div className="routeMapContainer">
                <div className="routeMapLabel">Select Solution:</div>
                <select
                  name="titleSolution"
                  onChange={handleChangeSelectTitleSolution}
                >
                  <option value="None">None</option>
                  <option value="baseline">Baseline</option>
                  <option value="optimized">Optimized</option>
                  <option value="optimized2">Optimized Weight</option>
                  <option value="Optimized Multi Trip">
                    Optimized Multi Trip
                  </option>
                </select>
              </div>
              {titleSolution === "Optimized Multi Trip" && (
                <>
                  <div className="routeMapContainer">
                    <div className="routeMapLabel">Select Run for Truck:</div>
                    <select name="runOption" onChange={handleRunOptionChange}>
                      <option value="Run 1">Truck 1</option>
                      <option value="Run 2">Truck 2</option>
                    </select>
                  </div>
                </>
              )}
            </div>
            <div className="route-info">
              <div className="route-info-section">
                <div className="route-info-title">Total Distance:</div>
                {totalDistance.toFixed(2)} km
              </div>
              <div className="route-info-section">
                <div className="route-info-title">Total Time:</div>
                {totalTime.toFixed(2)} minutes
              </div>
            </div>
            <div className="container">
              <div className="map">
                <MapContainer
                  center={location}
                  zoom={ZOOM_LEVEL}
                  scrollWheelZoom={true}
                  zoomControl={false}
                  whenCreated={(mapInstance) => {
                    mapRef.current = mapInstance;
                  }}
                >
                  <TileLayer
                    noWrap={false}
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  />
                  <FlyToLocation location={location} zoom={ZOOM_LEVEL} />
                  {bins.map((bin, index) => (
                    <Marker
                      key={index}
                      position={[parseFloat(bin.lat), parseFloat(bin.lng)]}
                      icon={createDivIcon(bin.fullness)}
                    >
                      <Popup>
                        <div className="popup-title">{bin.name}</div>
                        <div className="popup-description">{bin.address}</div>
                      </Popup>
                    </Marker>
                  ))}
                  <RoutingControl />
                </MapContainer>
              </div>
            </div>
          </div>
        )}

        <div className="section">
          <div className="sectionTop">
            <div className="title">Ready-to-collect Bin</div>
            <svg
              onClick={updateBin}
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="18"
              fill="currentColor"
              className={`update-bin-btn bi bi-arrow-clockwise ${
                isRotating ? "self-rotate" : ""
              }`}
              viewBox="0 0 16 16"
            >
              <path
                fill-rule="evenodd"
                d="M8 3a5 5 0 1 0 4.546 2.914.5.5 0 0 1 .908-.417A6 6 0 1 1 8 2z"
              />
              <path d="M8 4.466V.534a.25.25 0 0 1 .41-.192l2.36 1.966c.12.1.12.284 0 .384L8.41 4.658A.25.25 0 0 1 8 4.466" />
            </svg>
          </div>
          <div className="container">
            <BinCarousel readyToCollectBins={readyToCollectBins}></BinCarousel>
          </div>
        </div>

        <div className="section">
          <div className="title">Bins</div>
          <div className="container">
            <BinCarousel readyToCollectBins={regularBins}></BinCarousel>
          </div>
        </div>

        <div className="section">
          <div className="title">Add New Bins</div>
          <div className="container">
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
                  Latitude:
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
  );
}

export default MapPage;
