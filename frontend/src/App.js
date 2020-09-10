import React from 'react';
import './App.css';

//import Navbar from './components/Navbar';

import Header from "./components/header";
import Dashboard from "./containers/Dashboard/index";
import Setting from "./containers/Setting/index";
import Artifact from "./containers/Article/index"
import LoginPage from "./containers/loginPage";
import RegPage from "./containers/regPage";

import { observer } from "mobx-react";

import {
    BrowserRouter as Router,
    Redirect,
    Switch,
    Route
    // Link,
    // useParams
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
                          !(localStorage.getItem('email')===null) ? <Redirect to="/login"/> : <Redirect to="/admin/dashboard"/> 
                      )}
                      />

                      <Route exact path="/login" render={(props) => (
                          !(localStorage.getItem('email')===null) ? <Redirect to="/login"/> : <LoginPage userStore = {this.props.userStore}/>)}
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

                      <Route exact path="/login" render={(props) => (
                          !(localStorage.getItem('email')===null) ?
                          <Dashboard isLoggedIn={this.props.userStore.isLoggedIn} email={this.props.userStore.email} userStore = {this.props.userStore}/>
                          : <Redirect to="/login"/> )}
                      />

                  </Switch>
              </Router>
          </div>
        );
    }
})




export default App;
