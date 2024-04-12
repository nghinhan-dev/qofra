import { useState } from "react";
import Loading from "../../components/Loading/Loading";
import Table from "../../components/Table/Table";
import { useGetFindingsQuery } from "../../service/FindingAPI";
import { abbreviatedName } from "../../utils/converter";

export default function Opl() {
  const { data, isLoading, isSuccess, isError, error } = useGetFindingsQuery();
  const [selectPerson, setSelectPerson] = useState("");

  let content;

  if (isLoading) {
    content = <Loading />;
  } else if (isError) {
    content = (
      <div className="noti-section d__flex">
        <p>{error.data?.message}</p>
      </div>
    );
  } else if (isSuccess) {
    const tableData = selectPerson
      ? data.filter(
          (finding) => finding.personInCharge.fullName === selectPerson
        )
      : data;

    const options = getPICArray(data);

    content = (
      <Table
        options={options}
        data={tableData}
        setSelectPerson={setSelectPerson}
      />
    );
  }

  return <>{content}</>;
}

function getPICArray(data) {
  const map = new Map();
  data.forEach((finding) => {
    map.set(finding.personInCharge.fullName, {
      value: finding.personInCharge.fullName,
      label: abbreviatedName(finding.personInCharge.fullName),
    });
  });

  // eslint-disable-next-line no-unused-vars
  const array = Array.from(map, ([name, value]) => {
    return value;
  });

  return array;
}
