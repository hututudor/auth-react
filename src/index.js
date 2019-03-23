import React from 'react';
import ReactDOM from 'react-dom';
import Application from './Application';
import './main.scss';
import {BrowserRouter, Route, Switch, NavLink, Redirect} from 'react-router-dom';


ReactDOM.render(
  <Application />, document.getElementById('root'));
