import React from "react";

import { NavLink } from "react-router-dom";

//let clearURL = 'https://fate-server.herokuapp.com/api/cache/clear/';
let currentLink = window.location.pathname.split("/").pop();
let cateLink = "/guest/category/";
let profileLink = "/guest/dashboard/";

export default function GuestNavbar() {
  return (
    <nav className="navbar">
      <ul>
        <li className="navOption">
          <NavLink
            to={profileLink + currentLink}
            className="current-page"
            activeClassName="selected"
          >
            {" "}
            Home{" "}
          </NavLink>
        </li>
        <li className="navOption">
          <NavLink
            to={cateLink + currentLink}
            className="current-page"
            activeClassName="selected"
          >
            {" "}
            Category{" "}
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}
