import "./Button.css";

/* eslint-disable react/prop-types */
export default function Button({ type, value }) {
  return <button type={type}>{value}</button>;
}
