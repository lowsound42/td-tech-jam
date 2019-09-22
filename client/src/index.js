import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { BrowserRouter as Router, Route, Link, Switch} from "react-router-dom";
import * as serviceWorker from './serviceWorker';
import Dashboard from './components/Dashboard';
import Kiosk from './components/Kiosk';
import KioskLogin from './components/KioskLogin';
import MainLogin from './components/MainLogin';

ReactDOM.render(
    <Router>
  <Switch>
      <Route path='/' exact component={MainLogin}/>
      <Route path='/beacon' exact component={Dashboard}/>
      <Route path='/kiosk' component={Kiosk}/> 
      <Route path='/klogin' component={KioskLogin}/>
  </Switch>
</Router>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
