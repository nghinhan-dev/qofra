/* eslint-disable react/prop-types */
import { useState } from "react";
import { Link } from "react-router-dom";
import Icons from "../../components/Icon/Icon";
import Pagination from "../Pagination/Pagination";
import InputSelect from "../../components/Input/InputSelect";
import {
  displayTime,
  abbreviatedName,
  displayStatus,
} from "../../utils/converter";
import "./Table.css";

export default function Table({ data, setSelectPerson, options }) {
  // paginate state
  const [currentPage, setCurrentPage] = useState(1);
  const itemPerPage = 6;
  let maxPage = 3;

  maxPage = Math.ceil(data.length / itemPerPage);

  let pageArr = [];
  for (let index = 0; index < data.length; index += itemPerPage) {
    pageArr.push([...data.slice(index, index + itemPerPage)]);
  }

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
                <td width={"10%"}>
                  <p>Process</p>
                </td>
                <td width={"25%"}>
                  <p>Description</p>
                </td>
                <td width={"11%"}>
                  <p>Due Date</p>
                </td>
                <td width={"11%"}>
                  <p>Dectector</p>
                </td>
                <td width={"11%"}>
                  <p>P.I.C</p>
                </td>
                <td width={"24%"}>
                  <p>Actions</p>
                </td>
                <td width={"8%"}>
                  <p>Status</p>
                </td>
                <td></td>
              </tr>
            </thead>
            <tbody>
              {pageArr[currentPage - 1].map((finding) => (
                <Row key={finding._id} {...finding} />
              ))}
            </tbody>
          </table>
        </div>
        <Pagination
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          max={maxPage}
        />
      </section>
    </>
  );
}

function Row({
  _id,
  question,
  detector,
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
        <p className="wrap-text" style={{ width: "275px" }}>
          {desc}
        </p>
      </td>
      <td>
        <p>{displayTime(dueDate)}</p>
      </td>
      <td>
        <p>{abbreviatedName(detector)}</p>
      </td>
      <td>
        <p>{abbreviatedName(personInCharge.fullName)}</p>
      </td>
      <td>
        <p className="wrap-text" style={{ width: "275px" }}>
          {action}
        </p>
      </td>
      <td>
        <div className="d__flex">{displayStatus(status)}</div>
      </td>
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
