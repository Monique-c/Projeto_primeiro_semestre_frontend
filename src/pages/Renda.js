import React, { useState,useRef,useEffect } from "react";

// reactstrap components
import {
  Button,
  Card,
  CardImg,
  CardBody,
  CardTitle,
  CardText,
  Container,
  Row,
  Col,
} from "reactstrap";

import lottie from 'lottie-web';
import loading from '../assets/lottieJSONs/loading.json';

import '../assets/styles/homepage.css'
import '../assets/styles/renda.css'

import SemFiltro from 'assets/img/Icons/semFiltro.svg';

// core components
import Navbar from "components/Navbars/Navbar.js";
import Footer from "components/Footers/Footer.js";
import RendaFilter from "components/Cards/rendaFilter";


function Renda() {
  const [filtroAplicado, setFiltroAplicado] = useState(false);

  const [load, setLoad] = useState(false);
  const container = useRef(null);

  useEffect(() => {
    if (load === true) {
      lottie.loadAnimation({
        container: container.current,
        renderer: 'svg',
        loop: true,
        autoplay: true,
        animationData: loading
      })
    }
  }, [load]);

  return (
    <>
      <Navbar />
      <Container style={{ minHeight: '82vh' }} fluid>

        <div className='text-center my-5'>
          <span className='renda-title'>Renda</span>
        </div>

        <Row>
          <Col lg="3">
            <RendaFilter/>
          </Col>

          {load ?
            (<>
              <Col>
                <Row style={{ height: '50%', marginTop: '-4%' }} className='d-flex align-items-center mr-5'>
                  <div className="loading" ref={container} />
                </Row>
              </Col>
            </>
            ) : (
              <>
                {/* -----------------------------------------------*/}
                {filtroAplicado ?
                  (<>
                    <span>filtro aplicado :)</span>
                  </>)
                  :
                  (<>
                    <Col>
                      <Row style={{ height: '50%', marginLeft: '15%' }} className='mt-5 d-flex align-items-center mr-5'>
                        <img src={SemFiltro} width='230px' height='230px' />
                        <span id='mensagem-sem-filtro'>
                          Realize um filtro <br />
                          no lado esquerdo <br />
                          para iniciar sua busca.
                        </span>
                      </Row>
                    </Col>
                  </>)
                }
                {/*    ----------------------------------------------  */}
              </>
            )}
        </Row>
      </Container>
      <Footer />
    </>
  );
}

export default Renda;
