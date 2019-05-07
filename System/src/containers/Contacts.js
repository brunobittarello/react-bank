import React, { Component } from "react";
import { Button, FormGroup, FormControl, FormLabel, Table } from "react-bootstrap";
import { withRouter } from 'react-router';
import "./Login.css";

class Contacts extends Component {
  constructor(props) {
    super(props);

    this.api = 'http://localhost:3500/api/contacts/';

    this.state = {
        id: 0,
        name: "",
        bankId: "",
        agency: "",
        account: "",
        email: "",
        contacts: []
    };
  }

  componentDidMount() {
    this.fetchData();    
  }

  validateForm() {
    return this.state.name.length > 0
    && this.state.bankId > 0
    && this.state.agency > 0
    && this.state.account > 0
    ;
  }

  handleChange = event => {
    this.setState({
      [event.target.id]: event.target.value
    });
  }

  clearContact()
  {
    this.setState({
      id: 0,
      name: "",
      bankId: "",
      agency: "",
      account: "",
      email: "",
    });
  }

  //List!!
  fetchData() {
    this.setState({contacts: []});

    fetch(this.api)
    .then(response => response.json())
    .then(contacts => this.setState({contacts}))
    .catch(error => console.log('parsing failed', error))
  }

  //CREATE - UPDATE
  handleSubmit = event => {
    event.preventDefault();

    const fetchData = this.fetchData.bind(this);
    const clearContact = this.clearContact.bind(this);

    let contact = {
        user: 1,//TODO change by the user sesson ID
        name: this.state.name,
        bank: this.state.bankId,
        agency: this.state.agency,
        account: this.state.account,
        email: this.state.email,
    }    
    fetch(this.api + ((this.state.id > 0) ? this.state.id : ''), {
      method: (this.state.id > 0) ? 'PUT' : 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(contact)
    }).then(function(response) {
      console.log(response);
      fetchData();
      clearContact();
    }).catch(function(error) {
      console.log(error);
    });    
  }

  //Select
  selectContact(id)
  {
    this.clearContact();

    fetch(this.api + id)
    .then(response => response.json())
    .then(contact => this.setState({
      id: id,
      name: contact.name,
      bankId: contact.bank,
      agency: contact.agency,
      account: contact.account,
      email: contact.email,
    }))
    .catch(error => console.log('parsing failed', error))
  }
  
  //Delete
  deleteContact() {
    const fetchData = this.fetchData.bind(this);

    fetch('http://localhost:3500/api/contacts/'+ this.state.id, {
      method: 'DELETE',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      }
    }).then(function(response) {
      fetchData();
    }).catch(function(error) {
      console.log(error);
    });
  }

  addContact(props) {

    var isCreation = this.state.id <= 0;

    return (
        <form onSubmit={this.handleSubmit}>
        <FormGroup controlId="name">
            <FormLabel >Name</FormLabel >
            <FormControl
              autoFocus
              type="text"
              value={this.state.name}
              onChange={this.handleChange}
            />
          </FormGroup>

          <FormGroup controlId="bankId">
            <FormLabel >Bank</FormLabel >
            <FormControl as="select" className="browser-default" value={this.state.bankId}  onChange={this.handleChange}>
                <option value="0">Bank...</option>
                <option value="1">Bank A</option>
                <option value="2">Bank B</option>
                <option value="3">Bank C</option>
            </FormControl>
          </FormGroup>

          <FormGroup controlId="agency">
            <FormLabel >Agency</FormLabel >
            <FormControl
              value={this.state.agency}
              onChange={this.handleChange}
              type="number"
            />
          </FormGroup>          

          <FormGroup controlId="account">
            <FormLabel >Account</FormLabel >
            <FormControl
              value={this.state.account}
              onChange={this.handleChange}
              type="number"
            />
          </FormGroup>

          <FormGroup controlId="email">
            <FormLabel >Email (Optional)</FormLabel >
            <FormControl
              autoFocus
              type="email"
              value={this.state.email}
              onChange={this.handleChange}
            />
          </FormGroup>          
          <Button 
            disabled={!this.validateForm()}
            type="submit"
          >
          {isCreation ? "Add" : "Update"}
          </Button>
          {!isCreation && <Button onClick={this.deleteContact.bind(this)}>Delete</Button>}
          {!isCreation && <Button onClick={this.clearContact.bind(this)}>Cancel</Button>}
        </form>
    );
  }

  showContacts() {
      return (
        <Table striped bordered hover size="sm">
          <thead>
            <tr>
              <th>Name</th>
              <th>Bank</th>
              <th>Agency</th>
              <th></th>
            </tr>
          </thead>
          <tbody>            
            {this.state.contacts.map((contact) => <ContactItem key={contact.id} contact={contact} onClick={this.selectContact.bind(this)} />)}
          </tbody>
        </Table>
      );
  }

  render() {
    return (
      <div className="Login">
        {this.addContact()}
        <br /><br />
        {this.showContacts()}
      </div>
    );
  }
}

class ContactItem extends Component {
  constructor(props) {
    super(props);

    this.onClick = this.onClick.bind(this);

    this.state = {
        id: props.contact.id,
        name: props.contact.name,
        bank: props.contact.bank,
        agency: props.contact.agency
    };
  }

  onClick(id){
      this.props.onClick(id);
  }

  render() {
    return (
      <tr>
        <th>{this.state.name}</th>
        <th>Bank {this.state.bank === 1 ? 'A' : this.state.bank === 2 ? 'B' : 'C'}</th>
        <th>{this.state.agency}</th>
        <th>
        <Button onClick={this.onClick.bind(this, this.state.id)}>Edit</Button>
        </th>
      </tr>
    );
  }
}

export default withRouter(Contacts);