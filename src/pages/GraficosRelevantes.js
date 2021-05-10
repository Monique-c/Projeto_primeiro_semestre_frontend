import React, { useState, useEffect, useRef, useContext } from "react";

// reactstrap components
import { Container, Row, Col } from "reactstrap";

import { Context } from "../Context/GráficosRelevantesFilterContext";

import { Line, Bar, HorizontalBar } from 'react-chartjs-2';

import lottie from 'lottie-web';
import loading_lottie from "../assets/lottieJSONs/loading_lottie.json";

import '../assets/styles/graficosRelevantes.css';
import "../assets/styles/homepage.css";

// core components
import Navbar from "components/Navbars/Navbar.js";
import Footer from "components/Footers/Footer.js";
import RelevanteFilter from 'components/Cards/graficosRelevantesFilter';
import InfoFilter from 'components/Cards/infoFilter'
import { max, min } from "moment";

export default function Relevantes() {
  const container = useRef(null);
  const {
    loading,
    filtroAplicado,
  } = useContext(Context);

  const [dados, setDados] = useState({});


  useEffect(() => {
    if (loading) {
      lottie.loadAnimation({
        container: container.current,
        renderer: "svg",
        loop: true,
        autoplay: true,
        animationData: loading_lottie,
      });
    }
  }, [loading]);

  const options = {
    maintainAspectRatio: true,
    scales: {
      yAxes: [
        {
          ticks: {
            beginAtZero: true,
          },
        },
      ],
    },
  };

  const data = {
    labels: ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'],
    datasets: [
      {
        label: "Dados",
        data: [300000, 200000, 275000, 125000, 260000, 307500, 175000, 235000, 260000, 240000, 270000, 270000],
        fill: false,
        borderColor: "#0A6893",
        backgroundColor: '#0A6893'
      },
      {
        label: "Mínimo",
        data: [155000, 155000, 155000, 155000, 155000, 155000, 155000, 155000, 155000, 155000, 155000],
        fill: false,
        borderColor: "#F09F54",
        backgroundColor: '#F09F54'
      },
      {
        label: "Máximo",
        data: [305000, 305000, 305000, 305000, 305000, 305000, 305000, 305000, 305000, 305000, 305000],
        fill: false,
        borderColor: "#626D80",
        backgroundColor: '#626D80'
      },
    ]
  };

  const Chart = () => {
    return (
      <div>
        <div className='gráfico-ilustração'>
          <h1>Ilustração</h1>
          <Line
            data={data}
            width={100}
            height={50}
            options={options}
          />
        </div>
      </div>
    )
  };

  return (
    <>
      <Navbar />
      <Container style={{ minHeight: "82vh" }} fluid>
        <div className="text-center my-5">
          <span className="abstencao-title">Gráficos Relevantes </span>
        </div>

        <Row>
          <Col lg="4">
            <RelevanteFilter />
          </Col>

          {loading ? (
            <Col>
              <Row
                style={{ height: "30%", marginTop: "-4%" }}
                className="d-flex align-items-center mr-5"
              >
                <div className="loading_lottie" ref={container} />
              </Row>
            </Col>
          ) : (
            <>
              {filtroAplicado ? (
                <Col lg='7'>
                  <Chart />
                </Col>
              ) : (
                <Col>
                  <InfoFilter />
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