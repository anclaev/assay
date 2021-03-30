import classes from "./ActiveQuiz.module.sass";

import AnswersList from "../AnswersList";

const ActiveQuiz = (props) => (
  <div className={classes.activeQuiz}>
    <p className={classes.question}>
      <span>{props.question}</span>
      <small>
        {props.answerNumber} из {props.quizLength}
      </small>
    </p>

    <AnswersList
      state={props.state}
      answers={props.answers}
      onAnswerClick={props.onAnswerClick}
    />
  </div>
);

export default ActiveQuiz;
