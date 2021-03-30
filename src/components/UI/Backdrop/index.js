import classes from "./Backdrop.module.sass";

const Backdrop = (props) => (
  <div className={classes.backdrop} onClick={props.onClick}></div>
);

export default Backdrop;
