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

import '../../assets/styles/graficosRelevantes.css';

export default function RelevantesFilter() {

  const [assunto, setAssunto] = useState('');
 
  const [categorias, setCategorias] = useState([]);
  const [faixaEtária, setFaixaEtaria] = useState(false);
  const [estadoCivil, setEstadoCivil] = useState(false);
  const [escolaridadePublica, setEscolaridadePublica] = useState(false);
  const [nomeSocial, setNomeSocial] = useState(false);

  const [localizações, setLocalização] = useState([]);
  const [sãoJoséDoRioPreto, setSãoJoséDoRioPreto] = useState(false);
  const [riberãoPreto, setRiberãoPreto] = useState(false);
  const [araçatuba, setAraçatuba] = useState(false);
  const [valeDoParaíba, setValeDoParaíba] = useState(false);
  const [araraquara, setAraraquara] = useState(false);
  const [piracicaba, setPiracicaba] = useState(false); 

  useEffect(() => {

  }, []);

  async function filtrarDados() {
    alert(`categoria: ${categorias}\n localização: ${localizações}`)
  }

  async function limparDados() {
    setAssunto('');
    setCategorias([]);
    setLocalização([]);
  }

  async function adicionarCategoria(categoria) {
    setCategorias([...categorias, categoria])
    alert(`ADICIONADO\n\ncategorias: \n [ ${categorias} ]`)
  }

  async function retirarCategoria(categoria) {
    let arrayPivot = categorias;
    setCategorias(arrayPivot.filter(item => item !== categoria));
    alert(`RETIRADO\n\ncategorias: \n [ ${categorias} ]`)
  }

  async function adicionarLocalização(localização) {
    setLocalização([...localizações, localização])
    alert(`ADICIONADO\n\nlocalizações: \n [ ${localizações} ]`)
  }

  async function retirarLocalização(localização) {
    let arrayPivot = localização;
    setLocalização(arrayPivot.filter(item => item !== localização));
    alert(`RETIRADO\n\nlocalizações: \n [ ${localizações} ]`)
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
                <label htmlFor="assuntos">Assuntos</label>
                <Input
                  id="assuntos"
                  value={assunto}
                  onChange={e => setAssunto(e.target.value)}
                  placeholder="Eleitorado"
                />
              </FormGroup>

              <label htmlFor="categoria">Categoria</label>
              <UncontrolledDropdown>
                <DropdownToggle
                  style={{ width: '100%', marginTop: '-0.5px' }}
                  aria-expanded={false}
                  caret
                  className='btn-round'
                  color="info"
                  id="categoria"
                  type="button">
                  Ver Opções
                </DropdownToggle>
                <DropdownMenu aria-labelledby="dropdownMenuButton">
                  <FormGroup check className='ml-3'>
                    <Label check>
                      <Input
                        type="checkbox"
                        value={faixaEtária}
                        onChange={() => {
                          setFaixaEtaria(!faixaEtária);
                          faixaEtária ? retirarCategoria('faixaEtária') : adicionarCategoria('faixaEtária')
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
                          estadoCivil ? retirarCategoria('estadoCivil') : adicionarCategoria('estadoCivil')
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
                          escolaridadePublica ? retirarCategoria('escolaridadePublica') : adicionarCategoria('escolaridadePublica')
                        }}
                      />
                      <span className="form-check-sign"></span>
                        Escolaridade Declarada
                      </Label>

                      <Label check>
                      <Input
                        type="checkbox"
                        value={nomeSocial}
                        onChange={() => {
                          setNomeSocial(!nomeSocial);
                          nomeSocial ? retirarCategoria('nomeSocial') : adicionarCategoria('nomeSocial')
                        }}
                      />
                      <span className="form-check-sign"></span>
                        Nome Social
                      </Label>
                  </FormGroup>
                </DropdownMenu>
              </UncontrolledDropdown>

              <label htmlFor="localização">Localização</label>
              <UncontrolledDropdown>
                <DropdownToggle
                  style={{ width: '100%', marginTop: '-0.5px' }}
                  aria-expanded={false}
                  caret
                  className='btn-round'
                  color="info"
                  id="localização"
                  type="button">
                  Estado/Região/Cidade
                </DropdownToggle>
                <DropdownMenu aria-labelledby="dropdownMenuButton">
                  <FormGroup check className='ml-4'>
                    <Label check>
                      <Input
                        type="checkbox"
                        value={sãoJoséDoRioPreto}
                        onChange={() => {
                          setSãoJoséDoRioPreto(!sãoJoséDoRioPreto);
                          sãoJoséDoRioPreto ? retirarLocalização('sãoJoséDoRioPreto') : adicionarLocalização('sãoJoséDoRioPreto')
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
                          riberãoPreto ? retirarLocalização('riberãoPreto') : adicionarLocalização('riberãoPreto')
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
                          araçatuba ? retirarLocalização('araçatuba') : adicionarLocalização('araçatuba')
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
                          valeDoParaíba ? retirarLocalização('valeDoParaíba') : adicionarLocalização('valeDoParaíba')
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
                          araraquara ? retirarLocalização('araraquara') : adicionarLocalização('araraquara')
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
                          piracicaba ? retirarLocalização('piracicaba') : adicionarLocalização('piracicaba')
                        }}
                      />
                      <span className="form-check-sign"></span>
                        Piracicaba
                      </Label>
                  </FormGroup>
                </DropdownMenu>
              </UncontrolledDropdown>
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