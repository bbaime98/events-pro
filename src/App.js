import React, {Component} from "react"
import {BrowserRouter, Route, Switch, Redirect} from "react-router-dom"
import AuthPage from "./pages/Auth"
import BookingsPage from "./pages/Bookings"
import EventsPage from "./pages/Events"
import NavBar from "./components/navbar/NavBar"

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <NavBar />
        <Switch>
          <Redirect from="/" to="/auth" exact />
          <Route path="/auth" component={AuthPage} />
          <Route path="/bookings" component={BookingsPage} />
          <Route path="/events" component={EventsPage} />
        </Switch>
      </BrowserRouter>
    )
  }
}

export default App
