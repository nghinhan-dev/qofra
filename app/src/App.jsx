import { Outlet } from "react-router-dom";
import PersistLogin from "./features/auth/PersistLogin";

function App() {
  return (
    <PersistLogin>
      <Outlet />
    </PersistLogin>
  );
}

export default App;
