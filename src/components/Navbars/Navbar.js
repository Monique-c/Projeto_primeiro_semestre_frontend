import React from "react";
// reactstrap components
import { Navbar, Row } from "reactstrap";

import { Link } from "react-router-dom";

import "./../../assets/styles/navbar.css";

function Example() {
  return (
    <>
      <Navbar className="bg-white navbar-container fixed-top" expand="lg">
        <Row>
          <Link to="/">
            <span className="navbar-initialPage"> PÁGINA INICIAL</span>
          </Link>
          &emsp; &emsp;
          <Link to="/eleitorado">
            <span className="navbar-items"> ELEITORADO</span>
          </Link>
          &emsp; &emsp;
          <Link to="/abstencao">
            <span className="navbar-items"> ABSTENÇÃO</span>
          </Link>
          &emsp; &emsp;
          <Link to="/renda">
            <span className="navbar-items"> RENDA </span>
          </Link>
        </Row>
      </Navbar>
    </>
  );
}

export default Example;
