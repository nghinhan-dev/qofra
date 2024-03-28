import Button from "../../components/Button/Button";
import { displayTime } from "../../utils/displayTime";
import {
  usePassedQuestionMutation,
  useSkipQuestionMutation,
} from "../../service/QuestionAPI";
import "./SingleQFrom.css";
import { useSelector } from "react-redux";
import { selectQuestionArray } from "../../lib/redux/questionSlice";
import { useNavigate } from "react-router-dom";

/* eslint-disable react/prop-types */
export default function SingleQFrom() {
  const navigate = useNavigate();

  const questions = useSelector(selectQuestionArray);
  const [passed] = usePassedQuestionMutation();
  const [skip] = useSkipQuestionMutation();

  if (questions.length === 0) {
    return (
      <div className="noti-section">
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
    <div id="singleForm">
      <div className="sF__header">
        <ul className="tag__container">
          <li>{scope}</li>
          <li>{process}</li>
        </ul>
        <p className="time">Last time audit : {displayTime(lastTimeAudit)}</p>
      </div>
      <div className="sF__body">
        <p>{content}</p>
      </div>
      <div className="sF__button-container">
        <Button
          bgColor={"#22b222"}
          onClick={() => triggerMutationHandler(passed, _id)}
          value="Yes"
        />
        <Button
          bgColor={"#b22222"}
          // onClick={() =>
          //   currentIndex !== questions.length - 1
          //     ? setCurrentIndex((prevIndex) => prevIndex + 1)
          //     : ""
          // }
          value="No"
        />
        <Button
          bgColor={"#eaea1d"}
          onClick={() =>
            triggerMutationHandler(skip, { _id, scope, dep, process, level })
          }
          value="Skip"
        />
      </div>
    </div>
  );
}
