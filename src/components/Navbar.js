import React from "react";
// reactstrap components
import { Navbar, Row } from "reactstrap";

import { Link, useRouteMatch } from "react-router-dom";

import "../assets/styles/navbar.css";

function Example() {
  function MenuLink({ label, to }) {
    let match = useRouteMatch({
      path: to,
    });
    return (
      <Link to={to}>
        <span className={match ? "active" : "no-active"}> {label} </span>
      </Link>
    );
  }

  return (
    <>
      <Navbar className="bg-white navbar-container fixed-top" expand="lg">
        <Row>
          <div className="navbar-initialPage">
            <MenuLink to="/home" label="Página Inicial" />
          </div>
          <MenuLink to="/eleitorado" label="Eleitorado" />
          <MenuLink to="/abstencao" label="Comparecimento/Abstenção" />
          <MenuLink to="/renda" label="Renda" />
        </Row>
      </Navbar>
    </>
  );
}

export default Example;
