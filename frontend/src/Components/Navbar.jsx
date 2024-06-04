import React from "react";
import { Link, NavLink } from "react-router-dom"; // Importing NavLink if using React Router
import "./nav.css";

function Navbar({ name }) {
  return (
    <nav className="navbar">
      <div className="second">
        <div className="logo">
          <NavLink to="/" className="link-logo">
            <h4>WASTE MANAGEMENT IOT</h4>
          </NavLink>
        </div>
        {/* Navigation links */}
        <div className="nav-links">
          <NavLink
            to="/"
            className="nav-link"
            activeClassName="active-link"
          >
            HOME
          </NavLink>
          <NavLink
            to="/map"
            className="nav-link"
            activeClassName="active-link"
          >
            MAP
          </NavLink>
          <NavLink
            to="/schedule"
            className="nav-link"
            activeClassName="active-link"
          >
            SCHEDULE
          </NavLink>
          <NavLink
            to="/guide"
            className="nav-link"
            activeClassName="active-link"
          >
            GUIDE
          </NavLink>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
