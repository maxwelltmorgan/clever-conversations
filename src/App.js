import React, { Component } from 'react';
import './App.css';
import * as firebase from 'firebase';
import { RoomList } from './components/RoomList.js';


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
  render() {
    return (
      <section id='page'>
        <header>
          <h1>Blah Blah</h1>
        </header>
        <nav>
          <h2>Chat Rooms</h2>
          <RoomList firebase={ firebase }/>
        </nav>
        <main>
        </main>
        <footer>
        </footer>
      </section>
    );
  }
}

export default App;
