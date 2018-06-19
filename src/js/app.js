import prototypes from "shared/prototypes";
import React from "react";
import {render} from "react-dom";
import Router from 'react-router-dom/Router';
import Route from 'react-router-dom/Route';
import Switch from 'react-router-dom/Switch';
import Redirect from 'react-router-dom/Redirect'
import Loadable from 'react-loadable';
import Loading from "shared/Loading";
import Header from "shared/Header";
import MenuPane from "shared/MenuPane";
import UserStore from "stores/UserStore";
import createBrowserHistory from 'history/createBrowserHistory';
import LoginLayout from "login/LoginLayout";
import DashboardLayout from "dashboard/DashboardLayout";
const history = createBrowserHistory();

import 'sass/base';
import 'sass/app'
// DO NOT ADD SASS IMPORTS AFTER THIS OR PARTNERS WON'T OVERRIDE IT

render((
  <Router history={history}>
    <div>
    <MenuPane/>
    <Header/>
    <Switch>
      <Route exact path="/login" component={LoginLayout}/>
      <Route path="/dashboard" render={({match}) =>
        UserStore.isSignedIn() ?
          <DashboardLayout match={match}/>
        :
          <LoginLayout match={match}/>
      }/>
      <Redirect to="/login"/>
    </Switch>
    </div>
  </Router>
), document.getElementById('app'));
