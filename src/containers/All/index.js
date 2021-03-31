import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import classes from "./All.module.sass";

export default class All extends Component {
  renderQuizes = () => {
    return [1, 2, 3].map((quiz, index) => {
      return (
        <li className={classes.item} key={index}>
          <NavLink to={`/quiz/${quiz}`}>Тест №{quiz}</NavLink>
        </li>
      );
    });
  };

  render() {
    return (
      <div className={classes.all}>
        <div className={classes.wrapper}>
          <h1 className={classes.title}>Квизы</h1>

          <ul>{this.renderQuizes()}</ul>
        </div>
      </div>
    );
  }
}
