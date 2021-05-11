import React, { useState, useEffect, useRef, useContext } from "react";

import { Container, Row, Col } from "reactstrap";

import { Bar, HorizontalBar } from "react-chartjs-2";

import { Context2 } from "../Context/EleitoradoFilterContext";

import lottie from "lottie-web";
import loading_lottie from "../assets/lottieJSONs/loading_lottie.json";

import "../assets/styles/homepage.css";
import "../assets/styles/eleitorado.css";

// core components
import Navbar from "components/Navbars/Navbar.js";
import Footer from "components/Footers/Footer.js";
import EleitoradoFilter from "components/Cards/eleitoradoFilter";
import InfoFilter from "components/Cards/infoFilter";

export default function Eleitorado() {
  const container = useRef(null);
  const {
    loading,
    filtroAplicado,
    faixaEtariaEleitorado,
    estadoCivilEleitorado,
    grauEscolarEleitorado,
  } = useContext(Context2);

  const [dados, setDados] = useState({});
  const [qtEleitores, setQtEleitores] = useState({});

  useEffect(() => {
    if (loading) {
      lottie.loadAnimation({
        container: container.current,
        renderer: "svg",
        loop: true,
        autoplay: true,
        animationData: loading_lottie,
      });
    }
  }, [loading]);

  const options = {
    maintainAspectRatio: true,
    scales: {
      yAxes: [
        {
          ticks: {
            beginAtZero: true,
          },
        },
      ],
    },
  };

  const Chart = () => {
    return (
      <div>
        <div>
          <h5>
            <b>Eleitorado </b>
            por faixa etária
          </h5>
          <Bar data={faixaEtariaEleitorado}/>
        </div>
        <div>
          <h5>
            <b>Eleitorado </b>
            por Estado Civil
          </h5>
          <HorizontalBar data={estadoCivilEleitorado} />
        </div>
        <div>
          <h5>
            <b>Eleitorado </b>
            por Grau de Escolariade
          </h5>
          <HorizontalBar data={grauEscolarEleitorado} />
        </div>
      </div>
    );
  };

  return (
    <>
      <Navbar />
      <Container style={{ minHeight: "82vh" }} fluid>
        <div className="text-center my-5">
          <span className="eleitorado-title">Perfil do Eleitorado</span>
        </div>

        <Row>
          <Col lg="4">
            <EleitoradoFilter />
          </Col>

          {loading ? (
            <Col>
              <Row
                style={{ height: "30%", marginTop: "-4%" }}
                className="d-flex align-items-center mr-5"
              >
                <div className="loading_lottie" ref={container} />
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
                  <InfoFilter />
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


