import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";

import { AbstencaoProvider } from "./Context/AbstencaoFilterContext";
import { EleitoradoProvider } from "./Context/EleitoradoFilterContext";
import { RendaProvider } from "./Context/RendaFilterContext";

// styles for this kit
import "assets/css/bootstrap.min.css";
import "assets/scss/now-ui-kit.scss?v=1.4.0";
import "assets/demo/demo.css?v=1.4.0";
import "assets/demo/nucleo-icons-page-styles.css?v=1.4.0";

// styles for global Pages
import "assets/styles/global.css";

//API Pages
import Homepage from "./pages/Homepage";
import Eleitorado from "./pages/Eleitorado";
import Abstencao from "./pages/Abstencao";
import Renda from "./pages/Renda";

import Navbar from "components/Navbars/Navbar.js";
import Footer from "components/Footers/Footer.js";

ReactDOM.render(
  <BrowserRouter>
    <Switch>
      <Switch>
        <Route path="/home" render={(props) => <Homepage {...props} />} />

        <Route
          path="/eleitorado"
          render={(props) => (
            <EleitoradoProvider>
              <Navbar />
              <Eleitorado {...props} />
              <Footer />
            </EleitoradoProvider>
          )}
        />

        <Route
          path="/abstencao"
          render={(props) => (
            <AbstencaoProvider>
              <Navbar />
              <Abstencao {...props} />
              <Footer />
            </AbstencaoProvider>
          )}
        />

        <Route
          path="/renda"
          render={(props) => (
            <RendaProvider>
              <Navbar />
              <Renda {...props} />
              <Footer />
            </RendaProvider>
          )}
        />

        <Redirect to="/home" />
        <Redirect from="/" to="/home" />
      </Switch>
    </Switch>
  </BrowserRouter>,
  document.getElementById("root")
);
