import Cookies from "js-cookie";
import React from "react";
import { Navigate, Route, Routes } from "react-router";
import { BrowserRouter } from "react-router-dom";
import { Auth, Main } from "./pages";
import { useAppSelector } from "./redux/hooks";

export type UserData = {
  username: string;
  password: string;
  email: string;
};

const App = () => {
  const token = useAppSelector((state) => state.userSlice.token);

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route
            path="/auth"
            element={token ? <Navigate to="/main" /> : <Auth />}
          />

          <Route
            path="/main"
            element={token ? <Main /> : <Navigate to="/auth" />}
          />

          <Route path="*" element={<Navigate to="/auth" replace />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
