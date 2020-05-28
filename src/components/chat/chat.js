import React from "react";
import { connect } from "react-redux";
import io from "socket.io-client";
import { v4 as uuidv4 } from "uuid";

class Chat extends React.Component {
  state = {
    messageArray: [],
    text: ""
  };
  componentDidMount() {
    if (!this.props.userData.name) {
      this.props.history.push("/");
    }
    this.socket = io("https://7xy2d.sse.codesandbox.io/");

    this.socket.emit("join room", {
      name: this.props.userData.name,
      room: this.props.userData.room
    });
    console.log(this.props.userData);
    this.socket.on("from server", data => {
      let tempArray = this.state.messageArray;
      tempArray.push(data);
      this.setState({ messageArray: tempArray });
    });
  }
  componentWillUnmount() {
    this.socket.close();
  }

  handleChange = e => this.setState({ text: e.target.value });
  handleSubmit = e => {
    const msg = {
      message: this.state.text,
      sentBy: this.props.userData.name,
      id: uuidv4(),
      room: this.props.userData.room
    };
    this.socket.emit("chat message", msg);
    this.setState({ text: "" });
  };

  render() {
    return (
      <div>
        <button onClick={() => this.props.history.push("/chatlist")}>
          back
        </button>
        <h1>{this.props.userData.room}</h1>
        {this.state.messageArray &&
          this.state.messageArray.map(item => {
            return (
              <div key={item.id}>
                <p>
                  {item.sentBy} says - {item.message}
                </p>
              </div>
            );
          })}
        <input
          type="text"
          onChange={this.handleChange}
          value={this.state.text}
        />
        <button type="submit" onClick={this.handleSubmit}>
          send
        </button>
      </div>
    );
  }
}
const mapStateToProps = state => {
  return { userData: state.user };
};
export default connect(mapStateToProps)(Chat);
