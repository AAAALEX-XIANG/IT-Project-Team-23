import React from 'react';
import './App.css';

import Header from "./components/header";
import LoginPage from "./containers/loginPage";
import RegPage from "./containers/regPage";
import { observer } from "mobx-react";
import Home from "./containers/Home";

import {mainRouter,adminRouter} from "./routes";

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

    let storedUsername = localStorage.getItem("username");
    let storedUser = localStorage.getItem("user");
    if (storedUsername != null && storedUser!=null){
      console.log(storedUsername);
      storedUser = JSON.parse(storedUser);
      this.props.userStore.username = storedUsername;
      this.props.userStore.isLoggedIn = true;
      this.props.userStore.user = storedUser;
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
                  !(localStorage.getItem('username')===null) ? <Redirect to="/"/> : <Redirect to="/login"/>
              )}
              />

              <Route exact path="/login" render={(props) => (
                  !(localStorage.getItem('username')===null) ? <Redirect to="/"/> : <LoginPage userStore = {this.props.userStore}/>)}
              />

              <Route exact path="/register" render={(props) => (
                  !(localStorage.getItem('username')===null) ? <Redirect to="/"/> : <RegPage userStore = {this.props.userStore}/>)}
              />

              <Route exact path="/admin" render={(props) => (
                  !(localStorage.getItem('username')===null) ?
                      <Home isLoggedIn={this.props.userStore.isLoggedIn} username={this.props.userStore.username} userStore = {this.props.userStore}/>
                      : <Redirect to="/login"/> )}
              />

              {
                mainRouter.map(route => {
                  return <Route key={route.pathname} path = {route.pathname} component = {route.component}/>
                })
              }
              {
                adminRouter.map(route =>{
                  return <Route path={route.pathname} render={(routerProps) =>{
                    return <route.component {...routerProps} />
                  }} />
                })
              }
              <Redirect to = "/admin" from="/" exact />
              <Redirect to = "/404" />


            </Switch>
          </Router>
        </div>
    );
  }
})


export default App;

// import React from 'react';
// import './App.css';
//
// import Header from "./components/header";
// import LoginPage from "./containers/loginPage";
// import RegPage from "./containers/regPage";
// import { observer } from "mobx-react";
// import Home from "./containers/Home";
//
// import {mainRouter,adminRouter} from "./routes";
//
// import {
//   BrowserRouter as Router,
//   Redirect,
//   Switch,
//   Route
//   // Link,
//   // useParams
// } from "react-router-dom";
//
//
// const App = observer(class App extends React.Component {
//   componentDidMount() {
//
//     let storedUsername = localStorage.getItem("username");
//     let storedUser = localStorage.getItem("user");
//     if (storedUsername != null && storedUser!=null){
//       console.log(storedUsername);
//       storedUser = JSON.parse(storedUser);
//       this.props.userStore.username = storedUsername;
//       this.props.userStore.isLoggedIn = true;
//       this.props.userStore.user = storedUser;
//     }
//   }
//
//   //TODO: page not found
//   render() {
//     return (
//         <div className="App">
//           <Header />
//           <Router>
//             <Switch>
//               <Route exact path="/" render={(props) => (
//                   !(localStorage.getItem('username')===null) ? <Redirect to="/"/> : <Redirect to="/login"/>
//               )}
//               />
//
//               <Route exact path="/login" render={(props) => (
//                   !(localStorage.getItem('username')===null) ? <Redirect to="/"/> : <LoginPage userStore = {this.props.userStore}/>)}
//               />
//
//               <Route exact path="/register" render={(props) => (
//                   !(localStorage.getItem('username')===null) ? <Redirect to="/"/> : <RegPage userStore = {this.props.userStore}/>)}
//               />
//
//               <Route exact path="/admin" render={(props) => (
//                   !(localStorage.getItem('username')===null) ?
//                       <Home isLoggedIn={this.props.userStore.isLoggedIn} username={this.props.userStore.username} userStore = {this.props.userStore}/>
//                       : <Redirect to="/login"/> )}
//               />
//
//               {
//                 mainRouter.map(route => {
//                   return <Route key={route.pathname} path = {route.pathname} component = {route.component}/>
//                 })
//               }
//               {
//                 adminRouter.map(route =>{
//                   return <Route path={route.pathname} render={(routerProps) =>{
//                     return <route.component {...routerProps} />
//                   }} />
//                 })
//               }
//               <Redirect to = "/admin" from="/" exact />
//               <Redirect to = "/404" />
//
//
//             </Switch>
//           </Router>
//         </div>
//     );
//   }
// })
//
//
// export default App;
