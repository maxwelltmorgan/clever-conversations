import React, { Component } from 'react';

export class RoomList extends Component {
  constructor(props) {
    super(props);
      this.state = {
        rooms: [],
        newRoomName: '',
      };
      this.roomsRef = this.props.firebase.database().ref('rooms');
  }

  componentDidMount() {
    this.roomsRef.on('child_added', snapshot => {
      const room = {
        val: snapshot.val(),
        key: snapshot.key,
      }
      this.setState({ rooms: this.state.rooms.concat( room ) })
    });
  }

  handleRoomClick(index) {
    console.log("handleRoomClick(): ", this.state.rooms[index]);
  }

  handleNewRoomChange(e) {
    console.log("handleNewRoomChange(): ", e.target.value);
    this.setState({
      newRoomName: e.target.value,
    })
  }

  createRoom() {
    if (!this.state.newRoomName) return

    this.roomsRef.push(this.state.newRoomName)
    this.setState({
      newRoomName: '',
    })
    console.log("add, state:", this.state);
  }

  render() {
    return (
      <div id="room">
      <div id="new-room">
        <input type="text" id="send-input" value={this.state.newRoomName}
          onChange={(e) => this.handleNewRoomChange(e)} />
        <button type="button"
          onClick={() => this.createRoom()}>
          New Room
        </button>
      </div>
      <div>
        {this.state.rooms.map((room, index) => {
          return (
            <p key={room.key} onClick={() => this.handleRoomClick(index)}>{room.val}</p>
          )
        })}
      </div>
      </div>
    )
  }
}

export default RoomList
