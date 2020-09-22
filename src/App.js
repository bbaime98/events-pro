import React, {Component} from "react"
import {BrowserRouter, Route, Switch, Redirect} from "react-router-dom"
import AuthPage from "./pages/Auth"
import BookingsPage from "./pages/Bookings"
import EventsPage from "./pages/Events"
import NavBar from "./components/navbar/NavBar"
import AuthContext from "./context/authContext"

class App extends Component {
  state = {
    token: null,
    userId: null,
  }
  login = (token, userId, tokenExpiration) => {
    this.setState({token, userId})
  }
  logout = () => {
    this.setState({token: null, userId: null})
  }
  render() {
    return (
      <BrowserRouter>
        <AuthContext.Provider
          value={{
            token: this.state.token,
            userId: this.state.userId,
            login: this.login,
            logout: this.logout,
          }}
        >
          <NavBar />
          <Switch>
            {this.state.token && <Redirect from="/" to="/events" exact />}
            {this.state.token && <Redirect from="/auth" to="/events" exact />}
            {!this.state.token && <Route path="/auth" component={AuthPage} />}
            {this.state.token && (
              <Route path="/bookings" component={BookingsPage} />
            )}
            <Route path="/events" component={EventsPage} />
            {!this.state.token && <Redirect to="/auth" exact />}
          </Switch>
        </AuthContext.Provider>
      </BrowserRouter>
    )
  }
}

export default App
