import React, { Component } from "react";
import classes from "./Auth.module.sass";

export default class Auth extends Component {
  render() {
    return (
      <div className={classes.auth}>
        <div className={classes.wrapper}>
          <h1 className={classes.title}>Авторизация</h1>
        </div>
      </div>
    );
  }
}
