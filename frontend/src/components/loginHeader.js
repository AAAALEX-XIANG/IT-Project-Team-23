import React from "react";
import logo from "../asserts/empty.png";

export default function loginHeader() {
  return (
    <header className="mainHeader">
      <div className="headerContainer">
        <div className="logoContainer">
          <img src={logo} className="logo" alt="logo" />
        </div>
        <div className="messageContainer">Welcome to Fate e-portfolio</div>
      </div>
    </header>
  );
}
