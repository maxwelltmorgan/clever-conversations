import React, { Component } from 'react';
import { Button, FormGroup, InputGroup, FormControl } from 'react-bootstrap';
import '.././styles/RoomList.css';

export class RoomList extends Component {
  constructor(props) {
    super(props);
      this.state = {
        title: "",
        rooms: [],
        toEdit: ""
      };
      this.roomsRef = this.props.firebase.database().ref("rooms");
      this.handleChange = this.handleChange.bind(this);
      this.createRoom = this.createRoom.bind(this);
      this.editRoom = this.editRoom.bind(this);
      this.updateRoom = this.updateRoom.bind(this);
  }

  handleChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  createRoom(e) {
    e.preventDefault();
    this.roomsRef.push({ title: this.state.title });
    this.setState({ title: "" });
  }

  deleteRoom(roomKey) {
    const room = this.props.firebase.database().ref("rooms/" + roomKey);
    room.remove();
  }

  editRoom(room) {
    const editRoom = (
      <form onSubmit={this.updateRoom}>
        <FormGroup>
          <InputGroup>
            <FormControl type="text" defaultValue={room.title} ref={(input) => this.input = input}/>
            <InputGroup.Button>
              <Button bsStyle="info" type="submit" alt="update">
                <i className="edit">edit</i>
              </Button>
              <Button bsStyle="link" type="button" alt="cancel" onClick={() => this.setState({toEdit: ""})}>
                <i className="cancel">cancel</i>
              </Button>
            </InputGroup.Button>
          </InputGroup>
        </FormGroup>
      </form>
    );
    return editRoom;
  }

  updateRoom(e) {
    e.preventDefault();
    const updates = {[this.state.toEdit + "/title"]: this.input.value};
    this.roomsRef.update(updates);
    this.setState({ toEdit: ""});
  }

  componentDidMount() {
    this.roomsRef.on('value', snapshot => {
      const roomChanges = [];
      snapshot.forEach((room) => {
        roomChanges.push({
          key: room.key,
          title: room.val().title
        });
      });
      this.setState({ rooms: roomChanges})
    });
  }

  selectRoom(room) {
    this.props.activeRoom(room);
  }

  render() {
    const roomForm = (
      <form className="create-room" onSubmit={this.createRoom}>
        <FormGroup>
          <InputGroup>
            <FormControl type="text" name="title" value={this.state.title} placeholder="create new room" onChange={this.handleChange} />
            <InputGroup.Button>
              <Button bsStyle="success" type="submit">+</Button>
            </InputGroup.Button>
          </InputGroup>
        </FormGroup>
      </form>
    );

    const roomList = this.state.rooms.map((room) =>
      <li className="room" key={room.key}>
        {this.state.toEdit === room.key ?
          this.editRoom(room)
        :
        <div className="roombox">
          <h3 className="roomname" onClick={(e) => this.selectRoom(room, e)}>{room.title}</h3>
          <Button bsStyle="link" bsSize="xsmall" onClick={() => this.setState({toEdit: room.key})}>edit</Button>
          <Button bsStyle="link" bsSize="xsmall" onClick={() => this.deleteRoom(room.key)}>remove</Button>
        </div>
        }
      </li>
    );

    return(
      <div>
        <h2 className="chat-head">chatrooms</h2>
        <ul className="rooms">{roomList}</ul>
        <div>{roomForm}</div>
      </div>
    );
  }
}
