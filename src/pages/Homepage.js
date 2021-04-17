import React from "react";

// reactstrap components
import {
  Card,
  CardImg,
  CardBody,
  Row,
  Col
} from "reactstrap";

import { Link } from "react-router-dom";

import "../assets/styles/homepage.css"

// core components
import Navbar from "components/Navbars/Navbar.js";
import Footer from "components/Footers/Footer.js";
import ModalFilter from "components/Cards/modalFilter";

import eleitorado from '../assets/img/Icons/perfilDoEleitorado.svg';
import abstencao from '../assets/img/Icons/abstenção.svg';
import renda from '../assets/img/Icons/renda.svg';
import lupa from '../assets/img/Icons/lupa.svg';

export default function Homepage() {
  return (
    <>
      <Navbar />

      <div className="d-flex justify-content-center">

        <div className="homepage-container text-center">

          <Row>
            <Col lg="4">
              <Link to="/eleitorado">
                <Card body className="text-center homepage-card-container">
                  <CardImg className="mt-2  mb-4" alt="..." src={eleitorado}
                    height="80" width="80"
                  />

                  <CardBody>
                    <span className='card-title'>Perfil<br /> do Eleitorado</span>
                  </CardBody>
                </Card>
              </Link>
            </Col>

            <Col lg="4">
              <Link to="/abstencao">
                <Card body className="text-center homepage-card-container">
                  <CardImg className="mt-2  mb-4" alt="..." src={abstencao}
                    height="80" width="80"
                  />
                  <CardBody>
                    <span className='card-title'>Comparecimento <br />e Abstenção</span>
                  </CardBody>
                </Card>
              </Link>
            </Col>

            <Col lg="4">
              <Link to="/renda">
                <Card body className="text-center homepage-card-container">
                  <CardImg className="mt-2 mb-4" alt="..." src={renda}
                    height="80" width="80"
                  />
                  <CardBody>
                    <span className='card-title'>Renda <br /> per capita</span>
                  </CardBody>
                </Card>
              </Link>
            </Col>
          </Row>

          <Row>
            <Col lg="12">
              <Link to="/relevantes">
                <Card body
                  className="text-center homepage-large-card-container ">
                  <CardBody id="grafico_relevante">
                    <span className='card-title'>Graficos Relevantes</span>
                  </CardBody>
                </Card>
              </Link>
            </Col>
          </Row>
        </div>
      </div>

      <Footer />
    </>
  );
}


