import React, { Component } from "react";
import classes from "./New.module.sass";
import Input from "../../components/UI/Input";
import Button from "../../components/UI/Button";
import { createControl } from "../../form";

export default class New extends Component {
  state = {
    quiz: [],
    formControls: {
      question: createControl(
        {
          label: "Вопрос",
        },
        { required: true }
      ),
      option1: createControl(
        {
          label: `Вариант №1`,
        },
        { required: true }
      ),
      option2: createControl(
        {
          label: `Вариант №2`,
        },
        { required: true }
      ),
      option3: createControl(
        {
          label: `Вариант №3`,
        },
        { required: true }
      ),
      option4: createControl(
        {
          label: `Вариант №4`,
        },
        { required: true }
      ),
    },
  };

  submitHandler = (event) => event.preventDefault();
  addQuestionHandler = () => {};
  createQuizeHandler = () => {};
  changeHandler = (value, controlName) => {};

  renderInputs() {
    return Object.keys(this.state.formControls).map((controlName, index) => {
      const control = this.state.formControls[controlName];
      return (
        <Input
          label={control.label}
          value={control.value}
          valid={control.valid}
          shouldValidate={!!control.validation}
          touched={control.touched}
          key={controlName + index}
          type={control.type}
          onChange={(event) =>
            this.changeHandler(event.target.value, controlName)
          }
        />
      );
    });
  }

  render() {
    return (
      <div className={classes.new}>
        <div className={classes.wrapper}>
          <h1 className={classes.title}>Создать квиз</h1>
          <form onSubmit={this.submitHandler} className={classes.form}>
            {this.renderInputs()}
            <select></select>
            <Button onClick={this.addQuestionHandler}>Добавить вопрос</Button>
            <Button onClick={this.createQuizeHandler}>Создать тест</Button>
          </form>
        </div>
      </div>
    );
  }
}
