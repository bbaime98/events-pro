import React, {Component} from "react"
import {
  Form,
  FormGroup,
  Label,
  Input,
  Container,
  Row,
  Col,
  Spinner,
} from "reactstrap"
import "./auth.css"
import AuthContext from "../context/authContext"
import image from "../event.jpg"

class Signup extends Component {
  state = {
    isLogin: true,
    signedUp: false,
    loading: false,
    isEmpty: false,
  }

  static contextType = AuthContext

  constructor(props) {
    super(props)
    this.emailEl = React.createRef()
    this.passwordEl = React.createRef()
  }
  submitHandler = (event) => {
    event.preventDefault()
    // this.setState({loading: true})
    const email = this.emailEl.current.value
    const password = this.passwordEl.current.value

    if (email.trim().length === 0 || password.trim().length === 0) {
      this.setState({isEmpty: true})
      return
    }
    this.setState({loading: true, isEmpty: false})

    let requestBody = {
      query: `
      query LoginQuery($email: String!, $password: String!){
        login(email: $email, password: $password){
            userId, token, tokenExpiration
        }
      }
      `,
      variables: {
        email: email,
        password: password,
      },
    }
    if (!this.state.isLogin) {
      requestBody = {
        query: `
      mutation CreateUserMutation($email: String!, $password: String!){
        createUser(userInput: {email: $email, password: $password}){
          _id, email
        }
      }`,
        variables: {
          email: email,
          password: password,
        },
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
        if (resData.data.createUser && resData.data.createUser._id) {
          this.setState({signedUp: true, loading: false})
        }
        if (resData.data && resData.data.login.token) {
          this.context.login(
            resData.data.login.token,
            resData.data.login.userId,
            resData.data.login.tokenExpiration
          )
        }
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
      <>
        <Container className="mt-5 ">
          <Row>
            {/* <div className="backgroud-image"></div> */}
            <Col lg="7" sm="0" className="mt-5">
              <div>
                <h1 style={{color: "rgb(6, 158, 218)"}}>CREATE AND</h1>
                <h1 style={{color: "rgb(241, 7, 85)"}}>SHARE YOUR</h1>
                <h1 style={{color: "rgb(3, 62, 73)"}}>EVENTS EASILY</h1>
              </div>
            </Col>
            {/* <Col lg="4" sm="0" /> */}
            <Col xs="12" lg="5" className="shadow-lg form_container mt-5">
              <Form onSubmit={this.submitHandler}>
                {!this.state.isLogin ? (
                  <FormGroup className="mt-4">
                    <Label for="exampleEmail">Full Name</Label>
                    <Input
                      type="text"
                      name="name"
                      placeholder="Enter full name"
                      // innerRef={this.emailEl}
                    />
                  </FormGroup>
                ) : (
                  ""
                )}
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
                {this.state.signedUp && (
                  <div className="text-success mb-1">
                    Account Created, Now login
                  </div>
                )}
                {this.state.isEmpty && (
                  <div className="text-danger mb-1">
                    Please fill in all fields
                  </div>
                )}
                <div className="text-right buttons mb-4">
                  <button type="submit">
                    {this.state.isLogin ? "Login" : "Signup"}
                    {this.state.loading ? (
                      <Spinner size="sm" style={{color: "rgb(3, 62, 73)"}} />
                    ) : (
                      ""
                    )}
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
          </Row>
        </Container>
        {/* </div> */}
      </>
    )
  }
}

export default Signup
