/* eslint-disable react/prop-types */
import { useState } from "react";
import InputSelect from "../../components/Input/InputSelect";
import Button from "../../components/Button/Button";
import { useCreateFindingMutation } from "../../service/FindingAPI";
import { selectAuditQuestionay } from "../../lib/redux/questionSlice";
import { abbreviatedName } from "../../utils/converter";
import { useSelector } from "react-redux";

export default function CreateFinding({ createIssue }) {
  // FORM STATE
  const [desc, setDesc] = useState("");
  const [selectIncharge, setSelectedIncharge] = useState("");
  const [selectedFiles, setSelectedFiles] = useState([]);

  const [createFinding] = useCreateFindingMutation();
  const questions = useSelector(selectAuditQuestionay);
  const { _id, inCharge } = questions[0];

  const handleFileChange = (e) => {
    setSelectedFiles(Array.from(e.target.files));
  };

  const submitCreateFinding = async (e) => {
    e.preventDefault();

    const formData = new FormData();

    // Append each selected file to FormData
    selectedFiles.forEach((file) => {
      formData.append("findingImages", file);
    });

    formData.append("picID", selectIncharge);
    formData.append("desc", desc);
    formData.append("questionID", _id);

    try {
      await createFinding(formData);

      createIssue(() => false);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <form onSubmit={submitCreateFinding} encType="multipart/form-data">
        <span className="label">Description</span>
        <textarea
          onChange={(e) => setDesc(e.target.value)}
          name="description"
          id="description"
          cols="90"
          rows="5"
        ></textarea>

        <div className="d__flex">
          <input
            type="file"
            name="findingImages"
            accept=".jpg, .png, .jpeg"
            onChange={handleFileChange}
            multiple
          />
          <InputSelect
            hasLable={false}
            label="Incharge"
            options={inCharge.map((user) => ({
              value: user._id,
              label: abbreviatedName(user.fullName),
            }))}
            setState={setSelectedIncharge}
          />
        </div>
        <div className="sF__button-container d__flex">
          <Button type="submit" value="Submit" />
          <Button
            type="button"
            value="Cancel"
            onClick={() => createIssue(() => false)}
            bgColor={"#b22222"}
          />
        </div>
      </form>
    </>
  );
}
