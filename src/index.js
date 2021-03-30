import "./index.sass";

import React from "react";
import ReactDOM from "react-dom";

import Layout from "./hoc/Layout";
import Quiz from "./containers/Quiz";

ReactDOM.render(
  <React.StrictMode>
    <Layout>
      <Quiz />
    </Layout>
  </React.StrictMode>,
  document.getElementById("root")
);
