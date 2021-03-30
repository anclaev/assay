import classes from "./AnswerItem.module.sass";

const AnswerItem = (props) => (
  <li className={classes.item}>{props.answer.text}</li>
);

export default AnswerItem;
