/* eslint-disable react/prop-types */
import Navbar from "../components/Navbar/Navbar";
import Footer from "../components/Footer/Footer";
import Logout from "../features/auth/Logout";
import { ToastContainer } from "react-toastify";
import "./Layout.css";
import "react-toastify/dist/ReactToastify.css";

export default function Layout({ children }) {
  return (
    <>
      <ToastContainer
        position="top-right"
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
      <Logout />
      <Navbar />
      {children}
      <Footer />
    </>
  );
}
