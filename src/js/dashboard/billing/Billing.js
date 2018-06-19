import React from "react";
import AuthenticatedComponent from "dashboard/AuthenticatedComponent";
import * as Helpers from "helpers";
import Settings from "Settings";
import PaymentInformation from "./PaymentInformation";
import ContactTile from "dashboard/ContactTile";

export default AuthenticatedComponent(class Billing extends React.Component {
  render() {
    const {company, user} = this.props;
    return (
      <div class="billing-wrap">
        <div class="row row-eq-height">
          <div class="col-md-9">
            <div class="dashboard-pane">
              <div class="dashboard-header">Billing Information</div>
              <PaymentInformation company={company} user={user}/>
            </div>
          </div>
          <div class="col-md-3">
            <div>
              <div class="dashboard-pane one-bill-wrap">
                <img src={"/img/one_bill.svg"}/>
                <small>CUE wants to simplify your monthly subscriptions by consolidating your transactions in one single bill.</small>
              </div>
              <div class="dashboard-pane second-row">
                <ContactTile />
              </div>
            </div>
          </div>
        </div>
        <div class="dashboard-pane">
          <div class="dashboard-header">Order History</div>
          coming soon...
        </div>
      </div>
    )
  }
})
