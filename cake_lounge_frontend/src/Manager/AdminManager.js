import React, { Component, useState } from "react";
import AdminLogin from "../Components/Admin/AdminLogin";
import AdminDashboard from "../Pages/AdminDashboard";

import { BrowserRouter, Routes, Route, useMatch } from "react-router-dom";

function AdminManager(props) {
  const [loggedIn, setLoggedIn] = useState(false);
  const [url, serUrl] = useState("*");
  return (
    <>
      <Routes>
        {!loggedIn && (
          <Route
            path="login"
            element={<AdminLogin sampleProp="none"></AdminLogin>}
          ></Route>
        )}
        <Route
          path="dashboard/*"
          element={<AdminDashboard></AdminDashboard>}
        ></Route>
        <Route path="*" element={<h1>default</h1>}></Route>
      </Routes>
    </>
  );
}
export default AdminManager;
