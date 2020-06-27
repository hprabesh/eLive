import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
//import { BrowserRouter } from "react-router-dom";
//import './components/headNavBar.css';
import Toolbar from './components/Toolbar/Toolbar';
import Content from './components/contents/content';
// import App from './App';
import * as serviceWorker from './serviceWorker';


ReactDOM.render(
  <React.Fragment>
      <Toolbar/>
      <Content/>
      {/* <App/> */}
  </React.Fragment>,
  document.getElementById('root')
);


// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.register();
