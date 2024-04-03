import Loading from "../../components/Loading/Loading";
import Table from "../../components/Table/Table";
import { useGetFindingsQuery } from "../../service/FindingAPI";

export default function Opl() {
  const { data, isLoading, isSuccess, isError, error } = useGetFindingsQuery();

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
    content = <Table data={data} />;
  }

  return <>{content}</>;
}
