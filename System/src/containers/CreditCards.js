import React, { Component } from "react";
import { Form, FormGroup, FormControl, FormLabel, Table, Button, Col, Row } from "react-bootstrap";
import { withRouter } from 'react-router';
import "./Login.css";

class CreditCards extends Component {
  constructor(props) {
    super(props);

    this.api = 'http://localhost:3500/api/creditCards/';

    this.state = {
        id: 0,
        firstName: "",
        lastName: "",
        cardNumber: "",
        expMonth: "",
        expYear: "",
        securityCode: "",

        cards: []
    };
  }

  componentDidMount() {
    this.fetchData();    
  }

  validateForm() {
    console.log(this.state)

    return this.state.firstName.length > 0
    && this.state.lastName.length > 0
    && this.state.cardNumber.length > 4 && this.state.cardNumber > 0
    
    && this.state.expMonth > 0 && this.state.expMonth < 13
    && this.state.expYear.length === 2 && this.state.expYear > 0
    && this.state.securityCode.length === 3 && this.state.securityCode > 0
    ;
    
  }

  handleChange = event => {
    this.setState({
      [event.target.id]: event.target.value
    });
  }

  handleSubmit = event => {
    event.preventDefault();
  }
////////////////////////////////////
  clearCard()
  {
    this.setState({
      id: 0,
      firstName: "",
      lastName: "",
      cardNumber: "",
      expMonth: "",
      expYear: "",
      securityCode: "",
    });
  }

  //List!!
  fetchData() {
    this.setState({cards: []});

    fetch(this.api)
    .then(response => response.json())
    .then(cards => this.setState({cards}))
    .catch(error => console.log('parsing failed', error))
  }

  //CREATE - UPDATE
  handleSubmit = event => {
    event.preventDefault();

    const fetchData = this.fetchData.bind(this);
    const clearCard = this.clearCard.bind(this);

    let card = {
        user: 1,//TODO change by the user sesson ID
        firstName: this.state.firstName,
        lastName: this.state.lastName,
        cardNumber: this.state.cardNumber,
        expMonth: this.state.expMonth,
        expYear: this.state.expYear,
        securityCode: this.state.securityCode,
    }    
    fetch(this.api + ((this.state.id > 0) ? this.state.id : ''), {
      method: (this.state.id > 0) ? 'PUT' : 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(card)
    }).then(function(response) {
      console.log(response);
      fetchData();
      clearCard();
    }).catch(function(error) {
      console.log(error);
    });    
  }

  //Select
  selectCard(id)
  {
    this.clearCard();

    fetch(this.api + id)
    .then(response => response.json())
    .then(card => this.setState({
      id: id,
      firstName: card.firstName,
      lastName: card.lastName,
      cardNumber: card.cardNumber,
      expMonth: card.expMonth,
      expYear: card.expYear.toString(),
      securityCode: card.securityCode.toString(),
    }))
    .catch(error => console.log('parsing failed', error))
  }

  //Delete
  deleteCard() {
    const fetchData = this.fetchData.bind(this);

    fetch(this.api + this.state.id, {
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
//////////////////////////////////  

  addCreditCard(props) {

    var isCreation = this.state.id <= 0;

    return (
      <Form onSubmit={this.handleSubmit}>
        <FormGroup controlId="firstName">
            <FormLabel >First Name</FormLabel >
            <FormControl
              autoFocus
              type="text"
              value={this.state.firstName}
              onChange={this.handleChange}
            />
          </FormGroup>
          <FormGroup controlId="lastName">
            <FormLabel >Last Name</FormLabel >
            <FormControl
              autoFocus
              type="text"
              value={this.state.lastName}
              onChange={this.handleChange}
            />
          </FormGroup>
          <FormGroup controlId="cardNumber">
            <FormLabel >Card Number</FormLabel >
            <FormControl
              value={this.state.cardNumber}
              onChange={this.handleChange}
              type="number"
            />
          </FormGroup>
          <FormLabel >Expiration Date (Month / Year)</FormLabel >
          <Form.Row>
              <Form.Group as={Col} controlId="expMonth">
                <Form.Control value={this.state.expMonth} onChange={this.handleChange} type="number" />
              </Form.Group>
              <Form.Group as={Col} controlId="expYear">
                <Form.Control value={this.state.expYear} onChange={this.handleChange} type="number" />
              </Form.Group>
          </Form.Row>
          <FormGroup controlId="securityCode">
            <FormLabel >Security Code</FormLabel >
            <Row>
            <Col  s={6}>
            <FormControl
              value={this.state.securityCode}
              onChange={this.handleChange}
              type="number"
            />
            </Col>
            </Row>
          </FormGroup>

          <Button 
            disabled={!this.validateForm()}
            type="submit"
          >
          {isCreation ? "Add" : "Update"}
          </Button>
          {!isCreation && <Button onClick={this.deleteCard.bind(this)}>Delete</Button>}
          {!isCreation && <Button onClick={this.clearCard.bind(this)}>Cancel</Button>}
      </Form>
    );
  }

  showCreditCards() {
    return (
      <Table striped bordered hover size="sm">
        <thead>
          <tr>
            <th>Name</th>
            <th>Number</th>
            <th>Date</th>
            <th></th>
          </tr>
        </thead>
        <tbody>            
          {this.state.cards.map((card) => <CreditCardItem key={card.id} card={card} onClick={this.selectCard.bind(this)} />)}
        </tbody>
      </Table>
    );
  }


  render() {
    return (
      <div className="Login">
        {this.addCreditCard()}
        <br /><br />
        {this.showCreditCards()}
      </div>
    );
  }
}

class CreditCardItem extends Component {
  constructor(props) {
    super(props);

    this.onClick = this.onClick.bind(this);

    this.state = {
        id: props.card.id,
        firstName: props.card.firstName,
        lastName: props.card.lastName,
        cardNumber: props.card.cardNumber,
        expMonth: props.card.expMonth,
        expYear: props.card.expYear,
    };
  }

  onClick(id){
      this.props.onClick(id);
  }

  render() {
    return (
      <tr>
        <th>{this.state.firstName} {this.state.lastName} </th>
        <th>{this.state.cardNumber}</th>
        <th>{this.state.expMonth}/{this.state.expYear}</th>
        <th>
        <Button onClick={this.onClick.bind(this, this.state.id)}>Edit</Button>
        </th>
      </tr>
    );
  }
}

export default withRouter(CreditCards);