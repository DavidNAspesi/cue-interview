import React from "react";
import Link from 'react-router-dom/Link';
import Settings from "Settings";
import * as UserActions from "actions/UserActions";
import UserStore from "stores/UserStore";
import * as Helpers from "helpers";

export default class Login extends React.Component {
  constructor() {
    super();

    Helpers.setSEOSettings('login');

    this.loginError = this.loginError.bind(this);
    this.loginSuccess =  this.loginSuccess.bind(this);

    this.state = {loginFailed: false};
  }

  componentWillMount(){
    UserStore.on("login_complete", this.loginSuccess);
    UserStore.on("login_error", this.loginError);
  }

  componentWillUnmount() {
    UserStore.removeListener("login_complete", this.loginSuccess);
    UserStore.removeListener("login_error", this.loginError);
  }

  loginSuccess() {
    const location = this.props.location,
          user = UserStore.getUser();
    if (!user.company_id && user.admin === true) {
      window.location = "/admin";
    } else {
      if (location.state && location.state.nextPathname) {
        window.location = location.state.nextPathname;
      } else {
        window.location = '/dashboard';
      }
    }
  }

  loginError() {
    this.setState({loginFailed: true});
  }

  submitLogin() {
    UserActions.login($("#email").val(), $("#inputPassword").val());
  }

  handleKeyPress(event) {
    if(event.key == 'Enter'){
      this.submitLogin();
    }
  }

  render() {
    return (
      <div class="login-pane">
        <h1 class="header-text">Log into CUE Dashboard</h1>

          { this.state.loginFailed
            ? <div class="alert alert-danger">There was an error with your email/password combination. Please try again.</div>
            : ""
          }

        <form data-toggle="validator">
          <div class="form-group">
            <label for="email" class="control-label">Email</label>
            <input type="text" pattern="^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$" class="form-control" ref="email" id="email" data-error="A valid email is required." tabIndex="1" required />
            <div class="help-block with-errors"></div>
          </div>

          <div class="form-group" id="inputPassword1">
            <label>
              <span class="control-label">Password</span>
              <Link class="forgot-password" to="resetpassword" >forgot password?</Link>
            </label>
            <input type="password" ref="password" class="form-control" id="inputPassword" onKeyPress={this.handleKeyPress.bind(this)} tabIndex="2" required />
            <div class="help-block with-errors"></div>
          </div>

        </form>

        <button class="btn btn-cue btn-lg primary" onClick={this.submitLogin.bind(this)} tabIndex="3">Log me in</button>
        <hr />
        <div class="signup-instructs">
          Don't have a CUE account? <a href="/marketplace" class="" tabIndex="4">Visit the Marketplace</a>
        </div>
        <div class="signup-instructs">
          or call us at <a href={"tel:" + Settings.supportPhone}>{Settings.supportPhone}</a> and we'll help you get started.
        </div>
        <div class="version">
          v{process.env.VERSION}
        </div>
      </div>
    );
  }
}
