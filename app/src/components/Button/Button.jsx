import "./Button.css";

/* eslint-disable react/prop-types */
export default function Button({
  type = "button",
  value = "button",
  disabled,
  onClick,
  bgColor = "var(--sub-color)",
}) {
  return (
    <button
      style={{ backgroundColor: `${bgColor}` }}
      type={type}
      disabled={disabled}
      onClick={onClick}
    >
      {value}
    </button>
  );
}
