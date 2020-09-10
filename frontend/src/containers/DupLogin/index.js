import React, {Component} from 'react';
import Navbar from "../../components/Navbar";

export default class DupLogin extends Component {
    render() {
        return (
            <div className="pageContainer">
                <Navbar />
                <div>
                    Your have already login, please log out to switch the account.
                </div>
            </div>
        )
    }
}