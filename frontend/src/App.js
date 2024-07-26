import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Loading } from 'react-loading-wrapper';
import 'react-loading-wrapper/dist/index.css';
import "./App.css";
import MapPage from "./Route/MapPage";
import Schedule from "./Route/Schedule";
import LandingPage from "./Route/LandingPage";
import Footer from "./Components/Footer";
import Guide from "./Route/Guide";
import Trash from "./Route/Trash";
import LoadingAnimation from "./Components/Loading";

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 500); 
  }, []);

  return (
    <div className="App">
      <Loading 
        loading={loading}
        fullPage
        size={100}
        speed='fast'
        loadingComponent={<LoadingAnimation />} 
      >
        <BrowserRouter>
          <div className="content">
            <Routes>
              <Route path="map" element={<MapPage />} />
              <Route path="schedule" element={<Schedule />} />
              <Route path="/" element={<LandingPage />} />
              <Route path="guide" element={<Guide />} />
              <Route path="bin" element={<Trash />} />
            </Routes>
          </div>
        </BrowserRouter>
        <Footer />
      </Loading>
    </div>
  );
}

export default App;
