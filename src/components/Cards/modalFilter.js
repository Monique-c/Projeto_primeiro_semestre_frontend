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
} from "reactstrap";

import '../../assets/styles/homepage.css';

export default function ModalFilter() {

  const [cidade, setCidade] = useState('');
  const [cidadeComparada, setCidadeComparada] = useState('');

  useEffect(() => {

  }, []);

  async function filtrarDados() {
    alert(`cidade: ${cidade}\n cidadeComparada: ${cidadeComparada}`)
  }

  async function limparDados() {
    setCidade('');
  }

  return (
    <Card style={{ width: '500px', height: '300px', marginLeft: '10px'}}>
      <div className='card-filtro-container'>
        <Row className='mb-5'>
          <Col lg='11'
            className='d-flex'
            style={{
              justifyContent: 'space-between',
              alignItems: 'center'
            }}
          >
            <span className='subtitle'> Filtre sua Pesquisa </span>
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
