import React, { useState, useEffect } from "react";

import {
  Button,
  Container,
  Card,
  Row,
  Col,
  Form,
  FormGroup,
  Input,
  FormText,
  Label,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  UncontrolledDropdown
} from "reactstrap";

import {useDispatch, useSelector} from "react-redux"

import api from "../../services/api";
import ibge from "../../services/api_ibge"

import "../../assets/styles/eleitorado.css";

export default function EleitoradoFilter(callback) {

  const [comparacaoAtiva, setComparacaoAtiva] = useState(false);
  const [representanteEleito, setRepresentanteEleito] = useState(false);

  const [cidades, setCidades] = useState([]);
  const [cidade, setCidade] = useState("");
  const [cidadeComparada, setCidadeComparada] = useState("");
  const [cidadeSelecionada, setCidadeSelecionada] = useState("");

  const [opcoes, setOpcoes] = useState([]);
  const [faixaEtária, setFaixaEtaria] = useState(false);
  const [estadoCivil, setEstadoCivil] = useState(false);
  const [escolaridadePublica, setEscolaridadePublica] = useState(false);
  const [genero, setGenero] = useState(false);
  const [deficiencia, setDeficiencia] = useState(false);
  const [nomeSocial, setNomeSocial] = useState(false);

  useEffect(() => {
    (async () => {
      const { data } = await ibge.get()
      const nomeCidades = data.map(city => city.nome);

      setCidades(nomeCidades);
    })()
  }, []);

  async function filtrarDados() {
    // alert(`cidade: ${cidade}\n cidadeComparada: ${cidadeComparada}`)

    const data = {
      "parametro_busca": "NM_MUNICIPIO",
      "filtro_busca": "SOCORRO"
    }
    const response = await api.post("pesquisas-abstencao", data)

    console.log(response.data);
  }

  async function limparDados() {
    setCidade("");
    setCidadeComparada("");
    setCidadeSelecionada("");
    setOpcoes([]);
  }

  async function adicionarOpcao(opcao) {
    setOpcoes([...opcoes, opcao])
    alert(`ADICIONADO\n\nopçoes: \n [ ${opcoes} ]`)
  }

  async function retirarOpcao(opcao) {
    let arrayPivot = opcoes;
    setOpcoes(arrayPivot.filter(item => item !== opcao));
    alert(`RETIRADO\n\nopçoes: \n [ ${opcoes} ]`)
  }

  return (
    <Card style={{ width: "300px", marginLeft: "10px" }}>
      <div className='card-filtro-container'>
        <Row className='mb-5'>
          <Col lg='11'
            className='d-flex'
            style={{
              justifyContent: "space-between",
              alignItems: "center"
            }}
          >
            <span className='subtitle'> Filtros </span>
            <span onClick={() => limparDados()}
              className='limpar-font'>
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
                    <option
                      key={index}
                      value={cidade}
                    >
                      {cidade}
                    </option>
                  ))}
                </select>
              </FormGroup>

              <label htmlFor="opcoes">Opções</label>
              <UncontrolledDropdown>
                <DropdownToggle
                  caret
                  className='btn-round w-100'
                  color="info"
                  id="opcoes"
                >
                  Opções de Filtro
                </DropdownToggle>
                <DropdownMenu aria-labelledby="dropdownMenuButton">
                  <FormGroup check className='ml-3'>
                    <Label check>
                      <Input
                        type="checkbox"
                        value={faixaEtária}
                        onChange={() => {
                          setFaixaEtaria(!faixaEtária);
                          faixaEtária ? retirarOpcao("faixaEtária") : adicionarOpcao("faixaEtária")
                        }}
                      />
                      <span className="form-check-sign" />
                        Faixa Etária
                    </Label>

                    <Label check>
                      <Input
                        type="checkbox"
                        value={estadoCivil}
                        onChange={() => {
                          setEstadoCivil(!estadoCivil);
                          estadoCivil ? retirarOpcao("estadoCivil") : adicionarOpcao("estadoCivil")
                        }}
                      />
                      <span className="form-check-sign" />
                        Estado civil
                      </Label>

                    <Label check>
                      <Input
                        type="checkbox"
                        value={escolaridadePublica}
                        onChange={() => {
                          setEscolaridadePublica(!escolaridadePublica);
                          escolaridadePublica ? retirarOpcao("escolaridadePublica") : adicionarOpcao("escolaridadePublica")
                        }}
                      />
                      <span className="form-check-sign" />
                        Escolaridade Declarada
                      </Label>

                    <Label check>
                      <Input
                        type="checkbox"
                        value={nomeSocial}
                        onChange={() => {
                          setNomeSocial(!nomeSocial);
                          nomeSocial ? retirarOpcao("nomeSocial") : adicionarOpcao("nomeSocial")
                        }}
                      />
                      <span className="form-check-sign" />
                        Nome social
                    </Label>
                  </FormGroup>
                </DropdownMenu>
              </UncontrolledDropdown>

              <Label check className='mt-4 ml-3'>
                <Input
                  type="checkbox"
                  value={comparacaoAtiva}
                  onClick={() => setComparacaoAtiva(!comparacaoAtiva)}
                />
                <span className="form-check-sign" />
                Adicionar comparação
              </Label>

              {comparacaoAtiva ?
                (<>
                  <FormGroup className='mt-3'>
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
                        <option
                          key={index}
                          value={cidade}
                        >
                          {cidade}
                        </option>
                      ))}
                    </select>
                  </FormGroup>
                </>)
                : null
              }

              <Label check className='mt-4 ml-3'>
                <Input
                  type="checkbox"
                  value={representanteEleito}
                  onClick={() => setRepresentanteEleito(!representanteEleito)}
                />
                <span className="form-check-sign"></span>
                Representante Eleito
              </Label>

              <div className='d-flex justify-content-end'>
                <Button onClick={() => filtrarDados()}
                  style={{
                    backgroundColor: "#214bb5",
                  }}>
                  Aplicar
                </Button>
              </div>
            </Form>
          </Col>
        </Row>
      </div>
    </Card>
  )
}
