import classes from "./FinishedQuiz.module.sass";
import { Link } from "react-router-dom";

import Button from "../UI/Button";

const FinishedQuiz = (props) => {
  const successCount = Object.keys(props.results).reduce((total, key) => {
    if (props.results[key] === "success") total++;
    return total;
  }, 0);

  return (
    <div className={classes.finish}>
      <ul>
        {props.quiz.map((quizItem, index) => {
          const cls = [
            "fa",
            props.results[quizItem.id] === "error" ? "fa-times" : "fa-check",
            classes[props.results[quizItem.id]],
          ];

          return (
            <li key={index}>
              <strong>{index + 1}. </strong> {quizItem.question}{" "}
              <i className={cls.join(" ")}></i>
            </li>
          );
        })}
      </ul>

      <div className={classes.nice}>
        <span>
          Правильных ответов: {successCount} из {props.quiz.length}
        </span>
        <Button onClick={props.onRetry}>Пройти ещё раз</Button>
        <Link to="/">
          <Button>Перейти к тестам</Button>
        </Link>
      </div>
    </div>
  );
};

export default FinishedQuiz;
