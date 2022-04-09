import React from "react";

import {
  Title,
  Input,
  Submit,
  RegisterSpan,
  RegisterLink,
} from "../styles/components";
import { AuthFragment } from "../pages/Auth";

type InputLoginType = {
  username: string;
  password: string;
};

const Login: React.FC<AuthFragment> = ({ handleFooterClick }) => {
  const [inputValues, setInputValues] = React.useState<InputLoginType>({
    username: "",
    password: "",
  });

  const handleValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValues({ ...inputValues, [e.target.name]: e.target.value });
  };

  return (
    <>
      <Title className="text-center">Login</Title>
      <form className="d-flex flex-column justify-content-center">
        <Input
          name="username"
          onChange={handleValueChange}
          value={inputValues.username}
          type="text"
          placeholder="Username"
        />
        <Input
          name="password"
          value={inputValues.password}
          onChange={handleValueChange}
          type="text"
          placeholder="Password"
        />
        <Submit
          disabled={Object.values(inputValues)
            .map((obj: string) => obj.trim())
            .includes("")}
          type="submit"
        >
          Log In
        </Submit>
      </form>
      <RegisterSpan className="d-flex justify-content-center">
        Don't have an account?
        <RegisterLink onClick={handleFooterClick}>Register</RegisterLink>
      </RegisterSpan>
    </>
  );
};

export default Login;
