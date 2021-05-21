import React, { useState, useEffect, useRef, useContext } from "react";

import { Container, Row, Col, Button } from "reactstrap";

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
    opcoesVisiveis,
    faixaEtariaEleitorado,
    estadoCivilEleitorado,
    grauEscolarEleitorado,
    NomeSocialEleitorado,
    MaxEleitJovens,
    MinEleitJovens,
  } = useContext(Context2);

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

  const [DadosRelevantesButton, setDadosRelevantesButton] = useState(false);

  const options = {
    scales: {
      xAxes: [{}],
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
        {opcoesVisiveis.faixa_etaria ? (
          <div>
            <h5>
              <b>Eleitorado </b>
              por faixa etária
            </h5>
            <Bar data={faixaEtariaEleitorado} options={options} />
          </div>
        ) : null}
        {opcoesVisiveis.estado_civil ? (
          <div>
            <h5>
              <b>Eleitorado </b>
              por Estado Civil
            </h5>
            <HorizontalBar data={estadoCivilEleitorado} />
          </div>
        ) : null}
        {opcoesVisiveis.escolaridade_publica ? (
          <div>
            <h5>
              <b>Eleitorado </b>
              por Grau de Escolariade
            </h5>
            <HorizontalBar data={grauEscolarEleitorado} />
          </div>
        ) : null}
        {opcoesVisiveis.nome_social ? (
          <div>
            <h5>
              <b>Eleitorado </b>
              por Nome Social
            </h5>
            <Bar data={NomeSocialEleitorado} />
          </div>
        ) : null}
      </div>
    );
  };
  const ChartRelevantes = () => {
    return (
      <div>
        <div>
          <h5>
            <b> Maiores Eleitorados Jovens</b>
          </h5>
          <Bar data={MaxEleitJovens} options={options} />
        </div>
        <div>
          <h5>
            <b> Menores Eleitorados Jovens</b>
          </h5>
          <Bar data={MinEleitJovens} options={options} />
        </div>
      </div>
    );
  };

  return (
    <>
      <Navbar />
      <Container style={{ minHeight: "90vh", marginTop: "8%" }} fluid>
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
                <Col lg="8">
                  <Chart />
                  {!DadosRelevantesButton ? (
                    <Row className="d-flex justify-content-start mr-3">
                      <Button
                        onClick={() =>
                          setDadosRelevantesButton(!DadosRelevantesButton)
                        }
                        style={{
                          backgroundColor: "#214bb5",
                        }}
                      >
                        Mostrar Dados Relevantes
                      </Button>
                    </Row>
                  ) : (
                    <div>
                      <Row className="d-flex justify-content-start mr-3">
                        <Button
                          onClick={() =>
                            setDadosRelevantesButton(!DadosRelevantesButton)
                          }
                          style={{
                            backgroundColor: "#214bb5",
                          }}
                        >
                          Esconder Dados Relevantes
                        </Button>
                      </Row>
                      <h3 className="renda-title">Dados Relevantes</h3>
                      <ChartRelevantes className="charts" />
                    </div>
                  )}
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
