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

import './../../assets/styles/navbar.css'

function Example() {
  return (
    <>
      <Navbar style={{ height: '88px' }} className="bg-white navbar-container">
        <Row>
          <Col sm={{ size: 'auto' }}>
            <a href="/">
              <span className="navbar-initialPage">PÁGINA INICIAL</span>
            </a>
          </Col>

          <Col>
            <a href="/">
              <span className="navbar-items"> ELEITORADO </span>
            </a>
          </Col>

          <Col>
            <a href="/">
              <span className="navbar-items"> ABSTENÇÃO </span>
            </a>
          </Col>

          <Col>
            <a href="/">
              <span className="navbar-items"> RENDA </span>
            </a>
          </Col>
        </Row>
      </Navbar>
    </>
  );
}

export default Example;