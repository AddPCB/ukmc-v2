import React from "react";
import { Navbar as BootstrapNavbar, Nav } from "react-bootstrap";
import { Link } from "react-router-dom";
import Authbar from "./Authbar";

const Navbar = () => {

  return (
    <article className="navbox">
      <aside className="tagbar">
        <span className="w">UK-Legal</span>
        <span className="pb">CBPM Patients & Caregivers</span>
        <span className="w">Online Social Club</span>
      </aside>
      <BootstrapNavbar>
        <Nav>
          <Nav.Link as={Link} to="/">
            Home
          </Nav.Link>
          <Nav.Link as={Link} to="/news">
            News
          </Nav.Link>
          <Nav.Link as={Link} to="/events">
            Events
          </Nav.Link>
          <Nav.Link as={Link} to="/eligibility">
            Eligibility
          </Nav.Link>
          <Nav.Link as={Link} to="/guide">
            Guide
          </Nav.Link>
        </Nav>
      <Authbar />
      </BootstrapNavbar>
    </article>
  );
};

export default Navbar;
