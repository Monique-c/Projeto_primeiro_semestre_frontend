import React, { useState } from "react";

// reactstrap components
import {
  Card,
  CardImg,
  CardBody,
  Container,
  Row,
  Col,
} from "reactstrap";

import '../assets/styles/homepage.css'

// core components
import Navbar from "components/Navbars/Navbar.js";
import Footer from "components/Footers/Footer.js";

import eleitorado from '../assets/img/Icons/perfilDoEleitorado.svg';
import abstencao from '../assets/img/Icons/abstenção.svg';
import renda from '../assets/img/Icons/renda.svg';

function Homepage() {
  return (
    <>
      <Navbar />
      <div className="d-flex justify-content-center">

        <div className="homepage-container text-center">
          <Row>
            <Col lg="4">
              <a href="/eleitorado">
                <Card body className="text-center homepage-card-container">
                  <CardImg className="mt-2  mb-4" alt="..." src={eleitorado}
                    height="80" width="80"
                  />
                  <CardBody>
                    <span className='card-title'>Perfil<br /> do Eleitorado</span>
                  </CardBody>
                </Card>
              </a>
            </Col>

            <Col lg="4">
              <a href="/abstencao">
                <Card body className="text-center homepage-card-container">
                  <CardImg className="mt-2  mb-4" alt="..." src={abstencao}
                    height="80" width="80"
                  />
                  <CardBody>
                    <span className='card-title'>Comparecimento <br />e Abstenção</span>
                  </CardBody>
                </Card>
              </a>
            </Col>

            <Col lg="4">
              <a href="/renda">
                <Card body className="text-center homepage-card-container">
                  <CardImg className="mt-2 mb-4" alt="..." src={renda}
                    height="80" width="80"
                  />
                  <CardBody>
                    <span className='card-title'>Renda <br /> per capita</span>
                  </CardBody>
                </Card>
              </a>
            </Col>
          </Row>

          <Row>
            <Col lg="12">
              <a href="/relevantes">
                <Card body
                  className="text-center homepage-large-card-container ">
                  <CardBody>
                    <span className='card-title'>Graficos Relevantes</span>
                  </CardBody>
                </Card>
              </a>
            </Col>
          </Row>
        </div>
      </div>

      <Footer />
    </>
  );
}

export default Homepage;