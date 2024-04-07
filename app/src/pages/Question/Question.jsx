import { useState } from "react";
import Dialog from "../../components/Dialog/Dialog";

const options = {
  scope: ["man", "material", "safety", "method/measurement", "machine"],
  status: ["Ongoing", "Done", "Overdue"],
  process: ["Extruder", "Mixing", "Crushing", "Mold Setter"],
  deparment: ["Production", "C&M"],
};

export default function Question() {
  const [filterState, setFilterState] = useState({
    scope: [],
    status: [],
    process: [],
    deparment: [],
  });

  const checkHandler = (key, value, checked) => {
    const newFilterState = filterState;

    if (checked) {
      newFilterState[key].push(value);
    } else {
      const index = newFilterState[key].findIndex(
        (checkedValue) => checkedValue === value
      );

      if (index !== 0) {
        newFilterState[key] = newFilterState[key] = [
          ...newFilterState[key].slice(0, index),
          ...newFilterState[key].slice(index + 1),
        ];
      } else {
        newFilterState[key].pop();
      }
    }

    setFilterState(newFilterState);
    console.log(filterState);
  };

  return (
    <section>
      <Dialog
        options={options}
        filterState={filterState}
        setStateHanlder={checkHandler}
      />
    </section>
  );
}
