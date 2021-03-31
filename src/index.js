import "./index.sass";

import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import Layout from "./hoc/Layout";
import Quiz from "./containers/Quiz";
import Auth from "./containers/Auth";
import New from "./containers/New";
import All from "./containers/All";

const App = (
  <BrowserRouter>
    <Layout>
      <Switch>
        <Route path="/auth" component={Auth} />
        <Route path="/quiz/:id" component={Quiz} />
        <Route path="/new" component={New} />
        <Route path="/" component={All} />
      </Switch>
    </Layout>
  </BrowserRouter>
);

ReactDOM.render(
  <React.StrictMode>{App}</React.StrictMode>,
  document.getElementById("root")
);
