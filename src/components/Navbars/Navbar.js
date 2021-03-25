import React from "react";
// reactstrap components
import {

  NavbarBrand,
  Navbar,
  NavItem,
  NavLink,
  Nav,
  Container,
  Row,
  Col
} from "reactstrap";

import './../../assets/styles/navbar.css';

function Example() {
  return (
    <>
      <Navbar style={{ height: '88px' }} className="bg-white navbar-container">
        <Row>
          <a href="/">
            <span className="navbar-initialPage"> PÁGINA INICIAL</span>
          </a>
          &emsp; &emsp;

          <a href="/eleitorado">
            <span className="navbar-items"> ELEITORADO</span>
          </a>
          &emsp; &emsp;

          <a href="/abstencao">
            <span className="navbar-items"> ABSTENÇÃO</span>
          </a>
          &emsp; &emsp;

          <a href="/renda">
            <span className="navbar-items"> RENDA </span>
          </a>
          &emsp; &emsp;

          <a href="/relevantes">
            <span className="navbar-items"> GRÁFICOS RELEVANTES </span>
          </a>
        </Row>
      </Navbar>
    </>
  );
}

export default Example;