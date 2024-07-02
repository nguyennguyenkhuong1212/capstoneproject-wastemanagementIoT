import React, { useEffect, useState, useRef } from "react";
import "./map.css";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";
import Schedule from "./Schedule";
import 'leaflet-routing-machine/dist/leaflet-routing-machine.css';
import "leaflet/dist/leaflet.css";
import { MapContainer, TileLayer, Marker, Popup, useMap, useMapEvents } from "react-leaflet";
import L, { Icon, DivIcon } from "leaflet";
import "leaflet-routing-machine";
import axios from "axios";
import BinCarousel from "../Components/BinCarousel";

const ZOOM_LEVEL = 13;
const ACCESS_TOKEN = 'pk.eyJ1IjoidG9naWFoeSIsImEiOiJjbHd3NThyeXgwdWE0MnFxNXh3MzF4YjE3In0.Ikxdlh66ijGULuZhR3QaMw'; // Your Mapbox access token

function MapPage() {
  const [currentTruck, setCurrentTruck] = useState(1);
  const handleChangeSelectTruck = (e) => {
    setCurrentTruck(e.target.value);
  };
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

  const backendURL = process.env.REACT_APP_BACKEND_URL;
  const mapRef = useRef(null);  // Define the map reference
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
          `${backendURL}/api/bin/getAllBins`
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
      console.log(readyToCollectBins);
    };

    updateBinCategories();
  }, [bins]);
  // useEffect(() => {
  //   // Use test data instead of fetching from backend
  //   const testBins = [
  //     { name: "Bin 1", lat: 10.762622, lng: 106.660172, fullness: 90 },
  //     { name: "Bin 2", lat: 10.776889, lng: 106.700806, fullness: 85 },
  //     { name: "Bin 3", lat: 10.762622, lng: 106.700806, fullness: 75 },
  //     { name: "Bin 4", lat: 10.776889, lng: 106.660172, fullness: 60 },
  //   ];
  //   setBins(testBins);
  //   const readyToCollect = testBins.filter((bin) => bin.fullness >= 80);
  //   const regular = testBins.filter((bin) => bin.fullness < 80);
  //   setReadyToCollectBins(readyToCollect);
  //   setRegularBins(regular);
  // }, []);

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
        `${backendURL}/api/bin/createBin`,
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
      window.location.reload()
    }
  };

  const RoutingControl = () => {
    const map = useMapEvents({
      load: () => {
        console.log('Map loaded:', map);
        setupRouting(map);
      },
    });

    useEffect(() => {
      if (map) {
        setupRouting(map);
      }
    }, [map, bins]);

    const setupRouting = (map) => {
      if (!map || bins.length === 0) return;

      // const validBins = bins.filter(bin => bin.lat && bin.lng); // Ensure all coordinates are valid
      const waypoints = bins.map(bin => L.latLng(parseFloat(bin.lat), parseFloat(bin.lng)));

      console.log('Waypoints:', waypoints); // Debugging

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
        createMarker: function () {
          return null;
        },
        routeWhileDragging: true,
      }).addTo(map);

      routingControl.on('routesfound', function (e) {
        const routes = e.routes;
        const routeSum = routes[0].summary;

        alert(
          'Total distance is ' +
            (routeSum.totalDistance / 1000).toFixed(2) +
            ' km and total time is ' +
            Math.round(routeSum.totalTime / 60) +
            ' minutes'
        );

        // setRouteSummary(routeSummaryRef.current);

        routes.forEach((route, index) => {
          if (index > 0) {
            L.Routing.line(route, {
              styles: [
                { color: index === 0 ? 'blue' : 'green', weight: 4, opacity: 0.7 },
              ],
            }).addTo(map);
          }
        });
      });

      return () => {
        map.removeControl(routingControl);
      };
    };

    return null;
  };

  return (
    <div>
      <Navbar name="Collection Route Planner" />
      <div className="main">
        <div className="section">
          <div className="title">Route Map</div>
          <div className="truckSelect_routemap">
            <div className="truckSelectText_routemap">Select Truck: </div>
            <select name="truck" onChange={handleChangeSelectTruck}>
              {scheduleData.map((truck, index) => {
              return (<option key={index} value={truck.truckNumber}>{truck.plate}</option>)
              })}
             </select>
          </div>
          <div className="container">
            <div className="map">
              <MapContainer
                center={location}
                zoom={ZOOM_LEVEL}
                scrollWheelZoom={false}
                whenCreated={mapInstance => mapRef.current = mapInstance}
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

        <div className="section">
          <div className="title">Ready-to-collect Bin</div>
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
