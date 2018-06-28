import React, { Component } from 'react';
import { Button } from 'react-bootstrap';
import '.././styles/User.css';

export class User extends Component {
  constructor(props) {
    super(props);
    this.signIn = this.signIn.bind(this);
    this.signOut = this.signOut.bind(this);
  }

signIn() {
  const provider = new this.props.firebase.auth.GoogleAuthProvider();
  this.props.firebase.auth().signInWithPopup(provider).then((result) => {
    const user = result.user;
    this.props.setUser(user);
  });
}

signOut() {
  this.props.firebase.auth().signOut().then(() => {
    this.props.setUser("");
  });
  alert("Goodbye!");
}

componentDidMount() {
  this.props.firebase.auth().onAuthStateChanged(user => {
    this.props.setUser(user);
  });
}

  render() {
    return(
      <div className="log">
        <p>{this.props.welcome}</p>
        { this.props.welcome === "Guest" ?
          <Button bsStyle="danger" bsSize="small" onClick={this.signIn}>Sign In</Button>
          :
          <Button bsStyle="primary" bsSize="small" onClick={this.signOut}>Sign Out</Button>
        }
      </div>
    )
  }
}
