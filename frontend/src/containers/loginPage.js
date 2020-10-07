import React from 'react';
import LoginForm from '../components/login';
//import Navbar from '../components/Navbar';


export default function Loginpage(props) {
    return (
        <div className = "wrap">
            <div className = "container">
                <LoginForm userStore = {props.userStore}/>
            </div>
            <ul>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
            </ul>
        </div>
    );
}