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
import EventLists from "../components/Events/EventLists"
import Spinner from "../components/spinner/spinner"

export default class EventsPage extends Component {
  state = {
    showModal: false,
    events: [],
    isLoading: false,
    selectedEvent: null,
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
    this.setState({showModal: false, selectedEvent: null})
  }
  handleConfirm = () => {
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
            _id, title, date, description, price
          }
        }`,
    }

    const token = this.context.token
    fetch("http://localhost:7000/graphql", {
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
        // this.fetchEvents()
        this.setState((prevState) => {
          const updatedEvents = [...prevState.events]
          updatedEvents.push({
            _id: resData.data.createEvent._id,
            title: resData.data.createEvent.title,
            description: resData.data.createEvent.description,
            date: resData.data.createEvent.date,
            price: resData.data.createEvent.price,
            creator: {
              _id: this.context.userId,
            },
          })
          return {events: updatedEvents}
        })
      })
      .catch((err) => {
        console.log(err)
      })
    this.setState({showModal: false})
  }

  fetchEvents() {
    this.setState({isLoading: true})
    const requestBody = {
      query: `
        query{
          events{
            _id, title, date, description, price,creator{ _id, email}
          }
        }`,
    }

    const token = this.context.token
    fetch("http://localhost:7000/graphql", {
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
        this.setState({events, isLoading: false})
      })
      .catch((err) => {
        console.log(err)
        this.setState({isLoading: false})
      })
  }

  showDetailsHandler = (eventId) => {
    console.log("CLICKED__________", eventId)
    this.setState((prevState) => {
      const selectedEvent = prevState.events.find(
        (event) => event._id === eventId
      )
      return {selectedEvent: selectedEvent}
    })
  }

  bookEventHandler = () => {}
  render() {
    return (
      <>
        {(this.state.showModal || this.state.selectedEvent) && <Backdrop />}
        {this.state.showModal && (
          <Modal
            title="Add Event"
            canCancle
            canConfirm
            onCancle={this.handleCancel}
            onConfirm={this.handleConfirm}
            confirmText="Confirm"
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
        {this.state.selectedEvent && (
          <Modal
            title={this.state.selectedEvent.title}
            canCancle
            canConfirm
            onCancle={this.handleCancel}
            onConfirm={this.bookEventHandler}
            confirmText="Book Event"
          >
            <h4 className="event-price">${this.state.selectedEvent.price}</h4>
            <h4 className="event-price">
              {new Date(this.state.selectedEvent.date).toLocaleDateString()}
            </h4>
            <p>{this.state.selectedEvent.description}</p>
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
            <Col lg={this.context.token ? "1" : "2"} sm="0" />
            <Col lg="8" sm="0">
              {/* <ul className="events-lists">
                <li className="events-lists-item">Test</li>
                <li className="events-lists-item">Test</li>
              </ul> */}
              {/* <Row>{eventList}</Row> */}
              {this.state.isLoading ? (
                <div className="text-center">
                  <Spinner />
                </div>
              ) : (
                <EventLists
                  events={this.state.events}
                  authUserId={this.context.userId}
                  showDetails={this.showDetailsHandler}
                />
              )}
            </Col>
          </Row>
        </Container>
      </>
    )
  }
}
