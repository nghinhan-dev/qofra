/* eslint-disable react/prop-types */
import Select from "react-select";

export default function InputSelect({
  label,
  hasLable = true,
  options,
  deparmentSelect,
  affectOther = false,
  setState,
}) {
  return (
    <div className="select__wraper">
      {hasLable && <p>{`${label} :`}</p>}
      <Select
        options={options}
        placeholder={`Select ${label}`}
        isSearchable={false}
        onChange={({ value }, { action }) => {
          if (action === "select-option") {
            if (affectOther) deparmentSelect(value);
            setState(() => value);
          }
        }}
        className="react-select-container"
        classNamePrefix="react-select"
      />
    </div>
  );
}
