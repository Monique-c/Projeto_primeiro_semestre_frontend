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

import { Context } from "../../Context/RendaFilterContext";

import ibge from "../../services/api_ibge";

import "../../assets/styles/card-filter.css";

export default function RendaFilter() {
  const [comparacaoAtiva, setComparacaoAtiva] = useState(false);

  const [cidade, setCidade] = useState("");
  const [cidades, setCidades] = useState([]);
  const [cidadesSelecionadas, setCidadesSelecionadas] = useState([]);

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
    };

    filtrarDados(form);
  }

  return (
    <Card className="card-container ">
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

        <div className="view-button">
          <button type="submit" className="button button-primary">
            Aplicar
          </button>
        </div>
      </Form>
    </Card>
  );
}
