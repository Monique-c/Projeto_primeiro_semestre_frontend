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
    NomeSocialEleitorado,

  } = useContext(Context2);

  //const [dados, setDados] = useState({});
  //const [qtEleitores, setQtEleitores] = useState({});

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

  const data = {
    labels: ["aaaaaaaaaaaaaaaa"],
    datasets: [
      {
        label: ["aaaaaaaaaaaaaaaaaaa"],
        data: {faixaEtariaEleitorado},
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 159, 64, 0.2)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
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

  const options = {
    maintainAspectRatio: true,
    scales: {
      xAxes: [
        {


        }
      ],
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
          <Bar data={faixaEtariaEleitorado} options= {options} />
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
        <div>
          <h5>
            <b>Eleitorado </b>
            por Nome Social
          </h5>
          <Bar data={NomeSocialEleitorado} />
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
                <Col lg='8'>
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


