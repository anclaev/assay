import classes from "./AnswerItem.module.sass";

const AnswerItem = (props) => (
  <li
    className={`${classes.item} ${props.state ? classes[props.state] : ""}`}
    onClick={() => props.onAnswerClick(props.answer.id)}
  >
    {props.answer.text}
  </li>
);

export default AnswerItem;
