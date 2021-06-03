import React, { useState, useEffect, useRef, useContext } from "react";

import { Container, Row, Col, Button, Card } from "reactstrap";

import { Bar } from "react-chartjs-2";

import { Context } from "../Context/RendaFilterContext";

import lottie from "lottie-web";
import loading_lottie from "../assets/lottieJSONs/loading_lottie.json";

import "../assets/styles/renda.css";
import "../assets/styles/card-relevantes.css";

// core components
import RendaFilter from "components/Cards/rendaFilter";
import InfoFilter from "components/Cards/infoFilter";

export default function Renda() {
  const container = useRef(null);

  const {
    loading,
    filtroAplicado,
    PIB,
    MaxPIB,
    MinPIB,
    PIB_Percapta,
    MaxPIB_Percapta,
    MinPIB_Percapta,
  } = useContext(Context);

  const [DadosRelevantesButton, setDadosRelevantesButton] = useState(false);

  const options = {
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

  const Chart = () => {
    return (
      <div className="chart-view">
        <div className="chart-item">
          <h2>PIB</h2>
          <Bar data={PIB} options={options} />
        </div>
        <div className="chart-item">
          <h2>PIB Percapita</h2>
          <Bar data={PIB_Percapta} options={options} />
        </div>
      </div>
    );
  };
  const ChartRelevantes = () => {
    return (
      <div className="chart-view">
        <div className="chart-item">
          <h2>Maiores PIBs</h2>
          <Bar data={MaxPIB} options={options} />
        </div>
        <div className="chart-item">
          <h2>Menores PIBs</h2>
          <Bar data={MinPIB} options={options} />
        </div>
        <div className="chart-item">
          <h2>Maiores PIBs Percapita</h2>
          <Bar data={MaxPIB_Percapta} options={options} />
        </div>
        <div className="chart-item">
          <h2>Menores PIBs Percapita</h2>
          <Bar data={MinPIB_Percapta} options={options} />
        </div>
      </div>
    );
  };

  return (
    <Container fluid className="page-content">
      <h1 className="text-center">Renda</h1>

      <Row>
        <Col lg="4">
          <div className="card-fixed">
            <RendaFilter />

            {filtroAplicado ? (
              <Card className="card-relevantes">
                <section className="card-header">
                  <h2> Dados Relevantes </h2>
                  <span onClick={() => setDadosRelevantesButton(false)}>
                    Remover
                  </span>
                </section>

                <button
                  type="button"
                  className="button button-primary btn-relevante"
                  onClick={() => setDadosRelevantesButton(true)}
                >
                  Mostrar todos
                </button>
              </Card>
            ) : null}
          </div>
        </Col>

        {loading ? (
          <Col className="loading_lottie">
            <div ref={container} />
          </Col>
        ) : (
          <>
            {filtroAplicado ? (
              <Col lg="7">
                <Chart className="charts" />
                {DadosRelevantesButton ? (
                  <div>
                    <h1>Dados Relevantes</h1>
                    <ChartRelevantes className="charts" />
                  </div>
                ) : null}
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
  );
}
