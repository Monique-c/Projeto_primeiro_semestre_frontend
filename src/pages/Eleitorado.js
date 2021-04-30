import React, { useState, useEffect, useRef } from "react";
// reactstrap components
import {
  Container,
  Row,
  Col
} from "reactstrap";

import lottie from "lottie-web";
import loading_lottie from "../assets/lottieJSONs/loading_lottie.json";

import "../assets/styles/eleitorado.css";
import  {HorizontalBar } from "react-chartjs-2";

import SemFiltro from "assets/img/Icons/semFiltro.svg";

// core components
import Navbar from "components/Navbars/Navbar.js";
import Footer from "components/Footers/Footer.js";
import EleitoradoFilter from "components/Cards/eleitoradoFilter";

function Eleitorado() {
  const [filtroAplicado, setFiltroAplicado] = useState(false);

  // tentativa lixo de implementar loading kk
  const [load, setLoad] = useState(false);
  const container = useRef(null);

  const data = {
    labels: ["100 anos ou mais", "95 a 99 anos","90 a 94 anos","85 a 89 anos","80 a 84 anos","75 a 79 anos",
    "70 a 74 anos","65 a 69 anos","60 a 64 anos","55 a 59 anos", "50 a 54 anos","45 a 49 anos","40 a 44 anos",
    "35 a 39 anos","30 a 34 anos", "25 a 29 anos","21 a 24 anos","20 anos","19 anos","18 anos","17 anos",
    "16 anos","Inválido"],
    datasets:[
      {
        backgroundColor: "rgba(0,9,272,0.2)",
        borderColor: "rgba(0,9,272,1)",
        borderWidth: 1,
        hoverBackgroundColor: "rgba(0,9,232,0.4)",
        hoverBorderColor: "rgba(0,9,232,1)",
        data: [1000, 1300, 1500, 1750, 2200, 3300, 5600, 6400, 9200, 10800, 11800,
          12300, 12700, 14800, 16200, 15300, 15100, 12100, 2800, 1500, 1200, 800, 300],
      }
    ]
  }

  useEffect(() => {
    if (load === true) {
      lottie.loadAnimation({
        container: container.current,
        renderer: "svg",
        loop: true,
        autoplay: true,
        animationData: loading_lottie
      })
    }
  }, [load]);

  return (
    <>
      <Navbar />
      <Container style={{ minHeight: "82vh" }} fluid>

        <div className='text-center my-5'>
          <span className='title'> Perfil do Eleitorado </span>
        </div>

        <Row>
          <Col lg='3'>
            <EleitoradoFilter />
          </Col>

          <Col>
           <div className="gráfico">
            <h1>Faixa Etária</h1>
            <HorizontalBar
                data={data}
                width={100}
                height={80}
                options={{
                  maintainAspectRatio: true
                }}
              />
           </div>
          </Col>

          {load ?
            (<>
              <Col>
                <Row
                  style={{ height: "50%", marginTop: "-4%" }}
                  className='d-flex align-items-center mr-5'
                >
                  <div className="loading_lottie" ref={container} />
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
                        <img src={SemFiltro} width='230px' height='230px' alt="Realize um filtro" />
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
