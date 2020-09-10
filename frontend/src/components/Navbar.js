import React from "react";

import {
    NavLink,
} from "react-router-dom";


export default function Navbar(){
    const logout = () => {
        // localStorage.setItem("username",null);
        localStorage.clear();
    }
    return (
        <nav className = "navbar">
            <ul>
                <li className = "navOption">
                    <NavLink to="/admin/dashboard" className="current-page" activeClassName="selected"> Home </NavLink>
                </li>
                <li className = "navOption" >
                    <NavLink to="/admin/article" className="current-page" activeClassName="selected"> Article </NavLink>
                </li>
                <li className = "navOption" >
                    <NavLink to="/admin/setting" className="current-page" activeClassName="selected"> Setting </NavLink>
                </li>
                <li className = "navOption" >
                    <NavLink to="/login" onClick={logout} > Logout </NavLink>
                </li>
            </ul>
        </nav>
    );
}