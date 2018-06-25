import React, { Component } from 'react';
import './App.css';
import * as firebase from 'firebase';
import { RoomList } from './components/RoomList.js';
import { MessageList } from './components/MessageList.js';
import { User } from './components/User.js';


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
      <section id='page'>
        <header>
          <h1>Blah Blah</h1>
        </header>
        <nav>
          <RoomList firebase={firebase} activeRoom={this.activeRoom}/>
        </nav>
        <main>
          <User firebase={firebase} setUser={this.setUser} welcome={currentUser} />
          <h1>{this.state.activeRoom.title || "Select Room"}</h1>
          { showMessages ?
            <MessageList firebase={firebase} activeRoom={this.state.activeRoom.key} user={this.state.user.displayName} />
            : null
          }
        </main>
        <footer>
        </footer>
      </section>
    );
  }
}

export default App;
