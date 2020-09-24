import React from "react"
import "./BookingsTabs.css"

export default function BookingsTabs(props) {
  return (
    <div className="tabs-buttons mt-5 mb-5">
      <button
        className={props.tab === "list" ? "activeTab" : ""}
        onClick={props.switchTabHandler.bind(this, "list")}
      >
        Bookings List
      </button>
      <button
        className={props.tab === "chart" ? "activeTab" : ""}
        onClick={props.switchTabHandler.bind(this, "chart")}
      >
        Chart
      </button>
    </div>
  )
}
