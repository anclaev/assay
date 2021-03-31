import React, { Component } from "react";
import classes from "./All.module.sass";

export default class All extends Component {
  render() {
    return (
      <div className={classes.all}>
        <div className={classes.wrapper}>
          <h1 className={classes.title}>Квизы</h1>
        </div>
      </div>
    );
  }
}
