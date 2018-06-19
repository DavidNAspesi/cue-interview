import React from "react";
import Settings from "Settings";

export default class NotFound extends React.Component {
  render() {
    return (
      <div class="oops-pane">
        <h1 class="header-text">Oops! We can't find the page that you requested.</h1>
        <div class="header-desc">Call us at <a href={"tel:" + Settings.supportPhone}>{Settings.supportPhone}</a> or email us at <a href={"mailto:" + Settings.supportEmail + "?subject=I am seeing an error"}>{Settings.supportEmail}</a> if you continue to see this error.</div>
      </div>
    );
  }
}
