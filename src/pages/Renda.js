import React, { useState, useEffect, useRef, useContext } from "react";

import { Container, Row, Col, Button } from "reactstrap";

import { Bar } from "react-chartjs-2";

import { Context } from "../Context/RendaFilterContext";

import lottie from "lottie-web";
import loading_lottie from "../assets/lottieJSONs/loading_lottie.json";

import "../assets/styles/homepage.css";
import "../assets/styles/renda.css";

// core components
import Navbar from "components/Navbars/Navbar.js";
import Footer from "components/Footers/Footer.js";
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
      <div>
        <div>
          <h5>
            <b>PIB</b>
          </h5>
          <Bar data={PIB} options={options} />
        </div>
        <div>
          <h5>
            <b> PIB Percapita</b>
          </h5>
          <Bar data={PIB_Percapta} options={options} />
        </div>
      </div>
    );
  };
  const ChartRelevantes = () => {
    return (
      <div>
        <div>
          <h5>
            <b> Maiores PIBs</b>
          </h5>
          <Bar data={MaxPIB} options={options} />
        </div>
        <div>
          <h5>
            <b> Menores PIBs</b>
          </h5>
          <Bar data={MinPIB} options={options} />
        </div>
        <div>
          <h5>
            <b> Maiores PIBs Percapita</b>
          </h5>
          <Bar data={MaxPIB_Percapta} options={options} />
        </div>
        <div>
          <h5>
            <b> Menores PIBs Percapita</b>
          </h5>
          <Bar data={MinPIB_Percapta} options={options} />
        </div>
      </div>
    );
  };

  return (
    <>
      <Navbar />
      <Container style={{ minHeight: "82vh" }} fluid>
        <div className="text-center my-5">
          <span className="renda-title">Renda</span>
        </div>

        <Row>
          <Col lg="4">
            <RendaFilter />
          </Col>

          {loading ? (
            <Col>
              <Row
                style={{ height: "150px", marginTop: "-4%" }}
                className="d-flex align-items-center mr-5"
              >
                <div className="loading_lottie" ref={container} />
              </Row>
            </Col>
          ) : (
            <>
              {filtroAplicado ? (
                <Col lg="8">
                  <Chart className="charts" />
                  {!DadosRelevantesButton ? (
                    <Row className="d-flex justify-content-end mr-3">
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
                      <Row className="d-flex justify-content-end mr-3">
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
