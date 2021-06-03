import React, { useState, useEffect, useRef, useContext } from "react";

import {
  Container,
  Row,
  Col,
  Card,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  FormGroup,
  Label,
  Input,
  Button,
  ButtonGroup,
} from "reactstrap";

import { Bar, HorizontalBar } from "react-chartjs-2";

import { Context } from "../Context/AbstencaoFilterContext";

import lottie from "lottie-web";
import loading_lottie from "../assets/lottieJSONs/loading_lottie.json";

import "../assets/styles/card-relevantes.css";

// core components
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

  const ChartRelevantes = () => {
    return (
      <div className="chart-view">
        <div className="chart-item">
          <h2>Maiores Abstenções entre jovens</h2>
          <Bar data={Maxjovens} options={options} />
        </div>
        <div className="chart-item">
          <h2>Menores Abstenções entre jovens</h2>
          <Bar data={Minjovens} options={options} />
        </div>
        <div className="chart-item">
          <h2>Maiores Abstenções entre adultos</h2>
          <Bar data={MaxAdultos} options={options} />
        </div>
        <div className="chart-item">
          <h2>Menores Abstenções entre adultos</h2>
          <Bar data={MinAdultos} options={options} />
        </div>
        <div className="chart-item">
          <h2>Menores Abstenções entre idosos</h2>
          <Bar data={MinIdosos} options={options} />
        </div>
        <div className="chart-item">
          <h2>Maiores Abstenções entre idosos</h2>
          <Bar data={MaxIdosos} options={options} />
        </div>
      </div>
    );
  };

  const ChartRelevantesEsc = () => {
    return (
      <div className="chart-view">
        <div className="chart-item">
          <h2>Maiores Abstenções entre analfabetos</h2>
          <Bar data={MaxAnalfabeto} options={options} />
        </div>
        <div className="chart-item">
          <h2>Menores Abstenções entre analfabetos</h2>
          <Bar data={MinAnalfabeto} options={options} />
        </div>
        <div className="chart-item">
          <h2>Maiores Abstenções por Ensino Médio Completo</h2>
          <Bar data={MaxMedioCompleto} options={options} />
        </div>
        <div className="chart-item">
          <h2>Menores Abstenções por Ensino Médio Completo</h2>
          <Bar data={MinMedioCompleto} options={options} />
        </div>
        <div className="chart-item">
          <h2>Maiores Abstenções por Superior Completo</h2>
          <Bar data={MaxSuperiorCompleto} options={options} />
        </div>
        <div className="chart-item">
          <h2>Menores Abstenções por Superior Completo</h2>
          <Bar data={MinSuperiorCompleto} options={options} />
        </div>
      </div>
    );
  };
  const ChartRelevantesEC = () => {
    return (
      <div className="chart-view">
        <div className="chart-item">
          <h2>Menores Abstenções entre casados</h2>
          <Bar data={MinCasados} options={options} />
        </div>
        <div className="chart-item">
          <h2>Maiores Abstenções entre casados</h2>
          <Bar data={MaxCasados} options={options} />
        </div>
        <div className="chart-item">
          <h2>Menores Abstenções entre solteiros</h2>
          <Bar data={MinSolteiros} options={options} />
        </div>
        <div className="chart-item">
          <h2>Maiores Abstenções entre solteiros</h2>
          <Bar data={MaxSolteiros} options={options} />
        </div>
      </div>
    );
  };
  const ChartRelevantesTotal = () => {
    return (
      <div className="chart-view">
        <div className="chart-item">
          <h2>Maiores Abstenções</h2>
          <Bar data={MaxAbsten} options={options} />
        </div>
        <div className="chart-item">
          <h2>Menores Abstenções</h2>
          <Bar data={MinAbsten} options={options} />
        </div>
      </div>
    );
  };

  const limpaChartsRelavantes = () => {
    setDadosRelevantesTotalButton(false);
    setDadosRelevantesButton(false);
    setDadosRelevantesEscButton(false);
    setDadosRelevantesECButton(false);
  };

  const handleShowRelevantes = () => {
    setDadosRelevantesTotalButton(true);
    setDadosRelevantesButton(true);
    setDadosRelevantesEscButton(true);
    setDadosRelevantesECButton(true);
  };
  return (
    <>
      <Container fluid className="page-content">
        <h1 className="text-center">Comparecimento/Abstenção</h1>

        <Row>
          <Col lg="4">
            <div className="card-fixed">
              <AbstençãoFilter />

              {filtroAplicado ? (
                <Card className="card-relevantes">
                  <section className="card-header">
                    <h2> Dados Relevantes </h2>
                    <span onClick={() => limpaChartsRelavantes()}>Remover</span>
                  </section>

                  <div className="card-form">
                    <UncontrolledDropdown group className="dropdown-view">
                      <ButtonGroup>
                        <Button
                          type="button"
                          className="dropdown"
                          onClick={() => handleShowRelevantes()}
                        >
                          Mostrar todos dados
                        </Button>
                        <DropdownToggle
                          caret
                          className=" dropdown"
                          type="button"
                        ></DropdownToggle>
                      </ButtonGroup>

                      <DropdownMenu className="dropdown-menu">
                        <FormGroup check>
                          <Label check>
                            <Input
                              checked={DadosRelevantesTotalButton}
                              type="checkbox"
                              value={DadosRelevantesTotalButton}
                              onChange={() => {
                                setDadosRelevantesTotalButton(
                                  !DadosRelevantesTotalButton
                                );
                              }}
                            />
                            <span className="form-check-sign" />
                            <span>Totais</span>
                          </Label>
                          <Label check>
                            <Input
                              checked={DadosRelevantesButton}
                              type="checkbox"
                              value={DadosRelevantesButton}
                              onChange={() => {
                                setDadosRelevantesButton(
                                  !DadosRelevantesButton
                                );
                              }}
                            />
                            <span className="form-check-sign" />
                            <span>Faixa Etária</span>
                          </Label>
                          <Label check>
                            <Input
                              checked={DadosRelevantesEscButton}
                              type="checkbox"
                              value={DadosRelevantesEscButton}
                              onChange={() => {
                                setDadosRelevantesEscButton(
                                  !DadosRelevantesEscButton
                                );
                              }}
                            />
                            <span className="form-check-sign" />
                            <span>Escolaridade</span>
                          </Label>
                          <Label check>
                            <Input
                              checked={DadosRelevantesECButton}
                              type="checkbox"
                              value={DadosRelevantesECButton}
                              onChange={() => {
                                setDadosRelevantesECButton(
                                  !DadosRelevantesECButton
                                );
                              }}
                            />
                            <span className="form-check-sign" />
                            <span>Estado Civil</span>
                          </Label>
                        </FormGroup>
                      </DropdownMenu>
                    </UncontrolledDropdown>
                  </div>
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
                  <Chart />
                  {DadosRelevantesTotalButton ? (
                    <div>
                      <h1>Dados Relevantes - Totais</h1>
                      <ChartRelevantesTotal className="charts" />
                    </div>
                  ) : null}
                  {DadosRelevantesButton ? (
                    <div>
                      <h1>Dados Relevantes - Faixa Etária</h1>
                      <ChartRelevantes className="charts" />
                    </div>
                  ) : null}
                  {DadosRelevantesEscButton ? (
                    <div>
                      <h1>Dados Relevantes - Escolaridade</h1>
                      <ChartRelevantesEsc className="charts" />
                    </div>
                  ) : null}
                  {DadosRelevantesECButton ? (
                    <div>
                      <h1>Dados Relevantes - Estado Civil</h1>
                      <ChartRelevantesEC className="charts" />
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
    </>
  );
}
