import React from "react";
import { connect } from "react-redux";
import io from "socket.io-client";
const socket = io("https://7xy2d.sse.codesandbox.io/");
class Chat extends React.Component {
  state = {
    messageArray: [],
    text: ""
  };
  componentDidMount() {
    socket.emit("join", this.props.loginData);
    socket.on("from server", data => {
      let tempArray = this.state.messageArray;
      tempArray.push(data);
      this.setState({ messageArray: tempArray });
    });
  }

  componentDidUpdate() {}

  componentWillUnmount() {
    io.emit("disconnect", "disconnect");
  }

  handleChange = e => this.setState({ text: e.target.value });
  handleSubmit = e => {
    socket.emit("chat message", this.state.text);
    this.setState({ text: "" });
  };

  render() {
    console.log(this.state.messageArray);
    return (
      <div>
        <h1>chat</h1>
        {this.state.messageArray &&
          this.state.messageArray.map(item => {
            return (
              <div>
                <p>{item}</p>
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
