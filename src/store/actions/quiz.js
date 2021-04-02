import {
  FETCH_QUIZES_START,
  FETCH_QUIZES_SUCCESS,
  FETCH_QUIZES_ERROR,
  FETCH_QUIZE_SUCCESS,
  QUIZ_SET_STATE,
  QUIZ_NEXT_QUESTION,
  QUIZ_RETRY,
  FINISH_QUIZ,
} from "./types";

import axios from "../../axios/config";

export function fetchQuizes() {
  return async (dispatch) => {
    dispatch(fetchQuizesStart());
    try {
      const response = await axios.get(".json");
      const quizes = [];

      if (response.data != null) {
        Object.keys(response.data).forEach((key, index) => {
          quizes.push({
            id: key,
            name: `${index + 1}. ${response.data[key][0].quizName.value}`,
          });
        });

        dispatch(fetchQuizesSuccess(quizes));
      } else {
        dispatch(fetchQuizesError("Квизы ещё не созданы.", true));
      }
    } catch (e) {
      dispatch(fetchQuizesError(e, false));
    }
  };
}

export function fetchQuizesStart() {
  return {
    type: FETCH_QUIZES_START,
  };
}

export function fetchQuizesSuccess(quizes, loading, emptyFlag) {
  return {
    type: FETCH_QUIZES_SUCCESS,
    quizes: quizes,
    emptyFlag: emptyFlag,
  };
}

export function fetchQuizById(quizId) {
  return async (dispatch) => {
    dispatch(fetchQuizesStart());

    try {
      const response = await axios.get(`/${quizId}.json`);
      if (response.data !== null) {
        const quiz = response.data;
        dispatch(fetchQuizSuccess(quiz));
      } else {
        dispatch(fetchQuizesError("Такого квиза не существует...", true));
      }
    } catch (e) {
      dispatch(fetchQuizesError(e, false));
    }
  };
}

export function fetchQuizSuccess(quiz) {
  return {
    type: FETCH_QUIZE_SUCCESS,
    quiz,
  };
}

export function fetchQuizesError(e, emptyFlag) {
  return {
    type: FETCH_QUIZES_ERROR,
    emptyFlag: emptyFlag,
    error: e,
  };
}

export function finishQuiz() {
  return {
    type: FINISH_QUIZ,
  };
}

export function quizSetState(answerState, results) {
  return {
    type: QUIZ_SET_STATE,
    answerState,
    results,
  };
}

export function quizNextQuestion(number) {
  return {
    type: QUIZ_NEXT_QUESTION,
    number,
  };
}

export function quizAnswerClick(answerId) {
  return (dispatch, getState) => {
    const state = getState().quiz;

    if (state.answerState) {
      const key = Object.keys(state.answerState)[0];
      if (state.answerState[key] === "success") {
        return;
      }
    }

    const question = state.quiz[state.activeQuestion];
    const results = state.results;

    if (question.rightAnswerId === answerId) {
      if (!results[state.activeQuestion + 1]) {
        results[state.activeQuestion + 1] = "success";
      }

      dispatch(
        quizSetState(
          {
            [answerId]: "success",
          },
          results
        )
      );
    } else {
      if (!results[state.activeQuestion + 1]) {
        results[state.activeQuestion + 1] = "error";
      }
      dispatch(quizSetState({ [answerId]: "error" }, results));
    }

    const timeout = window.setTimeout(() => {
      if (isQuizFinished(state)) {
        dispatch(finishQuiz());
      } else {
        dispatch(quizNextQuestion(state.activeQuestion + 1));
      }
      window.clearTimeout(timeout);
    }, 1000);
  };
}

export function retryQuiz() {
  return {
    type: QUIZ_RETRY,
  };
}

const isQuizFinished = (state) => {
  return state.activeQuestion + 1 === state.quiz.length;
};
