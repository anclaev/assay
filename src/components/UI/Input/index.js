import classes from "./Input.module.sass";

const isInvalid = ({ valid, touched, shouldValidate }) =>
  touched && shouldValidate && !valid;

const Input = (props) => {
  const inputType = props.type || "text";
  const htmlFor = `${inputType}-${Math.round(Math.random() * 1000)}`;

  return (
    <div
      className={`${classes.input} ${isInvalid(props) ? classes.error : null}`}
    >
      <label htmlFor={htmlFor}>{props.label}</label>
      <input
        type={inputType}
        id={htmlFor}
        value={props.value}
        onChange={props.onChange}
      />
      {isInvalid(props) ? (
        <span>{props.error || "Проверьте правильность данных"}</span>
      ) : null}
    </div>
  );
};

export default Input;
