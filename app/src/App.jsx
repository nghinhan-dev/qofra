import Layout from "./layout/Layout";
import { Outlet, useNavigate } from "react-router-dom";
import { useAuth } from "./hook/authContext/useAuth";
import { useEffect } from "react";

function App() {
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) navigate("/login");
  }, [user, navigate]);

  return (
    <>
      {user && (
        <>
          <Layout>
            <Outlet />
          </Layout>
        </>
      )}
    </>
  );
}

export default App;
