/* eslint-disable react/prop-types */
import { displayTime, abbreviatedName } from "../../utils/coverter";
import InputSelect from "../../components/Input/InputSelect";
import Icons from "../../components/Icon/Icon";
import "./Table.css";
import { useState } from "react";

export default function Table({ data }) {
  const [selectPerson, setSelectPerson] = useState("");
  const options = data.map((finding) => ({
    value: finding.personInCharge.fullName,
    label: abbreviatedName(finding.personInCharge.fullName),
  }));

  return (
    <>
      <section className="d__flex table">
        <h1>Opening Point List</h1>
        <div className="filter--container">
          <InputSelect
            options={options}
            label={`P.I.C`}
            hasLable={false}
            isSearchable={false}
            setState={setSelectPerson}
          />
        </div>
        <div className="table__container ">
          <table>
            <thead>
              <tr>
                <td>
                  <p>Process</p>
                </td>
                <td width={"20%"}>
                  <p>Description</p>
                </td>
                <td>
                  <p>Due Date</p>
                </td>
                <td>
                  <p>Reporter</p>
                </td>
                <td>
                  <div className="d__flex">
                    <p className="d__flex sort-cell">
                      P.I.C
                      <Icons name={"ChevronsUpDown"} size={15} />
                    </p>
                  </div>
                </td>
                <td width={"20%"}>
                  <p>Actions</p>
                </td>
                <td>
                  <p>Status</p>
                </td>
              </tr>
            </thead>
            <tbody>
              {data.map((finding) => {
                if (
                  selectPerson.length === 0 ||
                  finding.personInCharge.fullName === selectPerson
                ) {
                  console.log(finding);
                  return <Row key={finding._id} {...finding} />;
                }
              })}
            </tbody>
          </table>
        </div>
      </section>
    </>
  );
}

function Row({
  question,
  reporter,
  dueDate,
  personInCharge,
  action,
  desc,
  status,
}) {
  return (
    <tr>
      <td>
        <p>{question.process}</p>
      </td>
      <td>
        <p>{desc}</p>
      </td>
      <td>
        <p>{displayTime(dueDate)}</p>
      </td>
      <td>
        <p>{abbreviatedName(reporter)}</p>
      </td>
      <td>
        <p>{abbreviatedName(personInCharge.fullName)}</p>
      </td>
      <td>
        <p>{action}</p>
      </td>
      <td>{switchStatus(status)}</td>
      <td>
        <p>
          <Icons name={"SendHorizontal"} size={15} />
        </p>
      </td>
    </tr>
  );
}

function switchStatus(status) {
  switch (status) {
    case "Ongoing":
      return (
        <div className="d__flex">
          <p className="status d__flex status__ongoing">
            <Icons name={"Timer"} size={13} /> Ongoing
          </p>
        </div>
      );
    case "Done":
      return (
        <div className="d__flex">
          <p className="status d__flex status__done">
            <Icons name={"CircleCheck"} size={13} /> Complete
          </p>
        </div>
      );
    case "Overdue":
      return (
        <div className="d__flex">
          <p className="status d__flex status__overdue">
            <Icons name={"OctagonX"} size={13} />
            Overdue
          </p>
        </div>
      );
    default:
      break;
  }
}
