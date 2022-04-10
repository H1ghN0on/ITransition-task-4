import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UserState {
  user: { username: string; email: string };
  token: string;
  isBlocked: boolean;
}

const initialState = {
  user: {},
  token: "",
  isBlocked: false,
} as UserState;

const userSlice = createSlice({
  name: "userSlice",
  initialState,
  reducers: {
    setToken(state, action: PayloadAction<string>) {
      state.token = action.payload;
    },
    setUserInfo(
      state,
      action: PayloadAction<{
        user: { username: string; email: string };
        token?: string;
      }>
    ) {
      state.user = action.payload.user;
      if (action.payload.token) {
        state.token = action.payload.token;
      }
    },
    setBlocked(state, action: PayloadAction<boolean>) {
      state.isBlocked = action.payload;
    },
  },
});

export const { setUserInfo, setToken } = userSlice.actions;
export default userSlice.reducer;
