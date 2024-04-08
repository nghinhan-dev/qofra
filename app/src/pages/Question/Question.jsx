/* eslint-disable react/prop-types */
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useGetQuestionsQuery } from "../../service/QuestionAPI";
import Dialog from "../../components/Dialog/Dialog";
import { displayTime } from "../../utils/converter";
import { updateQuery } from "../../lib/redux/questionSlice";
import "./Question.css";

export default function Question() {
  const dispatch = useDispatch();
  const searchQuery = useSelector((state) => state.question.searchQuery);
  const [filterState, setFilterState] = useState({
    scope: {
      values: ["man", "material", "safety", "method/measurement", "machine"],
      selected: [],
    },
    process: {
      values: ["Extruder", "Mixing", "Crushing", "Mold Setter"],
      selected: [],
    },
    dep: {
      values: ["Production", "C&M"],
      selected: [],
    },
  });

  const { data, isLoading, isSuccess } = useGetQuestionsQuery(searchQuery);

  let tableContent;

  const checkHandler = (key, value, checked) => {
    const newFilterState = { ...filterState }; // Create a shallow copy of the state object

    if (checked) {
      newFilterState[key].selected.push(value);
    } else {
      const index = newFilterState[key].selected.findIndex(
        (selectedValue) => selectedValue === value
      );

      if (index !== -1) {
        newFilterState[key].selected.splice(index, 1); // Remove the item from the array
      }
    }

    setFilterState(newFilterState); // Update the state with the new object
  };

  const renderTags = () => {
    const tagsContent = [];

    for (const [key, value] of Object.entries(filterState)) {
      if (value.selected.length > 0) {
        tagsContent.push(
          <p key={key}>
            {key} :{" "}
            {value.selected.length === 1
              ? value.selected[0]
              : `${value.selected.length} selected`}
          </p>
        );
      }
    }

    if (tagsContent.length === 0) {
      return <p>Empty filter</p>;
    }

    return tagsContent;
  };

  const applyFilter = () => {
    let query = "?";

    for (const [key, value] of Object.entries(filterState)) {
      if (value.selected.length > 0) {
        value.selected.forEach((checked) => {
          // URL encode key and value
          const encodedKey = encodeURIComponent(key);
          const encodedValue = encodeURIComponent(checked);

          // Append key-value pair to the query string
          query += `${encodedKey}=${encodedValue}&`;
        });
      }
    }

    // Remove the trailing "&" if it exists
    if (query.endsWith("&")) {
      query = query.slice(0, -1);
    }

    console.log(query);
    dispatch(updateQuery(query));
  };

  if (isSuccess) {
    tableContent =
      data.result.length !== 0 ? (
        data.result.map((question) => (
          <QuestionRow
            key={question._id}
            {...question}
            applyFilter={applyFilter}
          />
        ))
      ) : (
        <tr>
          <td>
            <p>Empty result</p>
          </td>
        </tr>
      );
  }

  return (
    <section className="d__flex table">
      <div className="table--header">
        <h1>Question Database</h1>
      </div>
      <div className="filter--container">
        <div className="filter--tags d__flex">{renderTags()}</div>
        <Dialog
          options={filterState}
          applyFilter={applyFilter}
          setStateHanlder={checkHandler}
        />
      </div>
      <div className="table__container ">
        <table>
          <thead>
            <tr>
              <td width={"10%"}>
                <p>Deparment</p>
              </td>
              <td width={"5%"}>
                <p>Process</p>
              </td>
              <td width={"5%"}>
                <p>Scope</p>
              </td>
              <td width={"55%"}>
                <p>Content</p>
              </td>
              <td width={"15%"}>
                <p>Last Time Audit</p>
              </td>
              <td width={"10%"}>
                <p>Has issue</p>
              </td>
            </tr>
          </thead>

          <tbody>
            {isLoading && (
              <tr>
                <td>
                  <p>Loading data...</p>
                </td>
              </tr>
            )}
            {tableContent}
          </tbody>
        </table>
      </div>
    </section>
  );
}

function QuestionRow({
  dep,
  process,
  scope,
  content,
  lastTimeAudit,
  hasIssue,
}) {
  return (
    <tr>
      <td>
        <p>{dep}</p>
      </td>
      <td>
        <p>{process}</p>
      </td>
      <td>
        <p>{scope}</p>
      </td>
      <td>
        <p>{content}</p>
      </td>
      <td>
        <p>{displayTime(lastTimeAudit)}</p>
      </td>
      <td>
        <p>{hasIssue ? "True" : "False"}</p>
      </td>
    </tr>
  );
}
