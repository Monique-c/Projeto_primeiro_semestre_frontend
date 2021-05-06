import React, { useState,useRef,useEffect } from "react";
import { Bar } from 'react-chartjs-2';

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

import lottie from "lottie-web";
import loading_lottie from "../assets/lottieJSONs/loading_lottie.json";

import "../assets/styles/homepage.css"
import "../assets/styles/renda.css"

import SemFiltro from "assets/img/Icons/semFiltro.svg";

// core components
import Navbar from "components/Navbars/Navbar.js";
import Footer from "components/Footers/Footer.js";
import RendaFilter from "components/Cards/rendaFilter";

//var rendajson = JSON.parse(json)


function Renda() {
  const [filtroAplicado, setFiltroAplicado] = useState(true);
  const [regioes, setRegioes] = useState(['Osasco', 'Bauru', 'Poa', 'Jaú', 'Jacarei']);

  const [load, setLoad] = useState(false);
  const container = useRef(null);

  const data = {
    labels: [regioes[0], regioes[1], regioes[2], regioes[3], regioes[4]],
    datasets: [
      {
        label: 'PIB das Cidades',
        data: [2000, 190, 40, 500, 2000, 300],
        backgroundColor: [
          'rgba(255, 80, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 159, 64, 0.2)',
        ],
        borderColor: [
          'rgba(255, 80, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };

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
          <span className='renda-title'>Renda</span>
        </div>

        <Row>
          <Col lg="3">
            <RendaFilter/>
          </Col>

          <Col>
           
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
                {/* {/* ----------------------------------------------- */}
                {filtroAplicado ?
                  (<>
                    <span>filtro aplicado :)</span>
                    <div className="gráfico">
                      <h1>Cidades</h1>
                        <HorizontalBar
                        data={data}
                        width={100}
                        height={40}
                        options={{
                          maintainAspectRatio: true
                        }}
              />
           </div>



                  </>)
                  :
                  (<>
                    <Col>
                      <Row
                        style={{ height: "50%", marginLeft: "15%" }}
                        className='mt-5 d-flex align-items-center mr-5'
                      >
                        <img src={SemFiltro} width='230px' height='230px' alt="Realize um filtro"/>
                        <span id='mensagem-sem-filtro'>
                          Realize um filtro <br />
                          no lado esquerdo <br />
                          para iniciar sua busca.
                        </span>
                      </Row>
                    </Col>
                  </>)
                }
                    {/* ----------------------------------------------  */}
              </>
            )}
        </Row>
      </Container>
      <Footer />
    </>
  );
}

export default Renda;
