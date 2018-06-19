import React from "react";
import Route from 'react-router-dom/Route';
import Switch from 'react-router-dom/Switch';
import Redirect from 'react-router-dom/Redirect';
import DashNav from "dashboard/DashNav";
import CompanyStore from "stores/CompanyStore";
import * as Helpers from "helpers";
import Home from "dashboard/Home";
import Settings from "dashboard/settings/Settings";
import Billing from "dashboard/billing/Billing";
import Support from "dashboard/Support";
import Solutions from "dashboard/solutions/Solutions";

export default class DashboardLayout extends React.Component {
  constructor() {
    super();
    this.getCompany = this.getCompany.bind(this);
    this.state = {company: CompanyStore.getCompany()};
  }

  componentWillMount() {
    CompanyStore.on("company_change", this.getCompany);
  }

  componentWillUnmount() {
    CompanyStore.removeListener("company_change", this.getCompany);
  }

  getCompany() {
    this.setState({company: CompanyStore.getCompany()});
  }

  updatePartnerStyling(company) {
    if (company && company.partner) {
      $("body").removeClass().addClass(company.partner.name);
    }
  }

  showPartnerView(company) {
    if (company && company.partner) {
      $('body').removeClass().addClass(company.partner.name);
    }
  }

  render() {
    const {company} = this.state;
    this.showPartnerView(company);
    return (
      <div class="dashboard-wrap">
        <DashNav company={company} />

        <div class="dashboard-main">
          <Switch>
            <Route exact path='/dashboard' component={Home}/>
            <Route exact path='/dashboard/billing' component={Billing}/>
            <Route path='/dashboard/settings' component={Settings}/>
            <Route exact path='/dashboard/support' component={Support}/>
            <Route path='/dashboard/products' component={Solutions}/>
            <Route path='/dashboard/add' component={Solutions}/>
          </Switch>
        </div>
      </div>
    );
  }
}
