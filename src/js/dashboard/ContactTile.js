import React from "react";
import * as Helpers from "helpers";
import Settings from "Settings";

export default class ContactTile extends React.Component {
  render() {
    return (
      <div class="contact-tile-wrap">
        <h3>Contact Us</h3>
        <small>Need more information?</small>
        <small>Were here to help!</small>
        <div class="row link-row">
          <a href={"mailto:" + Settings.supportEmail + "?subject=I have a question"}>
            <i class="fas fa-envelope"></i>
            Email
          </a>
          <a onClick={Helpers.triggerChat}>
            <i class="fas fa-comments"></i>
            Chat
          </a>
          <a href={"tel:" + Settings.supportPhone}>
            <i class="fas fa-phone-square"></i>
            Phone
          </a>
        </div>
      </div>
    )
  }
}
