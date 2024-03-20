/* eslint-disable react/prop-types */
import "./Input.css";

export default function InputText({ icon, name, placeHolder }) {
  return (
    <div className="input__container">
      {icon}
      <input type="text" name={name} placeholder={placeHolder} />
    </div>
  );
}
