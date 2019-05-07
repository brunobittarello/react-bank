import React, { Component } from "react";
import { Nav, Navbar } from "react-bootstrap";
import Routes from "./Routes";
import { LinkContainer } from "react-router-bootstrap";
import "./App.css";

class App extends Component {
  render() {
    return (
    <div>
      <Navbar className="navbar navbar-default navbar-static-top">
          <LinkContainer to="/">
            <Navbar.Brand className="nav navbar-brand">Bank-Home</Navbar.Brand>
          </LinkContainer>
          <Nav className="mr-auto">
            <LinkContainer to="/signup">
              <Nav.Link className="nav navbar-nav">Signup</Nav.Link>
            </LinkContainer>
            <LinkContainer to="/login">
              <Nav.Link className="nav navbar-nav">Login</Nav.Link>
            </LinkContainer>
            <LinkContainer to="/contacts">
              <Nav.Link className="nav navbar-nav">Contacts</Nav.Link>
            </LinkContainer>
            <LinkContainer to="/cards">
              <Nav.Link className="nav navbar-nav">Credit Cards</Nav.Link>
            </LinkContainer>
            <LinkContainer to="/history">
              <Nav.Link className="nav navbar-nav">History</Nav.Link>
            </LinkContainer>
            <LinkContainer to="/transfer">
              <Nav.Link className="nav navbar-nav">Transfer</Nav.Link>
            </LinkContainer>
          </Nav>
        </Navbar>      
      <Routes />
    </div>
    );    
  }
}

export default App;
