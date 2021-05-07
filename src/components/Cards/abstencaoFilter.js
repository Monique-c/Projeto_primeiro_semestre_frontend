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
} from "reactstrap";

import { Context } from "../../Context/AbstencaoFilterContext";

import "../../assets/styles/abstenção.css";

import ibge from "../../services/api_ibge";

export default function AbstençãoFilter() {
  const [comparacaoAtiva, setComparacaoAtiva] = useState(false);

  const [cidades, setCidades] = useState([]);
  const [cidade, setCidade] = useState("");
  const [cidadeComparada, setCidadeComparada] = useState("");

  const [opcoes, setOpcoes] = useState([]);
  const [faixaEtária, setFaixaEtaria] = useState(true);
  const [estadoCivil, setEstadoCivil] = useState(true);
  const [escolaridadePublica, setEscolaridadePublica] = useState(true);
  const [nomeSocial, setNomeSocial] = useState(true);
  const [genero, setGenero] = useState(false);
  const [deficiencia, setDeficiencia] = useState(false);

  const { filtrarDados } = useContext(Context);

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

  return (
    <Card style={{ maxWidth: "300px" }}>
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
          <Col className="d-flex">
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
                  style={{ width: "100%", marginTop: "-0.5px" }}
                  aria-expanded={false}
                  caret
                  className="btn-round"
                  color="info"
                  id="opcoes"
                  type="button"
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
                      <span className="form-check-sign"></span>
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
                      <span className="form-check-sign"></span>
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
                      <span className="form-check-sign"></span>
                      Escolaridade Declarada
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
                <span className="form-check-sign"></span>
                Adicionar comparação
              </Label>

              {comparacaoAtiva ? (
                <>
                  <FormGroup className="mt-3">
                    <label htmlFor="cidadeComparada">Comparar com</label>
                    <select
                      name="cidadeComparada"
                      className="form-control mt-2"
                      style={{
                        width: "100%",
                        borderRadius: "3%",
                        color: "#32325d",
                      }}
                      onChange={(event) => {
                        const value = event.target.value.split(",");
                        setCidadeComparada(value);
                      }}
                    >
                      {cidades.map((cidade, index) => (
                        <option key={index} value={cidade}>
                          {cidade}
                        </option>
                      ))}
                    </select>
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
