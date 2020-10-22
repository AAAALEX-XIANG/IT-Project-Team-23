import React from "react";
import { withRouter } from "react-router-dom";
import { login } from "../containers/accountApi";

let clearURL = "https://fate-e-portfolio.herokuapp.com/api/cache/clear/";
class LoginForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      wrongAttempt: false,
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
    const { status, user } = await login({
      email: this.state.email,
      password: this.state.password,
    });

    if (status === 200) {
      this.setState({ wrongAttempt: false });
    
      if (user.result) {
        if (user.reason === "User") {
          this.props.userStore.isLoggedIn = true;
          this.props.userStore.email = this.state.email;
          localStorage.setItem("email", this.state.email);

          const actionURL = clearURL + `${localStorage.getItem("email")}`;
          fetch(actionURL, {
            method: "GET",
          });

          this.props.history.push("/admin/dashboard");
        } else {
          // this user is an administrator
          this.props.userStore.isLoggedIn = true;
          localStorage.setItem("adminEmail", this.state.email);
          this.props.history.push("/adminpage");
        }
        
      } else {
        this.setState({ wrongAttempt: true });
      }
    }
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <h1>Log In</h1>
        <div className="formDisplay">
          <div>
            <input
              placeholder="Email"
              type="text"
              name="email"
              value={this.state.email}
              onChange={this.handleChange}
              required
            />
          </div>
          <div>
            <input
              placeholder="Password"
              type="password"
              name="password"
              value={this.state.password}
              onChange={this.handleChange}
              required
            />
          </div>
          <div className="subTitle">
            Don't have an account? <a href="/register">Register</a>
          </div>
          <br />
          {this.state.wrongAttempt ? (
            <div className="formError">
              Please check your email and password
            </div>
          ) : null}
          <input type="submit" value="Log In" />
        </div>
      </form>
      
    );
  }
}

export default withRouter(LoginForm);
