import React from "react";
import AuthenticatedComponent from "dashboard/AuthenticatedComponent";
import Switch from "react-router-dom/Switch";
import Route from "react-router-dom/Route";
import Redirect from "react-router-dom/Redirect";
import Profile from "./Profile";
import Team from "./Team";
import Loading from "shared/Loading";
import LoadingError from "shared/LoadingError";

export default AuthenticatedComponent(class Settings extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedTab: props.location.pathname === "/dashboard/settings/team" ? "team" : "company"
    }
  }

  _generateErrorMessage(error) {
    var errorMessage = null;
    if (error.xhr.responseJSON && error.xhr.responseJSON.error.indexOf('name') != -1) {
      $("#inputCompanyName").parents('.form-group').addClass('has-error');
      $('#inputCompanyName').next('div').text(error.xhr.responseJSON.error);
    } else if (error.xhr.readyState === 0) {
      errorMessage = "Unable to connect to our servers. Please try again in a minute or two or contact us.";
    } else {
      errorMessage = "An error occurred while updating (" + error.xhr.status + "): " + error.textStatus + ". Please try again in a minute or two or contact us.";
    }
  }

  updateView(val) {
    this.setState({selectedTab:val}, ()=> {
      this.props.history.push(`/dashboard/settings/${this.state.selectedTab}`)
    })
  }

  render() {
    const {company, user, companyLoading, companyLoadingError, companyUpdated} = this.props,
          {selectedTab} = this.state,
          errorMessage = (companyLoadingError) ? this._generateErrorMessage(companyLoadingError) : null;

    return (
      <div class="settings-wrap">
        <div class="dashboard-pane">
          <div class="multi-tab-header">
            <div class={"dashboard-header" + (selectedTab === "company"?" active":"")} onClick={this.updateView.bind(this, "company")}>Company</div>
            <div class={"dashboard-header" + (selectedTab === "team"?" active":"")} onClick={this.updateView.bind(this, "team")}>Team</div>
          </div>
          { companyLoadingError ?
              <LoadingError />
            :
              companyLoading === false && company ?
                <Switch>
                  <Route exact path="/dashboard/settings/profile" render={() =>
                    <Profile
                    company={company}
                    user={user}/>
                  }/>
                  <Route exact path="/dashboard/settings/team" render={() =>
                    <Team
                    company={company}
                    history={history}/>
                  }/>
                  <Redirect to="/oops"/>
                </Switch>
              :
                <Loading />
          }
        </div>
      </div>
    )
  }
})
