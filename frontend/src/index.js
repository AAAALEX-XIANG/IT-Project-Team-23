import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import userStore from './userData.js';

ReactDOM.render(
  <React.Fragment>  
    <App userStore = {userStore}/>
  </React.Fragment>,
  document.getElementById('root')
);

serviceWorker.unregister();
