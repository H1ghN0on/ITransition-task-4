import React from "react";
import Login from "../components/Auth/Login";
import Register from "../components/Auth/Register";
import Cookies from "js-cookie";
import { Container, Row, Col } from "react-bootstrap";
import styled from "styled-components";
import { useAppDispatch } from "../redux/hooks";
import { setUserInfo } from "../redux/userSlice";
import { useNavigate } from "react-router";

const Background = styled.div`
  background-image: url("/background.jpeg");
  height: 100vh;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
`;

export type AuthFragment = {
  handleFooterClick: () => void;
  redirect: (user: { username: string; email: string }, token: string) => void;
};

const Auth = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [activeFragment, setActiveFragment] = React.useState<
    "login" | "register"
  >("login");

  const redirect = (
    user: { username: string; email: string },
    token: string
  ) => {
    Cookies.set("token", token);
    dispatch(setUserInfo({ user, token }));
    navigate("/main");
  };

  const Fragment = () => {
    switch (activeFragment) {
      case "login": {
        return (
          <Login
            redirect={redirect}
            handleFooterClick={() => {
              setActiveFragment("register");
            }}
          />
        );
      }
      case "register": {
        return (
          <Register
            redirect={redirect}
            handleFooterClick={() => {
              setActiveFragment("login");
            }}
          />
        );
      }
    }
  };

  return (
    <Background>
      <Container fluid>
        <Row className="d-flex justify-content-center align-items-center vh-100">
          <Col xs="10" sm="8" lg="6" xl="4" className="rounded p-4">
            <Fragment />
          </Col>
        </Row>
      </Container>
    </Background>
  );
};

export default Auth;
