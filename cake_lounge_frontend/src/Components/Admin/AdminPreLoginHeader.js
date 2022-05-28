import React, { Component, useState } from "react";
import LOGO from "../../Assets/Demo_LOGO.png";
import customCss from "../Admin/admin.css";

const AdminPreLoginHeader = (props) => {
  if (!props.logged) {
    return (
      <>
        <div className="container-fluid custom_admin_prelogin_header">
          {/* <h1 className="text-white text-center p-3">
            Welcome to <span> Cake Lounge </span> admin Panel
          </h1> */}
          <h1 className="custome_admin_prelogin_header_animation_h1 text-white">
            Welcome to <span>cake lounge</span> Admin Panel
          </h1>
        </div>
      </>
    );
  } else {
    return <></>;
  }
};

export default AdminPreLoginHeader;
