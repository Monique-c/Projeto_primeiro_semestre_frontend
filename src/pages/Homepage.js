import React, { useState } from "react";

// reactstrap components
import {
  Card,
  CardImg,
  CardBody,
  Row,
  Col,
  Modal,
} from "reactstrap";

import "../assets/styles/homepage.css"

// core components
import Navbar from "components/Navbars/Navbar.js";
import Footer from "components/Footers/Footer.js";
import ModalFilter from "components/Cards/modalFilter";

import eleitorado from '../assets/img/Icons/perfilDoEleitorado.svg';
import abstencao from '../assets/img/Icons/abstenção.svg';
import renda from '../assets/img/Icons/renda.svg';
import lupa from '../assets/img/Icons/lupa.svg';

function Homepage() {
  const[modalIsOpen,setModalIsOpen] = useState(false);
  return (
    <>
      <Navbar />

      <div className="d-flex justify-content-center">

        <div className="homepage-container text-center">

          <Row>
           <div className="modal-container">
            <button onClick= {()=> setModalIsOpen (true)} >Procure por Cidades <img src={lupa} width='30px' height='40px' />
            </button>
             <Modal isOpen = {modalIsOpen}>
                <div className="modal-close">
                  <button onClick={() => setModalIsOpen (false)}>X</button>
                </div>
                <div className="modal-filter">
                 <ModalFilter/>
                </div>
             </Modal>
           </div>
          </Row>

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
                  <CardBody id="grafico_relevante">
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
