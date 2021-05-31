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
    opcoesVisiveis,
    faixaEtariaPorAbstencao,
    faixaEtariaPorComparecimentoComparativo,
    estadoCivilPorAbstencao,
    estadoCivilPorComparecimentoComparativo,
    escolaridadeDeclaradaPorAbstencao,
    escolaridadeDeclaradaPorComparecimentoComparativo,
    totalAbstencao,
    totalComparecimento,
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
      <div className="chart-view">
        {opcoesVisiveis.faixa_etaria ? (
          <div className="chart-item">
            <h2>Comparecimento Por Faixa Etária</h2>
            <Bar data={faixaEtariaPorComparecimentoComparativo} />
          </div>
        ) : null}

        {opcoesVisiveis.estado_civil ? (
          <div className="chart-item">
            <h2>Comparecimento Por Estado Civil</h2>
            <Bar data={estadoCivilPorComparecimentoComparativo} />
          </div>
        ) : null}

        {opcoesVisiveis.escolaridade_publica ? (
          <div className="chart-item">
            <h2>Comparecimento Por Escolaridade Declarada</h2>
            <Bar data={escolaridadeDeclaradaPorComparecimentoComparativo} />
          </div>
        ) : null}

        <div className="chart-item">
          <h2>Comparecimento Total</h2>
          <Bar data={totalComparecimento} />
        </div>
        {opcoesVisiveis.faixa_etaria ? (
          <div className="chart-item">
            <h2>Abstenção Por Faixa Etária</h2>
            <Bar data={faixaEtariaPorAbstencao} />
          </div>
        ) : null}

        {opcoesVisiveis.estado_civil ? (
          <div className="chart-item">
            <h2>Abstenção Por Estado Civil</h2>
            <Bar data={estadoCivilPorAbstencao} />
          </div>
        ) : null}

        {opcoesVisiveis.escolaridade_publica ? (
          <div className="chart-item">
            <h2>Abstenção Por Escolaridade Declarada</h2>
            <Bar data={escolaridadeDeclaradaPorAbstencao} />
          </div>
        ) : null}

        <div className="chart-item">
          <h2>Abstenção Total</h2>
          <Bar data={totalAbstencao} />
        </div>
      </div>
    );
  };

  return (
    <>
      <Navbar />
      <Container style={{ minHeight: "90vh" }} fluid>
        <h1 className="text-title text-center">Comparecimento/Abstenção</h1>

        <Row>
          <Col lg="4">
            <AbstençãoFilter />
          </Col>

          {loading ? (
            <Col className="loading_lottie">
              <div ref={container} />
            </Col>
          ) : (
            <>
              {filtroAplicado ? (
                <Col lg="7">
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
