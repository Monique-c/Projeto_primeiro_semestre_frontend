import React, { useState, useEffect, useRef } from "react";

// reactstrap components
import {
  Container,
  Row,
  Col
} from "reactstrap";

import lottie from 'lottie-web';
import loading from '../assets/lottieJSONs/loading.json';

import '../assets/styles/graficosRelevantes.css';
import {Line} from 'react-chartjs-2';

import SemFiltro from 'assets/img/Icons/semFiltro.svg';

// core components
import Navbar from "components/Navbars/Navbar.js";
import Footer from "components/Footers/Footer.js";
import RelevanteFilter from 'components/Cards/graficosRelevantesFilter';
import { max, min } from "moment";

function GraficosRelevantes() {
  const [filtroAplicado, setFiltroAplicado] = useState(false);

  const [load, setLoad] = useState(false);
  const container = useRef(null);

  const data = {
    labels: ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'],
      datasets: [
        {
          label: "Dados",
          data: [300000, 200000, 275000, 125000, 260000, 307500, 175000, 235000, 260000, 240000, 270000, 270000],
          fill: false,
          borderColor: "#0A6893",
          backgroundColor: '#0A6893'
        },
        {
          label: "Mínimo",
          data: [155000, 155000, 155000, 155000, 155000, 155000, 155000, 155000, 155000, 155000, 155000],
          fill: false,
          borderColor: "#F09F54",
          backgroundColor: '#F09F54'
        },
        {
          label: "Máximo",
          data: [305000, 305000, 305000, 305000, 305000, 305000, 305000, 305000, 305000, 305000, 305000],
          fill: false,
          borderColor: "#626D80",
          backgroundColor: '#626D80'
        },
      ]
    };
    const options = {
      scales: {
          yAxes: [{
              ticks: {
                  min:0,
                  max:400000
              }
          }]
      }
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
        <div className="text-center my-5">
          <span className="title-relevantes">Gráficos Relevantes</span>
        </div>

        <Row>
          <Col lg='3'>
            <RelevanteFilter/>
          </Col>

          <Col>
          <div className='gráfico-ilustração'>
          <h1>Ilustração</h1>
          <Line
             data={data}
             width={100}
             height={50}
             options={options}
            />
          </div>
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

export default GraficosRelevantes;
