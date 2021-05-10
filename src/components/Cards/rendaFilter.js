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

import "../../assets/styles/renda.css";

import ibge from "../../services/api_ibge";

export default function RendaFilter() {
  const [cidade, setCidade] = useState("");
  const [cidadeComparada, setCidadeComparada] = useState("");

  const [cidades, setCidades] = useState([]);
  const [cidadeEscolhida, setCidadeEscolhida] = useState([]);

  function setCities() {
    setCidades(...(cidadeEscolhida + cidades));
  }

  useEffect(() => {
    (async () => {
      const { data } = await ibge.get();
      const nomeCidades = data.map((city) => city.nome);

      setCidades(nomeCidades);
    })();
  }, []);

  async function filtrarDados() {
    alert(`cidade: ${cidade}\n cidadeComparada: ${cidadeComparada}`);
  }

  async function limparDados() {
    setCidade("");
    setCidadeComparada("");
    setCidades([]);
  }

  async function adicionarRegiao(regiao) {
    setCidades([...cidades, regiao]);
    alert(`ADICIONADO\n\ncidades: \n [ ${cidades} ]`);
  }

  async function retirarRegiao(regiao) {
    let arrayPivot = cidades;
    setCidades(arrayPivot.filter((item) => item !== regiao));
    alert(`RETIRADO\n\ncidades: \n [ ${cidades} ]`);
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
        <label htmlFor="cidades">Cidades do Estado</label>

        <Row>
          <Col className="d-flex">
            <Form style={{ width: "100%", marginTop: "-0.5px" }}>
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
