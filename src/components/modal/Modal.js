import React from "react"
import "./modal.css"

const Modal = (props) => {
  return (
    <div className="modal-container">
      <header className="modal-header">
        <h1>{props.title}</h1>
      </header>
      <section className="modal-content">{props.children}</section>
      <section className="modal-actions">
        {props.canCancle && (
          <button className="modal-btn" onClick={props.onCancle}>
            Cancel
          </button>
        )}
        {props.canConfirm && (
          <button className="modal-btn" onClick={props.onConfirm}>
            Confirm
          </button>
        )}
      </section>
    </div>
  )
}

export default Modal
