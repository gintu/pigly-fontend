import React from "react";
import { connect } from "react-redux";
import io from "socket.io-client";
import { v4 as uuidv4 } from "uuid";
const socket = io("https://7xy2d.sse.codesandbox.io/");

class Chat extends React.Component {
  state = {
    messageArray: [],
    text: ""
  };
  componentDidMount() {
    if (!this.props.loginData.name) {
      this.props.history.push("/");
    }
    socket.emit("join", this.props.loginData);
    console.log(this.props.loginData);
    socket.on("from server", data => {
      let tempArray = this.state.messageArray;
      tempArray.push(data);
      this.setState({ messageArray: tempArray });
    });
  }

  componentWillUnmount() {
    // socket.emit("disconnect user", "temp-name");
    socket.disconnect();
  }

  handleChange = e => this.setState({ text: e.target.value });
  handleSubmit = e => {
    const msg = {
      message: this.state.text,
      sentBy: this.props.loginData.name,
      id: uuidv4(),
      room: this.props.loginData.room
    };
    socket.emit("chat message", msg);
    this.setState({ text: "" });
  };

  render() {
    return (
      <div>
        <h1>chat</h1>
        {this.state.messageArray &&
          this.state.messageArray.map(item => {
            return (
              <div key={item.id}>
                <p>
                  {item.sentBy} Says - {item.message}
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
  return { loginData: state };
};
export default connect(mapStateToProps)(Chat);
