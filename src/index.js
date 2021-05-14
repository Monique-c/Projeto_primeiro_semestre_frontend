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

//API Pages
import Homepage from "./pages/Homepage";
import Eleitorado from "./pages/Eleitorado";
import Abstencao from "./pages/Abstencao";
import Renda from "./pages/Renda";

ReactDOM.render(
  <BrowserRouter>
    <Switch>
      <Switch>
        <Route path="/home" render={(props) => <Homepage {...props} />} />

        <Route
          path="/eleitorado"
          render={(props) => (
            <EleitoradoProvider>
              <Eleitorado {...props} />
            </EleitoradoProvider>
          )}
        />

        <Route
          path="/abstencao"
          render={(props) => (
            <AbstencaoProvider>
              <Abstencao {...props} />
            </AbstencaoProvider>
          )}
        />

        <Route
          path="/renda"
          render={(props) => (
            <RendaProvider>
              <Renda {...props} />
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
