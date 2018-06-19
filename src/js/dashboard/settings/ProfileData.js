import React from "react";

export default class ProfileData extends React.Component {

  getStaticFields(data) {
    return data.map((elem, key) => {
      return (
        <div class="input-field static" key={key}>
          <label for={elem.key}>{elem.label}</label>
          <span>
            {elem.value || "--"}
          </span>
        </div>
      )
    })
  }

  render() {
    const {profileData} = this.props;
    return (
      <div class="row">
        <div class="col-sm-6">
          {this.getStaticFields(profileData.slice(0,3))}
        </div>
        <div class="col-sm-6">
          {this.getStaticFields(profileData.slice(3))}
        </div>
      </div>
    )

  }
}
