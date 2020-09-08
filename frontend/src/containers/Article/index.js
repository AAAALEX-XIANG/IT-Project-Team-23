import React, {Component} from 'react';
import Navbar from "../../components/Navbar";

export default class Article extends Component {
    render() {
        return (
            <div className="pageContainer">
                <Navbar />
                <div className="articleContainer">
                    here is some article
                </div>
            </div>
        )
    }
}