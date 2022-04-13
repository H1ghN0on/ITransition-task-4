import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type TableUser = {
  id: number;
  username: string;
  email: string;
  status: boolean;
  loginDate: string;
  selected: boolean;
};

interface UserState {
  users: TableUser[];
}

const initialState = {
  users: [],
} as UserState;

const tableSlice = createSlice({
  name: "userSlice",
  initialState,
  reducers: {
    setUsers(state, action: PayloadAction<TableUser[]>) {
      state.users = action.payload;
    },

    selectAll(state, action: PayloadAction<boolean>) {
      state.users = state.users.map((user) => {
        user.selected = action.payload;
        return user;
      });
    },

    selectOne(state, action: PayloadAction<{ id: number; toSelect: boolean }>) {
      state.users = state.users.map((user) => {
        if (action.payload.id === user.id) {
          user.selected = action.payload.toSelect;
        }

        return user;
      });
    },

    block(state, action: PayloadAction<boolean>) {
      state.users = state.users.map((user) => {
        if (user.selected) {
          user.status = action.payload;
        }
        return user;
      });
    },

    destroy(state) {
      state.users = state.users.filter((user) => !user.selected);
    },
  },
});

export const { setUsers, selectAll, selectOne, block, destroy } =
  tableSlice.actions;
export default tableSlice.reducer;
