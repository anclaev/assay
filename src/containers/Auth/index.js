import React, { Component } from "react";
import classes from "./Auth.module.sass";
import Button from "../../components/UI/Button";
import Input from "../../components/UI/Input";

export default class Auth extends Component {
  submitHandler = (event) => {
    event.preventDefault();
  };

  loginHandler() {}
  registerHandler() {}

  render() {
    return (
      <div className={classes.auth}>
        <div className={classes.wrapper}>
          <h1 className={classes.title}>Войти</h1>

          <form onSubmit={this.submitHandler} className={classes.form}>
            <Input label="E-mail" />
            <Input label="Пароль" />
            <Button onClick={this.loginHandler}>Поехали!</Button>
            <Button onClick={this.registerHandler}>Зарегистрироваться</Button>
          </form>
        </div>
      </div>
    );
  }
}
