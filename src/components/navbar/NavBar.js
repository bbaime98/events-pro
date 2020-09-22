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

const NavBar = (props) => {
  const [collapsed, setCollapsed] = useState(true)

  const toggleNavbar = () => setCollapsed(!collapsed)

  return (
    <div>
      <Navbar className="navbar" light>
        <NavbarBrand href="/" className="mr-auto ml-5 text-white">
          <h2> Event Pro</h2>
        </NavbarBrand>
        <NavbarToggler onClick={toggleNavbar} className="mr-2" />
        <Collapse isOpen={!collapsed} navbar>
          <Nav navbar className="text-right">
            <NavItem>
              <NavLink className="nav-item" to="/auth">
                Auth
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink className="nav-item" to="/events">
                Events
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink className="nav-item" to="/bookings">
                Bookings
              </NavLink>
            </NavItem>
          </Nav>
        </Collapse>
      </Navbar>
    </div>
  )
}

export default NavBar
