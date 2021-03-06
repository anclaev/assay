import { CREATE_QUIZ_QUESTION, RESET_QUIZ_CREATION } from "./types";
import axios from "../../axios/config";

export function createQuizQuestion(item) {
  return {
    type: CREATE_QUIZ_QUESTION,
    item,
  };
}

export function resetQuizCreation() {
  return { type: RESET_QUIZ_CREATION };
}

export function finishCreateQuiz() {
  return async (dispatch, getState) => {
    await axios.post(".json", getState().create.quiz);
    dispatch(resetQuizCreation());
  };
}
