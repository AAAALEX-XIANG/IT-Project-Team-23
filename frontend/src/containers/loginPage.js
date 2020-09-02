import React from 'react';
import LoginForm from '../components/login';
// import Logo from '../resources/logo.jpg';

export default function Loginpage(props) {
    return (
        <div className="pageContainer2">

            <div className="logo"></div>

            {/*<div className="floatLeft">*/}
            {/*    <div className="formDisplay"><img src={}alt= /></div>*/}
            {/*</div>*/}
            <div className="floatRight">

                <div className="loginForm">
                    <LoginForm userStore = {props.userStore}/>
                </div>
            </div>
        </div>
    );
}
