import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UserState {
  user: { username: string; email: string };
  token: string;
}

const initialState = {
  user: {},
  token: "",
} as UserState;

const userSlice = createSlice({
  name: "userSlice",
  initialState,
  reducers: {
    setUserInfo(
      state,
      action: PayloadAction<{
        user: { username: string; email: string };
        token: string;
      }>
    ) {
      state.user = action.payload.user;
      state.token = action.payload.token;
    },
  },
});

export const { setUserInfo } = userSlice.actions;
export default userSlice.reducer;
