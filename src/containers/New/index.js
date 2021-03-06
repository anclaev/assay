import React, { Component } from "react";
import classes from "./New.module.sass";
import Input from "../../components/UI/Input";
import Select from "../../components/UI/Select";
import Button from "../../components/UI/Button";
import { createControl, validate, validateForm } from "../../form";
import { connect } from "react-redux";
import {
  createQuizQuestion,
  finishCreateQuiz,
} from "../../store/actions/create";

class New extends Component {
  state = {
    isFormValid: false,
    rightAnswerId: 1,
    formControls: {
      quizName: createControl({ label: "Название квиза" }, { required: true }),
      question: createControl(
        {
          label: "Вопрос",
        },
        { required: true }
      ),
      option1: createControl(
        {
          label: `Вариант №1`,
          id: 1,
        },
        { required: true }
      ),
      option2: createControl(
        {
          label: `Вариант №2`,
          id: 2,
        },
        { required: true }
      ),
      option3: createControl(
        {
          label: `Вариант №3`,
          id: 3,
        },
        { required: true }
      ),
      option4: createControl(
        {
          label: `Вариант №4`,
          id: 4,
        },
        { required: true }
      ),
    },
    options: [
      { text: "1", value: 1 },
      { text: "2", value: 2 },
      { text: "3", value: 3 },
      { text: "4", value: 4 },
    ],
  };

  submitHandler = (event) => event.preventDefault();

  addQuestionHandler = (event) => {
    event.preventDefault();

    const {
      quizName,
      question,
      option1,
      option2,
      option3,
      option4,
    } = this.state.formControls;

    const questionItem = {
      quizName: quizName,
      question: question.value,
      id: this.props.quiz.length + 1,
      rightAnswerId: this.state.rightAnswerId,
      answers: [
        { text: option1.value, id: option1.id },
        { text: option2.value, id: option2.id },
        { text: option3.value, id: option3.id },
        { text: option4.value, id: option4.id },
      ],
    };

    this.setState({
      isFormValid: false,
      rightAnswerId: 1,
      formControls: {
        quizName: createControl(
          {
            label: "Название квиза",
            value: quizName.value,
            disabled: true,
          },
          { required: true }
        ),
        question: createControl(
          {
            label: "Вопрос",
          },
          { required: true }
        ),
        option1: createControl(
          {
            label: `Вариант №1`,
            id: 1,
          },
          { required: true }
        ),
        option2: createControl(
          {
            label: `Вариант №2`,
            id: 2,
          },
          { required: true }
        ),
        option3: createControl(
          {
            label: `Вариант №3`,
            id: 3,
          },
          { required: true }
        ),
        option4: createControl(
          {
            label: `Вариант №4`,
            id: 4,
          },
          { required: true }
        ),
      },
      options: [
        { text: "1", value: 1 },
        { text: "2", value: 2 },
        { text: "3", value: 3 },
        { text: "4", value: 4 },
      ],
    });

    this.props.createQuizQuestion(questionItem);
  };

  createQuizeHandler = (event) => {
    event.preventDefault();
    this.props.finishCreateQuiz();

    this.setState({
      isFormValid: false,
      rightAnswerId: 1,
      formControls: {
        quizName: createControl(
          {
            label: "Название квиза",
          },
          { required: true }
        ),
        question: createControl(
          {
            label: "Вопрос",
          },
          { required: true }
        ),
        option1: createControl(
          {
            label: `Вариант №1`,
            id: 1,
          },
          { required: true }
        ),
        option2: createControl(
          {
            label: `Вариант №2`,
            id: 2,
          },
          { required: true }
        ),
        option3: createControl(
          {
            label: `Вариант №3`,
            id: 3,
          },
          { required: true }
        ),
        option4: createControl(
          {
            label: `Вариант №4`,
            id: 4,
          },
          { required: true }
        ),
      },
      options: [
        { text: "1", value: 1 },
        { text: "2", value: 2 },
        { text: "3", value: 3 },
        { text: "4", value: 4 },
      ],
    });
  };

  changeHandler = (value, controlName) => {
    const formControls = { ...this.state.formControls };
    const options = this.state.options;
    const control = { ...formControls[controlName] };

    control.touched = true;
    control.value = value;
    control.valid = validate(control.value, control.validation);

    formControls[controlName] = control;

    if (controlName.slice(0, controlName.length - 1) === "option") {
      const index = controlName.slice(
        controlName.length - 1,
        controlName.length
      );
      options[index - 1].text = control.valid ? value : index;
    }

    this.setState({
      formControls,
      options,
      isFormValid: validateForm(formControls),
    });
  };

  selectChangeHandler = (event) => {
    this.setState({
      rightAnswerId: +event.target.value,
    });
  };

  renderInputs() {
    return Object.keys(this.state.formControls).map((controlName, index) => {
      const control = this.state.formControls[controlName];
      if (control.label === "Название квиза" && control.disabled) {
        control.valid = true;
      }
      return (
        <Input
          label={control.label}
          value={control.value}
          valid={control.valid}
          shouldValidate={!!control.validation}
          touched={control.touched}
          key={controlName + index}
          type={control.type}
          disabled={control.disabled ? control.disabled : false}
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
        options={this.state.options}
      />
    );
    return (
      <div className={classes.new}>
        <div className={classes.wrapper}>
          <h1 className={classes.title}>Создать квиз</h1>
          <form onSubmit={this.submitHandler} className={classes.form}>
            {this.renderInputs()}
            {select}
            <Button
              onClick={this.addQuestionHandler}
              disabled={!this.state.isFormValid}
            >
              Добавить вопрос
            </Button>
            <Button
              onClick={this.createQuizeHandler}
              disabled={this.props.quiz.length === 0}
            >
              Создать тест
            </Button>
          </form>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    quiz: state.create.quiz,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    createQuizQuestion: (item) => dispatch(createQuizQuestion(item)),
    finishCreateQuiz: () => dispatch(finishCreateQuiz()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(New);
