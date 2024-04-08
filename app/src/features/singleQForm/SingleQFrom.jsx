import { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  usePassedQuestionMutation,
  useSkipQuestionMutation,
} from "../../service/QuestionAPI";
import { selectAuditQuestionay } from "../../lib/redux/questionSlice";
import Button from "../../components/Button/Button";
import CreateFinding from "../createFinding/CreateFinding";
import { displayTime } from "../../utils/converter";
import "./SingleQFrom.css";

/* eslint-disable react/prop-types */
export default function SingleQFrom() {
  const navigate = useNavigate();
  const [hasIssue, setHasIssue] = useState(false);

  const questions = useSelector(selectAuditQuestionay);

  // MUTATION HOOKS
  const [passed] = usePassedQuestionMutation();
  const [skip] = useSkipQuestionMutation();

  if (questions.length === 0) {
    return (
      <div className="noti-section d__flex">
        <p>FORM COMPLETED!</p>
        <Button value="Move to OPL" onClick={() => navigate("/opl")} />
      </div>
    );
  }

  const { _id, dep, level, scope, content, process, lastTimeAudit } =
    questions[0];

  async function triggerMutationHandler(mutation, body) {
    try {
      await mutation(body);
    } catch (error) {
      console.log("error:", error);
    }
  }

  return (
    <div id="singleForm" className={hasIssue ? "hasIssue" : ""}>
      <div className="sF__header d__flex">
        <ul className="tag__container">
          <li>{scope}</li>
          <li>{process}</li>
        </ul>
        <p className="time">Last time audit : {displayTime(lastTimeAudit)}</p>
      </div>
      <div className="sF__body">
        <span className="label">Question</span>
        <p className="content">{content}</p>
        {hasIssue && (
          <>
            <CreateFinding createIssue={setHasIssue} />
          </>
        )}
      </div>
      {!hasIssue && (
        <div className="sF__button-container d__flex">
          <Button
            bgColor={"#22b222"}
            onClick={() => triggerMutationHandler(passed, _id)}
            value="Yes"
          />{" "}
          <Button
            bgColor={"#b22222"}
            onClick={() => setHasIssue(true)}
            value="No"
          />
          <Button
            bgColor={"#eaea1d"}
            onClick={() =>
              triggerMutationHandler(skip, { _id, scope, dep, process, level })
            }
            value="Skip"
          />{" "}
        </div>
      )}
    </div>
  );
}
