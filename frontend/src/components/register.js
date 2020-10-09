import React from "react";
import { withRouter } from "react-router-dom";
import { register } from "../containers/accountApi";

class RegForm extends React.Component {
    constructor (props) {
        super (props);
        this.state = {
            first_name: "",
            last_name: "",
            email: "",
            studentId: "",
            username: "",
            password: "",
            password_confirm: "",
            result: false,
            success: false,
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

        if (this.state.password.length < 6) {
            alert("Password should not be less than 6 characters");
            return;
        }

        if(this.state.password !== this.state.password_confirm){
            alert("Inconsistent password");
            return;
        }
        // call the API to verify user
        const {status, res} = await register(
            {
                first_name: this.state.first_name,
                last_name: this.state.last_name,
                studentId: this.state.studentId,
                email: this.state.email,
                username: this.state.username,
                password: this.state.password,
                password_confirm: this.state.password_confirm
            });

        
        console.log(status);
        if (res.result) {
            this.setState({success: status===200, res: res})
        } else {
            alert(res.reason);
        }
        
        if(this.state.success) {
            this.props.history.push('/login');
        }
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <h1>Register</h1>
                <div className="subTitle">Already have an account? <a href = "/">Log in</a></div>
                <div className="floatLeft">
                    <label>
                        <input placeholder="First name" type="text" name="first_name" value={this.state.first_name} onChange={this.handleChange} required/>
                    </label>
                    <label>
                        <input placeholder="Last name" type="text" name="last_name" value={this.state.last_name} onChange={this.handleChange} required/>
                    </label>
                    <label>
                        <input placeholder="Student ID" type="text" name="studentId" value={this.state.studentId} onChange={this.handleChange} required/>
                    </label>
                    <label>
                        <input placeholder= "Email" type="email" name="email" value={this.state.email} onChange={this.handleChange} required/>
                    </label>
                </div>
                <div className="floatRight">
                    <label>
                        <input placeholder="Username" type="text" name="username" value={this.state.username} onChange={this.handleChange} required/>
                    </label>
                    <label>
                        <input placeholder="Password" type="password" name="password" value={this.state.password} onChange={this.handleChange} required/>
                    </label>
                    <label>
                        <input placeholder="Confirm your password" type="password" name="password_confirm" value={this.state.password_confirm} onChange={this.handleChange} required/>
                    </label>
                
                    {!this.state.success &&
                    <div className="formError">
                        {this.state.res}
                    </div>
                    }
                    <input type="submit" value="Register"/>
                </div>
            </form>
        );
    }
}

export default withRouter(RegForm);
