import React from "react";
import * as Helpers from "helpers";
import Loading from "shared/Loading";
import LoadingError from "shared/LoadingError";

export default class Messages extends React.Component {
  constructor() {
    super();
  }
  getDate(c_at) {
    if (Helpers.isToday(c_at)) {
      return Helpers.formatDate(c_at,'h:mm a')
    } else {
      return Helpers.formatDate(c_at,'MMM Do')
    }
  }
  getTypeIcon(message) {
    if (message.message_type === 'PURCHASE') {
      return <i class="fas fa-shopping-cart"></i>;
    } else if (message.message_type === 'WARNING' || message.message_type === 'ERROR') {
      return <i class="fas fa-exclamation-triangle"></i>;
    } else {
      return <i class="fas fa-envelope"></i>;
    }
  }
  renderMessage(message, key) {
    return (
      <div key={key} class={'message' + (message.status=='UNREAD'?' unread':'') + (message.message_type=='ERROR'?' error':'')}>
        <div class='row'>
          <div class='col-xs-9 col-lg-10'>
            <div class="message-text">
              {this.getTypeIcon(message)}
              <span class="subject">{message.subject}</span> - {message.body}
            </div>
          </div>
          <div class='col-xs-3 col-lg-2'>
            <div class="message-date">
              {this.getDate(message.c_at)}
            </div>
          </div>
        </div>
      </div>
    )
  }

  render() {
    const {messages} = this.props;
    return (
      <div class="messages-wrap">
        <div class='dashboard-subheader'>
          Messages
        </div>
        {messages && messages.length > 0 ?
          <div class='message-list'>
            { messages.map((m,key)=>{return this.renderMessage(m,key)}) }
          </div>
        :
          <div class='empty-messages'>
            Zero Messages!
          </div>
        }
      </div>
    )
  }
}
