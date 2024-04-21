/* eslint-disable react/prop-types */
import Navbar from "../components/Navbar/Navbar";
import Logout from "../features/auth/Logout";
import { toast, ToastContainer } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useSendLogoutMutation } from "../service/AuthAPI";
import "./Layout.css";
import "react-toastify/dist/ReactToastify.css";

export default function Layout({ children }) {
  const navigate = useNavigate();
  const [sendLogout, { isError, error }] = useSendLogoutMutation();

  const sendLogoutHandler = async () => {
    try {
      await sendLogout();

      navigate("/login");
    } catch (error) {
      console.log("error:", error);
    }
  };

  if (isError)
    toast.error(error.message, {
      position: "top-center",
    });
  return (
    <>
      <ToastContainer
        position="top-center"
        autoClose={700}
        hideProgressBar
        newestOnTop={false}
        closeOnClick
        toastStyle={{
          border: "1px solid hsl(0, 0%, 100%, 40%)",
        }}
        rtl={false}
        pauseOnFocusLoss
        draggable
        theme="dark"
        pauseOnHover
      />
      <Logout sendLogout={sendLogoutHandler} />
      <Navbar />
      {children}
    </>
  );
}
