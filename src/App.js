import React, { Component } from 'react';
import './App.css';
import * as firebase from 'firebase';
import { RoomList } from './components/RoomList.js';
import { MessageList } from './components/MessageList.js';


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
    super();
    this.state = {
      activeRoom: null,
      activeRoomName: null,
    }
  }

  handleRoomClick(e) {
    this.setState({
      activeRoom: e.target.className,
      activeRoomName: e.target.dataset.name
    });
  }

  render() {
    return (
      <section id='page'>
        <header>
          <h1>Blah Blah</h1>
        </header>
        <nav>
          <h2>Chat Rooms</h2>
          <RoomList
            firebase={ firebase }
            activeRoom = {this.state.activeRoom}
            activeRoomName = {this.state.activeRoomName}
            handleRoomClick = {(e) => this.handleRoomClick(e)}
          />
        </nav>
        <main>
          <MessageList
            firebase={ firebase }
            activeRoom={this.state.activeRoom}
            activeRoomName={this.state.activeRoomName}
          />
        </main>
        <footer>
        </footer>
      </section>
    );
  }
}

export default App;
