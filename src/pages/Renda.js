import React, { useState } from "react";

// reactstrap components
import {
  Button,
  Card,
  CardImg,
  CardBody,
  CardTitle,
  CardText,
  Container,
  Row,
  Col,
} from "reactstrap";

import '../assets/styles/homepage.css'

// core components
import Navbar from "components/Navbars/Navbar.js";
import Footer from "components/Footers/Footer.js";

function Renda() {
  return (
    <>
      <Navbar />
      <Container>
        <div className="homepage-container">
          <span>Renda</span>
        </div>
      </Container>

      <Footer />
    </>
  );
}

export default Renda;