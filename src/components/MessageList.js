import React, { Component } from 'react';

export class MessageList extends Component{
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      content: "",
      sentAt: "",
      roomId: "",
      messages: [],
    };


    this.messagesRef = this.props.firebase.database().ref('messages');
    this.handleChange = this.handleChange.bind(this);
    this.createMessage = this.createMessage.bind(this);
  }

  componentDidMount() {
    this.messagesRef.on('child_added', snapshot => {
      const message = snapshot.val();
      message.key = snapshot.key;
      this.setState({ messages: this.state.messages.concat( message ) });
    });
  }

  handleChange(e) {
    e.preventDefault();
    this.setState({
      username: this.props.user.displayName,
      content: e.target.value,
      sentAt: this.props.firebase.database.ServerValue.TIMESTAMP,
      roomId: this.props.activeRoom
    });
  }

  createMessage(e) {
    e.preventDefault();
    this.messagesRef.push({
      username: this.state.username,
      content: this.state.content,
      sentAt: this.state.sentAt,
      roomId: this.state.roomId
    });
    this.setState({ username: "", content: "", sentAt: "", roomId: "" });
  }


  render() {

    let activeMessages = this.state.messages.filter( message => message.roomId === this.props.activeRoom );

    return (
      <section className="message-list">
        <div className="messages">
          <form onSubmit={this.createMessage}>
            <input type="text" value={this.state.content} placeholder="Enter Message" onChange={this.handleChange}/>
            <input type="submit" value="Send"/>
          </form>
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
