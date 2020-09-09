import React from 'react';
import App from './App';
import store from './store';
import * as serviceWorker from './serviceWorker';
import ReactDOM from 'react-dom';
import {BrowserRouter as Router, Redirect, Route, Switch} from "react-router-dom";

import {Provider} from 'react-redux';

import './index.css';
import {mainRouter} from "./routes";

import Header from "./components/header";


ReactDOM.render(
  <Router>
      <div className="outApp">
          <Header />
          <Switch>
              <Route path="/admin" component={App}/>

              {/* <Route path="/admin" render = {(routerProps) => {
                   return store.getState().user.isLogin ? <App {...routerProps} />:<Redirect to="/login" />
              }}
               /> */}

              {
                  mainRouter.map(route => {
                      return (
                          <Route key={route.pathname} path = {route.pathname} component = {route.component}/>
                      )
                  })
              }

                {/* <Redirect to = "/login" from="/" exact /> */}
                <Redirect to = "/404" />

          </Switch>
     </div>
  </Router>,
document.getElementById('root')
);

serviceWorker.unregister();

// import React from 'react';
// import App from './App';
// import * as serviceWorker from './serviceWorker';
// import ReactDOM from 'react-dom';
// import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
// import './index.css';




// ReactDOM.render(
//     <React.StrictMode>
//         <App />
//     </React.StrictMode>,
//     document.getElementById('root')
// );

// serviceWorker.unregister();