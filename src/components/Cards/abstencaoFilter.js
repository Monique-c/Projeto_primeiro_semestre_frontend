import React, { useState, useEffect, useContext } from "react";

import {
  Row,
  Col,
  Form,
  FormGroup,
  Card,
  Input,
  Button,
  Label,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  Badge,
  CustomInput,
} from "reactstrap";

import { Context } from "../../Context/AbstencaoFilterContext";

import "../../assets/styles/card-filter.css";

import ibge from "../../services/api_ibge";

export default function AbstençãoFilter() {
  const [comparacaoAtiva, setComparacaoAtiva] = useState(false);

  const [cidade, setCidade] = useState("");
  const [cidades, setCidades] = useState([]);
  const [cidadesSelecionadas, setCidadesSelecionadas] = useState([]);

  const [faixaEtária, setFaixaEtaria] = useState(true);
  const [estadoCivil, setEstadoCivil] = useState(true);
  const [escolaridadePublica, setEscolaridadePublica] = useState(true);
  const [nomeSocial, setNomeSocial] = useState(true);

  const [fadeComparacao, setFadeComparacao] = useState(false);

  const { filtrarDados } = useContext(Context);

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
      colunas: ["QT_ABSTENCAO", "QT_COMPARECIMENTO"],
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
        <h2> Filtros </h2>
        <span onClick={() => limparDados()}>Limpar</span>
      </section>

      <Form onSubmit={onSubmitForm} className="card-form">
        <FormGroup>
          <h4 htmlFor="cidades">Cidades</h4>
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

        <h4>Opções</h4>
        <UncontrolledDropdown group className="dropdown-view">
          <DropdownToggle caret className="dropdown">
            Filtros
          </DropdownToggle>
          <DropdownMenu className="dropdown-menu">
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

        {comparacaoAtiva ? (
          <>
            <span>Comparar com:</span>
            <Row className="badge-content">
              {cidadesSelecionadas.map((nomeCidade, index) => (
                <Badge color="info" key={index} className="badge-item">
                  {nomeCidade}
                  &emsp;
                  <i
                    onClick={() => removeCidades(nomeCidade)}
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
        <div className="view-button">
          <button type="submit" className="button button-primary">
            Aplicar
          </button>
        </div>
      </Form>
    </Card>
  );
}
