import React from "react"
import "./modal.css"

const Modal = (props) => {
  return (
    <div className="modal-container">
      <header className="modal-header">
        <h1>{props.title}</h1>
      </header>
      <section className="modal_content">{props.children}</section>
      <section className="modal-actions">
        {props.canCancle && (
          <button className="modal-btn" onClick={props.onCancle}>
            Cancel
          </button>
        )}
        {props.canConfirm && (
          <button className="modal-btn" onClick={props.onConfirm}>
            {props.confirmText}
          </button>
        )}
      </section>
    </div>
  )
}

export default Modal
