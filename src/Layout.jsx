import React from "react";

import { Routes, Route } from "react-router-dom";
import Landing from "./Components/Landing";
import Success from "./Components/Success";

const Layout = () => {
  return (
    <>
      <Routes>
        {/* unprotected routes */}
        <Route
          path="/"
          exact
          element={<Landing />}
        />
        <Route
          path="/success"
          exact
          element={<Success />}
        />
      </Routes>
    </>
  );
};
export default Layout;
