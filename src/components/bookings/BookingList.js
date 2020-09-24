import React from "react"
import {Container, Row, Col} from "reactstrap"
import "./bookingList.css"

const BookingList = (props) => {
  return (
    <Container>
      <Row>
        <Col lg="3" sm="0" />
        <Col lg="6">
          <ul className="bookings-list">
            {props.bookings.map((booking) => {
              return (
                <li className="bookings-item" key={booking._id}>
                  <div className="bookings-item-data">
                    {booking.event.title} -
                    {new Date(booking.createdAt).toLocaleDateString()}
                  </div>
                  <div>
                    <button
                      className="booking-item-button"
                      onClick={props.onCancel.bind(this, booking._id)}
                    >
                      Cancel
                    </button>
                  </div>
                </li>
              )
            })}
          </ul>
        </Col>
        <Col lg="3" sm="0" />
      </Row>
    </Container>
  )
}

export default BookingList
