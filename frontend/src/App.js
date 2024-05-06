import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";

import Card from "./Components/Card";
import ProgressBar from "react-bootstrap/ProgressBar";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <Card
              name="Tu Du Hospital"
              address="248 Cong Quynh St., Pham Ngu Lao Ward, District 1 "
              trashPercentage={80}
            />
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
