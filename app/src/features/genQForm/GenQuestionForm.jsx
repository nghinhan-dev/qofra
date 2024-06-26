import { useState } from "react";
import InputSelect from "../../components/Input/InputSelect";
import Button from "../../components/Button/Button";

const depOptions = [
  { value: "C&M", label: "C&M" },
  { value: "Production", label: "Production" },
];

// eslint-disable-next-line react/prop-types
export default function GenQuestion({ setDepartment, setProcess, setLevel }) {
  const [processOpts, setProcessOpts] = useState([
    { value: "Mold Setter", label: "Mold Setter" },
    { value: "Extruder", label: "Extruder" },
    { value: "Mixing", label: "Mixing" },
    { value: "Crushing", label: "Production" },
  ]);
  const [levelOptions, setLevelOpts] = useState([
    { value: 1, label: "1" },
    { value: 2, label: "2" },
    { value: 3, label: "3" },
  ]);

  const deparmentSelect = (value) => {
    if (value === "C&M") {
      setProcessOpts([
        { value: "Extruder", label: "Extruder" },
        { value: "Mixing", label: "Mixing" },
        { value: "Crushing", label: "Crushing" },
      ]);

      setLevelOpts([
        { value: 1, label: "1" },
        { value: 2, label: "2" },
        { value: 3, label: "3" },
      ]);
      return;
    }

    setProcessOpts([{ value: "Mold Setter", label: "Mold Setter" }]);
    setLevelOpts([
      { value: 2, label: "2" },
      { value: 3, label: "3" },
    ]);
    return;
  };

  return (
    <>
      <InputSelect
        label={"Deparment"}
        options={depOptions}
        deparmentSelect={deparmentSelect}
        setState={setDepartment}
        affectOther={true}
      />
      <InputSelect
        label={"Process"}
        setState={setProcess}
        options={processOpts}
      />
      <InputSelect label={"Level"} setState={setLevel} options={levelOptions} />
      <Button type={"submit"} value={"Submit"}></Button>
    </>
  );
}
