import React from "react";
import AuthenticatedComponent from "dashboard/AuthenticatedComponent";
import Switch from "react-router-dom/Switch";
import Route from "react-router-dom/Route";
import Redirect from "react-router-dom/Redirect";
import Settings from "Settings";

export default AuthenticatedComponent(class Solutions extends React.Component {
  constructor() {
    super();
    this.setAlertMessage = this.setAlertMessage.bind(this);
    this.state = {successMessage: null}
  }

  setAlertMessage(msg) {
    this.setState({successMessage:msg}, () => {
      $(".alert-success").fadeOut(9000);
    })
  }

  render() {
    const {successMessage, solutionUpdate} = this.state,
          {company, match, history} = this.props;

    return (
      <div class="solutions-wrap dashboard-pane">
        <div>coming soon</div>
      </div>
    )
  }
});
