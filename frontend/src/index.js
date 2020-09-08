import React from 'react';
import App from './App';
import * as serviceWorker from './serviceWorker';
import ReactDOM from 'react-dom';
import {BrowserRouter as Router, Redirect, Route, Switch} from "react-router-dom";
import './index.css';
import {mainRouter} from "./routes";


ReactDOM.render(
  <Router>
      <Switch>
          <Route path="/admin" render = {(routerProps) => {
              return (
                  <App {...routerProps} />
              )
          }} />

          {
              mainRouter.map(route => {
                  return (
                      <Route key={route.pathname} path = {route.pathname} component = {route.component}/>
                  )
              })
          }

          <Redirect to = "/admin" from="/" exact />
          <Redirect to = "/404" />

      </Switch>
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
//
//
//
//
// ReactDOM.render(
//     <React.StrictMode>
//         <App />
//     </React.StrictMode>,
//     document.getElementById('root')
// );
//
// serviceWorker.unregister();