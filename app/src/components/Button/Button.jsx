import "./Button.css";

/* eslint-disable react/prop-types */
export default function Button({ type, value, disabled, onClick }) {
  return (
    <button type={type} disabled={disabled} onClick={onClick}>
      {value}
    </button>
  );
}
