import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";

// styles for this kit
import "assets/css/bootstrap.min.css";
import "assets/scss/now-ui-kit.scss?v=1.4.0";
import "assets/demo/demo.css?v=1.4.0";
import "assets/demo/nucleo-icons-page-styles.css?v=1.4.0";

//API Pages
import Homepage from './pages/Homepage';
import Eleitorado from './pages/Eleitorado';

ReactDOM.render(
  <BrowserRouter>
    <Switch>
      <Switch>
        <Route path="/home"
          render={(props) => <Homepage {...props} />}
        />
        <Route
          path="/eleitorado"
          render={(props) => <Eleitorado {...props} />}
        />
        <Redirect to="/home" />
        <Redirect from="/" to="/home" />
      </Switch>
    </Switch>
  </BrowserRouter>,
  document.getElementById("root")
);
