import React, { Component } from "react";
import classes from "./Drawer.module.sass";
import Backdrop from "../UI/Backdrop";

const links = [1, 2, 3];

class Drawer extends Component {
  renderLinks() {
    return links.map((link, index) => {
      return (
        <li key={index}>
          <a href="/">Link: {link}</a>
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
        {this.props.isOpen ? <Backdrop onClick={this.props.onClose} /> : null}
      </>
    );
  }
}

export default Drawer;
