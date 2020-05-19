import React from "react";
import { Link } from "react-router-dom";
import io from "socket.io-client";
import { connect } from "react-redux";
import { setUser } from "../../redux/actions";

class Join extends React.Component {
  state = {
    name: "",
    room: ""
  };
  componentDidMount() {
    const socket = io("https://7xy2d.sse.codesandbox.io/");

    socket.on("news", data => {
      console.log(data);
      socket.emit("my other event", { my: "data" });
    });
  }

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleSubmit = e => {
    e.preventDefault();
    // console.log(this.state);
    this.props.setUser(this.state);
    this.props.history.push("/chat");
  };

  render() {
    return (
      <div>
        <h1>join</h1>
        <input
          type="text"
          name="name"
          onChange={this.handleChange}
          value={this.state.name}
        />
        <input
          type="text"
          name="room"
          onChange={this.handleChange}
          value={this.state.room}
        />
        <button onClick={this.handleSubmit}>submit</button>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    setUser: payload => dispatch(setUser(payload))
  };
};
export default connect(
  null,
  mapDispatchToProps
)(Join);
