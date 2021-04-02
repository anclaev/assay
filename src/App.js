import { Component } from "react";
import { Route, Switch, Redirect, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { autoLogin } from "./store/actions/auth";

import Layout from "./hoc/Layout";
import Logout from "./components/Logout";
import Quiz from "./containers/Quiz";
import Auth from "./containers/Auth";
import New from "./containers/New";
import All from "./containers/All";

class App extends Component {
  componentDidMount() {
    this.props.autoLogin();
  }

  render() {
    let routes = (
      <Switch>
        <Route path="/auth" component={Auth} />
        <Route path="/quiz/:id" component={Quiz} />
        <Route path="/" exact component={All} />
        <Redirect to={"/"} />
      </Switch>
    );

    if (this.props.isAuth) {
      routes = (
        <Switch>
          <Route path="/quiz/:id" component={Quiz} />
          <Route path="/new" component={New} />
          <Route path="/logout" component={Logout} />
          <Route path="/" exact component={All} />
          <Redirect to={"/"} />
        </Switch>
      );
    }
    return <Layout>{routes}</Layout>;
  }
}

function mapStateToProps(state) {
  return {
    isAuth: !!state.auth.token,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    autoLogin: () => dispatch(autoLogin()),
  };
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
