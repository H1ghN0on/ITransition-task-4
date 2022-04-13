import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import Table from "../components/Main/Table";
import Toolbar from "../components/Main/Toolbar";
import Cookies from "js-cookie";
import { useAppDispatch } from "../redux/hooks";
import { useNavigate } from "react-router";
import { setToken, setUserInfo } from "../redux/userSlice";
import Axios from "../config/axios";

export interface MainFragment {
  handleLogout: () => void;
}

const Main = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  React.useEffect(() => {
    const getUserData = async () => {
      try {
        const { data } = await Axios().get("/me");
        if (data.user) {
          dispatch(
            setUserInfo({
              user: { username: data.user.username, email: data.user.email },
            })
          );
          if (data.user.status === true) {
            handleLogOutClick();
          }
        }
      } catch (error) {
        console.log(error);
      }
    };
    getUserData();
  }, []);

  const handleLogOutClick = () => {
    Cookies.remove("token");
    dispatch(setToken(""));
    navigate("/auth");
  };

  return (
    <Container className="p-5">
      <Row>
        <Col md="12">
          <Toolbar handleLogout={handleLogOutClick} />
        </Col>
      </Row>
      <Row>
        <Col md="12">
          <Table />
        </Col>
      </Row>
    </Container>
  );
};

export default Main;
