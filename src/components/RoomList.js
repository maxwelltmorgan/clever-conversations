import React, { Component } from 'react';
import { Button } from 'react-bootstrap';
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
        <input type="text" defaultValue={room.title} ref={(input) => this.input = input}/>
        <input type="submit" value="Update" />
        <button type="button" onClick={() => this.setState({toEdit: ""})}>Cancel</button>
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
      <form onSubmit={this.createRoom}>
        <input type="text" name="title" value={this.state.title} placeholder="Enter Room Name" onChange={this.handleChange}/>
        <input type="submit" value="Create"/>
      </form>
    );

    const roomList = this.state.rooms.map((room) =>
      <li key={room.key}>
        {this.state.toEdit === room.key ?
          this.editRoom(room)
        :
        <div>
          <h3 onClick={(e) => this.selectRoom(room, e)}>{room.title}</h3>
          <Button bsStyle="primary" bsSize="xsmall" onClick={() => this.setState({toEdit: room.key})}>Edit</Button>
          <Button bsStyle="danger" bsSize="xsmall" onClick={() => this.deleteRoom(room.key)}>Remove</Button>
        </div>
        }
      </li>
    );

    return(
      <div>
        <h3>chatrooms</h3>
        <ul>{roomList}</ul>
        <div>{roomForm}</div>
      </div>
    );
  }
}
