import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
// import Navbar from "./Components/Navbar";
import Card from "./Components/Card";
import MapPage from "./Route/MapPage";

function App() {
  return (
    <div>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MapPage />} />
      </Routes>
    </BrowserRouter>
    </div>
  );
}

export default App;
