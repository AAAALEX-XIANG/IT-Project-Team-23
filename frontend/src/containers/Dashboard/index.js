import React, {Component} from 'react';
import Navbar from '../../components/Navbar';
import ProfileBox from '../../components/ProfileBox';
import {viewProfile} from '../profileApi';


let userInfo = null;
export default class Dashboard extends Component {
    constructor(props){
        super(props);
        
        this.state = {
            userInfo : null,
            isLoaded: false,
            error: null
        }
    }

    fetchInfo(email) {
        userInfo = viewProfile({email:localStorage.getItem('email')}).then(
            userInfo =>
            this.setState({userInfo: userInfo, isLoaded: true})
            //console.log(userInfo)
        );
        
    }

    


    componentDidMount() {
        if (this.props.isLoggedIn) {
            console.log(this);
            this.fetchInfo(localStorage.getItem('email'));
        }
    }

    componentDidUpdate(prevProps) {
        console.log(prevProps);
        console.log(this.props);
        if (!(this.props.isLoggedIn===prevProps.isLoggedIn)) {
            console.log(this);
            this.fetchInfo(localStorage.getItem('email'));
        }
    }

    render() {
        const {userInfo, isLoaded, error} = this.state;

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
                <div className="pageContainer">
                    <Navbar />
                    <ProfileBox
                        email = {localStorage.getItem('email')}
                        username = {userInfo.res.username}
                        firstname = {userInfo.res.firstname}
                        lastname = {userInfo.res.lastname}
                    />
                </div>
            );
        }
    }
}