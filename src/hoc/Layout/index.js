import React, { Component } from "react";
import classes from "./Layout.module.sass";

import MenuToggle from "../../components/MenuToggle";
import Drawer from "../../components/Drawer";
import { connect } from "react-redux";

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
        <Drawer
          isOpen={this.state.menu}
          onClose={this.closeMenuHandler}
          isAuth={this.props.isAuth}
        />
        <MenuToggle
          onToggle={this.toggleMenuHandler}
          isOpen={this.state.menu}
        />
        <main>{this.props.children}</main>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isAuth: !!state.auth.token,
  };
};

export default connect(mapStateToProps)(Layout);
