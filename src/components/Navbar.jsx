import React from "react"; 
import { Link, useLocation } from "react-router-dom";

export default function Navbar() {
  const location = useLocation();
    return (
      
      <div className="nav">
        <ul>
          <li>
            <Link to="/" className={location.pathname === "/" ? "active" : ""}>
              Home
            </Link>
          </li>
          <li>
            <Link
              to="/non-favorites"
              className={location.pathname === "/movies" ? "active" : ""}
            >
              Non-favorites
            </Link>
          </li>
          <li>
            <Link
              to="/favourites"
              className={location.pathname === "/favourites" ? "active" : ""}
            >
              Favourites
            </Link>
          </li>
        </ul>
      </div>
    );
}
