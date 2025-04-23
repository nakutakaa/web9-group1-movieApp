import React from "react"; 
import { Link } from "react-router-dom";

export default function Navbar(){
    return (
      <>
        <div className="nav"></div>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/movies">Movies</Link>
          </li>
          <li>
            <Link to="/favourites">Favourites</Link>
          </li>
        </ul>
      </>
    );
}
