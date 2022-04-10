import React from "react";
import Axios from "../../config/axios";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { selectAll, selectOne, setUsers } from "../../redux/tableSlice";
import Head from "./Head";
import Row from "./Row";

const Table = () => {
  const users = useAppSelector((state) => state.tableSlice.users);
  const dispatch = useAppDispatch();

  React.useEffect(() => {
    const getUsers = async () => {
      try {
        const { data } = await Axios().get("/users");
        console.log(data.users);
        const usersWithSelectedProperty = data.users.map((user: any) => {
          user.selected = false;
          return user;
        });
        dispatch(setUsers(usersWithSelectedProperty));
      } catch (error) {
        console.log(error);
        return [];
      }
    };

    getUsers();
  }, []);

  const forcedCheckAll = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(selectAll(e.target.checked));
  };

  const checkHandler = (user: any, action: "add" | "remove") => {
    dispatch(
      selectOne({ id: user.id, toSelect: action === "add" ? true : false })
    );
  };
  const columns = ["Id", "User Name", "Email", "Status", "Last Login Date"];
  return (
    <table className="table">
      <Head columns={columns} forcedCheckAll={forcedCheckAll} />
      <tbody>
        {users &&
          users.map((user: any) => (
            <Row
              key={user.id}
              checkHandler={checkHandler}
              user={user}
              selected={user.selected}
            />
          ))}
      </tbody>
    </table>
  );
};

export default Table;
