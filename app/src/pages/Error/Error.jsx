import { useRouteError } from "react-router-dom";
import "./Error.css";

export default function Error() {
  const error = useRouteError();
  console.log(error);

  return (
    <div className="error-page">
      <h1>Oops!</h1>
      <p>Sorry, an unexpected error has occurred.</p>
      <p>
        <i>{error.statusText || error.message}</i>
      </p>
    </div>
  );
}
