import classes from "./Quiz.module.sass";
import React, { Component } from "react";
import axios from "../../axios/config";
import ActiveQuiz from "../../components/ActiveQuiz";
import FinishedQuiz from "../../components/FinishedQuiz";
import Loader from "../../components/UI/Loader";

class Quiz extends Component {
  state = {
    results: {},
    isFinished: false,
    activeQuestion: 0,
    answerState: null,
    quiz: [],
    loading: true,
  };

  onAnswerClickHandler = (answerId) => {
    if (this.state.answerState) {
      const key = Object.keys(this.state.answerState)[0];
      if (this.state.answerState[key] === "success") {
        return;
      }
    }

    const question = this.state.quiz[this.state.activeQuestion];
    const results = this.state.results;

    if (question.rightAnswerId === answerId) {
      if (!results[this.state.activeQuestion + 1]) {
        results[this.state.activeQuestion + 1] = "success";
      }

      this.setState({
        answerState: {
          [answerId]: "success",
        },
        results,
      });
    } else {
      if (!results[this.state.activeQuestion + 1]) {
        results[this.state.activeQuestion + 1] = "error";
      }
      this.setState({ answerState: { [answerId]: "error" }, results });
    }

    const timeout = window.setTimeout(() => {
      if (this.isQuizFinished()) {
        this.setState({
          isFinished: true,
        });
      } else {
        this.setState({
          activeQuestion: this.state.activeQuestion + 1,
          answerState: null,
        });
      }
      window.clearTimeout(timeout);
    }, 1000);
  };

  isQuizFinished = () =>
    this.state.activeQuestion + 1 === this.state.quiz.length;

  retryHandler = () => {
    const timeout = window.setTimeout(() => {
      this.setState({
        results: {},
        isFinished: false,
        activeQuestion: 0,
        answerState: null,
      });

      window.clearTimeout(timeout);
    }, 1000);
  };

  async componentDidMount() {
    try {
      const response = await axios.get(`/${this.props.match.params.id}.json`);
      const quiz = response.data;
      this.setState({
        quiz,
        loading: false,
      });
    } catch (e) {
      console.log("Error: ", e);
    }
  }

  render() {
    return (
      <div className={classes.quiz}>
        <div className={classes.wrapper}>
          <h1 className={classes.title}>Квиз</h1>
          {this.state.loading ? (
            <Loader />
          ) : this.state.isFinished ? (
            <FinishedQuiz
              results={this.state.results}
              quiz={this.state.quiz}
              onRetry={this.retryHandler}
            />
          ) : (
            <ActiveQuiz
              question={this.state.quiz[this.state.activeQuestion].question}
              answers={this.state.quiz[this.state.activeQuestion].answers}
              quizLength={this.state.quiz.length}
              answerNumber={this.state.activeQuestion + 1}
              onAnswerClick={this.onAnswerClickHandler}
              state={this.state.answerState}
            />
          )}
        </div>
      </div>
    );
  }
}

export default Quiz;
