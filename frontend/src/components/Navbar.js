import React from "react";

import {
    NavLink,
} from "react-router-dom";

// import {
//     Link,
// } from "react-router-dom";

export default function Navbar(){
    const logout = () => {
        // localStorage.setItem("username",null);
        localStorage.clear();
    }
    return (
        <nav className = "navbar">
            <ul>
                <li className = "navOption">
                    <NavLink to="/home" className="current-page" activeClassName="selected"> Home </NavLink>
                </li>
                <li className = "navOption">
                    {/*TODO: change to /dashboard once login works*/}
                    {/* TODO: Active link styling*/}
                    {/* <a href="/test/friends" className="current-page"> Friends </a> */}
                    <NavLink to="/dashboard" className="current-page" activeClassName="selected"> Friends </NavLink>
                </li>
                <li className = "navOption" >
                    <NavLink to="/activities/your-turn" className="current-page" activeClassName="selected"> Activities </NavLink>
                </li>
                <li className = "navOption" >
                    <NavLink to="/" onClick={logout} > Logout </NavLink>
                </li>
            </ul>
        </nav>
    );
}