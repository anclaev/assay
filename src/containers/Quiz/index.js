import classes from "./Quiz.module.sass";
import React, { Component } from "react";
import ActiveQuiz from "../../components/ActiveQuiz";
import FinishedQuiz from "../../components/FinishedQuiz";
import Loader from "../../components/UI/Loader";
import { connect } from "react-redux";
import { fetchQuizById } from "../../store/actions/quiz";

class Quiz extends Component {
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

  componentDidMount() {
    this.props.fetchQuizById(this.props.match.params.id);
  }

  render() {
    return (
      <div className={classes.quiz}>
        <div className={classes.wrapper}>
          <h1 className={classes.title}>Квиз</h1>
          {this.props.emptyFlag ? (
            <span className={classes.empty}>{this.props.error}</span>
          ) : this.props.loading ? (
            <Loader />
          ) : this.props.isFinished ? (
            <FinishedQuiz
              results={this.props.results}
              quiz={this.props.quiz}
              onRetry={this.retryHandler}
            />
          ) : (
            <ActiveQuiz
              answers={this.props.quiz[this.props.activeQuestion].answers}
              question={this.props.quiz[this.props.activeQuestion].question}
              quizLength={this.props.quiz.length}
              answerNumber={this.props.activeQuestion + 1}
              onAnswerClick={this.onAnswerClickHandler}
              state={this.props.answerState}
            />
          )}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    results: state.quiz.results,
    isFinished: state.quiz.isFinished,
    activeQuestion: state.quiz.activeQuestion,
    answerState: state.quiz.answerState,
    quiz: state.quiz.quiz,
    loading: state.quiz.loading,
    emptyFlag: state.quiz.emptyFlag,
    error: state.quiz.error,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchQuizById: (id) => dispatch(fetchQuizById(id)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Quiz);
