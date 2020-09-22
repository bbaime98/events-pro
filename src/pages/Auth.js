import React, {Component} from "react"
import {Form, FormGroup, Label, Input, Container, Row, Col} from "reactstrap"
import "./auth.css"

class Signup extends Component {
  constructor(props) {
    super(props)
    this.emailEl = React.createRef()
    this.passwordEl = React.createRef()
  }
  state = {
    isLogin: true,
  }
  submitHandler = (event) => {
    event.preventDefault()
    const email = this.emailEl.current.value
    const password = this.passwordEl.current.value

    if (email.trim().length === 0 || password.trim().length === 0) {
      return
    }

    let requestBody = {
      query: `
      query {
        login(email: "${email}", password: "${password}"){
            userId, token, tokenExpiration
        }
      }
      `,
    }
    if (!this.state.isLogin) {
      requestBody = {
        query: `
      mutation{
        createUser(userInput: {email: "${email}", password: "${password}"}){
          _id, email
        }
      }
      `,
      }
    }

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
        console.log("DATATA", resData)
      })
      .catch((err) => {
        console.log(err)
      })
  }

  switchAuthHandler = () => {
    this.setState((prevState) => {
      return {isLogin: !prevState.isLogin}
    })
  }
  render() {
    return (
      <Container className="mt-5">
        <Row>
          <Col lg="4" sm="0" />
          <Col xs="12" lg="5" className="shadow-lg">
            <Form onSubmit={this.submitHandler}>
              <FormGroup className="mt-4">
                <Label for="exampleEmail">Email</Label>
                <Input
                  type="email"
                  name="email"
                  id="exampleEmail"
                  placeholder="Enter email"
                  innerRef={this.emailEl}
                />
              </FormGroup>
              <FormGroup>
                <Label for="examplePassword">Password</Label>
                <Input
                  type="password"
                  name="password"
                  id="examplePassword"
                  placeholder="Enter password"
                  innerRef={this.passwordEl}
                />
              </FormGroup>
              <div className="text-right buttons mb-4">
                <button type="submit">
                  {this.state.isLogin ? "Login" : "Signup"}
                </button>
                <button
                  className="button-2"
                  type="button"
                  onClick={this.switchAuthHandler}
                >
                  {this.state.isLogin ? "Signup" : "Login"} instead
                </button>
              </div>
            </Form>
          </Col>
          <Col lg="4" sm="0" />
        </Row>
      </Container>
    )
  }
}

export default Signup
