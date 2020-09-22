import React, {Component} from "react"
import {Form, FormGroup, Label, Input, Container, Row, Col} from "reactstrap"
import "./events.css"
import Modal from "../components/modal/Modal"
import Backdrop from "../components/backdrop/Backdrop"

export default class EventsPage extends Component {
  state = {
    showModal: false,
  }

  handShowModal = () => {
    this.setState({showModal: true})
  }
  handleCancel = () => {
    this.setState({showModal: false})
  }
  handleConfirm = () => {
    this.setState({showModal: false})
  }
  render() {
    return (
      <>
        {this.state.showModal && <Backdrop />}
        {this.state.showModal && (
          <Modal
            title="Add Event"
            canCancle
            canConfirm
            onCancle={this.handleCancel}
            onConfirm={this.handleConfirm}
          >
            hahahaahh
          </Modal>
        )}
        <Container className="mt-5">
          <Row>
            <Col xs="12" lg="3">
              <div className="events-control my-4 shadow">
                <p>Share your Events!</p>
                <button className="button-event" onClick={this.handShowModal}>
                  Create Event
                </button>
              </div>
            </Col>
            <Col lg="4" sm="0" />
            <Col lg="4" sm="0" />
          </Row>
        </Container>
      </>
    )
  }
}
