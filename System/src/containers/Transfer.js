import React, { Component } from "react";
import { FormGroup, FormControl, FormLabel, Button } from "react-bootstrap";
import { withRouter } from 'react-router';
import "./Login.css";

class Transfer extends Component {
  constructor(props) {
    super(props);

    this.state = {
        contactId: 0,
        amount: 0,
        password: "",

        contacts: []
    };
  }

  componentDidMount() {
    this.fetchContacts();    
  }

  validateForm() {
    return this.state.contactId > 0
    && this.state.amount > 0
    && (this.state.amount < 1000 || this.state.password.length > 3)
    ;
  }

  handleChange = event => {
    this.setState({
      [event.target.id]: event.target.value
    });
  }

  change (event){
    this.setState({contactId: event.target.value});
  }

  contactOptions() {
    return(
       <option value="3">Option 3</option>
    )
  }

  clearTransfer() {
    this.setState({
      contactId: 0,
      amount: 0,
      password: "",
    });
  }

  //////////////////////////////////////////////
  //Get Conctacts!!
  fetchContacts() {
    this.setState({contacts: []});

    fetch('http://localhost:3500/api/contacts/')
    .then(response => response.json())
    .then(contacts => this.setState({contacts}))
    .catch(error => console.log('parsing failed', error))
  }

  handleSubmit = event => {
    event.preventDefault();

    const clearTransfer = this.clearTransfer.bind(this);

    let transfer = {
        userId: 1,//TODO change by the user sesson ID
        contact: this.state.contactId,
        amount: this.state.amount,
        password: this.state.password
    } 

    fetch('http://localhost:3500/api/transference', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(transfer)
    })
    .then(response => response.json())
    .then(function(response) {
      console.log(response);

      var { error } = response;
      if (error != null)
        alert(error);//TODO Change this warning
      else
        clearTransfer();
    }).catch(function(error) {
      console.log(error);
    });    
  }

  ////////////////////

  transfForm(props) {
    return (
        <form onSubmit={this.handleSubmit}>
        <FormGroup controlId="contactId">
            <FormLabel >Contact</FormLabel >
            <FormControl as="select" className="browser-default" value={this.state.contactId}  onChange={this.change.bind(this)}>
                <option value="">Contact...</option>
                {this.state.contacts.map((contact) =>  <option key={contact.id} value={contact.id}>{contact.name}</option> )}
            </FormControl>
          </FormGroup>
          <FormGroup controlId="amount">
            <FormLabel >Amount</FormLabel >
            <FormControl
              value={this.state.amount}
              onChange={this.handleChange}
              type="number"
            />
          </FormGroup>
          <FormGroup controlId="password" style={{display: this.state.amount > 1000 ? 'block' : 'none' }}>
            <FormLabel >Password</FormLabel >
            <FormControl
              value={this.state.password}
              onChange={this.handleChange}
              type="password"
            />
          </FormGroup>
          <Button
            disabled={!this.validateForm()}
            type="submit"
          >
            Transfer
          </Button>
        </form>
    );
  }

  render() {
    return (
      <div className="Login">
        {this.transfForm()}
      </div>
    );
  }
}

export default withRouter(Transfer);