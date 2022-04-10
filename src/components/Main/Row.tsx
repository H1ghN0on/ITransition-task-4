import React from "react";

type RowProps = {
  user: any;
  checkHandler: (user: any, action: "add" | "remove") => void;
  selected: boolean;
};

const Row: React.FC<RowProps> = ({ user, checkHandler, selected }) => {
  const handleCheckRow = (e: React.ChangeEvent<HTMLInputElement>) => {
    checkHandler(user, e.target.checked ? "add" : "remove");
  };
  return (
    <tr key={user.id}>
      <th scope="row">
        <input
          type="checkbox"
          className="form-check-input"
          id="rowcheck{user.id}"
          onChange={handleCheckRow}
          checked={selected}
        />
      </th>
      <td>{user.id}</td>
      <td>{user.username}</td>
      <td>{user.email}</td>
      <td>{user.status ? "Blocked" : "Active"}</td>
      <td>{user.loginDate}</td>
    </tr>
  );
};

export default Row;
