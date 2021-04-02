import s from "./Select.module.sass";

const Select = (props) => {
  const htmlFor = `${props.label}-${Math.random() * 1000}`;

  return (
    <div className={s.select}>
      <label htmlFor={htmlFor}>{props.label}</label>
      <select id={htmlFor} value={props.value} onChange={props.onChange}>
        {props.options.map((option, index) => {
          return (
            <option value={option.value} key={option.value + index}>
              {option.text}
            </option>
          );
        })}
      </select>
    </div>
  );
};

export default Select;
