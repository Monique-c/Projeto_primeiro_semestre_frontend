import React from 'react'

import {
  Row,
} from "reactstrap";

import SemFiltro from "assets/img/Icons/semFiltro.svg";

export default function InfoFilter () {
  return (
    <Row
      style={{ height: "50%", marginLeft: "15%" }}
      className='mt-5 d-flex align-items-center mr-5'
    >
      <img src={SemFiltro} width='230px' height='230px' alt="Realize um filtro"/>
      <span id='mensagem-sem-filtro'>
        Realize um filtro <br />
        no lado esquerdo <br />
        para iniciar sua busca.
      </span>
    </Row>
  )
}
