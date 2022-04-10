import React from "react";

export type HeadProps = {
  forcedCheckAll: (e: React.ChangeEvent<HTMLInputElement>) => void;
  columns: string[];
};

const Head: React.FC<HeadProps> = ({ forcedCheckAll, columns }) => {
  return (
    <thead>
      <tr>
        <th scope="col">
          <input
            type="checkbox"
            className="form-check-input"
            id="mastercheck"
            onChange={forcedCheckAll}
          />
        </th>
        {columns.map((name, index) => (
          <th key={index} scope="col">
            {name}
          </th>
        ))}
      </tr>
    </thead>
  );
};

export default Head;
