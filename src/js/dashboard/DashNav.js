import React from "react";
import Link from 'react-router-dom/Link';
import startsWith from "lodash/startsWith";
import * as Helpers from "helpers";
import Settings from "Settings";

export default class DashNav extends React.Component {
  constructor() {
    super();
    this.tabList = [
      { 'name': 'home', 'url': '/dashboard', icon: 'fas fa-home'},
      { 'name': 'software', 'url': '/dashboard/products', icon: 'fas fa-star'},
      { 'name': 'billing', 'url': '/dashboard/billing', icon: 'fas fa-credit-card'},
      { 'name': 'settings', 'url': '/dashboard/settings/profile', icon: 'fas fa-cog'},
      { 'name': 'support', 'url': '/dashboard/support', icon: 'fas fa-life-ring'}
    ];
  }

  getBackUrl(company, partnerSettings) {
    var url = null;

    if (company && company.partner) {
      url = company.partner.domain || (partnerSettings && partnerSettings.partnerUrl);
      if (url && !startsWith(url, 'http')) {
        url = 'https://'+url;
      }
    }
    return url;
  }

  isCurrent(tabUrl, location) {
    tabUrl = tabUrl.replace('/dashboard/', '');
    location = location.replace('/dashboard/', '');
    return location.indexOf(tabUrl) >= 0;
  }

  render() {
    const {company} = this.props,
          partnerSettings = Helpers.getPartnerSettings(company),
          backUrl = this.getBackUrl(company, partnerSettings);

    return(
      <div class="nav-pane">
        <ul>
          {this.tabList.map((tab, key) => {
            return (
              // TODO: We need to clear up which tab.url is selected on left side when the path is solutions or purchase
               <li key={key} class={this.isCurrent(tab.url, location.pathname) ? 'current' : null}>
                 <Link to={tab.url} className='btn dash-nav-btn'>
                   <i class={tab.icon}></i>
                   {tab.name}
                 </Link>
               </li>
            );
          })}

          { backUrl &&
            <li class="back">
              <a href={backUrl} className='btn dash-nav-btn'>
                <span class="glyphicon glyphicon-arrow-left"></span>
                Back to {partnerSettings.name}
              </a>
            </li>
          }
        </ul>
        <div class="powered-by">
          <img src={Settings.assetsServer + "/img/powered_by.svg"}/>
        </div>
      </div>
    );
  }
}
