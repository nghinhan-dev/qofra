import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { User, LockKeyhole } from "lucide-react";
import { setCredentials } from "../../lib/redux/authSlice";
import { useLoginMutation } from "../../service/AuthAPI";
import InputText from "../../components/Input/InputText";
import Button from "../../components/Button/Button";
import { toast } from "react-toastify";
import "./Login.css";

export default function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [login, { isLoading }] = useLoginMutation();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { accessToken, fullName } = await login({
        username: username,
        password: password,
      }).unwrap();
      dispatch(setCredentials({ accessToken, fullName }));
      setUsername("");
      setPassword("");
      navigate("/");
    } catch (error) {
      toast(error.message);
    }
  };

  return (
    <>
      <div id="loginPage">
        <div className="login__container">
          <div className="img-logo">
            <img src="/framas_logo.png" alt="Framas Logo" />
          </div>
          <form method="POST" onSubmit={handleSubmit}>
            <InputText
              icon={<User />}
              setState={setUsername}
              placeHolder="Username"
            />
            <InputText
              icon={<LockKeyhole />}
              setState={setPassword}
              placeHolder="Password"
            />
            <Button disabled={isLoading} type={"submit"} value={"Submit"} />
          </form>
        </div>
      </div>
    </>
  );
}
