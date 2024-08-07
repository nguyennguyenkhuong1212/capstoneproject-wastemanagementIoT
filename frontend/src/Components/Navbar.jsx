import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom"; // Importing NavLink if using React Router
import "./nav.css";

function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

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
    <>
      <div className={`fade modal-backdrop ${isMobileMenuOpen ? "show" : "hide"}`}></div>
      <nav className="navbar">
        <div className="divider">
          <div className="logo">
            <a href="/" className="link-logo">
              <h4>WASTE MANAGEMENT IOT</h4>
            </a>
          </div>
          <div className="mobile-menu-button" onClick={toggleMobileMenu}>
            <div className="menu-icon"></div>
            <div className="menu-icon"></div>
            <div className="menu-icon"></div>
          </div>
          {/* Navigation links */}
          <div className={`nav-links ${isMobileMenuOpen ? "mobile-open" : ""}`}>
            <NavLink to="/" className={`nav-link${isMobileMenuOpen ? "-mobile" : ""}`} activeClassName="active-link">
              HOME
            </NavLink>
            <NavLink to="/map" className={`nav-link${isMobileMenuOpen ? "-mobile" : ""}`} activeClassName="active-link">
              MAP
            </NavLink>
            {/* <NavLink
              to="/schedule"
              className={`nav-link${isMobileMenuOpen ? "-mobile" : ""}`}
              activeClassName="active-link"
            >
              SCHEDULE
            </NavLink> */}
            <NavLink
              to="/guide"
              className={`nav-link${isMobileMenuOpen ? "-mobile" : ""}`}
              activeClassName="active-link"
            >
              GUIDE
            </NavLink>
            <NavLink
              to="/bin"
              className={`nav-link${isMobileMenuOpen ? "-mobile" : ""}`}
              activeClassName="active-link"
            >
              BIN
            </NavLink>
            <div className={`nav-mobile-close-btn ${isMobileMenuOpen ? "show" : "hide"}`} onClick={toggleMobileMenu}>
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-x-lg" viewBox="0 0 16 16">
                <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8z"/>
              </svg>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}

export default Navbar;
