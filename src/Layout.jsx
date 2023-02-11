import React from "react";

import { Routes, Route } from "react-router-dom";
import Landing from "./Components/Landing";


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
        {/* <Route
          path="*"
          exact
          element={<Notfound />}
        /> */}
      </Routes>
    </>
  );
};
export default Layout;
