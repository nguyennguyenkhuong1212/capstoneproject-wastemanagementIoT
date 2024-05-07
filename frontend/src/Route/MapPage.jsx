import React from "react";
import Card from "../Components/Card";
import "./MapPage.css";
import pic from "./holder.png";
import Navbar from "../Components/Navbar";

function MapPage() {
  return (
    <div>
      <Navbar />
      <div className="main">
        <div className="section">
          <div className="title">Route Map</div>
          <div className="container">
            <img className="img" src={pic} />
          </div>
        </div>
        <div className="section">
          <div className="title">Ready-to-colect Bin</div>
          <div className="container">
            <div className="column">
              <Card
                name="Tu Du Hospital"
                address="248 Cong Quynh St., Pham Ngu Lao Ward, District 1 "
                trashPercentage={80}
              />
            </div>

            <div className="column">
              <Card
                name="Tu Du Hospital"
                address="248 Cong Quynh St., Pham Ngu Lao Ward, District 1 "
                trashPercentage={80}
              />
            </div>
            <div className="column">
              <Card
                name="Tu Du Hospital"
                address="248 Cong Quynh St., Pham Ngu Lao Ward, District 1 "
                trashPercentage={80}
              />
            </div>
          </div>
        </div>
        <div className="section">
          <div className="title">Bins</div>
          <div className="container">
            <div className="column">
              <Card
                name="Tu Du Hospital"
                address="248 Cong Quynh St., Pham Ngu Lao Ward, District 1 "
                trashPercentage={50}
              />
            </div>

            <div className="column">
              <Card
                name="Tu Du Hospital"
                address="248 Cong Quynh St., Pham Ngu Lao Ward, District 1 "
                trashPercentage={50}
              />
            </div>
            <div className="column">
              <Card
                name="Tu Du Hospital"
                address="248 Cong Quynh St., Pham Ngu Lao Ward, District 1 "
                trashPercentage={50}
              />
            </div>
          </div>
        </div>
      </div>{" "}
    </div>
  );
}

export default MapPage;
