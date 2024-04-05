import Button from "../../components/Button/Button";
import Loading from "../../components/Loading/Loading";
import { useGetDetailFindingQuery } from "../../service/FindingAPI";
import { displayTime, displayStatus } from "../../utils/coverter";
import { useParams } from "react-router-dom";
import "./Finding.css";

export default function Finding() {
  const { findingID } = useParams();
  const { data, isSuccess, isLoading, isError, error, refetch } =
    useGetDetailFindingQuery(findingID);

  let content;
  if (isLoading) {
    content = <Loading />;
  } else if (isError) {
    content = (
      <div className="noti-section d__flex">
        <p>{error.data?.message}</p>
        <Button
          type={"button"}
          onClick={() => refetch()}
          value={"Refetch Question"}
        />
      </div>
    );
  } else if (isSuccess) {
    const {
      _id,
      desc,
      dueDate,
      foundDate,
      images,
      // personInCharge,
      question,
      reporter,
      status,
    } = data;

    content = (
      <>
        <div className="finding--container d__flex">
          <div className="finding--row d__flex">
            <p className="key">Found date</p>
            <div className="time">{displayTime(foundDate)}</div>
          </div>
          <div className="finding--row d__flex">
            <p className="key">Due date</p>
            <div className="time">{displayTime(dueDate)}</div>
          </div>
          <div className="finding--row d__flex">
            <p className="key">Status</p>
            <div>{displayStatus(status)}</div>
          </div>
          <div className="finding--row d__flex">
            <p className="key">Process</p>
            <div>
              <ul className="tag__container">
                <li>{question.scope}</li>
                <li>{question.process}</li>
              </ul>
            </div>
          </div>
          <div className="finding--row d__flex">
            <p className="key">Reporter</p>
            <div>
              <p>{reporter}</p>
            </div>
          </div>
          <div className="finding--row d__flex">
            <p className="key">Question</p>
            <div>{question.content}</div>
          </div>
          <div className="finding--row d__flex">
            <p className="key">Description</p>
            <div>{desc}</div>
          </div>
          <div className="finding--row d__flex">
            <p className="key">Images</p>
            <div>
              {images.map((imgUrl, index) => (
                <a target="_blank" href={imgUrl} key={_id + index}>
                  Image {index + 1} Url
                </a>
              ))}
            </div>
          </div>
          <div className="finding--row d__flex">
            <p className="key">Action</p>
            <div>
              <textarea name="actionForFinding"></textarea>
            </div>
          </div>
          <div className="d__flex">
            <Button value="Add action" type="button" bgColor="#eaea1d" />
          </div>
        </div>
      </>
    );
  }
  return <section className="d__flex">{content}</section>;
}
