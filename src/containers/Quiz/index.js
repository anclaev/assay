import classes from "./Quiz.module.sass";

import React, { Component } from "react";
import ActiveQuiz from "../../components/ActiveQuiz";

class Quiz extends Component {
  state = {
    quiz: [
      {
        answers: [
          { text: "Вопрос №1" },
          { text: "Вопрос №2" },
          { text: "Вопрос №3" },
          { text: "Вопрос №4" },
        ],
      },
    ],
  };

  render() {
    return (
      <div className={classes.quiz}>
        <div className={classes.wrapper}>
          <h1 className={classes.title}>Квиз</h1>
          <ActiveQuiz answers={this.state.quiz[0].answers} />
        </div>
      </div>
    );
  }
}

export default Quiz;
