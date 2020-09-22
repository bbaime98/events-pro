import React, {useState} from "react"
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
} from "reactstrap"
import {NavLink} from "react-router-dom"
import "./navbar.css"
import AuthContext from "../../context/authContext"

const NavBar = (props) => {
  const [collapsed, setCollapsed] = useState(true)

  const toggleNavbar = () => setCollapsed(!collapsed)

  return (
    <AuthContext.Consumer>
      {(context) => {
        return (
          <div>
            <Navbar className="navbar" light>
              <NavbarBrand href="/" className="mr-auto ml-5 text-white">
                <h2> Event Pro</h2>
              </NavbarBrand>
              <NavbarToggler
                onClick={toggleNavbar}
                className="mr-2 text-center"
              />
              <Collapse isOpen={!collapsed} navbar>
                <Nav navbar className="text-center">
                  {!context.token && (
                    <NavItem>
                      <NavLink className="nav-item" to="/auth">
                        Home
                      </NavLink>
                    </NavItem>
                  )}
                  <NavItem>
                    <NavLink className="nav-item" to="/events">
                      Events
                    </NavLink>
                  </NavItem>
                  {context.token && (
                    <>
                      <NavItem>
                        <NavLink className="nav-item" to="/bookings">
                          Bookings
                        </NavLink>
                      </NavItem>
                      <NavItem
                        onClick={context.logout}
                        style={{cursor: "pointer"}}
                      >
                        Logout
                      </NavItem>
                    </>
                  )}
                </Nav>
              </Collapse>
            </Navbar>
          </div>
        )
      }}
    </AuthContext.Consumer>
  )
}

export default NavBar
