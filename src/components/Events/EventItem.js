import React from "react"
import {Col, Card} from "reactstrap"

export default function EventItem(props) {
  return (
    <Col lg="4">
      <Card className="card_conatiner">
        <div className="pl-3">
          <h5 className="event-title">{props.title}</h5>
          <h4 className="event-price">${props.price}</h4>
          <h4 className="event-price">
            {new Date(props.date).toLocaleDateString()}
          </h4>
        </div>
        <div className="pl-3 events_actions">
          {props.userId === props.creatorId ? (
            <p>you are the owner</p>
          ) : (
            <button
              className="button-event"
              onClick={props.viewDetails.bind(this, props.eventId)}
            >
              View Details
            </button>
          )}
        </div>
      </Card>
    </Col>
  )
}
