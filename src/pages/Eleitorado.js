import React, { useState, useEffect, useRef } from "react";

// reactstrap components
import {
  Button,
  Container,
  Card,
  Row,
  Col,
  Form,
  FormGroup,
  Input,
  FormText,
  Label,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  UncontrolledDropdown
} from "reactstrap";

import lottie from 'lottie-web';
import loading from '../assets/lottieJSONs/loading.json';

import '../assets/styles/eleitorado.css';

import SemFiltro from 'assets/img/Icons/semFiltro.svg';

// core components
import Navbar from "components/Navbars/Navbar.js";
import Footer from "components/Footers/Footer.js";
import EleitoradoFilter from 'components/Cards/eleitoradoFilter';

function Eleitorado() {
  const [filtroAplicado, setFiltroAplicado] = useState(false);

  // tentativa lixo de implementar loading kk
  const [load, setLoad] = useState(false);
  const container = useRef(null);

  const data = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
    datasets:[
      {
        backgroundColor: 'rgba(255,99,132,0.2)',
        borderColor: 'rgba(255,99,132,1)',
        borderWidth: 1,
        hoverBackgroundColor: 'rgba(255,99,132,0.4)',
        hoverBorderColor: 'rgba(255,99,132,1)',
        data: [65, 59, 80, 81, 56, 55, 40],
      }
    ]
  }

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
          <span className='title'> Perfil do Eleitorado </span>
        </div>

        <Col>
         <data/>        
        </Col>

        <Row>
          <Col lg='3'>
            <EleitoradoFilter />
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
                {/* -----------------------------------------------    
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

export default Eleitorado;