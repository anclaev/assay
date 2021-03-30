import classes from "./Button.module.sass";

const Button = (props) => (
  <button
    onClick={props.onClick}
    disabled={props.disabled}
    className={classes.button}
  >
    {props.children}
  </button>
);

export default Button;
