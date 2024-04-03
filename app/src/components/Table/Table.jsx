/* eslint-disable react/prop-types */
import { displayTime, abbreviatedName } from "../../utils/coverter";
import "./Table.css";
import { SendHorizontal } from "lucide-react";

export default function Table({ data }) {
  return (
    <div className="d__flex">
      <div className="table__container ">
        <table>
          <thead>
            <tr>
              <td>Process</td>
              <td width={"20%"}>Description</td>
              <td>Due Date</td>
              <td>Reporter</td>
              <td>P.I.C</td>
              <td width={"20%"}>Actions</td>
              <td>Status</td>
            </tr>
          </thead>
          <tbody>
            {data.map((finding) => (
              <Row key={finding._id} {...finding} />
            ))}
          </tbody>
        </table>
      </div>
    </div>
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
      <td>{question.process}</td>
      <td>{desc}</td>
      <td>{displayTime(dueDate)}</td>
      <td>{abbreviatedName(reporter)}</td>
      <td>{abbreviatedName(personInCharge.fullName)}</td>
      <td>{action}</td>
      <td>{status}</td>
      <td>
        <SendHorizontal size={15} />
      </td>
    </tr>
  );
}
