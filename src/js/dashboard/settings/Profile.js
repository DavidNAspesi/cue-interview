import React from "react";
import ProfileForm from "./ProfileForm";
import ProfileData from "./ProfileData";
import * as CompanyActions from "actions/CompanyActions";
import * as UserActions from "actions/UserActions";

export default class extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.updateCompany = this.updateCompany.bind(this);
    const user = props.user;
    const company = props.company;
    this.state = {
      showUpdateForm: false,
      profileData: [
        {key: "company-name", label: "Name", value: company.name, required:true, dataError:"Please enter your company name."},
        {key: "industrySelection", label: "Industry", value: company.industry, required:true, dataError: "An industry is required"},
        {key: "phone", label: "Phone", value: company.phone ? company.phone : "", required:false, dataError:""},
        {key: "address1", label: "Street Address", value: company.address.address1, required:true, dataError:"An address is required"},
        {key: "address2", label: "Address Line 2", value: company.address.address2 ? company.address.address2 : "", required:false, dataError:""},
        {key: "city", label: "City", value: company.address.city, required:true, dataError: "You must enter a city."},
        {key: "state", label: "State", value: company.address.state, required:true, pattern: "^[A-Za-z]{2}$", dataError: "You must enter a state."},
        {key: "zip", label: "Zip", value: company.address.zip, required:true, pattern: "^[0-9]{5}(?:-[0-9]{4})?$", dataError: "You must enter a zip code."},
      ]
    }
  }

  updateCompanyData() {
    var updateObj = {}
    for (var i = 0; i < this.state.profileData; i++) {
      updateObj[this.state.profileData[i].key] = this.state.profileData[i].value;
    }
    CompanyActions.updateCompany(
      this.props.company._id.$oid,
      updateObj
    );
  }

  handleChange(field, event) {
    const {profileData} = this.state;
    profileData.find(elem => {
      if (elem.key === field) {
        elem.value = event.target? event.target.value : event
      }
    })
    this.setState({profileData})
  }

  getNestedVal(key) {
    return this.state.profileData.find(elem => {return elem.key === key}).value
  }

  updateCompany(newProfile) {
    if (Array.isArray(newProfile)) {
      this.setState({profileData: newProfile})
      // console.log(newProfile)
    } else {
      this.setState({showUpdateForm:false})
      // console.log(this.state)
    }
  }

  render() {
    const {profileData, showUpdateForm, companyLoading} = this.state,
          {user} = this.props;

    return (
      <div class="profile-wrap">
        <form role="form" data-toggle="validator" id="profile-form" class="profile">
          <div class="subheader-actions">
            <div class="dashboard-subheader">
              Company Information
            </div>
            <hr />
            {
              showUpdateForm ?
                <div class="side-by-side">
                  <button class="btn btn-cancel" onClick={()=> {this.setState({showUpdateForm:false})}}>Cancel</button>
                  <button id="submit-profile" class="btn btn-save" type="submit" onClick={this.updateCompany.bind(this)}>
                    Save
                  </button>
                </div>

              :
                <button class="btn btn-cue reversed " onClick={()=> {this.setState({showUpdateForm:true})}}>Edit</button>
            }
          </div>
          {
            showUpdateForm ?
                <ProfileForm
                  profileData={this.state.profileData} handleChange={this.handleChange}
                  updateCompany={this.updateCompany.bind(this)}
                  />
              :
                <ProfileData profileData={profileData}/>
          }
        </form>
      </div>
    )
  }
}
