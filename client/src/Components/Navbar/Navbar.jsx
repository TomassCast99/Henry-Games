import React from "react";
import { Link } from "react-router-dom";
import Search from "../SearchBar/Search";

import "./Navbar.css";

export default function Navbar({ setCurrentPage }) {
  return (
    <div className="nav-container" margin="0px">
      <Link to="/">
        <button className="log-out">Log Out</button>
      </Link>
      <div className="tittle2">Henry Games</div>
      <Search setCurrentPage={setCurrentPage} />
      <Link to={"/videogame"}>
        <button className="create-game">Create Videogame</button>
      </Link>
    </div>
  );
}
