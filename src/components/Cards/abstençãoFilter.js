import React, { useState, useEffect } from 'react';

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

import '../../assets/styles/abstenção.css';

export default function AbstençãoFilter() {

  const [comparacaoAtiva, setComparacaoAtiva] = useState(false);

  const [cidade, setCidade] = useState('');
  const [cidadeComparada, setCidadeComparada] = useState('');
 
  const [opcoes, setOpcoes] = useState([]);
  const [faixaEtária, setFaixaEtaria] = useState(false);
  const [estadoCivil, setEstadoCivil] = useState(false);
  const [escolaridadePublica, setEscolaridadePublica] = useState(false);
  const [genero, setGenero] = useState(false);
  const [deficiencia, setDeficiencia] = useState(false);

  useEffect(() => {

  }, []);

  async function filtrarDados() {
    alert(`cidade: ${cidade}\n cidadeComparada: ${cidadeComparada}`)
  }

  async function limparDados() {
    setCidade('');
    setCidadeComparada('');
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
    <Card style={{ width: '300px', marginLeft: '10px' }}>
      <div className='card-filtro-container'>
        <Row className='mb-5'>
          <Col lg='11'
            className='d-flex'
            style={{
              justifyContent: 'space-between',
              alignItems: 'center'
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
          <Col className='d-flex'>
            <Form 
              style={{width:'100%'}}>
              <FormGroup>
                <label htmlFor="cidades">Cidades</label>
                <Input
                  id="cidades"
                  value={cidade}
                  onChange={e => setCidade(e.target.value)}
                  placeholder="São José dos Campos"
                />
              </FormGroup>

              <label htmlFor="opcoes">Opções</label>
              <UncontrolledDropdown>
                <DropdownToggle
                  style={{ width: '100%', marginTop: '-0.5px' }}
                  aria-expanded={false}
                  caret
                  className='btn-round'
                  color="info"
                  id="opcoes"
                  type="button">
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
                          faixaEtária ? retirarOpcao('faixaEtária') : adicionarOpcao('faixaEtária')
                        }}
                      />
                      <span className="form-check-sign"></span>
                        Faixa Etária
                    </Label>

                    <Label check>
                      <Input
                        type="checkbox"
                        value={estadoCivil}
                        onChange={() => {
                          setEstadoCivil(!estadoCivil);
                          estadoCivil ? retirarOpcao('estadoCivil') : adicionarOpcao('estadoCivil')
                        }}
                      />
                      <span className="form-check-sign"></span>
                        Estado civil
                      </Label>

                    <Label check>
                      <Input
                        type="checkbox"
                        value={escolaridadePublica}
                        onChange={() => {
                          setEscolaridadePublica(!escolaridadePublica);
                          escolaridadePublica ? retirarOpcao('escolaridadePublica') : adicionarOpcao('escolaridadePublica')
                        }}
                      />
                      <span className="form-check-sign"></span>
                        Escolaridade Declarada
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
                <span className="form-check-sign"></span>
                Adicionar comparação
              </Label>

              {comparacaoAtiva ?
                (<>
                  <FormGroup className='mt-3'>
                    <label htmlFor="cidadeComparada">Comparar com</label>
                    <Input
                      id="cidadeComparada"
                      placeholder="São José dos Campos"
                      value={cidadeComparada}
                      onChange={e => setCidadeComparada(e.target.value)}
                    />
                  </FormGroup>
                </>)
                : null
              }
    
              <div className='d-flex justify-content-end'>
                <Button onClick={() => filtrarDados()}
                  style={{
                    backgroundColor: '#214bb5',
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