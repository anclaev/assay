import {
  FETCH_QUIZES_START,
  FETCH_QUIZES_SUCCESS,
  FETCH_QUIZES_ERROR,
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
            name: `Тест №${index + 1}`,
          });
        });

        dispatch(fetchQuizesSuccess(quizes));
      } else {
        dispatch(fetchQuizesError("Квизов пока не созданы", true));
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
export function fetchQuizesError(e, emptyFlag) {
  return {
    type: FETCH_QUIZES_ERROR,
    emptyFlag: emptyFlag,
    error: e,
  };
}
