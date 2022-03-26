import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";

import AdminLayout from "layouts/Admin.js";

import "assets/scss/material-react.scss?v=1.10.0";

ReactDOM.render(
  <BrowserRouter>
    <Switch>
      <Route path="/admin" component={AdminLayout} />
      <Redirect from="/" to="/admin/dashboard" />
    </Switch>
  </BrowserRouter>,
  document.getElementById("root")
);
