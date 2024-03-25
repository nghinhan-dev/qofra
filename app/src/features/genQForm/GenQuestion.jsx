import { useState } from "react";
import InputSelect from "../../components/Input/InputSelect";
import Button from "../../components/Button/Button";
import "./GenQuestion.css";

const depOptions = [
  { value: "C&M", label: "C&M" },
  { value: "Production", label: "Production" },
];

const levelOptions = [
  { value: "1", label: "1" },
  { value: "2", label: "2" },
  { value: "3", label: "3" },
];

export default function GenQuestion() {
  const [processOpts, setProcessOpts] = useState([
    { value: "Mold Setter", label: "Mold Setter" },
    { value: "Extruder", label: "Extruder" },
    { value: "Mixing", label: "Mixing" },
    { value: "Crushing", label: "Production" },
  ]);

  const deparmentSelect = (value) => {
    return value === "C&M"
      ? setProcessOpts([
          { value: "Extruder", label: "Extruder" },
          { value: "Mixing", label: "Mixing" },
          { value: "Crushing", label: "Production" },
        ])
      : setProcessOpts([{ value: "Mold Setter", label: "Mold Setter" }]);
  };

  return (
    <div className="form__genQ">
      <form>
        <InputSelect
          label={"Deparment"}
          options={depOptions}
          deparmentSelect={deparmentSelect}
          affectOther={true}
        />
        <InputSelect label={"Process"} options={processOpts} />
        <InputSelect label={"Level"} options={levelOptions} />
        <Button type={"submit"} value={"Submit"}></Button>
      </form>
    </div>
  );
}
