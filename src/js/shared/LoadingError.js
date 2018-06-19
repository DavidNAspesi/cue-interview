import React from "react";
import Link from 'react-router-dom/Link';

export default class LoadingError extends React.Component {
  render() {
    return (
      <div class="loading-error-pane">
        <div class="error-message">
         {
          this.props.message ?
            <div>this.props.message</div>
          :
            <div>
              We are currently performing system maintenance. Please try again in a few minutes or <Link to="/contact">contact us.</Link>
            </div>
         }
        </div>
      </div>
    );
  }
}
