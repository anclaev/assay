import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import classes from "./All.module.sass";
import Loader from "../../components/UI/Loader";
import { connect } from "react-redux";
import { fetchQuizes } from "../../store/actions/quiz";

class All extends Component {
  renderQuizes = () => {
    return this.props.quizes.map((quiz) => {
      return (
        <li className={classes.item} key={quiz.id}>
          <NavLink to={`/quiz/${quiz.id}`}>{quiz.name}</NavLink>
        </li>
      );
    });
  };

  componentDidMount() {
    this.props.fetchQuizes();
  }

  render() {
    return (
      <div className={classes.all}>
        <div className={classes.wrapper}>
          <h1 className={classes.title}>Квизы</h1>
          {this.props.emptyFlag ? (
            <span className={classes.empty}>Квизы пока не созданы.</span>
          ) : null}
          {this.props.loading ? <Loader /> : <ul>{this.renderQuizes()}</ul>}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    quizes: state.quiz.quizes,
    loading: state.quiz.loading,
    emptyFlag: state.quiz.emptyFlag,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchQuizes: () => dispatch(fetchQuizes()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(All);
