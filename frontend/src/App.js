import React from 'react';
import './App.css';

//import Navbar from './components/Navbar';

import Header from "./components/header";
import Dashboard from "./containers/Dashboard/index";
import Setting from "./containers/Setting/index";
import Artifact from "./containers/Article/index"
import LoginPage from "./containers/loginPage";
import RegPage from "./containers/regPage";
import DupLogin from "./containers/DupLogin";

import { observer } from "mobx-react";

import {
    BrowserRouter as Router,
    Redirect,
    Switch,
    Route
} from "react-router-dom";

const App = observer(class App extends React.Component {

    componentDidMount() {

        let storedUsername = localStorage.getItem("email");
        //let storedUser = localStorage.getItem("user");
        if (storedUsername != null){
            console.log(storedUsername);
            //storedUser = JSON.parse(storedUser);
            this.props.userStore.email = storedUsername; //TODO: REPLACE W JWT
            this.props.userStore.isLoggedIn = true;
            //this.props.userStore.user = storedUser;
        }
    }

    //TODO: page not found
    render() {
        return (
          <div className="App">
              <Header />
              <Router>
                  <Switch>
                      <Route exact path="/" render={(props) => (
                          !(localStorage.getItem('email')===null) ? <Redirect to="/admin/dashboard"/> : <Redirect to="/login"/>

                      )}
                      />

                      <Route exact path="/login" render={(props) => (

                          !(localStorage.getItem('email')===null) ? <Redirect to="/duplogin"/> : <LoginPage userStore = {this.props.userStore}/>)}

                      />

                      <Route exact path="/register" render={(props) => (
                          !(localStorage.getItem('email')===null) ? <Redirect to="/login"/> : <RegPage userStore = {this.props.userStore}/>)}
                      />

                      <Route exact path="/admin" render={(props) => (
                          <Redirect to="/admin/dashboard"/> )}
                      />

                      <Route exact path="/admin/dashboard" render={(props) => (
                          !(localStorage.getItem('email')===null) ?
                          <Dashboard isLoggedIn={this.props.userStore.isLoggedIn} email={this.props.userStore.email} userStore = {this.props.userStore}/>
                          : <Redirect to="/login"/> )}
                      />

                      <Route exact path="/admin/setting" render={(props) => (
                          !(localStorage.getItem('email')===null) ?
                          <Setting isLoggedIn={this.props.userStore.isLoggedIn} email={this.props.userStore.email} userStore = {this.props.userStore}/>
                          : <Redirect to="/login"/> )}
                      />

                      <Route exact path="/admin/article" render={(props) => (
                          !(localStorage.getItem('email')===null) ?
                          <Artifact isLoggedIn={this.props.userStore.isLoggedIn} email={this.props.userStore.email} userStore = {this.props.userStore}/>
                          : <Redirect to="/login"/> )}
                      />

                      <Route exact path="/duplogin" render={(props) => (
                          !(localStorage.getItem('email')===null) ?
                          <DupLogin isLoggedIn={this.props.userStore.isLoggedIn} email={this.props.userStore.email} userStore = {this.props.userStore}/>
                          :<Redirect to="/admin"/> )}
                      />

                    <Redirect to = "/404" />
                  </Switch>
              </Router>
          </div>
        );
    }
})




export default App;
