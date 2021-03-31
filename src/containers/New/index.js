import React, { Component } from "react";
import classes from "./New.module.sass";

export default class New extends Component {
  render() {
    return (
      <div className={classes.new}>
        <div className={classes.wrapper}>
          <h1 className={classes.title}>Новый квиз</h1>
        </div>
      </div>
    );
  }
}
