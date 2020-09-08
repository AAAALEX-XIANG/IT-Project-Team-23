import React, {Component} from 'react';
import Navbar from "../../components/Navbar";

export default class Setting extends Component {
    render() {
        return (
            <div className="pageContainer">
                <Navbar />
                <div className="settingContainer">
                    here is setting page
                </div>
            </div>
        )
    }
}