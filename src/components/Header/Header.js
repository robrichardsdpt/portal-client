import React, { Fragment } from 'react'
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'

import './header.styles.scss'

const authenticatedOptions = (
  <Fragment>
    <Nav.Link href="#home">Chat</Nav.Link>
    <Nav.Link href="#feed">Feed</Nav.Link>
    <Nav.Link href="#profile">Profile</Nav.Link>
    <Nav.Link href="#sign-out">Sign Out</Nav.Link>
  </Fragment>
)

const unauthenticatedOptions = (
  <Fragment>
    <Nav.Link href="#sign-up">Sign Up</Nav.Link>
    <Nav.Link href="#sign-in">Sign In</Nav.Link>
  </Fragment>
)

const Header = ({ user }) => {
  return (
    <Navbar className='navbar' expand="md">
      <Navbar.Brand href="#">
        employee portal
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="ml-auto">
          { user && <span className="navbar-text mr-2">Welcome, {user.email}</span>}
          { user ? authenticatedOptions : unauthenticatedOptions }
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  )
}

export default Header
