import React from "react";
import withRouter from "react-router-dom/withRouter";
import * as UserActions from "actions/UserActions";
import UserStore from "stores/UserStore";
import CompanyStore from "stores/CompanyStore";
import * as Helpers from "helpers";
import startsWith from "lodash/startsWith";
import isEmpty from "lodash/isEmpty";
import Settings from "Settings";

class MenuPane extends React.Component {
  constructor() {
    super();
    this.getCompany = this.getCompany.bind(this);
    this.dashboardList = [
      { 'name': 'Home', 'url': '/dashboard' },
      { 'name': 'Software', 'url': '/dashboard/products' },
      { 'name': 'New Tools', 'url': '/dashboard/add' },
      { 'name': 'Billing', 'url': '/dashboard/billing' },
      { 'name': 'Settings', 'url': '/dashboard/settings/profile' },
      { 'name': 'Support', 'url': '/dashboard/support' }
    ];

    this.websiteList = [
      { 'name': 'Home', 'url': "/"},
      { 'name': 'Features', 'url': "/features" },
      { 'name': 'Why CUE?', 'url': '/why' },
      { 'name': 'Contact', 'url': '/contact' },
      { 'name': 'Visit Marketplace', 'url': "/marketplace" },
      { 'name': 'Partner with CUE', 'url': "/partner" },
      { 'name': 'Login', 'url': "/login" },
      { 'name': 'Help', 'url': "http://help.cuemarketplace.com" }
    ];

    this.state = {company: CompanyStore.getCompany()}
  }

  componentWillMount() {
    CompanyStore.on("company_change", this.getCompany);
  }

  componentWillUnmount() {
    CompanyStore.removeListener("company_change", this.getCompany);
  }

  getCompany() {
    this.setState({
      company: CompanyStore.getCompany()
    });
  }

  triggerClose(url){
    $(".close-button").trigger('click');
    this.props.history.push(url);
  }

  domainUrl(company, partnerSettings) {
    var url = (company && company.partner && company.partner.domain) || (partnerSettings && partnerSettings.partnerUrl);
    if (url && !startsWith(url, 'http')) {
      url = 'https://'+url;
    }
    return url;
  }

  headerLogo(company, partnerSettings) {
    if (company && company.partner && !isEmpty(company.partner.logo)) {
      return company.partner.logo;
    } else if (partnerSettings && partnerSettings.logo) {
      return Settings.assetsServer + partnerSettings.logo;
    } else {
      return Settings.assetsServer + "/img/cue_logo.svg";
    }
  }

  logOut() {
    $(".close-button").trigger('click');
    UserActions.logout();
  }

  render() {
    const isSignedIn = UserStore.isSignedIn(),
          {company} = this.state,
          partnerSettings = Helpers.getPartnerSettings(company);

    return (
      <div class="modal menu-modal fade right" id="menuModal" tabIndex="-1" role="dialog">
        <div class="modal-dialog modal-full" role="document">
          <div class="modal-content">
            <div class="modal-body">
              <div class="menu-logo">
                <a href={this.domainUrl(company, partnerSettings) || "/"}>
                  <img src={this.headerLogo(company, partnerSettings)} alt={partnerSettings && partnerSettings.name || "CUE"} />
                </a>
                <button type="button" class="close-button" data-dismiss="modal"><span class="glyphicon glyphicon-remove" aria-hidden="true"></span></button>
              </div>
              <div class="menu-items">
                <ul>
                  {
                    isSignedIn ?
                      <div>
                        { this.dashboardList.map((navItem, key) => {
                            return(
                              <li key={key} class="menu-item">
                                <a href="javascript:void(0);" onClick={this.triggerClose.bind(this, navItem.url)}>{navItem.name}</a>
                              </li>
                            );
                          })
                        }
                        <li class="menu-item">
                          <a href="javascript:void(0);" onClick={this.logOut.bind(this)}>Log out</a>
                        </li>
                      </div>
                    :
                      this.websiteList.map((navItem, key) => {
                        return(
                          <li key={key} class="menu-item">
                            <a href="javascript:void(0);" onClick={this.triggerClose.bind(this, navItem.url)}>{navItem.name}</a>
                          </li>
                        );
                      })
                  }
                </ul>
              </div>

              <div class="menu-footer">
                <div class="social-icons">
                  <a href="/blog" target="_blank"><i class="fab fa-wordpress"></i></a>
                  <a href="https://www.youtube.com/channel/UCUdVvWVMvdFrAx-e55Q46Ew" target="_blank"><i class="fab fa-youtube-square"></i></a>
                  <a href="https://www.linkedin.com/company/10806125" target="_blank"><i class="fab fa-linkedin"></i></a>
                  <a href="https://twitter.com/cuemarketplace" target="_blank"><i class="fab fa-twitter-square"></i></a>
                  <a href="https://www.facebook.com/cuemarketplace/" target="_blank"><i class="fab fa-facebook-square"></i></a>
                </div>
                { partnerSettings &&
                  <div class="powered-by">
                    <img src={Settings.assetsServer + "/img/powered_by.svg"}/>
                  </div>
                }
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default withRouter(MenuPane);
