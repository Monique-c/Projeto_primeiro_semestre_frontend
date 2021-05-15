import React, { useState, useEffect, useContext } from "react";

import {
  Button,
  Card,
  Row,
  Col,
  Form,
  FormGroup,
  Input,
  Label,
  UncontrolledDropdown,
  DropdownMenu,
  DropdownToggle,
  Badge,
  CustomInput,
} from "reactstrap";

import { Context2 } from "../../Context/EleitoradoFilterContext";

//import api from "../../services/api";
import ibge from "../../services/api_ibge";

import "../../assets/styles/card-filter.css";

export default function EleitoradoFilter() {
  const [comparacaoAtiva, setComparacaoAtiva] = useState(false);

  const [cidade, setCidade] = useState("");
  const [cidades, setCidades] = useState([]);
  const [cidadesSelecionadas, setCidadesSelecionadas] = useState([]);

  const [faixaEtária, setFaixaEtaria] = useState(true);
  const [estadoCivil, setEstadoCivil] = useState(true);
  const [escolaridadePublica, setEscolaridadePublica] = useState(true);
  const [nomeSocial, setNomeSocial] = useState(true);

  const [fadeComparacao, setFadeComparacao] = useState(false);

  const { filtrarDados } = useContext(Context2);

  useEffect(() => {
    (async () => {
      const { data } = await ibge.get();
      const nomeCidades = data.map((city) => city.nome);

      setCidades(nomeCidades);
    })();
  }, []);

  useEffect(() => {
    if (!cidade == "") {
      return setFadeComparacao(true);
    }
    setFadeComparacao(false);
    setComparacaoAtiva(false);
  }, [cidade]);

  async function limparDados() {
    setCidade("");
    setCidadesSelecionadas([]);
    setFaixaEtaria(true);
    setEstadoCivil(true);
    setEscolaridadePublica(true);
    setNomeSocial(true);
  }

  function verificaDuplicidade(nomeCidade) {
    let duplicidade = false;
    cidadesSelecionadas.forEach((nome) => {
      if (nome === nomeCidade) {
        duplicidade = true;
      }
    });

    return duplicidade;
  }

  function adicionaCidadeSelecionada(nomeCidade) {
    const duplicidade = verificaDuplicidade(nomeCidade[0]);
    if (!duplicidade) {
      setCidadesSelecionadas([...cidadesSelecionadas, nomeCidade[0]]);
    }
  }

  function removeCidades(nomeCidade) {
    let arrayPivot = cidadesSelecionadas;
    setCidadesSelecionadas(arrayPivot.filter((nome) => nome !== nomeCidade));
  }

  function onSubmitForm(e) {
    e.preventDefault();

    let arrayPivot = cidadesSelecionadas;

    const duplicidade = verificaDuplicidade(cidade[0]);
    if (!duplicidade) {
      arrayPivot = [...arrayPivot, cidade[0]];
    }

    const form = {
      municipios: arrayPivot,
      colunas: ["QT_ELEITORES_PERFIL", "QT_ELEITORES_INC_NM_SOCIAL"],
    };

    const opcoes = {
      faixa_etaria: faixaEtária,
      estado_civil: estadoCivil,
      escolaridade_publica: escolaridadePublica,
      nome_social: nomeSocial,
    };

    filtrarDados(form, opcoes);
  }

  return (
    <Card className="card-container">
      <section className="card-header">
        <h3> Filtros </h3>
        <span onClick={() => limparDados()}>Limpar</span>
      </section>

      <Col>
        <Form onSubmit={onSubmitForm} className="card-form">
          <FormGroup>
            <label htmlFor="cidades">Cidades</label>
            <select
              name="cidades"
              className="form-control select-cities"
              onChange={(event) => {
                const value = event.target.value.split(",");
                setCidade(value);
              }}
            >
              <option>Estado de SP</option>
              {cidades.map((cidade, index) => (
                <option key={index} value={cidade}>
                  {cidade}
                </option>
              ))}
            </select>
          </FormGroup>

          <label>Opções</label>
          <UncontrolledDropdown group className="w-100">
            <DropdownToggle caret color="info" style={{ fontSize: 14 }}>
              Filtros
            </DropdownToggle>
            <DropdownMenu>
              <Col>
                <FormGroup check>
                  <Label check>
                    <Input
                      checked={faixaEtária}
                      type="checkbox"
                      value={faixaEtária}
                      onChange={() => {
                        setFaixaEtaria(!faixaEtária);
                      }}
                    />
                    <span className="form-check-sign" />
                    <span>Faixa Etária</span>
                  </Label>

                  <Label check>
                    <Input
                      checked={estadoCivil}
                      type="checkbox"
                      value={estadoCivil}
                      onChange={() => {
                        setEstadoCivil(!estadoCivil);
                      }}
                    />
                    <span className="form-check-sign" />
                    <span>Estado civil</span>
                  </Label>

                  <Label check>
                    <Input
                      checked={escolaridadePublica}
                      type="checkbox"
                      value={escolaridadePublica}
                      onChange={() => {
                        setEscolaridadePublica(!escolaridadePublica);
                      }}
                    />
                    <span className="form-check-sign" />
                    <span>Escolaridade Declarada</span>
                  </Label>

                  <Label check>
                    <Input
                      checked={nomeSocial}
                      type="checkbox"
                      value={nomeSocial}
                      onChange={() => {
                        setNomeSocial(!nomeSocial);
                      }}
                    />
                    <span className="form-check-sign" />
                    <span>Nome social</span>
                  </Label>
                </FormGroup>
              </Col>
            </DropdownMenu>
          </UncontrolledDropdown>

          {fadeComparacao ? (
            <Col>
              <Label check>
                <Input
                  type="checkbox"
                  value={comparacaoAtiva}
                  onClick={() => setComparacaoAtiva(!comparacaoAtiva)}
                />
                <span className="form-check-sign" />
                <span>Adicionar comparação</span>
              </Label>
            </Col>
          ) : null}

          <Col>
            {comparacaoAtiva ? (
              <>
                <span>Comparar com:</span>
                <br />
                <Row className="mt-2">
                  {cidadesSelecionadas.map((nomeCidade, index) => (
                    <Badge
                      color="info"
                      key={index}
                      className="d-flex justify-content-center align-items-center"
                    >
                      {nomeCidade}
                      &emsp;
                      <i
                        onClick={() => removeCidades(nomeCidade)}
                        style={{ cursor: "pointer" }}
                        className="now-ui-icons ui-1_simple-remove "
                      ></i>
                    </Badge>
                  ))}
                </Row>
                <FormGroup>
                  <CustomInput
                    type="select"
                    name="customSelect"
                    multiple
                    onChange={(event) => {
                      const value = event.target.value.split(",");
                      adicionaCidadeSelecionada(value);
                    }}
                  >
                    {cidades.map((cidade, index) => (
                      <>
                        <option>{cidade}</option>
                      </>
                    ))}
                  </CustomInput>
                </FormGroup>
              </>
            ) : null}
          </Col>

          <div className="d-flex justify-content-end">
            <Button
              type="submit"
              style={{
                backgroundColor: "#214bb5",
              }}
            >
              Aplicar
            </Button>
          </div>
        </Form>
      </Col>
    </Card>
  );
}
