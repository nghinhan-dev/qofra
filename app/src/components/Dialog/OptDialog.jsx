/* eslint-disable react/prop-types */
import { useState } from "react";

export default function OptDialog({ options, setStateHanlder }) {
  const [currentOptionIndex, setCurrentOptionIndex] = useState(
    Object.keys(options)[0].toString()
  );

  return (
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
        {options[`${currentOptionIndex}`].values.map((label) => (
          <div key={label}>
            <label>
              <input
                checked={options[`${currentOptionIndex}`].selected.includes(
                  label
                )}
                value={label}
                onChange={(e) => {
                  setStateHanlder(
                    currentOptionIndex,
                    e.target.value,
                    e.target.checked
                  );
                }}
                type="checkbox"
                name="checkbox-checked"
              />
              {label}
            </label>
          </div>
        ))}
      </div>
    </div>
  );
}
