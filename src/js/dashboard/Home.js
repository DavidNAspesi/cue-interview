import React from "react";
import Link from 'react-router-dom/Link';
import Cookies from 'js-cookie';
import AuthenticatedComponent from "./AuthenticatedComponent";
import * as Helpers from "helpers";
import Messages from "./messages/Messages"

export default AuthenticatedComponent(class Home extends React.Component {
  constructor() {
    super();

    this.state = {
      isLoading: false,
      loadingError: null,
      recommendedProds: []
    }
  }

  componentWillMount() {
    this.state.widgets = Cookies.getJSON('widgets') || this.getDefaultWidgetSettings();
  }

  getDefaultWidgetSettings() {
    return [
      {key: "software-recs", state: true},
      {key: "constant-contact", state: true}
    ]
  }

  getDashHeader(company, user) {
    const partner = Helpers.getPartnerSettings(company);
    if (partner && partner.dashHeader) {
      return partner.dashHeader;
    } else {
      return `Welcome to your all-in-one business dashboard${user && user.name && (', ' + user.name)}!`;
    }
  }

  getDashText(company) {
    const partner = Helpers.getPartnerSettings(company);
    if (partner && partner.dashText) {
      return partner.dashText;
    } else {
      return (
        <span>
          Manage everything right here. Go ahead and make any changes you need to your products, users, or account.
        </span>
      );
    }
  }

  getProductBreakdown(company) {
    var trials = [], prods = [];
    if (company && company.products) {
      company.products.forEach(prod => {
        if (Helpers.isTrial(prod.first_billing_date, company.next_billing_date)) {
          trials.push(prod);
        } else {
          prods.push(prod);
        }
      });
    }
    return {'trials': trials, 'prods': prods};
  }

  getColor(avg) {
    if (avg < 20) {
      return 'red';
    } else if (avg < 50) {
      return 'orange';
    } else {
      return 'green';
    }
  }

  trackTrials(trials, next_billing_date) {
    return trials.map((trial, key) => {
      const days_left = Helpers.trialLeft(trial.first_billing_date);
      const begin = moment(next_billing_date).subtract(30, 'days');
      const total_days = moment(trial.first_billing_date).diff(begin, 'days');
      const avg = Math.round(days_left/total_days * 100);
      return (
        <div key={key} class="home-col">
          <div class="prod-name">
            {trial.product_name}
          </div>
          <div class="head">
            Days Left
          </div>
          <div class="data text-center">
            <div class='left'></div>
            <div class={`c100 p${avg} ${this.getColor(avg)}`}>
              <span>{days_left}</span>
              <div class="slice"><div class="bar"></div><div class="fill"></div></div>
            </div>
          </div>
          <Link to="/dashboard/products" class="manage">Manage trial</Link>
        </div>
      )
    });
  }

  render() {
    const {company, user} = this.props,
          {recommendedProds, widgets} = this.state,
           prods = this.getProductBreakdown(company);

    return (
      <div class="home-wrap">
        <div class="row row-eq-height">
          <div class="col-sm-6 col-lg-5">
            <div class="home-profile dashboard-pane">
              <div class='company-image'>
                <img src='/img/storefront.jpg'/>
              </div>
              <div class='profile-pane'>
                <div class='profile-top'>
                  {company.name}
                </div>
                <div class='profile-bottom'>
                  {this.getDashHeader(company,user)}
                </div>
              </div>
            </div>
          </div>
          <div class="col-sm-6 col-lg-7">
            <div class="dashboard-pane">
              <Messages messages={company.messages}/>
            </div>
          </div>
        </div>

        <div class="dashboard-pane">
          <div class="dashboard-subheader">
            Important Data
          </div>
          <div class="home-row">
            <div class="home-col">
              <div class="head">
                Trials
              </div>
              <div class="data num">
                {prods.trials.length}
              </div>
              {
                prods.trials.length === 0 ?
                  <Link to="/dashboard/add" class="manage">Try new products</Link>
                :
                  <Link to="/dashboard/products" class="manage">Manage trials</Link>
              }
            </div>

            <div class="home-col">
              <div class="head">
                Products
              </div>
              <div class="data num">
                {prods.prods.length}
              </div>
              {
                prods.prods.length === 0 ?
                  <Link to="/dashboard/add" class="manage">Find products</Link>
                :
                  <Link to="/dashboard/products" class="manage">Update products</Link>
              }
            </div>

            <div class="home-col">
              <div class="head">
                Next Billing
              </div>
              <div class="data">
                {Helpers.formatDate(company.next_billing_date,"MMMM Do, YYYY")}
              </div>
            </div>

            <div class="home-col">
              <div class="head">
                Payment Info
              </div>
              <div class="data">
                { company.current_card_type && company.current_card_last_four ?
                  <span>{company.current_card_type} xxxx{company.current_card_last_four}</span>
                :
                  <span>Not added yet</span>
                }
              </div>
              <Link to="/dashboard/billing" class="manage">{company.current_card_type && company.current_card_last_four ? 'Update' : 'Add' } payment info</Link>
            </div>
          </div>
        </div>
      </div>
    );
  }
});
