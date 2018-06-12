import React, { Component } from 'react';

export class MessageList extends Component{
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      content: "",
      sentAt: "",
      roomId: "",
      messages: []
    };


    this.messagesRef = this.props.firebase.database().ref('messages');
  }

  componentDidMount() {
    this.messagesRef.on('child_added', snapshot => {
      const message = snapshot.val();
      message.key = snapshot.key;
      this.setState({ messages: this.state.messages.concat( message ) });
    });
  }


  render() {

    let activeMessages = this.state.messages.filter( message => message.roomId === this.props.activeRoom );

    return (
      <section className="message-list">
        <div className="active-room-name">
          <h3>{this.props.activeRoomName}</h3>
        </div>

        <div className="messages">
          <ul>
            {
              activeMessages.map( (message, index) =>
                <li key={message.key}>
                  <div>{message.content}</div>
                  <div>{message.username}</div>
                  <div>{message.sentAt}</div>
                </li>

              )
            }
          </ul>
        </div>

      </section>
    );
  }
}

export default MessageList
