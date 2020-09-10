import React from "react";
import editButton from '../asserts/editbutton.png';

export default function ProfileBox(props) {
    return (
        <div className="profileContainer">
            <div className="profileBox">
                <div id="rows">
                    <div className="rightLinks"><img src= {editButton} alt="no" className="buttonIcon"/></div>
                </div>
                <div id="rows">
                    <div className="profileHeadings">About you...</div>
                </div>

                <div className="profileContent">
                    <div className="profileInfo">Full name: {props.fullName}</div>

                    <div className="profileInfo">Username: {props.pUsername}</div>
                </div>

                <div id="rows">
                    <div className="profileHeadings">Your class...</div>
                </div>

                <div className="profileContent">

                    <div className="profileInfo">Class:</div>

                    <div className="profileInfo">Teacher:</div>

                    <div id="rows">
                        <div className="rightLinks">
                            <a href="/classroom">
                                <p className="regularLinks">To your friends</p>
                            </a>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
}
