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
  DropdownToggle,
  DropdownMenu,
  UncontrolledDropdown,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  CustomInput,
} from "reactstrap";

import { Context2 } from "../../Context/EleitoradoFilterContext";

//import api from "../../services/api";
import ibge from "../../services/api_ibge";

import "../../assets/styles/eleitorado.css";

export default function EleitoradoFilter() {
  const [comparacaoAtiva, setComparacaoAtiva] = useState(false);
  const [representanteEleito, setRepresentanteEleito] = useState(false);

  const [cidades, setCidades] = useState([]);
  const [cidadesSelecionadas, setCidadesSelecionadas] = useState([]);
  const [cidade, setCidade] = useState("");
  const [cidadeComparada, setCidadeComparada] = useState("");
  const [cidadeSelecionada, setCidadeSelecionada] = useState("");

  const [opcoes, setOpcoes] = useState([]);
  const [faixaEtária, setFaixaEtaria] = useState(true);
  const [estadoCivil, setEstadoCivil] = useState(true);
  const [escolaridadePublica, setEscolaridadePublica] = useState(true);
  const [genero, setGenero] = useState(false);
  const [deficiencia, setDeficiencia] = useState(false);
  const [nomeSocial, setNomeSocial] = useState(true);

  const { filtrarDados } = useContext(Context2);

  useEffect(() => {
    (async () => {
      const { data } = await ibge.get();
      const nomeCidades = data.map((city) => city.nome);

      setCidades(nomeCidades);
    })();
  }, []);

  async function limparDados() {
    setCidade("");
    setCidadeComparada("");
    setCidadesSelecionadas([]);
    setOpcoes([]);
  }

  async function adicionarOpcao(opcao) {
    setOpcoes([...opcoes, opcao]);
    alert(`ADICIONADO\n\nopçoes: \n [ ${opcoes} ]`);
  }

  async function retirarOpcao(opcao) {
    let arrayPivot = opcoes;
    setOpcoes(arrayPivot.filter((item) => item !== opcao));
    alert(`RETIRADO\n\nopçoes: \n [ ${opcoes} ]`);
  }

  function adicionaCidadeSelecionada(nomeCidade) {
    let duplicidade = false;
    cidadesSelecionadas.forEach((nome) => {
      if (nome === nomeCidade[0]) {
        duplicidade = true;
      }
    });
    if (!duplicidade) {
      setCidadesSelecionadas([...cidadesSelecionadas, nomeCidade[0]]);
    }
  }

  function removeCidades(nomeCidade) {
    let arrayPivot = cidadesSelecionadas;
    setCidadesSelecionadas(arrayPivot.filter((nome) => nome !== nomeCidade));
  }

  return (
    <Card style={{ width: "300px", marginLeft: "10px" }}>
      <div className="card-filtro-container">
        <Row className="mb-5">
          <Col
            lg="11"
            className="d-flex"
            style={{
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <span className="subtitle"> Filtros </span>
            <span onClick={() => limparDados()} className="limpar-font">
              Limpar
            </span>
          </Col>
        </Row>

        <Row>
          <Col>
            <Form>
              <FormGroup>
                <label htmlFor="cidades">Cidades</label>
                <select
                  name="cidades"
                  className="form-control mt-2"
                  style={{
                    width: "100%",
                    borderRadius: "3%",
                    color: "#32325d",
                  }}
                  onChange={(event) => {
                    const value = event.target.value.split(",");
                    setCidade(value);
                  }}
                >
                  {cidades.map((cidade, index) => (
                    <option key={index} value={cidade}>
                      {cidade}
                    </option>
                  ))}
                </select>
              </FormGroup>

              <label htmlFor="opcoes">Opções</label>
              <UncontrolledDropdown>
                <DropdownToggle
                  caret
                  className="btn-round w-100"
                  color="info"
                  id="opcoes"
                >
                  Opções de Filtro
                </DropdownToggle>
                <DropdownMenu aria-labelledby="dropdownMenuButton">
                  <FormGroup check className="ml-3">
                    <Label check>
                      <Input
                        checked={faixaEtária}
                        type="checkbox"
                        value={faixaEtária}
                        onChange={() => {
                          setFaixaEtaria(!faixaEtária);
                          faixaEtária
                            ? adicionarOpcao("faixaEtária")
                            : retirarOpcao("faixaEtária");
                        }}
                      />
                      <span className="form-check-sign" />
                      Faixa Etária
                    </Label>

                    <Label check>
                      <Input
                        checked={estadoCivil}
                        type="checkbox"
                        value={estadoCivil}
                        onChange={() => {
                          setEstadoCivil(!estadoCivil);
                          estadoCivil
                            ? adicionarOpcao("estadoCivil")
                            : retirarOpcao("estadoCivil");
                        }}
                      />
                      <span className="form-check-sign" />
                      Estado civil
                    </Label>

                    <Label check>
                      <Input
                        checked={escolaridadePublica}
                        type="checkbox"
                        value={escolaridadePublica}
                        onChange={() => {
                          setEscolaridadePublica(!escolaridadePublica);
                          escolaridadePublica
                            ? adicionarOpcao("escolaridadePublica")
                            : retirarOpcao("escolaridadePublica");
                        }}
                      />
                      <span className="form-check-sign" />
                      Escolaridade Declarada
                    </Label>

                    <Label check>
                      <Input
                        checked={nomeSocial}
                        type="checkbox"
                        value={nomeSocial}
                        onChange={() => {
                          setNomeSocial(!nomeSocial);
                          nomeSocial
                            ? adicionarOpcao("nomeSocial")
                            : retirarOpcao("nomeSocial");
                        }}
                      />
                      <span className="form-check-sign" />
                      Nome social
                    </Label>
                  </FormGroup>
                </DropdownMenu>
              </UncontrolledDropdown>

              <Label check className="mt-4 ml-3">
                <Input
                  type="checkbox"
                  value={comparacaoAtiva}
                  onClick={() => setComparacaoAtiva(!comparacaoAtiva)}
                />
                <span className="form-check-sign" />
                Adicionar comparação
              </Label>

              {comparacaoAtiva ? (
                <>
                  <Row>
                    {cidadesSelecionadas.map((nomeCidade, index) => (
                      <InputGroup key={index} style={{ width: "50%" }}>
                        <Input disabled type="text" value={nomeCidade}></Input>
                        <InputGroupAddon addonType="append">
                          <InputGroupText
                            onClick={() => removeCidades(nomeCidade)}
                            style={{ cursor: "pointer", width: "30%" }}
                          >
                            <i className="now-ui-icons ui-1_simple-remove text-danger"></i>
                          </InputGroupText>
                        </InputGroupAddon>
                      </InputGroup>
                    ))}
                  </Row>
                  <FormGroup check className="ml-3">
                    <CustomInput
                      type="select"
                      name="customSelect"
                      multiple
                      onChange={(event) => {
                        const value = event.target.value.split(",");
                        adicionaCidadeSelecionada(value);
                      }}
                    >
                      <option>Todos as cidades</option>
                      {cidades.map((cidade, index) => (
                        <>
                          <option>{cidade}</option>
                        </>
                      ))}
                    </CustomInput>
                  </FormGroup>
                </>
              ) : null}

              <div className="d-flex justify-content-end">
                <Button
                  onClick={filtrarDados}
                  style={{
                    backgroundColor: "#214bb5",
                  }}
                >
                  Aplicar
                </Button>
              </div>
            </Form>
          </Col>
        </Row>
      </div>
    </Card>
  );
}
