import React from "react";

export default class EmptySearch extends React.Component {
  render() {
    return (
      <div class="search-empty-wrap">
        No matches found for that search criteria. Please expand your search or remove filters.
      </div>
    );
  }
}
