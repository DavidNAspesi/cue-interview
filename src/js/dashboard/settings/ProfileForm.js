import React from "react";
import IndustryDropdown from "shared/IndustryDropdown";

export default class ProfileForm extends React.Component {

  componentDidMount() {
    $('#profile-form').validator().on('submit', (e) => {
      e.preventDefault();
    });
  }

  getFormFields(inputList, handleChange) {
    return inputList.map((elem, key) => {
      if (elem.key === "industrySelection") {
        return (
          <div key={key}>
            <IndustryDropdown
              onChangeHandler={handleChange} industrySelection={elem.value}
              condenseText={false}/>
          </div>
        )
      }
      return (
        <div class="form-group input-field" key={key}>
          <label for={elem.key} class={"control-label" + (elem.required ? " required":"")}>{elem.label}</label>
          <input id={elem.key} type="text" value={elem.value} onChange={handleChange.bind(this, elem.key)} required={elem.required} class="form-control" ref={elem.key} data-error={elem.dataError}
          pattern={elem.pattern}/>
          <div class="help-block with-errors"></div>
        </div>
      )
    })
  }



  render() {
    const {profileData, handleChange} = this.props
    console.log(profileData)
    return (
      <div class="row">
        <div class="col-sm-6" onChange={this.props.updateCompany.bind(this)}>
          {this.getFormFields(profileData.slice(0, 3), handleChange)}
        </div>
        <div class="col-sm-6" onChange={this.props.updateCompany.bind(this)}>
          {this.getFormFields(profileData.slice(3), handleChange)}
        </div>
        <br />
      </div>
    )
  }
}
