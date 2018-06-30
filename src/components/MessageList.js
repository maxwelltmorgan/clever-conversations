import React, { Component } from 'react';
import { FormGroup, InputGroup, Button, FormControl } from 'react-bootstrap';
import '.././styles/MessageList.css';
import Moment from 'react-moment';

export class MessageList extends Component {
  constructor(props) {
    super(props);
      this.state = {
        username: "",
        content: "",
        sentAt: "",
        messages: [],
        toEdit: ""
      };
      this.handleChange = this.handleChange.bind(this);
      this.createMessage = this.createMessage.bind(this);
      this.editMessage = this.editMessage.bind(this);
      this.updateMessage = this.updateMessage.bind(this);
  }

  handleChange(e) {
    e.preventDefault();
    this.setState({
      username: this.props.user,
      content: e.target.value,
      sentAt: this.props.firebase.database.ServerValue.TIMESTAMP
    });
  }

  createMessage(e) {
    const messagesRef = this.props.firebase.database().ref("rooms/" + this.props.activeRoom + "/messages");
    e.preventDefault();
    messagesRef.push({
      username: this.state.username,
      content: this.state.content,
      sentAt: this.state.sentAt,
    });
    this.setState({ username: "", content: "", sentAt: "", roomId: "" });
  }

  editMessage(message) {
    const editMessage= (
      <form onSubmit={this.updateMessage}>
        <FormGroup>
          <InputGroup>
            <FormControl type="text" defaultValue={message.content} inputRef={(input) => this.input = input}/>
            <InputGroup.Button>
              <Button bsStyle="info" type="submit" alt="update">
                <i className="update">update</i>
              </Button>
              <Button bsStyle="link" type="button" alt="cancel" onClick={() => this.setState({toEdit: ""})}>
                <i className="cancel">cancel</i>
              </Button>
            </InputGroup.Button>
          </InputGroup>
        </FormGroup>
      </form>
    );
    return editMessage;
  }

  updateMessage(e) {
    e.preventDefault();
    const messagesRef = this.props.firebase.database().ref("rooms/" + this.props.activeRoom + "/messages");
    const updates = {[this.state.toEdit + "/content"]: this.input.value};
    messagesRef.update(updates);
    this.setState({ toEdit: ""});
  }

  componentDidMount() {
    const messagesRef = this.props.firebase.database().ref("rooms/" + this.props.activeRoom + "/messages");
    messagesRef.on('value', snapshot => {
      const messageChanges = [];
      snapshot.forEach((message) => {
          messageChanges.push({
            key: message.key,
            username: message.val().username,
            content: message.val().content,
            sentAt: message.val().sentAt
          });
      });
      this.setState({ messages: messageChanges})
    });
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.activeRoom !== this.props.activeRoom) {
      const messagesRef =  this.props.firebase.database().ref("rooms/" + nextProps.activeRoom + "/messages");
      messagesRef.on('value', snapshot => {
        let messageChanges = [];
        snapshot.forEach((message) => {
            messageChanges.push({
              key: message.key,
              username: message.val().username,
              content: message.val().content,
              sentAt: message.val().sentAt
            });
        });
        this.setState({ messages: messageChanges})
      });
    }
  }

  render() {
    const messageBar = (
      <form className="creat-message" onSubmit={this.createMessage}>
        <FormGroup>
          <InputGroup>
            <FormControl type="text" value={this.state.content} placeholder="enter message" onChange={this.handleChange}/>
            <InputGroup.Button>
              <Button bsStyle="primary" type="submit">send</Button>
            </InputGroup.Button>
          </InputGroup>
        </FormGroup>
      </form>
    );

    const messageList = (
      this.state.messages.map((message) =>
        <li className="message-box" key={message.key}>
          <h2 className="username">{message.username}</h2>
          {(this.state.toEdit === message.key) && (this.props.user === message.username) ?
            this.editMessage(message)
            :
            <div>
              <h3 className="message-content">{message.content}</h3>
              <Button className="edit-button" bsSize="xsmall" bsStyle="link" onClick={() => this.setState({toEdit: message.key})}>edit</Button>
              <Moment
               element="span"
               format="MM/DD/YY hh:mm A"
               className="msg-sent-at">
               {message.sentAt}
              </Moment>
            </div>
          }
        </li>
      )
    );

    return(
      <div>
        <ul className="messages">{messageList}</ul>
        <div>{messageBar}</div>
      </div>
    );
  }
}
