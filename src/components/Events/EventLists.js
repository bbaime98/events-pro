import React from "react"
import {Row} from "reactstrap"
import EventItem from "./EventItem"

export default function EventLists(props) {
  const events = props.events.map((event) => {
    return (
      <EventItem
        eventId={event._id}
        key={event._id}
        title={event.title}
        price={event.price}
        date={event.date}
        userId={props.authUserId}
        creatorId={event.creator._id}
        viewDetails={props.showDetails}
      />
    )
  })
  return <Row>{events}</Row>
}
