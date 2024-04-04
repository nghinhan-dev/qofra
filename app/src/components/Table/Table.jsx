/* eslint-disable react/prop-types */
import { displayTime, abbreviatedName } from "../../utils/coverter";
import InputSelect from "../../components/Input/InputSelect";
import { Link } from "react-router-dom";
import Icons from "../../components/Icon/Icon";
import "./Table.css";
import { useState } from "react";

export default function Table({ data }) {
  const [selectPerson, setSelectPerson] = useState("");
  const options = getPICArray(data);

  return (
    <>
      <section className="d__flex table">
        <div className="table--header">
          <h1>Opening Point List</h1>
          <div className="filter--container d__flex">
            <InputSelect
              options={options}
              label={`P.I.C`}
              hasLable={false}
              isSearchable={false}
              setState={setSelectPerson}
            />
          </div>
        </div>
        <div className="table__container ">
          <table>
            <thead>
              <tr>
                <td width={"11%"}>
                  <p>Process</p>
                </td>
                <td width={"25%"}>
                  <p>Description</p>
                </td>
                <td width={"11%"}>
                  <p>Due Date</p>
                </td>
                <td width={"11%"}>
                  <p>Reporter</p>
                </td>
                <td width={"11%"}>P.I.C</td>
                <td width={"24%"}>
                  <p>Actions</p>
                </td>
                <td width={"7%"}>
                  <p>Status</p>
                </td>
                <td></td>
              </tr>
            </thead>
            <tbody>
              {data.map((finding) => {
                if (
                  selectPerson.length === 0 ||
                  finding.personInCharge.fullName === selectPerson
                ) {
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
  _id,
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
          <Link to={`finding/${_id}`}>
            <Icons name={"SendHorizontal"} size={15} />
          </Link>
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

function getPICArray(data) {
  const map = new Map();
  data.forEach((finding) => {
    map.set(finding.personInCharge.fullName, {
      value: finding.personInCharge.fullName,
      label: abbreviatedName(finding.personInCharge.fullName),
    });
  });

  // eslint-disable-next-line no-unused-vars
  const array = Array.from(map, ([name, value]) => {
    return value;
  });

  return array;
}
