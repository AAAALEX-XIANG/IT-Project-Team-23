import React from 'react';
import LoginForm from '../components/login';
//import Navbar from '../components/Navbar';


export default function Loginpage(props) {
    return (
        <div className="pageContainer2">
            <br /><br /><br /><br /><br />
            {/*<div className="logo"/>*/}

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
