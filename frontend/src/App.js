import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Navbar from "./Components/Navbar";
import Card from "./Components/Card";
import MapPage from "./Route/MapPage";
import Schedule from "./Route/Schedule";
import LandingPage from "./Route/LandingPage";
import Footer from "./Components/Footer";

function App() {
  return (
    <div className="App">
      <div className="content">
      <BrowserRouter>
        <Routes>
          <Route path="map" element={<MapPage />} />
          <Route path="schedule" element={<Schedule />} />
          <Route path="/" element={<LandingPage />} />
        </Routes>
      </BrowserRouter>
      </div>
        <div className="Footer">
          <Footer />
        </div>
    </div>
  );
}

export default App;
