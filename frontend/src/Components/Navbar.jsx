import React, { useState, useEffect } from "react";
import { Link, NavLink } from "react-router-dom"; // Importing NavLink if using React Router
import "./nav.css";

function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  // Close the mobile menu if the screen is resized to be wider than 768px
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 768) {
        setIsMobileMenuOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <nav className="navbar">
      <div className="second">
        <div className="logo">
          <NavLink to="/" className="link-logo">
            <h4>WASTE MANAGEMENT IOT</h4>
          </NavLink>
        </div>
        <div className="mobile-menu-button" onClick={toggleMobileMenu}>
          <div className="menu-icon"></div>
          <div className="menu-icon"></div>
          <div className="menu-icon"></div>
        </div>
        {/* Navigation links */}
        <div className={`nav-links ${isMobileMenuOpen ? "mobile-open" : ""}`}>
          <NavLink to="/" className="nav-link" activeClassName="active-link">
            HOME
          </NavLink>
          <NavLink to="/map" className="nav-link" activeClassName="active-link">
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
