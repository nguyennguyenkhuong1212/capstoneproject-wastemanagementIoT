import React from "react";
import { NavLink } from "react-router-dom"; // Importing NavLink if using React Router
import "./nav.css";

function Navbar() {
  return (
    <nav className="navbar">
      <div className="first">
        <div className="logo">
          <h4>Waste Management IOT </h4>
        </div>
      </div>

      <div className="second">
        {/* Navigation links */}
        <div>
          <h7>Route map</h7>
        </div>

        <div className="nav-links">
          <NavLink to="/" className="nav-link" activeClassName="active-link">
            Home
          </NavLink>
          <NavLink to="/map" className="nav-link" activeClassName="active-link">
            Map
          </NavLink>
          <NavLink
            to="/schedule"
            className="nav-link"
            activeClassName="active-link"
          >
            Schedule
          </NavLink>
          <NavLink
            to="/contact"
            className="nav-link"
            activeClassName="active-link"
          >
            Contact
          </NavLink>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
