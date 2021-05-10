import React, { useState, useEffect, useRef, useContext } from "react";

import { Container, Row, Col } from "reactstrap";

import { Bar, HorizontalBar } from "react-chartjs-2";

import { Context } from "../Context/AbstencaoFilterContext";

import lottie from "lottie-web";
import loading_lottie from "../assets/lottieJSONs/loading_lottie.json";

import "../assets/styles/homepage.css";
import "../assets/styles/abstenção.css";

// core components
import Navbar from "components/Navbars/Navbar.js";
import Footer from "components/Footers/Footer.js";
import AbstençãoFilter from "components/Cards/abstencaoFilter";
import InfoFilter from "components/Cards/infoFilter";

export default function Abstencao() {
  const container = useRef(null);
  const {
    loading,
    filtroAplicado,
    faixaEtariaPorAbstencao,
    faixaEtariaPorComparecimento,
    faixaEtariaPorComparecimentoComparativo,
    estadoCivilPorAbstencao,
    estadoCivilPorComparecimento,
    estadoCivilPorComparecimentoComparativo,
    escolaridadeDeclaradaPorAbstencao,
    escolaridadeDeclaradaPorComparecimento,
    escolaridadeDeclaradaPorComparecimentoComparativo,
  } = useContext(Context);

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
        {faixaEtariaPorComparecimento.map((item) => (
          <div>
            <h5>
              <b>Comparecimento </b>
              por faixa etária
            </h5>
            <HorizontalBar data={item} options={options} />
          </div>
        ))}

        <div>
          <h5>
            <b>Comparecimento </b>
            por faixa etária
          </h5>
          <Bar data={faixaEtariaPorComparecimentoComparativo} />
        </div>
        <div>
          <h5>
            <b>Abstenção </b>
            por faixa etária
          </h5>
          <Bar data={faixaEtariaPorAbstencao} />
        </div>
        {/*estadoCivilPorComparecimento.map((item) => (
          <div>
            <h5>
              <b>Comparecimento </b>
              por Estado civil
            </h5>
            <HorizontalBar data={item} options={options} />
        </div>))}*/}
        <div>
          <h5>
            <b>Comparecimento </b>
            por Estado civil
          </h5>
          <Bar data={estadoCivilPorComparecimentoComparativo} />
        </div>
        <div>
          <h5>
            <b>Abstenção </b>
            por Estado civil
          </h5>
          <Bar data={estadoCivilPorAbstencao} />
        </div>
        {/*
        {escolaridadeDeclaradaPorComparecimento.map((item) => (
          <div>
            <h5>
              <b>Comparecimento </b>
              por Escolaridade Declarada
            </h5>
            <HorizontalBar data={item} options={options} />
          </div>
        ))} */}

        <div>
          <h5>
            <b>Comparecimento </b>
            por Escolaridade Declarada
          </h5>
          <Bar data={escolaridadeDeclaradaPorComparecimentoComparativo} />
        </div>
        <div>
          <h5>
            <b>Abstenção </b>
            por Escolaridade Declarada
          </h5>
          <Bar data={escolaridadeDeclaradaPorAbstencao} />
        </div>
      </div>
    );
  };

  return (
    <>
      <Navbar />
      <Container style={{ minHeight: "82vh" }} fluid>
        <div className="text-center my-5">
          <span className="abstencao-title">Comparecimento/Abstenção</span>
        </div>

        <Row>
          <Col lg="4">
            <AbstençãoFilter />
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
                <Col lg='7'>
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
