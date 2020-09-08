import React from "react";
import pfpexample from '../asserts/pfpexample.jpg';

export default function WelcomeHeader(props) {
    return (
        <div className="welcomeHead">
            {/* TODO: temp placeholder image */}
            <div className="profileThumbnail"><img src= {pfpexample} alt="error" className="profilePhoto"/></div>
            <div className="welcomeMsg">Hello, {props.welName}!</div>
        </div>
    );
}
