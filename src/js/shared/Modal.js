import React from "react";

export default class Modal extends React.Component {

  render() {
    const {title, body, saveAction, closeAction, modalId, confirmationText, closeText} = this.props;

    return (
      <div class="modal fade modal-wrap" id={modalId} tabIndex="-1" role="dialog" aria-labelledby="newModalLabel" aria-hidden="true">
        <div class="modal-dialog" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <h3 class="modal-title" id="newModalLabel">{title}</h3>
              <button type="button" class="close" data-dismiss="modal" aria-label="Close" onClick={closeAction.bind(this)}>
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body">
              {body}
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" data-dismiss="modal" onClick={closeAction.bind(this)}>{closeText}</button>
              <button type="button" class="btn btn-cue" onClick={saveAction.bind(this)}>{confirmationText}</button>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
