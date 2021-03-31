import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import classes from "./Drawer.module.sass";
import Backdrop from "../UI/Backdrop";

const links = [
  { to: "/", name: "Квизы", exact: true },
  { to: "/new", name: "Создать", exact: false },
  { to: "/auth", name: "Войти", exact: false },
];

class Drawer extends Component {
  clickHandler = () => {
    this.props.onClose();
  };

  renderLinks() {
    return links.map((link, index) => {
      return (
        <li key={index}>
          <NavLink
            to={link.to}
            exact={link.exact}
            activeClassName={classes.active}
            onClick={this.clickHandler}
          >
            {link.name}
          </NavLink>
        </li>
      );
    });
  }

  render() {
    return (
      <>
        <nav
          className={`${classes.drawer} ${
            !this.props.isOpen ? classes.close : ""
          }`}
        >
          <ul>{this.renderLinks()}</ul>
        </nav>
        {this.props.isOpen ? <Backdrop onClick={this.clickHandler} /> : null}
      </>
    );
  }
}

export default Drawer;
