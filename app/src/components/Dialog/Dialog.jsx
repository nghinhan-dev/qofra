/* eslint-disable react/prop-types */
import { useRef, useState } from "react";
import { SlidersHorizontal } from "lucide-react";
import Button from "../Button/Button";
import "./Dialog.css";

export default function Dialog({ options, setStateHanlder, filterState }) {
  const [currentOptionIndex, setCurrentOptionIndex] = useState("deparment");
  const dialogRef = useRef(null);

  return (
    <>
      <button onClick={() => dialogRef.current.showModal()} className="d__flex">
        Filter <SlidersHorizontal size={15} />
      </button>

      <dialog ref={dialogRef}>
        <div className="dialog--container">
          <div className="dialog--body">
            <div className="dialog--key">
              {Object.keys(options).map((field) => (
                <p
                  className={field === currentOptionIndex ? "isActive" : ""}
                  onClick={() => setCurrentOptionIndex(field)}
                  key={field}
                >
                  {field}
                </p>
              ))}
            </div>
            <div className="dialog--value">
              {options[`${currentOptionIndex}`].map((label) => (
                <div key={label}>
                  <label>
                    <input
                      checked={filterState[`${currentOptionIndex}`].includes(
                        label
                      )}
                      value={label}
                      onChange={(e) =>
                        setStateHanlder(
                          currentOptionIndex,
                          e.target.value,
                          e.target.checked
                        )
                      }
                      type="checkbox"
                      name="checkbox-checked"
                    />
                    {label}
                  </label>
                </div>
              ))}
            </div>
          </div>
          <div className="dialog--footer d__flex">
            <Button value="Cancel" onClick={() => dialogRef.current.close()} />
            <Button value="Apply" bgColor="#000" />
          </div>
        </div>
      </dialog>
    </>
  );
}
