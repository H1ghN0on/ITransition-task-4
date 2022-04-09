import React from "react";
import { Route, Routes } from "react-router";
import { BrowserRouter } from "react-router-dom";
import { Auth, Main } from "./pages";

export type UserData = {
  username: string;
  password: string;
  email: string;
};

const App = () => {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/auth" element={<Auth />} />

          <Route path="/main" element={<Main />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
