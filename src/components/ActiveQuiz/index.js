import classes from "./ActiveQuiz.module.sass";

import AnswersList from "../AnswersList";

const ActiveQuiz = (props) => (
  <div className={classes.activeQuiz}>
    <p className={classes.question}>
      <span>2. Как дела?</span>
      <small>4 из 12</small>
    </p>

    <AnswersList answers={props.answers} />
  </div>
);

export default ActiveQuiz;
