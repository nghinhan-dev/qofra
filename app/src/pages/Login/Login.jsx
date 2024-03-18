import { Form } from "react-router-dom";
import InputText from "../../components/Input/InputText";
import Button from "../../components/Button/Button";
import "./Login.css";

export default function Login() {
  return (
    <>
      <div id="loginPage">
        <div className="login__container">
          <Form>
            <InputText></InputText>
            <InputText></InputText>
            <Button></Button>
          </Form>
        </div>
      </div>
    </>
  );
}
