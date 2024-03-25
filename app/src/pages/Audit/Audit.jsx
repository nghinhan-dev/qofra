import { useState } from "react";
import { useGetQuestionsMutation } from "../../service/QuestionAPI";
import Loading from "../../components/Loading/Loading";
import GenQuestion from "../../features/genQForm/GenQuestionForm";
import Button from "../../components/Button/Button";
import "./Audit.css";

export default function Audit() {
  const [department, setDepartment] = useState("");
  const [process, setProcess] = useState("");
  const [level, setLevel] = useState("");

  const [
    generateQ,
    { isLoading, isUninitialized, isSuccess, isError, error, reset },
  ] = useGetQuestionsMutation();

  let questions;

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      questions = await generateQ({
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
    console.log(error);
    content = (
      <div className="error-page">
        <p>{error.data?.message}</p>
        <Button type={"button"} onClick={() => reset()} value={"Reset Form"} />
      </div>
    );
  } else if (isSuccess) {
    console.log(questions);
    content = <h1>Success</h1>;
  }

  return (
    <>
      <div className="form__genQ">
        <form method="POST" onSubmit={onSubmit}>
          {isUninitialized && (
            <GenQuestion
              setDepartment={setDepartment}
              setProcess={setProcess}
              setLevel={setLevel}
            />
          )}
          {content}
        </form>
      </div>
    </>
  );
}
