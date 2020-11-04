import React from "react";

import { NavLink } from "react-router-dom";
import {
  HomeOutlined,
  MenuOutlined
} from "@ant-design/icons";

//let clearURL = 'https://fate-e-portfolio.herokuapp.com/api/cache/clear/';
let currentLink = window.location.pathname.split("/").pop();
let cateLink = "/guest/category/";
let profileLink = "/guest/dashboard/";

export default function GuestNavbar() {
  return (
    <nav className="navbar">
      <h2>&nbsp;&nbsp;&nbsp;&nbsp;</h2>
      <h2>&nbsp;&nbsp;&nbsp;&nbsp;</h2>
      <ul>
        <li className="navOption">
          <NavLink
            to={profileLink + currentLink}
            className="current-page"
            activeClassName="selected"
          >
          <HomeOutlined />
            Home{" "}
          </NavLink>
        </li>
        <li className="navOption">
          <NavLink
            to={cateLink + currentLink}
            className="current-page"
            activeClassName="selected"
          >
          <MenuOutlined />
            Category{" "}
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}
