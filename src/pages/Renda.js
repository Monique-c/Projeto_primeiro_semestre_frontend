import React, { useState, useEffect, useRef, useContext } from "react";

import { Container, Row, Col } from "reactstrap";

import { Bar, HorizontalBar } from "react-chartjs-2";

import { Context } from "../Context/RendaFilterContextTeste";

import lottie from "lottie-web";
import loading_lottie from "../assets/lottieJSONs/loading_lottie.json";

import "../assets/styles/homepage.css";
import "../assets/styles/renda.css";

// core components
import Navbar from "components/Navbars/Navbar.js";
import Footer from "components/Footers/Footer.js";
import RendaFilter from "components/Cards/rendaFilter";
import InfoFilter from "components/Cards/infoFilter";

export default function Renda() {
  const container = useRef(null);
  const { loading, filtroAplicado, PIB, PIB_percapita } = useContext(Context);

  // const [cidades, setCidades] = useState([
  //   "Osasco",
  //   "Bauru",
  //   "Poa",
  //   "Jaú",
  //   "Jacarei",
  // ]);

  // const data = {
  //   labels: [cidades[0], cidades[1], cidades[2], cidades[3], cidades[4]],
  //   datasets: [
  //     {
  //       label: "PIB das Cidades",
  //       data: { PIB },
  //       backgroundColor: [
  //         "rgba(255, 80, 132, 0.2)",
  //         "rgba(54, 162, 235, 0.2)",
  //         "rgba(255, 206, 86, 0.2)",
  //         "rgba(75, 192, 192, 0.2)",
  //         "rgba(153, 102, 255, 0.2)",
  //         "rgba(255, 159, 64, 0.2)",
  //       ],
  //       borderColor: [
  //         "rgba(255, 80, 132, 1)",
  //         "rgba(54, 162, 235, 1)",
  //         "rgba(255, 206, 86, 1)",
  //         "rgba(75, 192, 192, 1)",
  //         "rgba(153, 102, 255, 1)",
  //         "rgba(255, 159, 64, 1)",
  //       ],
  //       borderWidth: 1,
  //     },
  //   ],
  // };

  const options = {
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

  const Chart = () => {
    return (
      <div>
        <div>
          <h5>
            <b>PIB</b>
          </h5>
          <Bar data={PIB} options={options} />
        </div>
        <div>
          <h5>
            <b>PIB_percapita </b>
          </h5>
          {/* <Bar data={PIB_percapita} /> */}
        </div>
      </div>
    );
  };

  return (
    <>
      <Navbar />
      <Container style={{ minHeight: "82vh" }} fluid>
        <div className="text-center my-5">
          <span className="renda-title">Renda</span>
        </div>

        <Row>
          <Col lg="4">
            <RendaFilter />
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
                <Col>
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
