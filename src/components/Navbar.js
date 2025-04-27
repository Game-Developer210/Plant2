import React, { useState } from "react";
import "./Navbar.css";
import { Link, NavLink } from "react-router-dom";
import logo from '../image/myPlant-nobg.webp'

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav>
      <Link to="/">
      <img style={{width: '70px'}} src={logo} alt="my plant logo"></img>
      </Link>
      <div className="navbar" onClick={() => setMenuOpen(!menuOpen)}>
        <span></span>
        <span></span>
        <span></span>
      </div>
      <div className="navbar"></div>
      <ul className={menuOpen ? "open" : ""}>
        <li>
          <NavLink to="/">Home</NavLink>
        </li>
        <li>
          <NavLink to="/identify">Find Your Plant</NavLink>
        </li>
        <li>
          <NavLink to="/Library">Library</NavLink>
        </li>
        <li>
          <NavLink to="/Camera">Camera</NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
