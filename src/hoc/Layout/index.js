import classes from "./Layout.module.sass";

const Layout = (props) => (
  <div className={classes.layout}>
    <main>{props.children}</main>
  </div>
);

export default Layout;
