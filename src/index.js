import "./index.sass";

import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { createStore, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import rootReducer from "./store/reducers/root";
import thunk from "redux-thunk";

import Layout from "./hoc/Layout";
import Quiz from "./containers/Quiz";
import Auth from "./containers/Auth";
import New from "./containers/New";
import All from "./containers/All";

const store = createStore(rootReducer, applyMiddleware(thunk));

const App = (
  <Provider store={store}>
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
  </Provider>
);

ReactDOM.render(
  <React.StrictMode>{App}</React.StrictMode>,
  document.getElementById("root")
);
