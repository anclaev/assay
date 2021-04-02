import {
  FETCH_QUIZES_ERROR,
  FETCH_QUIZES_START,
  FETCH_QUIZES_SUCCESS,
  FETCH_QUIZE_SUCCESS,
} from "../actions/types";

const initialState = {
  quizes: [],
  loading: true,
  emptyFlag: false,
  error: null,
  results: {},
  isFinished: false,
  activeQuestion: 0,
  answerState: null,
  quiz: null,
};

const quizReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_QUIZES_START:
      return {
        ...state,
        loading: true,
      };
    case FETCH_QUIZES_SUCCESS:
      return {
        ...state,
        loading: false,
        quizes: action.quizes,
      };
    case FETCH_QUIZES_ERROR:
      return {
        ...state,
        loading: false,
        error: action.error,
        emptyFlag: action.emptyFlag,
      };
    case FETCH_QUIZE_SUCCESS:
      return {
        ...state,
        loading: false,
        quiz: action.quiz,
      };

    default:
      return state;
  }
};

export default quizReducer;
