import React, { Component } from "react";
import "./Home.css";

export default class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      balance: 0,
    };
  }

  componentDidMount() {
    this.fetchUser();    
  }

  fetchUser()
  {
    fetch('http://localhost:3500/api/user/' + 1)//TODO change by the user sesson ID
    .then(response => response.json())
    .then(list => this.setState({balance: list.balance}))
    .catch(error => console.log('parsing failed', error))
  }

  render() {
    return (
      <div className="Home">
        <div className="lander">
          <h2>Your Balance</h2>
          <h3>$ {this.state.balance}</h3>
        </div>
      </div>
    );
  }
}
