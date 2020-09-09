import React, {Component} from 'react';
import Navbar from '../../components/Navbar';
import WelcomeHeader from '../../components/WelcomeHeader'
import ProfileBox from '../../components/ProfileBox'

import { getUserInfo } from "../accountApi";

export default class Dashboard extends Component {
    constructor(props){
        super(props);

        this.state = {
            userInfo : null,
            //userClass: null,
            isLoaded: false,
            error: null
        }
    }

    async fetchInfo(username) {
        const {userInfo, error} = await getUserInfo(username);
        this.setState({userInfo: userInfo, isLoaded: true, error: error});
        console.log(userInfo);
    }

    componentDidMount() {
        if (this.props.isLoggedIn) {
            console.log(this);
            this.fetchInfo(this.props.username);
        }
    }

    componentDidUpdate(prevProps) {
        console.log(prevProps);
        console.log(this.props);
        if (!(this.props.isLoggedIn===prevProps.isLoggedIn)) {
            console.log(this);
            this.fetchInfo(this.props.username);
        }
    }

    render() {
        const {userInfo, /**userClass,**/ isLoaded, error} = this.state;
        if (error) { //couldn't fetch data from server
            return(
                <div className="pageContainer">
                    <Navbar />
                    <div className="friendContainer">
                        <p className = "message">Something went wrong. Error: {error.message}</p>;
                    </div>
                </div>
            );
        } else if (!isLoaded) { //loading screen
            return(
                <div className="pageContainer">
                    <Navbar />
                    <div className="friendContainer">
                        <p className = "message">Loading your info...</p>
                    </div>
                </div>
            );
        } else {
            return(
                <div id="container">
                    <div id="center" className="column">
                        <div id="rows">
                            <WelcomeHeader welName = {userInfo[0].first_name} />
                        </div>
                        <div id="rows">
                            <ProfileBox
                                fullName = {userInfo[0].first_name + " " + userInfo[0].last_name}
                                pUsername = {userInfo[0].username}
                            />
                        </div>
                    </div>
                    <div id="left" className="column">
                        <div id="navContainer">
                            <Navbar />
                        </div>
                    </div>
                    <div id="right" className="column">
                    </div>
                </div>
            );
        }
    }
}