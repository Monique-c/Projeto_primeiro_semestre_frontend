import React, { useState,useEffect,useRef } from "react";

// reactstrap components
import {
  Container,
  Row,
  Col,
} from "reactstrap";

import  { Bar } from "react-chartjs-2";

import api from "../services/api"

import lottie from "lottie-web";
import loading from "../assets/lottieJSONs/loading.json";

import "../assets/styles/homepage.css"
import "../assets/styles/abstenção.css"

import SemFiltro from "assets/img/Icons/semFiltro.svg";

// core components
import Navbar from "components/Navbars/Navbar.js";
import Footer from "components/Footers/Footer.js";
import AbstençãoFilter from "components/Cards/abstençãoFilter";

function Abstencao() {
  const [filtroAplicado, setFiltroAplicado] = useState(false);

  const [load, setLoad] = useState(false);
  const [dados, setDados] = useState({})

  const container = useRef(null);

  useEffect(() => {
    if (load === true) {
      lottie.loadAnimation({
        container: container.current,
        renderer: "svg",
        loop: true,
        autoplay: true,
        animationData: loading
      })
    }
  }, [load]);

  useEffect(() => getData(), [])

  const getData = async () => {
    setLoad(true)
    const form = {
      "parametro_busca": "NM_MUNICIPIO",
      "filtro_busca": "SOCORRO"
    }
    const { data }  = await api.post("pesquisas-abstencao", form)

    const keys = Object.keys(data)
    const values = Object.values(data)

    keys.shift()
    values.shift()

    setDados({
        labels: keys,
        datasets: [
          {
            "data": values,
            backgroundColor: "rgba(0,9,272,0.2)",
            borderColor: "rgba(0,9,272,1)",
            borderWidth: 1,
            hoverBackgroundColor: "rgba(0,9,232,0.4)",
            hoverBorderColor: "rgba(0,9,232,1)",
          }
        ]
      }
    );
    setFiltroAplicado(true)
    setLoad(false)
  }

  const Chart = () => {
    return (
      <Bar
        data={dados}
        width={100}
        height={40}
        legend={false}
        options={{
          maintainAspectRatio: true
        }}
      />
    )
  }


  return (
    <>
      <Navbar />
      <Container style={{ minHeight: "82vh" }} fluid>

        <div className='text-center my-5'>
          <span className='abstencao-title'>Comparecimento/Abstenção</span>
        </div>

        <Row>
          <Col lg="3">
            <AbstençãoFilter/>
          </Col>

          {load ? (
            <Col>
              <Row
                style={{ height: "30%", marginTop: "-4%" }}
                className='d-flex align-items-center mr-5'
              >
                <div className="loading" ref={container} />
              </Row>
            </Col>
            ) : (
              <>
                {filtroAplicado ? (
                  <Col>
                    <Chart />
                  </Col>
                ) : (
                  <Col>
                    <Row
                      style={{ height: "50%", marginLeft: "15%" }}
                      className='mt-5 d-flex align-items-center mr-5'
                    >
                      <img src={SemFiltro} width='230px' height='230px' />
                      <span id='mensagem-sem-filtro'>
                        Realize um filtro <br />
                        no lado esquerdo <br />
                        para iniciar sua busca.
                      </span>
                    </Row>
                  </Col>
                )}
              </>
            )}
        </Row>
      </Container>
      <Footer />
    </>
  );
}

export default Abstencao;
