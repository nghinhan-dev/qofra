import { createBrowserRouter } from "react-router-dom";
// element
import Login from "../../pages/Login/Login";
import Error from "../../pages/Error/Error";
import PersistLogin from "../../features/auth/PersistLogin";
import { Audit, Question, Report, Opl, Finding } from "./components";

const router = createBrowserRouter([
  {
    errorElement: <Error />,
    children: [
      {
        element: <PersistLogin />,
        children: [
          {
            index: true,
            element: <Audit />,
          },
          {
            path: "report",
            element: <Report />,
          },
          {
            path: "opl",
            element: <Opl />,
          },
          {
            path: "question",
            element: <Question />,
          },
          {
            path: "opl/finding/:findingID",
            element: <Finding />,
          },
        ],
      },
      {
        path: "/login",
        element: <Login />,
      },
    ],
  },
]);

export default router;
