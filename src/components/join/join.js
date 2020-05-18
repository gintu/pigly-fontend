import React from "react";
import { Link } from "react-router-dom";
import io from "socket.io-client";

const socket = io("https://7xy2d.sse.codesandbox.io/");

export default class Join extends React.Component {
  state = {
    name: "",
    room: ""
  };
  componentDidMount() {
    socket.on("news", data => {
      console.log(data);
      socket.emit("my other event", { my: "data" });
    });
  }

  handleSubmit = e => {
    e.preventDefault();
    console.log(this.state);
  };

  render() {
    return <div>join</div>;
  }
}
