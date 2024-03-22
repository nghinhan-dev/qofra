import Layout from "./layout/Layout";
import Loading from "./components/Loading/Loading";
import { Outlet, Link } from "react-router-dom";
import { useSelector } from "@reduxjs/toolkit";
import { selectCurrentToken } from "./lib/redux/authSlice";
import { useRefreshMutation } from "./service/AuthAPI";
import { useEffect, useRef } from "react";

function App() {
  const effectRan = useRef(false);
  const token = useSelector(selectCurrentToken);
  const [refresh, { isUninitialized, isLoading, isSuccess, isError, error }] =
    useRefreshMutation();

  useEffect(() => {
    if (effectRan.current === true || import.meta.env.DEV) {
      const verifyRefreshToken = async () => {
        try {
          await refresh();
        } catch (error) {
          console.log("error:", error);
        }
      };

      if (!token) verifyRefreshToken;
    }

    return () => (effectRan.current = true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  let content;
  if (isLoading) {
    content = <Loading />;
  } else if (isError) {
    content = (
      <>
        <p>
          {error.data?.message}
          <Link to="/login">Please login again</Link>.
        </p>
      </>
    );
  } else if (isSuccess) {
    content = <Outlet />;
  } else if (isUninitialized) {
    console.log(isUninitialized);
    content = <Outlet />;
  }

  return (
    <>
      <Layout>{content}</Layout>
    </>
  );
}

export default App;
