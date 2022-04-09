import React from "react";

import {
  Title,
  Input,
  Submit,
  RegisterSpan,
  RegisterLink,
  Error,
} from "../styles/components";
import { AuthFragment } from "../pages/Auth";
import Axios from "../config/axios";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

type InputLoginType = {
  username: string;
  password: string;
};

const Login: React.FC<AuthFragment> = ({ handleFooterClick, redirect }) => {
  const navigate = useNavigate();

  const [error, setError] = React.useState<string>("");
  const [inputValues, setInputValues] = React.useState<InputLoginType>({
    username: "",
    password: "",
  });

  const login = async (requestData: InputLoginType) => {
    try {
      const { data } = await Axios.post("/login", requestData);
      if (data.status === "Error") {
        setError(data.message);
      } else {
        if (data.user.token) {
          redirect(
            { username: data.user.username, email: data.user.email },
            data.user.token
          );
        }
      }
    } catch (error) {
      setError("Something gone wrong");
    }
  };

  const handleValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValues({ ...inputValues, [e.target.name]: e.target.value });
  };
  const handleSubmitClick = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setError("");
    const requestData = {
      username: inputValues.username,
      password: inputValues.password,
    };
    await login(requestData);
  };
  return (
    <>
      <Title className="text-center">Login</Title>
      {error && (
        <Error className="d-flex justify-content-center">{error}</Error>
      )}
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
          type="password"
          placeholder="Password"
        />
        <Submit
          onClick={handleSubmitClick}
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
