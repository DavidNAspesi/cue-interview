import React from "react";

export default class Team extends React.Component {
  constructor() {
    super();
    this.state = {
      modalData: {},
      modalType: ""
    }
  }

  getColumn(data, width) {
    return (
      <div class={"col-sm-"+width}>
        <div class="full-height">
          <div class="full-height">{data}</div>
        </div>
      </div>
    )
  }

  getEmployees(roster) {
    return roster.map((employee, key) => {
      return (
        <div class="dash-table-row" key={key}>
          <div class='row'>
            {this.getColumn(employee.name, 4)}
            {this.getColumn(employee.email, 5)}
            {this.getColumn(employee.position || "N/A", 3)}
          </div>
        </div>
      )
    })
  }

  render() {
    const {user, company} = this.props,
          {modalData, modalType} = this.state;
    return (
      <div class="team-wrap">
        <div class="dash-table-wrap">
          <div class="dash-table-row dash-table-header">
            <div class="row">
              {this.getColumn("Name", 4)}
              {this.getColumn("Email", 5)}
              {this.getColumn("Position", 3)}
            </div>
          </div>
          {
            company.employees && company.employees.length > 0 ?
              this.getEmployees(company.employees)
              :
              <div class="dash-table-row">
                <div class="helper-tile">
                  Select "Add New" to add a team member.
                </div>
              </div>
          }
        </div>
      </div>
    )
  }
}
