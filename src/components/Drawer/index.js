import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import classes from "./Drawer.module.sass";
import Backdrop from "../UI/Backdrop";

class Drawer extends Component {
  clickHandler = () => {
    this.props.onClose();
  };

  renderLinks(links) {
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
    const links = [{ to: "/", name: "Квизы", exact: true }];

    if (this.props.isAuth) {
      links.push({ to: "/new", name: "Создать", exact: false });
      links.push({ to: "/logout", name: "Выйти", exact: false });
    } else {
      links.push({ to: "/auth", name: "Войти", exact: false });
    }

    return (
      <>
        <nav
          className={`${classes.drawer} ${
            !this.props.isOpen ? classes.close : ""
          }`}
        >
          <ul>{this.renderLinks(links)}</ul>
        </nav>
        {this.props.isOpen ? <Backdrop onClick={this.clickHandler} /> : null}
      </>
    );
  }
}

export default Drawer;
