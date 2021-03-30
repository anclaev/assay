import React, { Component } from "react";
import classes from "./Layout.module.sass";

import MenuToggle from "../../components/MenuToggle";
import Drawer from "../../components/Drawer";

class Layout extends Component {
  state = {
    menu: false,
  };

  toggleMenuHandler = () => {
    this.setState({
      menu: !this.state.menu,
    });
  };

  closeMenuHandler = () => {
    this.setState({
      menu: false,
    });
  };

  render() {
    return (
      <div className={classes.layout}>
        <Drawer isOpen={this.state.menu} onClose={this.closeMenuHandler} />
        <MenuToggle
          onToggle={this.toggleMenuHandler}
          isOpen={this.state.menu}
        />
        <main>{this.props.children}</main>
      </div>
    );
  }
}

export default Layout;
