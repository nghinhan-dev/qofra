import "./Button.css";

/* eslint-disable react/prop-types */
export default function Button({ type, value, disabled }) {
  return (
    <button type={type} disabled={disabled}>
      {value}
    </button>
  );
}
