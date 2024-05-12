import React from "react";
import { Link, NavLink } from "react-router-dom"; // Importing NavLink if using React Router
import "./nav.css";

function Navbar({ name }) {
  return (
    <nav className="navbar">
      <div className="second">
        <div className="logo">
          <NavLink to="/" className="link-logo">
            <h4>Waste Management IOT </h4>
          </NavLink>
        </div>
        {/* Navigation links */}
        <div className="nav-links">
          {/* <NavLink to="/" className="nav-link" activeClassName="active-link">
            Home
          </NavLink> */}
          {/* <NavLink to="/map" className="nav-link" activeClassName="active-link">
            Map
          </NavLink> */}
          <NavLink
            to="/contact"
            className="nav-link"
            activeClassName="active-link"
          >
            Guide
          </NavLink>
          <NavLink
            to="/schedule"
            className="nav-link"
            activeClassName="active-link"
          >
            Schedule
          </NavLink>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
