import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";

import UserContext from "./Context/User/user.context";

import Header from "./Components/Header";
import Landing from "./Components/Landing";
import Success from "./Components/Success";

const Layout = () => {
  const currentUser = window.localStorage.getItem("userData");
  const [user, setUser] = useState(JSON.parse(currentUser) || "");
  return (
    <>
      <UserContext.Provider value={user}>
        <Header />
        <Routes>
          <Route
            path="/"
            exact
            element={<Landing />}
          />
          <Route
            path="/success"
            exact
            element={<Success setUser={setUser} />}
          />
        </Routes>
      </UserContext.Provider>
    </>
  );
};
export default Layout;
