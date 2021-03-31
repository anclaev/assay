import React, { Component } from "react";
import classes from "./Auth.module.sass";
import Button from "../../components/UI/Button";
import Input from "../../components/UI/Input";

const validateEmail = (email) => {
  const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
};

export default class Auth extends Component {
  state = {
    formControls: {
      email: {
        value: "",
        type: "email",
        label: "E-mail",
        error: "Введите корректный email",
        valid: false,
        touched: false,
        validation: {
          required: true,
          email: true,
        },
      },
      password: {
        value: "",
        type: "password",
        label: "Пароль",
        error: "Введите корректный пароль",
        valid: false,
        touched: false,
        validation: {
          required: true,
          minLength: 6,
        },
      },
    },
  };

  submitHandler = (event) => {
    event.preventDefault();
  };

  validate(value, validation) {
    if (!validation) return true;

    let isValid = true;

    if (validation.required) {
      isValid = value.trim() !== "" && isValid;
    }

    if (validation.email) {
      isValid = validateEmail(value) && isValid;
    }

    if (validation.minLength) {
      isValid = value.length >= validation.minLength && isValid;
    }

    return isValid;
  }

  onChangeHandler = (event, controlName) => {
    const formControls = { ...this.state.formControls };
    const control = { ...formControls[controlName] };

    control.value = event.target.value;
    control.touched = true;
    control.valid = this.validate(control.value, control.validation);
    formControls[controlName] = control;
    this.setState({ formControls });
  };

  loginHandler() {}
  registerHandler() {}

  renderInputs() {
    return Object.keys(this.state.formControls).map((controlName, index) => {
      const control = this.state.formControls[controlName];
      return (
        <Input
          key={controlName + index}
          type={control.type}
          value={control.value}
          valid={control.valid}
          touched={control.touched}
          label={control.label}
          error={control.error}
          shouldValidate={!!control.validation}
          onChange={(event) => this.onChangeHandler(event, controlName)}
        />
      );
    });
  }

  render() {
    return (
      <div className={classes.auth}>
        <div className={classes.wrapper}>
          <h1 className={classes.title}>Войти</h1>
          <form onSubmit={this.submitHandler} className={classes.form}>
            {this.renderInputs()}
            <Button onClick={this.loginHandler}>Поехали!</Button>
            <Button onClick={this.registerHandler}>Зарегистрироваться</Button>
          </form>
        </div>
      </div>
    );
  }
}
