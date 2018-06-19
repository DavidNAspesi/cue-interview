import React from "react"
import Switch from 'react-router-dom/Switch'
import Route from 'react-router-dom/Route'
import Redirect from 'react-router-dom/Redirect'
import Footer from "shared/Footer";
import Login from "login/Login";
import ResetPassword from "login/ResetPassword";

export default class BaseLayout extends React.Component {
  render() {
    const {match} = this.props;
    return (
      <div class="login-main">
        <Switch>
          <Route exact path="/login" component={Login}/>
          <Route exact path="/resetpassword" component={ResetPassword}/>
          <Redirect to="/login"/>
        </Switch>
        <Footer/>
      </div>
    );
  }
}
