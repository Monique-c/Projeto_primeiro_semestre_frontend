import React, { useState,useEffect,useRef } from "react";

// reactstrap components
import {
  Container,
  Row,
  Col,
} from "reactstrap";

import  { Bar } from "react-chartjs-2";

import { useSelector, useDispatch } from "react-redux";

import * as LoadingData from "../store/actions/filterGraphics";

import api from "../services/api"

import lottie from "lottie-web";
import loading from "../assets/lottieJSONs/loading.json";

import "../assets/styles/homepage.css"
import "../assets/styles/abstenção.css"

import SemFiltro from "assets/img/Icons/semFiltro.svg";

// core components
import Navbar from "components/Navbars/Navbar.js";
import Footer from "components/Footers/Footer.js";
import AbstençãoFilter from "components/Cards/abstencaoFilter";

export default function Abstencao() {
  const dispatch = useDispatch()
  const container = useRef(null);

  const loadingData = useSelector((state) => state.filterGraphics.loading);
  const filtroAplicado = useSelector((state) => state.filterGraphics.filterApplied);
  const dataResult = useSelector((state) => state.filterGraphics.data);

  const [dados, setDados] = useState({})

  useEffect(() => {
    if (loadingData) {
      lottie.loadAnimation({
        container: container.current,
        renderer: "svg",
        loop: true,
        autoplay: true,
        animationData: loading
      })
    }
  }, [loadingData]);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {if (filtroAplicado) getData()}, [filtroAplicado])

  const getData = () => {
    const keys = Object.keys(dataResult)
    const values = Object.values(dataResult)

    keys.shift()
    values.shift()

    setDados({
        labels: keys,
        datasets: [
          {
            "data": values,
            backgroundColor: "rgba(0,9,272,0.2)",
            borderColor: "rgba(0,9,272,1)",
            borderWidth: 1,
            hoverBackgroundColor: "rgba(0,9,232,0.4)",
            hoverBorderColor: "rgba(0,9,232,1)",
          }
        ]
      }
    );
  }

  const Chart = () => {
    return (
      <Bar
        data={dados}
        width={100}
        height={40}
        legend={false}
        options={{
          maintainAspectRatio: true
        }}
      />
    )
  }


  return (
    <>
      <Navbar />
      <Container style={{ minHeight: "82vh" }} fluid>

        <div className='text-center my-5'>
          <span className='abstencao-title'>Comparecimento/Abstenção</span>
        </div>

        <Row>
          <Col lg="3">
            <AbstençãoFilter/>
          </Col>

          {loadingData ? (
            <Col>
              <Row
                style={{ height: "30%", marginTop: "-4%" }}
                className='d-flex align-items-center mr-5'
              >
                <div className="loading" ref={container} />
              </Row>
            </Col>
            ) : (
              <>
                {filtroAplicado ? (
                  <Col>
                    <Chart />
                  </Col>
                ) : (
                  <Col>
                    <Row
                      style={{ height: "50%", marginLeft: "15%" }}
                      className='mt-5 d-flex align-items-center mr-5'
                    >
                      <img src={SemFiltro} width='230px' height='230px' />
                      <span id='mensagem-sem-filtro'>
                        Realize um filtro <br />
                        no lado esquerdo <br />
                        para iniciar sua busca.
                      </span>
                    </Row>
                  </Col>
                )}
              </>
            )}
        </Row>
      </Container>
      <Footer />
    </>
  );
}

