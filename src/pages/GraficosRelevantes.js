import React, { useState } from "react";

// reactstrap components
import {
  Container
} from "reactstrap";

import "../assets/styles/homepage.css"

// core components
import Navbar from "components/Navbars/Navbar.js";
import Footer from "components/Footers/Footer.js";

function GraficosRelevantes() {
  return (
    <>
      <Navbar />
      <Container>
        <div className="homepage-container">
          <span>Graficos Relevantes</span>
        </div>
      </Container>

      <Footer />
    </>
  );
}

export default GraficosRelevantes;
