import React from "react";
import Settings from "Settings";
import * as Helpers from "helpers";
import 'url-search-params-polyfill';

export default class ResetPassword extends React.Component {
  constructor() {
    super();
    Helpers.setSEOSettings('forgot-password');
    const query = new URLSearchParams(location.search);
    this.resetToken = query.get('token');
    this.state = ({});
  }

  componentDidMount() {
    var self = this;
    $('#passwordForm').validator().on('submit', function(e) {
      if (e.isDefaultPrevented()) {
        return false;
      } else {
        self.submitPasswordReset(self);
      }
    });
    $('#emailForm').validator().on('submit', function(e) {
      if (e.isDefaultPrevented()) {
        return false;
      } else {
        self.submitResetRequest(self);
      }
    });
  }

  checkForResetToken() {
    if (this.resetToken) {
      return (
        <div>
          <h1 class="header-text">Reset Password</h1>
            { this.state.resetSuccess &&
              <div class="alert alert-success text-center">
                Your password has been reset! Now redirecting back to login.
              </div>
            }
            { this.state.resetFailed &&
              <div class="alert alert-danger text-center">
                Unable to reset password: invalid or expired token.
              </div>
            }
          <br/>
          <form id="passwordForm" data-toggle="validator" action="javascript:void(0);">
            <div class="form-group" id="inputP{this.submitResetRequest.bind(this)} assword1">
              <label>New Password</label>
              <input type="password"  ref="password" data-minlength="6" class="form-control" id="inputPassword"required />
            </div>
            <div class="form-group" id="inputPasswordConfirm1">
              <label>Confirm Password</label>
              <input type="password" ref="password_confirmation" class="form-control" id="inputPasswordConfirm" data-match="#inputPassword" data-match-error="Whoops, these don't match" required />
              <div class="help-block with-errors">Minimum of 6 characters</div>
            </div>
            <div class="actions">
              <input class="btn btn-cue btn-lg gray" type="submit" value="Update Password"/>
            </div>
          </form>
        </div>
      );
    }
    else {
      return (
        <div>
          <h1 class="header-text">Reset Password</h1>
          { this.state.emailSent &&
            <div class="alert alert-success text-center">
              We will send reset instructions to the supplied email if it matches one of our users.
            </div>
          }
          <div class="header-desc">Please enter your email and we will send you instructions on how to reset it.</div>
          <br/>
          <form id="emailForm" data-toggle="validator" action="javascript:void(0);">
            <div class="form-group">
              <label for="inputEmailAddress" class="control-label">Email Address</label>
              <input type="text" pattern="^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$" class="form-control" ref="email" id="email" data-error="A valid email is required" required />
              <div class="help-block with-errors"></div>
            </div>
            <div class="actions">
              <input class="btn btn-cue btn-lg gray" type="submit" value="Send Reset Instructions"/>
            </div>
          </form>
        </div>
      );
    }
  }

  submitResetRequest() {
    var self = this;
    $.ajax({
      url: Settings.restEngine + '/users/reset_password',
      method: 'POST',
      dataType: 'json',
      data: {
        email: this.refs.email.value,
        clientURL: window.location.href
      }
    }).done(data => {
      self.setState({emailSent: true});
    }).fail(function(xhr, textStatus, errorThrown) {
      self.setState({emailSent: true});
    });
  }

  submitPasswordReset() {
    if(this.refs.password.value == this.refs.password_confirmation.value) {
      var self = this;
      $.ajax({
        url: Settings.restEngine + '/users/reset_password',
        method: 'PATCH',
        dataType: 'json',
        data: {
          token: self.resetToken,
          password: this.refs.password.value
        }
      }).done(response => {
        if (response.success) {
          self.setState({resetSuccess: true});
          setTimeout(() => {
            this.props.history.push('/login');
          }, 5000);
        }
        else {
          self.setState({resetSuccess: false, resetFailed: true});
        }
      });
    }
  }
/////////////////////////////////////////////////////////////////////////
///////////////////RENDER//////////////////////////////////////
  render() {
    return (
      <div class="login-pane">
        { this.checkForResetToken() }
      </div>
    );
  }
/////////////////////////////////////////////////////////////////////////
}
