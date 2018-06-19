import React from "react";
import debounce from "lodash/debounce";
import isEmpty from "lodash/isEmpty";
import Settings from "Settings";

export default class Search extends React.Component {
  constructor(props) {
    super(props);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.state = { inputVal: this.props.initialValue ? this.props.initialValue : "what software can we help you find today?" };
    this.throttledSearch = debounce(() => {
      this.getProducts();
    }, 2000);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps !== this.props) {
      this.setState({inputVal:nextProps.initialValue || ""})
    }
  }

  getProducts() {
    const searchTerm = this.state.inputVal.trim();
    this.props.updateTextFilter(searchTerm);
  }

  clearSearch() {
    this.props.updateTextFilter("");
    $("input#search").val("");
    this.setState({ inputVal: "" });
  }

  handleInputChange(event) {
    this.setState({inputVal: event.target.value});
    this.throttledSearch();
  }

  render() {
    const {inputVal} = this.state,
          {inSidebar, defaultText} = this.props,
          placeholder = defaultText ? defaultText : "What kind of software are you looking for?";

    return(
      <div class={"search-wrap" + (inSidebar?" full-size":"")}>
        <div class={"form-group" + (inSidebar?" gray-text":"")}>
          <i class="glyphicon glyphicon-search" aria-hidden="true"></i>
          <input type="text" id="search" onChange={this.handleInputChange.bind(this)} value={inputVal} placeholder={placeholder}/>
          {!isEmpty(inputVal) &&
            <i class="glyphicon glyphicon-remove-circle" aria-hidden="true" onClick={this.clearSearch.bind(this)}></i>
          }
        </div>
        {!inSidebar &&
          <div class="call-us">
            or call us at <a href={"tel:" + Settings.supportPhone}>{Settings.supportPhone}</a> and we'll help you get started.
          </div>
        }
      </div>
    );
  }
}
