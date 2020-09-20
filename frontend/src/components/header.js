import React from "react";
import logo from '../asserts/empty.png';


export default function header() {
    return (
        <header className = "mainHeader">
            {/* <div className="welcomeMsg"> */}
                <img src={logo} className="logo" alt="logo" />
                <p1 >Welcome to Fate e-portfolio</p1>
            {/* </div> */}
            
            <div className="userMsg">Hello, {localStorage.getItem('email')}  !</div>
        </header>
    );
}