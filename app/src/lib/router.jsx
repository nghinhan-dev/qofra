import { createBrowserRouter } from "react-router-dom";
// element
import App from "../App";
import Audit from "../pages/Audit/Audit";
import Login from "../pages/Login/Login";
import Opl from "../pages/Opl/Opl";
import Report from "../pages/Report/Report";
import Finding from "../pages/Finding/Finding";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/audit",
        element: <Audit />,
      },
      {
        path: "/report",
        element: <Report />,
      },
      {
        path: "/opl",
        element: <Opl />,
      },
      {
        path: "/finding",
        element: <Finding />,
      },
    ],
  },
  {
    path: "/login",
    element: <Login />,
  },
]);

export default router;
