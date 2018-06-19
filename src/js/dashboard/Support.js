import React from "react";
import * as Helpers from "helpers";
import Settings from "Settings";
import AuthenticatedComponent from "dashboard/AuthenticatedComponent";

export default AuthenticatedComponent(class Support extends React.Component {
  render() {
    return (
      <div class="support-wrapper dashboard-pane">
        <div class="dashboard-header">Support</div>
        <div class="row">
          <div class="col-sm-6 col-md-3 support-button">
            <div onClick={Helpers.triggerChat}>
              <i class="fas fa-comments"></i>
              <h4>Chat</h4>
            </div>
          </div>
          <div class="col-sm-6 col-md-3 support-button">
            <a href={"tel:" + Settings.supportPhone}>
              <i class="fas fa-phone"></i>
              <h4>Phone</h4>
              <h5>{Settings.supportPhone}</h5>
            </a>
          </div>
          <div class="col-sm-6 col-md-3 support-button">
            <a href={"mailto:" + Settings.supportEmail + "?subject=I have a question"}>
              <i class="fas fa-envelope"></i>
              <h4>Email</h4>
              <h5>{Settings.supportEmail}</h5>
            </a>
          </div>
          <div class="col-sm-6 col-md-3 support-button">
            <a href="http://help.cuemarketplace.com/solution/folders/19000150734" target="_blank">
              <i class="fas fa-info-circle"></i>
              <h4>Knowledge Base</h4>
            </a>
          </div>
        </div>
      </div>
    );
  }
});
