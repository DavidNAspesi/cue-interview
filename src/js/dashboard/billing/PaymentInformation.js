import React from "react";
import Link from 'react-router-dom/Link';
import Loading from "shared/Loading";
import LoadingError from "shared/LoadingError";
import Settings from "Settings";
import * as Helpers from "helpers";

export default class PaymentInformation extends React.Component {
  constructor() {
    super();

    this.state = {
      isUpdating: false
    };
  }

  getCardIcon(cardType) {
    const cards = [
      { name: "Visa", icon: "fab fa-cc-visa" },
      { name: "MasterCard", icon: "fab fa-cc-mastercard" },
      { name: "American Express", icon: "fab fa-cc-amex" }
    ]
    return cards.find(elem => {
      return elem.name === cardType
    })
  }

  getPaymentMethod(company, user) {
    return (
      <div class="row">
        <div class="col-xs-4">
          <p>Card Number:</p>
          <p>Card Type:</p>
          <p>Name:</p>
        </div>
        <div class="col-xs-8">
          { company.current_card_type ?
              <div>
                <p>xxxx - {company.current_card_last_four}</p>
                <p>
                  <i class={this.getCardIcon(company.current_card_type).icon}></i> {company.current_card_type}
                </p>
                <p>{company.current_card_name}</p>
              </div>
            :
              <div>No credit card on file.</div>
          }
        </div>
      </div>
    )
  }

  getBillingSummary(company) {
    const monthlyTotal = company?Helpers.getTotals(company.products, company.coupon, company.num_employees, company.payment_type):{};
    return (
      <div>
        <div class="row">
          <div class="col-xs-4">
            <p>Billing Frequencey</p>
            <p>Next Billing Date:</p>
            <p>Next Charge</p>
          </div>
          <div class="col-xs-8">
            <p>{company.payment_type.toLowerCase()}</p>
            <p>{Helpers.formatDate(company.next_billing_date,"MMMM Do, YYYY")}</p>
            <p>{monthlyTotal.subTotal.formatMoney()}</p>
          </div>
        </div>
        <div class="helper-tile text-cetner">
          To edit your software subscriptions or trials, visit the <Link to={"/dashboard/products"}>software tab</Link>.
        </div>
      </div>
    )
  }

  generatePaymentForm() {
    return (
      <form id="companyForm" role="form" data-toggle="validator" action="javascript:void(0);">
        <div id="payment-data">
          <div class="form-group">
            <label for="card-name" class="control-label required">Name</label>
            <input type="text" pattern="(\w+)(?:\s\s+)?\s(\w+).*" class="form-control" id="card-name" placeholder="as it appears on your card" data-error="Your name as it appears on your card is required" required />
            <div class="help-block with-errors"></div>
          </div>
          <div class="form-group">
            <label for="card-number" class="control-label required">Card Number</label>
            <div class="number-wrapper">
              <div class="form-control" id="card-number"></div>
              <div class="help-block with-errors"></div>
              <div id="card-image"></div>
            </div>
          </div>
          <div class="row">
            <div class="col-sm-5 exp-padding">
              <div class="form-group">
                <label for="expiration-date" class="control-label required">Expiration</label>
                <div class="form-control" id="expiration-date"></div>
                <div class="help-block with-errors"></div>
              </div>
            </div>
            <div class="col-sm-3 cvc-padding">
              <div class="form-group">
                <label for="cvv" class="control-label required">CVC</label>
                <div class="form-control" id="cvv"></div>
                <div class="help-block with-errors"></div>
              </div>
            </div>
            <div class="col-sm-4 col-xs-4 cvc-img-padding">
              <img src="/img/cvc.png" class="cvc-img"/>
            </div>
          </div>
          <input type="hidden" id="nonce" ref="nonce" name="payment-method-nonce" />
          <div class="save-buttons">
            <button id="button-pay" class="btn btn-save" type="submit" disabled={ this.state.isUpdating === true }>
              { this.state.isUpdating &&
                <span class="glyphicon glyphicon-refresh spinning"></span>
              }
              Save Changes
            </button>
            <input type="button" class="btn-cancel" value="Cancel" onClick={this._hideUpdateForm.bind(this)} />
          </div>
        </div>
      </form>
    );
  }

  render() {
    const {company, user} = this.props,
          {paymentUpdateSuccess, errorMessage} = this.state;
    return (
      <div class="payment-info-wrap">
        {
          paymentUpdateSuccess &&
            <div class="alert alert-success">
              Payment information successfully updated!
            </div>
        }
        <div class="row">
          <div class="col-xs-12">
            <div class="subheader-actions">
              <div class="dashboard-subheader">Payment Method</div>
              <hr />
            </div>
            { this.getPaymentMethod(company, user) }
          </div>
          <div class="col-xs-12">
            <div class="subheader-actions">
              <div class="dashboard-subheader">Billing Details</div>
              <hr />
            </div>
            {this.getBillingSummary(company)}
          </div>
        </div>
      </div>
    )
  }
}
