import { LogOut } from "lucide-react";
import "./Logout.css";
import { useSelector } from "react-redux";

// eslint-disable-next-line react/prop-types
export default function Logout({ sendLogout }) {
  const fullName = useSelector((state) => state.auth.fullName);

  return (
    <div onClick={sendLogout} className="logOut d__flex">
      <p>{fullName}</p> <LogOut size={20} />
    </div>
  );
}
