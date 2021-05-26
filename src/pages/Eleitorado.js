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
    filtroAplicado,
    opcoesVisiveis,
    loading,
    //---------------------------------
    faixaEtariaEleitorado,
    estadoCivilEleitorado,
    grauEscolarEleitorado,
    NomeSocialEleitorado,
    //---------------------------------
    MaxEleitJovens,
    MinEleitJovens,
    MaxEleitAdultos,
    MinEleitAdultos,
    MaxEleitIdosos,
    MinEleitIdosos,
    //---------------------------------
    MaxEleitSupComp,
    MinEleitSupComp,
    MaxEleitMedComp,
    MinEleitMedComp,
    MaxEleitAnalfabeto,
    MinEleitAnalfabeto,
    //---------------------------------
    MaxEleitCasados,
    MinEleitCasados,
    MaxEleitSolteiros,
    MinEleitSolteiros,
  } = useContext(Context2);
  //---------------------------------------------------------------------------------------------
  //---------------------------------------------------------------------------------------------
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
  //---------------------------------------------------------------------------------------------
  //---------------------------------------------------------------------------------------------
  const [DadosRelevantesFxEtButton, setDadosRelevantesFxEtButton] =
    useState(false);
  const [DadosRelevantesEscButton, setDadosRelevantesEscButton] =
    useState(false);
  const [DadosRelevantesEstCvButton, setDadosRelevantesEstCvButton] =
    useState(false);
  //---------------------------------------------------------------------------------------------
  //---------------------------------------------------------------------------------------------
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
  //---------------------------------------------------------------------------------------------
  //---------------------------------------------------------------------------------------------
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
  //---------------------------------------------------------------------------------------------
  const ChartRelevantesFxEt = () => {
    return (
      <div>
        <div>
          <h5>
            <b> Maiores Eleitorados de Jovens (%)</b>
          </h5>
          <Bar data={MaxEleitJovens} options={options} />
        </div>
        <div>
          <h5>
            <b> Menores Eleitorados de Jovens (%)</b>
          </h5>
          <Bar data={MinEleitJovens} options={options} />
        </div>
        <div>
          <h5>
            <b> Maiores Eleitorados de Adultos (%)</b>
          </h5>
          <Bar data={MaxEleitAdultos} options={options} />
        </div>
        <div>
          <h5>
            <b> Menores Eleitorados de Adultos (%)</b>
          </h5>
          <Bar data={MinEleitAdultos} options={options} />
        </div>
        <div>
          <h5>
            <b> Maiores Eleitorados de Idosos (%)</b>
          </h5>
          <Bar data={MaxEleitIdosos} options={options} />
        </div>
        <div>
          <h5>
            <b> Menores Eleitorados de Idosos (%)</b>
          </h5>
          <Bar data={MinEleitIdosos} options={options} />
        </div>
      </div>
    );
  };
  //---------------------------------------------------------------------------------------------
  const ChartRelevantesEsc = () => {
    return (
      <div>
        <div>
          <h5>
            <b> Maiores Eleitorados com Ens. Superior Completo (%)</b>
          </h5>
          <Bar data={MaxEleitSupComp} options={options} />
        </div>
        <div>
          <h5>
            <b> Menores Eleitorados com Ens. Superior Completo (%)</b>
          </h5>
          <Bar data={MinEleitSupComp} options={options} />
        </div>
        <div>
          <h5>
            <b> Maiores Eleitorados com Ens. Médio Completo (%)</b>
          </h5>
          <Bar data={MaxEleitMedComp} options={options} />
        </div>
        <div>
          <h5>
            <b> Menores Eleitorados com Ens. Médio Completo (%)</b>
          </h5>
          <Bar data={MinEleitMedComp} options={options} />
        </div>
        <div>
          <h5>
            <b> Maiores Eleitorados de Analfabetos (%)</b>
          </h5>
          <Bar data={MaxEleitAnalfabeto} options={options} />
        </div>
        <div>
          <h5>
            <b> Menores Eleitorados de Analfabetos (%)</b>
          </h5>
          <Bar data={MinEleitAnalfabeto} options={options} />
        </div>
      </div>
    );
  };
  //---------------------------------------------------------------------------------------------
  const ChartRelevantesEstCv = () => {
    return (
      <div>
        <div>
          <h5>
            <b> Maiores Eleitorados de Casados (%)</b>
          </h5>
          <Bar data={MaxEleitCasados} options={options} />
        </div>
        <div>
          <h5>
            <b> Menores Eleitorados de Casados (%)</b>
          </h5>
          <Bar data={MinEleitCasados} options={options} />
        </div>
        <div>
          <h5>
            <b> Maiores Eleitorados de Solteiros (%)</b>
          </h5>
          <Bar data={MaxEleitSolteiros} options={options} />
        </div>
        <div>
          <h5>
            <b> Menores Eleitorados de Solteiros (%)</b>
          </h5>
          <Bar data={MinEleitSolteiros} options={options} />
        </div>
      </div>
    );
  };
  //---------------------------------------------------------------------------------------------
  //---------------------------------------------------------------------------------------------
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
                className="d-flex align-items-start mr-5"
              >
                <div className="loading_lottie" ref={container} />
              </Row>
            </Col>
          ) : (
            <>
              {filtroAplicado ? (
                <Col lg="8">
                  <Chart />
                  {!DadosRelevantesFxEtButton ? (
                    <Row className="d-flex justify-content-start mr-3">
                      <Button
                        onClick={() =>
                          setDadosRelevantesFxEtButton(
                            !DadosRelevantesFxEtButton
                          )
                        }
                        style={{
                          backgroundColor: "#214bb5",
                        }}
                      >
                        Mostrar Dados Relevantes - Faixa Etária
                      </Button>
                    </Row>
                  ) : (
                    <div>
                      <Row className="d-flex justify-content-start mr-3">
                        <Button
                          onClick={() =>
                            setDadosRelevantesFxEtButton(
                              !DadosRelevantesFxEtButton
                            )
                          }
                          style={{
                            backgroundColor: "#214bb5",
                          }}
                        >
                          Esconder Dados Relevantes - Faixa Etária
                        </Button>
                      </Row>
                      <h3 className="renda-title">
                        Dados Relevantes - Faixa Etária
                      </h3>
                      <ChartRelevantesFxEt className="charts" />
                    </div>
                  )}
                  {!DadosRelevantesEscButton ? (
                    <Row className="d-flex justify-content-start mr-3">
                      <Button
                        onClick={() =>
                          setDadosRelevantesEscButton(!DadosRelevantesEscButton)
                        }
                        style={{
                          backgroundColor: "#214bb5",
                        }}
                      >
                        Mostrar Dados Relevantes - Escolaridade
                      </Button>
                    </Row>
                  ) : (
                    <div>
                      <Row className="d-flex justify-content-start mr-3">
                        <Button
                          onClick={() =>
                            setDadosRelevantesEscButton(
                              !DadosRelevantesEscButton
                            )
                          }
                          style={{
                            backgroundColor: "#214bb5",
                          }}
                        >
                          Esconder Dados Relevantes - Escolaridade
                        </Button>
                      </Row>
                      <h3 className="renda-title">
                        Dados Relevantes - Escolaridade
                      </h3>
                      <ChartRelevantesEsc className="charts" />
                    </div>
                  )}
                  {!DadosRelevantesEstCvButton ? (
                    <Row className="d-flex justify-content-start mr-3">
                      <Button
                        onClick={() =>
                          setDadosRelevantesEstCvButton(
                            !DadosRelevantesEstCvButton
                          )
                        }
                        style={{
                          backgroundColor: "#214bb5",
                        }}
                      >
                        Mostrar Dados Relevantes - Estado Cívil
                      </Button>
                    </Row>
                  ) : (
                    <div>
                      <Row className="d-flex justify-content-start mr-3">
                        <Button
                          onClick={() =>
                            setDadosRelevantesEstCvButton(
                              !DadosRelevantesEstCvButton
                            )
                          }
                          style={{
                            backgroundColor: "#214bb5",
                          }}
                        >
                          Esconder Dados Relevantes - Estado Cívil
                        </Button>
                      </Row>
                      <h3 className="renda-title">
                        Dados Relevantes - Estado Cívil
                      </h3>
                      <ChartRelevantesEstCv className="charts" />
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
