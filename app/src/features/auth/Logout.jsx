import { LogOut } from "lucide-react";
import "./Logout.css";
import { useSelector } from "react-redux";

// eslint-disable-next-line react/prop-types
export default function Logout({ sendLogout }) {
  const username = useSelector((state) => state.auth.username);

  return (
    <div onClick={sendLogout} className="logOut d__flex">
      <p>{username} </p> <LogOut size={20} />
    </div>
  );
}
