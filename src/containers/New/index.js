import React, { Component } from "react";
import classes from "./New.module.sass";
import Input from "../../components/UI/Input";
import Select from "../../components/UI/Select";
import Button from "../../components/UI/Button";
import { createControl } from "../../form";

export default class New extends Component {
  state = {
    quiz: [],
    rightAnswerId: 1,
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
  selectChangeHandler = (event) => {
    this.setState({
      rightAnswerId: +event.target.value,
    });
  };

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
    const select = (
      <Select
        label="Правильный ответ"
        value={this.state.rightAnswerId}
        onChange={this.selectChangeHandler}
        options={[
          { text: 1, value: 1 },
          { text: 2, value: 2 },
          { text: 3, value: 3 },
          { text: 4, value: 4 },
        ]}
      />
    );
    return (
      <div className={classes.new}>
        <div className={classes.wrapper}>
          <h1 className={classes.title}>Создать квиз</h1>
          <form onSubmit={this.submitHandler} className={classes.form}>
            {this.renderInputs()}
            {select}
            <Button onClick={this.addQuestionHandler}>Добавить вопрос</Button>
            <Button onClick={this.createQuizeHandler}>Создать тест</Button>
          </form>
        </div>
      </div>
    );
  }
}
