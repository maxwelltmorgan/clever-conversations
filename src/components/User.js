import React, { Component } from 'react';

export class User extends Component {
  constructor(props) {
    super(props);
      this.signIn = this.signIn.bind(this);
      this.signOut = this.signOut.bind(this);
  }

  componentDidMount() {
    this.props.firebase.auth().onAuthStateChanged( user => {
      this.props.setUser(user);
    });
}

  signIn(e) {
    e.preventDefault();
    const provider = new this.props.firebase.auth.GoogleAuthProvider();
    this.props.firebase.auth().signInWithPopup( provider );
  }

  signOut(e) {
    e.preventDefault();
    this.props.firebase.auth().signOut();
    alert("Goodbye!");
  }

  render() {
    return (
      <section className="auth-buttons">
        <div className="username-display">
          <h3>Welcome, </h3>
          <h3> {this.props.user === null ? "Guest" : this.props.user.displayName} </h3>
        </div>
        <div className="sign-in">
          <button id="sign-in-button" onClick={this.signIn}>Sign In</button>
        </div>
        <div className="sign-out">
          <button id="sign-in-button" onClick={this.signOut}>Sign Out</button>
        </div>
      </section>
    )
  }
}

export default User;
