import React from 'react';

import { BrowserRouter, Switch, Route } from 'react-router-dom'

import Homepage from './pages'
import Teste from './pages/newPage'

function Routes() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={Homepage} />
        <Route path="/teste" exact component={Teste} />
      </Switch>
    </BrowserRouter>);
}

export default Routes;