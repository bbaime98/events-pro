import React, {Component} from "react"
import AuthContext from "../context/authContext"
import Spinner from "../components/spinner/spinner"
import BookingList from "../components/bookings/BookingList"
import BookingsChart from "../components/bookings/BookingsChart"
import BookingsTabs from "../components/bookings/BookingsTabs"

export default class Booking extends Component {
  state = {
    isLoading: false,
    bookings: [],
    outputType: "list",
  }
  static contextType = AuthContext
  componentDidMount() {
    this.fetchBookings()
  }

  fetchBookings = () => {
    this.setState({isLoading: true})
    const requestBody = {
      query: `
        query{
          bookings{
            _id,
            createdAt
            event{
              _id
              title,
              date
              price
            }
          }
        }`,
    }

    fetch("https://events-pro.herokuapp.com/graphql", {
      method: "POST",
      body: JSON.stringify(requestBody),
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + this.context.token,
      },
    })
      .then((res) => {
        if (res.status !== 200 && res.status !== 201) {
          throw new Error("Failed")
        }
        return res.json()
      })
      .then((resData) => {
        const bookings = resData.data.bookings
        this.setState({bookings, isLoading: false})
      })
      .catch((err) => {
        console.log(err)
        this.setState({isLoading: false})
      })
  }

  onCancelHandler = (bookingId) => {
    this.setState({isLoading: true})
    const requestBody = {
      query: `
        mutation CancelBooking($id: ID!){
          cancelBooking(bookingId: $id){
            _id,
            title
          }
        }`,
      variables: {
        id: bookingId,
      },
    }

    fetch("https://events-pro.herokuapp.com/graphql", {
      method: "POST",
      body: JSON.stringify(requestBody),
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + this.context.token,
      },
    })
      .then((res) => {
        if (res.status !== 200 && res.status !== 201) {
          throw new Error("Failed")
        }
        return res.json()
      })
      .then((resData) => {
        this.setState((prevState) => {
          const updatedBookings = prevState.bookings.filter((booking) => {
            return booking._id !== bookingId
          })
          return {bookings: updatedBookings, isLoading: false}
        })
      })
      .catch((err) => {
        console.log(err)
        this.setState({isLoading: false})
      })
  }

  switchTabHandler = (outputType) => {
    if (outputType === "list") {
      this.setState({outputType: "list"})
    } else {
      this.setState({outputType: "chart"})
    }
  }
  render() {
    let content = (
      <div className="text-center mt-5">
        <Spinner />
      </div>
    )
    if (!this.state.isLoading) {
      return (
        <>
          {/* <h2 className="text-center" style={{color: "rgb(3, 62, 73)"}}>
            Your Bookings
          </h2>

          <BookingList
            bookings={this.state.bookings}
            onCancel={this.onCancelHandler}
          /> */}
          <BookingsTabs
            switchTabHandler={this.switchTabHandler}
            tab={this.state.outputType}
          />
          <div>
            {this.state.outputType === "list" ? (
              <BookingList
                bookings={this.state.bookings}
                onCancel={this.onCancelHandler}
              />
            ) : (
              <BookingsChart bookings={this.state.bookings} />
            )}
          </div>
        </>
      )
    }
    return <>{content}</>
  }
}
