import React, { useState, useEffect } from "react";

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

import "../../assets/styles/renda.css";

export default function RendaFilter() {
  const [cidade, setCidade] = useState("");
  const [cidadeComparada, setCidadeComparada] = useState("");

  const [regioes, setRegioes] = useState([]);
  const [sãoJoséDoRioPreto, setSãoJoséDoRioPreto] = useState(false);
  const [riberãoPreto, setRiberãoPreto] = useState(false);
  const [araçatuba, setAraçatuba] = useState(false);
  const [valeDoParaíba, setValeDoParaíba] = useState(false);
  const [araraquara, setAraraquara] = useState(false);
  const [piracicaba, setPiracicaba] = useState(false);

  const [opcoes, setOpcoes] = useState([]);
  const [rendaMedia, setRendaMedia] = useState(false);
  const [rendaMaior, setRendaMaior] = useState(false);
  const [rendaMenor, setRendaMenor] = useState(false);

  async function filtrarDados() {
    alert(`cidade: ${cidade}\n cidadeComparada: ${cidadeComparada}`);
  }

  async function limparDados() {
    setCidade("");
    setCidadeComparada("");
    setOpcoes([]);
    setRegioes([]);
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

  async function adicionarRegiao(regiao) {
    setRegioes([...regioes, regiao]);
    alert(`ADICIONADO\n\nregioes: \n [ ${regioes} ]`);
  }

  async function retirarRegiao(regiao) {
    let arrayPivot = regioes;
    setRegioes(arrayPivot.filter((item) => item !== regiao));
    alert(`RETIRADO\n\nregioes: \n [ ${regioes} ]`);
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
        <label htmlFor="regioes">Regiões do Estado</label>
        <UncontrolledDropdown>
          <DropdownToggle
            style={{ width: "100%", marginTop: "-0.5px" }}
            aria-expanded={false}
            caret
            className="btn-round"
            color="info"
            id="regioes"
            type="button"
          >
            Mesorregiões
          </DropdownToggle>
          <DropdownMenu aria-labelledby="dropdownMenuButton">
            <FormGroup check className="ml-4">
              <Label check>
                <Input
                  type="checkbox"
                  value={sãoJoséDoRioPreto}
                  onChange={() => {
                    setSãoJoséDoRioPreto(!sãoJoséDoRioPreto);
                    sãoJoséDoRioPreto
                      ? retirarRegiao("sãoJoséDoRioPreto")
                      : adicionarRegiao("sãoJoséDoRioPreto");
                  }}
                />
                <span className="form-check-sign"></span>
                São José Do Rio Preto
              </Label>

              <Label check>
                <Input
                  type="checkbox"
                  value={riberãoPreto}
                  onChange={() => {
                    setRiberãoPreto(!riberãoPreto);
                    riberãoPreto
                      ? retirarRegiao("riberãoPreto")
                      : adicionarRegiao("riberãoPreto");
                  }}
                />
                <span className="form-check-sign"></span>
                Riberão Preto
              </Label>

              <Label check>
                <Input
                  type="checkbox"
                  value={araçatuba}
                  onChange={() => {
                    setAraçatuba(!araçatuba);
                    araçatuba
                      ? retirarRegiao("araçatuba")
                      : adicionarRegiao("araçatuba");
                  }}
                />
                <span className="form-check-sign"></span>
                Araçatuba
              </Label>

              <Label check>
                <Input
                  type="checkbox"
                  value={valeDoParaíba}
                  onChange={() => {
                    setValeDoParaíba(!valeDoParaíba);
                    valeDoParaíba
                      ? retirarRegiao("valeDoParaíba")
                      : adicionarRegiao("valeDoParaíba");
                  }}
                />
                <span className="form-check-sign"></span>
                Vale Do Paraíba
              </Label>

              <Label check>
                <Input
                  type="checkbox"
                  value={araraquara}
                  onChange={() => {
                    setAraraquara(!araraquara);
                    araraquara
                      ? retirarRegiao("araraquara")
                      : adicionarRegiao("araraquara");
                  }}
                />
                <span className="form-check-sign"></span>
                Araraquara
              </Label>

              <Label check>
                <Input
                  type="checkbox"
                  value={piracicaba}
                  onChange={() => {
                    setPiracicaba(!piracicaba);
                    piracicaba
                      ? retirarRegiao("piracicaba")
                      : adicionarRegiao("piracicaba");
                  }}
                />
                <span className="form-check-sign"></span>
                Piracicaba
              </Label>
            </FormGroup>
          </DropdownMenu>
        </UncontrolledDropdown>

        <Row>
          <Col className="d-flex">
            <Form style={{ width: "100%", marginTop: "-0.5px" }}>
              <FormGroup>
                <label htmlFor="cidades">Cidades</label>
                <Input
                  id="cidades"
                  value={cidade}
                  onChange={(e) => setCidade(e.target.value)}
                  placeholder="São José dos Campos"
                />
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
                  Opções de Renda
                </DropdownToggle>
                <DropdownMenu aria-labelledby="dropdownMenuButton">
                  <FormGroup check className="ml-3">
                    <Label check>
                      <Input
                        type="checkbox"
                        value={rendaMaior}
                        onChange={() => {
                          setRendaMaior(!rendaMaior);
                          rendaMaior
                            ? retirarOpcao("rendaMaior")
                            : adicionarOpcao("rendaMaior");
                        }}
                      />
                      <span className="form-check-sign"></span>
                      Renda Maior
                    </Label>
                    <Label check>
                      <Input
                        type="checkbox"
                        value={rendaMenor}
                        onChange={() => {
                          setRendaMenor(!rendaMenor);
                          rendaMenor
                            ? retirarOpcao("rendaMenor")
                            : adicionarOpcao("rendaMenor");
                        }}
                      />
                      <span className="form-check-sign"></span>
                      Renda Menor
                    </Label>
                    <Label check>
                      <Input
                        type="checkbox"
                        value={rendaMedia}
                        onChange={() => {
                          setRendaMedia(!rendaMedia);
                          rendaMedia
                            ? retirarOpcao("rendaMedia")
                            : adicionarOpcao("rendaMedia");
                        }}
                      />
                      <span className="form-check-sign"></span>
                      Renda Média
                    </Label>
                  </FormGroup>
                </DropdownMenu>
              </UncontrolledDropdown>

              <div className="d-flex justify-content-end">
                <Button
                  onClick={() => filtrarDados()}
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
