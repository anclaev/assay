import { AUTH_SUCCESS, AUTH_LOGOUT } from "./types";
import axios from "axios";

export function auth(email, password, isLogin) {
  return async (dispatch) => {
    const authData = {
      email,
      password,
      returnSecureToken: true,
    };

    try {
      let url =
        "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDej6nufkw-mrnFVAlE3PHMCOz0sJDpYk0";

      if (isLogin) {
        url =
          "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDej6nufkw-mrnFVAlE3PHMCOz0sJDpYk0";
      }

      const response = await axios.post(url, authData);
      const data = response.data;
      const expirationDate = new Date(
        new Date().getTime() + data.expiresIn * 1000
      );

      localStorage.setItem("token", data.idToken);
      localStorage.setItem("userId", data.localId);
      localStorage.setItem("expirationDate", expirationDate);

      dispatch(authSuccess(data.idToken));
      dispatch(autoLogout(data.expiresIn));
    } catch (e) {
      console.log("Error: ", e);
    }
  };
}

export function authSuccess(token) {
  return {
    type: AUTH_SUCCESS,
    token,
  };
}

export function logout() {
  localStorage.removeItem("token");
  localStorage.removeItem("userId");
  localStorage.removeItem("expirationDate");
  return {
    type: AUTH_LOGOUT,
  };
}

export function autoLogout(time) {
  return (dispatch) => {
    setTimeout(() => {
      dispatch(logout());
    }, time * 1000);
  };
}

export function autoLogin() {
  return (dispatch) => {
    const token = localStorage.getItem("token");
    if (!token) dispatch(logout());
    else {
      const expirationDate = new Date(localStorage.getItem("expirationDate"));
      if (expirationDate <= new Date()) {
        dispatch(logout());
      } else {
        dispatch(authSuccess(token));

        let targetTime = expirationDate.getTime() - new Date().getTime();
        dispatch(autoLogout(targetTime / 1000));
      }
    }
  };
}
