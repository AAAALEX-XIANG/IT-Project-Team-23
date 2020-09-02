import React from 'react';
//import logo from './logo.svg';
import './App.css';
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

  // constructor(props){
  //   super(props);
  // }

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

              {/*<Route exact path="/friends" render={(props) => (*/}
              {/*    !(localStorage.getItem('username')===null) ?*/}
              {/*        <Friends isLoggedIn={this.props.userStore.isLoggedIn} username={this.props.userStore.username} userStore = {this.props.userStore}/>*/}
              {/*        : <Redirect to="/login"/> )}*/}
              {/*/>*/}

              {/*<Route exact path="/home"> /!*redirect to Student or teacher home*!/*/}
              {/*  <StudentHome isLoggedIn={this.props.userStore.isLoggedIn} username={this.props.userStore.username} />*/}
              {/*</Route>*/}

              {/*<Route exact path="/login" render={(props) => (*/}
              {/*    !(localStorage.getItem('username')===null) ? <Redirect to="/"/> : <LoginPage userStore = {this.props.userStore}/>)}*/}
              {/*/>*/}

              {/*<Route exact path="/teacher-activities">*/}
              {/*  <Activities />*/}
              {/*</Route>*/}

              {/*<Route exact path="/activities/your-turn">*/}
              {/*  <ActivitiesStudent tab={"YOURTURN"} isLoggedIn={this.props.userStore.isLoggedIn} username={this.props.userStore.username}/>*/}
              {/*</Route>*/}

              {/*<Route exact path="/activities/their-turn">*/}
              {/*  <ActivitiesStudent tab={"THEIRTURN"} isLoggedIn={this.props.userStore.isLoggedIn} username={this.props.userStore.username}/>*/}
              {/*</Route>*/}

              {/*<Route exact path="/activities/past">*/}
              {/*  <ActivitiesStudent tab={"PASTACTIVITIES"} isLoggedIn={this.props.userStore.isLoggedIn} username={this.props.userStore.username} />*/}
              {/*</Route>*/}

              {/*<Route exact path="/profile">*/}
              {/*  <TeacherHome />*/}
              {/*</Route>*/}
            </Switch>
          </Router>
        </div>
    );
  }
})


export default App;

//
// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }
//
// export default App;
