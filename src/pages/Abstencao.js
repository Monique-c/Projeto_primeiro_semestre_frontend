import React, {
  useState,
  useEffect,
  useRef,
  useContext
} from "react";

import {
  Container,
  Row,
  Col,
} from "reactstrap";

import  { Bar } from "react-chartjs-2";

import {Context} from '../Context/FilterContext'

import lottie from "lottie-web";
import loading_lottie from "../assets/lottieJSONs/loading_lottie.json";

import "../assets/styles/homepage.css"
import "../assets/styles/abstenção.css"

// core components
import Navbar from "components/Navbars/Navbar.js";
import Footer from "components/Footers/Footer.js";
import AbstençãoFilter from "components/Cards/abstencaoFilter";
import InfoFilter  from "components/Cards/infoFilter";

export default function Abstencao() {
  const container = useRef(null);
  const { loading, dataResult, filtroAplicado } = useContext(Context);

  const [dados, setDados] = useState({})
  const [qtEleitores, setQtEleitores] = useState({})

  useEffect(() => {
    if (loading) {
      lottie.loadAnimation({
        container: container.current,
        renderer: "svg",
        loop: true,
        autoplay: true,
        animationData: loading_lottie
      })
    }
  }, [loading]);



  // const getData = () => {
  //   console.log(dataResult);
  //   const keys = Object.keys(dataResult[0])
  //   const values = Object.values(dataResult[0])
  //   let city = {}
  //   for (let i = 0; i < dataResult.length; i++) {
  //     // console.log(Object.keys(dataResult[i]));
  //     // console.log(Object.values(dataResult[i]));
  //   }

  //   keys.shift()
  //   values.shift()

  //   setDados({
  //     labels: Object.keys(dataResult[0]),
  //     datasets: [
  //       {
  //         "data": Object.values(dataResult[0]),
  //         label: dataResult[0]["NM_MUNICIPIO"],
  //         backgroundColor: "rgba(0,9,272,0.2)",
  //         borderColor: "rgba(0,9,272,1)",
  //         borderWidth: 1,
  //         hoverBackgroundColor: "rgba(0,9,232,0.4)",
  //         hoverBorderColor: "rgba(0,9,232,1)",
  //       },
  //       {
  //         "data": Object.values(dataResult[3]),
  //         label: dataResult[3]["NM_MUNICIPIO"],
  //         backgroundColor: "rgba(45,245,79,0.2)",
  //         borderColor: "rgba(45,245,79,0.7)",
  //         borderWidth: 1,
  //         hoverBackgroundColor: "rgba(45,245,79,0.4)",
  //         hoverBorderColor: "rgba(45,245,79,0.2)",
  //       }
  //     ]
  //   });
  // }

  // const data = {
  //   labels: ['1', '2', '3', '4', '5', '6'],
  //   datasets: [
  //     {
  //       label: '# of Red Votes',
  //       data: [12, 19, 3, 5, 2, 3],
  //       backgroundColor: 'rgb(255, 99, 132)',
  //     },
  //     {
  //       label: '# of Blue Votes',
  //       data: [2, 3, 20, 5, 1, 4],
  //       backgroundColor: 'rgb(54, 162, 235)',
  //     },
  //     {
  //       label: '# of Green Votes',
  //       data: [3, 10, 13, 15, 22, 30],
  //       backgroundColor: 'rgb(75, 192, 192)',
  //     },
  //   ],
  // };

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

  const Chart = () => {
    return (
      <Bar
        data={dataResult}
        width={100}
        height={40}
        options={options}
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

            {loading ? (
              <Col>
                <Row
                  style={{ height: "30%", marginTop: "-4%" }}
                  className='d-flex align-items-center mr-5'
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

