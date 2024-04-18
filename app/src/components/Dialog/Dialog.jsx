/* eslint-disable react/prop-types */
import { useRef } from "react";
import Button from "../Button/Button";
import Icon from "../Icon/Icon";
import "./Dialog.css";

export default function Dialog({ children, name, iconName, triggerAction }) {
  const dialogRef = useRef(null);

  return (
    <>
      <button onClick={() => dialogRef.current.showModal()} className="d__flex">
        {name} <Icon name={iconName} size={15} />
      </button>

      <dialog ref={dialogRef}>
        <div className="dialog--container">
          {children}
          <div className="dialog--footer d__flex">
            <Button value="Close" onClick={() => dialogRef.current.close()} />
            <Button value="Apply" onClick={triggerAction} bgColor="#000" />
          </div>
        </div>
      </dialog>
    </>
  );
}
