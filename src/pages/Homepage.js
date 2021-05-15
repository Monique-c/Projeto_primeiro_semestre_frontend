import React from "react";

// reactstrap components
import { Card, CardImg, CardBody, Row, Col, Container } from "reactstrap";

import { Link } from "react-router-dom";

import "../assets/styles/homepage.css";

// core components
import Navbar from "components/Navbars/Navbar.js";
import Footer from "components/Footers/Footer.js";

import eleitorado from "../assets/img/Icons/perfilDoEleitorado.svg";
import abstencao from "../assets/img/Icons/abstenção.svg";
import renda from "../assets/img/Icons/renda.svg";

export default function Homepage() {
  return (
    <>
      <Navbar />
      <Container className="homepage-container">
        <Row>
          <Col lg="4">
            <Link to="/eleitorado">
              <Card body className="homepage-card-container">
                <CardImg
                  className="mt-2  mb-4"
                  alt="..."
                  src={eleitorado}
                  height="80"
                  width="80"
                />

                <CardBody>
                  <span className="card-title">
                    Perfil
                    <br /> do Eleitorado
                  </span>
                </CardBody>
              </Card>
            </Link>
          </Col>

          <Col lg="4">
            <Link to="/abstencao">
              <Card body className="homepage-card-container">
                <CardImg
                  className="mt-2  mb-4"
                  alt="..."
                  src={abstencao}
                  height="80"
                  width="80"
                />
                <CardBody>
                  <span className="card-title">
                    Comparecimento <br />e Abstenção
                  </span>
                </CardBody>
              </Card>
            </Link>
          </Col>

          <Col lg="4">
            <Link to="/renda">
              <Card body className="homepage-card-container">
                <CardImg
                  className="mt-2 mb-4"
                  alt="..."
                  src={renda}
                  height="80"
                  width="80"
                />
                <CardBody>
                  <span className="card-title">
                    Renda <br /> per capita
                  </span>
                </CardBody>
              </Card>
            </Link>
          </Col>
        </Row>
      </Container>
      <Footer />
    </>
  );
}
