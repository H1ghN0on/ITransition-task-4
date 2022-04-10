import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { userSlice, tableSlice } from "./slices";

const rootReducer = combineReducers({
  userSlice,
  tableSlice,
});

export const store = configureStore({
  reducer: rootReducer,
});

// Infer the `RootState` and `AppDispatch` types from the store itself

export type AppStore = ReturnType<typeof configureStore>;
export type AppState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
