import React from "react";

import {
    NavLink,
} from "react-router-dom";


export default function Navbar(){
    const logout = () => {
        // eslint-disable-next-line no-useless-concat
        const actionURL =  `http://localhost:8080/api/cache/clear/${localStorage.getItem('email')}`;
        fetch(actionURL, {
            method: "GET"
        });
        localStorage.clear();
    }
    return (
        <nav className = "navbar">
            <ul>
                <li className = "navOption">
                    <NavLink to="/admin/dashboard" className="current-page" activeClassName="selected"> Home </NavLink>
                </li>
                <li className = "navOption" >
                    <NavLink to="/admin/article" className="current-page" activeClassName="selected"> Artifact </NavLink>
                </li>
                <li className = "navOption" >
                    <NavLink to="/admin/category" className="current-page" activeClassName="selected"> Category </NavLink>
                </li>
                <li className = "navOption" >
                    <NavLink to="/login" onClick={logout} > Logout </NavLink>
                </li>
            </ul>
        </nav>
    );
}