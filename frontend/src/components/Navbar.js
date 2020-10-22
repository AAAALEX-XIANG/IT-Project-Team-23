import React from "react";

import { NavLink } from "react-router-dom";

import {
  HomeOutlined,
  UploadOutlined,
  MenuOutlined,
  PoweroffOutlined,
} from "@ant-design/icons";

let clearURL = "https://fate-e-portfolio.herokuapp.com/api/cache/clear/";
export default function Navbar() {
  const logout = () => {
    if (
      window.confirm(
        "Are you sure to log out?"
      )){
      const actionURL = clearURL + `${localStorage.getItem("email")}`;
      fetch(actionURL, {
        method: "GET",
      });
      localStorage.clear();
      window.location.replace("/login");
    }
  };
  return (
    <nav className="navbar">
      <h2>&nbsp;&nbsp;&nbsp;&nbsp;</h2>
      <h2>&nbsp;&nbsp;&nbsp;&nbsp;</h2>
      <ul>
          <li className="navOption">
            <NavLink
              to="/admin/dashboard"
              className="current-page"
              activeClassName="selected"
            >
              <HomeOutlined /> Home{" "}
            </NavLink>
          </li>
          <li className="navOption">
            <NavLink
              to="/admin/article"
              className="current-page"
              activeClassName="selected"
            >
              <UploadOutlined /> Artifact{" "}
            </NavLink>
          </li>
          <li className="navOption">
            <NavLink
              to="/admin/category"
              className="current-page"
              activeClassName="selected"
            >
              <MenuOutlined /> Category{" "}
            </NavLink>
          </li>
          <li className="navOption">
            <NavLink to= "#"  onClick={logout}>
              <PoweroffOutlined /> Logout{" "}
            </NavLink>
          </li>
        </ul>
    </nav>
  );
}
