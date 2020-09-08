import React from 'react';
import App from './App';
import * as serviceWorker from './serviceWorker';
import ReactDOM from 'react-dom';
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import './index.css';




ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
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