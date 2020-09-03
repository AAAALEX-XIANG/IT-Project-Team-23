import React, { useState } from "react";
import logo from '../asserts/empty.png';

export default function header() {
    return (
        <header className = "mainHeader">
            <img src={logo} className="logo" alt="logo" />
            Welcome Fate e-portfolio
        </header>
    );
}