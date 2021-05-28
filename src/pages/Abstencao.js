import React, { useState, useEffect, useRef, useContext } from "react";

import { Container, Row, Col, Button } from "reactstrap";

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
    MaxAbsten,
    MinAbsten,
    Maxjovens,
    Minjovens,
    MaxAdultos,
    MinAdultos,
    MinIdosos,
    MaxIdosos,
    MaxAnalfabeto,
    MinAnalfabeto,
    MaxMedioCompleto,
    MinMedioCompleto,
    MaxSuperiorCompleto,
    MinSuperiorCompleto,
    MinCasados,
    MaxCasados,
    MinSolteiros,
    MaxSolteiros,
  } = useContext(Context);

  const [dados, setDados] = useState({});
  const [qtEleitores, setQtEleitores] = useState({});

  const [DadosRelevantesButton, setDadosRelevantesButton] = useState(false);
  const [DadosRelevantesEscButton, setDadosRelevantesEscButton] =
    useState(false);
  const [DadosRelevantesECButton, setDadosRelevantesECButton] = useState(false);
  const [DadosRelevantesTotalButton, setDadosRelevantesTotalButton] =
    useState(false);

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
        {opcoesVisiveis.faixa_etaria ? (
          <div>
            <h5>
              <b>Comparecimento </b>
              Por Faixa Etária
            </h5>
            <Bar data={faixaEtariaPorComparecimentoComparativo} />
          </div>
        ) : null}

        {opcoesVisiveis.estado_civil ? (
          <div>
            <h5>
              <b>Comparecimento </b>
              Por Estado Civil
            </h5>
            <Bar data={estadoCivilPorComparecimentoComparativo} />
          </div>
        ) : null}

        {opcoesVisiveis.escolaridade_publica ? (
          <div>
            <h5>
              <b>Comparecimento </b>
              Por Escolaridade Declarada
            </h5>
            <Bar data={escolaridadeDeclaradaPorComparecimentoComparativo} />
          </div>
        ) : null}

        <div>
          <h5>
            <b> Comparecimento </b>
            Total
          </h5>
          <Bar data={totalComparecimento} />
        </div>
        {opcoesVisiveis.faixa_etaria ? (
          <div>
            <h5>
              <b>Abstenção </b>
              Por Faixa Etária
            </h5>
            <Bar data={faixaEtariaPorAbstencao} />
          </div>
        ) : null}

        {opcoesVisiveis.estado_civil ? (
          <div>
            <h5>
              <b>Abstenção </b>
              Por Estado Civil
            </h5>
            <Bar data={estadoCivilPorAbstencao} />
          </div>
        ) : null}

        {opcoesVisiveis.escolaridade_publica ? (
          <div>
            <h5>
              <b>Abstenção </b>
              Por Escolaridade Declarada
            </h5>
            <Bar data={escolaridadeDeclaradaPorAbstencao} />
          </div>
        ) : null}

        <div>
          <h5>
            <b> Abstenção </b>
            Total
          </h5>
          <Bar data={totalAbstencao} />
        </div>
      </div>
    );
  };

  const ChartRelevantes = () => {
    return (
      <div>
        <div>
          <h5>
            <b> Maiores Abstenções entre jovens </b>
          </h5>
          <Bar data={Maxjovens} options={options} />
        </div>
        <div>
          <h5>
            <b> Menores Abstenções entre jovens </b>
          </h5>
          <Bar data={Minjovens} options={options} />
        </div>
        <div>
          <h5>
            <b> Maiores Abstenções entre adultos </b>
          </h5>
          <Bar data={MaxAdultos} options={options} />
        </div>
        <div>
          <h5>
            <b> Menores Abstenções entre adultos </b>
          </h5>
          <Bar data={MinAdultos} options={options} />
        </div>
        <div>
          <h5>
            <b> Menores Abstenções entre idosos </b>
          </h5>
          <Bar data={MinIdosos} options={options} />
        </div>
        <div>
          <h5>
            <b> Maiores Abstenções entre idosos </b>
          </h5>
          <Bar data={MaxIdosos} options={options} />
        </div>
      </div>
    );
  };

  const ChartRelevantesEsc = () => {
    return (
      <div>
        <div>
          <h5>
            <b> Maiores Abstenções entre analfabetos</b>
          </h5>
          <Bar data={MaxAnalfabeto} options={options} />
        </div>
        <div>
          <h5>
            <b> Menores Abstenções entre analfabetos</b>
          </h5>
          <Bar data={MinAnalfabeto} options={options} />
        </div>
        <div>
          <h5>
            <b> Maiores Abstenções por Ensino Médio Completo</b>
          </h5>
          <Bar data={MaxMedioCompleto} options={options} />
        </div>
        <div>
          <h5>
            <b> Menores Abstenções por Ensino Médio Completo </b>
          </h5>
          <Bar data={MinMedioCompleto} options={options} />
        </div>
        <div>
          <h5>
            <b> Maiores Abstenções por Superior Completo </b>
          </h5>
          <Bar data={MaxSuperiorCompleto} options={options} />
        </div>
        <div>
          <h5>
            <b> Menores Abstenções por Superior Completo </b>
          </h5>
          <Bar data={MinSuperiorCompleto} options={options} />
        </div>
      </div>
    );
  };
  const ChartRelevantesEC = () => {
    return (
      <div>
        <div>
          <h5>
            <b> Menores Abstenções entre casados </b>
          </h5>
          <Bar data={MinCasados} options={options} />
        </div>
        <div>
          <h5>
            <b> Maiores Abstenções entre casados </b>
          </h5>
          <Bar data={MaxCasados} options={options} />
        </div>
        <div>
          <h5>
            <b> Menores Abstenções entre solteiros </b>
          </h5>
          <Bar data={MinSolteiros} options={options} />
        </div>
        <div>
          <h5>
            <b> Maiores Abstenções entre solteiros </b>
          </h5>
          <Bar data={MaxSolteiros} options={options} />
        </div>
      </div>
    );
  };
  const ChartRelevantesTotal = () => {
    return (
      <div>
        <div>
          <h5>
            <b> Maiores Abstenções </b>
          </h5>
          <Bar data={MaxAbsten} options={options} />
        </div>
        <div>
          <h5>
            <b> Menores Abstenções </b>
          </h5>
          <Bar data={MinAbsten} options={options} />
        </div>
      </div>
    );
  };

  return (
    <>
      <Navbar />
      <Container style={{ minHeight: "90vh", marginTop: "8%" }} fluid>
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
                <Col lg="7">
                  <Chart />
                  {!DadosRelevantesTotalButton ? (
                    <Row className="d-flex justify-content-start mr-3">
                      <Button
                        onClick={() =>
                          setDadosRelevantesTotalButton(
                            !DadosRelevantesTotalButton
                          )
                        }
                        style={{
                          backgroundColor: "#214bb5",
                        }}
                      >
                        Mostrar Dados Relevantes - Totais
                      </Button>
                    </Row>
                  ) : (
                    <div>
                      <Row className="d-flex justify-content-start mr-3">
                        <Button
                          onClick={() =>
                            setDadosRelevantesTotalButton(
                              !DadosRelevantesTotalButton
                            )
                          }
                          style={{
                            backgroundColor: "#214bb5",
                          }}
                        >
                          Esconder Dados Relevantes - Totais
                        </Button>
                      </Row>
                      <h3 className="renda-title">Dados Relevantes - Totais</h3>
                      <ChartRelevantesTotal className="charts" />
                    </div>
                  )}
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
                        Mostrar Dados Relevantes - Faixa Etária
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
                          Esconder Dados Relevantes - Faixa Etária
                        </Button>
                      </Row>
                      <h3 className="renda-title">
                        Dados Relevantes - Faixa Etária
                      </h3>
                      <ChartRelevantes className="charts" />
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
                  {!DadosRelevantesECButton ? (
                    <Row className="d-flex justify-content-start mr-3">
                      <Button
                        onClick={() =>
                          setDadosRelevantesECButton(!DadosRelevantesECButton)
                        }
                        style={{
                          backgroundColor: "#214bb5",
                        }}
                      >
                        Mostrar Dados Relevantes - Estado Civil
                      </Button>
                    </Row>
                  ) : (
                    <div>
                      <Row className="d-flex justify-content-start mr-3">
                        <Button
                          onClick={() =>
                            setDadosRelevantesECButton(!DadosRelevantesECButton)
                          }
                          style={{
                            backgroundColor: "#214bb5",
                          }}
                        >
                          Esconder Dados Relevantes - Estado Civil
                        </Button>
                      </Row>
                      <h3 className="renda-title">
                        Dados Relevantes - Estado Civil
                      </h3>
                      <ChartRelevantesEC className="charts" />
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
