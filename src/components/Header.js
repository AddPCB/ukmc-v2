import React from "react";
import Navbar from "./Navbar";
import "../css/Header.css";
import logos from "../assets/logos.png";

const Header = () => {
  return (
    <header className="Header">
      <figure className="logosbox">
        <img src={logos} alt="logo" className="logos" />
      </figure>
      <Navbar />
    </header>
  );
};

export default Header;