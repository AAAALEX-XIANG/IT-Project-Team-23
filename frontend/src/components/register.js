import React from "react";
import { withRouter } from "react-router-dom";
import { register } from "../containers/api";

class RegForm extends React.Component {
    constructor (props) {
        super (props);
        this.state = {
            first_name: "",
            last_name: "",
            email: "",
            username: "",
            password: "",
            password_confirm: "",
            success: true,
            res: ""
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
        if(this.state.password !== this.state.password_confirm){
            alert("Inconsistent password");
            return;
        }
        const {status, res} = await register(
            {
                first_name: this.state.first_name,
                last_name: this.state.last_name,
                email: this.state.email,
                username: this.state.username,
                password: this.state.password,
                // is_teacher: this.state.is_teacher
            });
        alert(res.reason);
        console.log(status);
        console.log(res);
        this.setState({success: status===200, res: res})
        if(this.state.success) {
            this.props.history.push('/home');
        }

    }

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <div className="titleHeader">Register</div>
                <div className="subTitle">Already have an account? <a href = "/">Log in</a></div>
                <label>
                    <div className="subTitle2">First name</div>
                    <input type="text" name="first_name" value={this.state.first_name} onChange={this.handleChange} required/>
                </label>
                <br />
                <label>
                    <div className="subTitle2">Last name</div>
                    <input type="text" name="last_name" value={this.state.last_name} onChange={this.handleChange} required/>
                </label>
                <br />
                <label>
                    <div className="subTitle2">Email</div>
                    <input type="email" name="email" value={this.state.email} onChange={this.handleChange} required/>
                </label>
                <br />
                <label>
                    <div className="subTitle2">Username</div>
                    <input type="text" name="username" value={this.state.username} onChange={this.handleChange} required/>
                </label>
                <br />
                <label>
                    <div className="subTitle2">Password</div>
                    <input type="password" name="password" value={this.state.password} onChange={this.handleChange} required/>
                </label>
                <br />
                <label>
                    <div className="subTitle2">Confirm your password</div>
                    <input type="password" name="password_confirm" value={this.state.password_confirm} onChange={this.handleChange} required/>
                </label>
                <br /><br />
                {/*<label>*/}
                {/*    <div className="subTitle">Are you a Teacher?</div>*/}
                {/*</label>*/}
                {/*<br />*/}
                {/*<input type="radio" name="is_teacher" value="false" onChange={this.handleChange} required /><label>No</label>*/}
                {/*<input type="radio" name="is_teacher" value="true" onChange={this.handleChange} required /><label>Yes</label><br />*/}
                {/*<br />*/}
                {!this.state.success &&
                <div className="formError">
                    {this.state.res}
                </div>
                }
                <input type="submit" value="Register" />
            </form>
        );
    }
}

export default withRouter(RegForm);
