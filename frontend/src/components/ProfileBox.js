import React from "react";
import Default from "../asserts/defaul.jpg";
import { Button } from 'antd';
import { Redirect } from "react-router-dom";

export default function ProfileBox(props) {
    return (

        <div className="grid-container">
            <div className="leftCol">
                <div className="avatarBox"> 
                    <img src={Default} className="avatar" alt="Loading" />
                </div>
                
                <div className="buttonBox"> 
                    <Button block>Edit Profile</Button>
                    <br /><br />
                    <Button block>Upload File</Button>
                </div>
            </div>
            <div className="rightCol">
                <div className="profileHeadings">My Account</div>

                <div className="profileInfo">Email: {props.email}</div>
                
                <div className="profileInfo">Username: {props.username}</div>

                <div className="profileInfo">First name: {props.firstname}</div>

                <div className="profileInfo">Last name: {props.lastname}</div>
            </div>
        </div>
    );
}
