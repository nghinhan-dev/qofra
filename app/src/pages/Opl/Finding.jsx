import Button from "../../components/Button/Button";
import Loading from "../../components/Loading/Loading";
import Icon from "../../components/Icon/Icon";
import {
  useGetDetailFindingQuery,
  useResolveFindingMutation,
} from "../../service/FindingAPI";
import { displayTime, displayStatus } from "../../utils/converter";
import { useParams, Link } from "react-router-dom";
import { toast } from "react-toastify";
import "./Finding.css";
import { useState } from "react";

export default function Finding() {
  const [actionText, setActionText] = useState("");
  const { findingID } = useParams();
  const { data, isSuccess, isLoading, isError, error, refetch } =
    useGetDetailFindingQuery(findingID);
  const [resolve] = useResolveFindingMutation();

  const resolveHandler = async (_id) => {
    try {
      await resolve({ _id, action: actionText });
    } catch (error) {
      console.log("error:", error);
    }
  };

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
    const { isPIC, finding } = data;
    const {
      _id,
      desc,
      dueDate,
      foundDate,
      images,
      action,
      question,
      detector,
      status,
    } = finding;

    content = (
      <>
        <div className="finding--nav d__flex">
          <Link to={"/opl"} className="d__flex">
            <Icon name={"ArrowLeftFromLine"} /> Back to OPL
          </Link>
        </div>
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
            <p className="key">Detector</p>
            <div>
              <p>{detector}</p>
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
              <textarea
                defaultValue={action}
                disabled={!isPIC}
                name="actionForFinding"
                onChange={(e) => setActionText(() => e.target.value)}
              ></textarea>
            </div>
          </div>
          <div className="d__flex">
            <Button
              onClick={() =>
                !isPIC
                  ? toast.warning("Only P.I.C can modify action")
                  : resolveHandler(_id)
              }
              value="Add action"
              type="button"
              bgColor="#eaea1d"
            />
          </div>
        </div>
      </>
    );
  }
  return <section className="d__flex">{content}</section>;
}
