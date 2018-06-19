import React from "react";
import Link from 'react-router-dom/Link';
import NavLink from 'react-router-dom/NavLink'
import * as UserActions from "actions/UserActions";
import UserStore from "stores/UserStore";
import CompanyStore from "stores/CompanyStore";
import * as Helpers from "helpers";
import Settings from "Settings";
import startsWith from "lodash/startsWith";

export default class Header extends React.Component {
  constructor() {
    super();
    this.getUser = this.getUser.bind(this);
    this.logoutSuccess = this.logoutSuccess.bind(this);
    this.getCompany = this.getCompany.bind(this);

    this.state = {user: UserStore.getUser(),
                  company: CompanyStore.getCompany()};
  }
  componentWillMount(){
    UserStore.on("user_change", this.getUser);
    UserStore.on("logout_complete", this.logoutSuccess);
    UserStore.on("logout_error", this.logoutSuccess);
    UserStore.on("authentication_error", this.logoutSuccess);
    CompanyStore.on("company_change", this.getCompany);

  }
  componentWillUnmount() {
    UserStore.removeListener("user_change", this.getUser);
    UserStore.removeListener("logout_complete", this.logoutSuccess);
    UserStore.removeListener("logout_error", this.logoutSuccess);
    UserStore.removeListener("authentication_error", this.logoutSuccess);
    CompanyStore.removeListener("company_change", this.getCompany);
  }
  getCompany() {
    this.setState({
      company: CompanyStore.getCompany()
    });
  }
  componentDidMount() {
    if (window.location.pathname.indexOf("dashboard") >= 0 && !this.state.user) {
      this.logoutSuccess();
    }
  }
  getUser() {
    this.setState({user: UserStore.getUser()});
  }
  logoutSuccess() {
    const {company} = this.state,
          partnerSettings = Helpers.getPartnerSettings(company),
          partnerDomain = this.domainUrl(partnerSettings);
    if (partnerDomain) {
      window.location = partnerDomain;
    } else {
      window.location = "/login";
    }
  }
  logOut() {
    UserActions.logout();
  }
  domainUrl(partnerSettings) {
    var url = partnerSettings && partnerSettings.partnerUrl;
    if (url && !startsWith(url, 'http')) {
      url = 'https://'+url;
    }
    return url;
  }
  headerLogo(partnerSettings) {
    if (partnerSettings && partnerSettings.logo) {
        return Settings.assetsServer + partnerSettings.logo;
    } else {
      return Settings.assetsServer + "/img/cue_logo.svg";
    }
  }
  getGreeting() {
    const hour = new Date().getHours();
    if (hour < 12) {
      return 'Good morning';
    } else if (hour >= 12 && hour < 17) {
      return 'Good afternoon';
    }
    else if (hour >= 17 ) {
      return 'Good evening';
    }
  }
  render() {
    const {user, company} = this.state,
          curPath = window.location.pathname,
          partnerSettings = Helpers.getPartnerSettings(company),
          isInAdmin = curPath.indexOf("/admin") >= 0,
          isInDash = curPath.indexOf("/dashboard") >= 0,
          isInLogin = curPath.indexOf("/login") >= 0 || curPath.indexOf("password") >= 0,
          isInShop = curPath.indexOf("/marketplace") >= 0 || curPath.indexOf("/shop") >= 0,
          isPurchase = curPath.indexOf("purchase") >= 0,
          domainUrl = this.domainUrl(partnerSettings) || "/";

    return (
      <div class={"header" + (!isInShop?" sticky":"")}>
        <div class="support-header-row">
          <div class={"support-header-inner" + (isInDash?"":" in-shop")}>
            { !user &&
              <div class="header-link">
                <Link to="/partner">Partner with CUE</Link>
              </div>
            }
            <div class="header-link">
              { !user ?
                <Link to="/login">Login</Link>
              :
                <Link to="/contact">Contact</Link>
              }
            </div>
            <div class="header-link">
              <a href="http://help.cuemarketplace.com" target="_blank">Help</a>
            </div>
          </div>
        </div>
        <div class={"logo-header-row" + (isInDash?"":" in-shop")}>
          <div class="logo-col">
            <a href={domainUrl}>
              { isInDash || isInShop || isInLogin ?
                <img id='logo' src={this.headerLogo(partnerSettings)} alt={partnerSettings && partnerSettings.name || "CUE Marketplace Logo"} />
              :
                <img id='logo' src={Settings.assetsServer + "/img/cue_logo.svg"} alt={"CUE Marketplace Logo"} />
              }
            </a>
          </div>
          <div class='search-col'>
            { !user && !isInShop && curPath !== '/' &&
              <form role="search" id="search-header" action="/marketplace" method="GET">
                 <div class="input-group">
                   <input type="text" class="form-control" placeholder='Search our marketplace' name="filter" />
                   <span class="input-group-btn">
                     <button class="btn btn-search" type="submit">
                       <span class="glyphicon glyphicon-search" aria-hidden="true"></span>
                     </button>
                   </span>
                 </div>
              </form>
            }
          </div>
          <div class="links-col">
            { user ?
              <div class={!isInAdmin ? "hidden-xs hidden-sm" : ""}>
                <Link to={(user.admin === true) ? "/admin" : "/dashboard"} >
                  {this.getGreeting()}, {Helpers.firstName(user.name)}
                </Link>
                <a onClick={this.logOut.bind(this)}>Log&nbsp;out</a>
              </div>
            :
              <div class="hidden-xs hidden-sm">
                <NavLink exact to="/" activeClassName="selected">Home</NavLink>
                <NavLink exact to="/features" activeClassName="selected">Features</NavLink>
                <NavLink exact to="/why" activeClassName="selected">Why CUE?</NavLink>
                <NavLink exact to="/contact" activeClassName="selected">Contact</NavLink>
                <Link to="/marketplace" class="btn btn-cue">Visit Marketplace</Link>
              </div>
            }
            { !isInAdmin &&
              <div class="menu-icon-span">
                <button class="menu-icon" type="button" data-toggle="modal" data-target="#menuModal"></button>
              </div>
            }
          </div>
        </div>
      </div>
    );
  }
}
