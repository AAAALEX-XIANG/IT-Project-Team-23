import React from 'react';
import LoginForm from '../components/login';

export default function Loginpage(props) {
    return (
        <div className="pageContainer2">
            {/*<div className="floatLeft">*/}
            {/*    <div className="formDisplay"><img src= {internetkid}/></div>*/}
            {/*</div>*/}
            <div className="floatRight">
                <br /><br /><br />
                <div className="loginForm">
                    <LoginForm userStore = {props.userStore}/>
                </div>
            </div>
        </div>
    );
}
