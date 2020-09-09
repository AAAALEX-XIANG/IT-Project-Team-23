import React from "react";
import logo from '../asserts/empty.png';

export default function header() {
    return (
        <header className = "mainHeader">
            <img src={logo} className="logo" alt="logo" />
            Welcome to Fate e-portfolio
        </header>
    );
}