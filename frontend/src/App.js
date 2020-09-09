// import React from 'react';
// import './App.css';

// import Header from "./components/header";

// import LoginPage from "./containers/loginPage";
// import RegPage from "./containers/regPage";
// import Dashboard from "./containers/loginPage";
// import ArticleList from "./containers/Article/edit";
// import ArticleEdit from "./containers/Article";
// import Setting from "./containers/Setting";



// import { observer } from "mobx-react";

// import {
//     BrowserRouter as Router,
//     Redirect,
//     Switch,
//     Route,
// } from "react-router-dom";
// import { NotFound } from './containers';

// const App = observer(class App extends React.Component {

//     constructor(props){
//         super(props);
//     }

//     componentDidMount() {

//         let storedUsername = localStorage.getItem("username");
//         let storedUser = localStorage.getItem("user");
//         if (storedUsername != null && storedUser!=null){
//             console.log(storedUsername);
//             storedUser = JSON.parse(storedUser);
//             this.props.userStore.username = storedUsername; //TODO: REPLACE W JWT
//             this.props.userStore.isLoggedIn = true;
//             this.props.userStore.user = storedUser;
//         }
//     }

//     //TODO: page not found
//     render() {
//         return (
//           <div className="App">
//               <Header />
//               <Router>
//                   <Switch>

//                       <Route exact path="/login" render={(props) => (
//                           !(localStorage.getItem('username')===null) ? <Redirect to="/"/> : <LoginPage userStore = {this.props.userStore}/>)}
//                       />

//                       <Route exact path="/register" render={(props) => (
//                           !(localStorage.getItem('username')===null) ? <Redirect to="/"/> : <RegPage userStore = {this.props.userStore}/>)}
//                       />

//                       <Route exact path="/404" render={(props) => (
//                           <NotFound />)}
//                       />

//                       <Route exact path="/admin/dashboard" render={(props) => (
//                           !(localStorage.getItem('username')===null) ?
//                           <Dashboard isLoggedIn={this.props.userStore.isLoggedIn} username={this.props.userStore.username} userStore = {this.props.userStore}/>
//                           : <Redirect to="/login"/> )}
//                       />

// <                     Route exact path="/admin/article" render={(props) => (
//                           !(localStorage.getItem('username')===null) ?
//                           <ArticleList isLoggedIn={this.props.userStore.isLoggedIn} username={this.props.userStore.username} userStore = {this.props.userStore}/>
//                           : <Redirect to="/login"/> )}
//                       />

//                       <Route exact path="/admin/setting" render={(props) => (
//                           !(localStorage.getItem('username')===null) ?
//                           <Setting isLoggedIn={this.props.userStore.isLoggedIn} username={this.props.userStore.username} userStore = {this.props.userStore}/>
//                           : <Redirect to="/login"/> )}
//                       />
//                       <Redirect to = "/admin" from="/" exact />
//                       <Redirect to = "/404" />
//                   </Switch>
//               </Router>
//           </div>
//         );
//     }
// })


// export default App;
import React, {Component} from 'react';
import {Route, Switch, Redirect} from "react-router-dom";
import {connect} from 'react-redux';
import {adminRouter} from "./routes";
import './App.css';



const mapState = state => ({
  isLogin: state.user.isLogin
})

connect(mapState)

class App extends Component{
  componentDidMount() {
    
    let storedUsername = localStorage.getItem("username");
    let storedUser = localStorage.getItem("user");
    if (storedUsername != null && storedUser!=null){
        console.log(storedUsername);
        storedUser = JSON.parse(storedUser);
        this.props.userStore.username = storedUsername; //TODO: REPLACE W JWT
        this.props.userStore.isLoggedIn = true;
        this.props.userStore.user = storedUser;
    }
}
    render() {
      return (
        <Switch>
          {
            adminRouter.map(route =>{
              return (
                <Route
                    key={route.pathname}
                    path={route.pathname}
                    exact={route.exact}
                    render={(routerProps) =>{
                        return <Route path={route.pathname} render={(routerProps) =>{
                            
                            return <route.component {...routerProps} />
                        }} />
                    }}
                />
              )
            })
          }
          <Redirect to={adminRouter[0].pathname} from='/admin' exact /> 
        </Switch>
        // ,
        
        // <Redirect to="/login" />
      );
    }
}

// export default connect(mapState)(App);
export default App;
