import React, { Component } from 'react';
import './App.css';
import * as firebase from 'firebase';
//import { PageHeader } from 'react-bootstrap';
import { RoomList } from './components/RoomList.js';
import { MessageList } from './components/MessageList.js';
import { User } from './components/User.js';
import { Grid, Row, Col, Navbar, Jumbotron } from 'react-bootstrap';


var config = {
  apiKey: "AIzaSyAo-mQyLTG0VmhZL5VmzH24qlrTok-5FaA",
  authDomain: "bloc-chat-react-15e76.firebaseapp.com",
  databaseURL: "https://bloc-chat-react-15e76.firebaseio.com",
  projectId: "bloc-chat-react-15e76",
  storageBucket: "bloc-chat-react-15e76.appspot.com",
  messagingSenderId: "793913339865"
};
firebase.initializeApp(config);

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {activeRoom: "", user: ""};
    this.activeRoom = this.activeRoom.bind(this);
    this.setUser = this.setUser.bind(this);
  }

setUser(user) {
  this.setState({ user: user });
}

activeRoom(room) {
  this.setState({ activeRoom: room });
}

  render() {
    const showMessages = this.state.activeRoom;
    const currentUser = this.state.user === null ? "Guest" : this.state.user.displayName;

    return (
      <section className="page container">
        <Jumbotron bsClass="jumbotron">
          <h1>clever conversations</h1>
          <p>Sign in up top. Select a room or create a new one.  Start a lively exchange.</p>
        </Jumbotron>
        <Navbar inverse fixedTop>
          <Navbar.Brand>
            <div>
              <img src='assets/message.png' alt='logo' className='logo' height='150'/>
            </div>
          </Navbar.Brand>
          <Navbar.Text>
            <User firebase={firebase} setUser={this.setUser} welcome={currentUser} />
          </Navbar.Text>
        </Navbar>
        <Grid fluid className="grid">
          <Row className="content">
            <Col sm={3} className="aside">
              <RoomList firebase={firebase} activeRoom={this.activeRoom}/>
            </Col>
            <Col sm={9} className="main">

              <h1>{this.state.activeRoom.title || "Select Room"}</h1>
              { showMessages ?
                <MessageList firebase={firebase} activeRoom={this.state.activeRoom.key} user={this.state.user.displayName} />
                : null
              }
            </Col>
          </Row>
        </Grid>
      </section>
    );
  }
}

export default App;
