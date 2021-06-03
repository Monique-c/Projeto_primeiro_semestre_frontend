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

import { Context } from "../Context/EleitoradoFilterContext";

import lottie from "lottie-web";
import loading_lottie from "../assets/lottieJSONs/loading_lottie.json";

import "../assets/styles/eleitorado.css";
import "../assets/styles/card-relevantes.css";

// core components
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
  } = useContext(Context);
  //---------------------------------------------------------------------------------------------
  //---------------------------------------------------------------------------------------------

  const [DadosRelevantesFxEtButton, setDadosRelevantesFxEtButton] =
    useState(false);
  const [DadosRelevantesEscButton, setDadosRelevantesEscButton] =
    useState(false);
  const [DadosRelevantesEstCvButton, setDadosRelevantesEstCvButton] =
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
      <div className="chart-view">
        {opcoesVisiveis.faixa_etaria ? (
          <div className="chart-item">
            <h2>Eleitorado por faixa etária</h2>
            <Bar data={faixaEtariaEleitorado} options={options} />
          </div>
        ) : null}
        {opcoesVisiveis.estado_civil ? (
          <div className="chart-item">
            <h2>Eleitorado por Estado Civil</h2>
            <HorizontalBar data={estadoCivilEleitorado} />
          </div>
        ) : null}
        {opcoesVisiveis.escolaridade_publica ? (
          <div className="chart-item">
            <h2>Eleitorado por Grau de Escolariade</h2>
            <HorizontalBar data={grauEscolarEleitorado} />
          </div>
        ) : null}
        {opcoesVisiveis.nome_social ? (
          <div className="chart-item">
            <h2>Eleitorado por Nome Social</h2>
            <Bar data={NomeSocialEleitorado} />
          </div>
        ) : null}
      </div>
    );
  };
  //---------------------------------------------------------------------------------------------
  const ChartRelevantesFxEt = () => {
    return (
      <div className="chart-view">
        <div className="chart-item">
          <h2>Maiores Eleitorados de Jovens (%)</h2>
          <Bar data={MaxEleitJovens} options={options} />
        </div>
        <div className="chart-item">
          <h2>Menores Eleitorados de Jovens (%)</h2>
          <Bar data={MinEleitJovens} options={options} />
        </div>
        <div className="chart-item">
          <h2>Maiores Eleitorados de Adultos (%)</h2>
          <Bar data={MaxEleitAdultos} options={options} />
        </div>
        <div className="chart-item">
          <h2>Menores Eleitorados de Adultos (%)</h2>
          <Bar data={MinEleitAdultos} options={options} />
        </div>
        <div className="chart-item">
          <h2>Maiores Eleitorados de Idosos (%)</h2>
          <Bar data={MaxEleitIdosos} options={options} />
        </div>
        <div className="chart-item">
          <h2>Menores Eleitorados de Idosos (%)</h2>
          <Bar data={MinEleitIdosos} options={options} />
        </div>
      </div>
    );
  };
  //---------------------------------------------------------------------------------------------
  const ChartRelevantesEsc = () => {
    return (
      <div className="chart-view">
        <div className="chart-item">
          <h2>Maiores Eleitorados com Ens. Superior Completo (%)</h2>
          <Bar data={MaxEleitSupComp} options={options} />
        </div>
        <div className="chart-item">
          <h2>Menores Eleitorados com Ens. Superior Completo (%)</h2>
          <Bar data={MinEleitSupComp} options={options} />
        </div>
        <div className="chart-item">
          <h2>Maiores Eleitorados com Ens. Médio Completo (%)</h2>
          <Bar data={MaxEleitMedComp} options={options} />
        </div>
        <div className="chart-item">
          <h2>Menores Eleitorados com Ens. Médio Completo (%)</h2>
          <Bar data={MinEleitMedComp} options={options} />
        </div>
        <div className="chart-item">
          <h2>Maiores Eleitorados de Analfabetos (%)</h2>
          <Bar data={MaxEleitAnalfabeto} options={options} />
        </div>
        <div className="chart-item">
          <h2>Menores Eleitorados de Analfabetos (%)</h2>
          <Bar data={MinEleitAnalfabeto} options={options} />
        </div>
      </div>
    );
  };
  //---------------------------------------------------------------------------------------------
  const ChartRelevantesEstCv = () => {
    return (
      <div className="chart-view">
        <div className="chart-item">
          <h2>Maiores Eleitorados de Casados (%)</h2>
          <Bar data={MaxEleitCasados} options={options} />
        </div>
        <div className="chart-item">
          <h2>Menores Eleitorados de Casados (%)</h2>
          <Bar data={MinEleitCasados} options={options} />
        </div>
        <div className="chart-item">
          <h2>Maiores Eleitorados de Solteiros (%)</h2>
          <Bar data={MaxEleitSolteiros} options={options} />
        </div>
        <div className="chart-item">
          <h2>Menores Eleitorados de Solteiros (%)</h2>
          <Bar data={MinEleitSolteiros} options={options} />
        </div>
      </div>
    );
  };
  //---------------------------------------------------------------------------------------------
  //---------------------------------------------------------------------------------------------

  const limpaChartsRelavantes = () => {
    setDadosRelevantesFxEtButton(false);
    setDadosRelevantesEscButton(false);
    setDadosRelevantesEstCvButton(false);
  };

  const handleShowRelevantes = () => {
    setDadosRelevantesFxEtButton(true);
    setDadosRelevantesEscButton(true);
    setDadosRelevantesEstCvButton(true);
  };

  return (
    <>
      <Container fluid className="page-content">
        <h1 className="text-center">Perfil do Eleitorado</h1>

        <Row>
          <Col lg="4">
            <div className="card-fixed">
              <EleitoradoFilter />
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
                              checked={DadosRelevantesFxEtButton}
                              type="checkbox"
                              value={DadosRelevantesFxEtButton}
                              onChange={() => {
                                setDadosRelevantesFxEtButton(
                                  !DadosRelevantesFxEtButton
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
                              checked={DadosRelevantesEstCvButton}
                              type="checkbox"
                              value={DadosRelevantesEstCvButton}
                              onChange={() => {
                                setDadosRelevantesEstCvButton(
                                  !DadosRelevantesEstCvButton
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
                  {DadosRelevantesFxEtButton ? (
                    <div>
                      <h1>Dados Relevantes - Faixa Etária</h1>
                      <ChartRelevantesFxEt className="charts" />
                    </div>
                  ) : null}
                  {DadosRelevantesEscButton ? (
                    <div>
                      <h1>Dados Relevantes - Escolaridade</h1>
                      <ChartRelevantesEsc className="charts" />
                    </div>
                  ) : null}
                  {DadosRelevantesEstCvButton ? (
                    <div>
                      <h1>Dados Relevantes - Estado Cívil</h1>
                      <ChartRelevantesEstCv className="charts" />
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
