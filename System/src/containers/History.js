import React, { Component } from "react";
import { Button, ListGroup } from "react-bootstrap";
import { withRouter } from 'react-router';
import "./Login.css";

class History extends Component {
  constructor(props) {
    super(props);

    this.state = {
        dateFilter: 0,
        list: []
    };
  }

  componentDidMount() {
    this.fetchTransfers();    
  }

//////////////////////////////////////////////
  //Get Conctacts!!
  fetchTransfers() {
    fetch('http://localhost:3500/api/transference/selectByUser/' + 1)//TODO change by the user sesson ID
    .then(response => response.json())
    .then(list => this.setState({list}))
    .catch(error => console.log('parsing failed', error))
  }
  ////////////////////


  showButtons() {
      return (
          <div className='div-alin text-center'>
              <Button node="a" waves="light"  style={{marginRight: '5px'}}>
                    7 Days
              </Button>
              <Button node="a" waves="light"  style={{marginRight: '5px'}}>
                    15 Days
              </Button>
              <Button node="a" waves="light"  style={{marginRight: '5px'}}>
                    30 Days
              </Button>
          </div>
      )
  }

  showHistory() {
    
    return (
      <ListGroup>
        {Array.isArray(this.state.list) && this.state.list.map((transf) =>  
          <ListGroup.Item key={transf.id}>
            {'Sent ' + transf.amount + ' to ' + ((transf.Contact != null) ? transf.Contact.name : 'Unknown') + ' at ' + new Date(transf.createdAt).toDateString()}
          </ListGroup.Item>
        )}
      </ListGroup>
    );
  }

  render() {
    return (
      <div className="Login">
        {this.showButtons()}
        {this.showHistory()}
      </div>
    );
  }
}

export default withRouter(History);