import React from "react";
import "./App.css";

import Header from "./components/header";
import Dashboard from "./containers/Dashboard/index";
import Setting from "./containers/Setting/index";
import Artifact from "./containers/Article/index";
import LoginPage from "./containers/loginPage";
import RegPage from "./containers/regPage";
import DupLogin from "./containers/DupLogin";
import AdminPage from "./containers/AdminPage";
import GuestDashboard from "./containers/GuestDashBoard";
import GuestCate from "./containers/GuestCate";

import { observer } from "mobx-react";

import {
  BrowserRouter as Router,
  Redirect,
  Switch,
  Route,
} from "react-router-dom";

const App = observer(
  class App extends React.Component {
    componentDidMount() {
      let storedUsername = localStorage.getItem("email");
      if (storedUsername != null) {
        console.log(storedUsername);
        this.props.userStore.email = storedUsername;
        this.props.userStore.isLoggedIn = true;
      }
    }

    //TODO: page not found
    render() {
      return (
        <div className="App">
          <Header />
          <Router>

            <Switch>
              <Route
                exact
                path="/"
                render={(props) =>
                  !(localStorage.getItem("email") === null) ? (
                    <Redirect to="/admin/dashboard" />
                  ) : !(localStorage.getItem("adminEmail") === null) ? (
                    <Redirect to="/adminpage"/>
                  ) : (
                    <Redirect to="/login" />
                  )
                }
              />

              <Route
                exact
                path="/login"
                render={(props) =>
                  !(localStorage.getItem("email") === null) ? (
                    <Redirect to="/duplogin" />
                  ) : (
                    <LoginPage userStore={this.props.userStore} />
                  )
                }
              />

              <Route
                exact
                path="/register"
                render={(props) =>
                  !(localStorage.getItem("email") === null) ? (
                    <Redirect to="/login" />
                  ) : (
                    <RegPage userStore={this.props.userStore} />
                  )
                }
              />

              <Route
                exact
                path="/adminpage"
                render={(props) =>
                  !(localStorage.getItem("adminEmail") === null) ? (
                    <AdminPage
                      isLoggedIn={this.props.userStore.isLoggedIn}
                      adminEmail={this.props.userStore.email}
                      userStore={this.props.userStore}
                    />
                  ) : !(localStorage.getItem("email") === null) ? (
                    <Redirect to="/admin/dashboard"/>
                  ) : (
                    <Redirect to="/login" />
                  )
                }
              />

              <Route
                exact
                path="/admin"
                render={(props) => <Redirect to="/admin/dashboard" />}
              />

              <Route
                exact
                path="/admin/dashboard"
                render={(props) =>
                  !(localStorage.getItem("email") === null) ? (
                    <Dashboard
                      isLoggedIn={this.props.userStore.isLoggedIn}
                      email={this.props.userStore.email}
                      userStore={this.props.userStore}
                    />
                  ) : !(localStorage.getItem("adminEmail") === null) ? (
                    <Redirect to = "/adminpage" />
                  ) : (
                    <Redirect to="/login" />
                  )
                }
              />

              <Route
                exact
                path="/admin/category"
                render={(props) =>
                  !(localStorage.getItem("email") === null) ? (
                    <Setting
                      isLoggedIn={this.props.userStore.isLoggedIn}
                      email={this.props.userStore.email}
                      userStore={this.props.userStore}
                    />
                  ): !(localStorage.getItem("adminEmail") === null) ? (
                    <Redirect to = "/adminpage" />
                  ) : (
                    <Redirect to="/login" />
                  )
                }
              />

              <Route
                exact
                path="/admin/article"
                render={(props) =>
                  !(localStorage.getItem("email") === null) ? (
                    <Artifact
                      isLoggedIn={this.props.userStore.isLoggedIn}
                      email={this.props.userStore.email}
                      userStore={this.props.userStore}
                    />
                  ) : !(localStorage.getItem("adminEmail") === null) ? (
                    <Redirect to = "/adminpage" />
                  ) : (
                    <Redirect to="/login" />
                  )
                }
              />

              <Route
                exact
                path="/duplogin"
                render={(props) =>
                  !(localStorage.getItem("email") === null) ? (
                    <DupLogin
                      isLoggedIn={this.props.userStore.isLoggedIn}
                      email={this.props.userStore.email}
                      userStore={this.props.userStore}
                    />
                  ) : (
                    <Redirect to="/admin" />
                  )
                }
              />

              <Route
                path="/guest/dashboard/:link"
                render={(props) => <GuestDashboard />}
              />

              <Route
                path="/guest/category/:link"
                render={(props) => <GuestCate />}
              />

              <Redirect to="/404" />
            </Switch>
          </Router>
        </div>
      );
    }
  }
);

export default App;
