import React from 'react';
import { NavLink } from 'react-router-dom'; // Importing NavLink if using React Router
import './nav.css';

function Navbar() {
  return (
    <nav className="navbar">
      {/* Logo */}
      <div className="logo">
        <img src="/path-to-logo.png" alt="Logo" />
      </div>

      {/* Navigation links */}
      <div className="nav-links">
        <NavLink to="/" className="nav-link" activeClassName="active-link">Home</NavLink>
        <NavLink to="/map" className="nav-link" activeClassName="active-link">Map</NavLink>
        <NavLink to="/schedule" className="nav-link" activeClassName="active-link">Schedule</NavLink>
        <NavLink to="/contact" className="nav-link" activeClassName="active-link">Contact</NavLink>
      </div>
    </nav>
  );
}

export default Navbar;
