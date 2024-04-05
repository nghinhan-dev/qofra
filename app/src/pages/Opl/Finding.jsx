import Button from "../../components/Button/Button";
import Loading from "../../components/Loading/Loading";
import { useGetDetailFindingQuery } from "../../service/FindingAPI";
import { displayTime, displayStatus } from "../../utils/coverter";
import { useParams } from "react-router-dom";

export default function Finding() {
  const { findingID } = useParams();
  const { data, isSuccess, isLoading, isError, error } =
    useGetDetailFindingQuery(findingID);

  let content;
  if (isLoading) {
    content = <Loading />;
  } else if (isError) {
    content = (
      <div className="noti-section d__flex">
        <p>{error.data?.message}</p>
        <Button type={"button"} value={"Reset Form"} />
      </div>
    );
  } else if (isSuccess) {
    const {
      desc,
      dueDate,
      foundDate,
      images,
      personInCharge,
      question,
      reporter,
      status,
    } = data;

    content = (
      <>
        <div className="finding--container">
          {/* <p>Found date : {displayTime(foundDate)}</p>
            <p>Status : {displayStatus(status)} Due date : {displayTime(dueDate)} </p>
            <p>Reporter : {reporter}</p>
            <p>Process : {question.process} {question.scope}</p>
            <p>Question : {question.content}</p>
            <p>Images </p> */}
        </div>
      </>
    );
  }
  return <>{content}</>;
}
