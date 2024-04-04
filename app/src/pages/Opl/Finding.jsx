import { useGetDetailFindingQuery } from "../../service/FindingAPI";
import { useParams } from "react-router-dom";

export default function Finding() {
  const { findingID } = useParams();
  const { data, isSuccess } = useGetDetailFindingQuery(findingID);

  if (isSuccess) {
    console.log(data);
  }
  return <div>Finding</div>;
}
