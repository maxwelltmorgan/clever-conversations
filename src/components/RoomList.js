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

    this.roomsRef.on('child_removed', snapshot  => {
      this.setState({ rooms: this.state.rooms.filter( room => room.key !== snapshot.key )  })
    });
  }

  handleRoomClick(index) {
    this.props.activeRoom(this.state.rooms[index].val)
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

  removeRoom(room) {
    this.roomsRef.child(room.key).remove();
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
            <li className={room.key} id={index} key={room.key} data-name={room.val} onClick={(e) => this.props.handleRoomClick(e)}>
              {room.val}
              <button onClick={() => this.removeRoom(room)}>Remove</button>
            </li>
          )
        })}
      </div>
      </div>
    )
  }
}

export default RoomList
