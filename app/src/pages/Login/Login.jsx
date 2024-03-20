import { Form } from "react-router-dom";
import InputText from "../../components/Input/InputText";
import Button from "../../components/Button/Button";
import "./Login.css";

// icons
import { User, LockKeyhole } from "lucide-react";

export default function Login() {
  return (
    <>
      <div id="loginPage">
        <div className="login__container">
          <img src="/framas_logo.png" alt="Framas Logo" />
          <Form method="POST">
            <InputText
              icon={<User />}
              name={"username"}
              placeHolder="Username"
            />
            <InputText
              icon={<LockKeyhole />}
              name={"password"}
              placeHolder="Password"
            />
            <Button type={"submit"} value={"Submit"} />
          </Form>
        </div>
      </div>
    </>
  );
}
