import React, {Component} from "react"
import {
  Form,
  FormGroup,
  Label,
  Input,
  Container,
  Row,
  Col,
  Jumbotron,
} from "reactstrap"
import "./events.css"
import Modal from "../components/modal/Modal"
import Backdrop from "../components/backdrop/Backdrop"
import AuthContext from "../context/authContext"

export default class EventsPage extends Component {
  state = {
    showModal: false,
    events: [],
  }
  static contextType = AuthContext
  constructor(props) {
    super(props)
    this.titleRef = React.createRef()
    this.priceRef = React.createRef()
    this.dateRef = React.createRef()
    this.descriptionRef = React.createRef()
  }

  componentDidMount() {
    this.fetchEvents()
  }
  handShowModal = () => {
    this.setState({showModal: true})
  }
  handleCancel = () => {
    this.setState({showModal: false})
  }
  handleConfirm = () => {
    this.setState({showModal: false})
    const title = this.titleRef.current.value
    const price = +this.priceRef.current.value
    const date = this.dateRef.current.value
    const description = this.descriptionRef.current.value

    if (
      title.trim().length === 0 ||
      price <= 0 ||
      date.trim().length === 0 ||
      description.trim().length === 0
    )
      return
    const event = {title, price, date, description}
    const requestBody = {
      query: `
      mutation{
        createEvent(eventInput: {title: "${title}", description: "${description}", price: ${price}, date: "${date}" } ){
          _id, title, date, description, price, creator{ _id, email}
        }
      }`,
    }

    const token = this.context.token
    fetch("https://events-pro.herokuapp.com/graphql", {
      method: "POST",
      body: JSON.stringify(requestBody),
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
    })
      .then((res) => {
        if (res.status !== 200 && res.status !== 201) {
          throw new Error("Failed")
        }
        return res.json()
      })
      .then((resData) => {
        this.fetchEvents()
      })
      .catch((err) => {
        console.log(err)
      })
  }

  fetchEvents() {
    const requestBody = {
      query: `
      query{
        events{
          _id, title, date, description, price,
        }
      }`,
    }

    const token = this.context.token
    fetch("https://events-pro.herokuapp.com/graphql", {
      method: "POST",
      body: JSON.stringify(requestBody),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        if (res.status !== 200 && res.status !== 201) {
          throw new Error("Failed")
        }
        return res.json()
      })
      .then((resData) => {
        const events = resData.data.events
        this.setState({events})
      })
      .catch((err) => {
        console.log(err)
      })
  }
  render() {
    const eventList = this.state.events.map((event) => {
      return (
        <Jumbotron fluid key={event._id}>
          <p className="text-center">{event.title}</p>
        </Jumbotron>
      )
    })
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
            <Form onSubmit={this.submitHandler}>
              <FormGroup className="mt-1">
                <Label for="exampleEmail">Title</Label>
                <Input
                  type="text"
                  placeholder="Enter Title"
                  innerRef={this.titleRef}
                />
              </FormGroup>
              <FormGroup className="mt-4">
                <Label for="exampleEmail">Price</Label>
                <Input
                  type="number"
                  placeholder="Enter Price"
                  innerRef={this.priceRef}
                />
              </FormGroup>
              <FormGroup className="mt-4">
                <Label for="exampleEmail">Date</Label>
                <Input
                  type="datetime-local"
                  placeholder="Enter Date"
                  innerRef={this.dateRef}
                />
              </FormGroup>
              <FormGroup className="mt-4">
                <Label for="exampleEmail">Description</Label>
                <Input
                  type="textarea"
                  placeholder="Enter Description"
                  innerRef={this.descriptionRef}
                />
              </FormGroup>
            </Form>
          </Modal>
        )}
        <Container className="mt-5">
          <Row>
            {this.context.token && (
              <Col xs="12" lg="3">
                <div className="events-control my-4 shadow">
                  <p>Share your Events!</p>
                  <button className="button-event" onClick={this.handShowModal}>
                    Create Event
                  </button>
                </div>
              </Col>
            )}
            <Col lg="3" sm="0" />
            <Col lg={this.context.token ? "4" : "3"} sm="0">
              {/* <ul className="events-lists">
                <li className="events-lists-item">Test</li>
                <li className="events-lists-item">Test</li>
              </ul> */}
              {/* <Jumbotron fluid>
                <p className="text-center">
                  This is a modified jumbotron that occupies the entire
                </p>
              </Jumbotron> */}
              {eventList}
            </Col>
          </Row>
        </Container>
      </>
    )
  }
}
