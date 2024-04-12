import { LogOut } from "lucide-react";
import "./Logout.css";

// eslint-disable-next-line react/prop-types
export default function Logout({ sendLogout }) {
  return (
    <div onClick={sendLogout} className="logOut d__flex">
      <LogOut size={20} />
    </div>
  );
}
