import { useState } from "react";
import { useGetAuditQuestionsMutation } from "../../service/QuestionAPI";
import Loading from "../../components/Loading/Loading";
import Button from "../../components/Button/Button";
import GenQuestion from "../../features/genQForm/GenQuestionForm";
import SingleQForm from "../../features/singleQForm/SingleQFrom";
import "./Audit.css";

export default function Audit() {
  const [department, setDepartment] = useState("");
  const [process, setProcess] = useState("");
  const [level, setLevel] = useState("");

  const [
    generateQ,
    { isLoading, isUninitialized, isSuccess, isError, error, reset },
  ] = useGetAuditQuestionsMutation();

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      await generateQ({
        dep: department,
        process: process,
        level: level,
        hasIssue: false,
      }).unwrap();
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
        <Button type={"button"} onClick={() => reset()} value={"Reset Form"} />
      </div>
    );
  } else if (isSuccess) {
    content = <SingleQForm />;
  }

  return (
    <>
      <div className="form__genQ">
        {isUninitialized && (
          <form method="POST" onSubmit={onSubmit}>
            <GenQuestion
              setDepartment={setDepartment}
              setProcess={setProcess}
              setLevel={setLevel}
            />
          </form>
        )}

        {content}
      </div>
    </>
  );
}
