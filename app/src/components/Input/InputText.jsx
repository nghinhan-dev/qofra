/* eslint-disable react/prop-types */
import "./Input.css";

export default function InputText({ icon, placeHolder, setState }) {
  return (
    <>
      <div className="input__container d__flex">
        {icon}
        <input
          type="text"
          onChange={(event) => setState(() => event.target.value)}
          placeholder={placeHolder}
        />
      </div>
      <p></p>
    </>
  );
}
