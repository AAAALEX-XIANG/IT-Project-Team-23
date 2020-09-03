import React from "react";
import { withRouter } from "react-router-dom";
import { login } from "../containers/api";

class LoginForm extends React.Component {
    constructor (props) {
        super (props);
        this.state = {
            username:"",
            password:"",
            wrongAttempt: false
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;

        this.setState({
            [name]: value,
        });
    }

    async handleSubmit(event) {
        event.preventDefault();

        // call the API to verify user
        const {status, user} = await login({username: this.state.username, password: this.state.password});

        if(status===200) {
            this.setState({wrongAttempt: false});
            //change the app user state
            if(user.result === true){
                alert("Correct account");
            }
            else{
                this.setState({wrongAttempt: true});
            }
        }
        else{
            alert("Request Fail");
        }
        console.log(this.state.success);
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <div className="titleHeader">Log In</div>
                <br /><br />
                <div className="formDisplay">
                    <label>
                        <div className="subTitle2">Username</div>
                        <input type="text" name="username" value={this.state.username} onChange={this.handleChange} required/>
                    </label>
                    <br /><br />
                    <label>
                        <div className="subTitle2">Password</div>
                        <input type="password" name="password" value={this.state.password} onChange={this.handleChange} required/>
                    </label>
                    <br /><br />
                    <div className="subTitle">Don't have an account? <a href="/register">Register</a></div>
                    <div className="subTitle">Forgot your password? </div>
                    <br /><br />
                    {this.state.wrongAttempt ?
                        <div className="formError">
                            Please check your username and password
                        </div> : null
                    }
                    <input type="submit" value="Log In" />
                </div>
            </form>
        );
    }
}

export default withRouter(LoginForm);
