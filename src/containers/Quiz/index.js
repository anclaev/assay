import classes from "./Quiz.module.sass";
import React, { Component } from "react";
import ActiveQuiz from "../../components/ActiveQuiz";
import FinishedQuiz from "../../components/FinishedQuiz";
import Loader from "../../components/UI/Loader";
import { connect } from "react-redux";
import {
  fetchQuizById,
  quizAnswerClick,
  retryQuiz,
} from "../../store/actions/quiz";

class Quiz extends Component {
  componentDidMount() {
    this.props.fetchQuizById(this.props.match.params.id);
  }

  componentWillUnmount() {
    this.props.retryQuiz();
  }

  render() {
    return (
      <div className={classes.quiz}>
        <div className={classes.wrapper}>
          {this.props.emptyFlag ? (
            <span className={classes.empty}>{this.props.error}</span>
          ) : this.props.loading ? (
            <Loader />
          ) : this.props.isFinished ? (
            <>
              <h1 className={classes.title}>
                {this.props.quiz[this.props.activeQuestion].quizName.value}
              </h1>
              <FinishedQuiz
                results={this.props.results}
                quiz={this.props.quiz}
                onRetry={this.props.retryQuiz}
              />
            </>
          ) : (
            <>
              <h1 className={classes.title}>
                {this.props.quiz[this.props.activeQuestion].quizName.value}
              </h1>
              <ActiveQuiz
                answers={this.props.quiz[this.props.activeQuestion].answers}
                question={this.props.quiz[this.props.activeQuestion].question}
                quizLength={this.props.quiz.length}
                answerNumber={this.props.activeQuestion + 1}
                onAnswerClick={this.props.quizAnswerClick}
                state={this.props.answerState}
              />
            </>
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
    quizAnswerClick: (answerId) => dispatch(quizAnswerClick(answerId)),
    retryQuiz: () => dispatch(retryQuiz()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Quiz);
