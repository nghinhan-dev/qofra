import { LogOut } from "lucide-react";
import "./Logout.css";
import { useSendLogoutMutation } from "../../service/AuthAPI";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export default function Logout() {
  const navigate = useNavigate();
  const [sendLogout, { isSuccess, isError, error }] = useSendLogoutMutation();

  if (isSuccess) navigate("/login");
  if (isError)
    toast.error(error.message, {
      position: "top-center",
    });

  return (
    <div onClick={sendLogout} className="logOut d__flex">
      <LogOut size={20} />
    </div>
  );
}
