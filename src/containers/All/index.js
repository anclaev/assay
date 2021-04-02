import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import axios from "../../axios/config";
import classes from "./All.module.sass";
import Loader from "../../components/UI/Loader";

export default class All extends Component {
  state = {
    quizes: [],
    loading: true,
    emptyMessage: false,
  };

  renderQuizes = () => {
    return this.state.quizes.map((quiz) => {
      return (
        <li className={classes.item} key={quiz.id}>
          <NavLink to={`/quiz/${quiz.id}`}>{quiz.name}</NavLink>
        </li>
      );
    });
  };

  async componentDidMount() {
    try {
      const response = await axios.get(".json");
      const quizes = [];

      if (response.data != null) {
        Object.keys(response.data).forEach((key, index) => {
          quizes.push({
            id: key,
            name: `Тест №${index + 1}`,
          });

          this.setState({ quizes, loading: false });
        });
      } else {
        var emptyMessage = this.state.emptyMessage;
        var loading = this.state.loading;
        emptyMessage = true;
        loading = false;
        this.setState({ emptyMessage, loading });
      }
    } catch (e) {
      console.log("Error: ", e);
    }
  }

  render() {
    return (
      <div className={classes.all}>
        <div className={classes.wrapper}>
          <h1 className={classes.title}>Квизы</h1>
          {this.state.emptyMessage ? (
            <span className={classes.empty}>Квизы пока не созданы.</span>
          ) : null}
          {this.state.loading ? <Loader /> : <ul>{this.renderQuizes()}</ul>}
        </div>
      </div>
    );
  }
}
