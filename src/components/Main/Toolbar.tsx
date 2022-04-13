import React from "react";
import { BoxArrowRight, Lock, Trash3, Unlock } from "react-bootstrap-icons";
import styled from "styled-components";
import Axios from "../../config/axios";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { block, destroy } from "../../redux/tableSlice";

import { MainFragment } from "../../pages/Main";

const ToolbarContainer = styled.div`
  border: 1px solid black;
  border-radius: 15px;
`;

const ButtonContainer = styled.div`
  cursor: pointer;
  transition: 0.1s;
  &:hover {
    color: red;
  }
`;

const ToolbarText = styled.span`
  margin-top: 5px;
  font-size: 18px;
`;

const Toolbar: React.FC<MainFragment> = ({ handleLogout }) => {
  const users = useAppSelector((state) => state.tableSlice.users);
  const dispatch = useAppDispatch();

  const checkIfCurUserIsBlocked = async () => {
    try {
      const { data } = await Axios().get("/me");
      if (data.user) {
        return data.user.status;
      } else {
        handleLogout();
        return false;
      }
    } catch (error) {
      console.log(error);
      return true;
    }
  };

  const checkIfChangedSelf = async () => {
    try {
      const { data } = await Axios().get("/me");
      return data.user;
    } catch (error) {
      console.log(error);
      return false;
    }
  };

  const changeUserStatus = async (toBlock: boolean) => {
    if (await checkIfCurUserIsBlocked()) {
      handleLogout();
      return;
    }
    try {
      const selectedUsers = users.filter((user) => user.selected);
      if (selectedUsers.length === 0) return;
      await Axios().post(toBlock ? "/block" : "/unblock", {
        users: selectedUsers,
      });

      dispatch(block(toBlock));
      const user = await checkIfChangedSelf();
      if (user.status === true) {
        handleLogout();
      }
    } catch (error) {
      return;
    }
  };

  const handleBlockClick = async () => {
    changeUserStatus(true);
  };

  const handleUnblockClick = async () => {
    changeUserStatus(false);
  };

  const handleDeleteClick = async () => {
    if (await checkIfCurUserIsBlocked()) {
      handleLogout();
      return;
    }
    try {
      const selectedUsers = users.filter((user) => user.selected);
      if (selectedUsers.length === 0) return;
      await Axios().post("/delete", {
        users: selectedUsers,
      });
    } catch (error) {
      return;
    }
    dispatch(destroy());
    if (!(await checkIfChangedSelf())) {
      handleLogout();
    }
  };

  return (
    <ToolbarContainer className="d-flex justify-content-center align-items-center">
      <ButtonContainer
        onClick={handleBlockClick}
        className="d-flex flex-column align-items-center m-3"
      >
        <Lock width={32} height={32} />
        <ToolbarText>Block</ToolbarText>
      </ButtonContainer>
      <ButtonContainer
        onClick={handleUnblockClick}
        className="d-flex flex-column align-items-center m-3"
      >
        <Unlock width={32} height={32} />
        <ToolbarText>Unblock</ToolbarText>
      </ButtonContainer>
      <ButtonContainer
        onClick={handleDeleteClick}
        className="d-flex flex-column align-items-center m-3"
      >
        <Trash3 width={32} height={32} />
        <ToolbarText>Delete</ToolbarText>
      </ButtonContainer>
      <ButtonContainer
        onClick={handleLogout}
        className="d-flex flex-column align-items-center m-3"
      >
        <BoxArrowRight width={32} height={32} />
        <ToolbarText>Log Out</ToolbarText>
      </ButtonContainer>
    </ToolbarContainer>
  );
};

export default Toolbar;
