import React from "react";
import { Link } from "react-router-dom";
import "./Navbar.css"; // Make sure to import your CSS

export default function Navbar() {
  return (
    <nav className="navbar">
      <div className="logo">🎬 MovieZone</div>
      <ul className="nav-links">
        <li>
          <Link to="/" className="nav-link">
            Home
          </Link>
        </li>
        <li>
          <Link to="/movies" className="nav-link">
            Movies
          </Link>
        </li>
        <li>
          <Link to="/favourites" className="nav-link">
            Favourites
          </Link>
        </li>
      </ul>
    </nav>
  );
}
