import React from "react";
import * as CompanyActions from "actions/CompanyActions";
import * as UserActions from "actions/UserActions";
import UserStore from "stores/UserStore";

export default class TeamEntry extends React.Component {
  constructor() {
    super();
    this.serviceError = this.serviceError.bind(this);
    this.state = {
      errorMessage: null
    };
  }

  componentWillMount(){
    UserStore.on("user_service_error", this.serviceError);
  }

  componentWillUnmount() {
    UserStore.removeListener("user_service_error", this.serviceError);
  }

  componentDidMount(){
    const self = this;
    $('#updateForm').validator().on('submit', e => {
      if (!e.isDefaultPrevented()) {
        e.preventDefault();
        if (self.props.editId)
          self._onUpdateMember();
        else if (self.props.adminId)
          self._onUpdateUser();
        else {
          self._onAddMember();
        }
      }
    });
  }

  serviceError() {
    const error = UserStore.getError();
    console.error(error.xhr);
    if (error.xhr.responseJSON.error.indexOf('email') != -1) {
      $("#email").parents('.form-group').addClass('has-error');
      $('#email').next('div').text(error.xhr.responseJSON.error);
    } else {
      this.setState({errorMessage: error.xhr.responseJSON.error});
    }
  }

  _onUpdateMember(){
    CompanyActions.updateEmployee( this.props.companyId,
                                  this.props.editId,
                                  $("#firstName").val(),
                                  $("#lastName").val(),
                                  $("#email").val() );
  }

  _onUpdateUser(){
    UserActions.updateUser( this.props.adminId,
                            $("#firstName").val() + " " + $("#lastName").val(),
                            $("#email").val() );
  }

  _onAddMember() {
    CompanyActions.createEmployee(this.props.companyId, $("#firstName").val(), $("#lastName").val(), $("#email").val());
  }

  _getButtonText() {
    if (this.props.editId)
      return "Update Member";
    else if (this.props.adminId)
      return "Update Profile";
    else {
      return "Add New Member";
    }
  }

  render() {
    const {closeUpdate, editId, adminId} = this.props;

    const EntryHeader = editId ? "Update Team Member" : (adminId ? "Update Your Profile" : "Add Team Member");

    return (
      <div class="new-member-wrap">
        <div class="dashboard-subheader">
          {EntryHeader}
        </div>
        { this.state.errorMessage &&
          <div class="alert alert-danger">
            {this.state.errorMessage}
          </div>
        }
        <form id="updateForm" role="form" data-toggle="validator">
          <div class="form-group">
            <label for="firstName" class="control-label">First Name*</label>
            <input type="text" pattern="^[A-zÀ-ú'-]+$" class="form-control" ref="name" id="firstName" data-error="Please enter a first name" required />
            <div class="help-block with-errors"></div>
          </div>

          <div class="form-group">
            <label for="lastName" class="control-label">Last Name*</label>
            <input type="text" pattern="^[A-zÀ-ú'-]+$" class="form-control" ref="name" id="lastName" data-error="Please enter a last name" required />
            <div class="help-block with-errors"></div>
          </div>

          <div class="form-group">
            <label for="email" class="control-label">Email Address*</label>
            <input type="text" pattern="^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$" class="form-control" id="email" data-error="A valid email address is required" required />
            <div class="help-block with-errors"></div>
          </div>

          <div class="save-buttons">
            <button type="submit" class="btn btn-save">{this._getButtonText()}</button>
            <input type="button" class="btn-cancel" value="Cancel" onClick={closeUpdate} />
          </div>
        </form>
      </div>
    );
  }
}
