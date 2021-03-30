import classes from "./AnswersList.module.sass";

import AnswerItem from "../AnswerItem";

const AnswersList = (props) => (
  <ul className={classes.list}>
    {props.answers.map((answer, index) => {
      return (
        <AnswerItem
          key={index}
          answer={answer}
          state={props.state ? props.state[answer.id] : null}
          onAnswerClick={props.onAnswerClick}
        />
      );
    })}
  </ul>
);

export default AnswersList;
