import Layout from "../../layout/Layout";
import Loading from "../../components/Loading/Loading";
import { Outlet, Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectCurrentToken } from "../../lib/redux/authSlice";
import { useRefreshMutation } from "../../service/AuthAPI";
import { useEffect, useRef } from "react";

function PersistLogin() {
  const effectRan = useRef(false);

  const token = useSelector(selectCurrentToken);
  const [refresh, { isUninitialized, isLoading, isSuccess, isError, error }] =
    useRefreshMutation();

  useEffect(() => {
    if (effectRan.current === false || import.meta.env.DEV) {
      const verifyRefreshToken = async () => {
        try {
          await refresh();
        } catch (error) {
          console.log("error:", error);
        }
      };

      if (!token) verifyRefreshToken();
    }

    return () => (effectRan.current = true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  let content;
  if (isLoading) {
    content = <Loading />;
  } else if (isError) {
    content = (
      <div className="noti-section d__flex">
        <p>{error.data?.message}</p>
        <Link to="login">Please login again</Link>
      </div>
    );
  } else if (isSuccess) {
    content = <Outlet />;
  }

  return (
    <>
      {isUninitialized && <Loading />} <Layout>{content}</Layout>
    </>
  );
}

export default PersistLogin;
