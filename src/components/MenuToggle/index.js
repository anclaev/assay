import classes from "./MenuToggle.module.sass";

const MenuToggle = (props) => (
  <i
    className={`${classes.icon} fa ${
      props.isOpen ? "fa-times " + classes.open : "fa-bars"
    }`}
    onClick={props.onToggle}
  ></i>
);

export default MenuToggle;
