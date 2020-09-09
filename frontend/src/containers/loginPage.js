import React from 'react';
import LoginForm from '../components/login';
//import Navbar from '../components/Navbar';


export default function loginPage(props) {
    return (
        <div className="pageContainer2">
            <br /><br /><br /><br /><br />
            <div className="floatRight">

                <div className="loginForm">
                    <LoginForm userStore = {props.userStore}/>
                </div>
            </div>
        </div>
    );
}
