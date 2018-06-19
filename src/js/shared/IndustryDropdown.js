import React from "react";
import * as Constants from "shared/constants"

export default class IndustryDropdown extends React.Component {
  render() {
    const {onChangeHandler, industrySelection, condenseText} = this.props;
    return (
      <div>
        <div class="form-group dropdown-select">
          <label for="inputIndustry" class="required">Industry</label>
          <div class="dropdown" id="inputIndustry">
            <button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
              {
                condenseText && industrySelection.length > 34 ?
                  <span>
                    <span class="abbr">{`${industrySelection.substring(0, 34)}...`}</span>
                    <span class="no-abbr">{industrySelection}</span>
                  </span>
                :
                  industrySelection
              }
              <span class="caret"></span>
            </button>
            <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
              {
                Constants.industries.map((elem, key) => {
                  return (
                    <a class="dropdown-item" value={elem} key={key} onClick={onChangeHandler.bind(this, "industrySelection", elem)}>{elem}</a>
                  )
                })
              }
            </div>
          </div>
        </div>
        <div class={"form-group" + (industrySelection === "Other" ? " show":" hide")}>
          <label for="industryOther" class="control-label required">Please Specify</label>
          <input type="text" onChange={onChangeHandler.bind(this, "otherInput")} class="form-control" ref="industryOther" id="industryOther" data-error="An Industry is Required" required={industrySelection === "Other" ? true : false} />
          <div class="help-block with-errors"></div>
        </div>
      </div>
    )
  }
}
